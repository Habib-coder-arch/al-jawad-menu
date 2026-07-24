// Prisma client singleton.
// In dev, Next.js hot-reloads modules, which would otherwise create a new
// PrismaClient (and a new SQLite connection) on every file save. Stashing
// the instance on globalThis avoids that.

import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis;

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    log: process.env.NODE_ENV === "development" ? ["warn", "error"] : ["error"],
  });

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}
