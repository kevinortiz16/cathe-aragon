// src/components/plans/plan-card.tsx
import Link from "next/link";
import { getCityLabel, normalizeCitySlug } from "@/lib/cities";
import type { Plan } from "@/types/plan";
import { RemoteImage } from "@/components/ui/remote-image";
import { CARD_SIZES_SM2 } from "@/lib/images";

export function PlanCard({ plan, showCity = true }: { plan: Plan; showCity?: boolean }) {
  const city = normalizeCitySlug(plan.city);
  return (
    <Link
      href={`/planes/${city}/${plan.slug}`}
      className="group block rounded-2xl bg-white border border-black/5 shadow-sm overflow-hidden hover:shadow-lg transition-shadow"
    >
      <div className="aspect-video bg-tatakoa-sand/10 flex items-center justify-center text-tatakoa-sand/40 text-sm relative">
        {plan.cover_image ? (
          <RemoteImage
            src={plan.cover_image}
            alt={plan.title}
            sizes={CARD_SIZES_SM2}
            className="object-cover"
          />
        ) : (
          "TATAKOA"
        )}
        {plan.featured && (
          <span className="absolute top-3 left-3 bg-tatakoa-terracotta text-white text-[10px] font-semibold uppercase tracking-wide px-2.5 py-1 rounded-full">
            Destacado
          </span>
        )}
      </div>
      <div className="p-5">
        {showCity && (
          <span className="text-xs font-medium text-tatakoa-terracotta uppercase tracking-wide">
            {getCityLabel(city)}
          </span>
        )}
        <h3 className="text-lg font-semibold mt-2 group-hover:text-tatakoa-terracotta transition-colors">
          {plan.title}
        </h3>
        {plan.description && (
          <p className="text-sm text-tatakoa-charcoal/60 mt-2 line-clamp-2">
            {plan.description}
          </p>
        )}
      </div>
    </Link>
  );
}
