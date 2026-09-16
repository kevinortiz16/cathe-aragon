// src/components/layout/account-dropdown.tsx
"use client";

import Link from "next/link";
import { useState, useRef } from "react";

export function AccountDropdown({
  navLinkClass,
  onLogout,
}: {
  navLinkClass: string;
  onLogout: () => void;
}) {
  const [open, setOpen] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setOpen(true);
  };
  const handleLeave = () => {
    timeoutRef.current = setTimeout(() => setOpen(false), 150);
  };

  return (
    <div className="relative" onMouseEnter={handleEnter} onMouseLeave={handleLeave}>
      <button className={`${navLinkClass} inline-flex items-center gap-1.5 appearance-none bg-transparent border-0`}>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="8" r="4" />
          <path d="M4 20c0-4 4-6 8-6s8 2 8 6" />
        </svg>
      </button>

      {open && (
        <div className="absolute top-full right-0 mt-1 w-44 bg-white text-tatakoa-charcoal rounded-xl shadow-lg border border-tatakoa-charcoal/10 py-2 z-50 normal-case">
          <Link href="/cuenta/compras" className="block px-4 py-2 text-sm hover:bg-tatakoa-white transition-colors">
            Mis compras
          </Link>
          <button
            onClick={onLogout}
            className="block w-full text-left px-4 py-2 text-sm hover:bg-tatakoa-white transition-colors"
          >
            Cerrar sesión
          </button>
        </div>
      )}
    </div>
  );
}
