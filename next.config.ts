// next.config.js
const nextConfig = {
  webpack: (config:any) => {
    config.resolve.fallback = { canvas: false, fs: false, path: false };
    return config;
  },
};

module.exports = nextConfig;
