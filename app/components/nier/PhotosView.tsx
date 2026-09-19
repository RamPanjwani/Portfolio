'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { NierSectionHeader } from './NierSectionHeader';
import { INITIAL_PHOTOS, PhotoItem } from '../../data/photos';
import { NierModal } from './NierModal';
import { nierAudio } from './NierAudio';
import {
  ChevronLeft,
  ChevronRight,
  Maximize2,
  ExternalLink,
} from 'lucide-react';

export const PhotosView: React.FC = () => {
  const [photos] = useState<PhotoItem[]>(INITIAL_PHOTOS);
  const [visibleCount, setVisibleCount] = useState<number>(12);
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState<number | null>(null);

  const currentlyVisible = useMemo(() => photos.slice(0, visibleCount), [photos, visibleCount]);
  const hasMore = visibleCount < photos.length;

  // Selected photo for Lightbox modal
  const activePhoto = selectedPhotoIndex !== null ? photos[selectedPhotoIndex] : null;

  const openLightbox = (index: number) => {
    nierAudio.playSelect();
    setSelectedPhotoIndex(index);
  };

  const closeLightbox = () => {
    nierAudio.playSelect();
    setSelectedPhotoIndex(null);
  };

  const handlePrevPhoto = () => {
    if (selectedPhotoIndex === null) return;
    nierAudio.playHover();
    setSelectedPhotoIndex((prev) => (prev! > 0 ? prev! - 1 : photos.length - 1));
  };

  const handleNextPhoto = () => {
    if (selectedPhotoIndex === null) return;
    nierAudio.playHover();
    setSelectedPhotoIndex((prev) => (prev! < photos.length - 1 ? prev! + 1 : 0));
  };

  // Keyboard navigation for lightbox
  useEffect(() => {
    if (selectedPhotoIndex === null) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        handlePrevPhoto();
      } else if (e.key === 'ArrowRight') {
        handleNextPhoto();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedPhotoIndex, photos.length]);

  return (
    <div className="space-y-6 select-none font-mono">
      {/* Title Header */}
      <NierSectionHeader title="PHOTOS" />

      {/* Photo Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5">
        {currentlyVisible.map((photo, index) => (
          <div
            key={photo.id}
            onClick={() => openLightbox(index)}
            className="group relative border p-2 sm:p-2.5 nier-photo-card cursor-pointer active:scale-[0.99]"
          >
            {/* Corner Decorative YoRHa Accents */}
            <span className="absolute top-1 left-1 text-[8px] nier-photo-accent">
              +
            </span>
            <span className="absolute top-1 right-1 text-[8px] nier-photo-accent">
              +
            </span>
            <span className="absolute bottom-1 left-1 text-[8px] nier-photo-accent">
              +
            </span>
            <span className="absolute bottom-1 right-1 text-[8px] nier-photo-accent">
              +
            </span>

            {/* Image Container with Hover Scanlines & Glitch */}
            <div className="relative overflow-hidden aspect-[4/3] border nier-photo-img-wrap">
              <img
                src={photo.src}
                alt={photo.title}
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />

              {/* Hover Overlay Hint */}
              <div className="absolute inset-0 bg-black/25 dark:bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <span className="px-2 py-1 text-[10px] font-bold border shadow-[2px_2px_0px_currentColor] flex items-center gap-1 nier-photo-inspect-badge">
                  <Maximize2 className="w-3 h-3" />
                  <span>INSPECT</span>
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Load More Records Button */}
      {hasMore && (
        <div className="text-center pt-4 pb-8">
          <button
            onClick={() => {
              nierAudio.playSelect();
              setVisibleCount((prev) => prev + 12);
            }}
            className="px-6 py-2.5 nier-photo-load-btn border font-bold text-xs tracking-wider transition-all active:scale-[0.98] cursor-pointer"
          >
            LOAD MORE RECORDS [{photos.length - visibleCount} REMAINING]
          </button>
        </div>
      )}

      {/* FULLSCREEN LIGHTBOX INSPECTION MODAL */}
      {activePhoto && (
        <NierModal
          isOpen={true}
          onClose={closeLightbox}
          maxWidth="max-w-5xl"
        >
          <div className="space-y-4 font-mono text-xs">
            {/* Main Lightbox Display */}
            <div className="relative bg-[#181816] border border-[#b4af9a] dark:border-[#444138] overflow-hidden flex items-center justify-center min-h-[300px] max-h-[70vh]">
              <img
                src={activePhoto.src}
                alt={activePhoto.title}
                className="max-h-[68vh] w-auto object-contain mx-auto"
              />

              {/* Prev / Next Navigation Arrows */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handlePrevPhoto();
                }}
                className="absolute left-2 top-1/2 -translate-y-1/2 p-2 border nier-photo-nav-btn cursor-pointer"
                title="Previous Photograph (←)"
                aria-label="Previous Photograph"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleNextPhoto();
                }}
                className="absolute right-2 top-1/2 -translate-y-1/2 p-2 border nier-photo-nav-btn cursor-pointer"
                title="Next Photograph (→)"
                aria-label="Next Photograph"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            {/* Technical EXIF Telemetry Strip */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 p-3 border text-[11px] nier-photo-exif-strip">
              <div>
                <span className="block text-[9px] font-bold nier-photo-exif-label">
                  TIMESTAMP
                </span>
                <span className="font-semibold nier-photo-exif-value">
                  {activePhoto.date} · {activePhoto.time}
                </span>
              </div>

              <div>
                <span className="block text-[9px] font-bold nier-photo-exif-label">
                  SENSOR / RESOLUTION
                </span>
                <span className="font-semibold nier-photo-exif-value">
                  {activePhoto.resolution} PX
                </span>
              </div>

              <div>
                <span className="block text-[9px] font-bold nier-photo-exif-label">
                  HARDWARE
                </span>
                <span className="font-semibold nier-photo-exif-value">
                  {activePhoto.camera} ({activePhoto.software})
                </span>
              </div>

              <div>
                <span className="block text-[9px] font-bold nier-photo-exif-label">
                  APERTURE / SIZE
                </span>
                <span className="font-semibold nier-photo-exif-accent">
                  {activePhoto.aperture} · {activePhoto.fileSize}
                </span>
              </div>
            </div>

            {/* Modal Bottom Actions */}
            <div className="flex items-center justify-end pt-2 border-t border-[#b4af9a]/60 dark:border-[#444138]/60 text-[11px]">
              <a
                href={activePhoto.src}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 border font-bold nier-photo-raw-btn"
              >
                <span>OPEN FULL RAW ASSET</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        </NierModal>
      )}
    </div>
  );
};
