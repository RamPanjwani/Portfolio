'use client';

import React, { useState, useEffect } from 'react';
import { NierSectionHeader } from './NierSectionHeader';
import { NierCard } from './NierCard';
import { NierButton } from './NierButton';
import { nierAudio } from './NierAudio';
import { Mail, Send, Radio, AlertTriangle, CheckCircle2, FileText } from 'lucide-react';
import { GithubIcon, LinkedinIcon, XIcon } from './NierIcons';
import { UPLINK_CHANNELS, COMM_CONFIG } from '../../data/comm';

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

  const renderChannelIcon = (iconName: string) => {
    switch (iconName) {
      case 'Github':
        return <GithubIcon className="w-4 h-4 text-[#4e4b42] group-hover:text-[#dad4bb] shrink-0" />;
      case 'Linkedin':
        return <LinkedinIcon className="w-4 h-4 text-[#4e4b42] group-hover:text-[#dad4bb] shrink-0" />;
      case 'X':
        return <XIcon className="w-4 h-4 text-[#4e4b42] group-hover:text-[#dad4bb] shrink-0" />;
      case 'Resume':
        return <FileText className="w-4 h-4 text-[#4e4b42] group-hover:text-[#dad4bb] shrink-0" />;
      case 'Mail':
      default:
        return <Mail className="w-4 h-4 text-[#4e4b42] group-hover:text-[#dad4bb] shrink-0" />;
    }
  };

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
              {COMM_CONFIG.glitchMessage}
            </p>
            <div className="border border-[#b4af9a] p-2 text-[11px] text-[#89a87d]">
              {COMM_CONFIG.podIntervention}
            </div>
          </div>
        </div>
      )}

      {/* Countdown Warning Bar */}
      {countdown !== null && countdown > 0 && (
        <div className="border-2 border-[#cd664d] bg-[#cd664d]/20 p-3 font-mono text-center animate-pulse">
          <span className="text-[#cd664d] font-bold text-sm tracking-widest">
            ⚠️ {COMM_CONFIG.selfDestructWarning} {countdown} SECONDS ⚠️
          </span>
        </div>
      )}

      {/* Authentic NieR Title & Header */}
      <NierSectionHeader
        title="CONNECT"
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Contact Form */}
        <NierCard
          staggerIndex={2}
          headerIcon={<Radio className="w-3.5 h-3.5 text-[#cd664d]" />}
          headerTitle="DISPATCH OPERATIONAL TRANSMISSION"
          className="lg:col-span-7 xl:col-span-8 2xl:col-span-8 space-y-4"
        >
          {sent ? (
            <div className="p-6 border border-[#89a87d] bg-[#eae5d2] text-center space-y-2">
              <CheckCircle2 className="w-8 h-8 text-[#89a87d] mx-auto" />
              <h4 className="font-bold text-[#3f3d36] text-sm">
                {COMM_CONFIG.confirmationNotice}
              </h4>
              <p className="text-xs text-[#57544a]">
                {COMM_CONFIG.transmissionTarget}
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
                  className="w-full p-2 sm:p-2.5 bg-[#eae5d2] border border-[#b4af9a] text-[#3f3d36] focus:border-[#4e4b42] outline-none font-mono"
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
                  className="w-full p-2 sm:p-2.5 bg-[#eae5d2] border border-[#b4af9a] text-[#3f3d36] focus:border-[#4e4b42] outline-none font-mono"
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
                  className="w-full p-2 sm:p-2.5 bg-[#eae5d2] border border-[#b4af9a] text-[#3f3d36] focus:border-[#4e4b42] outline-none font-mono"
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
                  className="w-full p-2 sm:p-2.5 bg-[#eae5d2] border border-[#b4af9a] text-[#3f3d36] focus:border-[#4e4b42] outline-none resize-none font-mono"
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
        </NierCard>

        {/* Right: Uplink Coordinates & Easter Egg */}
        <div className="lg:col-span-5 xl:col-span-4 2xl:col-span-4 space-y-4">
          <NierCard
            staggerIndex={3}
            headerTitle="VERIFIED UPLINK CHANNELS"
            className="space-y-3 text-xs"
          >
            <div className="space-y-2">
              {UPLINK_CHANNELS.map((channel) => (
                <a
                  key={channel.id}
                  href={channel.url}
                  target={channel.url.startsWith('http') ? '_blank' : undefined}
                  rel={channel.url.startsWith('http') ? 'noreferrer' : undefined}
                  className="flex flex-col sm:flex-row sm:items-center justify-between p-2.5 bg-[#eae5d2] border border-[#b4af9a] hover:border-[#4e4b42] hover:bg-[#4e4b42] hover:text-[#dad4bb] transition-all group gap-1"
                >
                  <div className="flex items-center gap-2">
                    {renderChannelIcon(channel.iconName)}
                    <span className="font-bold">{channel.title}</span>
                  </div>
                  <span className="text-[10px] opacity-70 font-mono sm:text-right truncate">
                    {channel.handle}
                  </span>
                </a>
              ))}
            </div>
          </NierCard>
                  </div>
      </div>
    </div>
  );
};
