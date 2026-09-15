'use client';

import React, { useState } from 'react';
import { ShuffleText } from './ShuffleText';
import { nierAudio } from './NierAudio';
import { Terminal, RefreshCw, Volume2, ShieldAlert } from 'lucide-react';

const POD_MESSAGES = [
  "Pod 042 to User: Unit Ram Panjwani is an elite Full-Stack & Systems Engineer specializing in graph-native intelligence and agentic architectures.",
  "Tactical Assessment: Project NEXUS eliminates criminal intelligence bottlenecks via Neo4j entity resolution with 100% precision across 296 unit tests.",
  "Environmental Scan: Project SAMUDRA / ORCA operationalizes ISRO oceanographic datasets for coastal safety with deterministic reasoning engines.",
  "System Analysis: Project CommonGround transforms citizen voice audio across Indian regional vernaculars into verifiable public infrastructure demand hotspots.",
  "Directive: Extreme preference observed for Vim modal keybindings, static type safety, and zero-hallucination deterministic architectures.",
  "Warning: Self-destruct function located in COMM sector. Accessing will disrupt terminal display buffers.",
  "Pod 042 Notice: All YoRHa interface assets adhere strictly to Hisayoshi Kijima's warm beige and musical score UI specifications."
];

export const PodDialogue: React.FC = () => {
  const [index, setIndex] = useState(0);

  const nextMessage = () => {
    nierAudio.playAlert();
    setIndex((prev) => (prev + 1) % POD_MESSAGES.length);
  };

  return (
    <div className="relative border border-[#4e4b42] bg-[#dad4bb]/90 p-3 shadow-[2px_2px_0px_#b4af9a] mb-6">
      {/* Corner brackets */}
      <div className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-[#4e4b42] pointer-events-none" />
      <div className="absolute top-0 right-0 w-2 h-2 border-t-2 border-r-2 border-[#4e4b42] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-2 h-2 border-b-2 border-l-2 border-[#4e4b42] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 border-[#4e4b42] pointer-events-none" />

      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-2 text-xs font-mono font-bold tracking-widest text-[#4e4b42] border-b border-[#b4af9a] pb-1 w-full">
          <span className="inline-block w-2 h-2 bg-[#cd664d] animate-ping" />
          <Terminal className="w-3.5 h-3.5 text-[#4e4b42]" />
          <span>POD 042 // TACTICAL TRANSMISSION</span>
          <span className="text-[#89a87d] ml-auto font-mono text-[10px] uppercase">[LINK: ACTIVE]</span>
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
    </div>
  );
};
