import { IntelRecord } from './types';

export const INTEL_RECORDS: IntelRecord[] = [
  {
    id: 'nier-ui-principles',
    code: 'DOC-825 // ARCHIVE',
    title: 'Deconstructing NieR:Automata UI Design & Engineering',
    date: '2026.03.15',
    category: 'UI / UX & GRAPHICS',
    classification: 'CLEARANCE: LV 04',
    readTime: '6 MIN READ',
    excerpt:
      'A deep dive into PlatinumGames UI designer Hisayoshi Kijima’s devblog: warm beige color harmonies, musical score motifs, razor line buttons, and CRT screen lens distortion.',
    content: [
      'In his 2017 devblog, Hisayoshi Kijima shared that director YOKO TARO gave a single foundational directive for NieR:Automata’s user interface: "make it a nice, warm beige."',
      'Reconciling a warm organic beige with cold, sterile android digital aesthetics posed an immense challenge. The solution lay in strict monochromatic restraint: limiting colors almost exclusively to #d1cdb7, #dad4bb, #57544a, and #3f3d36, using a drab red-orange (#cd664d) only for active markers and pod warnings.',
      'Beyond palette, the design incorporates a subtle "musical score" motif: double-bar termination lines (the 10px + 4px vertical bars), staff line headers, and colon delimiters (::). Faint CRT lens distortion and scanline vignettes ground the interface in physical hardware rather than generic web flat design.',
      'In this portfolio, every element is faithfully rendered in modern React 19 and Next.js, including zero-asset procedural Web Audio sound synthesis that triggers tactile mechanical clicks and confirmation chimes on demand.'
    ],
  },
  {
    id: 'nexus-graph-intelligence',
    code: 'DOC-419 // INTELLIGENCE',
    title: 'Evidence-Grounded Criminal Network Reasoning with Neo4j',
    date: '2026.02.10',
    category: 'GRAPH ARCHITECTURE',
    classification: 'CLEARANCE: CONFIDENTIAL',
    readTime: '8 MIN READ',
    excerpt:
      'Overcoming intelligence-extraction bottlenecks in multi-source police records using deterministic entity resolution and property graph schemas.',
    content: [
      'When investigating cross-border syndicates, law enforcement faces disparate silos: call detail records (CDRs), First Information Reports (FIRs), and banking mule spreadsheets.',
      'Probabilistic LLM entity matching risks severe false-positive arrest hazards. In NEXUS (Smart India Hackathon 2026), we engineered a deterministic, rule-based entity resolution kernel that guarantees 100% precision across benchmark evaluation datasets.',
      'By modeling entities as Neo4j nodes (Suspects, Phones, Vehicles, Bank Accounts) and interactions as weighted, time-stamped edges, investigators can perform sub-second multi-hop traversals and uncover hidden syndicate controllers that evade traditional tabular queries.'
    ],
  },
  {
    id: 'deterministic-multimodal-goods',
    code: 'DOC-102 // CIVIC',
    title: 'Deterministic Multimodal AI in Digital Public Goods',
    date: '2026.01.22',
    category: 'APPLIED AI & SYSTEMS',
    classification: 'CLEARANCE: PUBLIC',
    readTime: '5 MIN READ',
    excerpt:
      'Transforming unstructured regional citizen voice audio into mathematically prioritized community demand hotspots without numerical hallucinations.',
    content: [
      'Digital public goods in multilingual countries like India cannot rely solely on text input. Citizen voice reports across Hindi, Marathi, and Tamil must be transcribed reliably via localized acoustic models like Sarvam AI.',
      'However, delegating priority scoring to generative LLMs leads to arbitrary rating hallucinations. In CommonGround / CivicPulse, we split the architecture: Gemini 3.6 extracts structured physical damage parameters from photos, while a deterministic mathematical engine computes 0-100 priority scores based on Indian Census demographics and asset vulnerability metrics.',
      'This guarantees transparent, auditable policy recommendations that municipal administrators can defend before public audit committees.'
    ],
  },
  {
    id: 'vim-static-typing-craft',
    code: 'DOC-042 // PHILOSOPHY',
    title: 'The Vim Modal Axiom & The Case for Static Type Rigor',
    date: '2025.11.14',
    category: 'DEVELOPER ERGONOMICS',
    classification: 'CLEARANCE: ALL UNITS',
    readTime: '4 MIN READ',
    excerpt:
      'Why modal editing keystrokes, strict compiler checking, and reduced cognitive latency form the backbone of high-velocity software engineering.',
    content: [
      'Vim and Neovim are not merely text editors; they are languages for manipulating syntax trees at the speed of thought. By eliminating the friction of reaching for a mouse, the developer stays within uninterrupted cognitive flow.',
      'Combined with strict static typing in TypeScript, Python type hints, and Rust, the compiler becomes a vigilant co-pilot that prevents entire categories of runtime bugs before code ever reaches staging.',
      'When tools are configured with intention and disciplined minimalism, engineering transitions from wrestling with environment quirks to direct creative problem solving.'
    ],
  },
];
