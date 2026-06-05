import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  // Keep these server-only Node libs external so Next doesn't bundle their
  // internals (pdf-parse has a test-file require quirk; both then trace cleanly
  // into the standalone output instead of risking a broken bundled require).
  serverExternalPackages: ["pdf-parse", "qrcode"],
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
