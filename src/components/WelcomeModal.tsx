"use client";

import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { useUserName } from "./NameContext";

export default function WelcomeModal() {
  const { hasName, setName } = useUserName();
  const [input, setInput] = useState("");
  const [shake, setShake] = useState(false);

  if (hasName) return null;

  const handleSubmit = () => {
    const trimmed = input.trim();
    if (trimmed) {
      setName(trimmed);
      window.scrollTo(0, 0);
    } else {
      setShake(true);
      setTimeout(() => setShake(false), 500);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center bg-[var(--kennion-navy)]/95 backdrop-blur-md px-5">
      <div className="w-full max-w-[380px] rounded-2xl bg-white p-8 shadow-2xl animate-fade-in-up">
        {/* Shield icon */}
        <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 to-cyan-500 shadow-lg shadow-blue-500/25">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 3l9 4.5v5.5c0 5.25-3.75 9.5-9 11-5.25-1.5-9-5.75-9-11V7.5L12 3z"/>
            <path d="M9 12l2 2 4-4"/>
          </svg>
        </div>

        <h2 className="text-center text-[22px] font-bold text-[var(--kennion-navy)] mb-2">
          Welcome to Kennion
        </h2>
        <p className="text-center text-[14px] text-slate-500 leading-relaxed mb-6">
          Your benefits program, all in one place. Let's personalize your experience. What's your first name?
        </p>

        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Your first name"
          autoFocus
          className={`w-full rounded-xl border bg-slate-50 px-4 py-3.5 text-[15px] text-slate-700 outline-none transition-all placeholder:text-slate-400 focus:bg-white focus:ring-2 mb-4 ${
            shake
              ? "border-red-300 focus:border-red-400 focus:ring-red-400/20 animate-[shake_0.4s_ease-in-out]"
              : "border-slate-200 focus:border-blue-400 focus:ring-blue-400/20"
          }`}
        />

        {shake && (
          <p className="text-[12px] text-red-400 text-center -mt-2 mb-3">
            Please enter your first name to continue
          </p>
        )}

        <button
          onClick={handleSubmit}
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 py-3.5 text-[15px] font-semibold text-white shadow-md shadow-blue-500/20 transition-all hover:shadow-lg hover:shadow-blue-500/30 active:scale-[0.98]"
        >
          Get Started
          <ArrowRight size={16} strokeWidth={2} />
        </button>
      </div>
    </div>
  );
}
