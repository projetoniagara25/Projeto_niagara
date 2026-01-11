// src/components/InstagramFeed.jsx
'use client';
import React, { useState, useEffect } from 'react';

const ACCESS_TOKEN = process.env.NEXT_PUBLIC_INSTAGRAM_TOKEN;
const USER_ID = process.env.NEXT_PUBLIC_INSTAGRAM_USER_ID; 

export default function InstagramFeed() {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    // Adicionado 'media_type' para podermos filtrar vídeos
    const fields = 'id,caption,media_url,timestamp,permalink,media_type';
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
        
        // FILTRAGEM: Aceita apenas IMAGE ou CAROUSEL_ALBUM (ignora VIDEO)
        const onlyImages = data.data.filter(
          (post) => post.media_type === 'IMAGE' || post.media_type === 'CAROUSEL_ALBUM'
        );
        
        // Pega os primeiros posts filtrados (ex: 4 ou 5)
        const fetchedPosts = onlyImages.slice(0, 5); 
        
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
  }, []);

  const togglePause = () => {
    setIsPaused(!isPaused);
  };
  
  if (isLoading) {
    return (
      <section className="py-12 bg-gray-50 text-center">
        <p className="text-gray-600">Carregando fotos do Instagram...</p>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-12 bg-gray-50 text-center">
        <p className="text-red-500">Erro ao carregar o feed: {error}</p>
      </section>
    );
  }

  if (posts.length === 0) {
    return (
      <section className="py-12 bg-gray-50 text-center">
        <p className="text-gray-600">Nenhuma foto encontrada.</p>
      </section>
    );
  }
  
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
            role="button"
            tabIndex="0"
            aria-label={isPaused ? "Retomar a rolagem" : "Pausar a rolagem"}
          >
            {posts.map((post, index) => (
              <a
                key={`${post.id}-${index}`}
                href={post.permalink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-shrink-0 w-1/2 md:w-1/5 p-2 transition duration-300 transform hover:scale-105"
              >
                <div className="aspect-square bg-gray-200 shadow-md overflow-hidden rounded-lg">
                  <img
                    src={post.media_url} 
                    alt={post.caption || "Instagram post"}
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