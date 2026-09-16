// src/app/sobre-tatakoa/page.tsx
import Image from "next/image";
import {
  Shield, Mountain, Feather, Zap, LayoutGrid,
  Compass, Wind, Smile, Leaf, HeartHandshake,
} from "lucide-react";

export const metadata = {
  title: "Sobre TATAKOA | Misión, visión y valores",
  description:
    "TATAKOA diseña organizadores y accesorios de viaje duraderos, portátiles y prácticos para nómadas, viajeros de RV y amantes del camping.",
};

const VALUES = [
  { name: "Confianza", desc: "Cada producto cumple lo que promete, viaje tras viaje.", icon: Shield },
  { name: "Durabilidad", desc: "Materiales y construcción que acompañan al viajero por años.", icon: Mountain },
  { name: "Portabilidad", desc: "Ligero, compacto y fácil de llevar, sin importar el medio.", icon: Feather },
  { name: "Practicidad", desc: "Soluciones simples para problemas reales de empacar y organizar.", icon: Zap },
  { name: "Orden", desc: "Un espacio organizado reduce el estrés y devuelve tiempo al viajero.", icon: LayoutGrid },
  { name: "Aventura", desc: "Celebramos la curiosidad. Nuestros productos acompañan, nunca limitan.", icon: Compass },
  { name: "Libertad", desc: "Cada producto debe darle al viajero más autonomía, no menos.", icon: Wind },
  { name: "Felicidad", desc: "Medimos nuestro éxito en la tranquilidad que devolvemos a las personas.", icon: Smile },
  { name: "Naturaleza", desc: "Respetamos los espacios que exploramos y crecemos con responsabilidad.", icon: Leaf },
  { name: "Tranquilidad", desc: "Nuestro producto existe para quitarle una preocupación al viajero.", icon: HeartHandshake },
];

const BRAND_LINES = [
  {
    name: "TRAVEL",
    tagline: "Travel Strong. Travel Smart.",
    desc: "Organizadores y soluciones para viajar en avión, RV o campamento con orden y confianza.",
    color: "text-tatakoa-terracotta",
    bg: "bg-tatakoa-terracotta/10",
    logo: "/logo/sub-brands/travel.png",
    logoWidth: 3201,
    logoHeightPx: 743,
  },
  {
    name: "APPAREL",
    tagline: "Wear the Journey.",
    desc: "Ropa inspirada en el viajero: cómoda, versátil y lista para la aventura.",
    color: "text-tatakoa-sand",
    bg: "bg-tatakoa-sand/15",
    logo: "/logo/sub-brands/apparel.png",
    logoWidth: 3889,
    logoHeightPx: 743,
  },
  {
    name: "ACCESSORIES",
    tagline: "Build for Adventure.",
    desc: "Accesorios funcionales que resuelven necesidades específicas del camino.",
    color: "text-tatakoa-slate",
    bg: "bg-tatakoa-slate/10",
    logo: "/logo/sub-brands/accessories.png",
    logoWidth: 8000,
    logoHeightPx: 1016,
  },
];

