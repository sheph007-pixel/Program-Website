import { NextRequest } from "next/server";
import { prisma } from "@/lib/db";

export async function GET() {
  try {
    const plans = await prisma.plan.findMany({
      orderBy: [{ category: "asc" }, { sortOrder: "asc" }],
      select: {
        id: true,
        name: true,
        category: true,
        summaryUrl: true,
        pdfName: true,
        pdfData: false,
        isActive: true,
        sortOrder: true,
      },
    });
    return Response.json({ plans });
  } catch {
    return Response.json({ plans: [] });
  }
}

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const files = formData.getAll("files") as File[];

    if (files.length === 0) {
      return Response.json({ error: "No files" }, { status: 400 });
    }

    // Get all plans for matching
    const plans = await prisma.plan.findMany({
      select: { id: true, name: true, category: true },
    });

    const results: { fileName: string; matched: boolean; planName?: string }[] = [];

    for (const file of files) {
      const buffer = Buffer.from(await file.arrayBuffer());
      const fileName = file.name.replace(/\.pdf$/i, "").trim();

      // Try to match by plan name (fuzzy)
      const match = plans.find((p) => {
        const planLower = p.name.toLowerCase();
        const fileLower = fileName.toLowerCase();
        return planLower === fileLower || fileLower.includes(planLower) || planLower.includes(fileLower);
      });

      if (match) {
        await prisma.plan.update({
          where: { id: match.id },
          data: {
            pdfData: buffer,
            pdfName: file.name,
            summaryUrl: `/api/plans/${match.id}/pdf`,
          },
        });
        results.push({ fileName: file.name, matched: true, planName: match.name });
      } else {
        results.push({ fileName: file.name, matched: false });
      }
    }

    return Response.json({ results });
  } catch (e) {
    const message = e instanceof Error ? e.message : "Upload failed";
    return Response.json({ error: message }, { status: 500 });
  }
}
