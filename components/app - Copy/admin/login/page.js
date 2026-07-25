import { LockKeyhole } from "lucide-react";
import { login } from "./actions";

export const metadata = {
  title: "تسجيل الدخول | لوحة تحكم مطعم الجواد",
};

export default function AdminLoginPage({ searchParams }) {
  const hasError = searchParams?.error === "1";

  return (
    <main className="flex min-h-screen items-center justify-center bg-char px-4">
      <form
        action={login}
        className="w-full max-w-sm rounded-2xl border border-char-line bg-char-soft p-6 shadow-card"
      >
        <div className="mb-6 flex flex-col items-center gap-2 text-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-ember/15 text-ember">
            <LockKeyhole className="h-6 w-6" strokeWidth={2.25} />
          </div>
          <h1 className="font-display text-lg font-bold text-cream">
            لوحة تحكم مطعم الجواد
          </h1>
          <p className="font-body text-sm text-cream-muted">
            أدخل كلمة المرور للمتابعة
          </p>
        </div>

        <label
          htmlFor="password"
          className="mb-1 block font-body text-xs text-cream-muted"
        >
          كلمة المرور
        </label>
        <input
          id="password"
          type="password"
          name="password"
          required
          autoFocus
          autoComplete="current-password"
          className="mb-3 w-full rounded-lg border border-char-line bg-char px-3 py-2.5 font-body text-sm text-cream outline-none transition-colors focus:border-ember"
        />

        {hasError && (
          <p className="mb-3 font-body text-xs text-red-400">
            كلمة المرور غير صحيحة، حاول مرة أخرى.
          </p>
        )}

        <button
          type="submit"
          className="w-full rounded-lg bg-ember py-2.5 font-body text-sm font-semibold text-cream shadow-pill transition-opacity hover:opacity-90"
        >
          تسجيل الدخول
        </button>
      </form>
    </main>
  );
}
