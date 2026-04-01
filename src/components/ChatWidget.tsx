"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import {
  MessageCircle,
  X,
  Send,
  Loader2,
  Headphones,
  CheckCircle,
  ThumbsUp,
  AlertCircle,
  Clock,
  Plus,
  ChevronLeft,
  ArrowUp,
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

type PastSession = {
  id: string;
  summary: string | null;
  ticketSent: boolean;
  createdAt: string;
  _count: { messages: number };
};

export default function ChatWidget() {
  const { name: userName, userCode } = useUserName();
  const [open, setOpen] = useState(false);
  const [view, setView] = useState<"history" | "chat">("history");
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [summaryReady, setSummaryReady] = useState(false);
  const [ticketSent, setTicketSent] = useState(false);
  const [ticketSending, setTicketSending] = useState(false);
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [pastSessions, setPastSessions] = useState<PastSession[]>([]);
  const [historyLoading, setHistoryLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, summaryReady, ticketSent, scrollToBottom]);

  useEffect(() => {
    if (open && view === "chat" && inputRef.current && !summaryReady && !ticketSent) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [open, view, summaryReady, ticketSent]);

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

  // Handle mobile keyboard: resize chat area using visualViewport
  useEffect(() => {
    if (!open) return;
    const vv = window.visualViewport;
    if (!vv) return;

    const onResize = () => {
      const container = chatContainerRef.current;
      if (!container) return;
      // On mobile, when keyboard opens, visualViewport.height shrinks
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

  // Load history when chat opens
  useEffect(() => {
    if (open && (userCode || userName)) {
      loadHistory();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, userCode, userName]);

  // If chat is already active (has messages), show chat view when reopened
  useEffect(() => {
    if (open && messages.length > 0) {
      setView("chat");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  const loadHistory = async () => {
    if (!userCode && !userName) return;
    setHistoryLoading(true);
    try {
      const params = new URLSearchParams();
      if (userCode) params.set("userCode", userCode);
      if (userName) params.set("userName", userName);
      const res = await fetch(`/api/chat/history?${params}`);
      const data = await res.json();
      setPastSessions(data.sessions || []);
    } catch {
      setPastSessions([]);
    } finally {
      setHistoryLoading(false);
    }
  };

  const loadSession = async (id: string) => {
    setLoading(true);
    setView("chat");
    try {
      const res = await fetch(`/api/chat/history/${id}`);
      const data = await res.json();
      if (data.messages) {
        setMessages(data.messages);
        setSessionId(data.sessionId);
        setTicketSent(data.ticketSent || false);
        setSummaryReady(false);
      }
    } catch {
      setMessages([
        { role: "assistant", content: "Sorry, I couldn't load that conversation. Let's start fresh!" },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const startNewChat = () => {
    setMessages([]);
    setSessionId(null);
    setSummaryReady(false);
    setTicketSent(false);
    setView("chat");
  };

  // Auto-greeting when entering chat view with no messages
  useEffect(() => {
    if (open && view === "chat" && messages.length === 0 && !loading) {
      sendGreeting();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [view]);

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
            ? `Hey ${userName}! Thanks for reaching out. I'm with the Kennion team. What can we help you with today?`
            : "Hey there! Thanks for reaching out. I'm with the Kennion team. What can we help you with today?",
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

  const handleConfirm = async () => {
    setSummaryReady(false);
    setTicketSending(true);

    const allText = messages
      .map((m) => `${m.role === "user" ? "Member" : "Kennion"}: ${m.content}`)
      .join("\n\n");
    const userMessages = messages
      .filter((m) => m.role === "user")
      .map((m) => m.content)
      .join("\n");

    const extract = (patterns: RegExp[]) => {
      for (const msg of [...messages].reverse().filter((m) => m.role === "user")) {
        for (const p of patterns) {
          const match = msg.content.match(p);
          if (match) return match[1] || match[0];
        }
      }
      return "";
    };

    const emailMatch = extract([/[\w.-]+@[\w.-]+\.\w+/]);
    const phoneMatch = extract([/\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}/]);

    try {
      await fetch("/api/support-ticket", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: userName || "See transcript",
          employer: "See transcript",
          phone: phoneMatch || "See transcript",
          email: emailMatch || "See transcript",
          issue: userMessages,
          chatTranscript: allText,
          sessionId: sessionId || undefined,
        }),
      });
    } catch {
      // silent
    } finally {
      setTicketSending(false);
      setTicketSent(true);
      finalizeSession();
    }
  };

  const handleDeny = async () => {
    setSummaryReady(false);
    const fixMsg: Message = { role: "user", content: "Something's not right. Let me correct it." };
    const newMessages = [...messages, fixMsg];
    setMessages(newMessages);
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
          content: "No problem! What needs to be changed?",
        },
      ]);
    } finally {
      setLoading(false);
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

  const handleBackToHistory = () => {
    if (messages.length >= 2) {
      finalizeSession();
    }
    setMessages([]);
    setSessionId(null);
    setSummaryReady(false);
    setTicketSent(false);
    setView("history");
    loadHistory();
  };

  const timeAgo = (dateStr: string) => {
    const diff = Date.now() - new Date(dateStr).getTime();
    const mins = Math.floor(diff / 60000);
    if (mins < 60) return `${mins}m ago`;
    const hours = Math.floor(mins / 60);
    if (hours < 24) return `${hours}h ago`;
    const days = Math.floor(hours / 24);
    return `${days}d ago`;
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
          {/* Header - iMessage style */}
          <div className="flex shrink-0 items-center gap-3 border-b border-slate-200 bg-white/80 backdrop-blur-xl px-4 py-3 sm:bg-gradient-to-r sm:from-[#0a1929] sm:to-[#132f4c] sm:border-0 sm:rounded-t-2xl sm:py-4 sm:px-5">
            {/* Back / close button */}
            {view === "chat" && pastSessions.length > 0 ? (
              <button
                onClick={handleBackToHistory}
                className="rounded-lg p-1 text-blue-500 sm:text-white/60 transition-colors hover:bg-slate-100 sm:hover:bg-white/10"
                aria-label="Back to chats"
              >
                <ChevronLeft size={24} strokeWidth={2} />
              </button>
            ) : (
              <div className="relative sm:block">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-cyan-400">
                  <Headphones size={18} className="text-white" strokeWidth={1.8} />
                </div>
                <div className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-white sm:border-[#0a1929] bg-emerald-400" />
              </div>
            )}
            <div className="flex-1 text-center sm:text-left">
              <h3 className="text-[15px] font-semibold text-slate-900 sm:text-white sm:text-[14px]">
                {view === "history" ? (userName || "Your Chats") : "Kennion Support"}
              </h3>
              <p className="text-[11px] text-slate-400 sm:text-white/50 font-mono">
                {view === "history" ? userCode : "Online now"}
              </p>
            </div>
            <button
              onClick={handleClose}
              className="rounded-full bg-slate-200/80 p-1.5 text-slate-500 transition-colors hover:bg-slate-300 sm:rounded-xl sm:bg-transparent sm:p-2 sm:text-white/80 sm:hover:bg-white/20"
              aria-label="Close chat"
            >
              <X size={18} strokeWidth={2.5} className="sm:hidden" />
              <X size={22} strokeWidth={2.5} className="hidden sm:block" />
            </button>
          </div>

          {/* History view */}
          {view === "history" && (
            <div className="flex-1 overflow-y-auto bg-white sm:bg-slate-50/50">
              {/* New chat button */}
              <div className="p-3 border-b border-slate-100">
                <button
                  onClick={startNewChat}
                  className="flex w-full items-center gap-3 rounded-2xl bg-gradient-to-r from-blue-600 to-cyan-500 px-4 py-3.5 text-white shadow-md shadow-blue-500/20 transition-all hover:shadow-lg active:scale-[0.98]"
                >
                  <Plus size={20} strokeWidth={2.2} />
                  <span className="text-[15px] font-semibold">New Conversation</span>
                </button>
              </div>

              {historyLoading ? (
                <div className="text-center py-12 text-slate-400 text-sm">Loading...</div>
              ) : pastSessions.length === 0 ? (
                <div className="text-center py-16 px-6">
                  <div className="mx-auto mb-3 flex h-16 w-16 items-center justify-center rounded-full bg-slate-100">
                    <MessageCircle size={28} className="text-slate-300" />
                  </div>
                  <p className="text-slate-500 text-[15px] font-medium">No past conversations</p>
                  <p className="text-slate-400 text-[13px] mt-1">Tap above to start chatting</p>
                </div>
              ) : (
                <div className="divide-y divide-slate-100">
                  {pastSessions.map((s) => (
                    <button
                      key={s.id}
                      onClick={() => loadSession(s.id)}
                      className="flex w-full items-center gap-3 px-4 py-3.5 text-left transition-colors hover:bg-slate-50 active:bg-slate-100"
                    >
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-cyan-400">
                        <Headphones size={18} className="text-white" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-2">
                          <p className="text-[14px] text-slate-900 font-medium truncate">
                            Kennion Support
                          </p>
                          <span className="text-[11px] text-slate-400 shrink-0">
                            {timeAgo(s.createdAt)}
                          </span>
                        </div>
                        <p className="text-[13px] text-slate-500 truncate mt-0.5">
                          {s.summary || "Chat conversation"}
                        </p>
                        {s.ticketSent && (
                          <span className="inline-block mt-1 text-[10px] text-emerald-600 font-semibold bg-emerald-50 rounded-full px-2 py-0.5">
                            Ticket sent
                          </span>
                        )}
                      </div>
                      <ChevronLeft size={16} className="shrink-0 text-slate-300 rotate-180" />
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Chat view */}
          {view === "chat" && (
            <>
              {/* Messages - iMessage style */}
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

                {loading && messages.length === 0 && (
                  <div className="flex items-center justify-center py-12">
                    <Loader2 size={24} className="animate-spin text-slate-300" />
                  </div>
                )}

                {/* Confirm / Deny buttons */}
                {summaryReady && !ticketSent && !ticketSending && (
                  <div className="flex flex-col gap-2.5 pt-3 pb-1 px-1">
                    <button
                      onClick={handleConfirm}
                      className="flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 py-3.5 text-[15px] sm:text-[14px] font-semibold text-white shadow-md shadow-emerald-500/20 transition-all active:scale-[0.98]"
                    >
                      <ThumbsUp size={18} strokeWidth={2} />
                      Looks Good, Send It!
                    </button>
                    <button
                      onClick={handleDeny}
                      className="flex items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-white py-3 text-[14px] sm:text-[13px] font-medium text-slate-500 transition-all active:scale-[0.98]"
                    >
                      <AlertCircle size={16} strokeWidth={2} />
                      Something's Not Right
                    </button>
                  </div>
                )}

                {/* Sending indicator */}
                {ticketSending && (
                  <div className="flex items-center justify-center gap-2 py-4">
                    <Loader2 size={18} className="animate-spin text-blue-500" />
                    <span className="text-[14px] sm:text-[13px] text-slate-500 font-medium">Sending to the Kennion team...</span>
                  </div>
                )}

                {/* Success state */}
                {ticketSent && (
                  <div className="flex flex-col items-center text-center py-6">
                    <div className="mb-3 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-50">
                      <CheckCircle size={32} className="text-emerald-500" strokeWidth={1.5} />
                    </div>
                    <h4 className="text-[17px] sm:text-[15px] font-bold text-slate-900 sm:text-[var(--kennion-navy)] mb-1">
                      Request Sent!
                    </h4>
                    <p className="text-[14px] sm:text-[13px] text-slate-500 max-w-[280px] leading-relaxed">
                      A member of the Kennion team will reach out to you personally. Available Monday through Friday, 8 AM to 5 PM.
                    </p>
                  </div>
                )}

                <div ref={messagesEndRef} />
              </div>

              {/* Input area - iMessage style */}
              {!summaryReady && !ticketSent && (
                <div className="shrink-0 border-t border-slate-200 bg-white px-3 py-2 sm:p-3 sm:rounded-b-2xl safe-area-bottom">
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
                </div>
              )}

              {/* Post-submission footer */}
              {ticketSent && (
                <div className="shrink-0 border-t border-slate-200 bg-white p-4 sm:rounded-b-2xl text-center safe-area-bottom">
                  <button
                    onClick={handleBackToHistory}
                    className="rounded-2xl sm:rounded-xl border border-slate-200 px-6 py-3 sm:py-2.5 text-[14px] sm:text-[13px] font-medium text-slate-500 transition-all active:scale-[0.98]"
                  >
                    Back to Chats
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      )}
    </>
  );
}
