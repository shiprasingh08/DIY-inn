/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['i.pinimg.com'],
  },
  webpack(config) {
    return config;
  },
};

export default nextConfig;
