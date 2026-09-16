// src/lib/sub-brands.ts
export type SubBrand = {
  slug: string;
  name: string;
  logo: string;
  tagline: string;
  description: string;
  bg: string;
  hoverBg: string;
  imgWidthClass: string;
};

export const SUB_BRANDS: SubBrand[] = [
  {
    slug: "travel",
    name: "Travel",
    logo: "/logo/sub-brands/travel-badge.png",
    tagline: "Todo lo que necesitas para llegar lejos.",
    description:
      "TATAKOA Travel reúne el equipo esencial para el camino: mochilas, organizadores y accesorios pensados para nómadas, viajeros de RV y amantes del camping. Piezas duraderas, funcionales, hechas para acompañarte en cada ruta.",
    bg: "bg-tatakoa-terracotta/50",
    hoverBg: "hover:bg-tatakoa-terracotta/65",
    imgWidthClass: "w-32 md:w-40",
  },
  {
    slug: "apparel",
    name: "Apparel",
    logo: "/logo/sub-brands/apparel-badge.png",
    tagline: "Ropa pensada para el camino.",
    description:
      "TATAKOA Apparel es ropa para vivir en movimiento: prendas cómodas, versátiles y con estilo, diseñadas para quien pasa tanto tiempo en la carretera como en su destino. Wear the Journey.",
    bg: "bg-tatakoa-sand/50",
    hoverBg: "hover:bg-tatakoa-sand/65",
    imgWidthClass: "w-[149px] md:w-[186px]",
  },
  {
    slug: "accessories",
    name: "Accessories",
    logo: "/logo/sub-brands/accessories-badge.png",
    tagline: "Los detalles que hacen la diferencia.",
    description:
      "TATAKOA Accessories cubre los pequeños grandes detalles del viaje: desde iluminación hasta objetos utilitarios construidos para la aventura. Build for Adventure.",
    bg: "bg-tatakoa-slate/50",
    hoverBg: "hover:bg-tatakoa-slate/65",
    imgWidthClass: "w-[224px] md:w-[280px]",
  },
];
