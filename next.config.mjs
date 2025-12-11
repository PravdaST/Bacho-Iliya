/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      },
    ],
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    qualities: [50, 75, 80, 85, 90, 100],
  },
  async redirects() {
    return [
      // Fix /learn/* -> /blog/learn/* redirects (SEO 404 fixes)
      {
        source: '/learn/:slug',
        destination: '/blog/learn/:slug',
        permanent: true,
      },
      // Fix /recipes/* -> /blog/learn/* redirects
      {
        source: '/recipes/yaitza-po-panagurski',
        destination: '/blog/learn/yaytsa-po-panagyurski-retsepta',
        permanent: true,
      },
      {
        source: '/recipes/patatnik-recipe',
        destination: '/blog/learn/patatnik-recepta',
        permanent: true,
      },
      {
        source: '/recipes/patatnik',
        destination: '/blog/learn/patatnik-recepta',
        permanent: true,
      },
      {
        source: '/recipes/klasicheska-recepta-tarator',
        destination: '/blog/learn/tarator-recepta',
        permanent: true,
      },
      {
        source: '/recipes/krem-karamel-recepta',
        destination: '/blog/learn/tradicionni-rodopski-yastiya-s-izvara',
        permanent: true,
      },
      {
        source: '/recipes/rodopski-klin',
        destination: '/blog/learn/rodopski-klin-recepta',
        permanent: true,
      },
      {
        source: '/recipes/mekitsi-sirene-kiselo-mlyako',
        destination: '/blog/learn/mekitsi-sas-sirene-i-kiselomlyako-recepta',
        permanent: true,
      },
      {
        source: '/recipes/mechitsi-sas-sirene-kiselo-mlyako',
        destination: '/blog/learn/mekitsi-sas-sirene-i-kiselomlyako-recepta',
        permanent: true,
      },
      {
        source: '/recipes/sirene-po-shopski',
        destination: '/blog/learn/sirene-po-shopski-recepta',
        permanent: true,
      },
      {
        source: '/recipes/kak-se-pravi-katak',
        destination: '/blog/learn/ayryan-domashna-recepta',
        permanent: true,
      },
      {
        source: '/recipes/katyk-s-chesan-i-orehi',
        destination: '/blog/learn/recepta-salata-snezhanka',
        permanent: true,
      },
      // Fix non-existent product redirects
      {
        source: '/products/maslo',
        destination: '/products',
        permanent: true,
      },
      {
        source: '/products/maslo-bacho-iliya',
        destination: '/products',
        permanent: true,
      },
      {
        source: '/products/fermentirani-mlechni-produkti',
        destination: '/products',
        permanent: true,
      },
      // Fix encoded URL
      {
        source: '/blog/learn/rodopski-mlechni-specialiteti-sm%C3%A9tana-katyk',
        destination: '/blog/learn/rodopski-mlechni-specialiteti-smetana-katyk',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
