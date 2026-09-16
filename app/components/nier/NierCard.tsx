'use client';

import React from 'react';

export interface NierCardProps {
  children: React.ReactNode;
  className?: string;
  headerTitle?: string | React.ReactNode;
  headerRight?: React.ReactNode;
  headerIcon?: React.ReactNode;
  variant?: 'default' | 'highlight' | 'alert' | 'ghost';
  cornerBrackets?: boolean;
  staggerIndex?: number;
  onClick?: () => void;
  onMouseEnter?: () => void;
  hoverable?: boolean;
  active?: boolean;
}

export const NierCard: React.FC<NierCardProps> = ({
  children,
  className = '',
  headerTitle,
  headerRight,
  headerIcon,
  variant = 'default',
  cornerBrackets = false,
  staggerIndex,
  onClick,
  onMouseEnter,
  hoverable = false,
  active = false,
}) => {
  const getBorderColor = () => {
    if (active) return 'border-[#4e4b42]';
    if (variant === 'alert') return 'border-[#cd664d]';
    if (variant === 'highlight') return 'border-[#4e4b42]';
    return 'border-[#b4af9a]';
  };

  const getBgColor = () => {
    if (active) return 'bg-[#4e4b42] text-[#dad4bb] translate-x-1';
    if (variant === 'ghost') return 'bg-transparent';
    return 'bg-[#dad4bb] text-[#3f3d36]';
  };

  const getShadow = () => {
    if (active) return 'shadow-[3px_3px_0px_#b4af9a]';
    if (variant === 'alert') return 'shadow-[3px_3px_0px_#cd664d]';
    return 'shadow-[3px_3px_0px_#b4af9a]';
  };

  const staggerClass = staggerIndex !== undefined ? `nier-slide-in stagger-${Math.min(Math.max(staggerIndex, 1), 6)}` : '';
  const hoverClasses = hoverable
    ? active
      ? 'cursor-pointer transition-all duration-200 active:scale-[0.985] active:translate-y-[1px]'
      : 'cursor-pointer hover:border-[#4e4b42] hover:bg-[#eae5d2] transition-all duration-200 active:scale-[0.985] active:translate-y-[1px]'
    : '';

  return (
    <div
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      className={`relative border p-4 sm:p-5 ${getBorderColor()} ${getBgColor()} ${getShadow()} ${staggerClass} ${hoverClasses} ${className}`}
    >
      {/* Optional Authentic NieR 4-Corner Crosshair / Brackets */}
      {cornerBrackets && (
        <>
          <div className={`absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 ${active ? 'border-[#dad4bb]' : 'border-[#4e4b42]'} pointer-events-none`} />
          <div className={`absolute top-0 right-0 w-2 h-2 border-t-2 border-r-2 ${active ? 'border-[#dad4bb]' : 'border-[#4e4b42]'} pointer-events-none`} />
          <div className={`absolute bottom-0 left-0 w-2 h-2 border-b-2 border-l-2 ${active ? 'border-[#dad4bb]' : 'border-[#4e4b42]'} pointer-events-none`} />
          <div className={`absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 ${active ? 'border-[#dad4bb]' : 'border-[#4e4b42]'} pointer-events-none`} />
        </>
      )}

      {/* Active Left Indicator Bar */}
      {active && (
        <div className="absolute top-0 bottom-0 left-0 w-1.5 bg-[#cd664d]" />
      )}

      {/* Optional Integrated Card Header */}
      {(headerTitle || headerRight) && (
        <div className="flex items-center justify-between border-b border-[#b4af9a] pb-2 mb-3">
          <div className="flex items-center gap-2 min-w-0">
            {headerIcon && <span className="shrink-0">{headerIcon}</span>}
            {headerTitle && (
              <span className="text-xs font-bold tracking-widest font-mono uppercase truncate nier-title-shadow">
                {headerTitle}
              </span>
            )}
          </div>
          {headerRight && <div className="shrink-0 ml-2">{headerRight}</div>}
        </div>
      )}

      {children}
    </div>
  );
};
