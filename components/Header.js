import { Flame } from "lucide-react";

export default function Header() {
  return (
    <header className="relative overflow-hidden bg-char-soft border-b border-char-line">
      {/* ambient glow accents */}
      <div className="pointer-events-none absolute -top-16 -right-10 h-40 w-40 rounded-full bg-ember/25 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-10 -left-10 h-32 w-32 rounded-full bg-saffron/20 blur-3xl" />

      <div className="relative mx-auto max-w-3xl px-5 pt-8 pb-6 text-center sm:pt-12 sm:pb-8">
        <div className="mb-3 flex items-center justify-center gap-2 text-saffron">
          <Flame className="h-4 w-4" strokeWidth={2.5} />
          <span className="font-body text-xs tracking-[0.3em] text-saffron/90">
            AL-JAWAD RESTAURANT
          </span>
          <Flame className="h-4 w-4" strokeWidth={2.5} />
        </div>

        <h1 className="font-display text-4xl font-extrabold text-cream sm:text-5xl">
          مطعم الجواد
        </h1>

        <p className="mx-auto mt-3 max-w-sm font-body text-sm leading-relaxed text-cream-muted sm:text-base">
          نكهات أصيلة من المطبخ العربي، تُحضّر بشغف وتُقدّم بحب — قائمتنا لهذا اليوم
        </p>
      </div>
    </header>
  );
}
