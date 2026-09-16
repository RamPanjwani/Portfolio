# YoRHa Optical Archives // Photos Directory

To add your own photos:
1. Copy your `.jpg` or `.png` or `.webp` photos into this folder: `public/photos/` (e.g. `public/photos/my-camera-shot.jpg`).
2. Open `app/data/photos.ts`.
3. Add a new item to `INITIAL_PHOTOS`:

```typescript
{
  id: 'opt-007',
  title: 'YOUR PHOTO TITLE // SECTOR',
  src: '/photos/my-camera-shot.jpg',
  date: '2026.04.10',
  location: 'City, Country // Sector Name',
  category: 'STREET', // 'URBAN' | 'STREET' | 'ARCHITECTURE' | 'MONOCHROME' | 'NATURE'
  camera: 'Your Camera',
  lens: 'Your Lens',
  settings: '35mm · f/2.0 · 1/500s · ISO 200',
  fieldNotes: 'Your notes on this photograph.',
}
```

You can also use the **[+ IMPORT RECORD]** button directly in the browser on the `[04] PHOTOS` tab to preview your images immediately!
