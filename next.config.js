/** @type {import('next').NextConfig} */
const path = require('path');

const nextConfig = {
  output: 'export', // 👈 ADD THIS

  images: {
    unoptimized: true,
  },
  trailingSlash: true,
  webpack(config) {
    config.resolve.alias['@'] = path.join(__dirname, 'src');
    return config;
  },
};

module.exports = nextConfig;