"use client";

import { useState } from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

interface PhotoGalleryProps {
  images: string[];
}

export default function PhotoGallery({ images }: PhotoGalleryProps) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  function prev() {
    setLightboxIndex((i) => (i !== null ? (i - 1 + images.length) % images.length : 0));
  }
  function next() {
    setLightboxIndex((i) => (i !== null ? (i + 1) % images.length : 0));
  }

  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {images.map((src, i) => (
          <button
            key={i}
            onClick={() => setLightboxIndex(i)}
            className="relative aspect-video rounded-xl overflow-hidden bg-gray-100 hover:opacity-90 transition-opacity group"
          >
            <Image
              src={src}
              alt={`Foto ${i + 1}`}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              sizes="(max-width: 768px) 50vw, 33vw"
            />
          </button>
        ))}
      </div>

      {/* Lightbox */}
      {lightboxIndex !== null && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center"
          onClick={() => setLightboxIndex(null)}
        >
          <button
            className="absolute top-4 right-4 text-white p-2 hover:text-gray-300"
            onClick={() => setLightboxIndex(null)}
          >
            <X size={28} />
          </button>
          <button
            className="absolute left-4 text-white p-2 hover:text-gray-300"
            onClick={(e) => { e.stopPropagation(); prev(); }}
          >
            <ChevronLeft size={36} />
          </button>
          <div
            className="relative max-w-5xl max-h-[85vh] w-full mx-16"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={images[lightboxIndex]}
              alt={`Foto ${lightboxIndex + 1}`}
              width={1200}
              height={800}
              className="object-contain max-h-[85vh] w-auto mx-auto rounded-lg"
            />
            <p className="text-center text-gray-400 text-sm mt-2">
              {lightboxIndex + 1} / {images.length}
            </p>
          </div>
          <button
            className="absolute right-4 text-white p-2 hover:text-gray-300"
            onClick={(e) => { e.stopPropagation(); next(); }}
          >
            <ChevronRight size={36} />
          </button>
        </div>
      )}
    </>
  );
}
