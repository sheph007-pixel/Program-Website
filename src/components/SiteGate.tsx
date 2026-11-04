"use client";

import { useState } from "react";
import { Lock } from "lucide-react";

/** Code prompt shown in place of the whole site while it is locked. */
export default function SiteGate() {
  const [code, setCode] = useState("");
  const [error, setError] = useState(false);
  const [busy, setBusy] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError(false);
    try {
      const res = await fetch("/api/site-access", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code }),
      });
      if (res.ok) {
        window.location.reload();
        return;
      }
      setError(true);
    } catch {
      setError(true);
    }
    setBusy(false);
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-blue-950 px-5">
      <form
        onSubmit={submit}
        className="w-full max-w-[380px] rounded-[10px] bg-white p-7 text-center shadow-xl"
      >
        <img src="/bensync/wordmark-color.png" alt="BenSync" className="mx-auto h-9 w-auto" />
        <div className="mx-auto mt-5 flex h-11 w-11 items-center justify-center rounded-full bg-blue-100 text-blue-700">
          <Lock size={20} strokeWidth={2} />
        </div>
        <h1 className="mt-3 text-[19px] font-semibold text-slate-800">Enter Access Code</h1>
        <input
          type="password"
          inputMode="numeric"
          autoComplete="off"
          autoFocus
          value={code}
          onChange={(e) => setCode(e.target.value)}
          aria-label="Access code"
          placeholder="Code"
          className="mt-5 w-full rounded-md border border-slate-300 px-3 py-2.5 text-center text-[16px] tracking-[0.3em] text-slate-800 outline-none focus:border-blue-600"
        />
        {error && <p className="mt-2 text-[13px] text-red-700">That code is not correct.</p>}
        <button
          type="submit"
          disabled={busy || !code}
          className="mt-4 w-full rounded-md bg-blue-600 py-2.5 text-[15px] font-semibold text-white transition-colors hover:bg-blue-700 disabled:opacity-60"
        >
          {busy ? "Checking..." : "Enter Site"}
        </button>
      </form>
    </div>
  );
}
