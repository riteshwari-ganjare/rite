/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      domains: ['im1.dineout.co.in',"icecreamfromscratch.com","encrypted-tbn0.gstatic.com","www.skymsen.com"],
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
    eslint: {
      ignoreDuringBuilds: true,
    },
  };
  
  export default nextConfig;
  