'use client';

import React, { useState } from 'react';
import { ShuffleText } from './ShuffleText';
import { nierAudio } from './NierAudio';
import { Terminal, RefreshCw } from 'lucide-react';
import { POD_MESSAGES } from '../../data/pod';
import { NierCard } from './NierCard';

export const PodDialogue: React.FC = () => {
  const [index, setIndex] = useState(0);

  const nextMessage = () => {
    nierAudio.playAlert();
    setIndex((prev) => (prev + 1) % POD_MESSAGES.length);
  };

  return (
    <NierCard
      cornerBrackets={true}
      className="p-3 mb-6"
    >
      <div className="flex items-start justify-between gap-2 sm:gap-3">
        <div className="flex items-center gap-1.5 sm:gap-2 text-[11px] sm:text-xs font-mono font-bold tracking-widest text-[#4e4b42] border-b border-[#b4af9a] pb-1 w-full min-w-0">
          <span className="inline-block w-2 h-2 bg-[#cd664d] animate-ping shrink-0" />
          <Terminal className="w-3.5 h-3.5 text-[#4e4b42] shrink-0" />
          <span className="truncate">POD 042 <span className="hidden xs:inline">// TACTICAL TRANSMISSION</span></span>
          <span className="text-[#89a87d] ml-auto font-mono text-[9px] sm:text-[10px] uppercase shrink-0">[ONLINE]</span>
        </div>

        <button
          onClick={nextMessage}
          title="Cycle transmission"
          className="p-1 hover:bg-[#4e4b42] hover:text-[#dad4bb] text-[#4e4b42] transition-colors border border-[#b4af9a] text-xs shrink-0 flex items-center gap-1 font-mono"
        >
          <RefreshCw className="w-3 h-3" />
          <span className="hidden sm:inline">NEXT</span>
        </button>
      </div>

      <div className="mt-2.5 font-mono text-xs text-[#3f3d36] leading-relaxed">
        <span className="text-[#cd664d] font-bold mr-1.5">&gt;</span>
        <ShuffleText key={index} text={POD_MESSAGES[index]} duration={350} />
      </div>
    </NierCard>
  );
};
