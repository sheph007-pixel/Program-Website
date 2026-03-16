"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  FileText,
  ClipboardList,
  Smartphone,
  CreditCard,
  Heart,
  Grid3X3,
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
  { href: "/virtual-care", label: "Free Virtual Care", icon: Heart },
  { href: "/additional-links", label: "Additional Links", icon: Grid3X3 },
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
        className={`fixed top-0 left-0 z-50 flex h-full w-60 flex-col bg-[var(--kennion-navy)] text-white transition-transform duration-300 md:translate-x-0 ${
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        }`}
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
        <div className="flex items-center gap-3 px-5 pt-6 pb-8">
          <div className="flex h-9 w-9 items-center justify-center rounded bg-white/20 text-sm font-bold">
            K
          </div>
          <div>
            <div className="text-base font-bold leading-tight tracking-wide">
              kennion
            </div>
            <div className="text-[10px] tracking-widest text-white/70">
              Benefit Advisors
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-1 px-3">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-colors ${
                  isActive
                    ? "bg-white/15 font-medium text-white"
                    : "text-white/75 hover:bg-white/10 hover:text-white"
                }`}
              >
                <Icon size={18} />
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="border-t border-white/10 px-5 py-4 text-xs text-white/50">
          &copy; {new Date().getFullYear()} Kennion Benefit Advisors
        </div>
      </aside>
    </>
  );
}
