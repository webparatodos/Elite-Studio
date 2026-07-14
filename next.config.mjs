/** @type {import('next').NextConfig} */
const nextConfig = {
  turbopack: {
    root: import.meta.dirname,
  },
  images: {
    // Sin 2048/3840: este sitio no necesita renders 4K+retina; reduce el peso del
    // fallback `src` que sirven navegadores sin soporte de srcset (y lo que miden
    // herramientas como Screaming Frog/PageSpeed al pedir la imagen directamente).
    deviceSizes: [640, 750, 828, 1080, 1200, 1600],
    qualities: [60, 75],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'picsum.photos',
      },
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
      },
    ],
  },
}

export default nextConfig
