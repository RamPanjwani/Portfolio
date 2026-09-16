'use client';

import React, { useState } from 'react';
import { NierSectionHeader } from './NierSectionHeader';
import { NierCard } from './NierCard';
import { NierBadge } from './NierBadge';
import { ShuffleText } from './ShuffleText';
import { nierAudio } from './NierAudio';
import { INTEL_RECORDS } from '../../data/intel';
import { IntelRecord } from '../../data/types';

export const IntelView: React.FC = () => {
  const [selectedRecord, setSelectedRecord] = useState<IntelRecord>(INTEL_RECORDS[0]);

  const handleSelect = (record: IntelRecord) => {
    setSelectedRecord(record);
    nierAudio.playSelect();
  };

  return (
    <div className="space-y-6">
      {/* Authentic NieR Title & Header */}
      <NierSectionHeader
        title="INTEL"
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Article Index */}
        <div className="lg:col-span-5 xl:col-span-4 2xl:col-span-4 space-y-2.5">
          {INTEL_RECORDS.map((record, idx) => {
            const isSelected = record.id === selectedRecord.id;
            return (
              <NierCard
                key={record.id}
                staggerIndex={idx + 2}
                active={isSelected}
                hoverable={true}
                onClick={() => handleSelect(record)}
                onMouseEnter={() => nierAudio.playHover()}
                className="p-3 text-xs"
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
              </NierCard>
            );
          })}
        </div>

        {/* Right: Article Reader */}
        <NierCard
          key={selectedRecord.id}
          staggerIndex={4}
          className="lg:col-span-7 xl:col-span-8 2xl:col-span-8 space-y-4"
        >
          <div className="border-b border-[#b4af9a] pb-3">
            <div className="flex flex-wrap items-center justify-between text-xs text-[#57544a] mb-1 font-mono gap-1">
              <span>{selectedRecord.code} // {selectedRecord.classification}</span>
              <span>{selectedRecord.date}</span>
            </div>
            <h3 className="text-lg sm:text-xl font-bold text-[#3f3d36] leading-tight nier-title-shadow">
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
        </NierCard>
      </div>
    </div>
  );
};
