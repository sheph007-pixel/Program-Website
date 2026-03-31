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
        className={`fixed top-0 left-0 z-50 flex h-full flex-col bg-[var(--kennion-navy)] text-white transition-transform duration-300 md:translate-x-0 ${
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        }`}
        style={{ width: "var(--sidebar-width)" }}
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
        <div className="flex items-center gap-2.5 px-4 pt-5 pb-6">
          <div className="flex h-8 w-8 items-center justify-center rounded bg-[var(--kennion-blue)] text-xs font-bold text-white">
            K
          </div>
          <div>
            <div className="text-sm font-bold leading-tight tracking-wide">
              kennion
            </div>
            <div className="text-[9px] tracking-wider text-blue-300" style={{ borderBottom: "1px solid #3b82f6", paddingBottom: "2px" }}>
              Benefit Advisors
            </div>
          </div>
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
                className={`flex items-center gap-2.5 rounded-lg px-3 py-2 text-[13px] transition-colors ${
                  isActive
                    ? "bg-white/15 font-medium text-white"
                    : "text-white/70 hover:bg-white/10 hover:text-white"
                }`}
              >
                <Icon size={16} strokeWidth={1.5} />
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="border-t border-white/10 px-4 py-3 text-[10px] text-white/40">
          &copy; {new Date().getFullYear()} Kennion Benefit Advisors
        </div>
      </aside>
    </>
  );
}
