"use client";

import { useState } from "react";
import { Grid, X, ChevronLeft, ChevronRight } from "lucide-react";
import { VehicleImageData } from "@/lib/types";

interface BentoGalleryProps {
  images: VehicleImageData[];
  title: string;
}

export default function BentoGallery({ images, title }: BentoGalleryProps) {
  const [modalOpen, setModalOpen] = useState(false);
  const [activePhotoIndex, setActivePhotoIndex] = useState(0);

  // Guarantee at least 5 image slots with fallbacks
  const displayImages = images.slice(0, 5);
  while (displayImages.length < 5) {
    displayImages.push({
      id: `fallback-${displayImages.length}`,
      vehicleId: "",
      url: images[0]?.url || "/images/vehicles/mahindra-thar.jpg",
      caption: title,
      isCover: false,
      sortOrder: displayImages.length,
    });
  }

  const openModalAt = (index: number) => {
    setActivePhotoIndex(index);
    setModalOpen(true);
  };

  return (
    <div className="relative">
      {/* 5-Photo Bento Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-2.5 rounded-3xl overflow-hidden aspect-16/9 md:aspect-21/9 max-h-[500px]">
        {/* Hero Spotlight (Left 2 columns, spans 2 rows) */}
        <div
          onClick={() => openModalAt(0)}
          className="md:col-span-2 md:row-span-2 relative cursor-pointer group overflow-hidden bg-slate-100"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={displayImages[0].url}
            alt={displayImages[0].caption || title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
          />
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
        </div>

        {/* 4 Supporting Bento Tiles (Right 2 columns) */}
        {displayImages.slice(1, 5).map((img, idx) => (
          <div
            key={img.id || idx}
            onClick={() => openModalAt(idx + 1)}
            className="relative cursor-pointer group overflow-hidden bg-slate-100 hidden md:block"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={img.url}
              alt={img.caption || `${title} photo ${idx + 2}`}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />

            {/* Last tile overlay button */}
            {idx === 3 && (
              <div className="absolute inset-0 bg-slate-900/40 hover:bg-slate-900/50 backdrop-blur-xs flex items-center justify-center transition-colors">
                <button
                  type="button"
                  className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/95 text-slate-900 font-bold text-xs shadow-lg"
                >
                  <Grid className="w-4 h-4" />
                  View All {images.length} Photos
                </button>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Mobile view all photos button */}
      <div className="md:hidden absolute bottom-3 right-3">
        <button
          type="button"
          onClick={() => openModalAt(0)}
          className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-white/95 text-slate-900 font-bold text-xs shadow-md"
        >
          <Grid className="w-3.5 h-3.5" />
          {images.length} Photos
        </button>
      </div>

      {/* Full-Screen Lightbox Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 bg-black/95 flex flex-col items-center justify-center p-4">
          {/* Top Bar */}
          <div className="absolute top-4 inset-x-4 max-w-7xl mx-auto flex items-center justify-between text-white z-10">
            <span className="text-xs font-semibold tracking-wider uppercase text-slate-400">
              Photo {activePhotoIndex + 1} of {images.length} • {title}
            </span>
            <button
              type="button"
              onClick={() => setModalOpen(false)}
              className="p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Main Photo View */}
          <div className="relative max-w-5xl w-full max-h-[80vh] flex items-center justify-center">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={images[activePhotoIndex].url}
              alt={images[activePhotoIndex].caption || title}
              className="max-h-[75vh] w-auto max-w-full object-contain rounded-2xl shadow-2xl"
            />

            {/* Prev Button */}
            <button
              type="button"
              onClick={() => setActivePhotoIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1))}
              className="absolute left-2 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/20 hover:bg-white/40 text-white flex items-center justify-center backdrop-blur-md transition-colors cursor-pointer"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            {/* Next Button */}
            <button
              type="button"
              onClick={() => setActivePhotoIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1))}
              className="absolute right-2 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/20 hover:bg-white/40 text-white flex items-center justify-center backdrop-blur-md transition-colors cursor-pointer"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>

          {/* Bottom Caption */}
          {images[activePhotoIndex].caption && (
            <p className="mt-4 text-xs font-medium text-slate-300 text-center max-w-lg">
              {images[activePhotoIndex].caption}
            </p>
          )}
        </div>
      )}
    </div>
  );
}
