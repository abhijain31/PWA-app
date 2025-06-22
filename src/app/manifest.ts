import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Scheduler App',
    short_name: 'Scheduler',
    description: 'A PWA scheduler with tasks, events, calendar, and reminders.',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#0d9488',
    icons: [
      {
        src: '/icons/icon-192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/icons/icon-512.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  };
}
