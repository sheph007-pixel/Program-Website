"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import {
  MessageCircle,
  X,
  Send,
  Loader2,
  Headphones,
  CheckCircle,
  ArrowUp,
  ArrowLeft,
  Paperclip,
  TicketPlus,
} from "lucide-react";
import { useUserName } from "./NameContext";

/** Render markdown links [text](url) as clickable <a> tags */
function renderMessageContent(content: string, isUser: boolean) {
  const parts = content.split(/(\[[^\]]+\]\([^)]+\))/g);
  return parts.map((part, i) => {
    const linkMatch = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
    if (linkMatch) {
      const [, text, url] = linkMatch;
      const isTel = url.startsWith("tel:");
      return (
        <a
          key={i}
          href={url}
          target={isTel ? undefined : "_blank"}
          rel={isTel ? undefined : "noopener noreferrer"}
          className={`underline font-medium transition-colors ${
            isUser
              ? "text-white/90 hover:text-white"
              : "text-blue-600 hover:text-blue-700"
          }`}
        >
          {text}
        </a>
      );
    }
    return <span key={i}>{part}</span>;
  });
}

type Message = {
  role: "user" | "assistant";
  content: string;
};

type ChatView = "chat" | "form" | "success";

export default function ChatWidget() {
  const { name: userName, userCode } = useUserName();
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [view, setView] = useState<ChatView>("chat");
  const [summaryReady, setSummaryReady] = useState(false);
  const [ticketSending, setTicketSending] = useState(false);
  const [sessionId, setSessionId] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  // Form state
  const [formName, setFormName] = useState("");
  const [formEmail, setFormEmail] = useState("");
  const [formPhone, setFormPhone] = useState("");
  const [formDetails, setFormDetails] = useState("");
  const [formFile, setFormFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Pre-fill name when form opens
  useEffect(() => {
    if (view === "form") {
      if (userName && !formName) setFormName(userName);
    }
  }, [view, userName, formName]);

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, summaryReady, scrollToBottom]);

  useEffect(() => {
    if (open && inputRef.current && view === "chat") {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [open, view]);

  useEffect(() => {
    const handler = () => setOpen(true);
    window.addEventListener("open-kennion-chat", handler);
    return () => window.removeEventListener("open-kennion-chat", handler);
  }, []);

  // Lock body scroll on mobile when chat is open
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

  // Auto-greeting on first open
  useEffect(() => {
    if (open && messages.length === 0 && !loading) {
      sendGreeting();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  const finalizeSession = (sid?: string | null) => {
    const id = sid || sessionId;
    if (!id || messages.length < 2) return;
    fetch("/api/chat/finalize", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ sessionId: id }),
    }).catch(() => {});
  };

  const sendGreeting = async () => {
    setLoading(true);
    const greeting = userName
      ? `Hi, my name is ${userName}. I need some help.`
      : "Hi, I need some help.";
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [{ role: "user", content: greeting }],
          userName: userName || undefined,
          userCode: userCode || undefined,
        }),
      });
      if (!res.ok) throw new Error();
      await streamResponse(res);
    } catch {
      setMessages([
        {
          role: "assistant",
          content: userName
            ? `Hey ${userName}! Thanks for reaching out. I can help with most benefits questions right here. If you need personal follow-up from the Kennion team, you can submit a ticket anytime. What can I help you with?`
            : "Hey there! Thanks for reaching out. I can help with most benefits questions right here. If you need personal follow-up from the Kennion team, you can submit a ticket anytime. What can I help you with?",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const streamResponse = async (res: Response) => {
    const reader = res.body?.getReader();
    if (!reader) return;

    const decoder = new TextDecoder();
    let fullText = "";

    setMessages((prev) => [...prev, { role: "assistant", content: "" }]);

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      const chunk = decoder.decode(value);
      const lines = chunk.split("\n").filter((l) => l.startsWith("data: "));

      for (const line of lines) {
        const data = line.replace("data: ", "");
        if (data === "[DONE]") continue;

        try {
          const parsed = JSON.parse(data);

          if (parsed.sessionId && !parsed.text) {
            setSessionId(parsed.sessionId);
            continue;
          }

          if (parsed.text) {
            fullText += parsed.text;
            const cleanText = fullText.replace(/\n?SUMMARY_READY\n?/g, "").trim();

            setMessages((prev) => {
              const updated = [...prev];
              updated[updated.length - 1] = { role: "assistant", content: cleanText };
              return updated;
            });
          }
        } catch {
          // skip
        }
      }
    }

    if (fullText.includes("SUMMARY_READY")) {
      setSummaryReady(true);
    }

    return fullText;
  };

  const handleSubmitForm = async () => {
    if (!formName.trim() || !formEmail.trim()) return;

    setTicketSending(true);

    const allText = messages
      .map((m) => `${m.role === "user" ? "Member" : "Kennion"}: ${m.content}`)
      .join("\n\n");
    const userMessages = messages
      .filter((m) => m.role === "user")
      .map((m) => m.content)
      .join("\n");

    const formData = new FormData();
    formData.append("name", formName.trim());
    formData.append("email", formEmail.trim());
    formData.append("phone", formPhone.trim() || "Not provided");
    formData.append("employer", "See transcript");
    formData.append("issue", formDetails.trim() || userMessages);
    formData.append("chatTranscript", allText);
    if (sessionId) formData.append("sessionId", sessionId);
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
      finalizeSession();
    }
  };

  const sendMessage = async () => {
    const text = input.trim();
    if (!text || loading) return;

    const userMsg: Message = { role: "user", content: text };
    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: newMessages,
          sessionId: sessionId || undefined,
          userName: userName || undefined,
          userCode: userCode || undefined,
        }),
      });
      if (!res.ok) throw new Error();
      await streamResponse(res);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            "Sorry, I'm having a little trouble right now. You can call the Enrollment Help Line at (833) 614-1622 and they'll help you right away!",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const handleClose = () => {
    setOpen(false);
    if (messages.length >= 2) {
      finalizeSession();
    }
  };

  const resetChat = () => {
    finalizeSession();
    setMessages([]);
    setSummaryReady(false);
    setView("chat");
    setSessionId(null);
    setFormName(userName || "");
    setFormEmail("");
    setFormPhone("");
    setFormDetails("");
    setFormFile(null);
  };

  const openForm = () => {
    setSummaryReady(false);
    setView("form");
  };

  return (
    <>
      {/* Floating button - desktop only */}
      {!open && (
        <button
          onClick={() => setOpen(true)}
          className="fixed bottom-6 right-6 z-[60] hidden md:flex items-center gap-2.5 rounded-full bg-gradient-to-br from-blue-600 to-cyan-500 pl-4 pr-5 py-3 text-white shadow-lg shadow-blue-500/30 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-blue-500/40"
          aria-label="Get Help"
        >
          <MessageCircle size={20} strokeWidth={1.8} />
          <span className="text-[13px] font-semibold">Get Help</span>
        </button>
      )}

      {/* Chat window */}
      {open && (
        <div
          ref={chatContainerRef}
          className="fixed inset-0 z-[70] flex flex-col bg-white sm:inset-auto sm:bottom-5 sm:right-5 sm:h-[600px] sm:w-[400px] sm:rounded-2xl sm:border sm:border-slate-200 sm:shadow-2xl md:bottom-6 md:right-6"
        >
          {/* ===== HEADER ===== */}
          <div className="flex shrink-0 items-center gap-3 border-b border-slate-200 bg-white/80 backdrop-blur-xl px-4 py-3 sm:bg-gradient-to-r sm:from-[#0a1929] sm:to-[#132f4c] sm:border-0 sm:rounded-t-2xl sm:py-4 sm:px-5">
            {view === "form" ? (
              <>
                <button
                  onClick={() => setView("chat")}
                  className="rounded-full p-1 text-slate-500 transition-colors hover:bg-slate-200/50 sm:text-white/80 sm:hover:bg-white/20"
                >
                  <ArrowLeft size={20} strokeWidth={2} />
                </button>
                <div className="flex-1 text-center sm:text-left">
                  <h3 className="text-[15px] font-semibold text-slate-900 sm:text-white sm:text-[14px]">
                    Submit a Ticket
                  </h3>
                  <p className="text-[11px] text-slate-400 sm:text-white/50">
                    We&apos;ll follow up personally
                  </p>
                </div>
              </>
            ) : (
              <>
                <div className="relative">
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-cyan-400">
                    <Headphones size={18} className="text-white" strokeWidth={1.8} />
                  </div>
                  <div className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-white sm:border-[#0a1929] bg-emerald-400" />
                </div>
                <div className="flex-1 text-center sm:text-left">
                  <h3 className="text-[15px] font-semibold text-slate-900 sm:text-white sm:text-[14px]">
                    Kennion Support
                  </h3>
                  <p className="text-[11px] text-emerald-500 sm:text-emerald-400/90">
                    Online now
                  </p>
                </div>
                {/* Submit a Ticket header button */}
                <button
                  onClick={openForm}
                  className="flex items-center gap-1.5 rounded-full bg-emerald-500/15 px-3 py-1.5 text-emerald-600 transition-colors hover:bg-emerald-500/25 sm:bg-white/10 sm:text-white/90 sm:hover:bg-white/20"
                >
                  <TicketPlus size={14} strokeWidth={2} />
                  <span className="text-[11px] font-semibold hidden sm:inline">Ticket</span>
                </button>
              </>
            )}
            <button
              onClick={handleClose}
              className="rounded-full bg-slate-200/80 p-1.5 text-slate-500 transition-colors hover:bg-slate-300 sm:rounded-xl sm:bg-transparent sm:p-2 sm:text-white/80 sm:hover:bg-white/20"
              aria-label="Close chat"
            >
              <X size={18} strokeWidth={2.5} className="sm:hidden" />
              <X size={22} strokeWidth={2.5} className="hidden sm:block" />
            </button>
          </div>

          {/* ===== CHAT VIEW ===== */}
          {view === "chat" && (
            <>
              <div className="flex-1 overflow-y-auto px-3 py-4 sm:px-4 bg-white sm:bg-slate-50/50">
                {messages.map((msg, i) => (
                  <div
                    key={i}
                    className={`flex mb-1.5 ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-[82%] sm:max-w-[78%] rounded-[20px] px-4 py-2.5 text-[15px] sm:text-[13px] leading-relaxed whitespace-pre-line ${
                        msg.role === "user"
                          ? "bg-blue-500 text-white rounded-br-md"
                          : "bg-[#e9e9eb] text-black rounded-bl-md sm:bg-white sm:text-slate-700 sm:shadow-sm sm:border sm:border-slate-100"
                      }`}
                    >
                      {renderMessageContent(msg.content, msg.role === "user")}
                    </div>
                  </div>
                ))}

                {/* Typing indicator */}
                {loading && messages.length > 0 && (
                  <div className="flex mb-1.5 justify-start">
                    <div className="rounded-[20px] rounded-bl-md bg-[#e9e9eb] sm:bg-white px-4 py-3 sm:shadow-sm sm:border sm:border-slate-100">
                      <div className="flex gap-1.5">
                        <span className="h-2 w-2 rounded-full bg-slate-400/60 animate-bounce" style={{ animationDelay: "0ms" }} />
                        <span className="h-2 w-2 rounded-full bg-slate-400/60 animate-bounce" style={{ animationDelay: "150ms" }} />
                        <span className="h-2 w-2 rounded-full bg-slate-400/60 animate-bounce" style={{ animationDelay: "300ms" }} />
                      </div>
                    </div>
                  </div>
                )}

                {/* Initial loading */}
                {loading && messages.length === 0 && (
                  <div className="flex items-center justify-center py-12">
                    <Loader2 size={24} className="animate-spin text-slate-300" />
                  </div>
                )}

                {/* SUMMARY_READY action card */}
                {summaryReady && (
                  <div className="mt-3 mb-2 rounded-2xl border border-emerald-200 bg-emerald-50/60 p-4 text-center">
                    <p className="text-[14px] sm:text-[13px] font-semibold text-[#0a1929] mb-1">
                      Ready to submit a support request?
                    </p>
                    <p className="text-[12px] text-slate-500 mb-3">
                      A team member will follow up with you personally.
                    </p>
                    <button
                      onClick={openForm}
                      className="w-full flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 py-3 text-[14px] sm:text-[13px] font-bold text-white shadow-md shadow-emerald-500/20 transition-all active:scale-[0.98]"
                    >
                      <TicketPlus size={16} strokeWidth={2} />
                      Submit a Ticket
                    </button>
                    <button
                      onClick={() => setSummaryReady(false)}
                      className="mt-2 text-[12px] text-slate-400 hover:text-slate-500"
                    >
                      Keep chatting
                    </button>
                  </div>
                )}

                <div ref={messagesEndRef} />
              </div>

              {/* Input area */}
              <div className="shrink-0 border-t border-slate-200 bg-white px-4 pt-3 pb-8 sm:pb-5 sm:rounded-b-2xl">
                <div className="flex items-end gap-2">
                  <textarea
                    ref={inputRef}
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Message..."
                    rows={1}
                    className="flex-1 resize-none rounded-full border border-slate-300 bg-white px-4 py-2.5 text-[16px] sm:text-[13px] text-slate-700 outline-none transition-colors placeholder:text-slate-400 focus:border-blue-400 sm:rounded-xl sm:bg-slate-50 sm:focus:bg-white sm:focus:ring-1 sm:focus:ring-blue-400/20"
                    style={{ maxHeight: 100, fontSize: "16px" }}
                  />
                  <button
                    onClick={sendMessage}
                    disabled={!input.trim() || loading}
                    className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-blue-500 text-white transition-all active:scale-95 disabled:opacity-30 sm:h-10 sm:w-10 sm:rounded-xl sm:bg-gradient-to-br sm:from-blue-600 sm:to-cyan-500"
                    aria-label="Send message"
                  >
                    {loading ? (
                      <Loader2 size={16} className="animate-spin" />
                    ) : (
                      <>
                        <ArrowUp size={18} strokeWidth={2.5} className="sm:hidden" />
                        <Send size={16} strokeWidth={1.8} className="hidden sm:block" />
                      </>
                    )}
                  </button>
                </div>
                <div className="mt-2 flex items-center justify-between">
                  <button
                    onClick={openForm}
                    className="text-[12px] sm:text-[11px] font-medium text-blue-500 transition-colors hover:text-blue-600"
                  >
                    Need personal help? Submit a ticket
                  </button>
                  {messages.length > 2 && (
                    <button
                      onClick={resetChat}
                      className="text-[12px] sm:text-[11px] font-medium text-slate-400 transition-colors hover:text-slate-500"
                    >
                      Start over
                    </button>
                  )}
                </div>
              </div>
            </>
          )}

          {/* ===== FORM VIEW ===== */}
          {view === "form" && (
            <div className="flex-1 overflow-y-auto bg-white sm:bg-slate-50/50">
              <div className="px-4 py-5 sm:px-5">
                <p className="text-[13px] sm:text-[12px] text-slate-500 mb-5">
                  Fill in your details below and a member of the Kennion team will follow up with you directly.
                  {messages.length > 1 && " Your chat transcript will be included automatically."}
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
                  onClick={resetChat}
                  className="rounded-2xl sm:rounded-xl border border-slate-200 px-6 py-3 sm:py-2.5 text-[14px] sm:text-[13px] font-medium text-slate-500 transition-all active:scale-[0.98]"
                >
                  Start a New Conversation
                </button>
              </div>
            </>
          )}
        </div>
      )}
    </>
  );
}
