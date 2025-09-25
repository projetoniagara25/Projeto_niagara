"use client";

import React, { useState } from 'react';
import { FaWhatsapp, FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import imagemTeste from '../assets/images/Company-logo.svg'

const products = [
  {
    id: 1,
    image: imagemTeste,
    title: 'Nome do Produto 1',
    description: 'Uma descrição curta sobre o Produto 1. Aqui você pode destacar os principais benefícios ou características.',
  },
  {
    id: 2,
    image: imagemTeste,
    title: 'Nome do Produto 2',
    description: 'Aqui temos a descrição do Produto 2, com informações importantes sobre suas funcionalidades.',
  },
  {
    id: 3,
    image: imagemTeste,
    title: 'Nome do Produto 3',
    description: 'Este é o Produto 3. Ele foi feito para resolver o seu problema de [problema] de forma eficiente.',
  },
  {
    id: 4,
    image: imagemTeste,
    title: 'Nome do Produto 4',
    description: 'Uma descrição detalhada do Produto 4. Ótimo para quem busca [qualidade].',
  },
  {
    id: 5,
    image: imagemTeste,
    title: 'Nome do Produto 5',
    description: 'Descrição do Produto 5. Perfeito para [uso específico] e [benefício].',
  },
  {
    id: 6,
    image: imagemTeste,
    title: 'Nome do Produto 6',
    description: 'Mais um produto incrível para sua coleção!',
  },
  {
    id: 7,
    image: imagemTeste,
    title: 'Nome do Produto 7',
    description: 'O melhor produto da categoria 7!',
  },
  {
    id: 8,
    image: imagemTeste,
    title: 'Nome do Produto 8',
    description: 'Experimente a inovação com este produto.',
  },
  {
    id: 9,
    image: imagemTeste,
    title: 'Nome do Produto 9',
    description: 'Um produto essencial para o seu dia a dia.',
  },
];

const ProductCarousel: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const itemsPerSlide = 3;
  const totalSlides = Math.ceil(products.length / itemsPerSlide);

  const handleNext = () => {
    setCurrentSlide((prevSlide) => (prevSlide + 1) % totalSlides);
  };

  const handlePrev = () => {
    setCurrentSlide((prevSlide) => (prevSlide - 1 + totalSlides) % totalSlides);
  };

  return (
    <section className="py-16 relative">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center text-gray-800 mb-12">
          Nossos Produtos
        </h2>

        <div className="relative">
          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-300 ease-in-out"
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
              {Array.from({ length: totalSlides }).map((_, slideIndex) => (
                <div key={slideIndex} className="w-full flex-shrink-0">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {products.slice(
                      slideIndex * itemsPerSlide,
                      (slideIndex + 1) * itemsPerSlide
                    ).map((product) => (
                      <div
                        key={product.id}
                        className="bg-white rounded-lg shadow-lg overflow-hidden flex flex-col items-center p-6 text-center"
                      >
                        <img
                          src={product.image}
                          alt={product.title}
                          className="w-full h-auto object-cover rounded mb-4"
                        />
                        <h3 className="text-xl font-semibold text-gray-800 mb-2">{product.title}</h3>
                        <p className="text-sm text-gray-600 mb-4 flex-grow">{product.description}</p>
                        <button
                          className="mt-auto flex items-center justify-center bg-green-500 text-white font-bold py-2 px-4 rounded-full transition-colors duration-200 hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
                          onClick={() => window.open('https://api.whatsapp.com/send?phone=5511999999999&text=Ol%C3%A1%2C%20gostaria%20de%20saber%20mais%20sobre%20o%20produto%3A%20' + product.title, '_blank')}
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
            className="absolute top-1/2 left-0 -translate-y-1/2 bg-gray-800 text-white p-3 rounded-full shadow-lg z-10 transition-colors duration-200 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500"
            onClick={handlePrev}
          >
            <FaArrowLeft />
          </button>
          <button
            className="absolute top-1/2 right-0 -translate-y-1/2 bg-gray-800 text-white p-3 rounded-full shadow-lg z-10 transition-colors duration-200 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500"
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