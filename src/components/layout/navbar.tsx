"use client";

import Link from "next/link";
import { useState } from "react";

const links = [
  { href: "/blog", label: "Blog" },
  { href: "/tienda", label: "Tienda" },
  { href: "/portafolio", label: "Portafolio" },
  { href: "/sobre-mi", label: "Sobre mí" },
  { href: "/contacto", label: "Contacto" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-cream/90 backdrop-blur border-b border-black/5">
      <nav className="mx-auto max-w-6xl px-4 h-16 flex items-center justify-between">
        <Link href="/" className="font-semibold text-lg tracking-tight">
          Cathe Aragon
        </Link>

        <ul className="hidden md:flex items-center gap-8 text-sm">
          {links.map((link) => (
            <li key={link.href}>
              <Link href={link.href} className="hover:text-primary transition-colors">
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="hidden md:flex items-center gap-4">
          <Link href="/login" className="text-sm hover:text-primary">
            Iniciar sesión
          </Link>
          <Link
            href="/tienda"
            className="text-sm bg-primary text-white px-4 py-2 rounded-full hover:opacity-90 transition-opacity"
          >
            Ver tienda
          </Link>
        </div>

        <button className="md:hidden" onClick={() => setOpen(!open)} aria-label="Abrir menú">
          <span className="block w-6 h-0.5 bg-dark mb-1.5" />
          <span className="block w-6 h-0.5 bg-dark mb-1.5" />
          <span className="block w-6 h-0.5 bg-dark" />
        </button>
      </nav>

      {open && (
        <ul className="md:hidden flex flex-col gap-4 px-4 pb-6 text-sm">
          {links.map((link) => (
            <li key={link.href}>
              <Link href={link.href} onClick={() => setOpen(false)}>
                {link.label}
              </Link>
            </li>
          ))}
          <li>
            <Link href="/login" onClick={() => setOpen(false)}>
              Iniciar sesión
            </Link>
          </li>
        </ul>
      )}
    </header>
  );
}