"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import {
  MessageCircle,
  X,
  Send,
  Loader2,
  CheckCircle,
  User,
  Headphones,
} from "lucide-react";

type Message = {
  role: "user" | "assistant";
  content: string;
};

type TicketInfo = {
  name: string;
  employer: string;
  phone: string;
  email: string;
};

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [showTicketForm, setShowTicketForm] = useState(false);
  const [ticketInfo, setTicketInfo] = useState<TicketInfo>({
    name: "",
    employer: "",
    phone: "",
    email: "",
  });
  const [ticketSent, setTicketSent] = useState(false);
  const [ticketSending, setTicketSending] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, scrollToBottom]);

  useEffect(() => {
    if (open && inputRef.current) {
      inputRef.current.focus();
    }
  }, [open]);

  // Listen for sidebar "Get Help" button
  useEffect(() => {
    const handler = () => setOpen(true);
    window.addEventListener("open-kennion-chat", handler);
    return () => window.removeEventListener("open-kennion-chat", handler);
  }, []);

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
        body: JSON.stringify({ messages: newMessages }),
      });

      if (!res.ok) throw new Error("Chat request failed");

      const reader = res.body?.getReader();
      if (!reader) throw new Error("No reader");

      const decoder = new TextDecoder();
      let assistantText = "";

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
            assistantText += parsed.text;

            // Check for ticket ready signal
            const cleanText = assistantText.replace(/\n?SUPPORT_TICKET_READY\n?/, "");

            setMessages((prev) => {
              const updated = [...prev];
              updated[updated.length - 1] = {
                role: "assistant",
                content: cleanText,
              };
              return updated;
            });
          } catch {
            // skip malformed chunks
          }
        }
      }

      // After streaming complete, check for ticket signal
      if (assistantText.includes("SUPPORT_TICKET_READY")) {
        setShowTicketForm(true);
      }
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            "I'm sorry, I'm having trouble connecting right now. Please call us at (844) 839-6740 for immediate help.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const submitTicket = async () => {
    if (!ticketInfo.name || !ticketInfo.email) return;
    setTicketSending(true);

    // Build issue from conversation
    const issueMessages = messages
      .filter((m) => m.role === "user")
      .map((m) => m.content)
      .join("\n");

    const transcript = messages
      .map((m) => `${m.role === "user" ? "Member" : "Kennion Support"}: ${m.content}`)
      .join("\n\n");

    try {
      const res = await fetch("/api/support-ticket", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...ticketInfo,
          issue: issueMessages,
          chatTranscript: transcript,
        }),
      });

      if (res.ok) {
        setTicketSent(true);
        setShowTicketForm(false);
        setMessages((prev) => [
          ...prev,
          {
            role: "assistant",
            content:
              "Your support request has been submitted. A member of the Kennion team will follow up with you personally. Thank you for reaching out!",
          },
        ]);
      } else {
        throw new Error("Failed");
      }
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            "I had trouble submitting your request. Please try again or call us directly at (844) 839-6740.",
        },
      ]);
    } finally {
      setTicketSending(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const resetChat = () => {
    setMessages([]);
    setShowTicketForm(false);
    setTicketSent(false);
    setTicketInfo({ name: "", employer: "", phone: "", email: "" });
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

      {/* Chat window */}
      {open && (
        <div className="fixed bottom-0 right-0 z-[60] flex h-full w-full flex-col bg-white shadow-2xl sm:bottom-5 sm:right-5 sm:h-[580px] sm:w-[400px] sm:rounded-2xl sm:border sm:border-slate-200 md:bottom-6 md:right-6">
          {/* Header */}
          <div className="flex shrink-0 items-center gap-3 rounded-t-none bg-gradient-to-r from-[#0a1929] to-[#132f4c] px-5 py-4 sm:rounded-t-2xl">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-cyan-400">
              <Headphones size={18} className="text-white" strokeWidth={1.8} />
            </div>
            <div className="flex-1">
              <h3 className="text-[14px] font-semibold text-white">Kennion Support</h3>
              <p className="text-[11px] text-white/60">We're here to help</p>
            </div>
            <button
              onClick={() => setOpen(false)}
              className="rounded-lg p-1.5 text-white/60 transition-colors hover:bg-white/10 hover:text-white"
              aria-label="Close chat"
            >
              <X size={18} />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
            {messages.length === 0 && (
              <div className="flex flex-col items-center justify-center pt-8 text-center">
                <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50">
                  <Headphones size={24} className="text-blue-500" strokeWidth={1.8} />
                </div>
                <h4 className="text-[15px] font-semibold text-[var(--kennion-navy)] mb-1">
                  Welcome to Kennion Support
                </h4>
                <p className="text-[13px] text-slate-400 max-w-[280px] leading-relaxed">
                  Have a question about your benefits? Need help with enrollment, the HealthJoy app,
                  or your Paytient Visa card? We're here for you.
                </p>
                <div className="mt-5 flex flex-wrap justify-center gap-2">
                  {["Help with enrollment", "HealthJoy app", "Paytient Visa", "My benefits"].map(
                    (q) => (
                      <button
                        key={q}
                        onClick={() => {
                          setInput(q);
                          setTimeout(() => inputRef.current?.focus(), 50);
                        }}
                        className="rounded-full border border-slate-200 px-3 py-1.5 text-[12px] font-medium text-slate-500 transition-all hover:border-blue-300 hover:bg-blue-50 hover:text-blue-600"
                      >
                        {q}
                      </button>
                    )
                  )}
                </div>
              </div>
            )}

            {messages.map((msg, i) => (
              <div
                key={i}
                className={`flex gap-2.5 ${msg.role === "user" ? "flex-row-reverse" : "flex-row"}`}
              >
                <div
                  className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full ${
                    msg.role === "user"
                      ? "bg-slate-100"
                      : "bg-gradient-to-br from-blue-500 to-cyan-400"
                  }`}
                >
                  {msg.role === "user" ? (
                    <User size={14} className="text-slate-500" />
                  ) : (
                    <Headphones size={13} className="text-white" />
                  )}
                </div>
                <div
                  className={`max-w-[75%] rounded-2xl px-3.5 py-2.5 text-[13px] leading-relaxed ${
                    msg.role === "user"
                      ? "bg-[var(--kennion-navy)] text-white rounded-tr-md"
                      : "bg-slate-100 text-slate-700 rounded-tl-md"
                  }`}
                >
                  {msg.content}
                </div>
              </div>
            ))}

            {loading && (
              <div className="flex gap-2.5">
                <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-cyan-400">
                  <Headphones size={13} className="text-white" />
                </div>
                <div className="rounded-2xl rounded-tl-md bg-slate-100 px-4 py-3">
                  <div className="flex gap-1">
                    <span className="h-1.5 w-1.5 rounded-full bg-slate-400 animate-bounce" style={{ animationDelay: "0ms" }} />
                    <span className="h-1.5 w-1.5 rounded-full bg-slate-400 animate-bounce" style={{ animationDelay: "150ms" }} />
                    <span className="h-1.5 w-1.5 rounded-full bg-slate-400 animate-bounce" style={{ animationDelay: "300ms" }} />
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Ticket form overlay */}
          {showTicketForm && !ticketSent && (
            <div className="shrink-0 border-t border-slate-200 bg-slate-50 px-4 py-4">
              <div className="mb-3 flex items-center gap-2">
                <CheckCircle size={15} className="text-emerald-500" />
                <p className="text-[12px] font-semibold text-slate-600">
                  Submit your info so our team can follow up
                </p>
              </div>
              <div className="space-y-2">
                <input
                  type="text"
                  placeholder="Full Name *"
                  value={ticketInfo.name}
                  onChange={(e) => setTicketInfo((p) => ({ ...p, name: e.target.value }))}
                  className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-[13px] text-slate-700 outline-none transition-colors focus:border-blue-400 focus:ring-1 focus:ring-blue-400/20"
                />
                <input
                  type="text"
                  placeholder="Employer / Company"
                  value={ticketInfo.employer}
                  onChange={(e) => setTicketInfo((p) => ({ ...p, employer: e.target.value }))}
                  className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-[13px] text-slate-700 outline-none transition-colors focus:border-blue-400 focus:ring-1 focus:ring-blue-400/20"
                />
                <input
                  type="tel"
                  placeholder="Phone Number"
                  value={ticketInfo.phone}
                  onChange={(e) => setTicketInfo((p) => ({ ...p, phone: e.target.value }))}
                  className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-[13px] text-slate-700 outline-none transition-colors focus:border-blue-400 focus:ring-1 focus:ring-blue-400/20"
                />
                <input
                  type="email"
                  placeholder="Work Email *"
                  value={ticketInfo.email}
                  onChange={(e) => setTicketInfo((p) => ({ ...p, email: e.target.value }))}
                  className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-[13px] text-slate-700 outline-none transition-colors focus:border-blue-400 focus:ring-1 focus:ring-blue-400/20"
                />
              </div>
              <div className="mt-3 flex gap-2">
                <button
                  onClick={() => setShowTicketForm(false)}
                  className="flex-1 rounded-lg border border-slate-200 bg-white py-2 text-[13px] font-medium text-slate-500 transition-colors hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  onClick={submitTicket}
                  disabled={!ticketInfo.name || !ticketInfo.email || ticketSending}
                  className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-blue-600 to-cyan-500 py-2 text-[13px] font-semibold text-white transition-all hover:shadow-md disabled:opacity-50 disabled:hover:shadow-none"
                >
                  {ticketSending ? (
                    <Loader2 size={14} className="animate-spin" />
                  ) : (
                    "Submit Request"
                  )}
                </button>
              </div>
            </div>
          )}

          {/* Input area */}
          <div className="shrink-0 border-t border-slate-200 bg-white p-3 sm:rounded-b-2xl">
            <div className="flex items-end gap-2">
              <textarea
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Type your message..."
                rows={1}
                className="flex-1 resize-none rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-[13px] text-slate-700 outline-none transition-colors placeholder:text-slate-400 focus:border-blue-400 focus:bg-white focus:ring-1 focus:ring-blue-400/20"
                style={{ maxHeight: 100 }}
              />
              <button
                onClick={sendMessage}
                disabled={!input.trim() || loading}
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-cyan-500 text-white transition-all hover:shadow-md disabled:opacity-40 disabled:hover:shadow-none"
                aria-label="Send message"
              >
                {loading ? (
                  <Loader2 size={16} className="animate-spin" />
                ) : (
                  <Send size={16} strokeWidth={1.8} />
                )}
              </button>
            </div>
            <div className="mt-2 flex items-center justify-between">
              <button
                onClick={() => setShowTicketForm(true)}
                className="text-[11px] font-medium text-blue-500 transition-colors hover:text-blue-600"
              >
                Submit a support request
              </button>
              {messages.length > 0 && (
                <button
                  onClick={resetChat}
                  className="text-[11px] font-medium text-slate-400 transition-colors hover:text-slate-500"
                >
                  New conversation
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
