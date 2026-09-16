import { NavigationTab, HudConfig, FooterConfig } from './types';

export const NAVIGATION_TABS: NavigationTab[] = [
  { id: 'system', label: 'Home', sub: 'Profile & Status' },
  { id: 'arsenal', label: 'Projects', sub: 'Weapons & Work' },
  { id: 'chips', label: 'Blog', sub: 'Skills & Plug-ins' },
  { id: 'photos', label: 'Photos', sub: 'Optical Archives' },
  { id: 'comm', label: 'Connect', sub: 'Transmission' },
];

export const FOOTER_CONFIG: FooterConfig = {
  unitName: 'RAM PANJWANI',
  systemTitle: 'SYSTEM PORTFOLIO',
  tributeNotice: 'TRIBUTE TO YOKO TARO & HISAYOSHI KIJIMA (PLATINUMGAMES)',
  shortcuts: [
    { label: '[1 - 6]', action: 'DIRECT JUMP' },
    { label: '[CLICK]', action: 'EXECUTE' },
  ],
  statusIndicator: 'POD 042: ONLINE',
  philosophicalQuote: '"Everything that lives is designed to end. We are perpetually trapped in a never-ending spiral of life and death."',
};
