export async function register() {
  // Only run on server (not edge)
  if (typeof process !== "undefined" && process.env.DATABASE_URL) {
    try {
      const { ensureDatabase } = await import("@/lib/db");
      await ensureDatabase();
    } catch (e) {
      console.error("Instrumentation DB init failed:", e);
    }
  }
}
