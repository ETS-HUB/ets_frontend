import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  env: {
    NEXT_PUBLIC_YOUTUBE_API_KEY:
      process.env.NEXT_PUBLIC_YOUTUBE_API_KEY ?? process.env.YOUTUBE_API_KEY,
    NEXT_PUBLIC_YOUTUBE_CHANNEL_ID:
      process.env.NEXT_PUBLIC_YOUTUBE_CHANNEL_ID ??
      process.env.YOUTUBE_CHANNEL_ID,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
