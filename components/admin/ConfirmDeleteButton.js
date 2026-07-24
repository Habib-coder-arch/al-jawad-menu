"use client";

import { useFormStatus } from "react-dom";
import { Trash2 } from "lucide-react";

export default function ConfirmDeleteButton({
  confirmMessage = "هل أنت متأكد من الحذف؟ لا يمكن التراجع عن هذا الإجراء.",
  label = "حذف",
  iconOnly = false,
}) {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      onClick={(e) => {
        if (!window.confirm(confirmMessage)) {
          e.preventDefault();
        }
      }}
      title={label}
      className="flex items-center gap-1 rounded-lg border border-red-900/40 px-2.5 py-1.5 text-xs text-red-400 transition-colors hover:bg-red-950/30 disabled:cursor-not-allowed disabled:opacity-50"
    >
      <Trash2 className="h-3.5 w-3.5" strokeWidth={2.25} />
      {!iconOnly && (pending ? "جارٍ الحذف..." : label)}
    </button>
  );
}
