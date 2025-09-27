"use client";

import React, { useEffect, useRef } from 'react';
import { Loader } from '@googlemaps/js-api-loader';

const API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || ""; 

const GoogleMapsSection: React.FC = () => {
    const mapRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        if (!API_KEY || !mapRef.current) {
        console.error("Erro: A chave da API do Google Maps não foi carregada ou o elemento de referência não existe.");
        return;
    }

        const loader = new Loader({
            apiKey: API_KEY,
            version: 'weekly',
        });

        const mapOptions: google.maps.MapOptions = {
            center: {
                lat: -22.512642915924395,  // Latitude do centro de São Paulo (Exemplo)
                lng: -46.6409210357665, // Longitude do centro de São Paulo (Exemplo) 
            },
            zoom: 12,
            mapId: 'MAPA_DA_NIAGARA', // Opcional: use um Map ID personalizado do Google Cloud
        };

        loader.load().then(() => {
            // O mapa é renderizado no elemento referenciado
            new google.maps.Map(mapRef.current!, mapOptions);
        }).catch(error => {
            console.error('Erro ao carregar a API do Google Maps:', error);
        });
    }, []);

    return (
        <section className="flex flex-col py-16 w-full">
            <div className=" w-full container mx-auto">
                <h2 className="text-4xl font-bold text-center text-gray-800 mb-8">
                    Encontre-nos no Mapa
                </h2>
                <div
                    ref={mapRef}
                    className="maps h-[400px] rounded-lg shadow-lg"
                />
            </div>
        </section>
    );
};

export default GoogleMapsSection;