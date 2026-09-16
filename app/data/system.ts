import { SystemProfile } from './types';

export const SYSTEM_PROFILE: SystemProfile = {
  unitIdentifier: 'UNIT IDENTIFIER',
  level: 'LV. 99',
  name: 'RAM PANJWANI',
  designation: 'TYPE: FULL-STACK / SYSTEMS ARCHITECT',
  statusText: 'STATUS: COMBAT OPERATIONAL',
  dossierRef: 'REF: RECORD #0915',
  biography: [
    'Engineer dedicated to crafting robust, high-leverage systems: from evidence-grounded criminal intelligence graph workspaces for the Ministry of Home Affairs, to multilingual agentic maritime reasoning engines for ISRO, to citizen demand extraction platforms fusing demographic census datasets.',
    'Firm advocate of strict static typing, deterministic calculation kernels that prevent LLM numerical hallucinations, and ergonomic Vim modal speed. Believes software should feel as razor-sharp, tactile, and responsive as military-grade game UI.'
  ],
  quickStats: [
    { label: 'PRIMARY PARADIGM', value: 'GRAPH & SYSTEMS AI' },
    { label: 'DEPLOYMENT SECTOR', value: 'INDIA (UTC +05:30)' },
    { label: 'INTERFACE EDITOR', value: 'NEOVIM // MODAL' },
    { label: 'TYPING DISCIPLINE', value: 'STRICT STATIC CHECK' },
  ],
  corePillars: [
    {
      title: 'GRAPH NATIVE',
      description: 'High-throughput entity resolution, Neo4j graph traversal, and multi-source connection synthesis.',
      iconName: 'Database',
    },
    {
      title: 'DETERMINISTIC AI',
      description: 'Multimodal extraction grounded in mathematical formulas and zero-hallucination policy engines.',
      iconName: 'Cpu',
    },
    {
      title: 'SYSTEM RIGOR',
      description: 'Hundreds of automated test suites, clean architecture, Docker containerization, and sub-second latency.',
      iconName: 'Shield',
    },
  ],
  diagnostics: [
    {
      label: 'CODE INTEGRITY // TESTS',
      valueText: '331/331 TESTS (100%)',
      percent: 100,
      pulse: true,
    },
    {
      label: 'ENTITY RESOLUTION PRECISION',
      valueText: '100% DETERMINISTIC',
      percent: 100,
      pulse: false,
    },
    {
      label: 'VERNACULAR ADAPTERS (ORCA & CIVICPULSE)',
      valueText: 'HINDI, MARATHI, TAMIL',
      percent: 92,
      pulse: false,
    },
  ],
};
