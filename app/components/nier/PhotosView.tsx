'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { NierSectionHeader } from './NierSectionHeader';
import { INITIAL_PHOTOS, PhotoItem, PhotoPeriod } from '../../data/photos';
import { NierModal } from './NierModal';
import { nierAudio } from './NierAudio';
import {
  Camera,
  ChevronLeft,
  ChevronRight,
  Maximize2,
  ExternalLink,
  ArrowUpDown,
  Filter,
  Sparkles,
} from 'lucide-react';

export const PhotosView: React.FC = () => {
  const [photos] = useState<PhotoItem[]>(INITIAL_PHOTOS);
  const [selectedPeriod, setSelectedPeriod] = useState<PhotoPeriod>('ALL');
  const [sortAsc, setSortAsc] = useState<boolean>(true);
  const [visibleCount, setVisibleCount] = useState<number>(12);
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState<number | null>(null);

  // Filter photos by period (Morning / Afternoon / All)
  const filteredPhotos = useMemo(() => {
    let result = photos;
    if (selectedPeriod !== 'ALL') {
      result = result.filter((p) => p.period === selectedPeriod);
    }
    return [...result].sort((a, b) => {
      const cmp = a.filename.localeCompare(b.filename);
      return sortAsc ? cmp : -cmp;
    });
  }, [photos, selectedPeriod, sortAsc]);

  const currentlyVisible = filteredPhotos.slice(0, visibleCount);
  const hasMore = visibleCount < filteredPhotos.length;

  // Selected photo for Lightbox modal
  const activePhoto = selectedPhotoIndex !== null ? filteredPhotos[selectedPhotoIndex] : null;

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
    setSelectedPhotoIndex((prev) => (prev! > 0 ? prev! - 1 : filteredPhotos.length - 1));
  };

  const handleNextPhoto = () => {
    if (selectedPhotoIndex === null) return;
    nierAudio.playHover();
    setSelectedPhotoIndex((prev) => (prev! < filteredPhotos.length - 1 ? prev! + 1 : 0));
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
  }, [selectedPhotoIndex, filteredPhotos.length]);

  const morningCount = photos.filter((p) => p.period === 'MORNING').length;
  const afternoonCount = photos.filter((p) => p.period === 'AFTERNOON').length;

  return (
    <div className="space-y-6 select-none font-mono">
      {/* Title Header */}
      <NierSectionHeader title="PHOTOS" />

      {/* YoRHa Optical Archives Telemetry Controls Bar */}
      <div className="border border-[#b4af9a] dark:border-[#444138] bg-[#dad4bb]/90 dark:bg-[#23221e]/90 p-3 sm:p-4 shadow-[3px_3px_0px_#c8c3b0] dark:shadow-[2px_2px_0px_#33312a] space-y-3">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs border-b border-[#b4af9a]/60 dark:border-[#444138]/60 pb-3">
          {/* Telemetry Status */}
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#89a87d] animate-pulse" />
            <span className="font-bold tracking-wider text-[#4e4b42] dark:text-[#dad4bb]">
              OPTICAL ARCHIVES // VISUAL RECONNAISSANCE
            </span>
            <span className="text-[10px] text-[#57544a] dark:text-[#a39e8a] hidden sm:inline">
              [{photos.length} TOTAL RECORDS LOADED]
            </span>
          </div>

          {/* Sort Order Toggle */}
          <button
            onClick={() => {
              nierAudio.playHover();
              setSortAsc((prev) => !prev);
            }}
            className="flex items-center gap-1.5 px-2.5 py-1 border border-[#b4af9a] dark:border-[#444138] text-[11px] font-bold text-[#4e4b42] dark:text-[#dad4bb] hover:bg-[#4e4b42] hover:text-[#dad4bb] dark:hover:bg-[#dad4bb] dark:hover:text-[#23221e] transition-colors cursor-pointer"
            title="Toggle Chronological Sort Order"
          >
            <ArrowUpDown className="w-3 h-3 text-[#cd664d]" />
            <span>ORDER: {sortAsc ? 'CHRONO (ASC)' : 'CHRONO (DESC)'}</span>
          </button>
        </div>

        {/* Filter Navigation Tabs */}
        <div className="flex flex-wrap items-center justify-between gap-2 pt-1">
          <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
            <span className="text-[11px] text-[#57544a] dark:text-[#a39e8a] flex items-center gap-1 mr-1">
              <Filter className="w-3 h-3" />
              <span>FILTER:</span>
            </span>

            {/* ALL */}
            <button
              onClick={() => {
                nierAudio.playSelect();
                setSelectedPeriod('ALL');
                setVisibleCount(12);
              }}
              className={`px-2.5 py-1 text-[11px] font-bold border transition-colors cursor-pointer ${
                selectedPeriod === 'ALL'
                  ? 'bg-[#4e4b42] text-[#dad4bb] border-[#4e4b42]'
                  : 'bg-[#dad4bb] dark:bg-[#23221e] text-[#57544a] dark:text-[#a39e8a] border-[#b4af9a] dark:border-[#444138] hover:bg-[#4e4b42] hover:text-[#dad4bb]'
              }`}
            >
              ALL [{photos.length}]
            </button>

            {/* MORNING */}
            <button
              onClick={() => {
                nierAudio.playSelect();
                setSelectedPeriod('MORNING');
                setVisibleCount(12);
              }}
              className={`px-2.5 py-1 text-[11px] font-bold border transition-colors cursor-pointer ${
                selectedPeriod === 'MORNING'
                  ? 'bg-[#4e4b42] text-[#dad4bb] border-[#4e4b42]'
                  : 'bg-[#dad4bb] dark:bg-[#23221e] text-[#57544a] dark:text-[#a39e8a] border-[#b4af9a] dark:border-[#444138] hover:bg-[#4e4b42] hover:text-[#dad4bb]'
              }`}
            >
              MORNING PATROL [{morningCount}]
            </button>

            {/* AFTERNOON */}
            <button
              onClick={() => {
                nierAudio.playSelect();
                setSelectedPeriod('AFTERNOON');
                setVisibleCount(12);
              }}
              className={`px-2.5 py-1 text-[11px] font-bold border transition-colors cursor-pointer ${
                selectedPeriod === 'AFTERNOON'
                  ? 'bg-[#4e4b42] text-[#dad4bb] border-[#4e4b42]'
                  : 'bg-[#dad4bb] dark:bg-[#23221e] text-[#57544a] dark:text-[#a39e8a] border-[#b4af9a] dark:border-[#444138] hover:bg-[#4e4b42] hover:text-[#dad4bb]'
              }`}
            >
              AFTERNOON RECON [{afternoonCount}]
            </button>
          </div>

          <div className="text-[10px] text-[#57544a] dark:text-[#a39e8a]">
            SHOWING {currentlyVisible.length} OF {filteredPhotos.length}
          </div>
        </div>
      </div>

      {/* Photo Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5">
        {currentlyVisible.map((photo, index) => (
          <div
            key={photo.id}
            onClick={() => openLightbox(index)}
            className="group relative border border-[#b4af9a] dark:border-[#444138] bg-[#dad4bb] dark:bg-[#23221e] p-2 sm:p-2.5 shadow-[3px_3px_0px_#c8c3b0] dark:shadow-[2px_2px_0px_#33312a] hover:border-[#4e4b42] dark:hover:border-[#dad4bb] transition-all cursor-pointer flex flex-col justify-between"
          >
            {/* Corner Decorative YoRHa Accents */}
            <span className="absolute top-1 left-1 text-[8px] text-[#b4af9a] dark:text-[#444138] group-hover:text-[#cd664d] transition-colors">
              +
            </span>
            <span className="absolute top-1 right-1 text-[8px] text-[#b4af9a] dark:text-[#444138] group-hover:text-[#cd664d] transition-colors">
              +
            </span>

            {/* Top Telemetry Header */}
            <div className="flex items-center justify-between text-[9px] text-[#57544a] dark:text-[#a39e8a] pb-1.5 px-0.5 border-b border-[#b4af9a]/40 dark:border-[#444138]/40">
              <span className="font-bold text-[#4e4b42] dark:text-[#dad4bb]">
                {photo.id}
              </span>
              <span>{photo.date} · {photo.time}</span>
            </div>

            {/* Image Container with Hover Scanlines & Glitch */}
            <div className="relative overflow-hidden aspect-[4/3] my-2 bg-[#181816] border border-[#b4af9a]/50 dark:border-[#444138]/50">
              <img
                src={photo.src}
                alt={photo.title}
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />

              {/* Hover Overlay Hint */}
              <div className="absolute inset-0 bg-[#4e4b42]/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <span className="bg-[#dad4bb] text-[#23221e] px-2 py-1 text-[10px] font-bold border border-[#23221e] shadow-[2px_2px_0px_#23221e] flex items-center gap-1">
                  <Maximize2 className="w-3 h-3" />
                  <span>INSPECT</span>
                </span>
              </div>
            </div>

            {/* Bottom Meta Data */}
            <div className="pt-1 border-t border-[#b4af9a]/40 dark:border-[#444138]/40 text-[9px] text-[#57544a] dark:text-[#a39e8a] flex items-center justify-between">
              <span className="truncate">{photo.camera} · {photo.aperture}</span>
              <span className="text-[#89a87d] font-bold">{photo.fileSize}</span>
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
            className="px-6 py-2.5 bg-[#dad4bb] dark:bg-[#23221e] text-[#4e4b42] dark:text-[#dad4bb] border border-[#4e4b42] dark:border-[#dad4bb] font-bold text-xs tracking-wider shadow-[3px_3px_0px_#b4af9a] dark:shadow-[2px_2px_0px_#444138] hover:bg-[#4e4b42] hover:text-[#dad4bb] dark:hover:bg-[#dad4bb] dark:hover:text-[#23221e] transition-all active:scale-[0.98] cursor-pointer"
          >
            LOAD MORE RECORDS [{filteredPhotos.length - visibleCount} REMAINING]
          </button>
        </div>
      )}

      {/* FULLSCREEN LIGHTBOX INSPECTION MODAL */}
      {activePhoto && (
        <NierModal
          isOpen={true}
          onClose={closeLightbox}
          maxWidth="max-w-5xl"
          title={`OPTICAL RECORD // ${activePhoto.id} [${selectedPhotoIndex! + 1}/${filteredPhotos.length}]`}
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
                className="absolute left-2 top-1/2 -translate-y-1/2 p-2 bg-[#dad4bb]/90 dark:bg-[#23221e]/90 text-[#4e4b42] dark:text-[#dad4bb] border border-[#b4af9a] dark:border-[#444138] hover:bg-[#4e4b42] hover:text-[#dad4bb] dark:hover:bg-[#dad4bb] dark:hover:text-[#23221e] transition-colors cursor-pointer"
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
                className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-[#dad4bb]/90 dark:bg-[#23221e]/90 text-[#4e4b42] dark:text-[#dad4bb] border border-[#b4af9a] dark:border-[#444138] hover:bg-[#4e4b42] hover:text-[#dad4bb] dark:hover:bg-[#dad4bb] dark:hover:text-[#23221e] transition-colors cursor-pointer"
                title="Next Photograph (→)"
                aria-label="Next Photograph"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            {/* Technical EXIF Telemetry Strip */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 p-3 bg-[#eae5d2] dark:bg-[#1c1b18] border border-[#b4af9a]/80 dark:border-[#444138]/80 text-[11px]">
              <div>
                <span className="block text-[9px] text-[#57544a] dark:text-[#a39e8a] font-bold">
                  TIMESTAMP
                </span>
                <span className="font-semibold text-[#4e4b42] dark:text-[#dad4bb]">
                  {activePhoto.date} · {activePhoto.time}
                </span>
              </div>

              <div>
                <span className="block text-[9px] text-[#57544a] dark:text-[#a39e8a] font-bold">
                  SENSOR / RESOLUTION
                </span>
                <span className="font-semibold text-[#4e4b42] dark:text-[#dad4bb]">
                  {activePhoto.resolution} PX
                </span>
              </div>

              <div>
                <span className="block text-[9px] text-[#57544a] dark:text-[#a39e8a] font-bold">
                  HARDWARE
                </span>
                <span className="font-semibold text-[#4e4b42] dark:text-[#dad4bb]">
                  {activePhoto.camera} ({activePhoto.software})
                </span>
              </div>

              <div>
                <span className="block text-[9px] text-[#57544a] dark:text-[#a39e8a] font-bold">
                  APERTURE / SIZE
                </span>
                <span className="font-semibold text-[#89a87d]">
                  {activePhoto.aperture} · {activePhoto.fileSize}
                </span>
              </div>
            </div>

            {/* Modal Bottom Actions */}
            <div className="flex items-center justify-between pt-2 border-t border-[#b4af9a]/60 dark:border-[#444138]/60 text-[11px]">
              <span className="text-[#57544a] dark:text-[#a39e8a]">
                NAVIGATE: [← / →] · ESCAPE: [CLOSE]
              </span>

              <a
                href={activePhoto.src}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#4e4b42] text-[#dad4bb] dark:bg-[#dad4bb] dark:text-[#23221e] hover:opacity-90 transition-opacity font-bold"
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
