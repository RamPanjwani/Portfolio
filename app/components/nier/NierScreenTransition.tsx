'use client';

import React, { useEffect, useState } from 'react';
import { nierAudio } from './NierAudio';

interface NierScreenTransitionProps {
  activeTab: string;
}

export const NierScreenTransition: React.FC<NierScreenTransitionProps> = ({ activeTab }) => {
  const [animating, setAnimating] = useState(false);

  useEffect(() => {
    setAnimating(true);
    nierAudio.playTab();
    const timer = setTimeout(() => {
      setAnimating(false);
    }, 450);
    return () => clearTimeout(timer);
  }, [activeTab]);

  if (!animating) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden" aria-hidden="true">
      {/* Top angled sweep bar */}
      <div
        className="absolute top-0 left-0 w-full h-1/2 bg-[#4e4b42]/20 backdrop-blur-[1px] animate-nier-slide-left border-b border-[#4e4b42]"
      />
      {/* Bottom angled sweep bar */}
      <div
        className="absolute bottom-0 left-0 w-full h-1/2 bg-[#4e4b42]/20 backdrop-blur-[1px] animate-nier-slide-right border-t border-[#4e4b42]"
      />
      {/* Center flash scanline */}
      <div className="absolute top-1/2 left-0 right-0 h-[2px] bg-[#cd664d] shadow-[0_0_8px_#cd664d] animate-pulse" />
    </div>
  );
};
