'use client';

import React from 'react';

export interface NierProgressBarProps {
  label?: string;
  valueText?: string;
  percent: number;
  pulse?: boolean;
  colorHex?: string;
  variant?: 'primary' | 'alert' | 'success' | 'system';
  height?: string;
  className?: string;
}

export const NierProgressBar: React.FC<NierProgressBarProps> = ({
  label,
  valueText,
  percent,
  pulse = false,
  colorHex,
  variant = 'primary',
  height = 'h-2.5',
  className = '',
}) => {
  const getFillColor = () => {
    if (colorHex) return '';
    switch (variant) {
      case 'alert':
        return 'bg-[#cd664d]';
      case 'success':
        return 'bg-[#89a87d]';
      case 'system':
        return 'bg-[#57544a]';
      case 'primary':
      default:
        return 'bg-[#4e4b42]';
    }
  };

  const clamped = Math.min(Math.max(percent, 0), 100);

  return (
    <div className={`space-y-1 font-mono text-xs ${className}`}>
      {(label || valueText) && (
        <div className="flex flex-wrap justify-between items-center text-[10px] sm:text-[11px] gap-1">
          {label && <span className="text-[#57544a] truncate">{label}</span>}
          {valueText && (
            <span className="font-bold text-[#4e4b42] shrink-0">
              {valueText}
            </span>
          )}
        </div>
      )}

      <div className={`w-full ${height} bg-[#b4af9a] overflow-hidden border border-[#57544a] p-0.5`}>
        <div
          className={`h-full ${getFillColor()} ${pulse ? 'animate-pulse' : ''} transition-all duration-300`}
          style={{
            width: `${clamped}%`,
            backgroundColor: colorHex,
          }}
        />
      </div>
    </div>
  );
};
