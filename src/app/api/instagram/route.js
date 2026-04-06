import { NextResponse } from 'next/server';
import { kv } from '@vercel/kv';

export async function GET() {
  // 1. Tenta pegar o token e a data da última atualização no BD
  let token = await kv.get('ig_access_token') || process.env.INSTAGRAM_TOKEN;
  let lastRefresh = await kv.get('ig_token_last_refresh') || 0;
  const userId = process.env.INSTAGRAM_USER_ID;

  if (!token) {
    return NextResponse.json({ error: 'Token não configurado' }, { status: 500 });
  }

  const now = Date.now();
  // 30 dias em milissegundos (Renovação preventiva com margem de segurança)
  const THIRTY_DAYS = 30 * 24 * 60 * 60 * 1000;

  // 2. Lógica de Refresh PREVENTIVO
  if (now - lastRefresh > THIRTY_DAYS) {
    console.log("Tempo de renovação atingido. Tentando Refresh Preventivo...");
    try {
      // Nota: Para renovar um token de longa duração, a Meta não exige client_id e secret,
      // apenas o grant_type e o token atual.
      const refreshUri = `https://graph.instagram.com/refresh_access_token?grant_type=ig_refresh_token&access_token=${token}`;
      const refreshRes = await fetch(refreshUri);
      const refreshData = await refreshRes.json();

      if (refreshData.access_token) {
        token = refreshData.access_token;
        // 3. Salva o novo token e o timestamp atual no Vercel KV
        await kv.set('ig_access_token', token);
        await kv.set('ig_token_last_refresh', now);
        console.log("Token do Instagram atualizado com sucesso no KV!");
      } else {
        console.error("Falha no refresh da API do Instagram:", refreshData);
      }
    } catch (refreshErr) {
      console.error("Erro na requisição de refresh:", refreshErr);
    }
  }

  // 4. Busca os posts com o token (que pode ter acabado de ser atualizado ou ainda estar no prazo)
  const fields = 'id,caption,media_url,timestamp,permalink,media_type';
  const apiUri = `https://graph.instagram.com/v19.0/${userId}/media?fields=${fields}&access_token=${token}`;

  try {
    let response = await fetch(apiUri, { next: { revalidate: 3600 } });
    let data = await response.json();

    // Se o token expirou permanentemente ou foi revogado manualmente
    if (data.error && data.error.code === 190) {
      return NextResponse.json(
        { error: 'Token expirou permanentemente. Gere um novo token manualmente e atualize o .env' }, 
        { status: 401 }
      );
    }

    return NextResponse.json(data);

  } catch (error) {
    return NextResponse.json({ error: 'Erro ao processar o feed' }, { status: 500 });
  }
}