import type { NextConfig } from "next";
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin();

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: '**.convex.cloud',
      },
      {
        protocol: 'https',
        hostname: '**.convex.site',
      },
      {
        protocol: 'https',
        hostname: 'vesalius.odoo.com',
      },
    ],
  },
  async redirects() {
    return [
      {
        source: '/terms-and-conditions',
        destination: '/terms-conditions',
        permanent: true,
      },
      {
        source: '/:locale(en|nl|fr)/terms-and-conditions',
        destination: '/:locale/terms-conditions',
        permanent: true,
      },
    ];
  },
};

export default withNextIntl(nextConfig);
