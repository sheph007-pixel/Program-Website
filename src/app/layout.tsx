import type { Metadata, Viewport } from "next";
import "./globals.css";
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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <LayoutShell>{children}</LayoutShell>
      </body>
    </html>
  );
}
