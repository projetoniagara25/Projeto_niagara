// src/components/MainSection.tsx

import React from 'react';
import { FaWhatsapp } from 'react-icons/fa'; // Ícone do WhatsApp

const MainSection: React.FC = () => {
  return (
    <section className="bg-blue-50 py-24 min-h-screen-75 flex flex-col items-center justify-center text-center px-4">
      <div className='flex flex-col justify-around items-center'>
        <div className="flex flex-col items-center min-h-60 max-w-3xl">

          <h1 className="text-2xl md:text-2xl font-extrabold text-gray-800 leading-tight w-full mb-4 ">
            A MELHOR ÁGUA MINERAL ENTRGUE EM SÃO PAULO
          </h1>
          <p className="text-base md:text-xl text-gray-600 mb-8 max-w-prose">
            Qualidade superior e entrega super rápida direto até você!
          </p>
        </div>
      </div>

      <a
        href="https://api.whatsapp.com/send?phone=5511999999999&text=Ol%C3%A1%2C%20gostaria%20de%20fazer%20um%20pedido."
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center justify-center text-green-500 border-2 border-green-500 rounded-full py-3 px-8 bg-transparent text-lg font-bold
          transition-colors duration-300
          hover:bg-green-500 hover:text-white"
      >
        <FaWhatsapp className="mr-3 text-2xl" />
        Pedir pelo WhatsApp
      </a>
    </section>
  );
};

export default MainSection;