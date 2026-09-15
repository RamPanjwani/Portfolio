'use client';

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { LoadingDots } from "../components/nier/loading/LoadingDots";
import { LoadingLogs } from "../components/nier/loading/LoadingLogs";
import { SpinLoadingIcon } from "../components/nier/loading/SpinLoadingIcon";
import { nierAudio } from "../components/nier/NierAudio";

export default function LoadingPage() {
  const router = useRouter();
  const waitingTime = 1000;

  const loadingCompleted = () => {
    nierAudio.playSelect();
    setTimeout(() => {
      router.push("/");
    }, waitingTime);
  };

  const handleSkip = () => {
    nierAudio.playSelect();
    router.push("/");
  };

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
      className="fixed inset-0 z-[100] text-white flex flex-col p-[2%] md:p-[4%] select-none overflow-hidden font-sans"
      style={{
        backgroundColor: "#181816",
        backgroundImage: "url(/assets/yorha-opacity-logo.png)",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        textShadow: "0px 0px 5px white",
      }}
    >
      {/* Top Header - exactly matching screenshot */}
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
        <LoadingLogs callBack={loadingCompleted} />
      </section>
    </main>
  );
}
