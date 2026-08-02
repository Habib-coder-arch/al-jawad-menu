import Link from "next/link";
import { Plus, Pencil, ImageOff } from "lucide-react";
import { prisma } from "@/lib/prisma";
import ConfirmDeleteButton from "@/components/admin/ConfirmDeleteButton";
import ShareMenuButton from "@/components/admin/ShareMenuButton";
import { deleteItem, createCategory, deleteCategory } from "./actions";

export const dynamic = "force-dynamic";

export default async function AdminDashboardPage() {
  const categories = await prisma.category.findMany({
    orderBy: { order: "asc" },
    include: { items: { orderBy: { id: "asc" } } },
  });

  const totalItems = categories.reduce((sum, c) => sum + c.items.length, 0);

  return (
    <div>
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="font-display text-xl font-bold text-cream sm:text-2xl">إدارة القائمة</h1>
          <p className="font-body text-sm text-cream-muted">{categories.length} أقسام · {totalItems} صنف</p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <ShareMenuButton />
          <Link href="/admin/items/new" className="flex items-center gap-1.5 rounded-lg bg-ember px-4 py-2 font-body text-sm font-semibold text-cream shadow-pill transition-opacity hover:opacity-90">
            <Plus className="h-4 w-4" strokeWidth={2.5} />
            إضافة صنف جديد
          </Link>
        </div>
      </div>

      <section className="mb-6 rounded-xl border border-char-line bg-char-soft p-3">
        <p className="mb-2 font-body text-xs text-cream-muted">الأقسام</p>
        <div className="flex flex-wrap items-center gap-2">
          {categories.map((cat) => (
            <div key={cat.id} className="flex items-center gap-1.5 rounded-full bg-char py-1 pe-1.5 ps-3 font-body text-xs text-cream">
              {cat.name}
              <form action={deleteCategory}>
                <input type="hidden" name="id" value={cat.id} />
                <ConfirmDeleteButton
                  iconOnly
                  label="حذف القسم"
                  confirmMessage={`سيتم حذف قسم "${cat.name}" مع كل الأصناف بداخله (${cat.items.length} صنف). هل أنت متأكد؟`}
                />
              </form>
            </div>
          ))}

          <form action={createCategory} className="flex items-center gap-1.5">
            <input type="text" name="name" required placeholder="اسم قسم جديد" className="w-32 rounded-full border border-char-line bg-char px-3 py-1.5 font-body text-xs text-cream outline-none focus:border-ember sm:w-40" />
            <button type="submit" title="إضافة قسم" className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-ember/20 text-ember transition-colors hover:bg-ember/30">
              <Plus className="h-4 w-4" strokeWidth={2.5} />
            </button>
          </form>
        </div>
      </section>

      {categories.length === 0 && (
        <p className="rounded-xl border border-char-line bg-char-soft p-6 text-center font-body text-sm text-cream-muted">
          لا توجد أقسام بعد — أضف قسماً من الأعلى للبدء.
        </p>
      )}

      {categories.map((cat) => (
        <section key={cat.id} className="mb-8">
          <h2 className="mb-3 flex items-center gap-2 font-display text-base font-bold text-saffron">
            {cat.name}
            <span className="font-body text-xs font-normal text-cream-muted">({cat.items.length})</span>
          </h2>

          {cat.items.length === 0 ? (
            <p className="rounded-xl border border-char-line bg-char-soft p-4 font-body text-sm text-cream-muted">
              لا توجد أصناف في هذا القسم بعد.
            </p>
          ) : (
            <>
              <div className="hidden overflow-hidden rounded-xl border border-char-line sm:block">
                <table className="w-full border-collapse text-right">
                  <thead>
                    <tr className="bg-char-soft">
                      <th className="px-4 py-3 font-body text-xs font-medium text-cream-muted">الصورة</th>
                      <th className="px-4 py-3 font-body text-xs font-medium text-cream-muted">الاسم</th>
                      <th className="px-4 py-3 font-body text-xs font-medium text-cream-muted">السعر</th>
                      <th className="px-4 py-3 font-body text-xs font-medium text-cream-muted">الحالة</th>
                      <th className="px-4 py-3 font-body text-xs font-medium text-cream-muted">إجراءات</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-char-line">
                    {cat.items.map((item) => (
                      <tr key={item.id} className="bg-char-soft/40">
                        <td className="px-4 py-3">
                          <ItemThumb imageUrl={item.imageUrl} name={item.name} size="h-12 w-12" />
                        </td>
                        <td className="max-w-xs px-4 py-3 font-body text-sm font-medium text-cream">{item.name}</td>
                        <td className="whitespace-nowrap px-4 py-3 font-body text-sm text-saffron" dir="ltr">
                          {Math.round(item.price).toLocaleString("en-US")} ل.ل
                        </td>
                        <td className="px-4 py-3">
                          <StatusBadge available={item.isAvailable} />
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex gap-2">
                            <Link href={`/admin/items/${item.id}/edit`} className="flex items-center gap-1 rounded-lg border border-char-line px-2.5 py-1.5 text-xs text-cream-muted transition-colors hover:border-ember/50 hover:text-cream">
                              <Pencil className="h-3.5 w-3.5" strokeWidth={2.25} />
                              تعديل
                            </Link>
                            <form action={deleteItem}>
                              <input type="hidden" name="id" value={item.id} />
                              <ConfirmDeleteButton label="حذف" confirmMessage={`سيتم حذف "${item.name}" نهائياً. هل أنت متأكد؟`} />
                            </form>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="flex flex-col gap-2 sm:hidden">
                {cat.items.map((item) => (
                  <div key={item.id} className="flex items-center gap-3 rounded-xl border border-char-line bg-char-soft p-3">
                    <ItemThumb imageUrl={item.imageUrl} name={item.name} size="h-14 w-14" />
                    <div className="min-w-0 flex-1">
                      <p className="truncate font-body text-sm font-semibold text-cream">{item.name}</p>
                      <p className="font-body text-xs text-saffron" dir="ltr">
                        {Math.round(item.price).toLocaleString("en-US")} ل.ل
                      </p>
                      <div className="mt-1">
                        <StatusBadge available={item.isAvailable} />
                      </div>
                    </div>
                    <div className="flex flex-shrink-0 flex-col gap-1.5">
                      <Link href={`/admin/items/${item.id}/edit`} title="تعديل" className="rounded-lg border border-char-line p-1.5 text-cream-muted transition-colors hover:border-ember/50 hover:text-cream">
                        <Pencil className="h-3.5 w-3.5" strokeWidth={2.25} />
                      </Link>
                      <form action={deleteItem}>
                        <input type="hidden" name="id" value={item.id} />
                        <ConfirmDeleteButton label="حذف" iconOnly confirmMessage={`سيتم حذف "${item.name}" نهائياً. هل أنت متأكد؟`} />
                      </form>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </section>
      ))}
    </div>
  );
}

function ItemThumb({ imageUrl, name, size }) {
  if (imageUrl) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img src={imageUrl} alt={name} className={`${size} flex-shrink-0 rounded-lg object-cover`} />
    );
  }

  return (
    <div className={`${size} flex flex-shrink-0 items-center justify-center rounded-lg border border-dashed border-char-line bg-char text-cream-muted`}>
      <ImageOff className="h-4 w-4" strokeWidth={1.75} />
    </div>
  );
}

function StatusBadge({ available }) {
  return (
    <span className={`inline-block rounded-full px-2 py-0.5 font-body text-[11px] ${available ? "bg-emerald-500/15 text-emerald-400" : "bg-char-line text-cream-muted"}`}>
      {available ? "متاح" : "غير متاح"}
    </span>
  );
}