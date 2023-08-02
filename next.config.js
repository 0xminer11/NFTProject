/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['obortech.infura-ipfs.io', 'ipfs.io'],
  },
};

module.exports = nextConfig;
