'use client';

import React, { useState, useEffect } from "react";
import { LoadingDots } from "./loading/LoadingDots";
import { LoadingLogs } from "./loading/LoadingLogs";
import { SpinLoadingIcon } from "./loading/SpinLoadingIcon";
import { nierAudio } from "./NierAudio";

interface NierBootScreenProps {
  onStartingExit?: () => void;
  onComplete: () => void;
}

export const NierBootScreen: React.FC<NierBootScreenProps> = ({ onStartingExit, onComplete }) => {
  const [fadeOut, setFadeOut] = useState(false);

  const handleFinish = () => {
    nierAudio.playSelect();
    setFadeOut(true);
    onStartingExit?.();
    setTimeout(onComplete, 200);
  };

  const handleSkip = () => {
    nierAudio.playSelect();
    setFadeOut(true);
    onStartingExit?.();
    setTimeout(onComplete, 120);
  };

  // Keyboard shortcut ESC to skip silently
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" || e.key === "Enter") {
        handleSkip();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <main
      className={`fixed inset-0 z-[100] text-white flex flex-col p-3 sm:p-4 md:p-[4%] select-none overflow-hidden font-sans transition-opacity duration-200 ease-out nier-boot-screen-bg ${
        fadeOut ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
    >
      {/* Top Header - exactly as in NieR design system screenshot */}
      <header className="flex justify-between items-center pb-2">
        <div className="flex items-baseline">
          <h1 className="glitch-text opacity-90 text-2xl md:text-3xl font-bold tracking-normal" data-text="LOADING">
            LOADING
          </h1>
          <p
            className="glitch-text opacity-80 text-sm md:text-base ml-1 tracking-normal"
            data-text=" - CHECKING SYSTEM"
          >
            {" "}
            - CHECKING SYSTEM
          </p>
          <LoadingDots />
        </div>

        <SpinLoadingIcon />
      </header>

      {/* Sequential Logs Section with 4vh line-height from original repo */}
      <section
        className="ml-[2%] h-full relative overflow-y-auto mt-2 font-sans text-sm sm:text-[15px] pr-4 scrollbar-none"
        style={{ lineHeight: "4vh" }}
      >
        <LoadingLogs callBack={handleFinish} />
      </section>
    </main>
  );
};
