"use client";

import React, { useEffect, useRef, useState } from "react";
import { Loader } from "@googlemaps/js-api-loader";
import "./GoogleMapsSection.css"

const API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "";

const GoogleMapsSection: React.FC = () => {
  const mapRef = useRef<HTMLDivElement | null>(null);
  const [isClient, setIsClient] = useState(false);

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
     
      const { Map } = (await loader.importLibrary("maps")) as google.maps.MapsLibrary;
      const { Marker } = (await loader.importLibrary("marker")) as google.maps.MarkerLibrary;

      
      const map = new Map(mapRef.current as HTMLElement, mapOptions);

      
      const marker = new Marker({
        position,
        map,
        title: "Nossa Localização",
      });

      
      const infoWindow = new google.maps.InfoWindow({
        content: `
           <div style="font-size:14px; display: flex; align-items: center; gap: 8px;">
            <img src="/Niagara_Logo_2.jpg" alt="Logo" style="width:24px; height:24px; border-radius:4px;" />
            <div>
                <strong>Nossa Localização</strong><br/>
                <a href="https://maps.app.goo.gl/HptNCHfnNSpAkQd4A" 
                target="_blank" rel="noopener noreferrer">
                Ver no Google Maps
                </a>
            </div>
            </div>
        `,
      });

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
