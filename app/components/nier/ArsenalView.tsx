'use client';

import React, { useState } from 'react';
import { Title } from './Title';
import { NierButton } from './NierButton';
import { ShuffleText } from './ShuffleText';
import { nierAudio } from './NierAudio';
import { ExternalLink, Shield, Terminal, Zap, CheckCircle2, Layers, Cpu } from 'lucide-react';
import { GithubIcon } from './NierIcons';

interface ProjectItem {
  id: string;
  code: string;
  name: string;
  classification: string;
  level: string;
  tagline: string;
  description: string;
  attackPower: string;
  durability: string;
  affinity: string;
  techStack: string[];
  metrics: string[];
  highlights: string[];
  githubUrl?: string;
  demoUrl?: string;
}

const PROJECTS: ProjectItem[] = [
  {
    id: 'nexus',
    code: 'WP-01 // BLADE',
    name: 'NEXUS — Criminal Network Intelligence',
    classification: 'MHA / NCRB // SIH 2026',
    level: 'LV. 4 [MAX]',
    tagline: 'Evidence-grounded, graph-native investigative intelligence workspace for law enforcement.',
    description:
      'Solves critical intelligence-extraction bottlenecks in police investigations of cross-jurisdictional syndicates. Fuses CDRs, suspect aliases, FIR records, and mule bank accounts into an explainable graph with deterministic entity resolution.',
    attackPower: '331 TESTS [296 PYTEST + 35 VITEST]',
    durability: '100% ER PRECISION',
    affinity: 'GRAPH // NEO4J // FASTAPI',
    techStack: ['Neo4j', 'FastAPI', 'Python', 'PostgreSQL', 'Docker', 'Vite', 'TypeScript', 'TailwindCSS'],
    metrics: [
      '296 Automated Pytest Suites Passed',
      '35 Vitest Frontend Tests Passed',
      '100% Entity Resolution Precision on Benchmark Datasets',
      'Zero-Loss Cross-Department Record Linkage'
    ],
    highlights: [
      'Multi-source graph ingestion from unstructured police FIRs and call records',
      'Deterministic rule-based entity resolution eliminating false positive arrests',
      'Interactive investigative canvas for tactical syndicate topology visualization'
    ],
    githubUrl: 'https://github.com/RamPanjwani',
  },
  {
    id: 'samudra',
    code: 'WP-02 // SPEAR',
    name: 'ORCA / SAMUDRA — Marine Intelligence',
    classification: 'ISRO / DEPT OF SPACE // SIH 2026',
    level: 'LV. 4 [MAX]',
    tagline: 'Agentic AI-powered Marine Intelligence & Mission Reasoning Platform.',
    description:
      'Empowers coastal fishermen, vessel skippers, and disaster management authorities to query ocean conditions in vernacular languages (Hindi, Marathi, Tamil) and receive deterministic, evidence-backed geospatial safety recommendations.',
    attackPower: 'MULTI-AGENT REASONING',
    durability: 'REAL-TIME SATELLITE FUSION',
    affinity: 'ISRO MOSDAC // INCOIS // GEOSPATIAL',
    techStack: ['Python', 'LangChain', 'FastAPI', 'GIS / GDAL', 'React', 'ISRO MOSDAC API', 'INCOIS', 'WebSockets'],
    metrics: [
      'Direct satellite data fusion from ISRO MOSDAC & INCOIS',
      'Vernacular speech & text queries in 4+ Indian languages',
      'Deterministic safety corridors preventing cyclone and high-swell accidents',
      'Transparent audit trail and provenance tracking for every recommendation'
    ],
    highlights: [
      'Collaborative agent architecture splitting domain reasoning from geospatial crunching',
      'Offline-capable caching protocols for maritime vessels with intermittent telemetry',
      'Government compliance with National Disaster Management Authority (NDMA) schemas'
    ],
    githubUrl: 'https://github.com/RamPanjwani',
  },
  {
    id: 'civicpulse',
    code: 'WP-03 // COMBAT BRACER',
    name: 'CommonGround // CivicPulse',
    classification: 'BUILD WITH AI // SECOND EDITION',
    level: 'LV. 4 [MAX]',
    tagline: 'Multimodal Community Demand Intelligence Digital Public Good.',
    description:
      'Transforms fragmented citizen voice, photo, and text reports into verified Demand Hotspots, fusing citizen demand with Census of India demographics to generate deterministic 0–100 priority scores for policymakers.',
    attackPower: 'DETERMINISTIC 0-100 ENGINE',
    durability: 'CROSS-BORDER BRICS READY',
    affinity: 'GEMINI 3.6 // SARVAM AI // CENSUS',
    techStack: ['Google Gemini 3.6', 'Sarvam AI', 'Python', 'Next.js', 'PostGIS', 'Census Demographics Engine'],
    metrics: [
      'Sarvam AI speech-to-text ingestion for regional Indian vernaculars',
      'Multimodal photographic damage verification via Gemini',
      'Spatial clustering of reports into 150m-500m localized hotspots',
      'Deterministic 0-100 priority scoring formula eliminating LLM hallucination'
    ],
    highlights: [
      'Decoupled country and language adapters demonstrating portability to BRICS contexts',
      'Automated generation of actionable policy and public funding pathway briefs',
      'Census data fusion integrating vulnerability indices and asset condition ratings'
    ],
    githubUrl: 'https://github.com/RamPanjwani',
  },
  {
    id: 'nier-design',
    code: 'WP-04 // POD PROGRAM',
    name: 'NieR:Automata YoRHa Design System',
    classification: 'OPEN SOURCE // PLATINUMGAMES SPEC',
    level: 'LV. 4 [MAX]',
    tagline: 'High-fidelity military HUD and design language adhering to Hisayoshi Kijima devblog principles.',
    description:
      'Built upon official PlatinumGames devblog notes: warm beige color harmonies, musical score motifs, razor-expanding button borders, Web Audio sound synthesis, CRT lens distortion, and angled screen transition shaders.',
    attackPower: 'WEB AUDIO REALTIME SYNTHESIS',
    durability: 'PIXEL-PERFECT ACCURACY',
    affinity: 'NEXT.JS // TAILWINDCSS // CANVAS',
    techStack: ['Next.js', 'React 19', 'TypeScript', 'Web Audio API', 'TailwindCSS', 'SCSS', 'Framer Motion'],
    metrics: [
      'Zero audio asset weight via Web Audio oscillator math',
      'Exact color fidelity: #d1cdb7, #dad4bb, #57544a, #cd664d',
      'Full responsive adaptation for desktop, tablet, and mobile displays',
      'Accessible keyboard navigation with tactile sound and cipher decryption'
    ],
    highlights: [
      'Tactile hover states with splitting razor border physics',
      'Dynamic cipher scramble text decoding algorithm',
      'Complete modular design system ready for deployment in modern web applications'
    ],
    githubUrl: 'https://github.com/RamPanjwani',
  },
];

