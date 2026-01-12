"use client";

import React, { useEffect, useState } from 'react';
import { FaWhatsapp, FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import { useWindowSize } from '../hooks/useWindowSize';
import Reveal from './Reveal';
import './ProductCarousel.css'

import produto1 from '../../public/6L.webp'
import produto2 from '../../public/1.5L.webp'
import produto3 from '../../public/500ml com gas.webp'
import produto4 from '../../public/500ml natural.webp'
import produto5 from '../../public/copo 200 e 300ml.webp'
import produto6 from '../../public/Laranja com acerola.webp'
import produto7 from '../../public/laranja.webp'
import produto8 from '../../public/Maracuja.webp'
import produto9 from '../../public/uva.webp'
import produto10 from '../../public/Goiaba.webp'
import Image from 'next/image';

const products = [
  {
    id: 1,
    image: produto1.src,
    title: 'Água natural 6L',

    description: 'O volume essencial de água pura para manter a hidratação da família ou do escritório a semana toda.',
  },
  {
    id: 2,
    image: produto2.src,
    title: 'Água natural 1.5L',
    description: 'A garrafa perfeita para quem busca hidratação prolongada, seja nos exercícios ou no trabalho.',
  },
  {
    id: 3,
    image: produto3.src,
    title: 'Água com gás 500ml',
    description: 'O toque de efervescência e frescor para quem busca uma hidratação levemente borbulhante e sofisticada.',
  },
  {
    id: 4,
    image: produto4.src,
    title: 'Água natural 500ml',
    description: 'A hidratação ideal para levar, garantindo leveza e pureza em qualquer momento do seu dia.',
  },
  {
    id: 5,
    image: produto5.src,
    title: 'Água natural 200ml e 300ml',
    description: 'Porções perfeitas de pureza, ideais para eventos, lanches rápidos ou para a hidratação das crianças.',
  },
  {
    id: 6,
    image: produto6.src,
    title: 'Suco de Laranja com Acerola 400ml',
    description: 'O mix energizante e natural de laranja com a explosão de vitamina C da acerola para o seu bem-estar.',
  },
  {
    id: 7,
    image: produto7.src,
    title: 'Suco de Laranja 400ml',
    description: 'O sabor vibrante da laranja, puro e natural, para começar o dia ou recarregar as energias com frescor.',
  },
  {
    id: 8,
    image: produto8.src,
    title: 'Suco de Maracujá 400ml',
    description: 'A dose refrescante e calmante do maracujá, perfeito para um momento de pausa e relaxamento.',
  },
  {
    id: 9,
    image: produto9.src,
    title: 'Suco de uva 400ml',
    description: 'O sabor intenso e adocicado da uva, natural e nutritivo, ideal para um lanche reconfortante.',
  },
  {
    id: 10,
    image: produto10.src,
    title: 'Suco de Goiaba 400ml',
    description: 'A cremosidade e o sabor marcante da goiaba, uma opção tropical deliciosa e autêntica.',
  }
];

type ProductCarouselProps = {
  whatsapp: string;
};

const ProductCarousel: React.FC<ProductCarouselProps> = ({ whatsapp }) => {
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
    <section id='products' className="py-16 relative bg-gradient-to-r from-blue-100 to-[#009dc1]">
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
                  <div className="grid grid-cols-1  md:grid-cols-2 lg:grid-cols-3  gap-6
                  justify-items-center">
                    {products.slice(
                      slideIndex * itemsPerSlide,
                      (slideIndex + 1) * itemsPerSlide
                    ).map((product) => (
                      <div
                        key={product.id}
                        className="card-icon-prod bg-white rounded-t-full shadow-lg flex flex-col items-center p-6 text-center overflow-hidden w-[80%] 
                        "
                      >
                        <Reveal><Image
                          src={product.image}
                          alt={product.title}
                          width={400} // defina valores próximos do real
                          height={288} // proporção ajustada para ~18rem de altura
                          className="w-full h-auto max-h-[18rem] object-cover rounded mb-4"
                        />
                        </Reveal>
                        <Reveal>
                          <h3 className="text-xl font-semibold text-gray-800 mb-2">{product.title}</h3>
                          <p className="text-sm text-gray-600 mb-4 flex-grow">{product.description}</p>
                        </Reveal>
                        <button
                          className="hover:cursor-pointer w-[60%] buton-ask mt-auto flex items-center justify-center 
                          hover:scale-105 hover:shadow-md bg-tranparemt text-gray-800 border-1 border-gray-800 ease-in-out font-bold py-2 px-4 rounded-full transition-colors
                           duration-200 hover:border-none hover:bg-green-500 hover:text-white focus:outline-none"
                          onClick={() => window.open(`https://api.whatsapp.com/send?phone=${whatsapp}&text=Ol%C3%A1%2C%20gostaria%20de%20saber%20mais%20sobre%20o%20produto%3A%20` + product.title, '_blank')}
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