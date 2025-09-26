// src/hooks/useInView.ts

import { useState, useEffect, useRef } from 'react';

// Correção: A assinatura de retorno do hook deve incluir ' | null'
export function useInView(
  options: IntersectionObserverInit = {}
): [React.RefObject<HTMLDivElement | null>, boolean] {
  // A ref DEVE ser inicializada como null, então o tipo é (HTMLDivElement | null)
  const ref = useRef<HTMLDivElement>(null); 
  const [isIntersecting, setIntersecting] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      setIntersecting(entry.isIntersecting);
    }, options);

    // O TypeScript garante que 'ref.current' é verificado contra 'null'
    if (ref.current) {
      observer.observe(ref.current);
    }

    // Função de limpeza
    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
      observer.disconnect();
    };
  // As dependências garantem que o hook rode apenas no mount ou se as opções mudarem
  }, [options.root, options.rootMargin, options.threshold]); 

  // O tipo de retorno agora corresponde ao tipo de 'ref'
  return [ref, isIntersecting];
}