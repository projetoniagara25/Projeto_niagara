// src/components/InstagramFeed.jsx
'use client';
import React, { useState, useEffect, useRef } from 'react'; 

export default function InstagramFeed() {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isManual, setIsManual] = useState(false);
  
  const timeoutRef = useRef(null);
  const scrollContainerRef = useRef(null);

  useEffect(() => {
  async function fetchInstagramPosts() {
    try {
      const response = await fetch('/api/instagram'); 
      
      // 1. Checa se o conteúdo que voltou é realmente um JSON
      const contentType = response.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        // Se for HTML (erro 404/500 da Vercel), pegamos o texto para debugar
        const htmlError = await response.text(); 
        console.error("Recebido HTML em vez de JSON:", htmlError);
        throw new Error("Erro no servidor: A rota retornou uma página HTML.");
      }

      const data = await response.json();

      if (!response.ok) throw new Error(data.error || 'Erro ao carregar');

      const onlyImages = data.data.filter(
        (p) => p.media_type === 'IMAGE' || p.media_type === 'CAROUSEL_ALBUM'
      );
      
      const displayPosts = onlyImages.slice(0, 6);
      setPosts([...displayPosts, ...displayPosts, ...displayPosts]); 
    } catch (err) {
      console.error("Erro no Frontend:", err);
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  }
  fetchInstagramPosts();
}, []);

  const handleTouchStart = () => {
    // Para o timer se o usuário tocar novamente
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setIsManual(true);
  };

  const handleTouchEnd = () => {
    // Inicia a contagem para voltar ao automático
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    
    timeoutRef.current = setTimeout(() => {
      // 1. Primeiro, voltamos o scroll manual para o zero de forma suave
      if (scrollContainerRef.current) {
        scrollContainerRef.current.scrollTo({ left: 0, behavior: 'smooth' });
      }

      // 2. Aguardamos o tempo do scroll suave terminar para religar a animação CSS
      setTimeout(() => {
        setIsManual(false);
      }, 600); // Tempo aproximado do scroll suave
    }, 4000); // 4 segundos de inatividade
  };

  if (isLoading || error || posts.length === 0) {
    return (
      <section className="py-12 bg-gray-50 text-center">
        <p>{error ? `Erro: ${error}` : 'Carregando feed...'}</p>
      </section>
    );
  }

  return (
    <section className="py-12 bg-gray-50 overflow-hidden">
      <style jsx>{`
        @keyframes scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-33.33%); }
        }
        .animate-scroll {
          display: flex;
          animation: scroll 40s linear infinite;
        }
        .animate-scroll:hover {
          animation-play-state: paused;
        }
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { 
          -ms-overflow-style: none; 
          scrollbar-width: none; 
        }
      `}</style>

      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-10 text-gray-900 dark:text-gray-900">Siga-nos no Instagram</h2>

        <div 
          ref={scrollContainerRef}
          // A chave aqui: se isManual é true, permitimos o scroll nativo.
          // Se for false, o container volta a ser um bloco rígido para a animação interna.
          className={`w-full ${isManual ? 'overflow-x-auto snap-x snap-mandatory no-scrollbar' : 'overflow-hidden'}`}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          <div className={`flex gap-4 w-max ${isManual ? '' : 'animate-scroll'}`}>
            {posts.map((post, index) => (
              <a
                key={`${post.id}-${index}`}
                href={post.permalink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-shrink-0 w-[75vw] md:w-72 snap-center transition-transform duration-300 hover:scale-105"
              >
                <div className="aspect-square bg-gray-200 shadow-md rounded-2xl overflow-hidden border border-white">
                  <img
                    src={post.media_url}
                    alt={post.caption || "Post Instagram"}
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