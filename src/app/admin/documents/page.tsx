"use client";

import { useEffect, useState, useRef } from "react";
import { FileText, Upload, CheckCircle, AlertCircle, ExternalLink } from "lucide-react";

type Plan = {
  id: string;
  name: string;
  category: string;
  summaryUrl: string;
  pdfName: string | null;
  isActive: boolean;
};

type UploadResult = { fileName: string; matched: boolean; planName?: string };
type UploadError = string | null;

const categoryOrder = ["Health Plans", "Dental Plans", "Vision Plans", "Supplemental"];

export default function DocumentsPage() {
  const [plans, setPlans] = useState<Plan[]>([]);
  const [uploading, setUploading] = useState(false);
  const [results, setResults] = useState<UploadResult[] | null>(null);
  const [uploadError, setUploadError] = useState<UploadError>(null);
  const [loading, setLoading] = useState(true);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const fetchPlans = async () => {
    try {
      const res = await fetch("/api/admin/plans");
      const data = await res.json();
      setPlans(data.plans || []);
    } catch {
      setPlans([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPlans();
  }, []);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setUploading(true);
    setResults(null);
    setUploadError(null);

    const formData = new FormData();
    for (let i = 0; i < files.length; i++) {
      formData.append("files", files[i]);
    }

    try {
      const res = await fetch("/api/admin/plans", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      if (!res.ok) {
        setUploadError(data.error || `Upload failed (${res.status})`);
        return;
      }
      setResults(data.results || []);
      fetchPlans();
    } catch (err) {
      setUploadError(err instanceof Error ? err.message : "Upload failed. Check your connection.");
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  const grouped = categoryOrder.map((cat) => ({
    category: cat,
    plans: plans.filter((p) => p.category === cat),
  }));

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-bold text-[var(--kennion-navy)]">Documents</h1>
          <p className="text-[12px] text-slate-400">
            Upload plan PDFs to host them directly. Files are matched to plans by name.
          </p>
        </div>
        <div>
          <input
            ref={fileInputRef}
            type="file"
            multiple
            accept=".pdf"
            onChange={handleUpload}
            className="hidden"
          />
          <button
            onClick={() => fileInputRef.current?.click()}
            disabled={uploading}
            className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 px-4 py-2.5 text-[13px] font-semibold text-white shadow-md shadow-blue-500/20 transition-all hover:shadow-lg disabled:opacity-50"
          >
            <Upload size={16} />
            {uploading ? "Uploading..." : "Upload PDFs"}
          </button>
        </div>
      </div>

      {/* Upload error */}
      {uploadError && (
        <div className="mb-6 rounded-xl border border-red-200 bg-red-50 p-4">
          <div className="flex items-center gap-2 text-[13px] font-semibold text-red-700 mb-1">
            <AlertCircle size={14} /> Upload Error
          </div>
          <p className="text-[13px] text-red-600">{uploadError}</p>
          <button
            onClick={() => setUploadError(null)}
            className="mt-2 text-[12px] text-red-400 hover:text-red-500"
          >
            Dismiss
          </button>
        </div>
      )}

      {/* Upload results */}
      {results && (
        <div className="mb-6 rounded-xl border border-slate-200 bg-white p-4">
          <h3 className="text-[13px] font-semibold text-[var(--kennion-navy)] mb-2">Upload Results</h3>
          <div className="space-y-1.5">
            {results.map((r, i) => (
              <div key={i} className="flex items-center gap-2 text-[13px]">
                {r.matched ? (
                  <CheckCircle size={14} className="text-emerald-500" />
                ) : (
                  <AlertCircle size={14} className="text-amber-500" />
                )}
                <span className={r.matched ? "text-slate-700" : "text-slate-500"}>
                  {r.fileName}
                </span>
                {r.matched ? (
                  <span className="text-[11px] text-emerald-600">
                    Matched to "{r.planName}"
                  </span>
                ) : (
                  <span className="text-[11px] text-amber-600">No match found</span>
                )}
              </div>
            ))}
          </div>
          <button
            onClick={() => setResults(null)}
            className="mt-3 text-[12px] text-slate-400 hover:text-slate-500"
          >
            Dismiss
          </button>
        </div>
      )}

      {/* Plans by category */}
      {loading ? (
        <div className="text-center py-12 text-slate-400 text-sm">Loading...</div>
      ) : (
        <div className="space-y-6">
          {grouped.map(({ category, plans: catPlans }) => (
            <div key={category}>
              <h2 className="text-[14px] font-semibold text-[var(--kennion-navy)] mb-2">
                {category}
                <span className="ml-2 text-[12px] text-slate-400 font-normal">
                  ({catPlans.length})
                </span>
              </h2>
              <div className="grid gap-2 sm:grid-cols-2">
                {catPlans.map((plan) => (
                  <div
                    key={plan.id}
                    className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white p-3.5"
                  >
                    <div className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${
                      plan.pdfName ? "bg-emerald-50" : "bg-slate-100"
                    }`}>
                      <FileText
                        size={16}
                        className={plan.pdfName ? "text-emerald-600" : "text-slate-400"}
                        strokeWidth={1.8}
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-[13px] font-semibold text-[var(--kennion-navy)] truncate">
                        {plan.name}
                      </h3>
                      <p className="text-[11px] text-slate-400 truncate">
                        {plan.pdfName ? (
                          <span className="text-emerald-600">{plan.pdfName}</span>
                        ) : (
                          <span>External link</span>
                        )}
                      </p>
                    </div>
                    <a
                      href={plan.summaryUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="shrink-0 text-slate-400 hover:text-blue-500 transition-colors"
                    >
                      <ExternalLink size={14} />
                    </a>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
