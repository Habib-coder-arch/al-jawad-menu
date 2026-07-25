import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { LayoutDashboard, LogOut } from "lucide-react";
import { verifySessionToken, SESSION_COOKIE } from "@/lib/auth";
import { logout } from "../login/actions";

// Defense in depth: middleware already gates /admin/*, but re-checking the
// session here means this layout is safe even if it's ever reached another
// way (e.g. a future direct server-side render path that bypasses middleware).
export default async function AdminDashboardLayout({ children }) {
  const token = cookies().get(SESSION_COOKIE)?.value;
  const isAuthenticated = await verifySessionToken(token);

  if (!isAuthenticated) {
    redirect("/admin/login");
  }

  return (
    <div className="min-h-screen bg-char">
      <header className="sticky top-0 z-30 border-b border-char-line bg-char-soft/95 backdrop-blur">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3 sm:px-6">
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-ember/15 text-ember">
              <LayoutDashboard className="h-4.5 w-4.5" strokeWidth={2.25} />
            </div>
            <div>
              <p className="font-display text-sm font-bold leading-tight text-cream sm:text-base">
                لوحة تحكم مطعم الجواد
              </p>
              <p className="font-body text-[11px] leading-tight text-cream-muted">
                Admin Dashboard
              </p>
            </div>
          </div>

          <form action={logout}>
            <button
              type="submit"
              className="flex items-center gap-1.5 rounded-lg border border-char-line px-3 py-1.5 font-body text-xs text-cream-muted transition-colors hover:border-ember/50 hover:text-cream"
            >
              <LogOut className="h-3.5 w-3.5" strokeWidth={2.25} />
              تسجيل الخروج
            </button>
          </form>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-4 py-6 sm:px-6">{children}</main>
    </div>
  );
}
