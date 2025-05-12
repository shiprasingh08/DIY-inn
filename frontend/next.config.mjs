/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['i.pinimg.com'],
  },
  experimental: {
    appDir: true,
  },
  webpack(config) {
    return config;
  },
};

export default nextConfig;
