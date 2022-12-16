/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['obortech.infura-ipfs.io', 'infura-ipfs.io'],
  },
}

module.exports = nextConfig
