"use client";

import Link from "next/link";
import { useState, useRef } from "react";

export function TiendaDropdown({ navLinkClass }: { navLinkClass: string }) {
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
      <button className={`${navLinkClass} inline-flex items-center gap-1 appearance-none bg-transparent border-0`}>
        Tienda
        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>

      {open && (
        <div className="absolute top-full left-0 mt-2 w-56 bg-tatakoa-charcoal border border-white/10 rounded-lg shadow-xl py-2 z-50 normal-case">
          <Link
            href="/tienda"
            className="block px-4 py-2.5 text-sm font-medium text-white/90 hover:text-tatakoa-terracotta hover:bg-white/5 transition-colors"
          >
            Ver toda la tienda
          </Link>
          <div className="border-t border-white/10 my-1 mx-4" />
          <Link
            href="/tienda/plantillas"
            className="block px-4 py-2.5 text-sm text-white/70 hover:text-tatakoa-terracotta hover:bg-white/5 transition-colors"
          >
            Plantillas y Guías
          </Link>
          <Link
            href="/tienda/productos"
            className="block px-4 py-2.5 text-sm text-white/70 hover:text-tatakoa-terracotta hover:bg-white/5 transition-colors"
          >
            Productos
          </Link>
        </div>
      )}
    </div>
  );
}