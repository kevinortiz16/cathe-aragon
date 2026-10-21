// src/components/layout/topbar.tsx
import Link from "next/link";

export function Topbar() {
  return (
    <div className="bg-tatakoa-charcoal text-tatakoa-white/70 text-xs border-b border-white/5">
      <div className="mx-auto max-w-7xl px-4 h-9 flex items-center justify-between gap-4">
        <span className="hidden sm:inline tracking-wide">Travel Strong. Travel Smart.</span>

        <div className="flex items-center gap-5 ml-auto">
          <Link href="/planes" className="hover:text-tatakoa-white transition-colors">
            Planes de la semana →
          </Link>
          <Link href="/cuenta/compras" className="flex items-center gap-1.5 hover:text-tatakoa-white transition-colors">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <circle cx="12" cy="8" r="4" />
              <path d="M4 20c0-4 4-6 8-6s8 2 8 6" />
            </svg>
            Mis compras
          </Link>
        </div>
      </div>
    </div>
  );
}
