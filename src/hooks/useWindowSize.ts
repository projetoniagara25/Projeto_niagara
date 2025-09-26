import { useState, useEffect } from 'react';

// Define a interface para tipagem dos valores de retorno
interface WindowSize {
  width: number | undefined;
  height: number | undefined;
}

/**
 * Hook personalizado para capturar e rastrear as dimensões da janela do navegador.
 * Os valores são atualizados automaticamente em caso de redimensionamento.
 * @returns {WindowSize} Objeto contendo 'width' e 'height' em pixels.
 */
export function useWindowSize(): WindowSize {
  // Inicializa o estado com 'undefined' para compatibilidade com a renderização no servidor (SSR)
  const [windowSize, setWindowSize] = useState<WindowSize>({
    width: undefined,
    height: undefined,
  });

  useEffect(() => {
    // 1. Função que será chamada no evento 'resize'
    function handleResize() {
      // Atualiza o estado com as dimensões atuais da janela
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }

    // 2. Chama a função de imediato para definir o tamanho inicial
    handleResize();

    // 3. Adiciona o event listener para atualizar no redimensionamento
    window.addEventListener('resize', handleResize);

    // 4. Cleanup: Remove o event listener quando o componente é desmontado
    return () => window.removeEventListener('resize', handleResize);
  }, []); // O array de dependências vazio garante que o useEffect rode apenas uma vez

  return windowSize;
}