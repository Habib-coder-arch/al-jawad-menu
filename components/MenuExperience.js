"use client";

import { useEffect, useRef, useState } from "react";
import {
  Salad,
  UtensilsCrossed,
  CupSoda,
  IceCreamCone,
} from "lucide-react";
import MenuCard from "./MenuCard";

// Category model has no icon field in the DB — cycle through a small icon
// pool by position so every pill still gets a friendly glyph.
const ICON_POOL = [Salad, UtensilsCrossed, CupSoda, IceCreamCone];

const HEADER_OFFSET = 64; // height of the sticky pill bar, for scroll offset

export default function MenuExperience({ categories }) {
  const [activeId, setActiveId] = useState(categories[0]?.id ?? null);
  const sectionRefs = useRef({});
  const pillRefs = useRef({});
  const isClickScrolling = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (isClickScrolling.current) return;

        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);

        if (visible.length > 0) {
          setActiveId(Number(visible[0].target.dataset.categoryId));
        }
      },
      {
        rootMargin: `-${HEADER_OFFSET + 8}px 0px -60% 0px`,
        threshold: 0.01,
      }
    );

    Object.values(sectionRefs.current).forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [categories]);

  useEffect(() => {
    const pill = pillRefs.current[activeId];
    if (pill) {
      pill.scrollIntoView({
        behavior: "smooth",
        inline: "center",
        block: "nearest",
      });
    }
  }, [activeId]);

  const handlePillClick = (id) => {
    setActiveId(id);
    const section = sectionRefs.current[id];
    if (section) {
      isClickScrolling.current = true;
      const top =
        section.getBoundingClientRect().top +
        window.scrollY -
        HEADER_OFFSET;
      window.scrollTo({ top, behavior: "smooth" });
      window.setTimeout(() => {
        isClickScrolling.current = false;
      }, 700);
    }
  };

  if (categories.length === 0) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-16 text-center">
        <p className="font-body text-cream-muted">
          لا توجد أصناف متاحة حالياً — يرجى تشغيل سكربت البذور (seed) لتعبئة
          القائمة.
        </p>
      </div>
    );
  }

  return (
    <div>
      {/* Sticky category pill rail */}
      <nav className="sticky top-0 z-20 border-b border-char-line bg-char/95 backdrop-blur">
        <div
          className="no-scrollbar pill-rail mx-auto flex max-w-3xl gap-2 overflow-x-auto px-4 py-3"
          role="tablist"
          aria-label="فئات القائمة"
        >
          {categories.map((cat, index) => {
            const Icon = ICON_POOL[index % ICON_POOL.length];
            const isActive = activeId === cat.id;
            return (
              <button
                key={cat.id}
                ref={(el) => (pillRefs.current[cat.id] = el)}
                role="tab"
                aria-selected={isActive}
                onClick={() => handlePillClick(cat.id)}
                className={`relative flex flex-shrink-0 items-center gap-1.5 rounded-full px-4 py-2 font-body text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? "pill-active-tip bg-ember text-cream shadow-pill"
                    : "bg-char-soft text-cream-muted hover:bg-char-softer hover:text-cream"
                }`}
              >
                <Icon className="h-4 w-4" strokeWidth={2.25} />
                {cat.name}
              </button>
            );
          })}
        </div>
      </nav>

      {/* Menu sections */}
      <div className="mx-auto max-w-3xl px-4 pb-16 pt-6">
        {categories.map((cat) => (
          <section
            key={cat.id}
            id={`cat-${cat.id}`}
            data-category-id={cat.id}
            ref={(el) => (sectionRefs.current[cat.id] = el)}
            className="mb-10 scroll-mt-16"
          >
            <div className="mb-4 flex items-baseline gap-3">
              <h2 className="font-display text-xl font-extrabold text-cream sm:text-2xl">
                {cat.name}
              </h2>
              <div className="h-px flex-1 bg-char-line" />
            </div>

            {cat.items.length === 0 ? (
              <p className="font-body text-sm text-cream-muted">
                لا توجد أصناف متاحة في هذا القسم حالياً.
              </p>
            ) : (
              <div className="flex flex-col gap-3 sm:gap-4">
                {cat.items.map((item) => (
                  <MenuCard key={item.id} item={item} />
                ))}
              </div>
            )}
          </section>
        ))}
      </div>
    </div>
  );
}
