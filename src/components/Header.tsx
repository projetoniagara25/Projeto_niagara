// src/components/Header.tsx

import React from 'react';
import Link from 'next/link';

const Header: React.FC = () => {
  return (
    <header className="fixed top-0 left-0 w-full bg-[#152b4f] shadow-md z-50">
      <div className="container mx-auto flex items-center justify-between h-16 px-4 md:px-8">
        {/* Logo/Título da Empresa */}
        <div className="text-white text-2xl font-bold">
          <Link href="/">NIAGARA</Link>
        </div>

        {/* Área de Navegação */}
        <nav>
          <ul className="flex space-x-6 text-white font-medium uppercase">
            <li>
              <Link href="#about-us" className="hover:text-blue-200 transition-colors duration-300">
                Sobre Nós
              </Link>
            </li>
            <li>
              <Link href="#products" className="hover:text-blue-200 transition-colors duration-300">
                Produtos
              </Link>
            </li>
            <li>
              <Link href="#why-chose-us" className="hover:text-blue-200 transition-colors duration-300">
                Porque nos escolher?
              </Link>
            </li>
            <li>
              <Link href="#contact" className="hover:text-blue-200 transition-colors duration-300">
                Contato
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;