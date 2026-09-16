import React from 'react';

// ==========================================
// SYSTEM TYPES
// ==========================================
export interface QuickStat {
  label: string;
  value: string;
}

export interface CorePillar {
  title: string;
  description: string;
  iconName: 'Database' | 'Cpu' | 'Shield';
}

export interface DiagnosticGauge {
  label: string;
  valueText: string;
  percent: number;
  pulse?: boolean;
}

export interface SystemProfile {
  unitIdentifier: string;
  level: string;
  name: string;
  designation: string;
  statusText: string;
  dossierRef: string;
  biography: string[];
  quickStats: QuickStat[];
  corePillars: CorePillar[];
  diagnostics: DiagnosticGauge[];
}

// ==========================================
// ARSENAL / PROJECTS TYPES
// ==========================================
export interface ProjectItem {
  id: string;
  code: string;
  name: string;
  classification: string;
  level: string;
  tagline: string;
  description: string;
  attackPower: string;
  durability: string;
  affinity: string;
  techStack: string[];
  metrics: string[];
  highlights: string[];
  githubUrl?: string;
  demoUrl?: string;
}

// ==========================================
// CHIPS / SKILLS TYPES
// ==========================================
export type ChipCategory = 'attack' | 'defense' | 'support' | 'system';

export interface PluginChip {
  id: string;
  name: string;
  category: ChipCategory;
  rank: string;
  cost: number;
  effect: string;
  description: string;
}

export interface ChipCategoryMetadata {
  id: ChipCategory;
  label: string;
  color: string;
  borderColor: string;
  bgHex: string;
  percent: number;
}

// ==========================================
// INTEL / ARCHIVES TYPES
// ==========================================
export interface IntelRecord {
  id: string;
  code: string;
  title: string;
  date: string;
  category: string;
  classification: string;
  readTime: string;
  excerpt: string;
  content: string[];
}

// ==========================================
// COMM / TRANSMISSION TYPES
// ==========================================
export interface UplinkChannel {
  id: string;
  title: string;
  handle: string;
  url: string;
  iconName: 'Github' | 'Linkedin' | 'Mail' | 'X' | 'Resume';
}

export interface CommConfig {
  frequency: string;
  transmissionTarget: string;
  confirmationNotice: string;
  selfDestructWarning: string;
  selfDestructYokoQuote: string;
  glitchMessage: string;
  podIntervention: string;
}

// ==========================================
// NAVIGATION & TELEMETRY TYPES
// ==========================================
export interface NavigationTab {
  id: string;
  label: string;
  sub: string;
}

export interface HudConfig {
  version: string;
  unitName: string;
  sector: string;
}

export interface FooterConfig {
  unitName: string;
  systemTitle: string;
  tributeNotice: string;
  shortcuts: Array<{ label: string; action: string }>;
  statusIndicator: string;
  philosophicalQuote: string;
}
