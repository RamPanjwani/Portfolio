'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { NierHeader } from './components/nier/NierHeader';
import { NierBootScreen } from './components/nier/NierBootScreen';
import { SystemView } from './components/nier/SystemView';
import { ArsenalView } from './components/nier/ArsenalView';
import { ChipsView } from './components/nier/ChipsView';
import { PhotosView } from './components/nier/PhotosView';
import { CommView } from './components/nier/CommView';
import { nierAudio } from './components/nier/NierAudio';

function PortfolioContent() {
  const searchParams = useSearchParams();
  const rawTab = searchParams.get('tab') || 'system';
  const initialTab = rawTab === 'logs' ? 'photos' : rawTab;
  const [activeTab, setActiveTab] = useState<string>(
    ['system', 'arsenal', 'chips', 'photos', 'logs', 'comm'].includes(initialTab) ? initialTab : 'system'
  );
  const [crtEnabled, setCrtEnabled] = useState<boolean>(true);
  const noBoot = searchParams.get('noboot') === 'true';
  const [isBooting, setIsBooting] = useState<boolean>(!noBoot);
  const [showContent, setShowContent] = useState<boolean>(noBoot);
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  // Hydrate theme on mount & respond to device/browser theme
  useEffect(() => {
    const themeParam = searchParams.get('theme');
    const saved = localStorage.getItem('nier_theme') as 'light' | 'dark' | null;

    const getSystemTheme = (): 'light' | 'dark' => {
      if (typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        return 'dark';
      }
      return 'light';
    };

    let effectiveTheme: 'light' | 'dark';
    if (themeParam === 'dark' || themeParam === 'light') {
      effectiveTheme = themeParam;
    } else if (saved === 'dark' || saved === 'light') {
      effectiveTheme = saved;
    } else {
      effectiveTheme = getSystemTheme();
    }

    setTheme(effectiveTheme);
    if (effectiveTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }

    // Listen to device/browser color scheme changes if not explicitly overridden
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleSystemThemeChange = (e: MediaQueryListEvent) => {
      const currentSaved = localStorage.getItem('nier_theme');
      const currentParam = searchParams.get('theme');
      if (!currentSaved && !currentParam) {
        const newTheme = e.matches ? 'dark' : 'light';
        setTheme(newTheme);
        if (newTheme === 'dark') {
          document.documentElement.classList.add('dark');
        } else {
          document.documentElement.classList.remove('dark');
        }
      }
    };

    mediaQuery.addEventListener('change', handleSystemThemeChange);
    return () => mediaQuery.removeEventListener('change', handleSystemThemeChange);
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
    if (tabParam) {
      if (tabParam === 'logs') {
        setActiveTab('photos');
      } else if (['system', 'arsenal', 'chips', 'photos', 'comm'].includes(tabParam)) {
        setActiveTab(tabParam);
      }
    }
  }, [searchParams]);

  // Keyboard navigation shortcuts [1 - 5]
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
          setActiveTab('photos');
          nierAudio.playSelect();
          break;
        case '5':
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

  const handleStartingExit = () => {
    setShowContent(true);
  };

  const handleBootComplete = () => {
    setIsBooting(false);
  };

  return (
    <div className="relative min-h-screen flex flex-col justify-between">
      {/* Booting Sequence Overlay */}
      {isBooting && (
        <NierBootScreen onStartingExit={handleStartingExit} onComplete={handleBootComplete} />
      )}

      {/* CRT Lens Vignette and Scanlines Overlay */}
      {crtEnabled && (
        <>
          <div className="nier-crt-vignette" />
          <div className="nier-crt-scanlines" />
        </>
      )}

      {/* Main Container */}
      <div className="w-full max-w-[1800px] 2xl:max-w-[2000px] mx-auto px-3 sm:px-6 md:px-8 lg:px-10 xl:px-12 py-3 sm:py-6 flex-1 flex flex-col justify-between">
        <div className="space-y-4 sm:space-y-6">
          <NierHeader
            activeTab={activeTab}
            onTabChange={handleTabChange}
            crtEnabled={crtEnabled}
            onToggleCrt={toggleCrt}
            onReboot={() => {
              setShowContent(false);
              setIsBooting(true);
            }}
            theme={theme}
            onToggleTheme={toggleTheme}
          />

          {showContent && (
            <main key={activeTab} className="w-full mt-4">
              {activeTab === 'system' && <SystemView onNavigate={handleTabChange} />}
              {activeTab === 'arsenal' && <ArsenalView />}
              {activeTab === 'chips' && <ChipsView />}
              {(activeTab === 'photos' || activeTab === 'logs') && <PhotosView />}
              {activeTab === 'comm' && <CommView />}
            </main>
          )}
        </div>
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
