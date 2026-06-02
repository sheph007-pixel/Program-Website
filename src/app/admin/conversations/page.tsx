"use client";

import { useEffect, useState, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { MessageSquare, Send, Clock, Search, ChevronLeft, ChevronRight } from "lucide-react";
import { useRefreshOnVisible } from "@/lib/useRefreshOnVisible";

type Session = {
  id: string;
  userCode: string | null;
  userName: string | null;
  summary: string | null;
  status: string;
  ticketSent: boolean;
  createdAt: string;
  _count: { messages: number };
};

const statusColors: Record<string, string> = {
  new: "bg-amber-100 text-amber-700",
  reviewed: "bg-blue-100 text-blue-700",
  archived: "bg-slate-100 text-slate-500",
};

const tabs = ["all", "new", "reviewed", "archived"];

export default function ConversationsPage() {
  return (
    <Suspense fallback={<div className="text-center py-12 text-slate-400 text-sm">Loading...</div>}>
      <ConversationsContent />
    </Suspense>
  );
}

function ConversationsContent() {
  const searchParams = useSearchParams();
  const [sessions, setSessions] = useState<Session[]>([]);
  const [totalPages, setTotalPages] = useState(0);
  const [page, setPage] = useState(1);
  const [status, setStatus] = useState(searchParams.get("status") || "all");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchSessions = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({ status, page: String(page) });
      if (search) params.set("search", search);
      const res = await fetch(`/api/admin/sessions?${params}`, { cache: "no-store" });
      const data = await res.json();
      setSessions(data.sessions || []);
      setTotalPages(data.totalPages || 0);
    } catch {
      setSessions([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSessions();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status, page]);

  // Refresh the conversation list when the page is reopened/refocused.
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useRefreshOnVisible(() => fetchSessions());

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setPage(1);
    fetchSessions();
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
    <div>
      <h1 className="text-xl font-bold text-[var(--kennion-navy)] mb-4">Conversations</h1>

      {/* Filters */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between mb-4">
        <div className="flex gap-1">
          {tabs.map((t) => (
            <button
              key={t}
              onClick={() => { setStatus(t); setPage(1); }}
              className={`rounded-lg px-3 py-1.5 text-[13px] font-medium capitalize transition-colors ${
                status === t
                  ? "bg-[var(--kennion-navy)] text-white"
                  : "bg-white text-slate-500 border border-slate-200 hover:border-slate-300"
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        <form onSubmit={handleSearch} className="flex gap-2">
          <div className="relative">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by name or code..."
              className="rounded-lg border border-slate-200 bg-white pl-9 pr-3 py-1.5 text-[13px] outline-none focus:border-blue-400"
            />
          </div>
        </form>
      </div>

      {/* Sessions list */}
      {loading ? (
        <div className="text-center py-12 text-slate-400 text-sm">Loading...</div>
      ) : sessions.length === 0 ? (
        <div className="text-center py-12">
          <MessageSquare size={32} className="mx-auto mb-2 text-slate-300" />
          <p className="text-slate-400 text-sm">No conversations yet</p>
        </div>
      ) : (
        <div className="space-y-2">
          {sessions.map((s) => (
            <Link
              key={s.id}
              href={`/admin/conversations/${s.id}`}
              className="flex items-start gap-4 rounded-xl border border-slate-200 bg-white p-4 transition-all hover:shadow-sm hover:border-slate-300"
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-cyan-400 text-sm font-bold text-white">
                {s.userName ? s.userName.charAt(0).toUpperCase() : "?"}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-0.5">
                  <span className="text-[14px] font-semibold text-[var(--kennion-navy)]">
                    {s.userName || "Anonymous"}
                  </span>
                  {s.userCode && (
                    <span className="text-[10px] font-mono text-slate-400 bg-slate-100 rounded px-1.5 py-0.5">
                      {s.userCode}
                    </span>
                  )}
                  <span className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${statusColors[s.status] || statusColors.new}`}>
                    {s.status}
                  </span>
                  {s.ticketSent && (
                    <span className="flex items-center gap-1 text-[10px] text-emerald-600 font-medium">
                      <Send size={10} /> Ticket
                    </span>
                  )}
                </div>
                <p className="text-[12px] text-slate-500 truncate">
                  {s.summary || "No summary yet"}
                </p>
                <div className="flex items-center gap-3 mt-1 text-[11px] text-slate-400">
                  <span className="flex items-center gap-1">
                    <Clock size={10} /> {timeAgo(s.createdAt)}
                  </span>
                  <span>{s._count.messages} messages</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2 mt-6">
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page <= 1}
            className="rounded-lg border border-slate-200 p-2 text-slate-400 disabled:opacity-30 hover:bg-slate-50"
          >
            <ChevronLeft size={16} />
          </button>
          <span className="text-[13px] text-slate-500">
            Page {page} of {totalPages}
          </span>
          <button
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={page >= totalPages}
            className="rounded-lg border border-slate-200 p-2 text-slate-400 disabled:opacity-30 hover:bg-slate-50"
          >
            <ChevronRight size={16} />
          </button>
        </div>
      )}
    </div>
  );
}
