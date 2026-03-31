"use client";

import { useState, useEffect } from "react";
import {
  MessageCircle,
  X,
  Send,
  Loader2,
  CheckCircle,
  Headphones,
} from "lucide-react";

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({
    name: "",
    employer: "",
    phone: "",
    email: "",
    message: "",
  });
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  // Listen for sidebar "Get Help" button
  useEffect(() => {
    const handler = () => setOpen(true);
    window.addEventListener("open-kennion-chat", handler);
    return () => window.removeEventListener("open-kennion-chat", handler);
  }, []);

  const canSubmit = form.name.trim() && form.email.trim() && form.message.trim();

  const submitRequest = async () => {
    if (!canSubmit || sending) return;
    setSending(true);

    try {
      const res = await fetch("/api/support-ticket", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          employer: form.employer,
          phone: form.phone,
          email: form.email,
          issue: form.message,
        }),
      });

      if (res.ok) {
        setSent(true);
      }
    } catch {
      // silently fail, user can try again
    } finally {
      setSending(false);
    }
  };

  const reset = () => {
    setForm({ name: "", employer: "", phone: "", email: "", message: "" });
    setSent(false);
  };

  return (
    <>
      {/* Floating button */}
      {!open && (
        <button
          onClick={() => setOpen(true)}
          className="fixed bottom-5 right-5 z-[60] flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-blue-600 to-cyan-500 text-white shadow-lg shadow-blue-500/30 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-blue-500/40 md:bottom-6 md:right-6"
          aria-label="Get Help"
        >
          <MessageCircle size={24} strokeWidth={1.8} />
        </button>
      )}

      {/* Help panel */}
      {open && (
        <div className="fixed bottom-0 right-0 z-[60] flex h-full w-full flex-col bg-white shadow-2xl sm:bottom-5 sm:right-5 sm:h-auto sm:max-h-[600px] sm:w-[400px] sm:rounded-2xl sm:border sm:border-slate-200 md:bottom-6 md:right-6">
          {/* Header */}
          <div className="flex shrink-0 items-center gap-3 rounded-t-none bg-gradient-to-r from-[#0a1929] to-[#132f4c] px-5 py-4 sm:rounded-t-2xl">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-cyan-400">
              <Headphones size={18} className="text-white" strokeWidth={1.8} />
            </div>
            <div className="flex-1">
              <h3 className="text-[14px] font-semibold text-white">Get Help</h3>
              <p className="text-[11px] text-white/60">A real person from our team will contact you</p>
            </div>
            <button
              onClick={() => setOpen(false)}
              className="rounded-lg p-1.5 text-white/60 transition-colors hover:bg-white/10 hover:text-white"
              aria-label="Close"
            >
              <X size={18} />
            </button>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto px-5 py-5">
            {sent ? (
              /* Success state */
              <div className="flex flex-col items-center justify-center py-8 text-center">
                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-50">
                  <CheckCircle size={32} className="text-emerald-500" strokeWidth={1.5} />
                </div>
                <h4 className="text-[17px] font-bold text-[var(--kennion-navy)] mb-2">
                  Request Received
                </h4>
                <p className="text-[14px] text-slate-500 max-w-[280px] leading-relaxed mb-6">
                  A member of the Kennion team will contact you directly to help. Thank you for reaching out.
                </p>
                <button
                  onClick={reset}
                  className="rounded-xl border border-slate-200 px-5 py-2.5 text-[13px] font-semibold text-slate-500 transition-all hover:bg-slate-50"
                >
                  Submit Another Request
                </button>
              </div>
            ) : (
              /* Form */
              <>
                <div className="mb-5">
                  <p className="text-[14px] text-slate-600 leading-relaxed">
                    Not sure who to contact? Feeling stuck? Let us know what you need and a member of our team will reach out to you directly.
                  </p>
                </div>

                <div className="space-y-3">
                  <div>
                    <label className="mb-1 block text-[12px] font-semibold text-slate-500">
                      Full Name <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="text"
                      value={form.name}
                      onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
                      placeholder="John Smith"
                      className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-[13px] text-slate-700 outline-none transition-colors placeholder:text-slate-400 focus:border-blue-400 focus:bg-white focus:ring-1 focus:ring-blue-400/20"
                    />
                  </div>

                  <div>
                    <label className="mb-1 block text-[12px] font-semibold text-slate-500">
                      Employer / Company
                    </label>
                    <input
                      type="text"
                      value={form.employer}
                      onChange={(e) => setForm((p) => ({ ...p, employer: e.target.value }))}
                      placeholder="Company name"
                      className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-[13px] text-slate-700 outline-none transition-colors placeholder:text-slate-400 focus:border-blue-400 focus:bg-white focus:ring-1 focus:ring-blue-400/20"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="mb-1 block text-[12px] font-semibold text-slate-500">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        value={form.phone}
                        onChange={(e) => setForm((p) => ({ ...p, phone: e.target.value }))}
                        placeholder="(555) 123-4567"
                        className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-[13px] text-slate-700 outline-none transition-colors placeholder:text-slate-400 focus:border-blue-400 focus:bg-white focus:ring-1 focus:ring-blue-400/20"
                      />
                    </div>
                    <div>
                      <label className="mb-1 block text-[12px] font-semibold text-slate-500">
                        Work Email <span className="text-red-400">*</span>
                      </label>
                      <input
                        type="email"
                        value={form.email}
                        onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))}
                        placeholder="you@company.com"
                        className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-[13px] text-slate-700 outline-none transition-colors placeholder:text-slate-400 focus:border-blue-400 focus:bg-white focus:ring-1 focus:ring-blue-400/20"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="mb-1 block text-[12px] font-semibold text-slate-500">
                      How can we help? <span className="text-red-400">*</span>
                    </label>
                    <textarea
                      value={form.message}
                      onChange={(e) => setForm((p) => ({ ...p, message: e.target.value }))}
                      placeholder="Tell us what you need help with and we will have someone reach out to you..."
                      rows={3}
                      className="w-full resize-none rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-[13px] text-slate-700 outline-none transition-colors placeholder:text-slate-400 focus:border-blue-400 focus:bg-white focus:ring-1 focus:ring-blue-400/20"
                    />
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Footer / submit */}
          {!sent && (
            <div className="shrink-0 border-t border-slate-100 bg-white px-5 py-4 sm:rounded-b-2xl">
              <button
                onClick={submitRequest}
                disabled={!canSubmit || sending}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 py-3 text-[14px] font-semibold text-white shadow-md shadow-blue-500/20 transition-all hover:shadow-lg hover:shadow-blue-500/30 disabled:opacity-40 disabled:hover:shadow-md active:scale-[0.98]"
              >
                {sending ? (
                  <Loader2 size={16} className="animate-spin" />
                ) : (
                  <>
                    <Send size={16} strokeWidth={1.8} />
                    Send Request
                  </>
                )}
              </button>
              <p className="mt-2.5 text-center text-[11px] text-slate-400">
                A member of the Kennion team will contact you directly
              </p>
            </div>
          )}
        </div>
      )}
    </>
  );
}
