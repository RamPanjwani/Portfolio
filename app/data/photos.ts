/**
 * PHOTO ARCHIVES DATA SOURCE
 * ==========================
 * How to add your own photos:
 * 1. Place your image files in the `/public/photos/` folder (e.g. `/public/photos/my-photo.jpg`).
 * 2. Add a new object entry to the `INITIAL_PHOTOS` array below with `src: '/photos/my-photo.jpg'`.
 * 3. You can also click "+ IMPORT RECORD" directly on the website to preview/add photos live!
 */

export type PhotoCategory = 'ALL' | 'URBAN' | 'STREET' | 'ARCHITECTURE' | 'MONOCHROME' | 'NATURE';

export interface PhotoItem {
  id: string;
  title: string;
  src: string;
  date: string;
  location: string;
  category: PhotoCategory;
  camera?: string;
  lens?: string;
  settings?: string;
  fieldNotes?: string;
}

export const INITIAL_PHOTOS: PhotoItem[] = [
  {
    id: 'opt-001',
    title: 'BRUTALIST VERTICALITY // CONCRETE HORIZON',
    src: '/photos/brutalist-facade.jpg',
    date: '2026.02.14',
    location: 'Navi Mumbai // Sector 19',
    category: 'ARCHITECTURE',
    camera: 'Sony α7 IV',
    lens: 'FE 24-70mm f/2.8 GM II',
    settings: '35mm · f/5.6 · 1/400s · ISO 100',
    fieldNotes: 'Monolithic concrete facade captured during harsh midday luminescence. Geometric shadow division accentuates structural symmetry.',
  },
  {
    id: 'opt-002',
    title: 'NIGHT TELEMETRY // NEON SATURATION',
    src: '/photos/night-telemetry.jpg',
    date: '2026.01.28',
    location: 'South Mumbai // Marine Drive Arterial',
    category: 'STREET',
    camera: 'Fujifilm X-T5',
    lens: 'XF 33mm f/1.4 R LM WR',
    settings: '33mm · f/1.4 · 1/60s · ISO 1600',
    fieldNotes: 'Ambient street luminescence reflecting off asphalt immediately following a sudden deluge. High dynamic range preservation.',
  },
  {
    id: 'opt-003',
    title: 'SHADOW PLAY // HIGH CONTRAST SILHOUETTE',
    src: '/photos/monochrome-street.jpg',
    date: '2025.12.19',
    location: 'Old Delhi // Chawri Bazar Transit',
    category: 'MONOCHROME',
    camera: 'Leica Q2 Monochrom',
    lens: 'Summilux 28mm f/1.7 ASPH',
    settings: '28mm · f/4.0 · 1/1000s · ISO 200',
    fieldNotes: 'Pure tonal gradation without chromatic distraction. High-contrast negative space framing pedestrian velocity.',
  },
  {
    id: 'opt-004',
    title: 'URBAN GRID // ELEVATED TRANSIT CORRIDOR',
    src: '/photos/urban-geometry.jpg',
    date: '2025.11.08',
    location: 'Bengaluru // Indiranagar Flyover',
    category: 'URBAN',
    camera: 'Sony α7 IV',
    lens: 'FE 50mm f/1.2 GM',
    settings: '50mm · f/2.8 · 1/250s · ISO 400',
    fieldNotes: 'Perspective convergence of structural steel girders against afternoon atmospheric haze. Precision alignment.',
  },
  {
    id: 'opt-005',
    title: 'METROPOLIS DUSK // GOLDEN EMISSION',
    src: '/photos/city-dusk.jpg',
    date: '2025.10.15',
    location: 'Mumbai Harbour // Eastern Waterfront',
    category: 'URBAN',
    camera: 'Fujifilm X-T5',
    lens: 'XF 16-55mm f/2.8 R LM WR',
    settings: '24mm · f/8.0 · 2.5s · ISO 125',
    fieldNotes: 'Long exposure capture during astronomical twilight. Gradient transition from warm sodium emissions to cool tropospheric violet.',
  },
  {
    id: 'opt-006',
    title: 'ATMOSPHERIC FOG // WESTERN GHATS RIDGE',
    src: '/photos/mist-mountains.jpg',
    date: '2025.09.22',
    location: 'Malshej Ghat // Western Escarpment',
    category: 'NATURE',
    camera: 'Sony α7 IV',
    lens: 'FE 70-200mm f/2.8 GM OSS II',
    settings: '135mm · f/4.0 · 1/500s · ISO 250',
    fieldNotes: 'Monsoon cloud bank sweeping over basalt cliff faces. Minimalist tonal separation mimicking traditional ink landscapes.',
  },
];
