"use client";

import { useCallback, useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  Save,
  Trash2,
  Plus,
  ChevronUp,
  ChevronDown,
  Eye,
  Loader2,
  Sparkles,
  Star,
} from "lucide-react";
import type { PlanContent, PlanContentRow, PlanContentSection } from "@/lib/planContent";
import { EMPTY_PLAN_CONTENT } from "@/lib/planContent";
import type { CategoryTemplate, PlanValues } from "@/lib/planTemplates";
import { MISSING_VALUE } from "@/lib/planTemplates";

type Meta = { name: string; category: string; pdfName: string | null };

function move<T>(arr: T[], from: number, to: number): T[] {
  if (to < 0 || to >= arr.length) return arr;
  const copy = [...arr];
  const [item] = copy.splice(from, 1);
  copy.splice(to, 0, item);
  return copy;
}

/** Editor for a label/value row list (freeform / Supplemental). */
function RowsEditor({ rows, onChange }: { rows: PlanContentRow[]; onChange: (rows: PlanContentRow[]) => void }) {
  const update = (i: number, patch: Partial<PlanContentRow>) =>
    onChange(rows.map((r, idx) => (idx === i ? { ...r, ...patch } : r)));

  return (
    <div className="space-y-2">
      {rows.map((row, i) => (
        <div key={i} className="flex items-center gap-2">
          <input
            value={row.label}
            onChange={(e) => update(i, { label: e.target.value })}
            placeholder="Label"
            className="flex-1 rounded-lg border border-slate-200 bg-white px-3 py-2 text-[13px] outline-none focus:border-blue-400"
          />
          <input
            value={row.value}
            onChange={(e) => update(i, { value: e.target.value })}
            placeholder="Value"
            className="flex-1 rounded-lg border border-slate-200 bg-white px-3 py-2 text-[13px] outline-none focus:border-blue-400"
          />
          <div className="flex shrink-0 items-center">
            <button onClick={() => onChange(move(rows, i, i - 1))} className="rounded p-1 text-slate-300 hover:text-slate-600"><ChevronUp size={15} /></button>
            <button onClick={() => onChange(move(rows, i, i + 1))} className="rounded p-1 text-slate-300 hover:text-slate-600"><ChevronDown size={15} /></button>
            <button onClick={() => onChange(rows.filter((_, idx) => idx !== i))} className="rounded p-1 text-slate-300 hover:text-red-500"><Trash2 size={14} /></button>
          </div>
        </div>
      ))}
      <button onClick={() => onChange([...rows, { label: "", value: "" }])} className="flex items-center gap-1.5 text-[12px] font-medium text-blue-600 hover:text-blue-700">
        <Plus size={13} /> Add row
      </button>
    </div>
  );
}

