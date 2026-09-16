'use client';

import React from 'react';

export interface NierBadgeProps {
  children: React.ReactNode;
  variant?: 'default' | 'primary' | 'alert' | 'success' | 'outline' | 'muted';
  size?: 'sm' | 'md';
  className?: string;
}

export const NierBadge: React.FC<NierBadgeProps> = ({
  children,
  variant = 'default',
  size = 'sm',
  className = '',
}) => {
  const getVariantStyles = () => {
    switch (variant) {
      case 'primary':
        return 'bg-[#eae5d2] text-[#3f3d36] border-[#4e4b42]';
      case 'alert':
        return 'bg-[#cd664d]/15 text-[#cd664d] border-[#cd664d]';
      case 'success':
        return 'bg-[#89a87d]/20 text-[#89a87d] border-[#89a87d]';
      case 'muted':
        return 'bg-[#eae5d2] text-[#57544a] border-[#b4af9a]';
      case 'outline':
        return 'border-current text-inherit bg-transparent';
      case 'default':
      default:
        return 'bg-[#dad4bb] text-[#3f3d36] border-[#b4af9a]';
    }
  };

  const getSizeStyles = () => {
    switch (size) {
      case 'md':
        return 'text-xs px-2 py-0.5';
      case 'sm':
      default:
        return 'text-[10px] sm:text-[11px] px-1.5 py-0.5';
    }
  };

  return (
    <span
      className={`inline-flex items-center gap-1 font-mono font-bold tracking-wider uppercase border ${getVariantStyles()} ${getSizeStyles()} ${className}`}
    >
      {children}
    </span>
  );
};
