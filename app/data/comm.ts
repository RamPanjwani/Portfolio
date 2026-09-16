import { UplinkChannel, CommConfig } from './types';

export const COMM_CONFIG: CommConfig = {
  transmissionTarget: 'Unit Ram Panjwani has received your packet. Expect a reply within 24 operational hours.',
  confirmationNotice: 'TRANSMISSION ENCRYPTED & DISPATCHED',
  selfDestructWarning: 'WARNING: SELF-DESTRUCT INITIATED — DETONATION IN',
  selfDestructYokoQuote:
    '"In our first meeting about NieR:Automata’s UI, YOKO-san said he wanted to add something strange. Use your self-destruct function to see this broken UI." — Hisayoshi Kijima Devblog',
  glitchMessage: 'YoRHa OS visual drivers desynchronized. Internal thermal threshold exceeded (1,048°C).',
  podIntervention: 'POD 042: "Emergency coolant deployed. Terminating rogue protocol. Restoring user interface..."',
};

export const UPLINK_CHANNELS: UplinkChannel[] = [
  {
    id: 'github',
    title: 'GITHUB REPOSITORIES',
    handle: 'github.com/RamPanjwani',
    url: 'https://github.com/RamPanjwani',
    iconName: 'Github',
  },
  {
    id: 'linkedin',
    title: 'LINKEDIN NETWORK',
    handle: 'in/ram-panjwani',
    url: 'https://linkedin.com/in/ram-panjwani',
    iconName: 'Linkedin',
  },
  {
    id: 'mail',
    title: 'DIRECT MAIL UPLINK',
    handle: 'panjwaniram2004@gmail.com',
    url: 'mailto:panjwaniram2004@gmail.com',
    iconName: 'Mail',
  },
];
