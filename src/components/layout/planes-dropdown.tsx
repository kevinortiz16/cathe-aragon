"use client";

import Link from "next/link";
import { useState, useRef } from "react";

type City = {
  slug: string;
  label: string;
};

const ACTIVE_CITIES: City[] = [
  { slug: "washington-dc", label: "Washington D.C." },
  { slug: "new-york", label: "New York" },
  { slug: "miami", label: "Miami" },
];

export function PlanesDropdown({ navLinkClass }: { navLinkClass: string }) {
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
        Planes
        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>

      {open && (
        <div className="absolute top-full left-0 mt-2 w-56 bg-tatakoa-charcoal border border-white/10 rounded-lg shadow-xl py-2 z-50 normal-case">
          <Link
            href="/planes"
            className="block px-4 py-2.5 text-sm font-medium text-white/90 hover:text-tatakoa-terracotta hover:bg-white/5 transition-colors"
          >
            Todos los planes
          </Link>
          <div className="border-t border-white/10 my-1 mx-4" />
          {ACTIVE_CITIES.map((city) => (
            <Link
              key={city.slug}
              href={`/planes/${city.slug}`}
              className="flex items-center justify-between px-4 py-2.5 text-sm text-white/70 hover:text-tatakoa-terracotta hover:bg-white/5 transition-colors"
            >
              {city.label}
              <span className="text-white/30">›</span>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
