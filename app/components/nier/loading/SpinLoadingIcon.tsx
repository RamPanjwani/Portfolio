'use client';

import React from "react";

export const SpinLoadingIcon = (): React.JSX.Element => (
  <div className="relative w-10 h-10 animate-spin" style={{ animationDuration: '1s', animationTimingFunction: 'linear' }}>
    {/* Outermost Close border */}
    <div className="absolute inset-0 rounded-[60%] border-2 border-white pointer-events-none" />

    {/* Outer circle */}
    <div className="absolute inset-[10%] rounded-[60%] border-[6px] border-white pointer-events-none" />

    {/* Spinning black sector notch */}
    <div
      className="absolute inset-[10%] rounded-[60%] border-[3px] border-black pointer-events-none z-10"
      style={{
        borderTopColor: 'transparent',
        borderBottomColor: 'transparent',
        borderLeftColor: 'transparent',
      }}
    />

    {/* Inner center circle */}
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[35%] h-[35%] bg-white rounded-full pointer-events-none" />
  </div>
);
