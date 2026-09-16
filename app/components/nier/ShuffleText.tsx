'use client';

import React, { useState, useEffect, useRef } from 'react';

interface ShuffleTextProps {
  text: string;
  className?: string;
  triggerHover?: boolean;
  charIncInterval?: number;
  charFrames?: number;
  charFrameTime?: number;
  duration?: number;
  disabled?: boolean;
}

const BASE_CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+-=~';

function genRandomChars(targetChar: string, len: number = 10): string[] {
  if (targetChar === ' ' || targetChar === '\u00a0' || targetChar === '\n') {
    return [targetChar === ' ' ? '\u00a0' : targetChar];
  }

  const chars: string[] = [];
  for (let i = 0; i < len - 1; i++) {
    chars.push(BASE_CHARS[Math.floor(Math.random() * BASE_CHARS.length)]);
  }
  chars.push(targetChar);
  return chars;
}

interface CharItemProps {
  targetChar: string;
  frames: number;
  frameTime: number;
  animated: boolean;
}

const CharItem: React.FC<CharItemProps> = ({ targetChar, frames, frameTime, animated }) => {
  const [index, setIndex] = useState(0);
  const [chars] = useState(() => (animated ? genRandomChars(targetChar, frames) : [targetChar]));

  useEffect(() => {
    if (!animated || chars.length <= 1) return;

    const timer = setInterval(() => {
      setIndex((prev) => {
        if (prev >= chars.length - 1) {
          clearInterval(timer);
          return prev;
        }
        return prev + 1;
      });
    }, frameTime);

    return () => clearInterval(timer);
  }, [animated, chars, frameTime]);

  if (!animated) {
    return <span className="shuffle-text-char-settled">{targetChar === ' ' ? '\u00a0' : targetChar}</span>;
  }

  const displayChar = chars[index] || targetChar;
  return (
    <span className="shuffle-text-char">
      {displayChar === ' ' ? '\u00a0' : displayChar}
    </span>
  );
};

export const ShuffleText: React.FC<ShuffleTextProps> = ({
  text,
  className = '',
  charIncInterval,
  charFrames = 10,
  charFrameTime = 35,
  disabled = false,
}) => {
  const targetText = text || '';
  
  // Detect if reduced motion is active
  const [isReducedMotion, setIsReducedMotion] = useState<boolean>(() => {
    if (typeof document !== 'undefined') {
      return document.documentElement.classList.contains('reduce-motion');
    }
    return false;
  });

  useEffect(() => {
    const updateMotion = () => {
      if (typeof document !== 'undefined') {
        setIsReducedMotion(document.documentElement.classList.contains('reduce-motion'));
      }
    };
    updateMotion();
    const observer = new MutationObserver(updateMotion);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
    return () => observer.disconnect();
  }, []);

  // Calculate a cinematic cadence matching NieR Automata
  const effectiveInterval =
    charIncInterval ??
    (targetText.length > 35
      ? Math.max(25, Math.floor(1600 / targetText.length))
      : 65);

  const [revealedCount, setRevealedCount] = useState<number>(0);
  const [cycleId, setCycleId] = useState<number>(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const startAnimation = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    if (!targetText || disabled || isReducedMotion) {
      setRevealedCount(0);
      return;
    }

    setCycleId((prev) => prev + 1);
    setRevealedCount(1);

    let current = 1;
    timerRef.current = setInterval(() => {
      current++;
      setRevealedCount(current);
      if (current >= targetText.length) {
        if (timerRef.current) clearInterval(timerRef.current);
        timerRef.current = null;
      }
    }, effectiveInterval);
  };

  useEffect(() => {
    if (!disabled && !isReducedMotion) {
      startAnimation();
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [targetText, disabled, isReducedMotion]);

  if (disabled || isReducedMotion) {
    return (
      <span className={`shuffle-text pointer-events-none select-none ${className}`}>
        {targetText}
      </span>
    );
  }

  // Split into tokens (words and whitespaces) to keep line-wrapping natural
  const tokens = targetText.split(/(\s+)/);
  let globalCharIndex = 0;

  return (
    <span className={`shuffle-text pointer-events-none select-none ${className}`}>
      {tokens.map((token, tIdx) => {
        if (!token) return null;
        const isSpace = /^\s+$/.test(token);
        const tokenChars = token.split('');
        const tokenStartIndex = globalCharIndex;
        globalCharIndex += tokenChars.length;

        if (isSpace) {
          return tokenChars.map((sp, sIdx) => {
            const charIdx = tokenStartIndex + sIdx;
            if (charIdx >= revealedCount) return null;
            return (
              <span key={`${cycleId}-sp-${charIdx}`} className="inline-block">
                &nbsp;
              </span>
            );
          });
        }

        return (
          <span key={`${cycleId}-tok-${tIdx}`} className="inline-block whitespace-nowrap">
            {tokenChars.map((ch, cIdx) => {
              const charIdx = tokenStartIndex + cIdx;
              if (charIdx >= revealedCount) return null;
              return (
                <CharItem
                  key={`${cycleId}-char-${charIdx}-${ch}`}
                  targetChar={ch}
                  frames={charFrames}
                  frameTime={charFrameTime}
                  animated={true}
                />
              );
            })}
          </span>
        );
      })}
    </span>
  );
};

export default ShuffleText;
