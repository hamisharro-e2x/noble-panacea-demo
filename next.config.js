const createWithMakeswift = require('@makeswift/runtime/next/plugin');

const withMakeswift = createWithMakeswift();

// @ts-check

const cspHeader = `
  base-uri 'self';
  form-action 'self';
  frame-ancestors 'self' *.amplience.net;
  upgrade-insecure-requests;
`;

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        hostname: process.env.BIGCOMMERCE_CDN_HOSTNAME ?? '*.bigcommerce.com',
      },
      {
        hostname: 'applytrial.a.bigcontent.io',
      },
      {
        hostname: 'cdn.media.amplience.net',
      },
    ],
  },
  transpilePackages: ['@bigcommerce/components'],
  typescript: {
    ignoreBuildErrors: !!process.env.CI,
  },
  eslint: {
    ignoreDuringBuilds: !!process.env.CI,
    dirs: ['app', 'client', 'components', 'lib', 'middlewares'],
  },
  // default URL generation in BigCommerce uses trailing slash
  trailingSlash: process.env.TRAILING_SLASH !== 'false',
  async headers() {
    return [
      {
        source: '/amplience/:path*',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: cspHeader.replace(/\n/g, ''),
          },
        ],
      },
      {
        // matching all API routes
        source: '/api/makeswift/:path*',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: 'https://app.makeswift.com',
          },
        ],
      },
    ];
  },
};

module.exports = withMakeswift(nextConfig);
