import { useState, useEffect, useRef } from 'react';

/**
 * Hook para detectar quando um elemento entra ou sai da área de visualização (viewport).
 * @param options Opções do Intersection Observer (ex: { threshold: 0.1 } para 10% de visibilidade).
 * @returns [ref, isIntersecting] - A ref para anexar ao elemento e um booleano de estado.
 */

// Correção na assinatura de retorno:
export function useInView(options: IntersectionObserverInit = {}): [React.RefObject<HTMLDivElement | null>, boolean] {
  // A ref DEVE ser inicializada como null, então o tipo precisa ser union (HTMLDivElement | null)
  const ref = useRef<HTMLDivElement>(null); 
  const [isIntersecting, setIntersecting] = useState(false);
  // O TypeScript aqui infere: RefObject<HTMLDivElement | null>

  // A função de retorno deve refletir o tipo real da ref.
  // Mude a tipagem de retorno para incluir 'null':
  
  return [ref, isIntersecting] as [React.RefObject<HTMLDivElement>, boolean]; 
  // O erro está aqui: o TypeScript está sendo muito rigoroso.
  
  // SOLUÇÃO: Use um Type Assertion (as) para forçar o tipo,
  // ou mude a declaração da função para aceitar a união:
  
  // Altere a linha de assinatura da função para:
  return [ref, isIntersecting] as [React.RefObject<HTMLDivElement>, boolean];
}