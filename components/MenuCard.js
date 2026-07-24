import { CURRENCY } from "@/lib/constants";

export default function MenuCard({ item }) {
  return (
    <article className="group flex gap-4 rounded-2xl border border-char-line bg-char-soft p-3 shadow-card transition-colors hover:border-ember/40 sm:p-4">
      <div className="relative h-24 w-24 flex-shrink-0 overflow-hidden rounded-xl sm:h-28 sm:w-28">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={item.imageUrl}
          alt={item.name}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          loading="lazy"
        />
      </div>

      <div className="flex min-w-0 flex-1 flex-col">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-display text-base font-bold text-cream sm:text-lg">
            {item.name}
          </h3>

          {/* Signature scalloped "plate" price tag */}
          <div className="plate-price flex h-14 w-14 flex-shrink-0 items-center justify-center text-char">
            <span className="font-display text-sm font-extrabold leading-none">
              {CURRENCY}
              {item.price.toFixed(2)}
            </span>
          </div>
        </div>

        <p className="mt-1.5 line-clamp-2 font-body text-xs leading-relaxed text-cream-muted sm:text-sm">
          {item.description}
        </p>
      </div>
    </article>
  );
}
