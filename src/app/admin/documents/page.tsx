"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import {
  FileText,
  Upload,
  CheckCircle,
  AlertCircle,
  ExternalLink,
  X,
  Loader2,
  Trash2,
  Link,
} from "lucide-react";

type Plan = {
  id: string;
  name: string;
  category: string;
  summaryUrl: string;
  pdfName: string | null;
  isActive: boolean;
};

type UploadProgress = {
  total: number;
  completed: number;
  results: { fileName: string; matched: boolean; planName?: string }[];
  active: boolean;
};

const categoryOrder = ["Health Plans", "Dental Plans", "Vision Plans", "Supplemental"];

export default function DocumentsPage() {
  const [plans, setPlans] = useState<Plan[]>([]);
  const [loading, setLoading] = useState(true);
  const [seeding, setSeeding] = useState(false);
  const [uploadProgress, setUploadProgress] = useState<UploadProgress | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [uploadingPlanId, setUploadingPlanId] = useState<string | null>(null);
  const [removingPlanId, setRemovingPlanId] = useState<string | null>(null);
  const bulkInputRef = useRef<HTMLInputElement>(null);
  const singleInputRef = useRef<HTMLInputElement>(null);
  const targetPlanIdRef = useRef<string | null>(null);

  const seedPlans = useCallback(async () => {
    setSeeding(true);
    try {
      const res = await fetch("/api/admin/plans/seed", { method: "POST" });
      const data = await res.json();
      if (data.error) {
        setError(data.error);
      }
    } catch {
      setError("Failed to seed plans");
    } finally {
      setSeeding(false);
    }
  }, []);

  const fetchPlans = useCallback(async () => {
    try {
      const res = await fetch("/api/admin/plans");
      const data = await res.json();
      const fetched = data.plans || [];
      if (fetched.length === 0) {
        // Auto-seed if database has no plans
        await seedPlans();
        const res2 = await fetch("/api/admin/plans");
        const data2 = await res2.json();
        setPlans(data2.plans || []);
      } else {
        setPlans(fetched);
      }
    } catch {
      setPlans([]);
    } finally {
      setLoading(false);
    }
  }, [seedPlans]);

  useEffect(() => {
    fetchPlans();
  }, [fetchPlans]);

  // Bulk upload — upload all files, auto-match to plans
  const handleBulkUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setError(null);
    setUploadProgress({ total: files.length, completed: 0, results: [], active: true });

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
        setError(data.error || `Upload failed (${res.status})`);
        setUploadProgress(null);
        return;
      }
      const results = data.results || [];
      setUploadProgress({
        total: files.length,
        completed: files.length,
        results,
        active: false,
      });
      fetchPlans();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload failed");
      setUploadProgress(null);
    } finally {
      if (bulkInputRef.current) bulkInputRef.current.value = "";
    }
  };

  // Single plan upload — attach PDF to a specific plan
  const handleSingleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    const planId = targetPlanIdRef.current;
    if (!file || !planId) return;

    setUploadingPlanId(planId);
    setError(null);

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch(`/api/admin/plans/${planId}/pdf`, {
        method: "PUT",
        body: formData,
      });
      if (!res.ok) {
        const data = await res.json();
        setError(data.error || "Upload failed");
        return;
      }
      fetchPlans();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload failed");
    } finally {
      setUploadingPlanId(null);
      targetPlanIdRef.current = null;
      if (singleInputRef.current) singleInputRef.current.value = "";
    }
  };

  // Remove PDF from a plan (reverts to external link)
  const handleRemovePdf = async (planId: string) => {
    setRemovingPlanId(planId);
    try {
      const res = await fetch(`/api/admin/plans/${planId}/pdf`, {
        method: "DELETE",
      });
      if (!res.ok) {
        const data = await res.json();
        setError(data.error || "Failed to remove PDF");
        return;
      }
      fetchPlans();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to remove");
    } finally {
      setRemovingPlanId(null);
    }
  };

  const triggerSingleUpload = (planId: string) => {
    targetPlanIdRef.current = planId;
    singleInputRef.current?.click();
  };

  const grouped = categoryOrder.map((cat) => ({
    category: cat,
    plans: plans.filter((p) => p.category === cat),
  }));

  const totalPlans = plans.length;
  const pdfCount = plans.filter((p) => p.pdfName).length;
  const linkCount = totalPlans - pdfCount;

  if (loading || seeding) {
    return (
      <div className="flex items-center justify-center py-20 gap-3 text-slate-400">
        <Loader2 size={20} className="animate-spin" />
        <span className="text-sm">{seeding ? "Loading plans..." : "Loading..."}</span>
      </div>
    );
  }

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-bold text-[var(--kennion-navy)]">Documents</h1>
          <p className="text-[12px] text-slate-400">
            {totalPlans} plans &middot;{" "}
            <span className="text-emerald-500">{pdfCount} PDF{pdfCount !== 1 ? "s" : ""}</span>
            {" "}&middot;{" "}
            <span className="text-blue-500">{linkCount} external link{linkCount !== 1 ? "s" : ""}</span>
          </p>
        </div>
        <div className="flex items-center gap-3">
          <input
            ref={bulkInputRef}
            type="file"
            multiple
            accept=".pdf"
            onChange={handleBulkUpload}
            className="hidden"
          />
          <input
            ref={singleInputRef}
            type="file"
            accept=".pdf"
            onChange={handleSingleUpload}
            className="hidden"
          />
          <button
            onClick={() => bulkInputRef.current?.click()}
            disabled={!!uploadProgress?.active}
            className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 px-4 py-2.5 text-[13px] font-semibold text-white shadow-md shadow-blue-500/20 transition-all hover:shadow-lg disabled:opacity-50"
          >
            <Upload size={16} />
            {uploadProgress?.active ? "Uploading..." : "Bulk Upload PDFs"}
          </button>
        </div>
      </div>

      {/* Error */}
      {error && (
        <div className="mb-5 rounded-xl border border-red-200 bg-red-50 p-4 flex items-start gap-3">
          <AlertCircle size={16} className="text-red-500 shrink-0 mt-0.5" />
          <div className="flex-1">
            <p className="text-[13px] text-red-700 font-medium">{error}</p>
          </div>
          <button onClick={() => setError(null)} className="text-red-400 hover:text-red-600">
            <X size={14} />
          </button>
        </div>
      )}

      {/* Bulk upload progress/results */}
      {uploadProgress && (
        <div className="mb-6 rounded-xl border border-slate-200 bg-white p-5">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-[14px] font-semibold text-[var(--kennion-navy)]">
              {uploadProgress.active ? "Uploading & Matching..." : "Upload Complete"}
            </h3>
            {!uploadProgress.active && (
              <button
                onClick={() => setUploadProgress(null)}
                className="text-slate-400 hover:text-slate-600"
              >
                <X size={14} />
              </button>
            )}
          </div>

          {uploadProgress.active && (
            <div className="mb-4">
              <div className="h-2 rounded-full bg-slate-100 overflow-hidden">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-blue-500 to-cyan-400 transition-all duration-500 animate-pulse"
                  style={{ width: "100%" }}
                />
              </div>
              <p className="text-[12px] text-slate-400 mt-1.5">
                Processing {uploadProgress.total} file{uploadProgress.total !== 1 ? "s" : ""}...
              </p>
            </div>
          )}

          {!uploadProgress.active && uploadProgress.results.length > 0 && (
            <div className="space-y-1.5">
              {uploadProgress.results.map((r, i) => (
                <div key={i} className="flex items-center gap-2 text-[13px]">
                  {r.matched ? (
                    <CheckCircle size={14} className="text-emerald-500 shrink-0" />
                  ) : (
                    <AlertCircle size={14} className="text-amber-500 shrink-0" />
                  )}
                  <span className="truncate text-slate-600">{r.fileName}</span>
                  <span className="text-[11px] shrink-0">
                    {r.matched ? (
                      <span className="text-emerald-600">&rarr; {r.planName}</span>
                    ) : (
                      <span className="text-amber-600">No match</span>
                    )}
                  </span>
                </div>
              ))}
              <p className="text-[12px] text-slate-400 pt-2">
                {uploadProgress.results.filter((r) => r.matched).length} of{" "}
                {uploadProgress.results.length} files matched
              </p>
            </div>
          )}
        </div>
      )}

      {/* Plan grid by category */}
      <div className="space-y-8">
        {grouped.map(({ category, plans: catPlans }) => {
          const catPdfCount = catPlans.filter((p) => p.pdfName).length;
          return (
            <div key={category}>
              <div className="flex items-center gap-3 mb-3">
                <h2 className="text-[14px] font-semibold text-[var(--kennion-navy)]">
                  {category}
                </h2>
                <span className="text-[12px] text-slate-400">
                  {catPdfCount}/{catPlans.length} with PDFs
                </span>
              </div>

              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {catPlans.map((plan) => {
                  const hasPdf = !!plan.pdfName;
                  const isUploading = uploadingPlanId === plan.id;
                  const isRemoving = removingPlanId === plan.id;
                  const hasLink = !hasPdf && plan.summaryUrl && plan.summaryUrl.startsWith("http");

                  return (
                    <div
                      key={plan.id}
                      className={`group relative rounded-xl border bg-white p-4 transition-all ${
                        hasPdf
                          ? "border-emerald-200 hover:border-emerald-300 hover:shadow-md"
                          : "border-slate-200 hover:border-blue-300 hover:shadow-md"
                      }`}
                    >
                      {/* Source badge */}
                      <div className="absolute top-3 right-3">
                        {hasPdf ? (
                          <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-medium text-emerald-700">
                            <FileText size={10} /> PDF
                          </span>
                        ) : hasLink ? (
                          <span className="inline-flex items-center gap-1 rounded-full bg-blue-50 px-2 py-0.5 text-[10px] font-medium text-blue-700">
                            <Link size={10} /> Link
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-medium text-slate-500">
                            None
                          </span>
                        )}
                      </div>

                      {/* Plan info */}
                      <div className="flex items-start gap-3 mb-3 pr-14">
                        <div
                          className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${
                            hasPdf ? "bg-emerald-50" : "bg-slate-50"
                          }`}
                        >
                          {isUploading || isRemoving ? (
                            <Loader2 size={18} className="text-blue-500 animate-spin" />
                          ) : (
                            <FileText
                              size={18}
                              className={hasPdf ? "text-emerald-600" : "text-slate-400"}
                              strokeWidth={1.8}
                            />
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="text-[13px] font-semibold text-[var(--kennion-navy)] leading-tight">
                            {plan.name}
                          </h3>
                          {hasPdf ? (
                            <p className="text-[11px] text-emerald-600 truncate mt-0.5">
                              {plan.pdfName}
                            </p>
                          ) : hasLink ? (
                            <p className="text-[11px] text-blue-500 truncate mt-0.5">
                              External link
                            </p>
                          ) : (
                            <p className="text-[11px] text-slate-400 mt-0.5">No source</p>
                          )}
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => triggerSingleUpload(plan.id)}
                          disabled={isUploading || isRemoving}
                          className={`flex-1 flex items-center justify-center gap-1.5 rounded-lg py-2 text-[12px] font-medium transition-all disabled:opacity-50 ${
                            hasPdf
                              ? "bg-slate-50 text-slate-600 hover:bg-slate-100"
                              : "bg-blue-50 text-blue-600 hover:bg-blue-100"
                          }`}
                        >
                          <Upload size={13} />
                          {hasPdf ? "Replace PDF" : "Upload PDF"}
                        </button>

                        {(hasPdf || hasLink) && (
                          <a
                            href={plan.summaryUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-center rounded-lg bg-slate-50 px-3 py-2 text-slate-500 hover:bg-slate-100 hover:text-blue-600 transition-colors"
                            title="View"
                          >
                            <ExternalLink size={13} />
                          </a>
                        )}

                        {hasPdf && (
                          <button
                            onClick={() => handleRemovePdf(plan.id)}
                            disabled={isRemoving}
                            className="flex items-center justify-center rounded-lg bg-slate-50 px-3 py-2 text-slate-400 hover:bg-red-50 hover:text-red-500 transition-colors disabled:opacity-50"
                            title="Remove PDF (revert to link)"
                          >
                            <Trash2 size={13} />
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
