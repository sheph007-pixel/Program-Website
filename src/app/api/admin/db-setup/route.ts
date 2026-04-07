import { prisma } from "@/lib/db";
import { execSync } from "child_process";

/** Check DB status */
export async function GET() {
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

/** Run prisma db push to create tables */
export async function POST() {
  try {
    const output = execSync("npx prisma db push --accept-data-loss", {
      encoding: "utf-8",
      timeout: 30000,
      env: { ...process.env },
    });

    return Response.json({ success: true, output });
  } catch (e) {
    const message = e instanceof Error ? e.message : "Migration failed";
    return Response.json({ success: false, error: message }, { status: 500 });
  }
}
