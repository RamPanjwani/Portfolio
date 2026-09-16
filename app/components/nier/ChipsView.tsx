'use client';

import React, { useState } from 'react';
import { NierSectionHeader } from './NierSectionHeader';
import { NierCard } from './NierCard';
import { NierBadge } from './NierBadge';
import { ShuffleText } from './ShuffleText';
import { nierAudio } from './NierAudio';
import { CHIPS_DATA, CHIP_CATEGORIES, CHIPS_CAPACITY } from '../../data/chips';
import { PluginChip, ChipCategory } from '../../data/types';

export const ChipsView: React.FC = () => {
  const [filter, setFilter] = useState<'all' | ChipCategory>('all');
  const [selectedChip, setSelectedChip] = useState<PluginChip>(CHIPS_DATA[0]);

  const filteredChips = filter === 'all'
    ? CHIPS_DATA
    : CHIPS_DATA.filter((c) => c.category === filter);

  const handleSelect = (chip: PluginChip) => {
    setSelectedChip(chip);
    nierAudio.playSelect();
  };

  return (
    <div className="space-y-6">
      {/* Authentic NieR Title & Header */}
      <NierSectionHeader
        title="SKILLS"
      />

      {/* Top Capacity Bar */}
      <NierCard
        staggerIndex={2}
        className="p-3 sm:p-4 space-y-2"
      >
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between text-xs gap-1">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 bg-[#4e4b42] rotate-45 shrink-0" />
            <span className="font-bold tracking-widest text-[#3f3d36] nier-title-shadow truncate">
              PLUG-IN CHIPS // MEMORY ALLOCATION
            </span>
          </div>
          <span className="text-[#57544a] font-bold text-[11px] sm:text-xs">
            <span className="hidden sm:inline">STORAGE </span>CAPACITY: {CHIPS_CAPACITY.usedSlots} / {CHIPS_CAPACITY.maxSlots} SLOTS [{CHIPS_CAPACITY.status}]
          </span>
        </div>

        {/* Multi-segment Capacity Meter */}
        <div className="w-full h-3 bg-[#b4af9a] border border-[#4e4b42] p-0.5 flex gap-0.5">
          {CHIP_CATEGORIES.map((cat) => (
            <div
              key={cat.id}
              className="h-full"
              style={{ width: `${cat.percent}%`, backgroundColor: cat.bgHex }}
              title={`${cat.label}: ${cat.percent}%`}
            />
          ))}
        </div>

        <div className="flex flex-wrap items-center gap-2.5 sm:gap-4 text-[10px] text-[#57544a] pt-1">
          {CHIP_CATEGORIES.map((cat) => (
            <span key={cat.id} className="flex items-center gap-1">
              <span className="w-2 h-2 shrink-0" style={{ backgroundColor: cat.bgHex }} />
              {cat.label}
            </span>
          ))}
        </div>
      </NierCard>

      {/* Category Filter Tabs */}
      <div className="flex flex-wrap gap-1.5 sm:gap-2 text-xs nier-slide-in stagger-2">
        <button
          onClick={() => {
            setFilter('all');
            nierAudio.playTab();
          }}
          onMouseEnter={() => nierAudio.playHover()}
          className={`px-2.5 sm:px-3 py-1 sm:py-1.5 border uppercase font-bold tracking-wider text-[11px] sm:text-xs transition-all duration-150 active:scale-[0.98] active:translate-y-[1px] ${
            filter === 'all'
              ? 'bg-[#4e4b42] text-[#dad4bb] border-[#4e4b42] shadow-[2px_2px_0px_#b4af9a]'
              : 'bg-[#dad4bb] text-[#57544a] border-[#b4af9a] hover:bg-[#eae5d2] hover:border-[#4e4b42]'
          }`}
        >
          ALL CHIPS
        </button>
        {CHIP_CATEGORIES.map((cat) => (
          <button
            key={cat.id}
            onClick={() => {
              setFilter(cat.id);
              nierAudio.playTab();
            }}
            onMouseEnter={() => nierAudio.playHover()}
            className={`px-2.5 sm:px-3 py-1 sm:py-1.5 border uppercase font-bold tracking-wider text-[11px] sm:text-xs transition-all duration-150 active:scale-[0.98] active:translate-y-[1px] ${
              filter === cat.id
                ? 'bg-[#4e4b42] text-[#dad4bb] border-[#4e4b42] shadow-[2px_2px_0px_#b4af9a]'
                : 'bg-[#dad4bb] text-[#57544a] border-[#b4af9a] hover:bg-[#eae5d2] hover:border-[#4e4b42]'
            }`}
          >
            {cat.id}
          </button>
        ))}
      </div>

      {/* Main Grid: Chip Inventory & Inspector */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Chip List */}
        <div className="lg:col-span-7 space-y-2 max-h-[500px] overflow-y-auto pr-1">
          {filteredChips.map((chip, idx) => {
            const isSelected = chip.id === selectedChip.id;
            return (
              <NierCard
                key={chip.id}
                staggerIndex={Math.min(idx + 3, 6)}
                active={isSelected}
                hoverable={true}
                onClick={() => handleSelect(chip)}
                onMouseEnter={() => nierAudio.playHover()}
                className="p-2 sm:p-2.5 flex items-center justify-between"
              >
                <div className="flex items-center gap-2 sm:gap-2.5 min-w-0 mr-2">
                  <span
                    className={`w-2 h-2 rotate-45 shrink-0 ${
                      chip.category === 'attack'
                        ? 'bg-[#cd664d]'
                        : chip.category === 'defense'
                        ? 'bg-[#57544a]'
                        : chip.category === 'support'
                        ? 'bg-[#89a87d]'
                        : 'bg-[#dad4bb]'
                    }`}
                  />
                  <span className="font-bold tracking-wide truncate">{chip.name}</span>
                </div>

                <div className="flex items-center gap-2 sm:gap-3 shrink-0">
                  <span className="text-[10px] sm:text-[11px] opacity-80 font-mono">{chip.rank}</span>
                  <NierBadge variant={isSelected ? 'outline' : 'default'} size="sm">
                    [{chip.cost} SLOTS]
                  </NierBadge>
                </div>
              </NierCard>
            );
          })}
        </div>

        {/* Selected Chip Detail Readout */}
        <NierCard
          key={selectedChip.id}
          staggerIndex={4}
          className="lg:col-span-5 space-y-4"
        >
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
            <div className="border border-[#b4af9a] bg-[#eae5d2] p-2.5">
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
        </NierCard>
      </div>
    </div>
  );
};
