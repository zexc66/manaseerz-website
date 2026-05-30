import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Manaseerz Electric',
    short_name: 'Manaseerz',
    description: 'Licensed electrical specialists serving the Dallas-Fort Worth Metroplex. Precision electrical crafted for excellence.',
    start_url: '/',
    display: 'standalone',
    background_color: '#000000',
    theme_color: '#D4AF37',
    icons: [
      {
        src: '/icon-192.png',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'any maskable',
      },
      {
        src: '/icon-512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'any maskable',
      },
    ],
  };
}