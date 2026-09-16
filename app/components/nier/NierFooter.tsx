'use client';

import React from 'react';
import { NierBar } from './NierBar';
import { FOOTER_CONFIG } from '../../data/navigation';

export const NierFooter: React.FC = () => {
  return (
    <footer className="w-full pt-8 pb-4 space-y-3 font-mono text-xs text-[#57544a] select-none">
      {/* Top analog decorative line for the footer */}
      <div className="relative">
        <div
          className="w-full h-[3px]"
          style={{
            backgroundImage: 'linear-gradient(to right, #4e4b42 14%, rgba(0, 0, 0, 0) 0%)',
            backgroundSize: '40px 3px',
            backgroundRepeat: 'repeat-x',
          }}
        />
        <div className="w-full h-[1px] bg-[#4e4b42] mt-[2px]" />
      </div>

      {/* Main footer info */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pt-1">
        <div className="flex items-center gap-3">
          <NierBar height="24px" dark={false} />
          <div className="space-y-0.5">
            <p className="font-bold text-[#3f3d36] text-xs">
              {FOOTER_CONFIG.unitName} // {FOOTER_CONFIG.systemTitle}
            </p>
            <p className="text-[11px] text-[#57544a]">
              {FOOTER_CONFIG.tributeNotice}
            </p>
          </div>
        </div>

        {/* Controller / Keyboard guidance shortcuts */}
        <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-[10px] sm:text-[11px] bg-[#dad4bb] border border-[#b4af9a] px-2.5 sm:px-3 py-1 sm:py-1.5 shadow-[2px_2px_0px_#b4af9a]">
          {FOOTER_CONFIG.shortcuts.map((sc, i) => (
            <React.Fragment key={sc.label}>
              <span className="font-bold text-[#4e4b42]">
                {sc.label} {sc.action}
              </span>
              <span>//</span>
            </React.Fragment>
          ))}
          <span className="font-bold text-[#89a87d]">{FOOTER_CONFIG.statusIndicator}</span>
        </div>
      </div>

      {/* Philosophical quote */}
      <div className="text-center pt-2 text-[10px] text-[#57544a] italic opacity-80">
        {FOOTER_CONFIG.philosophicalQuote}
      </div>
    </footer>
  );
};
