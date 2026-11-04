"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  Shield,
  Stethoscope,
  Eye,
  HeartPulse,
  ClipboardList,
  MessageCircle,
  X,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { useState, useEffect } from "react";

const navItems = [
  { href: "/", label: "Home", icon: Home },
  { href: "/medical", label: "Medical", icon: Shield },
  { href: "/dental", label: "Dental", icon: Stethoscope },
  { href: "/vision", label: "Vision", icon: Eye },
  { href: "/supplemental", label: "Supplemental", icon: HeartPulse },
  { href: "/enrollment", label: "Open Enrollment", icon: ClipboardList },
];

// Bottom tab bar items for mobile
const mobileTabItems = [
  { href: "/", label: "Home", icon: Home },
  { href: "/medical", label: "Medical", icon: Shield },
  { href: "/dental", label: "Dental", icon: Stethoscope },
  { href: "/vision", label: "Vision", icon: Eye },
  { href: "/supplemental", label: "Supplemental", icon: HeartPulse },
  { href: "/enrollment", label: "Enroll", icon: ClipboardList },
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
      {/* Mobile top bar - just the logo */}
      <div className="no-print fixed top-0 left-0 right-0 z-40 flex h-14 items-center bg-[var(--kennion-navy)] px-4 md:hidden">
        <img
          src="/kennion-logo-white.svg"
          alt="Kennion"
          className="h-7"
        />
      </div>

      {/* Mobile bottom tab bar */}
      <div className="no-print fixed bottom-0 left-0 right-0 z-40 border-t border-slate-200 bg-white/95 backdrop-blur-lg md:hidden safe-area-bottom">
        <div className="flex items-stretch justify-around px-1">
          {mobileTabItems.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex min-w-0 flex-1 flex-col items-center gap-1 py-2.5 transition-colors ${
                  isActive ? "text-blue-600" : "text-slate-500"
                }`}
              >
                <Icon size={21} strokeWidth={isActive ? 2.2 : 1.8} />
                <span className={`text-[10px] ${isActive ? "font-bold" : "font-semibold"}`}>
                  {item.label}
                </span>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Mobile slide-out drawer overlay */}
      <div
        className={`fixed inset-0 z-40 bg-black/60 backdrop-blur-sm transition-opacity duration-300 md:hidden ${
          mobileOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        onClick={() => setMobileOpen(false)}
      />

      {/* Sidebar (desktop persistent, mobile drawer) */}
      <aside
        className={`fixed top-0 left-0 z-50 h-full flex-col border-r border-white/[0.06] text-white transition-all duration-300 ease-in-out ${
          mobileOpen ? "flex translate-x-0" : "hidden md:flex md:translate-x-0"
        }`}
        style={{
          width: mobileOpen ? "280px" : sidebarWidth,
          background: "linear-gradient(180deg, #0b2138 0%, #0b2138 50%, #0b2138 100%)",
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

        {/* Logo - bigger and clearer */}
        <div className={`flex items-center border-b border-white/[0.06] transition-all duration-300 ${
          collapsed ? "justify-center px-3 py-5" : "px-5 py-6"
        }`}>
          {collapsed ? (
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-cyan-400 shadow-lg shadow-blue-500/20">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 3l9 4.5v5.5c0 5.25-3.75 9.5-9 11-5.25-1.5-9-5.75-9-11V7.5L12 3z"/>
                <path d="M9 12l2 2 4-4"/>
              </svg>
            </div>
          ) : (
            <img
              src="/kennion-logo-white.svg"
              alt="Kennion Benefits Program"
              className="h-11 w-auto"
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
                    ? "justify-center px-0 py-2.5 mx-auto w-10 h-10"
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
          {/* Get Help button - desktop only (chat is hidden on mobile) */}
          <button
            onClick={() => {
              setMobileOpen(false);
              window.dispatchEvent(new CustomEvent("open-kennion-chat"));
            }}
            title={collapsed ? "Get Help" : undefined}
            className={`group relative hidden md:flex items-center rounded-xl transition-all duration-200 w-full ${
              collapsed
                ? "justify-center px-0 py-2.5 mx-auto w-10 h-10"
                : "gap-3 px-3 py-2.5"
            } text-white/60 hover:bg-white/[0.06] hover:text-white/90`}
          >
            <MessageCircle
              size={18}
              strokeWidth={1.8}
              className="shrink-0 text-emerald-400/80 transition-colors group-hover:text-emerald-300"
            />
            {!collapsed && (
              <span className="text-[13px] font-medium">Get Help</span>
            )}
            {!collapsed && (
              <span className="ml-auto flex h-2 w-2 rounded-full bg-emerald-400 shadow-sm shadow-emerald-400/50" />
            )}
          </button>
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
          <div className="border-t border-white/[0.06] px-5 py-3 text-[11px] text-white/30">
            &copy; {new Date().getFullYear()} Kennion Benefits Program
          </div>
        )}
      </aside>

      {/* Dynamic CSS variable for main content offset */}
      <style>{`
        :root { --current-sidebar-width: 0px; }
        @media (min-width: 768px) { :root { --current-sidebar-width: ${sidebarWidth}; } }
      `}</style>
    </>
  );
}
