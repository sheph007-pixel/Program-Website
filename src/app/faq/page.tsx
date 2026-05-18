"use client";

import { useMemo, useState, type ReactNode } from "react";
import {
  HelpCircle,
  ChevronDown,
  Search,
  X,
  Mail,
} from "lucide-react";
import PhoneContact from "@/components/PhoneContact";
import { sections } from "./data";


const AUTOLINK_REGEX =
  /([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})|((?:https?:\/\/)?(?:[a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(?:\/[^\s)]*)?)/g;

const linkClass =
  "text-[var(--kennion-blue)] underline underline-offset-2 decoration-slate-300 transition-colors hover:decoration-[var(--kennion-blue)]";

function renderInline(text: string, keyPrefix: string): ReactNode[] {
  const nodes: ReactNode[] = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;
  let key = 0;
  AUTOLINK_REGEX.lastIndex = 0;
  while ((match = AUTOLINK_REGEX.exec(text)) !== null) {
    if (match.index > lastIndex) {
      nodes.push(text.slice(lastIndex, match.index));
    }
    const email = match[1];
    const url = match[2];
    if (email) {
      nodes.push(
        <a key={`${keyPrefix}-${key++}`} href={`mailto:${email}`} className={linkClass}>
          {email}
        </a>
      );
    } else if (url) {
      const href = /^https?:\/\//i.test(url) ? url : `https://${url}`;
      nodes.push(
        <a
          key={`${keyPrefix}-${key++}`}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={linkClass}
        >
          {url}
        </a>
      );
    }
    lastIndex = AUTOLINK_REGEX.lastIndex;
  }
  if (lastIndex < text.length) {
    nodes.push(text.slice(lastIndex));
  }
  return nodes;
}

const totalQuestionCount = sections.reduce((sum, s) => sum + s.items.length, 0);

export default function FaqPage() {
  const [query, setQuery] = useState("");
  const [manuallyOpen, setManuallyOpen] = useState<Set<string>>(
    () => new Set()
  );

  const trimmedQuery = query.trim().toLowerCase();
  const isSearching = trimmedQuery.length > 0;

  const filteredSections = useMemo(() => {
    if (!isSearching) {
      return sections.map((section, sIdx) => ({
        sectionIndex: sIdx,
        title: section.title,
        items: section.items.map((item, iIdx) => ({
          itemIndex: iIdx,
          ...item,
        })),
      }));
    }
    return sections
      .map((section, sIdx) => ({
        sectionIndex: sIdx,
        title: section.title,
        items: section.items
          .map((item, iIdx) => ({ itemIndex: iIdx, ...item }))
          .filter((item) => {
            const haystack = `${item.question} ${item.answer}`.toLowerCase();
            return haystack.includes(trimmedQuery);
          }),
      }))
      .filter((section) => section.items.length > 0);
  }, [trimmedQuery, isSearching]);

  const matchedCount = filteredSections.reduce(
    (sum, s) => sum + s.items.length,
    0
  );

  const isOpen = (id: string) => {
    if (isSearching) return true;
    return manuallyOpen.has(id);
  };

  const toggle = (id: string) => {
    if (isSearching) return;
    setManuallyOpen((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  return (
    <div className="page-container">
      <div className="page-header animate-fade-in-up">
        <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-500 shadow-lg shadow-indigo-500/25">
          <HelpCircle size={26} className="text-white" strokeWidth={1.8} />
        </div>
        <h1 className="page-title">Employer FAQ</h1>
      </div>

      {/* Table of contents */}
      {!isSearching && (
        <nav
          aria-label="Sections"
          className="card mb-6 p-1.5 animate-fade-in-up stagger-1"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2">
            {sections.map((section, sIdx) => {
              const id = `part-${sIdx + 1}`;
              const [partLabel, ...titleRest] = section.title.split(" · ");
              const roman = partLabel.replace(/^Part\s+/i, "");
              const titleText = titleRest.join(" · ");
              return (
                <a
                  key={id}
                  href={`#${id}`}
                  onClick={(e) => {
                    e.preventDefault();
                    const el = document.getElementById(id);
                    if (el) {
                      el.scrollIntoView({ behavior: "smooth", block: "start" });
                      if (typeof window !== "undefined") {
                        window.history.replaceState(null, "", `#${id}`);
                      }
                    }
                  }}
                  className="group flex items-center gap-4 rounded-xl px-4 py-3 transition-colors hover:bg-slate-50"
                >
                  <span className="w-8 shrink-0 font-mono text-[11px] font-semibold uppercase tracking-[0.15em] text-slate-400 transition-colors group-hover:text-[var(--kennion-blue)]">
                    {roman}
                  </span>
                  <span className="flex-1 text-[15px] font-medium text-slate-700 transition-colors group-hover:text-[var(--kennion-navy)] sm:text-[14px]">
                    {titleText}
                  </span>
                </a>
              );
            })}
          </div>
        </nav>
      )}

      {/* Search */}
      <div className="mb-6 animate-fade-in-up stagger-1">
        <div className="relative">
          <Search
            size={16}
            strokeWidth={2}
            className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
          />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Escape") setQuery("");
            }}
            placeholder="Search FAQs…"
            className="w-full rounded-2xl border border-slate-200 bg-white py-3 pl-11 pr-11 text-[14px] text-[var(--kennion-navy)] shadow-sm outline-none transition-all placeholder:text-slate-400 focus:border-blue-300 focus:shadow-md focus:ring-2 focus:ring-blue-100"
            aria-label="Search FAQs"
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery("")}
              aria-label="Clear search"
              className="absolute right-3 top-1/2 flex h-6 w-6 -translate-y-1/2 items-center justify-center rounded-full text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-600"
            >
              <X size={14} strokeWidth={2.2} />
            </button>
          )}
        </div>
        {isSearching && (
          <p className="mt-2 px-1 text-[12px] text-slate-500">
            {matchedCount === 0
              ? `No matches`
              : `Showing ${matchedCount} of ${totalQuestionCount} questions`}
          </p>
        )}
      </div>

      {/* Sections */}
      {filteredSections.length === 0 ? (
        <div className="card flex flex-col items-center gap-3 px-5 py-8 text-center">
          <p className="text-[14px] font-semibold text-[var(--kennion-navy)]">
            No FAQs match &ldquo;{query}&rdquo;.
          </p>
          <p className="text-[13px] text-slate-500">
            Try a broader term, or reach out and we&rsquo;ll answer directly.
          </p>
          <a
            href="mailto:hunter@kennion.com"
            className="mt-1 inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2 text-[13px] font-semibold text-[var(--kennion-blue)] shadow-sm transition-all hover:border-blue-200 hover:bg-blue-50"
          >
            <Mail size={14} strokeWidth={2} />
            hunter@kennion.com
          </a>
        </div>
      ) : (
        <div className="flex flex-col gap-7">
          {filteredSections.map((section) => (
            <section
              key={section.sectionIndex}
              id={`part-${section.sectionIndex + 1}`}
              className="scroll-mt-20"
            >
              <h2 className="mb-3 px-1 text-[12px] font-bold uppercase tracking-[0.12em] text-slate-500 sm:text-[11px]">
                {section.title}
              </h2>
              <div className="flex flex-col gap-2.5">
                {section.items.map((item) => {
                  const id = `${section.sectionIndex}-${item.itemIndex}`;
                  const open = isOpen(id);
                  return (
                    <div key={id} className="card overflow-hidden p-0">
                      <button
                        onClick={() => toggle(id)}
                        disabled={isSearching}
                        className="flex w-full items-center justify-between gap-3 px-4 py-4 text-left transition-colors enabled:hover:bg-slate-50 disabled:cursor-default"
                        aria-expanded={open}
                      >
                        <span className="text-[15px] font-semibold leading-snug text-[var(--kennion-navy)] sm:text-[14px]">
                          {item.question}
                        </span>
                        {!isSearching && (
                          <ChevronDown
                            size={18}
                            strokeWidth={2}
                            className={`shrink-0 text-slate-400 transition-transform duration-300 ${
                              open ? "rotate-180 text-blue-500" : ""
                            }`}
                          />
                        )}
                      </button>
                      <div
                        className={`grid transition-all duration-300 ease-in-out ${
                          open
                            ? "grid-rows-[1fr] opacity-100"
                            : "grid-rows-[0fr] opacity-0"
                        }`}
                      >
                        <div className="overflow-hidden">
                          <div className="border-t border-slate-100 px-4 py-4">
                            <p className="whitespace-pre-line text-[14.5px] leading-relaxed text-slate-600 sm:text-[13px]">
                              {renderInline(item.answer, id)}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>
          ))}
        </div>
      )}

      {/* Contact footer */}
      <div className="divider" />
      <div className="animate-fade-in-up stagger-2">
        <PhoneContact
          number="(205) 641-0469"
          label="Hunter Shepherd, President"
          sublabel="Kennion Benefit Advisors · hunter@kennion.com"
          gradient="from-blue-600 to-indigo-500"
          shadow="shadow-indigo-500/20"
        />
      </div>
    </div>
  );
}
