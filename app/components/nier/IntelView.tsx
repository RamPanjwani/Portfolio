'use client';

import React, { useState } from 'react';
import { Title } from './Title';
import { NierButton } from './NierButton';
import { ShuffleText } from './ShuffleText';
import { nierAudio } from './NierAudio';
import { BookOpen, FileText, Calendar, Tag, ChevronRight } from 'lucide-react';

interface IntelRecord {
  id: string;
  code: string;
  title: string;
  date: string;
  category: string;
  classification: string;
  readTime: string;
  excerpt: string;
  content: string[];
}

const INTEL_RECORDS: IntelRecord[] = [
  {
    id: 'nier-ui-principles',
    code: 'DOC-825 // ARCHIVE',
    title: 'Deconstructing NieR:Automata UI Design & Engineering',
    date: '2026.03.15',
    category: 'UI / UX & GRAPHICS',
    classification: 'CLEARANCE: LV 04',
    readTime: '6 MIN READ',
    excerpt:
      'A deep dive into PlatinumGames UI designer Hisayoshi Kijima’s devblog: warm beige color harmonies, musical score motifs, razor line buttons, and CRT screen lens distortion.',
    content: [
      'In his 2017 devblog, Hisayoshi Kijima shared that director YOKO TARO gave a single foundational directive for NieR:Automata’s user interface: "make it a nice, warm beige."',
      'Reconciling a warm organic beige with cold, sterile android digital aesthetics posed an immense challenge. The solution lay in strict monochromatic restraint: limiting colors almost exclusively to #d1cdb7, #dad4bb, #57544a, and #3f3d36, using a drab red-orange (#cd664d) only for active markers and pod warnings.',
      'Beyond palette, the design incorporates a subtle "musical score" motif: double-bar termination lines (the 10px + 4px vertical bars), staff line headers, and colon delimiters (::). Faint CRT lens distortion and scanline vignettes ground the interface in physical hardware rather than generic web flat design.',
      'In this portfolio, every element is faithfully rendered in modern React 19 and Next.js, including zero-asset procedural Web Audio sound synthesis that triggers tactile mechanical clicks and confirmation chimes on demand.'
    ],
  },
  {
    id: 'nexus-graph-intelligence',
    code: 'DOC-419 // INTELLIGENCE',
    title: 'Evidence-Grounded Criminal Network Reasoning with Neo4j',
    date: '2026.02.10',
    category: 'GRAPH ARCHITECTURE',
    classification: 'CLEARANCE: CONFIDENTIAL',
    readTime: '8 MIN READ',
    excerpt:
      'Overcoming intelligence-extraction bottlenecks in multi-source police records using deterministic entity resolution and property graph schemas.',
    content: [
      'When investigating cross-border syndicates, law enforcement faces disparate silos: call detail records (CDRs), First Information Reports (FIRs), and banking mule spreadsheets.',
      'Probabilistic LLM entity matching risks severe false-positive arrest hazards. In NEXUS (Smart India Hackathon 2026), we engineered a deterministic, rule-based entity resolution kernel that guarantees 100% precision across benchmark evaluation datasets.',
      'By modeling entities as Neo4j nodes (Suspects, Phones, Vehicles, Bank Accounts) and interactions as weighted, time-stamped edges, investigators can perform sub-second multi-hop traversals and uncover hidden syndicate controllers that evade traditional tabular queries.'
    ],
  },
  {
    id: 'deterministic-multimodal-goods',
    code: 'DOC-102 // CIVIC',
    title: 'Deterministic Multimodal AI in Digital Public Goods',
    date: '2026.01.22',
    category: 'APPLIED AI & SYSTEMS',
    classification: 'CLEARANCE: PUBLIC',
    readTime: '5 MIN READ',
    excerpt:
      'Transforming unstructured regional citizen voice audio into mathematically prioritized community demand hotspots without numerical hallucinations.',
    content: [
      'Digital public goods in multilingual countries like India cannot rely solely on text input. Citizen voice reports across Hindi, Marathi, and Tamil must be transcribed reliably via localized acoustic models like Sarvam AI.',
      'However, delegating priority scoring to generative LLMs leads to arbitrary rating hallucinations. In CommonGround / CivicPulse, we split the architecture: Gemini 3.6 extracts structured physical damage parameters from photos, while a deterministic mathematical engine computes 0-100 priority scores based on Indian Census demographics and asset vulnerability metrics.',
      'This guarantees transparent, auditable policy recommendations that municipal administrators can defend before public audit committees.'
    ],
  },
  {
    id: 'vim-static-typing-craft',
    code: 'DOC-042 // PHILOSOPHY',
    title: 'The Vim Modal Axiom & The Case for Static Type Rigor',
    date: '2025.11.14',
    category: 'DEVELOPER ERGONOMICS',
    classification: 'CLEARANCE: ALL UNITS',
    readTime: '4 MIN READ',
    excerpt:
      'Why modal editing keystrokes, strict compiler checking, and reduced cognitive latency form the backbone of high-velocity software engineering.',
    content: [
      'Vim and Neovim are not merely text editors; they are languages for manipulating syntax trees at the speed of thought. By eliminating the friction of reaching for a mouse, the developer stays within uninterrupted cognitive flow.',
      'Combined with strict static typing in TypeScript, Python type hints, and Rust, the compiler becomes a vigilant co-pilot that prevents entire categories of runtime bugs before code ever reaches staging.',
      'When tools are configured with intention and disciplined minimalism, engineering transitions from wrestling with environment quirks to direct creative problem solving.'
    ],
  },
];

