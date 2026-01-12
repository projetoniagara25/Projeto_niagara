"use client";

import React, { useEffect, useRef, useState } from "react";
import { Loader } from "@googlemaps/js-api-loader";
import "./GoogleMapsSection.css";

const API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "";

const GoogleMapsSection: React.FC = () => {
  const mapRef = useRef<HTMLDivElement | null>(null);
  const [isClient, setIsClient] = useState(false);

  // Marca quando o componente está montado no cliente
  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient || !API_KEY || !mapRef.current) return;

    const loader = new Loader({
      apiKey: API_KEY,
      version: "weekly",
    });

    const position = { lat: -22.512642915924395, lng: -46.6409210357665 };

    const mapOptions: google.maps.MapOptions = {
      center: position,
      zoom: 14,
      disableDefaultUI: true,
      zoomControl: true,
      gestureHandling: "cooperative",
    };

    (async () => {
      // Importa as bibliotecas separadamente para evitar deprecated
      const { Map } = (await loader.importLibrary("maps")) as google.maps.MapsLibrary;
      const { Marker } = (await loader.importLibrary("marker")) as google.maps.MarkerLibrary;

      // Cria o mapa
      const map = new Map(mapRef.current as HTMLElement, mapOptions);

      // Cria o marcador
      const marker = new Marker({
        position,
        map,
        title: "Nossa Localização",
      });

      // Cria a InfoWindow com imagem e link
      const infoWindow = new google.maps.InfoWindow({
        content: `
        <div style="font-size:14px; display:flex; align-items:center; gap:8px; color: #000000; -webkit-font-smoothing: antialiased;">
        <img src="/Niagara_Logo_2.jpg" alt="Logo" style="width:24px;height:24px;border-radius:4px; flex-shrink: 0;" />
        <div>
          <strong style="color: #000000; display: block; line-height: 1.2;">Nossa Localização</strong>
          <a href="https://maps.app.goo.gl/HptNCHfnNSpAkQd4A" 
             target="_blank" 
             rel="noopener noreferrer" 
             style="color: #1a73e8; text-decoration: none; font-weight: 600; font-size: 13px;">
            Ver no Google Maps
          </a>
        </div>
      </div>
        `,
      });

      // Abre automaticamente a InfoWindow ao carregar
      infoWindow.open(map, marker);

      // Mantém a abertura no clique também
      marker.addListener("click", () => {
        infoWindow.open(map, marker);
      });
    })();
  }, [isClient]);

  return (
    <section className="maps-sections-sm flex flex-col py-16 w-full">
      <div className="w-full container mx-auto">
        <h2 className="text-4xl font-bold text-center text-gray-800 mb-8">
          Encontre-nos no Mapa
        </h2>
        {isClient && (
          <div ref={mapRef} className="maps h-[400px] rounded-lg shadow-lg" />
        )}
      </div>
    </section>
  );
};

export default GoogleMapsSection;
