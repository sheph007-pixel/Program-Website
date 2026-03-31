"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { MessageSquare, Brain, LayoutDashboard, LogOut, FileText } from "lucide-react";

const navItems = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard, exact: true },
  { href: "/admin/conversations", label: "Conversations", icon: MessageSquare },
  { href: "/admin/rules", label: "AI Rules", icon: Brain },
  { href: "/admin/documents", label: "Documents", icon: FileText },
];

export default function AdminNav() {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = async () => {
    await fetch("/api/admin/auth", { method: "DELETE" });
    router.push("/admin/login");
  };

  return (
    <header className="border-b border-slate-200 bg-gradient-to-r from-[#0a1929] to-[#132f4c]">
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4 sm:px-6">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-cyan-400">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 3l9 4.5v5.5c0 5.25-3.75 9.5-9 11-5.25-1.5-9-5.75-9-11V7.5L12 3z"/>
                <path d="M9 12l2 2 4-4"/>
              </svg>
            </div>
            <span className="text-sm font-bold text-white tracking-wide">KENNION</span>
            <span className="rounded-md bg-white/10 px-2 py-0.5 text-[10px] font-semibold text-white/60">ADMIN</span>
          </div>

          <nav className="hidden sm:flex items-center gap-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = item.exact
                ? pathname === item.href
                : pathname.startsWith(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-2 rounded-lg px-3 py-1.5 text-[13px] font-medium transition-colors ${
                    isActive
                      ? "bg-white/15 text-white"
                      : "text-white/50 hover:bg-white/10 hover:text-white/80"
                  }`}
                >
                  <Icon size={15} strokeWidth={1.8} />
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </div>

        <button
          onClick={handleLogout}
          className="flex items-center gap-2 rounded-lg px-3 py-1.5 text-[13px] font-medium text-white/50 transition-colors hover:bg-white/10 hover:text-white/80"
        >
          <LogOut size={15} strokeWidth={1.8} />
          <span className="hidden sm:inline">Logout</span>
        </button>
      </div>

      {/* Mobile nav */}
      <nav className="flex sm:hidden items-center gap-1 px-4 pb-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = item.exact
            ? pathname === item.href
            : pathname.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-1 flex-col items-center gap-0.5 rounded-lg py-1.5 text-[10px] font-medium transition-colors ${
                isActive ? "bg-white/15 text-white" : "text-white/40"
              }`}
            >
              <Icon size={16} strokeWidth={1.8} />
              {item.label}
            </Link>
          );
        })}
      </nav>
    </header>
  );
}