export const IntelView: React.FC = () => {
  const [selectedRecord, setSelectedRecord] = useState<IntelRecord>(INTEL_RECORDS[0]);

  const handleSelect = (record: IntelRecord) => {
    setSelectedRecord(record);
    nierAudio.playSelect();
  };

  return (
    <div className="space-y-6">
      {/* Authentic NieR Title & Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-baseline justify-between border-b border-[#b4af9a] pb-2 gap-2 nier-slide-in stagger-1">
        <Title title="INTEL" subtitle="- System Records & Notes" />
        <span className="text-xs font-mono text-[#57544a] dark:text-[#a39e8a] tracking-widest bg-[#dad4bb] dark:bg-[#23221e] px-2 py-1 border border-[#b4af9a]">
          ARCHIVES: 04 ENTRIES INDEXED
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Article Index - Each item slides individually */}
        <div className="lg:col-span-5 space-y-2.5">
          {INTEL_RECORDS.map((record, idx) => {
            const isSelected = record.id === selectedRecord.id;
            const staggerClass = `stagger-${idx + 2}`;
            return (
              <div
                key={record.id}
                onClick={() => handleSelect(record)}
                onMouseEnter={() => nierAudio.playHover()}
                className={`cursor-pointer border p-3 text-xs transition-all duration-150 active:scale-[0.985] active:translate-y-[1px] nier-slide-in ${staggerClass} ${
                  isSelected
                    ? 'bg-[#4e4b42] text-[#dad4bb] border-[#4e4b42] shadow-[3px_3px_0px_#b4af9a] translate-x-1'
                    : 'bg-[#dad4bb]/80 text-[#3f3d36] border-[#b4af9a] hover:bg-[#eae5d2]'
                }`}
              >
                <div className="flex items-center justify-between mb-1 text-[10px]">
                  <span className={`font-mono ${isSelected ? 'text-[#cd664d] font-bold' : 'text-[#57544a]'}`}>
                    {record.code}
                  </span>
                  <span className="opacity-80 font-mono">{record.date}</span>
                </div>
                <div className="font-bold text-sm tracking-wide mb-1">
                  {record.title}
                </div>
                <div className="text-[11px] opacity-80 flex items-center gap-2">
                  <span>{record.category}</span>
                  <span>//</span>
                  <span>{record.readTime}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Right: Article Reader */}
        <div key={selectedRecord.id} className="lg:col-span-7 border border-[#4e4b42] bg-[#dad4bb]/90 p-5 shadow-[3px_3px_0px_#b4af9a] space-y-4 nier-slide-in stagger-4">
          <div className="border-b border-[#b4af9a] pb-3">
            <div className="flex items-center justify-between text-xs text-[#57544a] mb-1 font-mono">
              <span>{selectedRecord.code} // {selectedRecord.classification}</span>
              <span>{selectedRecord.date}</span>
            </div>
            <h3 className="text-xl font-bold text-[#3f3d36] leading-tight nier-title-shadow">
              <ShuffleText text={selectedRecord.title} duration={300} />
            </h3>
            <div className="flex items-center gap-3 text-xs text-[#cd664d] mt-1 font-bold">
              <span>{selectedRecord.category}</span>
              <span>//</span>
              <span>{selectedRecord.readTime}</span>
            </div>
          </div>

          <div className="font-mono text-xs text-[#3f3d36] leading-relaxed space-y-3.5">
            {selectedRecord.content.map((paragraph, idx) => (
              <p key={idx} className="border-l-2 border-[#b4af9a] pl-3">
                {paragraph}
              </p>
            ))}
          </div>

          <div className="border-t border-[#b4af9a] pt-3 flex items-center justify-between text-xs font-mono text-[#57544a]">
            <span>END OF TRANSMISSION RECORD</span>
            <span className="text-[#4e4b42] font-bold">YoRHa ARCHIVE // VERIFIED</span>
          </div>
        </div>
      </div>
    </div>
  );
};
