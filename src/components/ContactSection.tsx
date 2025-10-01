"use client";

import React, { useState } from 'react';

import { FaWhatsapp, FaEnvelope } from 'react-icons/fa';

import contactImage from '../assets/images/Niagara_Logo_2.jpg';
import GoogleMapsSection from './GoogleMapsSection';
import Reveal from './Reveal';
import RevealRight from './RevealRight';
import './ContactSection.css'
import { StringifyOptions } from 'querystring';

type ContactSectionProps = {

  whatsapp: String;

}

const ContactSection: React.FC<ContactSectionProps> = ({ whatsapp }) => {

  const emailAddress = 'atendimento@niagaralindoya.com';
  return (
    <section id="contact" className="bg-gradient-to-r from-green-100 to-indigo-300 py-16" >
      <div className="container mx-auto px-4 sm:flex sm:flex-col">
        <div className="area-contact flex flex-row items-center justify-center px-8">
          {/* Lado esquerdo: Informações de Contato */}
          <div className="left-side w-full flex flex-col">
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
                    <a href={`https://wa.me/${whatsapp}`} target="_blank" rel="noopener noreferrer" className="hover:underline">
                      (11) 99535-4703
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
                href={`https://wa.me/${whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="bt-wapp mt-4 px-8 py-3 bg-green-500 text-white font-bold rounded-lg 
                shadow-md transition-colors duration-200 hover:bg-green-600 focus:outline-none 
                focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
              >
                Fale Agora Pelo WhatsApp
              </a>
            </Reveal>
          </div>
          {/* Lado direito: Informações de Contato */}
          <div className="area-maps w-full flex items-center justify-center
          ">
            <RevealRight>
              <GoogleMapsSection></GoogleMapsSection>
            </RevealRight>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;