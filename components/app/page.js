import Header from "@/components/Header";
import MenuExperience from "@/components/MenuExperience";
import { prisma } from "@/lib/prisma";

// Always fetch fresh data from the database — menu availability can change
// (e.g. an item marked unavailable), so we don't want a stale static build.
export const dynamic = "force-dynamic";

export default async function HomePage() {
  const categories = await prisma.category.findMany({
    orderBy: { order: "asc" },
    include: {
      items: {
        where: { isAvailable: true },
        orderBy: { id: "asc" },
      },
    },
  });

  return (
    <main className="min-h-screen bg-char">
      <Header />
      <MenuExperience categories={categories} />

      <footer className="border-t border-char-line px-4 py-8 text-center">
        <p className="font-body text-xs text-cream-muted">
          مطعم الجواد © {new Date().getFullYear()} — جميع الحقوق محفوظة
        </p>
      </footer>
    </main>
  );
}
