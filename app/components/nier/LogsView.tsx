'use client';

import React, { useState } from 'react';
import { Title } from './Title';
import { NierButton } from './NierButton';
import { ShuffleText } from './ShuffleText';
import { nierAudio } from './NierAudio';
import { Award, CheckCircle, Clock, MapPin, ShieldAlert, Sparkles } from 'lucide-react';

interface QuestItem {
  id: string;
  title: string;
  client: string;
  period: string;
  status: 'COMPLETED' | 'IN_PROGRESS';
  rewards: string;
  summary: string;
  objectives: string[];
}

const QUEST_DATA: QuestItem[] = [
  {
    id: 'q-sih-mha',
    title: 'OPERATION: CRIMINAL NETWORK DECONSTRUCTION',
    client: 'Ministry of Home Affairs (MHA) / NCRB // SIH 2026',
    period: '2025 - 2026',
    status: 'COMPLETED',
    rewards: '331 Automated Tests Passed // 100% ER Precision // 50,000 EXP',
    summary:
      'Engineered NEXUS, an evidence-grounded criminal intelligence graph workstation. Eliminated cross-jurisdictional intelligence bottlenecks across disparate police databases, call data records (CDRs), and First Information Reports (FIRs).',
    objectives: [
      'Engineered multi-source graph ingestion pipeline into Neo4j',
      'Implemented deterministic entity resolution algorithms to prevent mistaken identity arrest risks',
      'Authored 296 unit tests in Pytest and 35 in Vitest with zero regressions',
      'Containerized full stack across Docker, FastAPI, PostgreSQL, and Vite'
    ],
  },
  {
    id: 'q-sih-isro',
    title: 'MISSION: MARITIME ECOSYSTEM REASONING (ORCA)',
    client: 'Indian Space Research Organisation (ISRO) // Dept. of Space',
    period: '2025 - 2026',
    status: 'COMPLETED',
    rewards: 'Deterministic Ocean Safety Corridors // Multilingual Voice // 45,000 EXP',
    summary:
      'Co-developed SAMUDRA (ORCA), an Agentic AI marine intelligence decision support system for coastal fishermen, vessel skippers, and disaster response teams utilizing ISRO MOSDAC and INCOIS Earth Observation telemetry.',
    objectives: [
      'Bridged real-time satellite oceanographic feeds with natural language interfaces',
      'Implemented regional vernacular voice synthesis across Hindi, Marathi, and Tamil',
      'Created deterministic geospatial algorithms calculating safe navigation corridors during high-swell warnings',
      'Architected offline-capable edge caching for vessels with intermittent marine satellite uplinks'
    ],
  },
  {
    id: 'q-civic-pulse',
    title: 'INITIATIVE: COMMUNITY DEMAND EXTRACTION',
    client: 'Build with AI: Code for Communities (Second Edition)',
    period: '2025',
    status: 'COMPLETED',
    rewards: 'Digital Public Good // Cross-Border BRICS Portability // 40,000 EXP',
    summary:
      'Architected CommonGround / CivicPulse to turn fragmented citizen voice and photo complaints into structured infrastructure demand hotspots prioritized by Census demographic metrics.',
    objectives: [
      'Integrated Sarvam AI speech-to-text for multilingual citizen voice recording',
      'Trained Gemini 3.6 multimodal prompt pipelines to visually verify public asset physical damage',
      'Formulated mathematical 0-100 priority index combining poverty rates, population density, and urgency',
      'Engineered decoupled country adapters allowing instant deployment across international municipalities'
    ],
  },
  {
    id: 'q-systems-craft',
    title: 'PERPETUAL DIRECTIVE: SYSTEMS & CODE CRAFTSMANSHIP',
    client: 'Global Software Engineering Community',
    period: 'ONGOING',
    status: 'IN_PROGRESS',
    rewards: 'Uncompromising Software Aesthetics // High-Performance Web // Perpetual EXP',
    summary:
      'Continuous exploration of distributed graph databases, modal editor ergonomics, Web Audio procedural synthesis, and game UI engineering.',
    objectives: [
      'Mastery of strict static typing and clean modular architectural boundaries',
      'Creation of authentic high-aesthetic user interfaces (YoRHa design system)',
      'Mentoring and collaboration with hackathon engineering teams across India'
    ],
  },
];

