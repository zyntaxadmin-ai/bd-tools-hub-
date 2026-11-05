/** @type {import('next').NextConfig} */
const nextConfig = {
  images: { formats: ['image/avif', 'image/webp'] },
  experimental: { optimizePackageImports: ['lucide-react'] },
  // Send the old default Vercel domain to the real domain so Google sees one site, not two.
  // Only the exact production host matches, so Vercel preview URLs (e.g. bd-tools-hub-git-*.vercel.app) still work for testing.
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: "bd-tools-hub.vercel.app" }],
        destination: "https://bdtoolsflow.cyou/:path*",
        permanent: true,
      },
    ];
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
        ],
      },
    ];
  },
  typescript: { ignoreBuildErrors: true },
  eslint: { ignoreDuringBuilds: true },
};
export default nextConfig;
