import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { Field, inputClass } from "@/components/admin/form-ui";
import { updateItem } from "../../../actions";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "تعديل الصنف | لوحة تحكم مطعم الجواد",
};

export default async function EditItemPage({ params, searchParams }) {
  const id = Number(params.id);
  if (Number.isNaN(id)) notFound();

  const [item, categories] = await Promise.all([
    prisma.menuItem.findUnique({ where: { id } }),
    prisma.category.findMany({ orderBy: { order: "asc" } }),
  ]);

  if (!item) notFound();

  const hasError = searchParams?.error === "1";

  return (
    <div className="mx-auto max-w-lg">
      <Link
        href="/admin"
        className="mb-4 inline-flex items-center gap-1.5 font-body text-sm text-cream-muted transition-colors hover:text-cream"
      >
        <ArrowRight className="h-4 w-4" strokeWidth={2.25} />
        العودة إلى لوحة التحكم
      </Link>

      <h1 className="mb-6 font-display text-xl font-bold text-cream">
        تعديل الصنف
      </h1>

      {hasError && (
        <p className="mb-4 rounded-lg border border-red-900/40 bg-red-950/20 px-3 py-2 font-body text-xs text-red-400">
          يرجى تعبئة جميع الحقول المطلوبة بشكل صحيح.
        </p>
      )}

      <form
        action={updateItem}
        className="flex flex-col gap-4 rounded-2xl border border-char-line bg-char-soft p-5"
      >
        <input type="hidden" name="id" value={item.id} />

        <div className="flex items-center gap-3">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={item.imageUrl}
            alt={item.name}
            className="h-16 w-16 flex-shrink-0 rounded-lg object-cover"
          />
          <p className="font-body text-xs text-cream-muted">
            معاينة الصورة الحالية — عدّل الرابط أدناه لتغييرها
          </p>
        </div>

        <Field label="اسم الصنف">
          <input
            type="text"
            name="name"
            required
            defaultValue={item.name}
            className={inputClass}
          />
        </Field>

        <Field label="الوصف">
          <textarea
            name="description"
            required
            rows={3}
            defaultValue={item.description}
            className={inputClass}
          />
        </Field>

        <div className="grid grid-cols-2 gap-3">
          <Field label="السعر ($)">
            <input
              type="number"
              name="price"
              step="0.01"
              min="0"
              required
              defaultValue={item.price}
              className={inputClass}
            />
          </Field>

          <Field label="القسم">
            <select
              name="categoryId"
              required
              defaultValue={item.categoryId}
              className={inputClass}
            >
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </Field>
        </div>

        <Field label="رابط الصورة">
          <input
            type="url"
            name="imageUrl"
            required
            defaultValue={item.imageUrl}
            className={inputClass}
          />
        </Field>

        <label className="flex items-center gap-2 font-body text-sm text-cream">
          <input
            type="checkbox"
            name="isAvailable"
            defaultChecked={item.isAvailable}
            className="h-5 w-5 rounded border-char-line accent-ember"
          />
          متاح للطلب حالياً
        </label>

        <button
          type="submit"
          className="mt-2 rounded-lg bg-ember py-3 font-body text-sm font-semibold text-cream shadow-pill transition-opacity hover:opacity-90"
        >
          حفظ التعديلات
        </button>
      </form>
    </div>
  );
}
