// src/components/RevealRight.tsx

"use client";

import React from 'react';
// Importe o hook useInView. Ajuste o caminho se necessário.
import { useInView } from '../hooks/useInView'; 

interface RevealRightProps {
  children: React.ReactNode;
  delay?: number; // Atraso em milissegundos para o stagger effect
}

const RevealRight: React.FC<RevealRightProps> = ({ children, delay = 0 }) => {
  
  // 1. Usa o hook para detectar se o elemento está visível
  // Usamos um threshold mais baixo para que ele apareça assim que entrar na tela
  const [ref, inView] = useInView({ threshold: 0.1 }); 

  // 2. Definimos as classes de animação do Tailwind
  const animationClasses = `
    transition-all duration-1000 ease-out
    
    /* Posição Final: 'translate-x-0' e 'opacity-100' */
    ${inView 
        ? 'translate-x-0 opacity-100' 
        
        /* Posição Inicial: Escondido à direita (translate-x-16) e 'opacity-0' */
        : 'translate-x-16 opacity-0' 
    }
  `;
  
  // 3. Aplica o estilo de delay para o efeito sequencial
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

export default RevealRight;