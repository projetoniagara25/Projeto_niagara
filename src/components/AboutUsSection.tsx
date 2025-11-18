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
              Fundada em 2004 como uma distribuidora de bebidas e água, a Niagara evoluiu significativamente. Em 2018, concluímos o ciclo de distribuição para nos dedicarmos integralmente ao lançamento da nossa própria marca.
              </p>
            </Reveal>
            <Reveal>
              <p>
              Na Niagara, temos um princípio inegociável: a excelência é a nossa fundação. Acreditamos que a satisfação do cliente é o nosso foco principal e a maior recompensa. Nosso time é composto por profissionais dedicados e talentosos que trabalham com paixão para garantir a qualidade superior de cada produto. Fazemos isso com total responsabilidade ambiental, reforçando nosso compromisso sólido com a sustentabilidade.
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