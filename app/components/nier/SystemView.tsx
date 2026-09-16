'use client';

import React from 'react';
import { NierSectionHeader } from './NierSectionHeader';
import { NierCard } from './NierCard';
import { NierBadge } from './NierBadge';
import { NierProgressBar } from './NierProgressBar';
import { NierButton } from './NierButton';
import { PodDialogue } from './PodDialogue';
import { Terminal, Cpu, Database, Shield, ArrowRight } from 'lucide-react';
import { SYSTEM_PROFILE } from '../../data/system';

interface SystemViewProps {
  onNavigate: (tab: string) => void;
}

export const SystemView: React.FC<SystemViewProps> = ({ onNavigate }) => {
  const getPillarIcon = (iconName: string) => {
    switch (iconName) {
      case 'Database':
        return <Database className="w-3.5 h-3.5 text-[#cd664d]" />;
      case 'Cpu':
        return <Cpu className="w-3.5 h-3.5 text-[#cd664d]" />;
      case 'Shield':
      default:
        return <Shield className="w-3.5 h-3.5 text-[#cd664d]" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Authentic NieR Title Header */}
      <NierSectionHeader
        title="SYSTEM"
      />

      {/* Tactical Pod Transmission */}
      <div className="nier-slide-in stagger-2">
        <PodDialogue />
      </div>

      {/* Main Profile Spec Card */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Avatar & Model Info */}
        <NierCard
          staggerIndex={2}
          headerTitle={SYSTEM_PROFILE.unitIdentifier}
          headerRight={<NierBadge variant="primary">{SYSTEM_PROFILE.level}</NierBadge>}
          className="lg:col-span-5 xl:col-span-4 2xl:col-span-3 flex flex-col justify-between"
        >
          <div className="space-y-4">
            {/* YoRHa Unit Portrait / Emblem */}
            <div className="relative border border-[#b4af9a] bg-[#d1cdb7] p-4 flex flex-col items-center justify-center text-center overflow-hidden group">
              <div className="absolute inset-0 bg-[radial-gradient(#4e4b42_1px,transparent_1px)] [background-size:8px_8px] opacity-20 pointer-events-none" />
              <img
                src="/assets/yorha-opacity-logo.png"
                alt="YoRHa Emblem"
                className="w-28 h-28 object-contain opacity-30 group-hover:opacity-50 transition-opacity duration-300"
              />
              <div className="mt-3">
                <h2 className="text-xl font-bold tracking-wider text-[#3f3d36] nier-title-shadow">
                  {SYSTEM_PROFILE.name}
                </h2>
                <p className="text-xs text-[#57544a] tracking-widest mt-0.5">
                  {SYSTEM_PROFILE.designation}
                </p>
                <div className="mt-2 inline-flex items-center gap-1.5 text-[11px] font-mono text-[#4e6b42] bg-[#eae5d2] border border-[#89a87d]/40 px-2 py-0.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#89a87d] animate-pulse" />
                  {SYSTEM_PROFILE.statusText}
                </div>
              </div>
            </div>

            {/* Quick Stats list */}
            <div className="space-y-2 text-xs">
              {SYSTEM_PROFILE.quickStats.map((stat, idx) => (
                <div
                  key={idx}
                  className="flex justify-between items-center border-b border-[#dad4bb] pb-1 gap-2"
                >
                  <span className="text-[#57544a] shrink-0">{stat.label}</span>
                  <span className="font-bold text-[#3f3d36] text-right truncate">
                    {stat.value}
                  </span>
                </div>
              ))}
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
        </NierCard>

        {/* Right Columns: Bio, Core Architecture & Live Diagnostics */}
        <div className="lg:col-span-7 xl:col-span-8 2xl:col-span-9 space-y-6">
          {/* Directive Dossier */}
          <NierCard
            staggerIndex={3}
            headerIcon={<Terminal className="w-3.5 h-3.5 text-[#4e4b42]" />}
            headerTitle="OPERATIONAL DIRECTIVE & BIOGRAPHY"
            headerRight={
              <span className="text-[10px] font-mono text-[#57544a]">
                {SYSTEM_PROFILE.dossierRef}
              </span>
            }
          >
            <div className="text-xs sm:text-sm leading-relaxed text-[#3f3d36] space-y-3">
              {SYSTEM_PROFILE.biography.map((p, idx) => (
                <p key={idx}>{p}</p>
              ))}
            </div>

            {/* Core Pillars Bento */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-5 pt-4 border-t border-[#b4af9a]">
              {SYSTEM_PROFILE.corePillars.map((pillar, idx) => (
                <div
                  key={idx}
                  className="border border-[#b4af9a] bg-[#eae5d2] p-3 hover:border-[#4e4b42] transition-colors"
                >
                  <div className="flex items-center gap-1.5 text-xs font-bold text-[#4e4b42] mb-1 nier-title-shadow">
                    {getPillarIcon(pillar.iconName)}
                    <span>{pillar.title}</span>
                  </div>
                  <p className="text-[11px] text-[#57544a] leading-tight">
                    {pillar.description}
                  </p>
                </div>
              ))}
            </div>
          </NierCard>

          {/* Real-time Diagnostics Gauges */}
          <NierCard
            staggerIndex={4}
            headerTitle="SYSTEM INTEGRITY & HARDWARE DIAGNOSTICS"
            headerRight={
              <span className="text-xs font-mono text-[#89a87d] shrink-0 font-bold">
                ONLINE // 100%
              </span>
            }
          >
            <div className="space-y-3">
              {SYSTEM_PROFILE.diagnostics.map((gauge, idx) => (
                <NierProgressBar
                  key={idx}
                  label={gauge.label}
                  valueText={gauge.valueText}
                  percent={gauge.percent}
                  pulse={gauge.pulse}
                />
              ))}
            </div>
          </NierCard>
        </div>
      </div>
    </div>
  );
};
