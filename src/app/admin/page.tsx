"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { MessageSquare, AlertCircle, Send, Brain } from "lucide-react";
import { useRefreshOnVisible } from "@/lib/useRefreshOnVisible";

type Stats = { total: number; newCount: number; ticketsSent: number; activeRules: number };

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats | null>(null);

  const fetchStats = useCallback(() => {
    fetch("/api/admin/stats", { cache: "no-store" })
      .then((r) => r.json())
      .then(setStats)
      .catch(() => {});
  }, []);

  useEffect(() => {
    fetchStats();
  }, [fetchStats]);

  // Refresh metrics when the dashboard is reopened/refocused.
  useRefreshOnVisible(fetchStats);

  const cards = [
    { label: "Total Conversations", value: stats?.total ?? "-", icon: MessageSquare, color: "from-blue-600 to-blue-500", href: "/admin/conversations" },
    { label: "New (Unreviewed)", value: stats?.newCount ?? "-", icon: AlertCircle, color: "from-amber-500 to-orange-500", href: "/admin/conversations?status=new" },
    { label: "Tickets Sent", value: stats?.ticketsSent ?? "-", icon: Send, color: "from-emerald-500 to-teal-500", href: "/admin/conversations?status=all" },
    { label: "Active AI Rules", value: stats?.activeRules ?? "-", icon: Brain, color: "from-violet-600 to-purple-500", href: "/admin/rules" },
  ];

  return (
    <div>
      <h1 className="text-xl font-bold text-[var(--kennion-navy)] mb-6">Dashboard</h1>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        {cards.map((card) => {
          const Icon = card.icon;
          return (
            <Link
              key={card.label}
              href={card.href}
              className="group rounded-2xl border border-slate-200 bg-white p-5 transition-all hover:shadow-md hover:border-slate-300"
            >
              <div className={`mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br ${card.color} shadow-sm`}>
                <Icon size={18} className="text-white" strokeWidth={1.8} />
              </div>
              <div className="text-2xl font-bold text-[var(--kennion-navy)]">
                {card.value}
              </div>
              <div className="text-[12px] text-slate-400 mt-0.5">{card.label}</div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
