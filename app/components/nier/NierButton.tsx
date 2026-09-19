'use client';

import React, { useState } from 'react';
import { nierAudio } from './NierAudio';

interface NierButtonProps {
  children?: React.ReactNode;
  text?: string;
  onClick?: () => void;
  disabled?: boolean;
  active?: boolean;
  variant?: 'primary' | 'secondary' | 'alert' | 'ghost' | 'checkbox';
  checked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  className?: string;
  badge?: string | number;
  icon?: React.ReactNode;
  href?: string;
}

export const NierButton: React.FC<NierButtonProps> = ({
  children,
  text,
  onClick,
  disabled = false,
  active = false,
  variant = 'primary',
  checked = false,
  onCheckedChange,
  className = '',
  badge,
  icon,
  href,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    if (disabled) return;
    setIsHovered(true);
    nierAudio.playHover();
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const handleClick = (e: React.MouseEvent) => {
    if (disabled) return;
    nierAudio.playSelect();
    if (variant === 'checkbox' && onCheckedChange) {
      onCheckedChange(!checked);
    }
    if (onClick) {
      onClick();
    }
  };

  const isChecked = variant === 'checkbox' ? checked : active;

  const content = (
    <div
      className={`group relative z-10 flex items-center justify-between px-2.5 sm:px-3 py-1.5 sm:py-2 border font-mono text-xs sm:text-sm tracking-wider uppercase select-none nier-btn-surface cursor-pointer active:scale-[0.98] active:translate-y-[1px] ${
        isChecked ? 'active' : ''
      } ${
        variant === 'alert' ? 'border-[#cd664d] text-[#cd664d]' : 'border-[#b4af9a]'
      } ${disabled ? 'opacity-40 cursor-not-allowed pointer-events-none' : ''} ${className}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
    >
      <div className="flex items-center gap-1.5 sm:gap-2.5 overflow-hidden min-w-0">
        {/* Square indicator pip with reverse gradient slide & rotation */}
        <div
          className={`nier-pip shrink-0 ${
            variant === 'alert' ? '!bg-[#cd664d]' : ''
          }`}
        />
        {icon && <span className="shrink-0">{icon}</span>}
        <span className="truncate font-semibold tracking-normal sm:tracking-wide">
          {text || children}
        </span>
      </div>

      {badge !== undefined && (
        <span
          className={`ml-2 text-xs px-1.5 py-0.2 border transition-colors ${
            isChecked
              ? 'border-[#dad4bb] text-[#dad4bb]'
              : 'border-[#57544a] text-[#57544a]'
          }`}
        >
          {badge}
        </span>
      )}
    </div>
  );

  if (href) {
    return (
      <a
        href={href}
        className="block no-underline"
        target={href.startsWith('http') ? '_blank' : undefined}
        rel="noreferrer"
      >
        {content}
      </a>
    );
  }

  return content;
};
