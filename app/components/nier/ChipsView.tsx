'use client';

import React, { useState } from 'react';
import { Title } from './Title';
import { NierButton } from './NierButton';
import { ShuffleText } from './ShuffleText';
import { nierAudio } from './NierAudio';
import { Cpu, Shield, Zap, Wrench, Layers } from 'lucide-react';

interface PluginChip {
  id: string;
  name: string;
  category: 'attack' | 'defense' | 'support' | 'system';
  rank: string;
  cost: number;
  effect: string;
  description: string;
}

const CHIPS_DATA: PluginChip[] = [
  // Attack (Core Runtimes & Languages)
  {
    id: 'ts',
    name: 'TypeScript // Strict Typing',
    category: 'attack',
    rank: '◆ +8',
    cost: 12,
    effect: 'Compile-time guarantee',
    description: 'Eliminates runtime null pointer errors and enforces rigid API contracts across large-scale distributed codebases.',
  },
  {
    id: 'py',
    name: 'Python 3.12 // FastAPI & Data',
    category: 'attack',
    rank: '◆ +8',
    cost: 14,
    effect: 'High-throughput async backend',
    description: 'Powers asynchronous API microservices, Pytest automation suites, and multimodal machine learning evaluation pipelines.',
  },
  {
    id: 'cypher',
    name: 'Cypher // Graph Query Language',
    category: 'attack',
    rank: '◆ +6',
    cost: 10,
    effect: 'Sub-second multi-hop traversal',
    description: 'Extracts deep syndicated criminal connections across millions of nodes in Neo4j without Cartesian explosion.',
  },
  {
    id: 'sql',
    name: 'PostgreSQL // Relational & PostGIS',
    category: 'attack',
    rank: '◆ +7',
    cost: 11,
    effect: 'ACID transactional persistence',
    description: 'Spatial geospatial indexing and complex joins powering demographic census data fusion.',
  },

  // Defense (Infrastructure & Security)
  {
    id: 'neo4j',
    name: 'Neo4j Graph Database',
    category: 'defense',
    rank: '◆ +8',
    cost: 16,
    effect: 'Graph-native clustering',
    description: 'Underpins NEXUS law enforcement intelligence with property graphs and real-time community detection.',
  },
  {
    id: 'docker',
    name: 'Docker & Containerization',
    category: 'defense',
    rank: '◆ +6',
    cost: 9,
    effect: 'Reproducible microservice pods',
    description: 'Multi-stage builds, isolated runtime environments, and deterministic deployment orchestration.',
  },
  {
    id: 'linux',
    name: 'Linux / Arch / Debian Systems',
    category: 'defense',
    rank: '◆ +8',
    cost: 15,
    effect: 'Kernel & process optimization',
    description: 'Deep familiarity with bash scripting, POSIX standards, systemd services, and resource control groups.',
  },
  {
    id: 'redis',
    name: 'Redis In-Memory Cache',
    category: 'defense',
    rank: '◆ +5',
    cost: 8,
    effect: 'Sub-millisecond state caching',
    description: 'Distributed locking, rate-limiting, and maritime telemetry session store for ORCA/SAMUDRA.',
  },

  // Support (AI & Intelligence)
  {
    id: 'gemini',
    name: 'Google Gemini 3.6 Multimodal',
    category: 'support',
    rank: '◆ +8',
    cost: 14,
    effect: 'Evidence-grounded reasoning',
    description: 'Multimodal image damage verification and policy document synthesis with structured schema outputs.',
  },
  {
    id: 'sarvam',
    name: 'Sarvam AI Speech Ingestion',
    category: 'support',
    rank: '◆ +7',
    cost: 12,
    effect: 'Indian vernacular transcription',
    description: 'Transforms spoken Hindi, Marathi, and regional citizen infrastructure demands into clean structured text.',
  },
  {
    id: 'agents',
    name: 'Agentic Reasoning Pipelines',
    category: 'support',
    rank: '◆ +7',
    cost: 13,
    effect: 'Autonomous coordinated reasoning',
    description: 'Decomposes complex geospatial inquiries into parallel worker agents with strict audit trails.',
  },

  // System (Developer Ergonomics & Web)
  {
    id: 'vim',
    name: 'Neovim // Modal Editing',
    category: 'system',
    rank: '◆ +8 [UNIQUE]',
    cost: 18,
    effect: 'Zero-latency keystroke speed',
    description: 'Custom Lua configuration, LSP integration, and keyboard-driven terminal workflow without mouse dependency.',
  },
  {
    id: 'nextjs',
    name: 'Next.js & React 19',
    category: 'system',
    rank: '◆ +7',
    cost: 12,
    effect: 'Server components & SSR streaming',
    description: 'High-performance interactive web interfaces, MDX engineering journals, and Turbopack optimization.',
  },
  {
    id: 'webaudio',
    name: 'Web Audio API Realtime Synthesizer',
    category: 'system',
    rank: '◆ +6',
    cost: 8,
    effect: 'Zero-asset procedural sound FX',
    description: 'Oscillator synthesis generating mechanical ticks, chimes, and alarms without external audio latency.',
  },
];

