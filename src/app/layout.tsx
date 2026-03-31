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
        <main
          className="min-h-screen bg-[#f8fafc] pt-14 transition-all duration-300 ease-in-out md:pt-0"
          style={{ marginLeft: "var(--current-sidebar-width, var(--sidebar-width))" }}
        >
          {children}
        </main>
      </body>
    </html>
  );
}
