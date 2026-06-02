"use client";

import { useCallback, useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { useRefreshOnVisible } from "@/lib/useRefreshOnVisible";
import {
  ArrowLeft,
  User,
  Headphones,
  Mail,
  Phone,
  Building2,
  Hash,
  Sparkles,
  Trash2,
  CheckCircle,
  Archive,
} from "lucide-react";

type Message = { id: string; role: string; content: string; createdAt: string };
type Session = {
  id: string;
  userCode: string | null;
  userName: string | null;
  userEmail: string | null;
  userPhone: string | null;
  employer: string | null;
  summary: string | null;
  status: string;
  ticketSent: boolean;
  createdAt: string;
  messages: Message[];
};

export default function ConversationDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchSession = useCallback(() => {
    fetch(`/api/admin/sessions/${params.id}`, { cache: "no-store" })
      .then((r) => r.json())
      .then((d) => setSession(d.session))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [params.id]);

  useEffect(() => {
    fetchSession();
  }, [fetchSession]);

  // Refresh the transcript/notes when the page is reopened/refocused.
  useRefreshOnVisible(fetchSession);

  const updateStatus = async (status: string) => {
    await fetch(`/api/admin/sessions/${params.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    setSession((s) => (s ? { ...s, status } : s));
  };

  const handleDelete = async () => {
    if (!confirm("Delete this conversation?")) return;
    await fetch(`/api/admin/sessions/${params.id}`, { method: "DELETE" });
    router.push("/admin/conversations");
  };

  if (loading) {
    return <div className="text-center py-12 text-slate-400 text-sm">Loading...</div>;
  }

  if (!session) {
    return <div className="text-center py-12 text-slate-400 text-sm">Conversation not found</div>;
  }

  const formatTime = (d: string) =>
    new Date(d).toLocaleString("en-US", {
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit",
    });

  return (
    <div>
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <Link
          href="/admin/conversations"
          className="rounded-lg border border-slate-200 p-2 text-slate-400 hover:bg-slate-50"
        >
          <ArrowLeft size={16} />
        </Link>
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <h1 className="text-lg font-bold text-[var(--kennion-navy)]">
              {session.userName || "Anonymous"}
            </h1>
            {session.userCode && (
              <span className="text-[11px] font-mono text-slate-400 bg-slate-100 rounded px-2 py-0.5">
                {session.userCode}
              </span>
            )}
          </div>
          <p className="text-[12px] text-slate-400">{formatTime(session.createdAt)}</p>
        </div>
        <div className="flex gap-2">
          {session.status !== "reviewed" && (
            <button
              onClick={() => updateStatus("reviewed")}
              className="flex items-center gap-1.5 rounded-lg bg-blue-50 px-3 py-1.5 text-[12px] font-medium text-blue-600 hover:bg-blue-100"
            >
              <CheckCircle size={13} /> Reviewed
            </button>
          )}
          {session.status !== "archived" && (
            <button
              onClick={() => updateStatus("archived")}
              className="flex items-center gap-1.5 rounded-lg bg-slate-100 px-3 py-1.5 text-[12px] font-medium text-slate-600 hover:bg-slate-200"
            >
              <Archive size={13} /> Archive
            </button>
          )}
          <button
            onClick={handleDelete}
            className="flex items-center gap-1.5 rounded-lg bg-red-50 px-3 py-1.5 text-[12px] font-medium text-red-600 hover:bg-red-100"
          >
            <Trash2 size={13} /> Delete
          </button>
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        {/* Chat transcript */}
        <div className="lg:col-span-2 rounded-2xl border border-slate-200 bg-white overflow-hidden">
          <div className="border-b border-slate-100 px-5 py-3 text-[13px] font-semibold text-[var(--kennion-navy)]">
            Chat Transcript ({session.messages.length} messages)
          </div>
          <div className="p-4 space-y-3 max-h-[600px] overflow-y-auto bg-slate-50/50">
            {session.messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-2.5 ${msg.role === "user" ? "flex-row-reverse" : ""}`}
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
                <div className="max-w-[80%]">
                  <div
                    className={`rounded-2xl px-3.5 py-2.5 text-[13px] leading-relaxed whitespace-pre-line ${
                      msg.role === "user"
                        ? "bg-[var(--kennion-navy)] text-white rounded-tr-md"
                        : "bg-white text-slate-700 rounded-tl-md shadow-sm border border-slate-100"
                    }`}
                  >
                    {msg.content}
                  </div>
                  <div className="mt-0.5 text-[10px] text-slate-400 px-1">
                    {formatTime(msg.createdAt)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Sidebar info */}
        <div className="space-y-4">
          {/* AI Summary */}
          {session.summary && (
            <div className="rounded-2xl border border-violet-200 bg-violet-50 p-4">
              <div className="flex items-center gap-2 mb-2 text-[13px] font-semibold text-violet-700">
                <Sparkles size={14} /> AI Summary
              </div>
              <p className="text-[13px] text-violet-600 leading-relaxed">{session.summary}</p>
            </div>
          )}

          {/* Contact info */}
          <div className="rounded-2xl border border-slate-200 bg-white p-4">
            <h3 className="text-[13px] font-semibold text-[var(--kennion-navy)] mb-3">Member Info</h3>
            <div className="space-y-2.5">
              {session.userCode && (
                <div className="flex items-center gap-2 text-[13px] text-slate-600">
                  <Hash size={14} className="text-slate-400" />
                  <span className="font-mono">{session.userCode}</span>
                </div>
              )}
              {session.userEmail && (
                <div className="flex items-center gap-2 text-[13px] text-slate-600">
                  <Mail size={14} className="text-slate-400" />
                  <a href={`mailto:${session.userEmail}`} className="text-blue-600 hover:underline">
                    {session.userEmail}
                  </a>
                </div>
              )}
              {session.userPhone && (
                <div className="flex items-center gap-2 text-[13px] text-slate-600">
                  <Phone size={14} className="text-slate-400" />
                  {session.userPhone}
                </div>
              )}
              {session.employer && (
                <div className="flex items-center gap-2 text-[13px] text-slate-600">
                  <Building2 size={14} className="text-slate-400" />
                  {session.employer}
                </div>
              )}
              {!session.userEmail && !session.userPhone && !session.employer && (
                <p className="text-[12px] text-slate-400">No contact info collected</p>
              )}
            </div>
          </div>

          {/* Status */}
          <div className="rounded-2xl border border-slate-200 bg-white p-4">
            <h3 className="text-[13px] font-semibold text-[var(--kennion-navy)] mb-2">Status</h3>
            <div className="flex gap-2 flex-wrap">
              {["new", "reviewed", "archived"].map((s) => (
                <button
                  key={s}
                  onClick={() => updateStatus(s)}
                  className={`rounded-lg px-3 py-1 text-[12px] font-medium capitalize transition-colors ${
                    session.status === s
                      ? "bg-[var(--kennion-navy)] text-white"
                      : "bg-slate-100 text-slate-500 hover:bg-slate-200"
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
            {session.ticketSent && (
              <div className="mt-3 flex items-center gap-1.5 text-[12px] text-emerald-600 font-medium">
                <CheckCircle size={13} /> Support ticket was sent
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
