import { CURRENCY } from "@/lib/constants";

export default function MenuCard({ item }) {
  return (
    <article className="group flex gap-4 rounded-2xl border border-char-line bg-char-soft p-3 shadow-card transition-all duration-200 hover:-translate-y-0.5 hover:border-ember/40 hover:shadow-lg sm:p-4">
      <div className="relative h-24 w-24 flex-shrink-0 overflow-hidden rounded-xl ring-1 ring-saffron/15 sm:h-28 sm:w-28">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={item.imageUrl}
          alt={item.name}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          loading="lazy"
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/15 to-transparent" />
      </div>

      <div className="flex min-w-0 flex-1 flex-col justify-center">
        <div className="flex items-center gap-1">
          <h3 className="truncate font-display text-base font-bold text-cream sm:text-lg">
            {item.name}
          </h3>

          {/* Classic printed-menu dot leader */}
          <span className="leader-dots" />

          {/* Signature scalloped "plate" price tag */}
          <div className="plate-price flex h-14 w-14 flex-shrink-0 items-center justify-center text-char shadow-[0_0_0_3px_rgba(27,20,15,0.4)]">
            <span className="font-display text-sm font-extrabold leading-none">
              {CURRENCY}
              {item.price.toFixed(2)}
            </span>
          </div>
        </div>

        <p className="mt-1.5 line-clamp-2 font-body text-xs italic leading-relaxed text-cream-muted sm:text-sm">
          {item.description}
        </p>
      </div>
    </article>
  );
}