"use client";

import { useEffect, useState } from "react";
import { Brain, Plus, Trash2, Power, PowerOff } from "lucide-react";
import { useRefreshOnVisible } from "@/lib/useRefreshOnVisible";

type Rule = {
  id: string;
  content: string;
  isActive: boolean;
  sortOrder: number;
  createdAt: string;
};

export default function AIRulesPage() {
  const [rules, setRules] = useState<Rule[]>([]);
  const [newContent, setNewContent] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editContent, setEditContent] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchRules = async () => {
    try {
      const res = await fetch("/api/admin/rules", { cache: "no-store" });
      const data = await res.json();
      setRules(data.rules || []);
    } catch {
      setRules([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRules();
  }, []);

  // Refresh rules when the page is reopened/refocused.
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useRefreshOnVisible(() => fetchRules());

  const addRule = async () => {
    if (!newContent.trim()) return;
    await fetch("/api/admin/rules", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ content: newContent }),
    });
    setNewContent("");
    fetchRules();
  };

  const toggleActive = async (rule: Rule) => {
    await fetch(`/api/admin/rules/${rule.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ isActive: !rule.isActive }),
    });
    fetchRules();
  };

  const saveEdit = async (id: string) => {
    if (!editContent.trim()) return;
    await fetch(`/api/admin/rules/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ content: editContent }),
    });
    setEditingId(null);
    fetchRules();
  };

  const deleteRule = async (id: string) => {
    if (!confirm("Delete this rule?")) return;
    await fetch(`/api/admin/rules/${id}`, { method: "DELETE" });
    fetchRules();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      addRule();
    }
  };

  return (
    <div>
      <div className="flex items-center gap-3 mb-6">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-violet-600 to-purple-500 shadow-sm">
          <Brain size={18} className="text-white" strokeWidth={1.8} />
        </div>
        <div>
          <h1 className="text-xl font-bold text-[var(--kennion-navy)]">AI Rules & Memory</h1>
          <p className="text-[12px] text-slate-400">
            These rules are injected into every chat response. Use them to correct mistakes, add knowledge, or set boundaries.
          </p>
        </div>
      </div>

      {/* Add new rule */}
      <div className="mb-6 rounded-2xl border border-slate-200 bg-white p-4">
        <div className="flex gap-2">
          <textarea
            value={newContent}
            onChange={(e) => setNewContent(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder='Example: "The Freedom Bronze plan was discontinued Jan 2026. Do not recommend it."'
            rows={2}
            className="flex-1 resize-none rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-[13px] text-slate-700 outline-none placeholder:text-slate-400 focus:border-blue-400 focus:bg-white"
          />
          <button
            onClick={addRule}
            disabled={!newContent.trim()}
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-cyan-500 text-white disabled:opacity-30"
          >
            <Plus size={18} />
          </button>
        </div>
      </div>

      {/* Rules list */}
      {loading ? (
        <div className="text-center py-12 text-slate-400 text-sm">Loading...</div>
      ) : rules.length === 0 ? (
        <div className="text-center py-12">
          <Brain size={32} className="mx-auto mb-2 text-slate-300" />
          <p className="text-slate-400 text-sm">No AI rules yet. Add one above.</p>
          <p className="text-slate-300 text-[12px] mt-1">
            Rules help the AI give better, more accurate answers
          </p>
        </div>
      ) : (
        <div className="space-y-2">
          {rules.map((rule) => (
            <div
              key={rule.id}
              className={`rounded-xl border bg-white p-4 transition-all ${
                rule.isActive ? "border-slate-200" : "border-slate-100 opacity-60"
              }`}
            >
              {editingId === rule.id ? (
                <div className="flex gap-2">
                  <textarea
                    value={editContent}
                    onChange={(e) => setEditContent(e.target.value)}
                    rows={2}
                    autoFocus
                    className="flex-1 resize-none rounded-lg border border-blue-300 bg-white px-3 py-2 text-[13px] text-slate-700 outline-none focus:ring-1 focus:ring-blue-400/20"
                  />
                  <div className="flex flex-col gap-1">
                    <button
                      onClick={() => saveEdit(rule.id)}
                      className="rounded-lg bg-blue-50 px-3 py-1 text-[12px] font-medium text-blue-600 hover:bg-blue-100"
                    >
                      Save
                    </button>
                    <button
                      onClick={() => setEditingId(null)}
                      className="rounded-lg bg-slate-50 px-3 py-1 text-[12px] font-medium text-slate-500 hover:bg-slate-100"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex items-start gap-3">
                  <div className="flex-1">
                    <p
                      className="text-[13px] text-slate-700 leading-relaxed cursor-pointer hover:text-slate-900"
                      onClick={() => {
                        setEditingId(rule.id);
                        setEditContent(rule.content);
                      }}
                    >
                      {rule.content}
                    </p>
                    <p className="text-[10px] text-slate-400 mt-1">
                      Click to edit
                    </p>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => toggleActive(rule)}
                      className={`rounded-lg p-1.5 transition-colors ${
                        rule.isActive
                          ? "text-emerald-500 hover:bg-emerald-50"
                          : "text-slate-400 hover:bg-slate-50"
                      }`}
                      title={rule.isActive ? "Active - click to disable" : "Disabled - click to enable"}
                    >
                      {rule.isActive ? <Power size={15} /> : <PowerOff size={15} />}
                    </button>
                    <button
                      onClick={() => deleteRule(rule.id)}
                      className="rounded-lg p-1.5 text-slate-400 hover:bg-red-50 hover:text-red-500 transition-colors"
                    >
                      <Trash2 size={15} />
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
