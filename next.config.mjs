/** @type {import('next').NextConfig} */
const nextConfig = {
  images: { formats: ['image/avif', 'image/webp'] },
  experimental: { optimizePackageImports: ['lucide-react'] },
  typescript: { ignoreBuildErrors: true },
  eslint: { ignoreDuringBuilds: true },
};
export default nextConfig;
