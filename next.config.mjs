/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      domains: ['im1.dineout.co.in'],
    },
    reactStrictMode: true,
    i18n: {
      locales: ['en', 'fr'],
      defaultLocale: 'en',
    },
    experimental: {
      reactRoot: true,
    },
    future: {
      webpack5: true,
    },
    pageExtensions: ['js', 'jsx', 'ts', 'tsx'],
  };
  
  export default nextConfig;
  