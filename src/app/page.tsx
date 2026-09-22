import { Inter_Tight } from "next/font/google";

// Same typeface as the Kennion.com marketing site.
const interTight = Inter_Tight({ subsets: ["latin"], display: "swap" });

const SUPPORT_EMAIL = "support@kennion.com";

export default function ComingSoonPage() {
  return (
    <main
      className={`${interTight.className} flex min-h-[100svh] w-full flex-col items-center bg-[#faf8f5] px-6 text-[#131a24] antialiased`}
    >
      <div className="flex w-full max-w-xl flex-1 flex-col items-center justify-center py-16 text-center">
        <img
          src="/kennion-logo.png"
          alt="Kennion Benefit Advisors"
          width={162}
          height={41}
          className="h-9 w-auto sm:h-10"
          style={{ mixBlendMode: "multiply" }}
        />

        <p className="mt-14 text-[11px] font-semibold uppercase tracking-[0.22em] text-[#9b6a31]">
          Coming January 1, 2027
        </p>

        <h1 className="mt-5 text-[clamp(2.6rem,11vw,4.5rem)] font-bold leading-[0.98] tracking-[-0.035em]">
          New Program
          <br />
          Coming Soon
        </h1>

        <div className="mt-8 h-px w-12 bg-[#d9d4ca]" />

        <p className="mt-8 max-w-md text-[17px] leading-relaxed text-[#5a6070]">
          Our new program launches January 1st, 2027. If you have any questions
          or need help with anything, email us at{" "}
          <a
            href={`mailto:${SUPPORT_EMAIL}`}
            className="whitespace-nowrap font-semibold text-[#15325a] underline decoration-[#15325a]/30 underline-offset-4 transition-colors hover:decoration-[#15325a]"
          >
            {SUPPORT_EMAIL}
          </a>
          .
        </p>
      </div>

      <footer className="pb-8 text-xs text-[#8a8f99]">
        &copy; {new Date().getFullYear()} Kennion Benefit Advisors
      </footer>
    </main>
  );
}
