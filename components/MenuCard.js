import { CURRENCY, LBP_RATE } from "@/lib/constants";

export default function MenuCard({ item }) {
  const lbpDisplay = Math.round(item.price).toLocaleString("en-US");
  const usdDisplay = (item.price / LBP_RATE).toFixed(2);

  return (
    <div className="flex items-center gap-3 py-4 transition-colors hover:bg-char-softer/40 sm:gap-4">
      <div className="min-w-0 flex-1">
        <h3 className="font-display text-base font-bold text-cream sm:text-lg">
          {item.name}
        </h3>
        <p className="mt-1 font-body text-xs italic leading-relaxed text-cream-muted sm:text-sm">
          {item.description}
        </p>
      </div>

      <div className="price-rail flex w-28 flex-shrink-0 flex-col items-center justify-center gap-0.5 py-1 ps-2.5 text-center sm:w-32">
        <span className="whitespace-nowrap font-display text-base font-extrabold leading-none text-saffron sm:text-lg">
          <span dir="ltr">{lbpDisplay}</span> ل.ل
        </span>
        <span dir="ltr" className="whitespace-nowrap font-body text-[10px] leading-tight text-cream-muted sm:text-[11px]">
          {CURRENCY}{usdDisplay}
        </span>
      </div>
    </div>
  );
}