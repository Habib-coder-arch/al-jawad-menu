import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { Field, inputClass } from "@/components/admin/form-ui";
import { createItem } from "../../actions";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "إضافة صنف جديد | لوحة تحكم مطعم الجواد",
};

export default async function NewItemPage({ searchParams }) {
  const categories = await prisma.category.findMany({ orderBy: { order: "asc" } });
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
        إضافة صنف جديد
      </h1>

      {hasError && (
        <p className="mb-4 rounded-lg border border-red-900/40 bg-red-950/20 px-3 py-2 font-body text-xs text-red-400">
          يرجى تعبئة جميع الحقول المطلوبة بشكل صحيح.
        </p>
      )}

      {categories.length === 0 ? (
        <p className="rounded-xl border border-char-line bg-char-soft p-5 font-body text-sm text-cream-muted">
          يجب إضافة قسم واحد على الأقل من لوحة التحكم قبل إضافة أصناف.
        </p>
      ) : (
        <form
          action={createItem}
          className="flex flex-col gap-4 rounded-2xl border border-char-line bg-char-soft p-5"
        >
          <Field label="اسم الصنف">
            <input
              type="text"
              name="name"
              required
              className={inputClass}
              placeholder="مثال: حمص بالطحينة"
            />
          </Field>

          <Field label="الوصف">
            <textarea
              name="description"
              required
              rows={3}
              className={inputClass}
              placeholder="وصف قصير وشهي للصنف"
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
                className={inputClass}
                placeholder="0.00"
              />
            </Field>

            <Field label="القسم">
              <select
                name="categoryId"
                required
                defaultValue=""
                className={inputClass}
              >
                <option value="" disabled>
                  اختر القسم
                </option>
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
              className={inputClass}
              placeholder="https://..."
            />
          </Field>

          <label className="flex items-center gap-2 font-body text-sm text-cream">
            <input
              type="checkbox"
              name="isAvailable"
              defaultChecked
              className="h-5 w-5 rounded border-char-line accent-ember"
            />
            متاح للطلب حالياً
          </label>

          <button
            type="submit"
            className="mt-2 rounded-lg bg-ember py-3 font-body text-sm font-semibold text-cream shadow-pill transition-opacity hover:opacity-90"
          >
            حفظ الصنف
          </button>
        </form>
      )}
    </div>
  );
}
