"use client";

import { ReactNode } from "react";
import { usePathname } from "next/navigation";
import { NameProvider } from "./NameContext";
import WelcomeModal from "./WelcomeModal";
import ChatWidget from "./ChatWidget";
import Sidebar from "./Sidebar";

export default function LayoutShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const isAdmin = pathname.startsWith("/admin");
  const isStandaloneDoc = pathname.startsWith("/education");
  const isFaq = pathname === "/faq";

  if (isAdmin || isStandaloneDoc) {
    return <>{children}</>;
  }

  return (
    <NameProvider>
      <WelcomeModal />
      <Sidebar />
      <main
        className="min-h-screen max-w-[100vw] overflow-x-hidden bg-[#f8fafc] pt-14 pb-16 transition-all duration-300 ease-in-out md:max-w-none md:pt-0 md:pb-0"
        style={{ marginLeft: "var(--current-sidebar-width, 0px)" }}
      >
        {children}
      </main>
      {!isFaq && <ChatWidget />}
    </NameProvider>
  );
}