export const ChipsView: React.FC = () => {
  const [filter, setFilter] = useState<'all' | 'attack' | 'defense' | 'support' | 'system'>('all');
  const [selectedChip, setSelectedChip] = useState<PluginChip>(CHIPS_DATA[0]);

  const filteredChips = filter === 'all'
    ? CHIPS_DATA
    : CHIPS_DATA.filter((c) => c.category === filter);

  const totalCost = CHIPS_DATA.reduce((acc, curr) => acc + curr.cost, 0);

  const handleSelect = (chip: PluginChip) => {
    setSelectedChip(chip);
    nierAudio.playSelect();
  };

  const getCategoryColor = (cat: string) => {
    switch (cat) {
      case 'attack':
        return 'text-[#cd664d] border-[#cd664d]';
      case 'defense':
        return 'text-[#4e4b42] border-[#4e4b42]';
      case 'support':
        return 'text-[#89a87d] border-[#89a87d]';
      case 'system':
      default:
        return 'text-[#b4af9a] border-[#57544a]';
    }
  };

  return (
    <div className="space-y-6">
      {/* Authentic NieR Title & Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-baseline justify-between border-b border-[#b4af9a] pb-2 gap-2 nier-slide-in stagger-1">
        <Title title="SKILLS" subtitle="- Plug-in Chips" />
        <span className="text-xs font-mono text-[#57544a] dark:text-[#a39e8a] tracking-widest bg-[#dad4bb] dark:bg-[#23221e] px-2 py-1 border border-[#b4af9a]">
          STORAGE: 128 / 128 SLOTS
        </span>
      </div>

      {/* Top Capacity Bar */}
      <div className="border border-[#4e4b42] bg-[#dad4bb]/90 p-4 shadow-[3px_3px_0px_#b4af9a] space-y-2 nier-slide-in stagger-2">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between text-xs gap-1">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 bg-[#4e4b42] rotate-45" />
            <span className="font-bold tracking-widest text-[#3f3d36] nier-title-shadow">
              PLUG-IN CHIPS // MEMORY ALLOCATION
            </span>
          </div>
          <span className="text-[#57544a] font-bold">
            STORAGE CAPACITY: 128 / 128 SLOTS USED [OPTIMAL]
          </span>
        </div>

        {/* Capacity Meter */}
        <div className="w-full h-3 bg-[#b4af9a] border border-[#4e4b42] p-0.5 flex gap-0.5">
          <div className="h-full bg-[#cd664d] w-[30%]" title="Attack: 30%" />
          <div className="h-full bg-[#4e4b42] w-[35%]" title="Defense: 35%" />
          <div className="h-full bg-[#89a87d] w-[20%]" title="Support: 20%" />
          <div className="h-full bg-[#57544a] w-[15%]" title="System: 15%" />
        </div>

        <div className="flex flex-wrap items-center gap-4 text-[10px] text-[#57544a] pt-1">
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 bg-[#cd664d]" /> ATTACK (CORE RUNTIMES)
          </span>
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 bg-[#4e4b42]" /> DEFENSE (SYSTEMS & DB)
          </span>
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 bg-[#89a87d]" /> SUPPORT (AI & AGENTS)
          </span>
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 bg-[#57544a]" /> SYSTEM (WORKFLOW & UI)
          </span>
        </div>
      </div>

      {/* Category Filter Tabs */}
      <div className="flex flex-wrap gap-2 text-xs nier-slide-in stagger-2">
        {(['all', 'attack', 'defense', 'support', 'system'] as const).map((cat) => (
          <button
            key={cat}
            onClick={() => {
              setFilter(cat);
              nierAudio.playTab();
            }}
            onMouseEnter={() => nierAudio.playHover()}
            className={`px-3 py-1.5 border uppercase font-bold tracking-wider transition-all duration-150 active:scale-[0.98] active:translate-y-[1px] ${
              filter === cat
                ? 'bg-[#4e4b42] text-[#dad4bb] border-[#4e4b42] shadow-[2px_2px_0px_#b4af9a]'
                : 'bg-[#dad4bb] text-[#57544a] border-[#b4af9a] hover:bg-[#eae5d2] hover:border-[#4e4b42]'
            }`}
          >
            {cat === 'all' ? 'ALL CHIPS' : cat}
          </button>
        ))}
      </div>

      {/* Main Grid: Chip Inventory & Inspector */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Chip List - Each chip item slides in individually */}
        <div className="lg:col-span-7 space-y-2 max-h-[500px] overflow-y-auto pr-1">
          {filteredChips.map((chip, idx) => {
            const isSelected = chip.id === selectedChip.id;
            const staggerClass = `stagger-${Math.min(idx + 3, 12)}`;
            return (
              <div
                key={chip.id}
                onClick={() => handleSelect(chip)}
                onMouseEnter={() => nierAudio.playHover()}
                className={`cursor-pointer border p-2.5 text-xs flex items-center justify-between transition-all duration-150 active:scale-[0.985] active:translate-y-[1px] nier-slide-in ${staggerClass} ${
                  isSelected
                    ? 'bg-[#4e4b42] text-[#dad4bb] border-[#4e4b42] shadow-[2px_2px_0px_#b4af9a]'
                    : 'bg-[#dad4bb]/80 text-[#3f3d36] border-[#b4af9a] hover:bg-[#eae5d2]'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <span
                    className={`w-2 h-2 rotate-45 ${
                      chip.category === 'attack'
                        ? 'bg-[#cd664d]'
                        : chip.category === 'defense'
                        ? 'bg-[#57544a]'
                        : chip.category === 'support'
                        ? 'bg-[#89a87d]'
                        : 'bg-[#dad4bb]'
                    }`}
                  />
                  <span className="font-bold tracking-wide">{chip.name}</span>
                </div>

                <div className="flex items-center gap-3">
                  <span className="text-[11px] opacity-80 font-mono">{chip.rank}</span>
                  <span className={`text-[10px] font-mono px-1.5 py-0.5 border ${
                    isSelected ? 'border-[#dad4bb] text-[#dad4bb]' : 'border-[#57544a] text-[#57544a]'
                  }`}>
                    [{chip.cost} SLOTS]
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Selected Chip Detail Readout */}
        <div key={selectedChip.id} className="lg:col-span-5 border border-[#4e4b42] bg-[#dad4bb]/90 p-5 shadow-[3px_3px_0px_#b4af9a] space-y-4 nier-slide-in stagger-4">
          <div className="border-b border-[#b4af9a] pb-2">
            <div className="flex items-center justify-between text-xs mb-1">
              <span className="uppercase text-[#cd664d] font-bold">
                CHIP TYPE: {selectedChip.category}
              </span>
              <span className="text-[#57544a] font-mono">{selectedChip.rank}</span>
            </div>
            <h3 className="text-lg font-bold text-[#3f3d36] nier-title-shadow">
              <ShuffleText text={selectedChip.name} duration={250} />
            </h3>
          </div>

          <div className="space-y-3 font-mono text-xs">
            <div className="border border-[#b4af9a] bg-[#d1cdb7]/60 p-2.5">
              <span className="text-[10px] text-[#57544a] block uppercase font-bold">
                OPERATIONAL EFFECT
              </span>
              <span className="text-sm font-bold text-[#4e4b42] block mt-0.5">
                {selectedChip.effect}
              </span>
            </div>

            <div>
              <span className="text-[10px] text-[#57544a] block uppercase font-bold mb-1">
                CHIP ARCHITECTURAL UTILITY
              </span>
              <p className="text-xs text-[#3f3d36] leading-relaxed">
                {selectedChip.description}
              </p>
            </div>

            <div className="border-t border-[#b4af9a] pt-3 flex justify-between text-[11px]">
              <span className="text-[#57544a]">MEMORY CAPACITY COST:</span>
              <span className="font-bold text-[#4e4b42]">{selectedChip.cost} UNITS</span>
            </div>

            <div className="flex justify-between text-[11px]">
              <span className="text-[#57544a]">FUSION ELIGIBILITY:</span>
              <span className="font-bold text-[#89a87d]">MAXIMUM TIER REACHED</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
