'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Title } from './Title';
import { ShuffleText } from './ShuffleText';
import { nierAudio } from './NierAudio';
import { INITIAL_PHOTOS, PhotoItem, PhotoCategory } from '../../data/photos';
import {
  MapPin,
  Maximize2,
  X,
  ChevronLeft,
  ChevronRight,
  Upload,
  Info,
  ExternalLink,
} from 'lucide-react';

import { NierSectionHeader } from './NierSectionHeader';
import { NierBadge } from './NierBadge';
import { NierModal } from './NierModal';

export const PhotosView: React.FC = () => {
  const [photos, setPhotos] = useState<PhotoItem[]>(INITIAL_PHOTOS);
  const [activeCategory, setActiveCategory] = useState<PhotoCategory>('ALL');
  const [selectedPhoto, setSelectedPhoto] = useState<PhotoItem | null>(null);
  const [isImportModalOpen, setIsImportModalOpen] = useState(false);

  // Quick Photo Add Form States
  const [newTitle, setNewTitle] = useState('');
  const [newLocation, setNewLocation] = useState('');
  const [newCategory, setNewCategory] = useState<PhotoCategory>('URBAN');
  const [newCamera, setNewCamera] = useState('');
  const [newLens, setNewLens] = useState('');
  const [newSettings, setNewSettings] = useState('');
  const [newFieldNotes, setNewFieldNotes] = useState('');
  const [newImagePreview, setNewImagePreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Sync user saved custom photos from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem('nier_user_photos');
      if (saved) {
        const parsed: PhotoItem[] = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setPhotos([...parsed, ...INITIAL_PHOTOS]);
        }
      }
    } catch {
      // ignore
    }
  }, []);

  // Keyboard navigation for inspector
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!selectedPhoto) return;

      if (e.key === 'Escape') {
        setSelectedPhoto(null);
        nierAudio.playSelect();
      } else if (e.key === 'ArrowRight') {
        navigatePhoto(1);
      } else if (e.key === 'ArrowLeft') {
        navigatePhoto(-1);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedPhoto, photos, activeCategory]);

  const filteredPhotos = activeCategory === 'ALL'
    ? photos
    : photos.filter((p) => p.category === activeCategory);

  const navigatePhoto = (direction: number) => {
    if (!selectedPhoto) return;
    const currentIndex = filteredPhotos.findIndex((p) => p.id === selectedPhoto.id);
    if (currentIndex === -1) return;
    const nextIndex = (currentIndex + direction + filteredPhotos.length) % filteredPhotos.length;
    setSelectedPhoto(filteredPhotos[nextIndex]);
    nierAudio.playSelect();
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddPhotoSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newImagePreview || !newTitle.trim()) return;

    const newPhoto: PhotoItem = {
      id: `opt-${Date.now().toString().slice(-4)}`,
      title: newTitle.toUpperCase(),
      src: newImagePreview,
      date: new Date().toISOString().slice(0, 10).replace(/-/g, '.'),
      location: newLocation.trim() || 'Sector Classified',
      category: newCategory,
      camera: newCamera.trim() || 'YoRHa Optical Unit',
      lens: newLens.trim() || 'Standard Prime',
      settings: newSettings.trim() || '50mm · f/2.0 · 1/250s · ISO 200',
      fieldNotes: newFieldNotes.trim() || 'Tactical photographic record captured on site.',
    };

    const updated = [newPhoto, ...photos];
    setPhotos(updated);

    try {
      const customOnly = updated.filter((p) => !INITIAL_PHOTOS.some((init) => init.id === p.id));
      localStorage.setItem('nier_user_photos', JSON.stringify(customOnly));
    } catch {
      // ignore
    }

    // Reset form
    setNewTitle('');
    setNewLocation('');
    setNewCamera('');
    setNewLens('');
    setNewSettings('');
    setNewFieldNotes('');
    setNewImagePreview(null);
    setIsImportModalOpen(false);
    setSelectedPhoto(newPhoto);
    nierAudio.playSelect();
  };

  return (
    <div className="space-y-6">
      {/* Title & Telemetry Header */}
      <NierSectionHeader
        title="PHOTOS"
      />


      {/* Gallery Grid */}
      {filteredPhotos.length === 0 ? (
        <div className="border border-[#b4af9a] bg-[#dad4bb]/60 p-12 text-center font-mono space-y-2">
          <p className="text-sm text-[#4e4b42] font-bold">NO OPTICAL RECORDS FOUND IN CATEGORY [{activeCategory}]</p>
          <p className="text-xs text-[#57544a]">Select another category filter to view records.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4 gap-5">
          {filteredPhotos.map((photo, idx) => {
            const stagger = `stagger-${Math.min((idx % 5) + 2, 6)}`;
            return (
              <div
                key={photo.id}
                onClick={() => {
                  setSelectedPhoto(photo);
                  nierAudio.playSelect();
                }}
                onMouseEnter={() => nierAudio.playHover()}
                className={`group relative cursor-pointer border border-[#b4af9a] bg-[#dad4bb] shadow-[2px_2px_0px_#b4af9a] transition-all duration-200 hover:border-[#4e4b42] hover:bg-[#eae5d2] hover:shadow-[4px_4px_0px_#b4af9a] active:scale-[0.99] nier-slide-in ${stagger}`}
              >
                {/* Tactical Top Bar */}
                <div className="flex items-center justify-between px-3 py-1.5 border-b border-[#b4af9a] bg-[#eae5d2] text-[10px] font-mono text-[#57544a]">
                  <div className="flex items-center gap-1.5 font-bold text-[#3f3d36]">
                    <span className="w-1.5 h-1.5 bg-[#cd664d]" />
                    <span>[{photo.id.toUpperCase()}]</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <NierBadge variant="muted" size="sm">
                      {photo.category}
                    </NierBadge>
                    <span>{photo.date}</span>
                  </div>
                </div>

                {/* Photo Container with Corner Brackets & Aspect Ratio */}
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#eae5d2] border-b border-[#b4af9a]">
                  {/* Subtle crosshair reticles */}
                  <span className="absolute top-1.5 left-1.5 text-[10px] text-[#57544a]/80 font-mono select-none pointer-events-none z-10">+</span>
                  <span className="absolute top-1.5 right-1.5 text-[10px] text-[#57544a]/80 font-mono select-none pointer-events-none z-10">+</span>
                  <span className="absolute bottom-1.5 left-1.5 text-[10px] text-[#57544a]/80 font-mono select-none pointer-events-none z-10">+</span>
                  <span className="absolute bottom-1.5 right-1.5 text-[10px] text-[#57544a]/80 font-mono select-none pointer-events-none z-10">+</span>

                  <img
                    src={photo.src}
                    alt={photo.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />

                  {/* Subtle hover overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#dad4bb]/85 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                  {/* Hover Telemetry HUD overlay */}
                  <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between text-[#3f3d36] text-[11px] font-mono opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    <span className="flex items-center gap-1 bg-[#eae5d2] text-[#3f3d36] px-2 py-0.5 border border-[#b4af9a] shadow-sm font-bold">
                      <Maximize2 className="w-3 h-3 text-[#cd664d]" />
                      <span>INSPECT // TELEMETRY</span>
                    </span>
                    {photo.camera && (
                      <span className="hidden sm:inline-block bg-[#eae5d2] text-[#3f3d36] px-1.5 py-0.5 border border-[#b4af9a] text-[10px] font-bold">
                        {photo.camera}
                      </span>
                    )}
                  </div>
                </div>

                {/* Card Info Footer */}
                <div className="p-3 space-y-1.5 bg-[#dad4bb] group-hover:bg-[#eae5d2] transition-colors">
                  <h4 className="text-xs font-bold font-mono text-[#3f3d36] tracking-wide line-clamp-1 group-hover:text-[#cd664d] transition-colors">
                    {photo.title}
                  </h4>

                  <div className="flex flex-wrap items-center justify-between text-[10px] font-mono text-[#57544a] pt-1.5 border-t border-[#b4af9a]">
                    <div className="flex items-center gap-1 truncate max-w-[65%]">
                      <MapPin className="w-3 h-3 shrink-0 text-[#cd664d]" />
                      <span className="truncate">{photo.location}</span>
                    </div>
                    {photo.settings && (
                      <span className="opacity-80 truncate text-[9px] font-semibold">{photo.settings.split('·')[0]}</span>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* TACTICAL PHOTO INSPECTOR / LIGHTBOX MODAL - 100% LIGHT IN LIGHT MODE */}
      {selectedPhoto && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-[#dad4bb]/85 backdrop-blur-md animate-in fade-in duration-150"
          onClick={() => setSelectedPhoto(null)}
        >
          <div
            className="relative w-full max-w-5xl max-h-[92vh] flex flex-col lg:flex-row bg-[#dad4bb] border-2 border-[#b4af9a] shadow-[6px_6px_0px_#57544a] overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Left: Main Photographic Feed */}
            <div className="relative flex-1 bg-[#eae5d2] border-b lg:border-b-0 lg:border-r border-[#b4af9a] flex items-center justify-center min-h-[220px] sm:min-h-[300px] lg:min-h-[520px] max-h-[46vh] lg:max-h-none overflow-hidden p-2 sm:p-3">
              {/* Tactical reticles */}
              <div className="absolute top-2.5 left-2.5 text-[9px] sm:text-[10px] font-mono text-[#57544a] font-bold z-10 bg-[#dad4bb]/90 px-1.5 py-0.5 border border-[#b4af9a]">
                [OPTICAL FEED // SENSOR RAW]
              </div>
              <div className="absolute top-2.5 right-2.5 text-[9px] sm:text-[10px] font-mono text-[#57544a] font-bold z-10 bg-[#dad4bb]/90 px-1.5 py-0.5 border border-[#b4af9a]">
                {selectedPhoto.category}
              </div>

              <div className="relative max-h-[40vh] sm:max-h-[50vh] lg:max-h-[85vh] border border-[#b4af9a] bg-[#dad4bb] p-1.5 shadow-[2px_2px_0px_#b4af9a] flex items-center justify-center">
                <img
                  src={selectedPhoto.src}
                  alt={selectedPhoto.title}
                  className="max-h-[36vh] sm:max-h-[46vh] lg:max-h-[78vh] w-auto max-w-full object-contain select-none"
                />
              </div>

              {/* Prev / Next Navigation Buttons */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  navigatePhoto(-1);
                }}
                className="absolute left-2 sm:left-3 top-1/2 -translate-y-1/2 p-1.5 sm:p-2 bg-[#dad4bb] text-[#3f3d36] border border-[#b4af9a] hover:bg-[#eae5d2] hover:border-[#4e4b42] transition-colors shadow-[2px_2px_0px_#b4af9a]"
                title="Previous Photo (Left Arrow)"
              >
                <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  navigatePhoto(1);
                }}
                className="absolute right-2 sm:right-3 top-1/2 -translate-y-1/2 p-1.5 sm:p-2 bg-[#dad4bb] text-[#3f3d36] border border-[#b4af9a] hover:bg-[#eae5d2] hover:border-[#4e4b42] transition-colors shadow-[2px_2px_0px_#b4af9a]"
                title="Next Photo (Right Arrow)"
              >
                <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
            </div>

            {/* Right: Optical Telemetry & Metadata HUD */}
            <div className="w-full lg:w-96 shrink-0 flex flex-col justify-between border-t lg:border-t-0 border-[#b4af9a] p-3.5 sm:p-5 font-mono overflow-y-auto max-h-[44vh] lg:max-h-[85vh] bg-[#dad4bb]">
              <div className="space-y-4">
                {/* Modal Header Bar */}
                <div className="flex items-center justify-between pb-2 border-b border-[#b4af9a]">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-[#cd664d] animate-pulse" />
                    <span className="text-xs font-bold text-[#3f3d36]">
                      [{selectedPhoto.id.toUpperCase()}]
                    </span>
                  </div>
                  <button
                    onClick={() => {
                      setSelectedPhoto(null);
                      nierAudio.playSelect();
                    }}
                    className="p-1 border border-[#b4af9a] bg-[#eae5d2] hover:bg-[#dad4bb] transition-colors text-[#3f3d36]"
                    title="Close Inspector (Esc)"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                {/* Title */}
                <div>
                  <div className="text-[10px] text-[#57544a] uppercase tracking-widest">RECORD TITLE</div>
                  <h3 className="text-sm font-bold text-[#3f3d36] leading-snug">
                    {selectedPhoto.title}
                  </h3>
                </div>

                {/* Telemetry Matrix */}
                <div className="space-y-2 text-xs bg-[#eae5d2] p-3 border border-[#b4af9a] shadow-[2px_2px_0px_#b4af9a]">
                  <div className="flex justify-between items-center text-[11px] pb-1 border-b border-[#b4af9a]/60">
                    <span className="text-[#57544a]">TIMESTAMP</span>
                    <span className="font-bold text-[#3f3d36]">{selectedPhoto.date}</span>
                  </div>

                  <div className="flex justify-between items-start text-[11px] pb-1 border-b border-[#b4af9a]/60">
                    <span className="text-[#57544a]">LOCATION</span>
                    <span className="font-bold text-[#3f3d36] text-right">{selectedPhoto.location}</span>
                  </div>

                  {selectedPhoto.camera && (
                    <div className="flex justify-between items-center text-[11px] pb-1 border-b border-[#b4af9a]/60">
                      <span className="text-[#57544a]">HARDWARE</span>
                      <span className="font-bold text-[#3f3d36]">{selectedPhoto.camera}</span>
                    </div>
                  )}

                  {selectedPhoto.lens && (
                    <div className="flex justify-between items-center text-[11px] pb-1 border-b border-[#b4af9a]/60">
                      <span className="text-[#57544a]">OPTICS</span>
                      <span className="font-bold text-[#3f3d36]">{selectedPhoto.lens}</span>
                    </div>
                  )}

                  {selectedPhoto.settings && (
                    <div className="flex justify-between items-center text-[11px]">
                      <span className="text-[#57544a]">PARAMETERS</span>
                      <span className="font-bold text-[#cd664d]">{selectedPhoto.settings}</span>
                    </div>
                  )}
                </div>

                {/* Field Notes */}
                {selectedPhoto.fieldNotes && (
                  <div className="space-y-1 text-xs">
                    <div className="text-[10px] text-[#57544a] uppercase tracking-widest flex items-center gap-1 font-bold">
                      <Info className="w-3 h-3 text-[#cd664d]" />
                      <span>OPERATIONAL FIELD NOTES</span>
                    </div>
                    <div className="bg-[#eae5d2] p-2.5 border border-[#b4af9a] shadow-[2px_2px_0px_#b4af9a]">
                      <p className="text-[11px] text-[#3f3d36] leading-relaxed border-l-2 border-[#cd664d] pl-2">
                        {selectedPhoto.fieldNotes}
                      </p>
                    </div>
                  </div>
                )}

                {/* Synthetic Histogram Simulation */}
                <div className="space-y-1 pt-1">
                  <div className="text-[9px] text-[#57544a] tracking-widest uppercase font-bold">
                    SPECTRAL DENSITY // EXPOSURE BALANCE
                  </div>
                  <div className="flex items-end gap-0.5 h-6 bg-[#eae5d2] p-1 border border-[#b4af9a] shadow-[2px_2px_0px_#b4af9a]">
                    {[35, 50, 75, 90, 60, 45, 80, 100, 70, 55, 40, 25, 65, 85, 30].map((val, i) => (
                      <div
                        key={i}
                        className="flex-1 bg-[#57544a] opacity-75"
                        style={{ height: `${val}%` }}
                      />
                    ))}
                  </div>
                </div>
              </div>

              {/* Bottom Quick Controls */}
              <div className="pt-4 border-t border-[#b4af9a] flex items-center justify-between text-xs">
                <a
                  href={selectedPhoto.src}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 text-[11px] text-[#3f3d36] font-bold px-2 py-0.5 border border-[#b4af9a] bg-[#eae5d2] hover:bg-[#dad4bb] transition-colors"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>VIEW RAW ASSET</span>
                </a>
                <span className="text-[10px] text-[#57544a]">ESC: CLOSE · ←/→: NAV</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* QUICK IMPORT / ADD PHOTO MODAL */}
      <NierModal
        isOpen={isImportModalOpen}
        onClose={() => setIsImportModalOpen(false)}
        title="IMPORT OPTICAL RECORD // NEW ENTRY"
        maxWidth="max-w-lg"
      >
        <form onSubmit={handleAddPhotoSubmit} className="space-y-3.5 text-xs">
          {/* File Picker or Drag Zone */}
          <div className="space-y-1">
            <label className="block text-[10px] font-bold uppercase tracking-wider text-[#57544a]">
              SELECT PHOTOGRAPH FILE *
            </label>
            <input
              type="file"
              ref={fileInputRef}
              accept="image/*"
              onChange={handleFileUpload}
              className="hidden"
            />
            <div
              onClick={() => fileInputRef.current?.click()}
              className="cursor-pointer border-2 border-dashed border-[#b4af9a] hover:border-[#4e4b42] bg-[#eae5d2] p-4 text-center transition-colors"
            >
              {newImagePreview ? (
                <div className="space-y-2">
                  <img
                    src={newImagePreview}
                    alt="Preview"
                    className="max-h-40 mx-auto object-cover border border-[#57544a]"
                  />
                  <p className="text-[10px] text-[#cd664d] font-bold">CLICK TO CHANGE IMAGE</p>
                </div>
              ) : (
                <div className="space-y-1.5 py-3">
                  <Upload className="w-6 h-6 mx-auto text-[#57544a]" />
                  <p className="font-bold text-[#3f3d36]">CLICK TO BROWSE IMAGE FILE</p>
                  <p className="text-[10px] text-[#57544a]">JPG, PNG, WEBP supported</p>
                </div>
              )}
            </div>
          </div>

          {/* Title */}
          <div className="space-y-1">
            <label className="block text-[10px] font-bold uppercase tracking-wider text-[#57544a]">
              PHOTO TITLE *
            </label>
            <input
              type="text"
              required
              placeholder="e.g. MONSOON SKYLINE // SECTOR 04"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              className="w-full bg-[#eae5d2] border border-[#b4af9a] px-2.5 py-1.5 text-xs text-[#3f3d36] focus:outline-none focus:border-[#4e4b42]"
            />
          </div>

          {/* Category & Location */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="block text-[10px] font-bold uppercase tracking-wider text-[#57544a]">
                CATEGORY
              </label>
              <select
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value as any)}
                className="w-full bg-[#eae5d2] border border-[#b4af9a] px-2 py-1.5 text-xs text-[#3f3d36] focus:outline-none"
              >
                <option value="URBAN">URBAN</option>
                <option value="STREET">STREET</option>
                <option value="ARCHITECTURE">ARCHITECTURE</option>
                <option value="MONOCHROME">MONOCHROME</option>
                <option value="NATURE">NATURE</option>
              </select>
            </div>
            <div className="space-y-1">
              <label className="block text-[10px] font-bold uppercase tracking-wider text-[#57544a]">
                LOCATION
              </label>
              <input
                type="text"
                placeholder="e.g. Mumbai // Fort Area"
                value={newLocation}
                onChange={(e) => setNewLocation(e.target.value)}
                className="w-full bg-[#eae5d2] border border-[#b4af9a] px-2.5 py-1.5 text-xs text-[#3f3d36] focus:outline-none"
              />
            </div>
          </div>

          {/* Hardware & Settings */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="block text-[10px] font-bold uppercase tracking-wider text-[#57544a]">
                CAMERA & LENS
              </label>
              <input
                type="text"
                placeholder="e.g. Sony A7 IV / 35mm"
                value={newCamera}
                onChange={(e) => setNewCamera(e.target.value)}
                className="w-full bg-[#eae5d2] border border-[#b4af9a] px-2.5 py-1.5 text-xs text-[#3f3d36] focus:outline-none"
              />
            </div>
            <div className="space-y-1">
              <label className="block text-[10px] font-bold uppercase tracking-wider text-[#57544a]">
                EXPOSURE PARAMETERS
              </label>
              <input
                type="text"
                placeholder="e.g. 35mm · f/2.8 · 1/500s · ISO 100"
                value={newSettings}
                onChange={(e) => setNewSettings(e.target.value)}
                className="w-full bg-[#eae5d2] border border-[#b4af9a] px-2.5 py-1.5 text-xs text-[#3f3d36] focus:outline-none"
              />
            </div>
          </div>

          {/* Field Notes */}
          <div className="space-y-1">
            <label className="block text-[10px] font-bold uppercase tracking-wider text-[#57544a]">
              FIELD NOTES / DESCRIPTION
            </label>
            <textarea
              rows={2}
              placeholder="Notes about lighting, composition, or subject..."
              value={newFieldNotes}
              onChange={(e) => setNewFieldNotes(e.target.value)}
              className="w-full bg-[#eae5d2] border border-[#b4af9a] px-2.5 py-1.5 text-xs text-[#3f3d36] focus:outline-none resize-none"
            />
          </div>

          {/* Form Action Buttons */}
          <div className="pt-2 flex items-center justify-end gap-2 border-t border-[#b4af9a]">
            <button
              type="button"
              onClick={() => setIsImportModalOpen(false)}
              className="px-3 py-1.5 border border-[#b4af9a] text-[#57544a] hover:bg-[#eae5d2]"
            >
              CANCEL
            </button>
            <button
              type="submit"
              disabled={!newImagePreview || !newTitle.trim()}
              className="px-4 py-1.5 bg-[#dad4bb] text-[#3f3d36] border border-[#57544a] font-bold disabled:opacity-40 disabled:cursor-not-allowed hover:bg-[#eae5d2] transition-colors shadow-sm"
            >
              RECORD TO ARCHIVE
            </button>
          </div>
        </form>
      </NierModal>
    </div>
  );
};
