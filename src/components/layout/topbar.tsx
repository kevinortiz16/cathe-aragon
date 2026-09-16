// src/components/layout/topbar.tsx
import Link from "next/link";

export function Topbar() {
  return (
    <div className="bg-tatakoa-charcoal text-tatakoa-white/70 text-xs">
      <div className="mx-auto max-w-7xl px-4 h-9 flex items-center justify-between">
        <span className="hidden sm:inline tracking-wide">Travel Strong. Travel Smart.</span>

        <div className="flex items-center gap-5 ml-auto">
          <span className="hidden sm:flex items-center gap-1.5">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M2 16.5V4a1 1 0 0 1 1-1h13v13.5" />
              <path d="M16 8h4l3 3v5.5" />
              <circle cx="6" cy="18" r="2" />
              <circle cx="18" cy="18" r="2" />
            </svg>
            Envíos a todo USA
          </span>

          <Link href="/cuenta" className="flex items-center gap-1.5 hover:text-tatakoa-white transition-colors">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="8" r="4" />
              <path d="M4 20c0-4 4-6 8-6s8 2 8 6" />
            </svg>
            Mi cuenta
          </Link>

          <Link href="/tienda" className="relative flex items-center hover:text-tatakoa-white transition-colors">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="9" cy="21" r="1" />
              <circle cx="20" cy="21" r="1" />
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
            </svg>
            <span className="absolute -top-1.5 -right-2 bg-tatakoa-terracotta text-white text-[9px] leading-none rounded-full w-3.5 h-3.5 flex items-center justify-center">
              0
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
}