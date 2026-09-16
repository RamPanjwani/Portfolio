import { NavigationTab, HudConfig, FooterConfig } from './types';

export const NAVIGATION_TABS: NavigationTab[] = [
  { id: 'system', label: '[01] SYSTEM', sub: 'Profile & Status' },
  { id: 'arsenal', label: '[02] ARSENAL', sub: 'Weapons & Work' },
  { id: 'chips', label: '[03] CHIPS', sub: 'Skills & Plug-ins' },
  { id: 'photos', label: '[04] PHOTOS', sub: 'Optical Archives' },
  { id: 'intel', label: '[05] INTEL', sub: 'Archives & Notes' },
  { id: 'comm', label: '[06] COMM', sub: 'Transmission' },
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
