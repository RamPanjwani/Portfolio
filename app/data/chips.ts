import { PluginChip, ChipCategoryMetadata } from './types';

export const CHIP_CATEGORIES: ChipCategoryMetadata[] = [
  {
    id: 'attack',
    label: 'ATTACK (CORE RUNTIMES)',
    color: 'text-[#cd664d]',
    borderColor: 'border-[#cd664d]',
    bgHex: '#cd664d',
    percent: 30,
  },
  {
    id: 'defense',
    label: 'DEFENSE (SYSTEMS & DB)',
    color: 'text-[#4e4b42]',
    borderColor: 'border-[#4e4b42]',
    bgHex: '#4e4b42',
    percent: 35,
  },
  {
    id: 'support',
    label: 'SUPPORT (AI & AGENTS)',
    color: 'text-[#89a87d]',
    borderColor: 'border-[#89a87d]',
    bgHex: '#89a87d',
    percent: 20,
  },
  {
    id: 'system',
    label: 'SYSTEM (WORKFLOW & UI)',
    color: 'text-[#57544a]',
    borderColor: 'border-[#57544a]',
    bgHex: '#57544a',
    percent: 15,
  },
];

export const CHIPS_CAPACITY = {
  maxSlots: 128,
  usedSlots: 128,
  status: 'OPTIMAL',
};

export const CHIPS_DATA: PluginChip[] = [
  // Attack (Core Runtimes & Languages)
  {
    id: 'ts',
    name: 'TypeScript // Strict Typing',
    category: 'attack',
    rank: '◆ +8',
    cost: 12,
    effect: 'Compile-time guarantee',
    description: 'Eliminates runtime null pointer errors and enforces rigid API contracts across large-scale distributed codebases.',
  },
  {
    id: 'py',
    name: 'Python 3.12 // FastAPI & Data',
    category: 'attack',
    rank: '◆ +8',
    cost: 14,
    effect: 'High-throughput async backend',
    description: 'Powers asynchronous API microservices, Pytest automation suites, and multimodal machine learning evaluation pipelines.',
  },
  {
    id: 'cypher',
    name: 'Cypher // Graph Query Language',
    category: 'attack',
    rank: '◆ +6',
    cost: 10,
    effect: 'Sub-second multi-hop traversal',
    description: 'Extracts deep syndicated criminal connections across millions of nodes in Neo4j without Cartesian explosion.',
  },
  {
    id: 'sql',
    name: 'PostgreSQL // Relational & PostGIS',
    category: 'attack',
    rank: '◆ +7',
    cost: 11,
    effect: 'ACID transactional persistence',
    description: 'Spatial geospatial indexing and complex joins powering demographic census data fusion.',
  },

  // Defense (Infrastructure & Security)
  {
    id: 'neo4j',
    name: 'Neo4j Graph Database',
    category: 'defense',
    rank: '◆ +8',
    cost: 16,
    effect: 'Graph-native clustering',
    description: 'Underpins NEXUS law enforcement intelligence with property graphs and real-time community detection.',
  },
  {
    id: 'docker',
    name: 'Docker & Containerization',
    category: 'defense',
    rank: '◆ +6',
    cost: 9,
    effect: 'Reproducible microservice pods',
    description: 'Multi-stage builds, isolated runtime environments, and deterministic deployment orchestration.',
  },
  {
    id: 'linux',
    name: 'Linux / Arch / Debian Systems',
    category: 'defense',
    rank: '◆ +8',
    cost: 15,
    effect: 'Kernel & process optimization',
    description: 'Deep familiarity with bash scripting, POSIX standards, systemd services, and resource control groups.',
  },
  {
    id: 'redis',
    name: 'Redis In-Memory Cache',
    category: 'defense',
    rank: '◆ +5',
    cost: 8,
    effect: 'Sub-millisecond state caching',
    description: 'Distributed locking, rate-limiting, and maritime telemetry session store for ORCA/SAMUDRA.',
  },

  // Support (AI & Intelligence)
  {
    id: 'gemini',
    name: 'Google Gemini 3.6 Multimodal',
    category: 'support',
    rank: '◆ +8',
    cost: 14,
    effect: 'Evidence-grounded reasoning',
    description: 'Multimodal image damage verification and policy document synthesis with structured schema outputs.',
  },
  {
    id: 'sarvam',
    name: 'Sarvam AI Speech Ingestion',
    category: 'support',
    rank: '◆ +7',
    cost: 12,
    effect: 'Indian vernacular transcription',
    description: 'Transforms spoken Hindi, Marathi, and regional citizen infrastructure demands into clean structured text.',
  },
  {
    id: 'agents',
    name: 'Agentic Reasoning Pipelines',
    category: 'support',
    rank: '◆ +7',
    cost: 13,
    effect: 'Autonomous coordinated reasoning',
    description: 'Decomposes complex geospatial inquiries into parallel worker agents with strict audit trails.',
  },

  // System (Developer Ergonomics & Web)
  {
    id: 'vim',
    name: 'Neovim // Modal Editing',
    category: 'system',
    rank: '◆ +8 [UNIQUE]',
    cost: 18,
    effect: 'Zero-latency keystroke speed',
    description: 'Custom Lua configuration, LSP integration, and keyboard-driven terminal workflow without mouse dependency.',
  },
  {
    id: 'nextjs',
    name: 'Next.js & React 19',
    category: 'system',
    rank: '◆ +7',
    cost: 12,
    effect: 'Server components & SSR streaming',
    description: 'High-performance interactive web interfaces, MDX engineering journals, and Turbopack optimization.',
  },
  {
    id: 'webaudio',
    name: 'Web Audio API Realtime Synthesizer',
    category: 'system',
    rank: '◆ +6',
    cost: 8,
    effect: 'Zero-asset procedural sound FX',
    description: 'Oscillator synthesis generating mechanical ticks, chimes, and alarms without external audio latency.',
  },
];
