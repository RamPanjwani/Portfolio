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
      className={`group relative select-none font-mono text-sm tracking-wider uppercase inline-block w-full ${
        disabled ? 'opacity-40 cursor-not-allowed pointer-events-none' : 'cursor-pointer'
      } ${className}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
    >
      {/* Top expanding razor line on hover */}
      <div
        className={`nier-razor-top ${
          variant === 'alert' ? '!bg-[#cd664d]' : ''
        }`}
      />

      {/* Main button block with sliding background and mechanical press physics */}
      <div
        className={`relative z-10 flex items-center justify-between px-3 py-2 border nier-btn-surface active:scale-[0.98] active:translate-y-[1px] ${
          isChecked ? 'active shadow-[2px_2px_0px_#b4af9a]' : ''
        } ${
          variant === 'alert' ? 'border-[#cd664d] text-[#cd664d]' : 'border-[#b4af9a]'
        }`}
      >
        <div className="flex items-center gap-2.5 overflow-hidden">
          {/* Square indicator pip with reverse gradient slide & rotation */}
          <div
            className={`nier-pip shrink-0 ${
              variant === 'alert' ? '!bg-[#cd664d]' : ''
            }`}
          />
          {icon && <span className="shrink-0">{icon}</span>}
          <span className="truncate font-semibold tracking-wide">
            {text || children}
          </span>
        </div>

        {badge !== undefined && (
          <span
            className={`ml-2 text-xs px-1.5 py-0.2 border transition-colors ${
              isChecked
                ? 'border-[#dad4bb] text-[#dad4bb] dark:border-[#181816] dark:text-[#181816]'
                : 'border-[#57544a] text-[#57544a] dark:border-[#dad4bb] dark:text-[#dad4bb]'
            }`}
          >
            {badge}
          </span>
        )}
      </div>

      {/* Bottom expanding razor line on hover */}
      <div
        className={`nier-razor-bottom ${
          variant === 'alert' ? '!bg-[#cd664d]' : ''
        }`}
      />
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
