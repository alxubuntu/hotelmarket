import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin();

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: '/es/hoteles',
        destination: '/es/hotels',
        locale: false,
      },
      {
        source: '/es/socios',
        destination: '/es/partners',
        locale: false,
      },
      {
        source: '/es/casos-de-exito',
        destination: '/es/case-studies',
        locale: false,
      },
    ];
  },
};

export default withNextIntl(nextConfig);
