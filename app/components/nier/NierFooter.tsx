'use client';

import React from 'react';
import { NierBar } from './NierBar';

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
              RAM PANJWANI // SYSTEM PORTFOLIO
            </p>
            <p className="text-[11px] text-[#57544a]">
              TRIBUTE TO YOKO TARO & HISAYOSHI KIJIMA (PLATINUMGAMES)
            </p>
          </div>
        </div>

        {/* Controller / Keyboard guidance shortcuts */}
        <div className="flex flex-wrap items-center gap-3 text-[11px] bg-[#dad4bb] border border-[#b4af9a] px-3 py-1.5 shadow-[2px_2px_0px_#b4af9a]">
          <span className="font-bold text-[#4e4b42]">[1 - 6] DIRECT JUMP</span>
          <span>//</span>
          <span className="font-bold text-[#4e4b42]">[CLICK] EXECUTE</span>
          <span>//</span>
          <span className="font-bold text-[#89a87d]">POD 042: ONLINE</span>
        </div>
      </div>

      {/* Philosophical quote */}
      <div className="text-center pt-2 text-[10px] text-[#57544a] italic opacity-80">
        "Everything that lives is designed to end. We are perpetually trapped in a never-ending spiral of life and death."
      </div>
    </footer>
  );
};
