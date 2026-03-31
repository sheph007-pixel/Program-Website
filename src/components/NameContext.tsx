"use client";

import { createContext, useContext, useState, useEffect, useCallback, ReactNode } from "react";

type NameContextType = {
  name: string;
  userCode: string;
  setName: (name: string) => void;
  clearName: () => void;
  hasName: boolean;
};

const NameContext = createContext<NameContextType>({
  name: "",
  userCode: "",
  setName: () => {},
  clearName: () => {},
  hasName: false,
});

export function useUserName() {
  return useContext(NameContext);
}

function smartCapitalize(s: string) {
  if (!s) return s;
  // If all lowercase, capitalize first letter
  if (s === s.toLowerCase()) {
    return s.charAt(0).toUpperCase() + s.slice(1);
  }
  // Otherwise preserve their capitalization (handles MacDonald, JP, etc.)
  return s;
}

/** Generate a short unique member code like KEN-A7F3 */
function generateUserCode(): string {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789"; // skip confusing chars (0,O,1,I)
  let code = "";
  for (let i = 0; i < 4; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return `KEN-${code}`;
}

/** Set a cookie that persists for 2 years */
function setCookie(name: string, value: string) {
  const maxAge = 60 * 60 * 24 * 730; // ~2 years
  document.cookie = `${name}=${encodeURIComponent(value)};path=/;max-age=${maxAge};samesite=lax`;
}

function getCookie(name: string): string | null {
  const match = document.cookie.match(new RegExp(`(?:^|; )${name}=([^;]*)`));
  return match ? decodeURIComponent(match[1]) : null;
}

export function NameProvider({ children }: { children: ReactNode }) {
  const [name, setNameState] = useState("");
  const [userCode, setUserCode] = useState("");
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const storedName = localStorage.getItem("kennion_name");
    if (storedName) setNameState(storedName);

    // Restore or generate user code
    let code = localStorage.getItem("kennion_user_code") || getCookie("kennion_user_code");
    if (!code) {
      code = generateUserCode();
    }
    localStorage.setItem("kennion_user_code", code);
    setCookie("kennion_user_code", code);
    setUserCode(code);

    setLoaded(true);
  }, []);

  const setName = useCallback((n: string) => {
    const trimmed = smartCapitalize(n.trim());
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
    <NameContext.Provider value={{ name, userCode, setName, clearName, hasName: !!name }}>
      {children}
    </NameContext.Provider>
  );
}
