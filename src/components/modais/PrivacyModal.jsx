import React from 'react';

const PrivacyModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  // Fecha o modal se clicar no fundo escuro
  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) onClose();
  };

  return (
    <div 
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
      onClick={handleBackdropClick}
    >
      <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-white rounded-2xl shadow-2xl p-6 md:p-10 animate-in fade-in zoom-in duration-300">
        
        {/* Botão Fechar */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-900 transition-colors text-3xl font-light"
        >
          &times;
        </button>

        {/* Conteúdo da Política */}
        <div className="prose prose-slate max-w-none">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Política de Privacidade</h2>
          
          <div className="space-y-4 text-gray-600 leading-relaxed text-sm md:text-base">
            <p>A sua privacidade é importante para nós. É política do <strong>Niágara Lindoya</strong> respeitar a sua privacidade em relação a qualquer informação sua que possamos coletar no site.</p>
            
            <section>
              <h3 className="text-lg font-semibold text-gray-800">1. Coleta e Uso de Informações</h3>
              <p>Nossa página funciona de forma informativa e não solicita o preenchimento de dados pessoais para navegação. Utilizamos a API do Instagram (Meta) exclusivamente para exibir conteúdos públicos da nossa empresa.</p>
            </section>

            <section>
              <h3 className="text-lg font-semibold text-gray-800">2. Links Externos e WhatsApp</h3>
              <p>Nossa página contém botões que direcionam para o WhatsApp. Esteja ciente de que, ao clicar, você estará sujeito às políticas de privacidade da plataforma WhatsApp (Meta).</p>
            </section>

            <section>
              <h3 className="text-lg font-semibold text-gray-800">3. Compromisso do Usuário</h3>
              <p>O usuário se compromete a fazer uso adequado dos conteúdos e da informação, não se envolvendo em atividades ilegais ou que causem danos aos sistemas físicos e lógicos do site.</p>
            </section>

            <p className="pt-6 border-t border-gray-100 text-xs text-gray-400">
              Esta política é efetiva a partir de 11 de Janeiro de 2026.
            </p>
          </div>
        </div>

        {/* Botão Entendi (opcional) */}
        <div className="mt-8 flex justify-end">
          <button 
            onClick={onClose}
            className="bg-gray-900 cursor-pointer text-white px-6 py-2 rounded-lg hover:bg-gray-800 transition-all font-medium"
          >
            Entendi
          </button>
        </div>
      </div>
    </div>
  );
};

export default PrivacyModal;