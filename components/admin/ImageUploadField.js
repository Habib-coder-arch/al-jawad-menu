"use client";

import { useState } from "react";
import { ImagePlus } from "lucide-react";

export default function ImageUploadField({
  name = "image",
  currentImageUrl = null,
  required = false,
}) {
  const [preview, setPreview] = useState(currentImageUrl);

  function handleChange(e) {
    const file = e.target.files?.[0];
    if (file) {
      setPreview(URL.createObjectURL(file));
    }
  }

  return (
    <div>
      <label className="mb-1 block font-body text-xs text-cream-muted">
        صورة الصنف (اختياري)
      </label>

      <label
        htmlFor={name}
        className="flex cursor-pointer flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed border-char-line bg-char px-4 py-6 text-center transition-colors hover:border-ember/50"
      >
        {preview ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={preview}
            alt="معاينة الصورة"
            className="h-28 w-28 rounded-lg object-cover"
          />
        ) : (
          <ImagePlus className="h-8 w-8 text-cream-muted" strokeWidth={1.75} />
        )}

        <span className="font-body text-xs font-medium text-saffron">
          {preview ? "تغيير الصورة" : "اختر صورة من الجهاز"}
        </span>

        <input
          id={name}
          name={name}
          type="file"
          accept="image/*"
          required={required}
          onChange={handleChange}
          className="sr-only"
        />
      </label>

      {currentImageUrl ? (
        <p className="mt-1.5 font-body text-[11px] text-cream-muted">
          اترك هذا الحقل بدون تغيير للاحتفاظ بالصورة الحالية
        </p>
      ) : (
        <p className="mt-1.5 font-body text-[11px] text-cream-muted">
          الصورة غير مطلوبة — القائمة الحالية للزبائن لا تعرض الصور
        </p>
      )}
    </div>
  );
}
