"use client";

import { useState } from "react";
import { ArrowRight, Sparkles } from "lucide-react";
import { useUserName } from "./NameContext";

export default function WelcomeModal() {
  const { hasName, setName } = useUserName();
  const [input, setInput] = useState("");
  const [show, setShow] = useState(true);

  if (hasName || !show) return null;

  const handleSubmit = () => {
    const trimmed = input.trim();
    if (trimmed) {
      setName(trimmed);
    } else {
      setShow(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center bg-black/50 backdrop-blur-sm px-5">
      <div className="w-full max-w-[380px] rounded-2xl bg-white p-8 shadow-2xl animate-fade-in-up">
        {/* Icon */}
        <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 to-cyan-500 shadow-lg shadow-blue-500/25">
          <Sparkles size={24} className="text-white" strokeWidth={1.8} />
        </div>

        {/* Text */}
        <h2 className="text-center text-[22px] font-bold text-[var(--kennion-navy)] mb-2">
          Welcome!
        </h2>
        <p className="text-center text-[14px] text-slate-500 leading-relaxed mb-6">
          We're glad you're here. What's your first name?
        </p>

        {/* Input */}
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Your first name"
          autoFocus
          className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-[15px] text-slate-700 outline-none transition-all placeholder:text-slate-400 focus:border-blue-400 focus:bg-white focus:ring-2 focus:ring-blue-400/20 mb-4"
        />

        {/* Buttons */}
        <button
          onClick={handleSubmit}
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 py-3 text-[14px] font-semibold text-white shadow-md shadow-blue-500/20 transition-all hover:shadow-lg hover:shadow-blue-500/30 active:scale-[0.98]"
        >
          {input.trim() ? "Let's Go" : "Skip For Now"}
          <ArrowRight size={16} strokeWidth={1.8} />
        </button>
      </div>
    </div>
  );
}
