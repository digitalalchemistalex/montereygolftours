import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  trailingSlash: true,
  compress: true,
  images: {
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 31536000,
    localPatterns: [
      { pathname: "/images/**" },
      { pathname: "/art/**" },
      { pathname: "/brand/**" },
    ],
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "golfthehighsierra.com" },
    ],
  },
};

export default nextConfig;
