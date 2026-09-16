'use client';

import React from 'react';
import { ShuffleText } from './ShuffleText';

export interface TitleProps {
  title?: string;
  subtitle?: string;
  className?: string;
}

export const Title: React.FC<TitleProps> = ({ title, subtitle, className = '', ...props }) => {
  if (!title && !subtitle) return null;

  return (
    <div
      className={`nier-page-title ${className}`}
      {...props}
    >
      {title && (
        <h1>
          <ShuffleText
            text={title}
            charIncInterval={85}
            charFrames={18}
            charFrameTime={28}
          />
        </h1>
      )}
      {subtitle && (
        <h3>
          <ShuffleText
            text={subtitle}
            charIncInterval={40}
            charFrames={14}
            charFrameTime={22}
          />
        </h3>
      )}
    </div>
  );
};

export default Title;
