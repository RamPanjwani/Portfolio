'use client';

import React from 'react';
import { Title } from './Title';
import { NierButton } from './NierButton';
import { PodDialogue } from './PodDialogue';
import { Code, Terminal, Cpu, Database, Compass, Shield, ArrowRight } from 'lucide-react';

interface SystemViewProps {
  onNavigate: (tab: string) => void;
}

export const SystemView: React.FC<SystemViewProps> = ({ onNavigate }) => {
  return (
    <div className="space-y-6">
      {/* Authentic NieR Title Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-baseline justify-between border-b border-[#b4af9a] pb-2 gap-2 nier-slide-in stagger-1">
        <Title title="SYSTEM" subtitle="- Unit Specification" />
        <span className="text-xs font-mono text-[#57544a] dark:text-[#a39e8a] tracking-widest bg-[#dad4bb] dark:bg-[#23221e] px-2 py-1 border border-[#b4af9a]">
          STATUS: ONLINE // LV. 99
        </span>
      </div>

      {/* Tactical Pod Transmission */}
      <div className="nier-slide-in stagger-2">
        <PodDialogue />
      </div>

      {/* Main Profile Spec Card */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Avatar & Model Info */}
        <div className="border border-[#4e4b42] bg-[#dad4bb]/90 p-5 shadow-[3px_3px_0px_#b4af9a] relative flex flex-col justify-between nier-slide-in stagger-2">
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-[#b4af9a] pb-2">
              <span className="text-xs font-bold tracking-widest text-[#4e4b42] nier-title-shadow">
                UNIT IDENTIFIER
              </span>
              <span className="text-[10px] font-mono px-1.5 py-0.5 bg-[#4e4b42] text-[#dad4bb]">
                LV. 99
              </span>
            </div>

            {/* YoRHa Unit Portrait / Emblem */}
            <div className="relative border border-[#b4af9a] bg-[#d1cdb7] p-4 flex flex-col items-center justify-center text-center overflow-hidden group">
              <div className="absolute inset-0 bg-[radial-gradient(#4e4b42_1px,transparent_1px)] [background-size:8px_8px] opacity-20 pointer-events-none" />
              {/* YoRHa Insignia Background */}
              <img
                src="/assets/yorha-opacity-logo.png"
                alt="YoRHa Emblem"
                className="w-28 h-28 object-contain opacity-30 group-hover:opacity-50 transition-opacity duration-300"
              />
              <div className="mt-3">
                <h2 className="text-xl font-bold tracking-wider text-[#3f3d36] nier-title-shadow">
                  RAM PANJWANI
                </h2>
                <p className="text-xs text-[#57544a] tracking-widest mt-0.5">
                  TYPE: FULL-STACK / SYSTEMS ARCHITECT
                </p>
                <div className="mt-2 inline-flex items-center gap-1.5 text-[11px] font-mono text-[#89a87d] bg-[#3f3d36] px-2 py-0.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#89a87d] animate-pulse" />
                  STATUS: COMBAT OPERATIONAL
                </div>
              </div>
            </div>

            {/* Quick Stats list */}
            <div className="space-y-2 text-xs">
              <div className="flex justify-between border-b border-[#dad4bb] pb-1">
                <span className="text-[#57544a]">PRIMARY PARADIGM</span>
                <span className="font-bold text-[#3f3d36]">GRAPH & SYSTEMS AI</span>
              </div>
              <div className="flex justify-between border-b border-[#dad4bb] pb-1">
                <span className="text-[#57544a]">DEPLOYMENT SECTOR</span>
                <span className="font-bold text-[#3f3d36]">INDIA (UTC +05:30)</span>
              </div>
              <div className="flex justify-between border-b border-[#dad4bb] pb-1">
                <span className="text-[#57544a]">INTERFACE EDITOR</span>
                <span className="font-bold text-[#3f3d36]">NEOVIM // MODAL</span>
              </div>
              <div className="flex justify-between border-b border-[#dad4bb] pb-1">
                <span className="text-[#57544a]">TYPING DISCIPLINE</span>
                <span className="font-bold text-[#3f3d36]">STRICT STATIC TYPE CHECK</span>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-[#b4af9a] space-y-2">
            <NierButton
              text="VIEW WEAPONS ARSENAL"
              variant="primary"
              onClick={() => onNavigate('arsenal')}
              icon={<ArrowRight className="w-3.5 h-3.5" />}
            />
            <NierButton
              text="OPEN TRANSMISSION [COMM]"
              variant="secondary"
              onClick={() => onNavigate('comm')}
            />
          </div>
        </div>

        {/* Right 2 Columns: Bio, Core Architecture & Live Diagnostics */}
        <div className="lg:col-span-2 space-y-6">
          {/* Directive Dossier */}
          <div className="border border-[#4e4b42] bg-[#dad4bb]/90 p-5 shadow-[3px_3px_0px_#b4af9a] nier-slide-in stagger-3">
            <div className="flex items-center justify-between border-b border-[#b4af9a] pb-2 mb-4">
              <span className="text-xs font-bold tracking-widest text-[#4e4b42] flex items-center gap-2 nier-title-shadow">
                <Terminal className="w-3.5 h-3.5" />
                OPERATIONAL DIRECTIVE & BIOGRAPHY
              </span>
              <span className="text-[10px] font-mono text-[#57544a]">
                REF: RECORD #0915
              </span>
            </div>

            <div className="text-sm leading-relaxed text-[#3f3d36] space-y-3">
              <p>
                Engineer dedicated to crafting robust, high-leverage systems: from
                evidence-grounded criminal intelligence graph workspaces for the{' '}
                <strong className="text-[#4e4b42] bg-[#d1cdb7] px-1">Ministry of Home Affairs</strong>, to
                multilingual agentic maritime reasoning engines for{' '}
                <strong className="text-[#4e4b42] bg-[#d1cdb7] px-1">ISRO</strong>, to citizen demand
                extraction platforms fusing demographic census datasets.
              </p>
              <p>
                Firm advocate of strict static typing, deterministic calculation kernels that prevent LLM
                numerical hallucinations, and ergonomic Vim modal speed. Believes software should feel
                as razor-sharp, tactile, and responsive as military-grade game UI.
              </p>
            </div>

            {/* Core Pillars Bento */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-5 pt-4 border-t border-[#b4af9a]">
              <div className="border border-[#b4af9a] bg-[#d1cdb7]/60 p-3 hover:border-[#4e4b42] transition-colors">
                <div className="flex items-center gap-1.5 text-xs font-bold text-[#4e4b42] mb-1 nier-title-shadow">
                  <Database className="w-3.5 h-3.5 text-[#cd664d]" />
                  <span>GRAPH NATIVE</span>
                </div>
                <p className="text-[11px] text-[#57544a] leading-tight">
                  High-throughput entity resolution, Neo4j graph traversal, and multi-source connection synthesis.
                </p>
              </div>

              <div className="border border-[#b4af9a] bg-[#d1cdb7]/60 p-3 hover:border-[#4e4b42] transition-colors">
                <div className="flex items-center gap-1.5 text-xs font-bold text-[#4e4b42] mb-1 nier-title-shadow">
                  <Cpu className="w-3.5 h-3.5 text-[#cd664d]" />
                  <span>DETERMINISTIC AI</span>
                </div>
                <p className="text-[11px] text-[#57544a] leading-tight">
                  Multimodal extraction grounded in mathematical formulas and zero-hallucination policy engines.
                </p>
              </div>

              <div className="border border-[#b4af9a] bg-[#d1cdb7]/60 p-3 hover:border-[#4e4b42] transition-colors">
                <div className="flex items-center gap-1.5 text-xs font-bold text-[#4e4b42] mb-1 nier-title-shadow">
                  <Shield className="w-3.5 h-3.5 text-[#cd664d]" />
                  <span>SYSTEM RIGOR</span>
                </div>
                <p className="text-[11px] text-[#57544a] leading-tight">
                  Hundreds of automated test suites, clean architecture, Docker containerization, and sub-second latency.
                </p>
              </div>
            </div>
          </div>

          {/* Real-time Diagnostics Gauges */}
          <div className="border border-[#4e4b42] bg-[#dad4bb]/90 p-5 shadow-[3px_3px_0px_#b4af9a] nier-slide-in stagger-4">
            <div className="flex items-center justify-between border-b border-[#b4af9a] pb-2 mb-3">
              <span className="text-xs font-bold tracking-widest text-[#4e4b42] nier-title-shadow">
                SYSTEM INTEGRITY & HARDWARE DIAGNOSTICS
              </span>
              <span className="text-xs font-mono text-[#89a87d]">ONLINE // 100%</span>
            </div>

            <div className="space-y-3 font-mono text-xs">
              <div>
                <div className="flex justify-between mb-1 text-[11px]">
                  <span>CODE INTEGRITY // PYTEST & VITEST SUITES</span>
                  <span className="font-bold text-[#4e4b42]">331/331 TESTS PASS (100%)</span>
                </div>
                <div className="w-full h-2.5 bg-[#b4af9a] overflow-hidden border border-[#57544a]">
                  <div className="h-full bg-[#4e4b42] w-full animate-pulse" />
                </div>
              </div>

              <div>
                <div className="flex justify-between mb-1 text-[11px]">
                  <span>ENTITY RESOLUTION PRECISION (NEXUS)</span>
                  <span className="font-bold text-[#4e4b42]">100% DETERMINISTIC</span>
                </div>
                <div className="w-full h-2.5 bg-[#b4af9a] overflow-hidden border border-[#57544a]">
                  <div className="h-full bg-[#4e4b42] w-full" />
                </div>
              </div>

              <div>
                <div className="flex justify-between mb-1 text-[11px]">
                  <span>VERNACULAR LANGUAGE ADAPTERS (ORCA & CIVICPULSE)</span>
                  <span className="font-bold text-[#4e4b42]">HINDI, MARATHI, TAMIL, REGIONAL</span>
                </div>
                <div className="w-full h-2.5 bg-[#b4af9a] overflow-hidden border border-[#57544a]">
                  <div className="h-full bg-[#4e4b42] w-[92%]" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

