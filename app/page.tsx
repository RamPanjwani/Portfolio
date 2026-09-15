'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { NierHeader } from './components/nier/NierHeader';
import { NierFooter } from './components/nier/NierFooter';
import { NierBootScreen } from './components/nier/NierBootScreen';
import { SystemView } from './components/nier/SystemView';
import { ArsenalView } from './components/nier/ArsenalView';
import { ChipsView } from './components/nier/ChipsView';
import { LogsView } from './components/nier/LogsView';
import { IntelView } from './components/nier/IntelView';
import { CommView } from './components/nier/CommView';
import { nierAudio } from './components/nier/NierAudio';

function PortfolioContent() {
  const searchParams = useSearchParams();
  const initialTab = searchParams.get('tab') || 'system';
  const [activeTab, setActiveTab] = useState<string>(
    ['system', 'arsenal', 'chips', 'logs', 'intel', 'comm'].includes(initialTab) ? initialTab : 'system'
  );
  const [crtEnabled, setCrtEnabled] = useState<boolean>(true);
  const [isBooting, setIsBooting] = useState<boolean>(searchParams.get('noboot') !== 'true');
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  // Hydrate theme on mount
  useEffect(() => {
    const themeParam = searchParams.get('theme');
    const saved = localStorage.getItem('nier_theme') as 'light' | 'dark' | null;
    if (themeParam === 'dark' || saved === 'dark' || (!saved && !themeParam && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      setTheme('dark');
      document.documentElement.classList.add('dark');
    } else {
      setTheme('light');
      document.documentElement.classList.remove('dark');
    }
  }, [searchParams]);

  const toggleTheme = () => {
    const next = theme === 'light' ? 'dark' : 'light';
    setTheme(next);
    localStorage.setItem('nier_theme', next);
    if (next === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    nierAudio.playSelect();
  };

  useEffect(() => {
    const tabParam = searchParams.get('tab');
    if (tabParam && ['system', 'arsenal', 'chips', 'logs', 'intel', 'comm'].includes(tabParam)) {
      setActiveTab(tabParam);
    }
  }, [searchParams]);

  // Keyboard navigation shortcuts [1 - 6]
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't trigger when user is typing inside form inputs
      if (['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement)?.tagName)) {
        return;
      }

      switch (e.key) {
        case '1':
          setActiveTab('system');
          nierAudio.playSelect();
          break;
        case '2':
          setActiveTab('arsenal');
          nierAudio.playSelect();
          break;
        case '3':
          setActiveTab('chips');
          nierAudio.playSelect();
          break;
        case '4':
          setActiveTab('logs');
          nierAudio.playSelect();
          break;
        case '5':
          setActiveTab('intel');
          nierAudio.playSelect();
          break;
        case '6':
          setActiveTab('comm');
          nierAudio.playSelect();
          break;
        default:
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    nierAudio.playSelect();
  };

  const toggleCrt = () => {
    setCrtEnabled((prev) => !prev);
    nierAudio.playHover();
  };

  return (
    <div className="relative min-h-screen flex flex-col justify-between">
      {/* Booting Sequence Overlay */}
      {isBooting && (
        <NierBootScreen onComplete={() => setIsBooting(false)} />
      )}

      {/* CRT Lens Vignette and Scanlines Overlay */}
      {crtEnabled && (
        <>
          <div className="nier-crt-vignette" />
          <div className="nier-crt-scanlines" />
        </>
      )}

      {/* Main Container */}
      <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex-1 flex flex-col justify-between">
        <div className="space-y-6">
          <NierHeader
            activeTab={activeTab}
            onTabChange={handleTabChange}
            crtEnabled={crtEnabled}
            onToggleCrt={toggleCrt}
            onReboot={() => setIsBooting(true)}
            theme={theme}
            onToggleTheme={toggleTheme}
          />

          <main key={activeTab} className="w-full mt-4">
            {activeTab === 'system' && <SystemView onNavigate={handleTabChange} />}
            {activeTab === 'arsenal' && <ArsenalView />}
            {activeTab === 'chips' && <ChipsView />}
            {activeTab === 'logs' && <LogsView />}
            {activeTab === 'intel' && <IntelView />}
            {activeTab === 'comm' && <CommView />}
          </main>
        </div>

        <NierFooter />
      </div>
    </div>
  );
}

export default function Page() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#d1cdb7] flex items-center justify-center font-mono text-sm">YoRHa OS Loading...</div>}>
      <PortfolioContent />
    </Suspense>
  );
}
