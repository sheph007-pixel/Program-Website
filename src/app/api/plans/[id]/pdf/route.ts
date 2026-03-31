import { NextRequest } from "next/server";
import { prisma } from "@/lib/db";

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  try {
    const plan = await prisma.plan.findUnique({
      where: { id },
      select: { pdfData: true, pdfName: true, name: true },
    });

    if (!plan?.pdfData) {
      return new Response("PDF not found", { status: 404 });
    }

    const fileName = plan.pdfName || `${plan.name}.pdf`;

    return new Response(plan.pdfData, {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `inline; filename="${fileName}"`,
        "Cache-Control": "public, max-age=3600",
      },
    });
  } catch {
    return new Response("Error", { status: 500 });
  }
}
