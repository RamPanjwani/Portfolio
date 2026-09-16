'use client';

import React, { useState, useEffect } from 'react';
import { NierButton } from './NierButton';
import { NierBar } from './NierBar';
import { nierAudio } from './NierAudio';
import { Volume2, VolumeX, Monitor, Sun, Moon, Menu, X } from 'lucide-react';

interface NierHeaderProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  crtEnabled: boolean;
  onToggleCrt: () => void;
  onReboot: () => void;
  theme: 'light' | 'dark';
  onToggleTheme: () => void;
}

import { NAVIGATION_TABS} from '../../data/navigation';

export const NierHeader: React.FC<NierHeaderProps> = ({
  activeTab,
  onTabChange,
  crtEnabled,
  onToggleCrt,
  onReboot,
  theme,
  onToggleTheme,
}) => {
  const [audioActive, setAudioActive] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    setAudioActive(nierAudio.enabled);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [activeTab]);

  const handleAudioToggle = () => {
    const newState = nierAudio.toggle();
    setAudioActive(newState);
  };

  return (
    <header className="w-full space-y-3 select-none">
      {/* Top HUD Telemetry Bar */}
      <div className="flex flex-wrap items-center justify-between border-b border-[#b4af9a] pb-2 text-xs text-[#57544a] gap-2 font-mono">
        {/* Realtime Telemetry Controls */}
        <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
          {/* Sound Toggle */}
          <button
            onClick={handleAudioToggle}
            className={`flex items-center gap-1 px-1.5 sm:px-2 py-0.5 border text-[10px] sm:text-[11px] font-bold transition-colors ${
              audioActive
                ? 'bg-[#4e4b42] text-[#dad4bb] border-[#4e4b42]'
                : 'bg-[#dad4bb] text-[#57544a] border-[#b4af9a]'
            }`}
            title="Toggle Procedural Web Audio Sound FX"
          >
            {audioActive ? <Volume2 className="w-3 h-3" /> : <VolumeX className="w-3 h-3" />}
            <span><span className="hidden xs:inline">AUDIO: </span>{audioActive ? 'ON' : 'MUTED'}</span>
          </button>

          {/* CRT Filter Toggle */}
          <button
            onClick={onToggleCrt}
            className={`hidden sm:flex items-center gap-1 px-2 py-0.5 border text-[11px] font-bold transition-colors ${
              crtEnabled
                ? 'bg-[#4e4b42] text-[#dad4bb] border-[#4e4b42]'
                : 'bg-[#dad4bb] text-[#57544a] border-[#b4af9a]'
            }`}
            title="Toggle CRT Lens Vignette & Scanlines"
          >
            <Monitor className="w-3 h-3" />
            <span>{crtEnabled ? 'CRT: ACTIVE' : 'FLAT'}</span>
          </button>

          {/* Theme Toggle (Light / Dark Mode) */}
          <button
            onClick={onToggleTheme}
            className={`flex items-center gap-1 sm:gap-1.5 px-1.5 sm:px-2 py-0.5 border text-[10px] sm:text-[11px] font-bold transition-colors ${
              theme === 'dark'
                ? 'bg-[#38362f] text-[#dad4bb] border-[#b4af9a]'
                : 'bg-[#dad4bb] text-[#4e4b42] border-[#b4af9a] hover:bg-[#4e4b42] hover:text-[#dad4bb]'
            }`}
            title={`Current: ${theme === 'dark' ? 'Dark Terminal' : 'Command Beige'}. Click to switch theme.`}
          >
            {theme === 'dark' ? (
              <Moon className="w-3.5 h-3.5 text-[#cd664d]" />
            ) : (
              <Sun className="w-3.5 h-3.5 text-[#cd664d]" />
            )}
            <span><span className="hidden xs:inline">THEME: </span>{theme === 'dark' ? 'DARK' : 'LIGHT'}</span>
          </button>

          </div>
      </div>

      {/* Mobile Navigation Header Bar (< sm) */}
      <div className="flex sm:hidden items-stretch gap-2.5 w-full">
        <div className="flex items-center">
          <NierBar height="38px" dark={true} />
        </div>

        <button
          onClick={() => {
            setMenuOpen((prev) => !prev);
            nierAudio.playSelect();
          }}
          className={`flex-1 flex items-center justify-between px-3.5 py-2 border text-xs font-mono font-bold transition-all shadow-[2px_2px_0px_#b4af9a] active:scale-[0.99] active:translate-y-[1px] ${
            menuOpen
              ? 'bg-[#4e4b42] text-[#dad4bb] border-[#4e4b42]'
              : 'bg-[#dad4bb] text-[#3f3d36] border-[#4e4b42] hover:bg-[#eae5d2]'
          }`}
          aria-expanded={menuOpen}
          aria-label="Toggle Navigation Menu"
        >
          <div className="flex items-center gap-2 min-w-0">
            <span className={`w-2 h-2 rotate-45 shrink-0 ${menuOpen ? 'bg-[#dad4bb]' : 'bg-[#cd664d]'}`} />
            <span className="truncate tracking-wider font-bold text-xs sm:text-sm">
              {NAVIGATION_TABS.find((t) => activeTab === t.id || (t.id === 'photos' && activeTab === 'logs'))?.label || '[01] SYSTEM'}
            </span>
          </div>

          <div className="flex items-center gap-1.5 shrink-0 text-xs font-mono ml-2">
            <span className="text-[10px] tracking-wider opacity-80">{menuOpen ? 'CLOSE' : 'MENU'}</span>
            {menuOpen ? <X className="w-4 h-4 shrink-0" /> : <Menu className="w-4 h-4 shrink-0" />}
          </div>
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
      {menuOpen && (
        <nav className="sm:hidden grid grid-cols-1 gap-1.5 p-2 bg-[#eae5d2] border border-[#4e4b42] shadow-[3px_3px_0px_#b4af9a] nier-slide-in">
          {NAVIGATION_TABS.map((tab) => {
            const isActive = activeTab === tab.id || (tab.id === 'photos' && activeTab === 'logs');
            return (
              <NierButton
                key={tab.id}
                active={isActive}
                variant={isActive ? 'primary' : 'secondary'}
                onClick={() => {
                  onTabChange(tab.id);
                  setMenuOpen(false);
                }}
                className="text-xs w-full py-2"
              >
                <span>{tab.label}</span>
              </NierButton>
            );
          })}
        </nav>
      )}

      {/* Desktop Navigation Row with Musical Score Bar (>= sm) */}
      <div className="hidden sm:flex items-stretch gap-3">
        {/* Double Bar Musical Score Motif (Hisayoshi Kijima devblog) */}
        <div className="flex items-center">
          <NierBar height="38px" dark={true} />
        </div>

        {/* Navigation Tabs */}
        <nav className="flex-1 grid sm:grid-cols-3 lg:grid-cols-6 gap-1.5 sm:gap-2">
          {NAVIGATION_TABS.map((tab) => {
            const isActive = activeTab === tab.id || (tab.id === 'photos' && activeTab === 'logs');
            return (
              <NierButton
                key={tab.id}
                active={isActive}
                variant={isActive ? 'primary' : 'secondary'}
                onClick={() => onTabChange(tab.id)}
                className="text-[11px] sm:text-xs"
              >
                <span>{tab.label}</span>
              </NierButton>
            );
          })}
        </nav>
      </div>

      {/* Analog Border Strip: Solid divider line + Dotted alternating dash line */}
      <div className="relative pt-1">
        <div className="w-full h-[1px] bg-[#4e4b42]" />
        <div
          className="w-full h-[3px] mt-[2px]"
          style={{
            backgroundImage: 'linear-gradient(to right, #4e4b42 14%, rgba(0, 0, 0, 0) 0%)',
            backgroundSize: '40px 3px',
            backgroundRepeat: 'repeat-x',
          }}
        />
      </div>
    </header>
  );
};
