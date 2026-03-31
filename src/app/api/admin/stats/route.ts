import { prisma } from "@/lib/db";

export async function GET() {
  try {
    const [total, newCount, ticketsSent, activeRules] = await Promise.all([
      prisma.chatSession.count(),
      prisma.chatSession.count({ where: { status: "new" } }),
      prisma.chatSession.count({ where: { ticketSent: true } }),
      prisma.aIMemoryRule.count({ where: { isActive: true } }),
    ]);

    return Response.json({ total, newCount, ticketsSent, activeRules });
  } catch {
    return Response.json({ total: 0, newCount: 0, ticketsSent: 0, activeRules: 0 });
  }
}
