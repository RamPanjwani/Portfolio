'use client';

import React from 'react';

interface NierBarProps {
  dark?: boolean;
  height?: string | number;
  className?: string;
}

export const NierBar: React.FC<NierBarProps> = ({
  dark = false,
  height = '100%',
  className = '',
}) => {
  return (
    <div
      className={`inline-flex flex-row items-stretch select-none ${className}`}
      style={{ height }}
      aria-hidden="true"
    >
      <div
        className="w-[10px] mr-[5px] bg-[var(--nier-dark)] transition-colors duration-300"
      />
      <div
        className="w-[4px] bg-[var(--nier-darker)] transition-colors duration-300"
      />
    </div>
  );
};
