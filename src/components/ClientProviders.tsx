"use client";

import { ReactNode } from "react";
import { NameProvider } from "./NameContext";
import WelcomeModal from "./WelcomeModal";
import ChatWidget from "./ChatWidget";

export default function ClientProviders({ children }: { children: ReactNode }) {
  return (
    <NameProvider>
      <WelcomeModal />
      {children}
      <ChatWidget />
    </NameProvider>
  );
}
