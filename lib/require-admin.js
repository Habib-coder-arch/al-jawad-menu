// Server-action guard. Middleware already protects every /admin/* request
// (including the POSTs that server actions arrive as), but this is a cheap
// second check directly in each mutation, in case an action is ever called
// from a context middleware doesn't cover.
//
// Node-runtime only (uses next/headers) — do not import this from
// middleware.js or lib/auth.js, which must stay Edge-compatible.

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { verifySessionToken, SESSION_COOKIE } from "@/lib/auth";

export async function requireAdmin() {
  const token = cookies().get(SESSION_COOKIE)?.value;
  const isAuthenticated = await verifySessionToken(token);

  if (!isAuthenticated) {
    redirect("/admin/login");
  }
}
