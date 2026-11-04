const SUPPORT_EMAIL = "support@kennion.com";

export default function ComingSoonPage() {
  return (
    <main className="relative flex min-h-[100svh] w-full items-center justify-center overflow-hidden bg-[#0a1929] px-5 py-12 text-white">
      {/* Soft background glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 left-1/2 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-blue-600/30 blur-[120px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-48 right-[-10%] h-[420px] w-[420px] rounded-full bg-cyan-500/20 blur-[120px]"
      />

      <div className="relative z-10 mx-auto flex w-full max-w-xl flex-col items-center text-center">
        <div className="flex items-center gap-3" aria-label="Kennion">
          <svg viewBox="0 0 36 36" className="h-10 w-10 sm:h-11 sm:w-11" aria-hidden="true">
            <defs>
              <linearGradient id="logoGrad" x1="0" y1="0" x2="36" y2="36" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#3B82F6" />
                <stop offset="100%" stopColor="#06B6D4" />
              </linearGradient>
            </defs>
            <rect width="36" height="36" rx="9" fill="url(#logoGrad)" />
            <path d="M18 7l9 4.5v6c0 4.5-3.6 8.2-9 9.5-5.4-1.3-9-5-9-9.5v-6l9-4.5z" fill="white" fillOpacity="0.9" />
            <path d="M15 17l2.5 2.5 5-5" stroke="#3B82F6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
          </svg>
          <span className="text-2xl font-extrabold tracking-[0.18em] sm:text-[28px]">KENNION</span>
        </div>

        <span className="mt-10 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-cyan-300">
          <span className="h-1.5 w-1.5 rounded-full bg-cyan-300" />
          Coming January 1, 2027
        </span>

        <h1 className="mt-6 text-[40px] font-extrabold leading-[1.1] tracking-tight sm:text-6xl">
          New Program
          <br />
          <span className="bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
            Coming Soon
          </span>
        </h1>

        <p className="mt-5 max-w-md text-base leading-relaxed text-slate-300 sm:text-lg">
          Our new program launches January 1st, 2027. If you have any questions
          or need help with anything, email us at{" "}
          <a
            href={`mailto:${SUPPORT_EMAIL}`}
            className="font-semibold text-white underline decoration-cyan-300/60 underline-offset-4 hover:decoration-cyan-300"
          >
            {SUPPORT_EMAIL}
          </a>
          .
        </p>

        <a
          href={`mailto:${SUPPORT_EMAIL}`}
          className="mt-9 inline-flex w-full items-center justify-center rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 px-7 py-3.5 text-base font-semibold text-white shadow-lg shadow-blue-900/40 transition hover:brightness-110 sm:w-auto"
        >
          Email Support
        </a>

        <p className="mt-14 text-xs text-slate-500">
          &copy; {new Date().getFullYear()} Kennion. All rights reserved.
        </p>
      </div>
    </main>
  );
}
