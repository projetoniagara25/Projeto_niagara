"use client";

import React from 'react';
import { useInView } from '../hooks/useInView'; // Ajuste o caminho

interface RevealProps {
  children: React.ReactNode;
  delay?: number; // Atraso em milissegundos
}

const Reveal: React.FC<RevealProps> = ({ children, delay = 0 }) => {
  // 1. Usamos o hook para saber se o elemento está visível
  const [ref, inView] = useInView({ threshold: 0.1 });

  // 2. Definimos as classes de animação do Tailwind
  const animationClasses = `
    transition-all duration-1000 ease-out
    ${inView ? 'translate-y-0 opacity-100' : 'translate-y-16 opacity-0'}
  `;
  
  // O estilo de delay é aplicado diretamente via CSS
  const delayStyle = {
    transitionDelay: `${delay}ms`
  };

  return (
    <div 
      ref={ref} 
      className={animationClasses} 
      style={delayStyle}
    >
      {children}
    </div>
  );
};

export default Reveal;