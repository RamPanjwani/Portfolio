'use client';

import React, { useState, useEffect } from 'react';
import { Title } from './Title';
import { NierButton } from './NierButton';
import { nierAudio } from './NierAudio';
import { Mail, Send, Radio, AlertTriangle, ShieldAlert, CheckCircle2 } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './NierIcons';

export const CommView: React.FC = () => {
  const [formState, setFormState] = useState({
    senderName: '',
    senderEmail: '',
    subject: '',
    message: '',
  });
  const [sent, setSent] = useState(false);

  // Self-Destruct Sequence State
  const [countdown, setCountdown] = useState<number | null>(null);
  const [overloadGlitch, setOverloadGlitch] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    nierAudio.playSelect();
    setSent(true);
    setTimeout(() => setSent(false), 6000);
  };

  // Self-destruct easter egg
  const triggerSelfDestruct = () => {
    if (countdown !== null) return;
    nierAudio.playAlert();
    setCountdown(5);
  };

  useEffect(() => {
    if (countdown === null) return;
    if (countdown > 0) {
      const timer = setTimeout(() => {
        nierAudio.playAlert();
        setCountdown((c) => (c !== null ? c - 1 : null));
      }, 1000);
      return () => clearTimeout(timer);
    } else if (countdown === 0) {
      // Boom glitch
      nierAudio.playGlitch();
      setOverloadGlitch(true);
      const rebootTimer = setTimeout(() => {
        setOverloadGlitch(false);
        setCountdown(null);
        nierAudio.playSelect();
      }, 4000);
      return () => clearTimeout(rebootTimer);
    }
  }, [countdown]);

  return (
    <div className="space-y-6 relative">
      {/* Glitch Overlay for Self-Destruct */}
      {overloadGlitch && (
        <div className="fixed inset-0 bg-[#3f3d36] text-[#dad4bb] z-50 flex flex-col items-center justify-center font-mono p-6 animate-pulse">
          <div className="text-center max-w-lg space-y-4 border-2 border-[#cd664d] p-6 bg-[#4e4b42]">
            <AlertTriangle className="w-12 h-12 text-[#cd664d] mx-auto animate-bounce" />
            <h2 className="text-2xl font-bold text-[#cd664d] tracking-widest">
              [CRITICAL ERROR: BLACK BOX OVERHEAT]
            </h2>
            <p className="text-xs text-[#dad4bb] leading-relaxed">
              YoRHa OS visual drivers desynchronized. Internal thermal threshold exceeded (1,048°C).
            </p>
            <div className="border border-[#b4af9a] p-2 text-[11px] text-[#89a87d]">
              POD 042: "Emergency coolant deployed. Terminating rogue protocol. Restoring user interface..."
            </div>
          </div>
        </div>
      )}

      {/* Countdown Warning Bar */}
      {countdown !== null && countdown > 0 && (
        <div className="border-2 border-[#cd664d] bg-[#cd664d]/20 p-3 font-mono text-center animate-pulse">
          <span className="text-[#cd664d] font-bold text-sm tracking-widest">
            ⚠️ WARNING: SELF-DESTRUCT INITIATED — DETONATION IN {countdown} SECONDS ⚠️
          </span>
        </div>
      )}

      {/* Authentic NieR Title & Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-baseline justify-between border-b border-[#b4af9a] pb-2 gap-2 nier-slide-in stagger-1">
        <Title title="COMM" subtitle="- Direct Transmission" />
        <span className="text-xs font-mono text-[#57544a] dark:text-[#a39e8a] tracking-widest bg-[#dad4bb] dark:bg-[#23221e] px-2 py-1 border border-[#b4af9a]">
          FREQ: 142.85 MHz [SECURE]
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Contact Form */}
        <div className="lg:col-span-7 border border-[#4e4b42] bg-[#dad4bb]/90 p-5 shadow-[3px_3px_0px_#b4af9a] space-y-4 nier-slide-in stagger-2">
          <div className="border-b border-[#b4af9a] pb-2">
            <span className="text-xs font-bold tracking-widest text-[#4e4b42] flex items-center gap-2 nier-title-shadow">
              <Radio className="w-3.5 h-3.5 text-[#cd664d]" />
              DISPATCH OPERATIONAL TRANSMISSION
            </span>
          </div>

          {sent ? (
            <div className="p-6 border border-[#89a87d] bg-[#d1cdb7] text-center space-y-2">
              <CheckCircle2 className="w-8 h-8 text-[#89a87d] mx-auto" />
              <h4 className="font-bold text-[#3f3d36] text-sm">TRANSMISSION ENCRYPTED & DISPATCHED</h4>
              <p className="text-xs text-[#57544a]">
                Unit Ram Panjwani has received your packet. Expect a reply within 24 operational hours.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-3 text-xs">
              <div>
                <label className="block text-[#57544a] font-bold mb-1 uppercase font-mono">
                  SENDER CODENAME / NAME
                </label>
                <input
                  type="text"
                  required
                  value={formState.senderName}
                  onChange={(e) => setFormState({ ...formState, senderName: e.target.value })}
                  placeholder="e.g. Commander White / Recruiter"
                  className="w-full p-2 bg-[#d1cdb7] border border-[#b4af9a] text-[#3f3d36] focus:border-[#4e4b42] outline-none font-mono"
                />
              </div>

              <div>
                <label className="block text-[#57544a] font-bold mb-1 uppercase font-mono">
                  COMM FREQUENCY / EMAIL
                </label>
                <input
                  type="email"
                  required
                  value={formState.senderEmail}
                  onChange={(e) => setFormState({ ...formState, senderEmail: e.target.value })}
                  placeholder="e.g. commander@yorha-hq.net"
                  className="w-full p-2 bg-[#d1cdb7] border border-[#b4af9a] text-[#3f3d36] focus:border-[#4e4b42] outline-none font-mono"
                />
              </div>

              <div>
                <label className="block text-[#57544a] font-bold mb-1 uppercase font-mono">
                  TRANSMISSION SUBJECT
                </label>
                <input
                  type="text"
                  required
                  value={formState.subject}
                  onChange={(e) => setFormState({ ...formState, subject: e.target.value })}
                  placeholder="e.g. SIH 2026 / Architecture Collaboration"
                  className="w-full p-2 bg-[#d1cdb7] border border-[#b4af9a] text-[#3f3d36] focus:border-[#4e4b42] outline-none font-mono"
                />
              </div>

              <div>
                <label className="block text-[#57544a] font-bold mb-1 uppercase font-mono">
                  ENCRYPTED PAYLOAD / MESSAGE
                </label>
                <textarea
                  rows={4}
                  required
                  value={formState.message}
                  onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                  placeholder="Input mission requirements, technical parameters, or queries..."
                  className="w-full p-2 bg-[#d1cdb7] border border-[#b4af9a] text-[#3f3d36] focus:border-[#4e4b42] outline-none resize-none font-mono"
                />
              </div>

              <div className="pt-2">
                <NierButton
                  text="TRANSMIT PAYLOAD"
                  variant="primary"
                  icon={<Send className="w-3.5 h-3.5" />}
                  className="w-full"
                />
              </div>
            </form>
          )}
        </div>

        {/* Right: Uplink Coordinates & Easter Egg - Each card slides individually */}
        <div className="lg:col-span-5 space-y-4">
          <div className="border border-[#4e4b42] bg-[#dad4bb]/90 p-5 shadow-[3px_3px_0px_#b4af9a] space-y-3 text-xs nier-slide-in stagger-3">
            <span className="font-bold tracking-widest text-[#4e4b42] block border-b border-[#b4af9a] pb-2 nier-title-shadow">
              VERIFIED UPLINK CHANNELS
            </span>

            <div className="space-y-2">
              <a
                href="https://github.com/RamPanjwani"
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-between p-2.5 bg-[#d1cdb7] border border-[#b4af9a] hover:border-[#4e4b42] hover:bg-[#4e4b42] hover:text-[#dad4bb] transition-all group"
              >
                <div className="flex items-center gap-2">
                  <GithubIcon className="w-4 h-4 text-[#4e4b42] group-hover:text-[#dad4bb]" />
                  <span className="font-bold">GITHUB REPOSITORIES</span>
                </div>
                <span className="text-[10px] opacity-70 font-mono">github.com/RamPanjwani</span>
              </a>

              <a
                href="https://linkedin.com/in/ram-panjwani"
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-between p-2.5 bg-[#d1cdb7] border border-[#b4af9a] hover:border-[#4e4b42] hover:bg-[#4e4b42] hover:text-[#dad4bb] transition-all group"
              >
                <div className="flex items-center gap-2">
                  <LinkedinIcon className="w-4 h-4 text-[#4e4b42] group-hover:text-[#dad4bb]" />
                  <span className="font-bold">LINKEDIN NETWORK</span>
                </div>
                <span className="text-[10px] opacity-70 font-mono">in/ram-panjwani</span>
              </a>

              <a
                href="mailto:panjwaniram2004@gmail.com"
                className="flex items-center justify-between p-2.5 bg-[#d1cdb7] border border-[#b4af9a] hover:border-[#4e4b42] hover:bg-[#4e4b42] hover:text-[#dad4bb] transition-all group"
              >
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-[#4e4b42] group-hover:text-[#dad4bb]" />
                  <span className="font-bold">DIRECT MAIL UPLINK</span>
                </div>
                <span className="text-[10px] opacity-70 font-mono">panjwaniram2004@gmail.com</span>
              </a>
            </div>
          </div>

          {/* Yoko Taro "Weird UI" Self-Destruct Easter Egg */}
          <div className="border border-[#cd664d] bg-[#dad4bb]/90 p-5 shadow-[3px_3px_0px_#cd664d] space-y-3 text-xs nier-slide-in stagger-4">
            <div className="flex items-center justify-between text-[#cd664d] font-bold border-b border-[#cd664d]/40 pb-2">
              <span className="flex items-center gap-1.5 nier-title-shadow">
                <AlertTriangle className="w-4 h-4" />
                <span>RESTRICTED PROTOCOL // YOKO TARO DIRECTIVE</span>
              </span>
              <span className="font-mono">[CLEARANCE: 0]</span>
            </div>

            <p className="text-[11px] text-[#57544a] leading-relaxed">
              "In our first meeting about NieR:Automata’s UI, YOKO-san said he wanted to add something strange.
              Use your self-destruct function to see this broken UI." — Hisayoshi Kijima Devblog
            </p>

            <NierButton
              text="INITIATE SELF-DESTRUCT [L3 + R3]"
              variant="alert"
              onClick={triggerSelfDestruct}
              className="w-full"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
