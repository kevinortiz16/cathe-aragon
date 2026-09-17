import Link from "next/link";
import Image from "next/image";

const socials = [
  { href: "https://instagram.com/kevincathetravel", label: "Instagram" },
  { href: "https://tiktok.com/@cathearagon.us", label: "TikTok" },
  { href: "https://youtube.com/@kevincathetravel", label: "YouTube" },
  { href: "https://www.facebook.com/people/Kevin-Cathe-Travel/61583092898224/", label: "Facebook" },
];

export function Footer() {
  return (
    <footer className="bg-tatakoa-charcoal text-tatakoa-white">
      <div className="mx-auto max-w-6xl px-4 py-12 grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          {/* Caja de encabezado, misma altura que las otras 3 columnas */}
          <div className="relative h-10 mb-3">
            <Image
              src="/Logo_Negativo.svg" /* usa el mismo src que tengas en navbar.tsx */
              alt="TATAKOA"
              width={200}
              height={26}
              className="absolute left-0 top-1/2 -translate-y-1/2 h-12 w-36"
            />
          </div>
          <p className="text-sm text-tatakoa-white/70">
            Viajes, tips y recomendaciones para nómadas, RV lovers y amantes del camping.
          </p>
        </div>

        <div>
          <div className="relative h-10 mb-1 flex items-center gap-2.5">
            <Image src="/logo/isotipo_terracotta.png" alt="" width={24} height={24} className="opacity-90" />
            <p className="text-xs font-semibold uppercase tracking-widest text-tatakoa-terracotta">Explorar</p>
          </div>
          <ul className="space-y-2 text-sm text-tatakoa-white/70 pl-[34px]">
            <li><Link href="/blog">Blog</Link></li>
            <li><Link href="/tienda">Tienda</Link></li>
            <li><Link href="/portafolio">Portafolio</Link></li>
          </ul>
        </div>

        <div>
          <div className="relative h-10 mb-1 flex items-center gap-2.5">
            <Image src="/logo/isotipo_sand.svg" alt="" width={24} height={24} className="opacity-90" />
            <p className="text-xs font-semibold uppercase tracking-widest text-tatakoa-sand">Empresa</p>
          </div>
          <ul className="space-y-2 text-sm text-tatakoa-white/70 pl-[34px]">
            <li><Link href="/sobre-tatakoa">Sobre TATAKOA</Link></li>
            <li><Link href="/contacto">Contacto</Link></li>
            <li><Link href="/legal/privacidad">Privacidad</Link></li>
            <li><Link href="/legal/terminos">Términos</Link></li>
            <li><Link href="/legal/cookies">Cookies</Link></li>
          </ul>
        </div>

        <div>
          <div className="relative h-10 mb-0.5 flex items-center gap-2.5">
            <Image src="/logo/isotipo_slate.svg" alt="" width={24} height={24} className="opacity-90" />
            <p className="text-xs font-semibold uppercase tracking-widest text-tatakoa-slate">Sígueme</p>
          </div>
          <ul className="space-y-2 text-sm text-tatakoa-white/70 pl-[34px]">
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

      <div className="border-t border-tatakoa-white/10 py-4 text-center text-xs text-tatakoa-white/50">
        © {new Date().getFullYear()} TATAKOA. Todos los derechos reservados.
      </div>
    </footer>
  );
}