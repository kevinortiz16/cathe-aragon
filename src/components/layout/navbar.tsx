"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import type { User } from "@supabase/supabase-js";

const links = [
  { href: "/planes", label: "Planes" },
  { href: "/blog", label: "Blog" },
  //{ href: "/tienda", label: "Tienda" },
  { href: "/portafolio", label: "Portafolio" },
  { href: "/sobre-mi", label: "Sobre mí" },
  { href: "/contacto", label: "Contacto" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [user, setUser] = useState<User | null>(null);
  const supabase = createClient();
  const router = useRouter();

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => setUser(data.user));

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => listener.subscription.unsubscribe();
  }, [supabase]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/blog?q=${encodeURIComponent(query.trim())}`);
      setSearchOpen(false);
      setQuery("");
    }
  };

  const navLinkClass =
    "text-sm text-white/90 hover:text-white hover:bg-black/15 rounded-full px-4 py-2 transition-colors";

  return (
    <header className="sticky top-0 z-50 bg-primary">
      <nav className="mx-auto max-w-7xl px-4 h-16 flex items-center justify-between gap-4">
        <Link href="/" className="font-semibold text-lg tracking-tight text-white shrink-0">
          Cathe Aragon
        </Link>

        <ul className="hidden md:flex items-center gap-1">
          {links.map((link) => (
            <li key={link.href}>
              <Link href={link.href} className={navLinkClass}>
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="hidden md:flex items-center gap-2">
          {/* Buscador */}
          <div className="flex items-center">
            {searchOpen && (
              <form onSubmit={handleSearch} className="mr-1">
                <input
                  autoFocus
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onBlur={() => !query && setSearchOpen(false)}
                  placeholder="Buscar..."
                  className="w-44 rounded-full bg-white/15 text-white placeholder-white/60 text-sm px-4 py-1.5 focus:outline-none focus:bg-white/25 transition-colors"
                />
              </form>
            )}
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              aria-label="Buscar"
              className="text-white/90 hover:text-white hover:bg-black/15 rounded-full p-2 transition-colors"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="7" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
            </button>
          </div>

          {user ? (
            <>
              <Link href="/cuenta/compras" className={navLinkClass}>
                Mis compras
              </Link>
              <button onClick={handleLogout} className={navLinkClass}>
                Cerrar sesión
              </button>
            </>
          ) : (
            <Link href="/login" className={navLinkClass}>
              Iniciar sesión
            </Link>
          )}
          <Link
            href="/tienda"
            className="text-sm bg-white text-primary px-4 py-2 rounded-full font-medium hover:bg-white/90 transition-colors"
          >
            Ver tienda
          </Link>
        </div>

        <button
          className="md:hidden text-white"
          onClick={() => setOpen(!open)}
          aria-label="Abrir menú"
        >
          <span className="block w-6 h-0.5 bg-white mb-1.5" />
          <span className="block w-6 h-0.5 bg-white mb-1.5" />
          <span className="block w-6 h-0.5 bg-white" />
        </button>
      </nav>

      {open && (
        <div className="md:hidden px-4 pb-6">
          <form onSubmit={handleSearch} className="mb-4">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Buscar..."
              className="w-full rounded-full bg-white/15 text-white placeholder-white/60 text-sm px-4 py-2 focus:outline-none"
            />
          </form>
          <ul className="flex flex-col gap-1 text-sm">
            {links.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="block text-white/90 hover:bg-black/15 rounded-full px-4 py-2 transition-colors"
                >
                  {link.label}
                </Link>
              </li>
            ))}
            <li>
              {user ? (
                <button
                  onClick={handleLogout}
                  className="block w-full text-left text-white/90 hover:bg-black/15 rounded-full px-4 py-2 transition-colors"
                >
                  Cerrar sesión
                </button>
              ) : (
                <Link
                  href="/login"
                  onClick={() => setOpen(false)}
                  className="block text-white/90 hover:bg-black/15 rounded-full px-4 py-2 transition-colors"
                >
                  Iniciar sesión
                </Link>
              )}
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}