export default function SobreTatakoaPage() {
  return (
    <div>
      {/* Hero con imagen de fondo */}
      <section className="relative h-[420px] md:h-[520px] flex items-end overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/sobre-tatakoa/hero.png"
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/10" />
        </div>
        <div className="relative mx-auto max-w-4xl px-4 pb-14 text-center w-full">
          <span className="text-xs font-semibold uppercase tracking-widest text-white/70">
            Where Every Journey Begins
          </span>
          <h1 className="text-5xl md:text-7xl font-semibold text-white mt-3 leading-none">
            Sobre TATAKOA
          </h1>
        </div>
      </section>

      {/* Nuestro punto de partida — editorial, texto + imagen */}
      <section className="mx-auto max-w-6xl px-4 py-20 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div>
          <span className="text-xs font-semibold uppercase tracking-widest text-tatakoa-terracotta">
            Nuestro punto de partida
          </span>
          <p className="text-2xl md:text-3xl font-medium leading-snug mt-4 mb-6">
            Viajar hoy exige más orden que nunca — en el aire, en la carretera, o en el camping.
          </p>
          <p className="text-tatakoa-charcoal/60 leading-relaxed">
            Los aeropuertos exigen cada vez más orden en el equipaje de mano. Un RV
            ofrece libertad, pero su espacio es reducido y está en constante
            movimiento. Acampar exige que cada objeto tenga un propósito, sin peso
            ni volumen de más. TATAKOA nace para resolver ese problema compartido:
            ayudar a que cada viajero, sin importar cómo se mueva por el mundo,
            tenga el control de su equipaje.
          </p>
        </div>
        <div className="relative aspect-[4/5] rounded-2xl overflow-hidden bg-tatakoa-sand/10">
          <Image
            src="/sobre-tatakoa/punto-de-partida.png"
            alt=""
            fill
            className="object-cover"
          />
        </div>
      </section>

      {/* Misión y Visión — bloques grandes de color */}
      <section className="grid grid-cols-1 md:grid-cols-2">
        <div className="bg-tatakoa-terracotta text-white px-8 md:px-14 py-20">
          <h2 className="text-3xl md:text-4xl font-bold uppercase tracking-wide text-white mb-5">
            Misión
          </h2>
          <p className="text-base leading-relaxed text-white/90">
            En TATAKOA diseñamos organizadores y accesorios de viaje duraderos,
            portátiles y prácticos que le devuelven el orden al viajero moderno.
            Ayudamos a quienes viajan en avión, en RV o de campamento a moverse con
            más libertad y menos estrés, en un mundo donde el espacio es limitado y
            las restricciones son cada vez mayores.
          </p>
        </div>
        <div className="bg-tatakoa-charcoal text-white px-8 md:px-14 py-20">
          <h2 className="text-3xl md:text-4xl font-bold uppercase tracking-wide text-white mb-5">
            Visión
          </h2>
          <p className="text-base leading-relaxed text-white/80">
            Ser la marca de viaje más confiable de Estados Unidos, reconocida por
            acompañar a nómadas digitales, viajeros de RV, viajeros de negocios,
            mochileros y amantes de la naturaleza en cada etapa de su recorrido.
            Aspiramos a construir un catálogo sólido de productos —organizadores,
            ropa y accesorios— y una comunidad que viva los valores de aventura,
            libertad y tranquilidad que representamos.
          </p>
        </div>
      </section>

      {/* Valores — grid de íconos */}
      <section className="mx-auto max-w-6xl px-4 py-20">
        <h2 className="text-3xl md:text-4xl font-semibold text-center mb-14">
          Nuestros valores
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-x-8 gap-y-12">
          {VALUES.map((value) => {
            const Icon = value.icon;
            return (
              <div key={value.name} className="text-center">
                <div className="w-14 h-14 rounded-full bg-tatakoa-terracotta/10 flex items-center justify-center mx-auto mb-4">
                  <Icon className="w-6 h-6 text-tatakoa-terracotta" strokeWidth={1.5} />
                </div>
                <h3 className="font-semibold mb-1">{value.name}</h3>
                <p className="text-xs text-tatakoa-charcoal/55 leading-relaxed">
                  {value.desc}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Líneas de marca — bloques alternados con imagen */}
      <section className="py-20">
        <h2 className="text-3xl md:text-4xl font-semibold text-center mb-14">
          Nuestras líneas de marca
        </h2>
        <div className="flex flex-col gap-6 mx-auto max-w-6xl px-4">
          {BRAND_LINES.map((line) => (
            <div
              key={line.name}
              className={`grid grid-cols-1 md:grid-cols-2 rounded-3xl overflow-hidden ${line.bg}`}
            >
              <div className="flex items-center justify-center px-10 py-12 md:py-0">
                <Image
                  src={line.logo}
                  alt={line.name}
                  width={line.logoWidth}
                  height={line.logoHeightPx}
                  className="h-14 md:h-20 w-auto"
                />
              </div>
              <div className="flex flex-col justify-center px-8 md:px-12 py-10">
                <p className={`font-semibold tracking-widest text-sm ${line.color}`}>
                  {line.name}
                </p>
                <p className="text-xl font-medium italic mt-2 mb-4">
                  &ldquo;{line.tagline}&rdquo;
                </p>
                <p className="text-tatakoa-charcoal/60 leading-relaxed">{line.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}