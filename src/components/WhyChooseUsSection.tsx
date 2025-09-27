import React from 'react';
import './WhyChooseUsSection.css'

import { FaTruck, FaHeadset, FaAward} from 'react-icons/fa';
import Reveal from './Reveal';
import RevealRight from './RevealRight';

const WhyChooseUsSection: React.FC = () => {
  return (
    <section id='why-chose-us' className="section-whyChose py-16 h-min bg-gray-10">
      <div className="container mx-auto px-4 text-center">
    
        <Reveal>
          <h2 className="text-4xl font-bold text-gray-800 mb-12 mt-10">
          Por que escolher a Niágara Lindóya?
        </h2>
        </Reveal>

     
        <RevealRight delay={500}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          <div className="flex flex-col items-center p-6 bg-white rounded-lg shadow-md transition-transform duration-300 hover:scale-105 sm:w-[90%] ">
            <FaTruck className="text-5xl text-blue-600 mb-4" />
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Entrega Rápida</h3>
            <p className="text-gray-600">
              Garantimos agilidade na entrega para que você receba seus produtos o mais rápido possível.
            </p>
          </div>

          <div className="flex flex-col items-center p-6 bg-white rounded-lg shadow-md transition-transform duration-300 hover:scale-105 sm:w-[90%] ">
            <FaAward className="text-5xl text-green-600 mb-4" />
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Qualidade Garantida</h3>
            <p className="text-gray-600">
              Trabalhamos apenas com produtos de alta qualidade, inspecionados para sua total satisfação.
            </p>
          </div>

          <div className="flex flex-col items-center p-6 bg-white rounded-lg shadow-md transition-transform duration-300 hover:scale-105 sm:w-[90%] ">
            <FaHeadset className="text-5xl text-purple-600 mb-4" />
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Atendimento ao Cliente</h3>
            <p className="text-gray-600">
              Nossa equipe está sempre pronta para ajudar e tirar suas dúvidas com excelência.
            </p>
          </div>
        </div>
        </RevealRight>
      </div>
    </section>
  );
};

export default WhyChooseUsSection;