import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  // pdf-parse is a CommonJS Node lib used for server-side PDF text extraction;
  // keep it external so Next doesn't bundle its internals (and its test-file quirk).
  serverExternalPackages: ["pdf-parse"],
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "X-Robots-Tag",
            value: "noindex, nofollow, noarchive, nosnippet, noimageindex",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
