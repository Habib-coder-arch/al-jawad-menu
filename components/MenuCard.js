import { CURRENCY, LBP_RATE } from "@/lib/constants";

export default function MenuCard({ item }) {
  const lbpPrice = Math.round(item.price * LBP_RATE).toLocaleString("en-US");

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

      {/* Fixed-width price column: same width on every row, so both the
          USD and LBP prices line up vertically down the whole list. */}
      <div className="price-rail flex w-24 flex-shrink-0 flex-col items-center justify-center gap-0.5 py-1 ps-2.5 text-center sm:w-28">
        <span dir="ltr" className="font-display text-lg font-extrabold leading-none text-saffron sm:text-xl">
          {CURRENCY}{item.price.toFixed(2)}
        </span>
        <span className="whitespace-nowrap font-body text-[10px] leading-tight text-cream-muted sm:text-[11px]">
          <span dir="ltr">{lbpPrice}</span> ل.ل
        </span>
      </div>
    </div>
  );
}
