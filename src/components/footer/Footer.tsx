import Link from 'next/link';
import React from 'react';
import { FaFacebookF, FaInstagram, FaWhatsapp } from 'react-icons/fa';
import './Footer.css'


type FooterProps = {
  whatsapp : string
}
const Footer: React.FC<FooterProps> = ({whatsapp}) => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#274651] text-gray-300 py-6">
      <div className="footer-area mx-auto px-4">
        {/* 1. Ícone e Ano da Empresa */}
        <div className="flex flex-col items-start space-y-2">
          {/* Substitua o SVG ou o ícone do componente da sua empresa aqui */}
          <div className="text-white text-2xl font-bold foot-title-lindoia">
            Niágara<span className="text-[#009dc1]">Lindóya</span>
          </div>
          <span className="text-sm">© {currentYear} NiagaraLindóya. Todos os direitos reservados.</span>
        </div>

        {/* 2. Área do Cliente */}
        <div className=" min-w-max flex flex-col client-area">
          <h4 className="text-white font-semibold mb-3  ">Área do Cliente</h4>
          <ul className="space-y-2">
            <li><a href="#contact" className="hover:text-white transition-colors duration-200">Contatar</a></li>
            <li><a href="#main" className="hover:text-white transition-colors duration-200">Realizar Pedido</a></li>
          </ul>
        </div>

        {/* 3. Empresa */}
        <div className="bussines min-w-max flex flex-col ">
          <h4 className="text-white font-semibold mb-3">Empresa</h4>
          <ul className="space-y-2">
            <li><a href="#about-us" className="hover:text-white transition-colors duration-200">Sobre Nós</a></li>
          </ul>
        </div>

        {/* 4. Informação */}
        <div className="info min-w-max flex flex-col ">
          <h4 className="text-white font-semibold mb-3 ">Informação</h4>
          <ul className="space-y-2">
            <li><p className="hover:text-white transition-colors duration-200">Termos e Condições</p></li>
            {/* <li><a href="#" className="hover:text-white transition-colors duration-200">Termos e Condições</a> */}
          </ul>
        </div>

        {/* 5. Siga-nos */}
        <div className="followus min-w-max flex flex-col ">
          <h4 className="text-white font-semibold mb-3">Siga-nos</h4>
          <div className="area-social-links-icons flex space-x-4 mt-2">
            <a href="https://facebook.com/703538462849443" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="text-2xl hover:text-white transition-colors duration-200">
              <FaFacebookF />
            </a>
            <a href="https://www.instagram.com/niagara.lindoya" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="text-2xl hover:text-white transition-colors duration-200">
              <FaInstagram />
            </a>
             <a href={`https://wa.me/${whatsapp}`} target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="text-2xl hover:text-white transition-colors duration-200">
              <FaWhatsapp />
            </a>
          </div>
        </div>

        {/* 6. Navegação */}
        <div className=" min-w-max flex flex-col ">
          <h4 className="text-white font-semibold mb-3">Navegação</h4>
          <ul className="space-y-2">
            <li><Link href={'#about-us'} className="hover:text-white transition-colors duration-200">Sobre nós</Link></li>
            <li><Link href={'#products'}className="hover:text-white transition-colors duration-200">Produtos</Link></li>
            <li><Link href={'#why-chose-us'}className="hover:text-white transition-colors duration-200">Porque Nos Escolher ?</Link></li>
            <li><Link href={'#contact'}className="hover:text-white transition-colors duration-200">Contato</Link></li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;