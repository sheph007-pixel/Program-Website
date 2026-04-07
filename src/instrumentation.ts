import { ensureDatabase } from "@/lib/db";

export async function register() {
  await ensureDatabase();
}
