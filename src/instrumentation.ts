export async function register() {
  // Only run in the Node.js server runtime. Middleware runs on the edge
  // runtime, where Prisma cannot connect, so skip it there.
  if (process.env.NEXT_RUNTIME === "nodejs" && process.env.DATABASE_URL) {
    try {
      const { ensureDatabase } = await import("@/lib/db");
      await ensureDatabase();
    } catch (e) {
      console.error("Instrumentation DB init failed:", e);
    }
  }
}
