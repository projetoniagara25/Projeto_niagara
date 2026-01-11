"use client";

import React, { useState, useEffect, useCallback, useRef } from 'react';
import { FaWhatsapp, FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import './MainSlider.css'

import background1 from '../../../public/niagara_site_banner_1920x1080_01.png';
import background2 from '../../../public/niagara_site_banner_1920x1080_03.png';
import background3 from '../../../public/niagara_site_banner_1920x1080_02.png';
import background1Mobile from '../../../public/niagara_site_banner_1080X1920_01.png';
import background2Mobile from '../../../public/niagara_site_banner_1080X1920_02.png';
import background3Mobile from '../../../public/niagara_site_banner_1080X1920_03.png';

import Link from 'next/link';
import Reveal from '../Reveal';
import { useWindowSize } from '@/hooks/useWindowSize';

const slides = [
    {
        id: 1,
        bgImage: background1.src,
        title: "",
        subtitle: "",
        buttonText: "Pedir pelo WhatsApp",
        whatsappLink: `https://api.whatsapp.com/send?phone=5511995354703&text=Ol%C3%A1%2C%20gostaria%20de%20fazer%20um%20pedido.`,
        isConversionSlide: true, // Indica que é o slide de conversão com animação
    },
    {
        id: 2,
        bgImage: background2.src,
        title: "",
        subtitle: "",
        buttonText: "Ver Produtos",
        link: "#products",
        isConversionSlide: false,
    },
    {
        id: 3,
        bgImage: background3.src,
        title: "",
        subtitle: "",
        buttonText: "Consulte sobre nossos prazos",
        link: "#contact",
        isConversionSlide: false,
    },
];

const slidesMobile = [
    {
        id: 1,
        bgImage: background1Mobile.src,
        title: "",
        subtitle: "",
        buttonText: "Pedir pelo WhatsApp",
        whatsappLink: `https://api.whatsapp.com/send?phone=5511995354703&text=Ol%C3%A1%2C%20gostaria%20de%20fazer%20um%20pedido.`,
        isConversionSlide: true, // Indica que é o slide de conversão com animação
    },
    {
        id: 2,
        bgImage: background2Mobile.src,
        title: "",
        subtitle: "",
        buttonText: "Ver Produtos",
        link: "#products",
        isConversionSlide: false,
    },
    {
        id: 3,
        bgImage: background3Mobile.src,
        title: "",
        subtitle: "",
        buttonText: "Consulte sobre nossos prazos",
        link: "#contact",
        isConversionSlide: false,
    },
];


const MainSlider: React.FC = () => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [isPaused, setIsPaused] = useState(false); // NOVO ESTADO DE PAUSA
    const autoPlayTimeoutRef = useRef<NodeJS.Timeout | null>(null);
    const totalSlides = slides.length;
    const AUTOPLAY_INTERVAL = 5000; // 5 segundos para troca automática
    const PAUSE_DURATION = 15000; // 10 segundos de pausa após interação

    const { width = 0 } = useWindowSize();

    const BREAKPOINT_MOBILE = 768;

    // Usa useCallback para memorizar as funções de navegação
    const handleNext = useCallback(() => {
        setCurrentSlide((prev) => (prev + 1) % totalSlides);
    }, [totalSlides]);


    const handlePrev = useCallback(() => {
        setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
    }, [totalSlides]);

    // Função para limpar o timer de reinício (evita duplicação)
    const clearAutoPlayTimeout = () => {
        if (autoPlayTimeoutRef.current) {
            clearTimeout(autoPlayTimeoutRef.current);
            autoPlayTimeoutRef.current = null;
        }
    };

    /////////////
    useEffect(() => {
        // Se estiver pausado, não faz nada
        if (isPaused) {
            return;
        }

        // Configura o intervalo se NÃO estiver pausado
        const interval = setInterval(() => {
            handleNext();
        }, AUTOPLAY_INTERVAL);

        // Limpa o intervalo
        return () => clearInterval(interval);
    }, [isPaused, handleNext]); // Re-executa se o estado de pausa ou handleNext mudar



    const handleUserInteraction = (newSlideIndex: number) => { // 1. Define o slide clicado

        clearAutoPlayTimeout();

        setCurrentSlide(newSlideIndex); // 2. Pausa o carrossel automático

        setIsPaused(true); // Opcional: Você pode querer reiniciar a contagem após alguns segundos. 

        // Se quiser que ele volte a rodar após 10s sem clique, adicione:
        // setTimeout(() => setIsPaused(false), 10000);

        // 4. Configura um novo timer para retomar o carrossel
        autoPlayTimeoutRef.current = setTimeout(() => {
            setIsPaused(false); // Retoma o autoplay
        }, PAUSE_DURATION);
    };


    // Efeito de limpeza final (para evitar vazamentos de memória)
    useEffect(() => {
        return () => {
            clearAutoPlayTimeout();
        };
    }, []);


    return (
        <section id='main' className="relative w-full h-screen overflow-hidden">

            {/* Container de Slides (100% da Largura da Tela) */}
            <div
                className="flex bg-amber-50 h-[100%] mt-16 transition-transform duration-700 ease-in-out"
                style={{ width: `${totalSlides * 100}%`, transform: `translateX(-${currentSlide * (100 / totalSlides)}%)` }}
            >
                {(width > BREAKPOINT_MOBILE ? slides : slidesMobile).map((slide, index) => (
                    <div
                        key={slide.id}
                        className="w-full flex-shrink-0 bg-cover bg-center bg-no-repeat flex flex-col items-center justify-center text-center relative"
                        style={{
                            backgroundImage: `url('${slide.bgImage}')`,
                            width: `${100 / totalSlides}%`, // Garante que cada slide ocupe sua porção no flex
                        }}
                    >
                        {/* Overlay para contraste */}
                        <div className="absolute inset-0 bg-black opacity-10"></div>

                        {/* Conteúdo do Slide */}
                        <div className="relative z-10 text-white p-4 max-w-4xl">

                            {/* Mensagem Principal com Animação (apenas no primeiro slide) */}
                            <Reveal>
                                <h1
                                className={`text-4xl md:text-6xl font-extrabold leading-tight mb-4 transform transition-all duration-1000 ${(index === 0 || index === 1 || index === 2) && (currentSlide === 0 || currentSlide === 1 || currentSlide === 2) ? 'translate-y-[-6] opacity-100' : 'translate-y-8 opacity-0'
                                    }`}
                            >
                                {slide.title}
                            </h1>
                            </Reveal>

                            {/* Subtítulo */}
                            <Reveal delay={500}>
                                <p
                                className={`text-lg md:text-2xl mb-12 transform transition-all duration-1000 delay-200 ${(index === 0 || index === 1 || index === 2) && (currentSlide === 0 || currentSlide === 1 || currentSlide === 2) ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
                                    }`}
                            >
                                {slide.subtitle}
                            </p>
                            </Reveal>

                            {/* Botão de Ação com Animação (apenas no primeiro slide) */}
                            {slide.isConversionSlide && (
                                <a
                                    href={slide.whatsappLink}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={`buton-main inline-flex items-center justify-center border-2 rounded-full mb-12 py-3 px-8 text-lg font-bold
                                        transition-all ease-in-out duration-300 delay-100 hover:scale-105 hover:shadow-xl
                                        ${index === 0 && currentSlide === 0 ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}
                                        text-white border-white hover:border-none hover:bg-green-500 hover:text-gray-800 bg-transparent mt-60
                                    `}
                                >
                                    <FaWhatsapp className="mr-3 text-2xl" />
                                    {slide.buttonText}
                                </a>


                            )}

                            {/* Botão Padrão para outros slides */}
                            {!slide.isConversionSlide && (
                                <Link
                                    href={slide.link || "#"}
                                    className="buton-main inline-flex items-center justify-center border-2 rounded-full mb-12 py-3 px-8 text-lg font-bold
                                            transition-colors duration-300 hover:scale-105 hover:shadow-xl
                                            text-white border-white hover:bg-white hover:text-gray-800 bg-transparent  mt-60"
                                >
                                    {slide.buttonText}
                                </Link>
                            )}
                        </div>
                    </div>
                ))}
            </div>

            {/* Botões de Navegação (Setas) */}
            <button
                className="hover:cursor-pointer absolute bottom-0 left-4 
                transform -translate-y-1/2 text-white p-3 rounded-full
                 bg-black bg-opacity-50 hover:bg-opacity-75 z-20 transition-colors arrow-slide"
                onClick={() => handleUserInteraction((currentSlide - 1 + totalSlides) % totalSlides)} // Usa a lógica handlePrev, mas com a pausa
            >
                <FaArrowLeft className="text-2xl" />
            </button>
            <button
                className="hover:cursor-pointer absolute bottom-0 right-4
                 transform -translate-y-1/2 text-white p-3 rounded-full
                  bg-black bg-opacity-50 hover:bg-opacity-75 z-20 transition-colors arrow-slide"
                onClick={() => handleUserInteraction((currentSlide + 1) % totalSlides)} // Usa a lógica handleNext, mas com a pausa
            >
                <FaArrowRight className="text-2xl" />
            </button>

            {/* Bolhas de Paginação */}
            <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex space-x-3 z-20">
                {slides.map((_, index) => (
                    <button
                        key={index}
                        className={`hover:cursor-pointer w-3 h-3 rounded-full transition-all duration-300 ${currentSlide === index ? 'bg-white scale-125' : 'bg-gray-400 opacity-70'
                            }`}
                        onClick={() => handleUserInteraction(index)}
                        aria-label={`Ir para o slide ${index + 1}`}
                    />
                ))}
            </div>
        </section>
    );
};

export default MainSlider;