export const LogsView: React.FC = () => {
  const [selectedQuest, setSelectedQuest] = useState<QuestItem>(QUEST_DATA[0]);

  const handleSelect = (quest: QuestItem) => {
    setSelectedQuest(quest);
    nierAudio.playSelect();
  };

  return (
    <div className="space-y-6">
      {/* Authentic NieR Title & Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-baseline justify-between border-b border-[#b4af9a] pb-2 gap-2 nier-slide-in stagger-1">
        <Title title="QUESTS" subtitle="- Mission Archives" />
        <span className="text-xs font-mono text-[#57544a] dark:text-[#a39e8a] tracking-widest bg-[#dad4bb] dark:bg-[#23221e] px-2 py-1 border border-[#b4af9a]">
          OPERATIONS: 03 CLEARED // 01 ACTIVE
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Quest List - Each item slides individually */}
        <div className="lg:col-span-5 space-y-2.5">
          {QUEST_DATA.map((quest, idx) => {
            const isSelected = quest.id === selectedQuest.id;
            const staggerClass = `stagger-${idx + 2}`;
            return (
              <div
                key={quest.id}
                onClick={() => handleSelect(quest)}
                onMouseEnter={() => nierAudio.playHover()}
                className={`cursor-pointer border p-3 text-xs transition-all duration-150 active:scale-[0.985] active:translate-y-[1px] nier-slide-in ${staggerClass} ${
                  isSelected
                    ? 'bg-[#4e4b42] text-[#dad4bb] border-[#4e4b42] shadow-[3px_3px_0px_#b4af9a] translate-x-1'
                    : 'bg-[#dad4bb]/80 text-[#3f3d36] border-[#b4af9a] hover:bg-[#eae5d2]'
                }`}
              >
                <div className="flex items-center justify-between mb-1 text-[10px]">
                  <span className={isSelected ? 'text-[#cd664d] font-bold' : 'text-[#57544a]'}>
                    [{quest.status}]
                  </span>
                  <span className="opacity-80 font-mono">{quest.period}</span>
                </div>
                <div className="font-bold text-sm tracking-wide mb-1">
                  {quest.title}
                </div>
                <div className="text-[11px] opacity-80 truncate">
                  CLIENT: {quest.client}
                </div>
              </div>
            );
          })}
        </div>

        {/* Right: Quest Dossier */}
        <div key={selectedQuest.id} className="lg:col-span-7 border border-[#4e4b42] bg-[#dad4bb]/90 p-5 shadow-[3px_3px_0px_#b4af9a] space-y-4 nier-slide-in stagger-4">
          <div className="border-b border-[#b4af9a] pb-3">
            <div className="flex items-center justify-between text-xs text-[#57544a] mb-1">
              <span className="font-mono">MISSION REPORT // {selectedQuest.period}</span>
              <span className="text-[#89a87d] font-bold">STATUS: {selectedQuest.status}</span>
            </div>
            <h3 className="text-lg font-bold text-[#3f3d36] nier-title-shadow">
              <ShuffleText text={selectedQuest.title} duration={300} />
            </h3>
            <p className="text-xs text-[#cd664d] mt-1 font-bold">
              CLIENT: {selectedQuest.client}
            </p>
          </div>

          <div className="border border-[#b4af9a] bg-[#d1cdb7]/70 p-3 font-mono text-xs">
            <span className="text-[10px] text-[#57544a] uppercase font-bold block mb-1">
              MISSION REWARDS & COMMENDATIONS
            </span>
            <span className="text-[#4e4b42] font-bold block">
              {selectedQuest.rewards}
            </span>
          </div>

          <div>
            <span className="text-xs font-mono font-bold tracking-widest text-[#4e4b42] block mb-1">
              OPERATION BRIEFING
            </span>
            <p className="text-xs font-mono text-[#3f3d36] leading-relaxed">
              {selectedQuest.summary}
            </p>
          </div>

          <div className="border-t border-[#b4af9a] pt-3 space-y-2">
            <span className="text-xs font-mono font-bold tracking-widest text-[#4e4b42] block">
              OBJECTIVES EXECUTED
            </span>
            {selectedQuest.objectives.map((obj, idx) => (
              <div key={idx} className="flex items-start gap-2 text-xs font-mono text-[#3f3d36]">
                <CheckCircle className="w-3.5 h-3.5 text-[#89a87d] shrink-0 mt-0.5" />
                <span>{obj}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
