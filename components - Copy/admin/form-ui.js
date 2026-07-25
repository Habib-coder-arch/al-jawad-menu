export const inputClass =
  "w-full rounded-lg border border-char-line bg-char px-3 py-2.5 font-body text-sm text-cream outline-none transition-colors focus:border-ember";

export function Field({ label, children }) {
  return (
    <div>
      <label className="mb-1 block font-body text-xs text-cream-muted">
        {label}
      </label>
      {children}
    </div>
  );
}
