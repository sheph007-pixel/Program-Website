import type { Metadata } from "next";
import "./globals.css";
import Sidebar from "@/components/Sidebar";
import ClientProviders from "@/components/ClientProviders";

export const metadata: Metadata = {
  title: "Kennion Benefits Program",
  description:
    "Welcome to the Kennion Benefits Program. Explore plans, enroll, and get care - all in one place.",
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
        <ClientProviders>
          <Sidebar />
          <main
            className="min-h-screen bg-[#f8fafc] pt-14 transition-all duration-300 ease-in-out md:pt-0"
            style={{ marginLeft: "var(--current-sidebar-width, var(--sidebar-width))" }}
          >
            {children}
          </main>
        </ClientProviders>
      </body>
    </html>
  );
}
