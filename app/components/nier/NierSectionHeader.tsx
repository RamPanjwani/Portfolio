'use client';

import React from 'react';
import { Title } from './Title';

export interface NierSectionHeaderProps {
  title: string;
  subtitle?: string;
  statusBadge?: string | React.ReactNode;
  actions?: React.ReactNode;
  className?: string;
}

export const NierSectionHeader: React.FC<NierSectionHeaderProps> = ({
  title,
  subtitle,
  statusBadge,
  actions,
  className = '',
}) => {
  return (
    <div
      className={`flex flex-col lg:flex-row items-start lg:items-baseline justify-between pb-1 gap-2.5 nier-slide-in stagger-1 ${className}`}
    >
      <Title title={title} subtitle={subtitle} />

      {(statusBadge || actions) && (
        <div className="flex items-center gap-2 sm:gap-3 w-full lg:w-auto justify-between lg:justify-end flex-wrap sm:flex-nowrap">
          {statusBadge && (
            <span className="text-[10px] sm:text-xs font-mono text-[#57544a] tracking-widest bg-[#dad4bb] px-2 sm:px-2.5 py-1 border border-[#b4af9a] truncate">
              {statusBadge}
            </span>
          )}

          {actions && <div className="shrink-0">{actions}</div>}
        </div>
      )}
    </div>
  );
};
