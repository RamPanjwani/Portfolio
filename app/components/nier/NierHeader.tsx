'use client';

import React, { useState, useEffect } from 'react';
import { NierButton } from './NierButton';
import { NierBar } from './NierBar';
import { nierAudio } from './NierAudio';
import { Volume2, VolumeX, Monitor, Radio, Compass, Shield, Sun, Moon } from 'lucide-react';

interface NierHeaderProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  crtEnabled: boolean;
  onToggleCrt: () => void;
  onReboot: () => void;
  theme: 'light' | 'dark';
  onToggleTheme: () => void;
}

const TABS = [
  { id: 'system', label: '[01] SYSTEM', sub: 'Profile & Status' },
  { id: 'arsenal', label: '[02] ARSENAL', sub: 'Weapons & Work' },
  { id: 'chips', label: '[03] CHIPS', sub: 'Skills & Plug-ins' },
  { id: 'logs', label: '[04] LOGS', sub: 'Mission Quests' },
  { id: 'intel', label: '[05] INTEL', sub: 'Archives & Notes' },
  { id: 'comm', label: '[06] COMM', sub: 'Transmission' },
];

export const NierHeader: React.FC<NierHeaderProps> = ({
  activeTab,
  onTabChange,
  crtEnabled,
  onToggleCrt,
  onReboot,
  theme,
  onToggleTheme,
}) => {
  const [timeStr, setTimeStr] = useState('');
  const [audioActive, setAudioActive] = useState(true);

  useEffect(() => {
    setAudioActive(nierAudio.enabled);
    const updateClock = () => {
      const d = new Date();
      setTimeStr(
        d.toLocaleTimeString('en-US', {
          hour12: false,
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
        })
      );
    };
    updateClock();
    const interval = setInterval(updateClock, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleAudioToggle = () => {
    const newState = nierAudio.toggle();
    setAudioActive(newState);
  };

  return (
    <header className="w-full space-y-3 select-none">
      {/* Top HUD Telemetry Bar */}
      <div className="flex flex-wrap items-center justify-between border-b border-[#b4af9a] pb-2 text-xs text-[#57544a] gap-2 font-mono">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 font-bold text-[#4e4b42]">
            <span className="w-2 h-2 bg-[#cd664d] animate-pulse" />
            <span>YoRHa HUD // VER 1.0.4</span>
          </div>
          <span className="hidden sm:inline opacity-60">|</span>
          <span className="hidden sm:inline">
            OPERATIONAL UNIT: <strong className="text-[#3f3d36]">RAM PANJWANI</strong>
          </span>
          <span className="hidden md:inline opacity-60">|</span>
          <span className="hidden md:inline">
            SECTOR: <strong className="text-[#3f3d36]">IN // UTC+05:30</strong>
          </span>
        </div>

        {/* Realtime Telemetry Controls */}
        <div className="flex items-center gap-2">
          {timeStr && (
            <span className="bg-[#dad4bb] px-2 py-0.5 border border-[#b4af9a] text-[11px] font-bold text-[#3f3d36]">
              {timeStr}
            </span>
          )}

          {/* Sound Toggle */}
          <button
            onClick={handleAudioToggle}
            className={`flex items-center gap-1 px-2 py-0.5 border text-[11px] font-bold transition-colors ${
              audioActive
                ? 'bg-[#4e4b42] text-[#dad4bb] border-[#4e4b42]'
                : 'bg-[#dad4bb] text-[#57544a] border-[#b4af9a]'
            }`}
            title="Toggle Procedural Web Audio Sound FX"
          >
            {audioActive ? <Volume2 className="w-3 h-3" /> : <VolumeX className="w-3 h-3" />}
            <span>{audioActive ? 'AUDIO: ON' : 'MUTED'}</span>
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
            className={`flex items-center gap-1.5 px-2 py-0.5 border text-[11px] font-bold transition-colors ${
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
            <span>{theme === 'dark' ? 'THEME: DARK' : 'THEME: LIGHT'}</span>
          </button>

          {/* Reboot Sequence Button */}
          <button
            onClick={onReboot}
            className="flex items-center gap-1 px-2 py-0.5 border text-[11px] font-bold bg-[#dad4bb] text-[#57544a] border-[#b4af9a] hover:bg-[#4e4b42] hover:text-[#dad4bb] transition-colors"
            title="Reboot YoRHa System"
          >
            <Radio className="w-3 h-3 text-[#cd664d]" />
            <span className="hidden sm:inline">BOOT LOGS</span>
          </button>
        </div>
      </div>

      {/* Main Navigation Row with Musical Score Bar */}
      <div className="flex items-stretch gap-3">
        {/* Double Bar Musical Score Motif (Hisayoshi Kijima devblog) */}
        <div className="hidden sm:flex items-center">
          <NierBar height="38px" dark={true} />
        </div>

        {/* Navigation Tabs */}
        <nav className="flex-1 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2">
          {TABS.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <NierButton
                key={tab.id}
                active={isActive}
                variant={isActive ? 'primary' : 'secondary'}
                onClick={() => onTabChange(tab.id)}
                className="text-xs"
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
