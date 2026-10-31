import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Travel photos are served from Vercel Blob (see data/photos.ts).
    remotePatterns: [{ protocol: "https", hostname: "*.public.blob.vercel-storage.com", pathname: "/travel/**" }],
  },
};

export default nextConfig;
