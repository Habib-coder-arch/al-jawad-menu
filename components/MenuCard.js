import { CURRENCY, LBP_RATE } from "@/lib/constants";

export default function MenuCard({ item }) {
  const lbpPrice = Math.round(item.price * LBP_RATE).toLocaleString("en-US");

  return (
    <article className="group flex items-center gap-3 rounded-2xl border border-char-line bg-char-soft p-3 shadow-card transition-all duration-200 hover:-translate-y-0.5 hover:border-ember/40 hover:shadow-lg sm:gap-4 sm:p-4">
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
        <h3 className="truncate font-display text-base font-bold text-cream sm:text-lg">
          {item.name}
        </h3>
        <p className="mt-1 line-clamp-2 font-body text-xs italic leading-relaxed text-cream-muted sm:text-sm">
          {item.description}
        </p>
      </div>

      {/* Fixed-width price column: same width on every card, so both the
          USD and LBP prices line up vertically down the whole page. */}
      <div className="price-rail flex w-24 flex-shrink-0 flex-col items-center justify-center gap-0.5 py-1 ps-2.5 text-center sm:w-28">
        <span dir="ltr" className="font-display text-lg font-extrabold leading-none text-saffron sm:text-xl">
          {CURRENCY}{item.price.toFixed(2)}
        </span>
        <span className="whitespace-nowrap font-body text-[10px] leading-tight text-cream-muted sm:text-[11px]">
          <span dir="ltr">{lbpPrice}</span> ل.ل
        </span>
      </div>
    </article>
  );
}