export const ArsenalView: React.FC = () => {
  const [selectedId, setSelectedId] = useState<string>('nexus');
  const activeProject = PROJECTS.find((p) => p.id === selectedId) || PROJECTS[0];

  const handleSelect = (id: string) => {
    setSelectedId(id);
    nierAudio.playSelect();
  };

  return (
    <div className="space-y-6">
      {/* Authentic NieR Title & Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-baseline justify-between border-b border-[#b4af9a] pb-2 gap-2 nier-slide-in stagger-1">
        <Title title="WEAPONS" subtitle="- Featured Systems" />
        <span className="text-xs font-mono text-[#57544a] dark:text-[#a39e8a] tracking-widest bg-[#dad4bb] dark:bg-[#23221e] px-2 py-1 border border-[#b4af9a]">
          SLOTS: 04/04 ALLOCATED
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Side: Weapons List - Each item slides individually */}
        <div className="lg:col-span-5 space-y-3">
          {PROJECTS.map((project, idx) => {
            const isSelected = project.id === selectedId;
            const staggerClass = `stagger-${idx + 2}`;
            return (
              <div
                key={project.id}
                onClick={() => handleSelect(project.id)}
                onMouseEnter={() => nierAudio.playHover()}
                className={`cursor-pointer border transition-all duration-200 active:scale-[0.985] active:translate-y-[1px] p-3 relative nier-slide-in ${staggerClass} ${
                  isSelected
                    ? 'bg-[#4e4b42] text-[#dad4bb] border-[#4e4b42] shadow-[3px_3px_0px_#b4af9a] translate-x-1'
                    : 'bg-[#dad4bb]/80 text-[#3f3d36] border-[#b4af9a] hover:bg-[#eae5d2] hover:border-[#4e4b42]'
                }`}
              >
                {/* Active left indicator tag */}
                {isSelected && (
                  <div className="absolute top-0 bottom-0 left-0 w-1.5 bg-[#cd664d]" />
                )}

                <div className="flex items-center justify-between text-xs mb-1">
                  <span className={`tracking-widest font-mono ${isSelected ? 'text-[#cd664d]' : 'text-[#57544a]'}`}>
                    {project.code}
                  </span>
                  <span className={`text-[10px] font-mono px-1 py-0.5 border ${isSelected ? 'border-[#dad4bb]' : 'border-[#4e4b42]'}`}>
                    {project.level}
                  </span>
                </div>

                <div className="font-bold text-sm tracking-wide">
                  {project.name}
                </div>

                <div className="mt-1 text-xs opacity-80 truncate">
                  {project.classification}
                </div>
              </div>
            );
          })}
        </div>

        {/* Right Side: Detailed Weapon Specifications */}
        <div key={activeProject.id} className="lg:col-span-7 border border-[#4e4b42] bg-[#dad4bb]/90 p-5 shadow-[3px_3px_0px_#b4af9a] space-y-5 nier-slide-in stagger-4">
          {/* Header */}
          <div className="border-b border-[#b4af9a] pb-3">
            <div className="flex items-center justify-between text-xs text-[#57544a] mb-1">
              <span className="font-mono">{activeProject.code}</span>
              <span className="text-[#cd664d] font-bold">{activeProject.classification}</span>
            </div>
            <h3 className="text-xl font-bold text-[#3f3d36] nier-title-shadow">
              <ShuffleText text={activeProject.name} duration={300} />
            </h3>
            <p className="text-xs text-[#57544a] mt-1 italic">
              "{activeProject.tagline}"
            </p>
          </div>

          {/* Combat Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs font-mono">
            <div className="border border-[#b4af9a] bg-[#d1cdb7]/70 p-2">
              <span className="text-[10px] text-[#57544a] block">ATTACK POWER</span>
              <span className="font-bold text-[#3f3d36] text-[11px] truncate block">
                {activeProject.attackPower}
              </span>
            </div>
            <div className="border border-[#b4af9a] bg-[#d1cdb7]/70 p-2">
              <span className="text-[10px] text-[#57544a] block">ACCURACY / RELIABILITY</span>
              <span className="font-bold text-[#3f3d36] text-[11px] truncate block">
                {activeProject.durability}
              </span>
            </div>
            <div className="border border-[#b4af9a] bg-[#d1cdb7]/70 p-2">
              <span className="text-[10px] text-[#57544a] block">AFFINITY CORE</span>
              <span className="font-bold text-[#3f3d36] text-[11px] truncate block">
                {activeProject.affinity}
              </span>
            </div>
          </div>

          {/* Operational Briefing */}
          <div>
            <span className="text-xs font-mono font-bold tracking-widest text-[#4e4b42] block mb-1">
              OPERATIONAL SPECIFICATIONS
            </span>
            <p className="text-xs font-mono text-[#3f3d36] leading-relaxed">
              {activeProject.description}
            </p>
          </div>

          {/* Key Metrics / Highlights */}
          <div className="space-y-1.5 border-t border-[#b4af9a] pt-3">
            <span className="text-xs font-mono font-bold tracking-widest text-[#4e4b42] block mb-1">
              SYSTEM VERIFICATION METRICS
            </span>
            {activeProject.metrics.map((metric, idx) => (
              <div key={idx} className="flex items-start gap-2 text-xs font-mono text-[#3f3d36]">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#89a87d] shrink-0 mt-0.5" />
                <span>{metric}</span>
              </div>
            ))}
          </div>

          {/* Tech Stack Chips */}
          <div className="border-t border-[#b4af9a] pt-3">
            <span className="text-xs font-mono font-bold tracking-widest text-[#4e4b42] block mb-2">
              EQUIPPED CHIP MODULES
            </span>
            <div className="flex flex-wrap gap-1.5">
              {activeProject.techStack.map((tech) => (
                <span
                  key={tech}
                  className="text-xs font-mono bg-[#4e4b42] text-[#dad4bb] px-2 py-0.5"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Action Links */}
          <div className="flex flex-wrap gap-3 pt-2">
            {activeProject.githubUrl && (
              <NierButton
                text="SOURCE REPOSITORY"
                variant="primary"
                href={activeProject.githubUrl}
                icon={<GithubIcon className="w-3.5 h-3.5" />}
                className="w-auto"
              />
            )}
            <NierButton
              text="REQUEST DOSSIER"
              variant="secondary"
              onClick={() => alert(`Operational brief for ${activeProject.name} dispatched.`)}
              className="w-auto"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
