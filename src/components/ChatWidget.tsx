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

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [ticketReady, setTicketReady] = useState(false);
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
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [open]);

  // Listen for sidebar "Get Help" button
  useEffect(() => {
    const handler = () => setOpen(true);
    window.addEventListener("open-kennion-chat", handler);
    return () => window.removeEventListener("open-kennion-chat", handler);
  }, []);

  // Send initial greeting when chat opens for the first time
  useEffect(() => {
    if (open && messages.length === 0 && !loading) {
      sendGreeting();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  const sendGreeting = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: [{ role: "user", content: "Hi, I need some help." }] }),
      });

      if (!res.ok) throw new Error();
      await streamResponse(res);
    } catch {
      setMessages([
        {
          role: "assistant",
          content: "Hey there! Welcome to Kennion Support. How can we help you today?",
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
          fullText += parsed.text;

          const cleanText = fullText.replace(/\n?TICKET_READY\n?/g, "").trim();

          setMessages((prev) => {
            const updated = [...prev];
            updated[updated.length - 1] = { role: "assistant", content: cleanText };
            return updated;
          });
        } catch {
          // skip malformed
        }
      }
    }

    if (fullText.includes("TICKET_READY")) {
      setTicketReady(true);
    }

    return fullText;
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
        body: JSON.stringify({ messages: newMessages }),
      });

      if (!res.ok) throw new Error();
      await streamResponse(res);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            "Sorry, I'm having a little trouble right now. You can call us directly at (844) 839-6740 and we'll help you right away!",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const submitTicket = async () => {
    if (ticketSending) return;
    setTicketSending(true);

    // Extract info from conversation
    const allText = messages.map((m) => `${m.role === "user" ? "Member" : "Kennion"}: ${m.content}`).join("\n\n");
    const userMessages = messages.filter((m) => m.role === "user").map((m) => m.content).join("\n");

    // Try to extract name/employer/phone/email from conversation
    const extractField = (patterns: RegExp[]) => {
      for (const msg of messages.filter((m) => m.role === "user")) {
        for (const p of patterns) {
          const match = msg.content.match(p);
          if (match) return match[1] || match[0];
        }
      }
      return "";
    };

    const emailMatch = extractField([/[\w.-]+@[\w.-]+\.\w+/]);
    const phoneMatch = extractField([/\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}/]);

    try {
      const res = await fetch("/api/support-ticket", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: "See chat transcript",
          employer: "See chat transcript",
          phone: phoneMatch || "See chat transcript",
          email: emailMatch || "See chat transcript",
          issue: userMessages,
          chatTranscript: allText,
        }),
      });

      if (res.ok) {
        setTicketSent(true);
        setMessages((prev) => [
          ...prev,
          {
            role: "assistant",
            content:
              "All set! Your request has been submitted. A member of the Kennion team will be reaching out to you personally. Thank you for chatting with us!",
          },
        ]);
      } else {
        throw new Error();
      }
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            "I had a little trouble submitting that. No worries though, you can call us at (844) 839-6740 and we'll get you taken care of!",
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
    setTicketReady(false);
    setTicketSent(false);
  };

  return (
    <>
      {/* Floating button */}
      {!open && (
        <button
          onClick={() => setOpen(true)}
          className="fixed bottom-5 right-5 z-[60] flex items-center gap-2.5 rounded-full bg-gradient-to-br from-blue-600 to-cyan-500 pl-4 pr-5 py-3 text-white shadow-lg shadow-blue-500/30 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-blue-500/40 md:bottom-6 md:right-6"
          aria-label="Get Help"
        >
          <MessageCircle size={20} strokeWidth={1.8} />
          <span className="text-[13px] font-semibold">Need Help?</span>
        </button>
      )}

      {/* Chat window */}
      {open && (
        <div className="fixed bottom-0 right-0 z-[60] flex h-full w-full flex-col bg-white shadow-2xl sm:bottom-5 sm:right-5 sm:h-[580px] sm:w-[400px] sm:rounded-2xl sm:border sm:border-slate-200 md:bottom-6 md:right-6">
          {/* Header */}
          <div className="flex shrink-0 items-center gap-3 bg-gradient-to-r from-[#0a1929] to-[#132f4c] px-5 py-4 sm:rounded-t-2xl">
            <div className="relative">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-cyan-400">
                <Headphones size={18} className="text-white" strokeWidth={1.8} />
              </div>
              <div className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-[#0a1929] bg-emerald-400" />
            </div>
            <div className="flex-1">
              <h3 className="text-[14px] font-semibold text-white">Kennion Support</h3>
              <p className="text-[11px] text-emerald-400/90">Online now</p>
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
          <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3 bg-slate-50/50">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`flex gap-2.5 ${msg.role === "user" ? "flex-row-reverse" : "flex-row"}`}
              >
                <div
                  className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full ${
                    msg.role === "user"
                      ? "bg-slate-200"
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
                  className={`max-w-[78%] rounded-2xl px-3.5 py-2.5 text-[13px] leading-relaxed ${
                    msg.role === "user"
                      ? "bg-[var(--kennion-navy)] text-white rounded-tr-md"
                      : "bg-white text-slate-700 rounded-tl-md shadow-sm border border-slate-100"
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
                <div className="rounded-2xl rounded-tl-md bg-white px-4 py-3 shadow-sm border border-slate-100">
                  <div className="flex gap-1">
                    <span className="h-1.5 w-1.5 rounded-full bg-slate-300 animate-bounce" style={{ animationDelay: "0ms" }} />
                    <span className="h-1.5 w-1.5 rounded-full bg-slate-300 animate-bounce" style={{ animationDelay: "150ms" }} />
                    <span className="h-1.5 w-1.5 rounded-full bg-slate-300 animate-bounce" style={{ animationDelay: "300ms" }} />
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Ticket ready banner */}
          {ticketReady && !ticketSent && (
            <div className="shrink-0 border-t border-slate-200 bg-emerald-50 px-4 py-3 flex items-center gap-3">
              <CheckCircle size={18} className="shrink-0 text-emerald-500" />
              <p className="flex-1 text-[12px] text-emerald-700 font-medium">
                Ready to submit your request?
              </p>
              <button
                onClick={submitTicket}
                disabled={ticketSending}
                className="flex items-center gap-1.5 rounded-lg bg-emerald-500 px-3.5 py-1.5 text-[12px] font-semibold text-white transition-all hover:bg-emerald-600 disabled:opacity-50"
              >
                {ticketSending ? (
                  <Loader2 size={13} className="animate-spin" />
                ) : (
                  <>
                    <Send size={12} />
                    Submit
                  </>
                )}
              </button>
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
                placeholder={ticketSent ? "Chat ended. Thank you!" : "Type your message..."}
                disabled={ticketSent}
                rows={1}
                className="flex-1 resize-none rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-[13px] text-slate-700 outline-none transition-colors placeholder:text-slate-400 focus:border-blue-400 focus:bg-white focus:ring-1 focus:ring-blue-400/20 disabled:opacity-50"
                style={{ maxHeight: 80 }}
              />
              <button
                onClick={sendMessage}
                disabled={!input.trim() || loading || ticketSent}
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-cyan-500 text-white transition-all hover:shadow-md disabled:opacity-30 disabled:hover:shadow-none"
                aria-label="Send message"
              >
                {loading ? (
                  <Loader2 size={16} className="animate-spin" />
                ) : (
                  <Send size={16} strokeWidth={1.8} />
                )}
              </button>
            </div>
            {messages.length > 2 && !ticketSent && (
              <div className="mt-2 flex justify-end">
                <button
                  onClick={resetChat}
                  className="text-[11px] font-medium text-slate-400 transition-colors hover:text-slate-500"
                >
                  Start over
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
