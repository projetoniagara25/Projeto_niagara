"use client";

import React, { useEffect, useState } from 'react';
import { FaWhatsapp, FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import imagemTeste from '../assets/images/produto.webp'
import { useWindowSize } from '../hooks/useWindowSize'; 
import Reveal from './Reveal';

const products = [
  {
    id: 1,
    image: imagemTeste.src,
    title: 'Nome do Produto 1',
    description: 'Uma descrição curta sobre o Produto 1. Aqui você pode destacar os principais benefícios ou características.',
  },
  {
    id: 2,
    image: imagemTeste.src,
    title: 'Nome do Produto 2',
    description: 'Aqui temos a descrição do Produto 2, com informações importantes sobre suas funcionalidades.',
  },
  {
    id: 3,
    image: imagemTeste.src,
    title: 'Nome do Produto 3',
    description: 'Este é o Produto 3. Ele foi feito para resolver o seu problema de [problema] de forma eficiente.',
  },
  {
    id: 4,
    image: imagemTeste.src,
    title: 'Nome do Produto 4',
    description: 'Uma descrição detalhada do Produto 4. Ótimo para quem busca [qualidade].',
  },
  {
    id: 5,
    image: imagemTeste.src,
    title: 'Nome do Produto 5',
    description: 'Descrição do Produto 5. Perfeito para [uso específico] e [benefício].',
  },
  {
    id: 6,
    image: imagemTeste.src,
    title: 'Nome do Produto 6',
    description: 'Mais um produto incrível para sua coleção!',
  },
  {
    id: 7,
    image: imagemTeste.src,
    title: 'Nome do Produto 7',
    description: 'O melhor produto da categoria 7!',
  },
  {
    id: 8,
    image: imagemTeste.src,
    title: 'Nome do Produto 8',
    description: 'Experimente a inovação com este produto.',
  },
  {
    id: 9,
    image: imagemTeste.src,
    title: 'Nome do Produto 9',
    description: 'Um produto essencial para o seu dia a dia.',
  },
];

const ProductCarousel: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const windowSize = useWindowSize(); // 1. CHAMA O HOOK

  // const itemsPerSlide = 3;
   const itemsPerSlide = (() => {
    // Se a largura não estiver definida (durante SSR), usa 1 como fallback
    if (windowSize.width === undefined) return 1; 

    // Largura MD do Tailwind é 768px
    if (windowSize.width >= 1024) { // Tamanho LG (desktop)
      return 3;
    } else if (windowSize.width >= 640) { // Tamanho SM (tablet)
      return 2;
    } else { // Telas pequenas (mobile)
      return 1;
    }
  })();

  // 3. RECÁLCULO DO TOTAL DE SLIDES
  // A lógica de navegação é baseada no número de itens por slide.
  const totalSlides = Math.ceil(products.length / itemsPerSlide);

   // Efeito para corrigir a navegação ao redimensionar
  // Se o número total de slides mudar, reseta currentSlide para 0
  useEffect(() => {
    setCurrentSlide(0);
  }, [itemsPerSlide]);

  const handleNext = () => {
    setCurrentSlide((prevSlide) => (prevSlide + 1) % totalSlides);
  };

  const handlePrev = () => {
    setCurrentSlide((prevSlide) => (prevSlide - 1 + totalSlides) % totalSlides);
  };

  return (
    <section id='products' className="py-16 relative bg-gradient-to-r from-blue-100 to-indigo-300">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center text-gray-800 mb-8 mt-8">
          Conheça nossos Produtos
        </h2>

        <div className="relative">
          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-300 ease-in-out"
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}      
            >
              {Array.from({ length: totalSlides }).map((_, slideIndex) => (
                <div key={slideIndex} className="w-full flex-shrink-0">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6
                  justify-items-center">
                    {products.slice(
                      slideIndex * itemsPerSlide,
                      (slideIndex + 1) * itemsPerSlide
                    ).map((product) => (
                      <div
                        key={product.id}
                        className="bg-white rounded-t-full shadow-lg flex flex-col items-center p-6 text-center overflow-hidden w-[80%] 
                        "
                      >
                        <Reveal><img
                          src={product.image}
                          alt={product.title}
                          className="w-full h-auto object-cover rounded mb-4"
                        /></Reveal>
                        <Reveal>
                          <h3 className="text-xl font-semibold text-gray-800 mb-2">{product.title}</h3>
                        <p className="text-sm text-gray-600 mb-4 flex-grow">{product.description}</p>
                        </Reveal>
                        <button
                          className="hover:cursor-pointer w-[60%] buton-ask mt-auto flex items-center justify-center 
                          hover:scale-105 hover:shadow-xl bg-green-500 text-white font-bold py-2 px-4 rounded-full transition-colors
                           duration-200 hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
                          onClick={() => window.open('https://api.whatsapp.com/send?phone=5511975147817&text=Ol%C3%A1%2C%20gostaria%20de%20saber%20mais%20sobre%20o%20produto%3A%20' + product.title, '_blank')}
                        >
                          <FaWhatsapp className="mr-2" /> Pedir
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>


          {/* Botões de Navegação */}
          <button
            className="hover:cursor-pointer absolute top-1/2 left-0 -translate-y-1/2 bg-gray-800 text-white p-3 rounded-full shadow-lg z-10 transition-colors duration-200 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500"
            onClick={handlePrev}
          >
            <FaArrowLeft />
          </button>
          <button
            className="hover:cursor-pointer absolute top-1/2 right-0 -translate-y-1/2 bg-gray-800 text-white p-3 rounded-full shadow-lg z-10 transition-colors duration-200 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500"
            onClick={handleNext}
          >
            <FaArrowRight />
          </button>
        </div>
      </div>
    </section>
  );
};

export default ProductCarousel;