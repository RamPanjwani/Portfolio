'use client';

import React from 'react';
import { Title } from './Title';
import { NierBar } from './NierBar';

export interface PagesTemplateProps {
  title?: string;
  subtitle?: string;
  footer?: string;
  child?: React.ReactNode;
  children?: React.ReactNode;
  className?: string;
}

export const PagesTemplate: React.FC<PagesTemplateProps> = ({
  title,
  subtitle,
  footer,
  child,
  children,
  className = '',
}) => {
  const content = child ?? children;

  return (
    <div className={`space-y-6 select-none ${className}`}>
      {/* Title Header with authentic NieR 48px / 8px tracking & 7px 5px shadow */}
      {(title || subtitle) && (
        <div className="nier-slide-in stagger-1 pb-1">
          <Title title={title} subtitle={subtitle} />
        </div>
      )}

      {/* Main Content */}
      <div className="w-full">
        {content}
      </div>

      {/* Optional In-Page Footer Guide bar from PagesTemplate */}
      {footer && (
        <div className="w-full border-t border-[#b4af9a] pt-3 flex items-center gap-3 text-xs text-[#57544a] nier-slide-in stagger-6">
          <NierBar height="20px" dark={true} />
          <span className="font-mono tracking-wide">{footer}</span>
        </div>
      )}
    </div>
  );
};

export default PagesTemplate;
