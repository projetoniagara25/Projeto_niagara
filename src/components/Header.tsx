"use client";

import './Header.css'
import React, { useState } from 'react';
import Link from 'next/link';

import { FaBars, FaTimes } from 'react-icons/fa'; // Ícones de Menu e Fechar

// Definição dos itens de navegação
const navItems = [
  { name: 'Início', href: '#main' },
  { name: 'Sobre Nós', href: '#about-us' },
  { name: 'Produtos', href: '#products' },
  { name: 'Porque nos escolher?', href: '#why-chose-us' },
  { name: 'Contato', href: '#contact' },
];

const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false); // Estado para controlar o menu mobile
 
  const handleLinkClick = () => {
    setIsOpen(false); // Fecha o menu ao clicar em um link (apenas no mobile)
  };

 return (
    <header className="fixed div-header w-full bg-[#152b4f] z-49 top-0 left-0 ">
      <div className="flex mx-auto items-center justify-between  h-16 px-6">
        {/* Logo/Título da Empresa */}
        <div className="text-white text-2xl font-bold">
          <Link href="/">NIAGARA</Link>
        </div>

        {/* 1. Menu DESKTOP (Sempre visível em telas médias e maiores) */}
        <nav className="hidden md:block">
          <ul className="flex space-x-6 text-white font-medium uppercase">
            {navItems.map((item) => (
              <li key={item.name}>
                <Link 
                  href={item.href} 
                  className="hover:text-blue-200 transition-colors duration-300 font-bold"
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        
        {/* 2. Botão do Menu HAMBURGER (Visível apenas em telas pequenas) */}
        <button 
          className="md:hidden text-white text-2xl z-50 hover:cursor-pointer"
          onClick={() => setIsOpen(!isOpen)}
          aria-label={isOpen ? "Fechar Menu" : "Abrir Menu"}
        >
          {/* APENAS UM ÍCONE AQUI: FaBars quando fechado, FaTimes quando aberto */}
          {!isOpen && <FaBars />}
        </button>

        {/* 3. Menu LATERAL RESPONSIVO (Aparece ao clicar) */}
        <nav 
          className={`
            fixed top-0 right-0 h-full w-64 bg-[#152b4f] shadow-xl p-6
            transform transition-transform duration-300 ease-in-out md:hidden
            ${isOpen ? 'translate-x-0' : 'translate-x-full'} z-50
          `}
        >
          {/* BOTÃO DE FECHAR INTERNO CORRIGIDO: 
             A maneira mais limpa é removê-lo daqui e deixar apenas o botão no header
             cuidar de abrir e fechar. Mas se você quiser um botão interno, oculte-o
             ou certifique-se de que ele não seja redundante. 
             VAMOS REMOVER O BOTÃO INTERNO DUPLICADO para evitar a sobreposição visual. 
          */}
          <div className="flex justify-end mb-8">
             {/* Removido o <FaTimes /> duplicado aqui */}
             <button 
                className="text-white text-2xl hover:cursor-pointer"
                onClick={() => setIsOpen(false)}
                aria-label="Fechar Menu"
              >
                {/* Usamos a FaTimes aqui caso o usuário feche por este botão dentro do nav */}
                <FaTimes />
            </button>
          </div>
          
          {/* Conteúdo da navegação lateral */}
          <ul className="flex flex-col space-y-4 text-white font-medium uppercase">
            {navItems.map((item) => (
              <li key={item.name}>
                <Link 
                  href={item.href} 
                  className="block py-2 hover:text-blue-200 transition-colors duration-300 border-b border-gray-700"
                  onClick={handleLinkClick}
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Overlay */}
        {isOpen && (
          <div 
            className="fixed inset-0 bg-black opacity-50 md:hidden z-40"
            onClick={handleLinkClick}
          />
        )}
      </div>
    </header>
  );
};

export default Header;