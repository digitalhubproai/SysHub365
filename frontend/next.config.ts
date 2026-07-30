import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "randomuser.me",
        pathname: "/**",
      },
    ],
  },
  experimental: {
    optimizePackageImports: ["lucide-react", "react-icons", "framer-motion"],
  },
  compress: true,
  transpilePackages: [],
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.syshub365.com" }],
        destination: "https://syshub365.com/:path*",
        permanent: true,
      },
    ];
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "X-Frame-Options",
            value: "DENY",
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          {
            key: "Permissions-Policy",
            value: "geolocation=(), camera=(), microphone=()",
          },
          {
            key: "Link",
            value: "<https://syshub365-api-3f088fe0-71f2-4e0c-bcf1-ca591e93ba4b.fly.dev>; rel=preconnect; crossorigin=anonymous",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
