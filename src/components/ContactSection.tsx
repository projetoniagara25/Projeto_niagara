"use client";

import React, { useState } from 'react';

import { FaWhatsapp, FaEnvelope } from 'react-icons/fa';

import contactImage from '../assets/images/Niagara_Logo_2.jpg';
import GoogleMapsSection from './GoogleMapsSection';
import Reveal from './Reveal';
import RevealRight from './RevealRight';


const ContactSection: React.FC = () => {

  const whatsappNumber = '5511975147817';
  const emailAddress = 'atendimento@niagaralindoya.com';

  return (
    <section id="contact" className="bg-white py-16" >
      <div className="container mx-auto px-4 sm:flex sm:flex-col">
        <div className="flex flex-row md:flex-row sm:flex-col items-center sm:justify-center sm:items-center">
          {/* Lado esquerdo: Informações de Contato */}
          <div className="w-full md:w-1/2 flex flex-col items-center md:items-start text-center md:text-left m-8">
            <Reveal>
              <h2 className="text-4xl font-bold text-gray-800 mb-4">
                Fale Conosco
              </h2>
            </Reveal>
            <Reveal>
              <p className="text-gray-600 mb-8 max-w-md">
                Entre em contato com nossa equipe para tirar dúvidas, fazer orçamentos ou solicitar mais informações sobre nossos produtos.
              </p>
            </Reveal>


            <Reveal>
              <div className="flex items-center space-x-4 mb-4">
                <FaWhatsapp className="text-3xl text-green-500" />
                <div>
                  <span className="font-semibold text-gray-800">WhatsApp</span>
                  <p className="text-gray-600">
                    <a href={`https://wa.me/${whatsappNumber}`} target="_blank" rel="noopener noreferrer" className="hover:underline">
                      (11) 97514-7817
                    </a>
                  </p>
                </div>
              </div>
            </Reveal>


            <Reveal>
              <div className="flex items-center space-x-4 mb-8">
                <FaEnvelope className="text-3xl text-gray-500" />
                <div>
                  <span className="font-semibold text-gray-800">E-mail</span>
                  <p className="text-gray-600">
                    <a href={`mailto:atendimento@niagaralindoya.com`} className="hover:underline">
                      {emailAddress}
                    </a>
                  </p>
                </div>
              </div>
            </Reveal>


            <Reveal>
              <a
                href={`https://wa.me/${whatsappNumber}`}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 px-8 py-3 bg-green-500 text-white font-bold rounded-lg 
                shadow-md transition-colors duration-200 hover:bg-green-600 focus:outline-none 
                focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
              >
                Fale Agora Pelo WhatsApp
              </a>
            </Reveal>
          </div>


          <div className="w-full flex justify-center items-center mt-8 
          ">
            <RevealRight>
              <img
              src={contactImage.src}
              alt="Pessoas em contato"
              className="rounded-lg shadow-lg max-w-[65%] h-auto sm:ml-[6.5rem]"
            />
            

            {/* <GoogleMapsSection></GoogleMapsSection> */}
            </RevealRight>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;