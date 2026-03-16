import type { Metadata } from "next";
import "./globals.css";
import Sidebar from "@/components/Sidebar";

export const metadata: Metadata = {
  title: "Kennion Benefits Program",
  description:
    "Everything you need to enroll, explore, and get care — all in one place.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Sidebar />
        <main className="min-h-screen bg-white pt-16 pl-0 md:pt-0 md:pl-60">
          {children}
        </main>
      </body>
    </html>
  );
}
