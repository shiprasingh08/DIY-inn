/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['i.pinimg.com' , "images.unsplash.com", "res.cloudinary.com", "cdn.pixabay.com", "images.pexels.com", "res.cloudinary.com"],
  },
  webpack(config) {
    return config;
  },
};

export default nextConfig;
