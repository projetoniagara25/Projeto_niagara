"use client";

import React from 'react';
import './AboutUsSection.css'
import companyLogo from '../assets/images/Niagara_Logo_1.jpg';
import Reveal from './Reveal';

const AboutUsSection: React.FC = () => {
  return (
    <section id="about-us" className="bg-white py-16" >
      <div className="container mx-auto px-4 flex flex-col md:flex-row items-center gap-12">

        <div className="w-full md:w-1/2 flex justify-center">
          <img
            src={companyLogo.src}
            alt="Logo da Empresa"
            className="max-w-xs md:max-w-sm lg:max-w-md h-auto"
          />
        </div>

        <div className="right-side-aboutus w-full md:w-1/2">

          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
            Sobre Nós
          </h2>
          <div className="space-y-6 text-gray-600 leading-relaxed">
            <Reveal>
              <p>
                Na Niagara Lindóya, nossa jornada começou em 2004 com uma visão clara: [descreva a visão ou missão inicial]. Desde então, temos nos dedicado a [mencione o que sua empresa faz ou o problema que resolve], sempre com o compromisso de [mencione um valor fundamental, como qualidade, inovação, etc.].
              </p>
            </Reveal>
            <Reveal>
              <p>
              Acreditamos que [fale sobre o que impulsiona a empresa, como o cliente, a equipe, a sustentabilidade]. Nosso time é formado por profissionais apaixonados e talentosos que trabalham incansavelmente para [mencione o objetivo atual, como superar expectativas, entregar soluções excepcionais].
            </p>
            </Reveal>
            <Reveal>
              <p>
              Estamos orgulhosos do que construímos e empolgados com o futuro. Junte-se a nós nesta jornada e descubra a diferença que Niagara Lindóya pode fazer.
            </p>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUsSection;