import { Flame, Phone, MapPin } from "lucide-react";
import Ornament from "./Ornament";

export default function Header() {
  return (
    <header className="relative overflow-hidden bg-char-soft">
      <div className="pointer-events-none absolute -top-16 -right-10 h-40 w-40 rounded-full bg-ember/25 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-10 -left-10 h-32 w-32 rounded-full bg-saffron/20 blur-3xl" />
      <div className="relative border-t-2 border-saffron/40">
        <div className="h-1 border-t border-saffron/15" />
      </div>
      <div className="relative mx-auto max-w-3xl px-5 pt-7 pb-6 text-center sm:pt-10 sm:pb-8">
        <div className="mb-3 flex items-center justify-center gap-2 text-saffron">
          <Flame className="h-4 w-4" strokeWidth={2.5} />
          <span className="font-body text-xs tracking-[0.3em] text-saffron/90">AL-JAWAD RESTAURANT</span>
          <Flame className="h-4 w-4" strokeWidth={2.5} />
        </div>
        <h1 className="font-display text-4xl font-extrabold tracking-tight text-cream drop-shadow-sm sm:text-5xl">مطعم الجواد</h1>
        <p className="mx-auto mt-3 max-w-sm font-body text-sm italic leading-relaxed text-cream-muted sm:text-base">نكهات أصيلة من المطبخ العربي، تُحضّر بشغف وتُقدّم بحب — قائمتنا لهذا اليوم</p>
        <Ornament className="mx-auto mt-5 max-w-[220px]" />
        <div className="mt-4 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 font-body text-xs text-cream-muted sm:text-sm">
          <a href="tel:76029150" className="flex items-center gap-1.5 transition-colors hover:text-saffron">
            <Phone className="h-3.5 w-3.5 text-saffron" strokeWidth={2.25} />
            <span dir="ltr">76 029 150</span>
          </a>
          <span className="flex items-center gap-1.5">
            <MapPin className="h-3.5 w-3.5 text-saffron" strokeWidth={2.25} />
            يحمر الغربي، البقاع
          </span>
        </div>
      </div>
      <div className="relative border-b border-saffron/15">
        <div className="h-1 border-b-2 border-saffron/40" />
      </div>
    </header>
  );
}