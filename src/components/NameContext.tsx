"use client";

import { createContext, useContext, useState, useEffect, useCallback, ReactNode } from "react";

type NameContextType = {
  name: string;
  setName: (name: string) => void;
  clearName: () => void;
  hasName: boolean;
};

const NameContext = createContext<NameContextType>({
  name: "",
  setName: () => {},
  clearName: () => {},
  hasName: false,
});

export function useUserName() {
  return useContext(NameContext);
}

function capitalize(s: string) {
  if (!s) return s;
  return s.charAt(0).toUpperCase() + s.slice(1).toLowerCase();
}

export function NameProvider({ children }: { children: ReactNode }) {
  const [name, setNameState] = useState("");
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("kennion_name");
    if (stored) setNameState(stored);
    setLoaded(true);
  }, []);

  const setName = useCallback((n: string) => {
    const trimmed = capitalize(n.trim());
    setNameState(trimmed);
    if (trimmed) {
      localStorage.setItem("kennion_name", trimmed);
    } else {
      localStorage.removeItem("kennion_name");
    }
  }, []);

  const clearName = useCallback(() => {
    setNameState("");
    localStorage.removeItem("kennion_name");
  }, []);

  if (!loaded) return null;

  return (
    <NameContext.Provider value={{ name, setName, clearName, hasName: !!name }}>
      {children}
    </NameContext.Provider>
  );
}
