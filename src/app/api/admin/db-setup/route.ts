import { prisma, ensureDatabase } from "@/lib/db";

/** Check DB status — also triggers table creation if needed */
export async function GET() {
  // Always try to create tables first
  await ensureDatabase();

  const results: Record<string, string> = {};

  const tables = [
    { name: "Plan", fn: () => prisma.plan.count() },
    { name: "ChatSession", fn: () => prisma.chatSession.count() },
    { name: "ChatMessage", fn: () => prisma.chatMessage.count() },
    { name: "AIMemoryRule", fn: () => prisma.aIMemoryRule.count() },
    { name: "Employer", fn: () => prisma.employer.count() },
    { name: "ContactInquiry", fn: () => prisma.contactInquiry.count() },
    { name: "Resource", fn: () => prisma.resource.count() },
  ];

  for (const table of tables) {
    try {
      const count = await table.fn();
      results[table.name] = `OK (${count} rows)`;
    } catch (e) {
      results[table.name] = `ERROR: ${e instanceof Error ? e.message.split("\n")[0] : "unknown"}`;
    }
  }

  return Response.json({
    database: process.env.DATABASE_URL ? "configured" : "MISSING DATABASE_URL",
    tables: results,
  });
}
