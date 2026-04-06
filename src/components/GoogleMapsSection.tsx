"use client";

import React, { useEffect, useRef, useState } from "react";
import { Loader } from "@googlemaps/js-api-loader";

const API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "";

const GoogleMapsSection: React.FC = () => {
  const mapRef = useRef<HTMLDivElement | null>(null);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    // IMPORTANTE: Adicionei mapRef.current na checagem
    if (!isClient || !API_KEY || !mapRef.current) return;

    const loader = new Loader({
      apiKey: API_KEY,
      version: "weekly",
      // Adicionamos as bibliotecas aqui para garantir o carregamento
      libraries: ["maps", "marker"]
    });

    const position = { lat: -22.512642915924395, lng: -46.6409210357665 };

    const initMap = async () => {
      try {
        // Importando as bibliotecas modernas
        const { Map } = await loader.importLibrary("maps") as google.maps.MapsLibrary;
        const { InfoWindow } = await loader.importLibrary("maps") as google.maps.MapsLibrary;

        // Usaremos o marcador padrão por enquanto para simplicidade, 
        // mas garantindo que o google.maps está disponível
        const { Marker } = await loader.importLibrary("marker") as google.maps.MarkerLibrary;

        const mapOptions: google.maps.MapOptions = {
          center: position,
          zoom: 15,
          disableDefaultUI: false,
          zoomControl: true,
          gestureHandling: "cooperative",
          mapId: "DEMO_MAP_ID",
          styles: [
            {
              featureType: "poi", // Points of Interest (outros marcadores)
              elementType: "labels.text.fill", // Cor de preenchimento do texto

              stylers: [
                { color: "#000" }, // Força uma cor cinza escura sólida (não opaca)
                { visibility: "on" }   // Garante que o texto esteja visível
              ]
            },
            {
              featureType: "poi",
              elementType: "labels.text.stroke", // Cor do contorno do texto
              stylers: [
                { visibility: "on" },
                { color: "#ffffff" }, // Contorno branco para garantir leitura sobre o mapa
                { weight: 2 }        // Espessura do contorno
              ]
            }
          ]
        };

        const map = new Map(mapRef.current as HTMLElement, mapOptions);

        const marker = new Marker({
          position,
          map,
          title: "Niágara Lindoya",
        });

        const infoWindow = new InfoWindow({
          content: `
            <div style="padding: 8px; color: #000; font-family: sans-serif;">
              <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 5px;">
                <img src="/Niagara_Logo_2.jpg" style="width:30px; height:30px; border-radius:4px;" />
                <strong style="font-size: 16px;">Niágara Lindoya</strong>
              </div>
              <a href="https://www.google.com/maps/search/?api=1&query=${position.lat},${position.lng}" 
                 target="_blank" 
                 style="color: #1a73e8; text-decoration: none; font-weight: bold; font-size: 13px;">
                Ver no Google Maps
              </a>
            </div>
          `,
        });

        infoWindow.open(map, marker);

        marker.addListener("click", () => {
          infoWindow.open(map, marker);
        });
      } catch (error) {
        console.error("Erro ao carregar o mapa:", error);
      }
    };

    initMap();
  }, [isClient]);

  return (
    <section className="flex flex-col w-full">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center text-gray-800 mb-8">
          Encontre-nos no Mapa
        </h2>
        <div
          ref={mapRef}
          className="w-full h-[450px] rounded-2xl shadow-2xl border-4 border-white"
          style={{ minHeight: '450px' }}
        />
      </div>
    </section>
  );
};

export default GoogleMapsSection;