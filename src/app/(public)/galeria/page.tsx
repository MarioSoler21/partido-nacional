"use client";

import { useState } from "react";
import Image from "next/image";
import PageHero from "@/components/shared/PageHero";

const albums = [
  {
    nombre: "Asamblea Nacional 2024",
    fotos: [
      "https://images.unsplash.com/photo-1540910419892-4a36d2c3266c?w=600&q=70",
      "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=600&q=70",
      "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=600&q=70",
      "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=600&q=70",
    ],
  },
  {
    nombre: "Proyectos de Infraestructura",
    fotos: [
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=70",
      "https://images.unsplash.com/photo-1580237072353-751a8a5b2561?w=600&q=70",
      "https://images.unsplash.com/photo-1448375240586-882707db888b?w=600&q=70",
    ],
  },
  {
    nombre: "Eventos Sociales",
    fotos: [
      "https://images.unsplash.com/photo-1464082354059-27db6ce50048?w=600&q=70",
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&q=70",
    ],
  },
];

export default function GaleriaPage() {
  const [activeAlbum, setActiveAlbum] = useState<string>("Todos");

  const allPhotos = albums.flatMap((a) => a.fotos);
  const displayPhotos =
    activeAlbum === "Todos"
      ? allPhotos
      : albums.find((a) => a.nombre === activeAlbum)?.fotos ?? [];

  return (
    <>
      <PageHero
        title="Galería de Imágenes"
        subtitle="Conoce los momentos más importantes del Partido Nacional de Honduras"
      />
      <section className="py-16 bg-section-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Album filter */}
          <div className="flex flex-wrap gap-2 mb-10">
            {["Todos", ...albums.map((a) => a.nombre)].map((album) => (
              <button
                key={album}
                onClick={() => setActiveAlbum(album)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  activeAlbum === album
                    ? "bg-primary text-white"
                    : "bg-white text-gray-600 border border-gray-200 hover:border-primary hover:text-primary"
                }`}
              >
                {album}
              </button>
            ))}
          </div>

          {/* Gallery grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {displayPhotos.map((src, i) => (
              <div
                key={i}
                className="relative aspect-square rounded-xl overflow-hidden bg-gray-100 group cursor-pointer"
              >
                <Image
                  src={src}
                  alt={`Foto ${i + 1}`}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
