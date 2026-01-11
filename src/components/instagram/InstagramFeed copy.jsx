// src/components/InstagramFeed.jsx
'use client';
import React, { useState, useEffect } from 'react';


// O token DEVE ser armazenado em variáveis de ambiente (next.config.js ou .env.local)
// NUNCA coloque o token diretamente no código-fonte, especialmente em produção.
// Para este exemplo, estamos usando a variável de ambiente (process.env.NEXT_PUBLIC_INSTAGRAM_TOKEN).
// Para testar, crie um arquivo .env.local na raiz do seu projeto:
// NEXT_PUBLIC_INSTAGRAM_TOKEN="SEU_ACCESS_TOKEN_AQUI"
const ACCESS_TOKEN = process.env.NEXT_PUBLIC_INSTAGRAM_TOKEN;

// Você pode obter isso após a primeira autenticação ou, no modo de teste, geralmente
// o próprio token de acesso já identifica o usuário de teste.
// No entanto, a API geralmente requer o ID do usuário para buscar as mídias.
// Se você estiver usando o Graph API, a busca pode ser mais simples (veja o campo 'user_id' abaixo).
const USER_ID = process.env.NEXT_PUBLIC_INSTAGRAM_USER_ID; 

export default function InstagramFeed() {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isPaused, setIsPaused] = useState(false);

  // 1. Função de busca de dados
  useEffect(() => {
    // 💡 URL da API do Graph API para buscar mídias
    // 'media' é o campo que lista os posts.
    // 'media_url' é a URL da imagem ou vídeo.
    // 'permalink' é o link direto para o post no Instagram.
    // 'caption' é a descrição.
    const fields = 'id,caption,media_url,timestamp,permalink';
    
    // Assumindo que você está usando o Instagram Graph API (padrão da Meta for Developers)
    const API_URL = `https://graph.instagram.com/v19.0/${USER_ID}/media?fields=${fields}&access_token=${ACCESS_TOKEN}`;

    async function fetchInstagramPosts() {
      if (!ACCESS_TOKEN || !USER_ID) {
        setError('Token de acesso ou ID de usuário não configurado.');
        setIsLoading(false);
        return;
      }
      
      try {
        const response = await fetch(API_URL);
        if (!response.ok) {
          throw new Error(`Erro ao buscar dados: ${response.statusText}`);
        }
        
        const data = await response.json();
        
        // A API Graph retorna os posts em data.data
        const fetchedPosts = data.data.slice(0, 5); // Pega os primeiros 5 posts
        
        // Duplica para o efeito de rolagem infinita
        setPosts([...fetchedPosts, ...fetchedPosts]);
        
      } catch (err) {
        console.error("Erro na API do Instagram:", err);
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    }

    fetchInstagramPosts();
  }, []); // O array vazio garante que roda apenas na montagem

  // 2. Lógica de Pausa/Retomada
  const togglePause = () => {
    setIsPaused(!isPaused);
  };
  
  // 3. Renderização Condicional
  if (isLoading) {
    return (
      <section className="py-12 bg-gray-50 text-center">
        <p className="text-gray-600">Carregando posts do Instagram...</p>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-12 bg-gray-50 text-center">
        <p className="text-red-500">Erro ao carregar o feed: {error}. Verifique seu token e ID de usuário.</p>
      </section>
    );
  }

  // Se não houver posts, mas sem erro
  if (posts.length === 0) {
    return (
      <section className="py-12 bg-gray-50 text-center">
        <p className="text-gray-600">Nenhum post encontrado.</p>
      </section>
    );
  }
  
  // 4. Renderização do Carrossel (Mesma lógica de rolagem CSS)
  return (
    <section className="py-12 bg-gray-50 min-h-60">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8">
          Siga-nos no Instagram
        </h2>

        <div className="overflow-hidden">
          <div
            className={`flex slide-track ${isPaused ? 'paused' : ''}`}
            onClick={togglePause}
            onTouchStart={togglePause}
            role="button"
            tabIndex="0"
            aria-label={isPaused ? "Retomar a rolagem do feed" : "Pausar a rolagem do feed"}
          >
            {/* O map agora usa os posts reais da API */}
            {posts.map((post, index) => (
              <a
                key={index}
                href={post.permalink} // Link direto do post
                target="_blank"
                rel="noopener noreferrer"
                className="flex-shrink-0 w-1/5 p-2 transition duration-300 transform hover:scale-105"
              >
                <div className="aspect-square bg-gray-200 shadow-md overflow-hidden">
                  <img
                    // A URL da mídia fornecida pela API
                    src={post.media_url} 
                    alt={post.caption || `Instagram post ${index + 1}`}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}