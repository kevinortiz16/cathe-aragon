import Link from "next/link";

const socials = [
  { href: "https://instagram.com/kevincathetravel", label: "Instagram" },
  { href: "https://tiktok.com/@cathearagon.us", label: "TikTok" },
  { href: "https://youtube.com/@kevincathetravel", label: "YouTube" },
  { href: "https://www.facebook.com/people/Kevin-Cathe-Travel/61583092898224/", label: "Facebook" },
];

export function Footer() {
  return (
    <footer className="bg-dark text-cream mt-20">
      <div className="mx-auto max-w-6xl px-4 py-12 grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <p className="font-semibold text-lg mb-2">Cathe Aragon</p>
          <p className="text-sm text-cream/70">
            Viajes, tips y recomendaciones para nómadas, RV lovers y amantes del camping.
          </p>
        </div>

        <div>
          <p className="font-medium mb-3 text-sm">Explorar</p>
          <ul className="space-y-2 text-sm text-cream/70">
            <li><Link href="/blog">Blog</Link></li>
            <li><Link href="/tienda">Tienda</Link></li>
            <li><Link href="/portafolio">Portafolio</Link></li>
          </ul>
        </div>

        <div>
          <p className="font-medium mb-3 text-sm">Empresa</p>
          <ul className="space-y-2 text-sm text-cream/70">
            <li><Link href="/sobre-mi">Sobre mí</Link></li>
            <li><Link href="/contacto">Contacto</Link></li>
            <li><Link href="/legal/privacidad">Privacidad</Link></li>
            <li><Link href="/legal/terminos">Términos</Link></li>
            <li><Link href="/legal/cookies">Cookies</Link></li>
          </ul>
        </div>

        <div>
          <p className="font-medium mb-3 text-sm">Sígueme</p>
          <ul className="space-y-2 text-sm text-cream/70">
            {socials.map((s) => (
              <li key={s.href}>
                <a href={s.href} target="_blank" rel="noopener noreferrer">
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-cream/10 py-4 text-center text-xs text-cream/50">
        © {new Date().getFullYear()} Cathe Aragon. Todos los derechos reservados.
      </div>
    </footer>
  );
}