export default function PlanContentEditor() {
  const params = useParams();
  const id = params.id as string;

  const [meta, setMeta] = useState<Meta | null>(null);
  const [status, setStatus] = useState<string>("none");
  const [template, setTemplate] = useState<CategoryTemplate | null>(null);
  const [values, setValues] = useState<PlanValues>({});
  const [content, setContent] = useState<PlanContent>(EMPTY_PLAN_CONTENT);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [extracting, setExtracting] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/admin/plans/${id}/content`, { cache: "no-store" });
      const data = await res.json();
      if (data.error) {
        setMsg(data.error);
      } else {
        setMeta({ name: data.name, category: data.category, pdfName: data.pdfName });
        setStatus(data.contentStatus);
        setTemplate(data.template ?? null);
        setValues(data.values ?? {});
        setContent(data.content ?? EMPTY_PLAN_CONTENT);
      }
    } catch {
      setMsg("Failed to load plan content");
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    load();
  }, [load]);

  const save = async (nextStatus?: string) => {
    setSaving(true);
    setMsg(null);
    const targetStatus = nextStatus ?? (status === "none" ? "draft" : status);
    const body = template
      ? { values, contentStatus: targetStatus }
      : { content, contentStatus: targetStatus };
    try {
      const res = await fetch(`/api/admin/plans/${id}/content`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const data = await res.json();
      if (data.error) setMsg(data.error);
      else {
        setStatus(data.contentStatus);
        setMsg("Saved");
      }
    } catch {
      setMsg("Save failed");
    } finally {
      setSaving(false);
    }
  };

  const generateDraft = async () => {
    if (!confirm("Pre-fill from the PDF? This fills the fields below from the plan PDF (until you save).")) return;
    setExtracting(true);
    setMsg(null);
    try {
      const res = await fetch(`/api/admin/plans/${id}/extract`, { method: "POST" });
      const data = await res.json();
      if (data.error) setMsg(data.error);
      else {
        if (template) setValues((prev) => ({ ...prev, ...(data.values ?? {}) }));
        else setContent(data.content);
        setMsg("Pre-filled from PDF - review each value and save");
      }
    } catch {
      setMsg("Extraction failed");
    } finally {
      setExtracting(false);
    }
  };

  const updateSection = (i: number, patch: Partial<PlanContentSection>) =>
    setContent((c) => ({ ...c, sections: c.sections.map((s, idx) => (idx === i ? { ...s, ...patch } : s)) }));

  if (loading) return <div className="py-12 text-center text-sm text-slate-400">Loading...</div>;
  if (!meta) return <div className="py-12 text-center text-sm text-slate-400">{msg || "Plan not found"}</div>;

  const statusColor =
    status === "published" ? "bg-emerald-50 text-emerald-600" : status === "draft" ? "bg-amber-50 text-amber-600" : "bg-slate-100 text-slate-500";

  return (
    <div className="mx-auto max-w-3xl">
      {/* Header */}
      <div className="mb-5 flex flex-wrap items-center gap-3">
        <Link href="/admin/documents" className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-600">
          <ArrowLeft size={18} />
        </Link>
        <div className="flex-1">
          <h1 className="text-lg font-bold text-[var(--kennion-navy)]">{meta.name}</h1>
          <div className="flex items-center gap-2 text-[12px] text-slate-400">
            <span>{meta.category}</span>
            <span className={`rounded-full px-2 py-0.5 text-[10px] font-semibold capitalize ${statusColor}`}>{status}</span>
          </div>
        </div>
        <Link href={`/plans/${id}?preview=1`} target="_blank" className="flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-[12px] font-medium text-slate-600 hover:bg-slate-50">
          <Eye size={14} /> Preview
        </Link>
      </div>

      {/* Action bar */}
      <div className="mb-5 flex flex-wrap items-center gap-2">
        <button
          onClick={generateDraft}
          disabled={extracting || !meta.pdfName}
          title={meta.pdfName ? undefined : "No PDF uploaded for this plan"}
          className="flex items-center gap-1.5 rounded-lg bg-violet-50 px-3 py-2 text-[13px] font-semibold text-violet-700 transition-colors hover:bg-violet-100 disabled:opacity-50"
        >
          {extracting ? <Loader2 size={15} className="animate-spin" /> : <Sparkles size={15} />}
          Pre-fill from PDF
        </button>

        <div className="flex-1" />
        {msg && <span className="text-[12px] text-slate-500">{msg}</span>}

        <button onClick={() => save()} disabled={saving} className="flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3.5 py-2 text-[13px] font-semibold text-slate-700 hover:bg-slate-50 disabled:opacity-50">
          {saving ? <Loader2 size={15} className="animate-spin" /> : <Save size={15} />}
          Save draft
        </button>
        {status === "published" ? (
          <button onClick={() => save("draft")} disabled={saving} className="rounded-lg border border-amber-200 bg-amber-50 px-3.5 py-2 text-[13px] font-semibold text-amber-700 hover:bg-amber-100 disabled:opacity-50">
            Unpublish
          </button>
        ) : (
          <button onClick={() => save("published")} disabled={saving} className="rounded-lg bg-gradient-to-r from-emerald-500 to-teal-500 px-3.5 py-2 text-[13px] font-semibold text-white shadow-sm hover:shadow-md disabled:opacity-50">
            Publish
          </button>
        )}
      </div>

      {/* ===== Templated structured form (Health / Dental / Vision) ===== */}
      {template ? (
        <>
          <p className="mb-4 text-[12px] text-slate-500">
            Standard {meta.category.replace(" Plans", "")} fields. Empty fields show
            &ldquo;{MISSING_VALUE}&rdquo; on the page. <Star size={11} className="inline text-amber-400" /> = shown in the top highlights grid.
          </p>
          <div className="space-y-4">
            {template.sections.map((section) => (
              <div key={section.id} className="card p-4">
                <h2 className="mb-3 text-[13px] font-bold text-[var(--kennion-navy)]">{section.heading}</h2>
                <div className="space-y-2">
                  {section.fields.map((f) => (
                    <div key={f.id} className="flex items-center gap-3">
                      <label className="flex w-1/2 shrink-0 items-center gap-1 text-[13px] text-slate-600">
                        {f.highlight && <Star size={11} className="shrink-0 text-amber-400" />}
                        {f.label}
                      </label>
                      <input
                        value={values[f.id] ?? ""}
                        onChange={(e) => setValues((v) => ({ ...v, [f.id]: e.target.value }))}
                        placeholder={MISSING_VALUE}
                        className="flex-1 rounded-lg border border-slate-200 bg-white px-3 py-2 text-[13px] outline-none focus:border-blue-400"
                      />
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </>
      ) : (
        /* ===== Freeform editor (Supplemental) ===== */
        <>
          <div className="card mb-4 p-4">
            <label className="mb-1.5 block text-[12px] font-semibold text-slate-600">Display title</label>
            <input
              value={content.title ?? ""}
              onChange={(e) => setContent((c) => ({ ...c, title: e.target.value }))}
              placeholder={meta.name}
              className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-[14px] outline-none focus:border-blue-400"
            />
          </div>

          <div className="card mb-4 p-4">
            <h2 className="mb-3 text-[13px] font-bold text-[var(--kennion-navy)]">Key Facts (at a glance)</h2>
            <RowsEditor rows={content.keyFacts} onChange={(keyFacts) => setContent((c) => ({ ...c, keyFacts }))} />
          </div>

          <div className="space-y-4">
            {content.sections.map((section, i) => (
              <div key={i} className="card p-4">
                <div className="mb-3 flex items-center gap-2">
                  <input
                    value={section.heading}
                    onChange={(e) => updateSection(i, { heading: e.target.value })}
                    placeholder="Section heading"
                    className="flex-1 rounded-lg border border-slate-200 bg-white px-3 py-2 text-[14px] font-semibold outline-none focus:border-blue-400"
                  />
                  <button onClick={() => setContent((c) => ({ ...c, sections: move(c.sections, i, i - 1) }))} className="rounded p-1 text-slate-300 hover:text-slate-600"><ChevronUp size={16} /></button>
                  <button onClick={() => setContent((c) => ({ ...c, sections: move(c.sections, i, i + 1) }))} className="rounded p-1 text-slate-300 hover:text-slate-600"><ChevronDown size={16} /></button>
                  <button onClick={() => setContent((c) => ({ ...c, sections: c.sections.filter((_, idx) => idx !== i) }))} className="rounded p-1 text-slate-300 hover:text-red-500"><Trash2 size={15} /></button>
                </div>
                <textarea
                  value={section.body ?? ""}
                  onChange={(e) => updateSection(i, { body: e.target.value })}
                  placeholder="Optional paragraph text..."
                  rows={2}
                  className="mb-3 w-full resize-y rounded-lg border border-slate-200 bg-white px-3 py-2 text-[13px] outline-none focus:border-blue-400"
                />
                <RowsEditor rows={section.rows ?? []} onChange={(rows) => updateSection(i, { rows })} />
              </div>
            ))}
          </div>

          <button
            onClick={() => setContent((c) => ({ ...c, sections: [...c.sections, { heading: "", rows: [] }] }))}
            className="mt-4 flex w-full items-center justify-center gap-1.5 rounded-xl border border-dashed border-slate-300 py-3 text-[13px] font-medium text-slate-500 hover:border-blue-400 hover:text-blue-600"
          >
            <Plus size={15} /> Add section
          </button>
        </>
      )}
    </div>
  );
}
