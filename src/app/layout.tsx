import type { Metadata, Viewport } from "next";
import "./globals.css";
import { headers } from "next/headers";
import LayoutShell from "@/components/LayoutShell";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export const metadata: Metadata = {
  title: "BenSync Benefits Program",
  description:
    "BenSync, the benefits program powered by Kennion Benefit Advisors. Explore your benefits, enroll, and talk with a licensed benefits counselor.",
  icons: {
    icon: [{ url: "/bensync/favicon-32.png", sizes: "32x32", type: "image/png" }],
    apple: [{ url: "/bensync/favicon-180.png", sizes: "180x180" }],
  },
  robots: {
    index: false,
    follow: false,
    googleBot: {
      index: false,
      follow: false,
    },
  },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Set by middleware while the site is behind the preview code; the page is
  // then the code prompt, shown without the sidebar and help widget.
  const locked = (await headers()).get("x-site-locked") === "1";
  return (
    <html lang="en">
      <body>
        {locked ? children : <LayoutShell>{children}</LayoutShell>}
      </body>
    </html>
  );
}
