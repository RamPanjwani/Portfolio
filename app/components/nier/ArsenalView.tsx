'use client';

import React, { useState } from 'react';
import { NierSectionHeader } from './NierSectionHeader';
import { NierCard } from './NierCard';
import { NierBadge } from './NierBadge';
import { NierButton } from './NierButton';
import { ShuffleText } from './ShuffleText';
import { nierAudio } from './NierAudio';
import { CheckCircle2 } from 'lucide-react';
import { GithubIcon } from './NierIcons';
import { PROJECTS } from '../../data/arsenal';

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
      <NierSectionHeader
        title="WEAPONS"
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Side: Weapons List */}
        <div className="lg:col-span-5 space-y-3">
          {PROJECTS.map((project, idx) => {
            const isSelected = project.id === selectedId;
            return (
              <NierCard
                key={project.id}
                staggerIndex={idx + 2}
                active={isSelected}
                hoverable={true}
                onClick={() => handleSelect(project.id)}
                onMouseEnter={() => nierAudio.playHover()}
                className="p-3"
              >
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className={`tracking-widest font-mono ${isSelected ? 'text-[#cd664d]' : 'text-[#57544a]'}`}>
                    {project.code}
                  </span>
                  <NierBadge variant={isSelected ? 'outline' : 'default'}>
                    {project.level}
                  </NierBadge>
                </div>

                <div className="font-bold text-sm tracking-wide">
                  {project.name}
                </div>

                <div className="mt-1 text-xs opacity-80 truncate">
                  {project.classification}
                </div>
              </NierCard>
            );
          })}
        </div>

        {/* Right Side: Detailed Weapon Specifications */}
        <NierCard
          key={activeProject.id}
          staggerIndex={4}
          className="lg:col-span-7 space-y-5"
        >
          {/* Header */}
          <div className="border-b border-[#b4af9a] pb-3">
            <div className="flex items-center justify-between text-xs text-[#57544a] mb-1 font-mono">
              <span>{activeProject.code}</span>
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
            <div className="border border-[#b4af9a] bg-[#eae5d2] p-2">
              <span className="text-[10px] text-[#57544a] block">ATTACK POWER</span>
              <span className="font-bold text-[#3f3d36] text-[11px] truncate block">
                {activeProject.attackPower}
              </span>
            </div>
            <div className="border border-[#b4af9a] bg-[#eae5d2] p-2">
              <span className="text-[10px] text-[#57544a] block">ACCURACY / RELIABILITY</span>
              <span className="font-bold text-[#3f3d36] text-[11px] truncate block">
                {activeProject.durability}
              </span>
            </div>
            <div className="border border-[#b4af9a] bg-[#eae5d2] p-2">
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
                <NierBadge key={tech} variant="primary" size="sm">
                  {tech}
                </NierBadge>
              ))}
            </div>
          </div>

          {/* Action Links */}
          <div className="flex flex-wrap gap-2.5 sm:gap-3 pt-2">
            {activeProject.githubUrl && (
              <NierButton
                text="SOURCE REPOSITORY"
                variant="primary"
                href={activeProject.githubUrl}
                icon={<GithubIcon className="w-3.5 h-3.5" />}
                className="w-full sm:w-auto"
              />
            )}
            <NierButton
              text="REQUEST DOSSIER"
              variant="secondary"
              onClick={() => alert(`Operational brief for ${activeProject.name} dispatched.`)}
              className="w-full sm:w-auto"
            />
          </div>
        </NierCard>
      </div>
    </div>
  );
};
