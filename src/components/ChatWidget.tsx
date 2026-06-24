"use client";

import { useState, useRef, useEffect } from "react";
import {
  MessageCircle,
  X,
  Send,
  Loader2,
  Headphones,
  CheckCircle,
  Paperclip,
  Phone,
} from "lucide-react";
import { useUserName } from "./NameContext";

type ChatView = "form" | "success";

const contacts = [
  {
    label: "HealthJoy Concierge",
    sub: "Care and plan questions, 24/7",
    tel: "8775003212",
    display: "(877) 500-3212",
  },
  {
    label: "Enrollment Help Line",
    sub: "Sign up or enrollment questions",
    tel: "8336141622",
    display: "(833) 614-1622",
  },
  {
    label: "Paytient Card Support",
    sub: "Help with your Paytient Visa",
    tel: "8663459591",
    display: "(866) 345-9591",
  },
];

export default function ChatWidget() {
  const { name: userName } = useUserName();
  const [open, setOpen] = useState(false);
  const [view, setView] = useState<ChatView>("form");
  const [ticketSending, setTicketSending] = useState(false);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  // Form state
  const [formName, setFormName] = useState("");
  const [formEmail, setFormEmail] = useState("");
  const [formPhone, setFormPhone] = useState("");
  const [formDetails, setFormDetails] = useState("");
  const [formFile, setFormFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Pre-fill name when the widget opens
  useEffect(() => {
    if (open && userName && !formName) setFormName(userName);
  }, [open, userName, formName]);

  useEffect(() => {
    const handler = () => setOpen(true);
    window.addEventListener("open-kennion-chat", handler);
    return () => window.removeEventListener("open-kennion-chat", handler);
  }, []);

  // Lock body scroll on mobile when open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  // Handle mobile keyboard
  useEffect(() => {
    if (!open) return;
    const vv = window.visualViewport;
    if (!vv) return;

    const onResize = () => {
      const container = chatContainerRef.current;
      if (!container) return;
      const isMobile = window.innerWidth < 640;
      if (isMobile) {
        container.style.height = `${vv.height}px`;
        container.style.top = `${vv.offsetTop}px`;
      }
    };

    vv.addEventListener("resize", onResize);
    vv.addEventListener("scroll", onResize);
    onResize();

    return () => {
      vv.removeEventListener("resize", onResize);
      vv.removeEventListener("scroll", onResize);
    };
  }, [open]);

  const handleSubmitForm = async () => {
    if (!formName.trim() || !formEmail.trim()) return;

    setTicketSending(true);

    const formData = new FormData();
    formData.append("name", formName.trim());
    formData.append("email", formEmail.trim());
    formData.append("phone", formPhone.trim() || "Not provided");
    formData.append("issue", formDetails.trim());
    if (formFile) formData.append("attachment", formFile);

    try {
      await fetch("/api/support-ticket", {
        method: "POST",
        body: formData,
      });
    } catch {
      // silent
    } finally {
      setTicketSending(false);
      setView("success");
    }
  };

  const handleClose = () => setOpen(false);

  const resetForm = () => {
    setView("form");
    setFormName(userName || "");
    setFormEmail("");
    setFormPhone("");
    setFormDetails("");
    setFormFile(null);
  };

  return (
    <>
      {/* Floating button - desktop only */}
      {!open && (
        <button
          onClick={() => setOpen(true)}
          className="no-print fixed bottom-6 right-6 z-[60] hidden md:flex items-center gap-2.5 rounded-full bg-gradient-to-br from-blue-600 to-cyan-500 pl-4 pr-5 py-3 text-white shadow-lg shadow-blue-500/30 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-blue-500/40"
          aria-label="Get Help"
        >
          <MessageCircle size={20} strokeWidth={1.8} />
          <span className="text-[13px] font-semibold">Get Help</span>
        </button>
      )}

      {/* Window */}
      {open && (
        <div
          ref={chatContainerRef}
          className="fixed inset-0 z-[70] flex flex-col bg-white sm:inset-auto sm:bottom-5 sm:right-5 sm:h-[600px] sm:w-[400px] sm:rounded-2xl sm:border sm:border-slate-200 sm:shadow-2xl md:bottom-6 md:right-6"
        >
          {/* ===== HEADER ===== */}
          <div className="flex shrink-0 items-center gap-3 border-b border-slate-200 bg-white/80 backdrop-blur-xl px-4 py-3 sm:bg-gradient-to-r sm:from-[#0a1929] sm:to-[#132f4c] sm:border-0 sm:rounded-t-2xl sm:py-4 sm:px-5">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-cyan-400">
              <Headphones size={18} className="text-white" strokeWidth={1.8} />
            </div>
            <div className="flex-1 text-center sm:text-left">
              <h3 className="text-[15px] font-semibold text-slate-900 sm:text-white sm:text-[14px]">
                Kennion Support
              </h3>
              <p className="text-[11px] text-slate-400 sm:text-white/50">
                We&apos;re here to help
              </p>
            </div>
            <button
              onClick={handleClose}
              className="rounded-full bg-slate-200/80 p-1.5 text-slate-500 transition-colors hover:bg-slate-300 sm:rounded-xl sm:bg-transparent sm:p-2 sm:text-white/80 sm:hover:bg-white/20"
              aria-label="Close"
            >
              <X size={18} strokeWidth={2.5} className="sm:hidden" />
              <X size={22} strokeWidth={2.5} className="hidden sm:block" />
            </button>
          </div>

          {/* ===== FORM VIEW ===== */}
          {view === "form" && (
            <div className="flex-1 overflow-y-auto bg-white sm:bg-slate-50/50">
              <div className="px-4 py-5 sm:px-5">
                {/* Contacts */}
                <p className="text-[12px] font-semibold uppercase tracking-[0.06em] text-slate-400 mb-2">
                  Need help now? Call the right line
                </p>
                <div className="space-y-2 mb-5">
                  {contacts.map((c) => (
                    <a
                      key={c.tel}
                      href={`tel:${c.tel}`}
                      className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 transition-colors hover:border-blue-400"
                    >
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-blue-50">
                        <Phone size={15} className="text-blue-600" strokeWidth={2} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-[13px] font-semibold text-[var(--kennion-navy)] leading-tight">
                          {c.label}
                        </p>
                        <p className="text-[11px] text-slate-400">{c.sub}</p>
                      </div>
                      <span className="text-[13px] font-semibold text-blue-600">
                        {c.display}
                      </span>
                    </a>
                  ))}
                </div>

                <div className="relative mb-5 flex items-center gap-3">
                  <div className="h-px flex-1 bg-slate-200" />
                  <span className="text-[11px] font-medium uppercase tracking-[0.08em] text-slate-400">
                    Or submit a ticket
                  </span>
                  <div className="h-px flex-1 bg-slate-200" />
                </div>

                <p className="text-[13px] sm:text-[12px] text-slate-500 mb-5">
                  Fill in your details and a member of the Kennion team will
                  follow up with you directly.
                </p>

                <div className="space-y-4">
                  {/* Name */}
                  <div>
                    <label className="block text-[12px] font-semibold text-slate-600 mb-1.5">
                      Name <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="text"
                      value={formName}
                      onChange={(e) => setFormName(e.target.value)}
                      placeholder="Your full name"
                      className="w-full rounded-xl border border-slate-300 bg-white px-3.5 py-3 text-[14px] text-slate-700 outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-400/20"
                      style={{ fontSize: "16px" }}
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-[12px] font-semibold text-slate-600 mb-1.5">
                      Email <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="email"
                      value={formEmail}
                      onChange={(e) => setFormEmail(e.target.value)}
                      placeholder="your@email.com"
                      className="w-full rounded-xl border border-slate-300 bg-white px-3.5 py-3 text-[14px] text-slate-700 outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-400/20"
                      style={{ fontSize: "16px" }}
                    />
                  </div>

                  {/* Phone */}
                  <div>
                    <label className="block text-[12px] font-semibold text-slate-600 mb-1.5">
                      Phone
                    </label>
                    <input
                      type="tel"
                      value={formPhone}
                      onChange={(e) => setFormPhone(e.target.value)}
                      placeholder="(555) 123-4567"
                      className="w-full rounded-xl border border-slate-300 bg-white px-3.5 py-3 text-[14px] text-slate-700 outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-400/20"
                      style={{ fontSize: "16px" }}
                    />
                  </div>

                  {/* Details */}
                  <div>
                    <label className="block text-[12px] font-semibold text-slate-600 mb-1.5">
                      What do you need help with?
                    </label>
                    <textarea
                      value={formDetails}
                      onChange={(e) => setFormDetails(e.target.value)}
                      placeholder="Describe your issue or question..."
                      rows={4}
                      className="w-full resize-none rounded-xl border border-slate-300 bg-white px-3.5 py-3 text-[14px] text-slate-700 outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-400/20"
                      style={{ fontSize: "16px" }}
                    />
                  </div>

                  {/* Attachment */}
                  <div>
                    <label className="block text-[12px] font-semibold text-slate-600 mb-1.5">
                      Attachment
                    </label>
                    <input
                      ref={fileInputRef}
                      type="file"
                      onChange={(e) => setFormFile(e.target.files?.[0] || null)}
                      className="hidden"
                      accept=".pdf,.png,.jpg,.jpeg,.doc,.docx"
                    />
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="flex items-center gap-2 rounded-xl border border-dashed border-slate-300 bg-white px-3.5 py-3 text-[13px] text-slate-500 transition-colors hover:border-blue-400 hover:text-blue-600 w-full"
                    >
                      <Paperclip size={14} />
                      {formFile ? (
                        <span className="truncate text-blue-600 font-medium">{formFile.name}</span>
                      ) : (
                        "Attach a file (optional)"
                      )}
                    </button>
                    {formFile && (
                      <button
                        onClick={() => { setFormFile(null); if (fileInputRef.current) fileInputRef.current.value = ""; }}
                        className="mt-1 text-[11px] text-red-400 hover:text-red-500"
                      >
                        Remove file
                      </button>
                    )}
                  </div>
                </div>

                {/* Submit button */}
                <button
                  onClick={handleSubmitForm}
                  disabled={!formName.trim() || !formEmail.trim() || ticketSending}
                  className="mt-6 flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 py-4 text-[16px] sm:text-[14px] font-bold text-white shadow-lg shadow-emerald-500/20 transition-all active:scale-[0.98] disabled:opacity-50"
                >
                  {ticketSending ? (
                    <>
                      <Loader2 size={18} className="animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send size={18} strokeWidth={2} />
                      Submit Ticket
                    </>
                  )}
                </button>
              </div>
            </div>
          )}

          {/* ===== SUCCESS VIEW ===== */}
          {view === "success" && (
            <>
              <div className="flex-1 flex flex-col items-center justify-center px-6 bg-white sm:bg-slate-50/50">
                <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-emerald-50">
                  <CheckCircle size={40} className="text-emerald-500" strokeWidth={1.5} />
                </div>
                <h4 className="text-[20px] sm:text-[17px] font-bold text-[#0a1929] mb-2">
                  Request Submitted!
                </h4>
                <p className="text-[15px] sm:text-[13px] text-slate-500 text-center max-w-[300px] leading-relaxed">
                  A member of the Kennion team will reach out to you personally. We&apos;re available Monday through Friday, 8 AM to 5 PM.
                </p>
              </div>
              <div className="shrink-0 border-t border-slate-200 bg-white p-4 pb-8 sm:pb-5 sm:rounded-b-2xl text-center">
                <button
                  onClick={resetForm}
                  className="rounded-2xl sm:rounded-xl border border-slate-200 px-6 py-3 sm:py-2.5 text-[14px] sm:text-[13px] font-medium text-slate-500 transition-all active:scale-[0.98]"
                >
                  Submit Another Request
                </button>
              </div>
            </>
          )}
        </div>
      )}
    </>
  );
}
