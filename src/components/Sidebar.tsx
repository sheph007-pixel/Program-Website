"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  FileText,
  ClipboardList,
  Smartphone,
  CreditCard,
  Stethoscope,
  Menu,
  X,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { useState, useEffect } from "react";

const navItems = [
  { href: "/", label: "Home", icon: Home },
  { href: "/plans", label: "Plans", icon: FileText },
  { href: "/enrollment", label: "Enrollment", icon: ClipboardList },
  { href: "/app-download", label: "App", icon: Smartphone },
  { href: "/visa", label: "Visa", icon: CreditCard },
  { href: "/virtual-care", label: "Free Virtual Care", icon: Stethoscope },
];

export default function Sidebar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const sidebarWidth = collapsed ? "var(--sidebar-collapsed)" : "var(--sidebar-width)";

  return (
    <>
      {/* Mobile top bar */}
      <div className="fixed top-0 left-0 right-0 z-40 flex h-14 items-center gap-3 bg-[var(--kennion-navy)] px-4 md:hidden">
        <button
          onClick={() => setMobileOpen(true)}
          className="rounded-lg p-1.5 text-white/80 transition-colors hover:bg-white/10 hover:text-white"
          aria-label="Open menu"
        >
          <Menu size={22} />
        </button>
        <img
          src="/kennion-logo-white.svg"
          alt="Kennion"
          className="h-7"
        />
      </div>

      {/* Overlay */}
      <div
        className={`fixed inset-0 z-40 bg-black/60 backdrop-blur-sm transition-opacity duration-300 md:hidden ${
          mobileOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        onClick={() => setMobileOpen(false)}
      />

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 z-50 flex h-full flex-col border-r border-white/[0.06] text-white transition-all duration-300 ease-in-out md:translate-x-0 ${
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        }`}
        style={{
          width: mobileOpen ? "var(--sidebar-width)" : sidebarWidth,
          background: "linear-gradient(180deg, #0a1929 0%, #0d2137 50%, #0a1929 100%)",
        }}
      >
        {/* Close button (mobile) */}
        <button
          onClick={() => setMobileOpen(false)}
          className="absolute top-4 right-4 rounded-lg p-1 text-white/60 transition-colors hover:bg-white/10 hover:text-white md:hidden"
          aria-label="Close menu"
        >
          <X size={20} />
        </button>

        {/* Logo */}
        <div className={`flex items-center border-b border-white/[0.06] transition-all duration-300 ${
          collapsed ? "justify-center px-3 py-5" : "px-5 py-5"
        }`}>
          {collapsed ? (
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-cyan-400 text-sm font-bold shadow-lg shadow-blue-500/20">
              K
            </div>
          ) : (
            <img
              src="/kennion-logo-white.svg"
              alt="Kennion Benefit Advisors"
              className="h-9 w-auto"
            />
          )}
        </div>

        {/* Navigation */}
        <nav className={`flex-1 space-y-1 overflow-y-auto py-4 ${collapsed ? "px-2" : "px-3"}`}>
          {navItems.map((item, index) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                title={collapsed ? item.label : undefined}
                className={`group relative flex items-center rounded-xl transition-all duration-200 ${
                  collapsed
                    ? "justify-center px-0 py-2.5"
                    : "gap-3 px-3 py-2.5"
                } ${
                  isActive
                    ? "bg-white/[0.12] text-white shadow-sm shadow-black/10"
                    : "text-white/60 hover:bg-white/[0.06] hover:text-white/90"
                } ${mounted ? "animate-slide-in" : ""}`}
                style={{ animationDelay: `${index * 0.04}s` }}
              >
                {isActive && (
                  <div className="absolute left-0 top-1/2 h-5 w-[3px] -translate-y-1/2 rounded-r-full bg-gradient-to-b from-blue-400 to-cyan-400" />
                )}
                <Icon
                  size={18}
                  strokeWidth={1.8}
                  className={`shrink-0 transition-colors ${
                    isActive ? "text-blue-400" : "text-white/50 group-hover:text-white/80"
                  }`}
                />
                {!collapsed && (
                  <span className="text-[13px] font-medium">{item.label}</span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Collapse toggle (desktop only) */}
        <div className="hidden border-t border-white/[0.06] p-3 md:block">
          <button
            onClick={() => setCollapsed(!collapsed)}
            className={`flex w-full items-center rounded-lg py-2 text-white/40 transition-all duration-200 hover:bg-white/[0.06] hover:text-white/70 ${
              collapsed ? "justify-center px-0" : "gap-3 px-3"
            }`}
            aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            {collapsed ? (
              <ChevronRight size={16} />
            ) : (
              <>
                <ChevronLeft size={16} />
                <span className="text-[12px] font-medium">Collapse</span>
              </>
            )}
          </button>
        </div>

        {/* Footer */}
        {!collapsed && (
          <div className="border-t border-white/[0.06] px-5 py-4 text-[11px] text-white/30">
            &copy; {new Date().getFullYear()} Kennion Benefit Advisors
          </div>
        )}
      </aside>

      {/* Dynamic CSS variable for main content offset */}
      <style>{`
        :root { --current-sidebar-width: ${sidebarWidth}; }
        @media (max-width: 767px) { :root { --current-sidebar-width: 0px; } }
      `}</style>
    </>
  );
}
