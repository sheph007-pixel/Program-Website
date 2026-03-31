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
  LayoutGrid,
  Menu,
  X,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";
import { useState } from "react";

const navItems = [
  { href: "/", label: "Home", icon: Home },
  { href: "/plans", label: "Plans", icon: FileText },
  { href: "/enrollment", label: "Enrollment", icon: ClipboardList },
  { href: "/app-download", label: "App", icon: Smartphone },
  { href: "/visa", label: "Visa", icon: CreditCard },
  { href: "/virtual-care", label: "Free Virtual Care", icon: Stethoscope },
  { href: "/additional-links", label: "Additional Links", icon: LayoutGrid },
];

export default function Sidebar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);

  const sidebarWidth = collapsed ? "64px" : "var(--sidebar-width)";

  return (
    <>
      {/* Mobile hamburger */}
      <button
        onClick={() => setMobileOpen(true)}
        className="fixed top-4 left-4 z-50 rounded-lg bg-[var(--kennion-navy)] p-2 text-white md:hidden"
        aria-label="Open menu"
      >
        <Menu size={24} />
      </button>

      {/* Overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 md:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 z-50 flex h-full flex-col bg-[var(--kennion-navy)] text-white transition-all duration-300 ease-in-out md:translate-x-0 ${
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        }`}
        style={{ width: mobileOpen ? "var(--sidebar-width)" : sidebarWidth }}
      >
        {/* Close button (mobile) */}
        <button
          onClick={() => setMobileOpen(false)}
          className="absolute top-4 right-4 text-white md:hidden"
          aria-label="Close menu"
        >
          <X size={24} />
        </button>

        {/* Logo */}
        <div className={`flex items-center px-4 pt-5 pb-6 ${collapsed ? "justify-center" : ""}`}>
          {collapsed ? (
            <img
              src="/kennion-logo-white.svg"
              alt="Kennion"
              className="h-8 w-8 object-contain object-left"
              style={{ clipPath: "inset(0 75% 0 0)" }}
            />
          ) : (
            <img
              src="/kennion-logo-white.svg"
              alt="Kennion Benefit Advisors"
              className="h-10 w-auto"
            />
          )}
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-0.5 px-2">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                title={collapsed ? item.label : undefined}
                className={`flex items-center rounded-lg transition-colors ${
                  collapsed
                    ? "justify-center px-2 py-2.5"
                    : "gap-2.5 px-3 py-2"
                } text-[13px] ${
                  isActive
                    ? "bg-white/15 font-medium text-white"
                    : "text-white/70 hover:bg-white/10 hover:text-white"
                }`}
              >
                <Icon size={16} strokeWidth={1.5} className="shrink-0" />
                {!collapsed && <span>{item.label}</span>}
              </Link>
            );
          })}
        </nav>

        {/* Collapse toggle (desktop only) */}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="hidden md:flex items-center justify-center border-t border-white/10 py-3 text-white/40 transition-colors hover:text-white/70"
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {collapsed ? (
            <ChevronsRight size={16} />
          ) : (
            <ChevronsLeft size={16} />
          )}
        </button>

        {/* Footer */}
        {!collapsed && (
          <div className="border-t border-white/10 px-4 py-3 text-[10px] text-white/40">
            &copy; {new Date().getFullYear()} Kennion Benefit Advisors
          </div>
        )}
      </aside>

      {/* Spacer for main content - communicates width via CSS variable */}
      <style>{`
        :root {
          --current-sidebar-width: ${sidebarWidth};
        }
      `}</style>
    </>
  );
}
