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
        isActive: true,
        sortOrder: true,
      },
    });
    return Response.json({ plans });
  } catch (e) {
    const message = e instanceof Error ? e.message : "Failed to load plans";
    return Response.json({ plans: [], error: message });
  }
}

/** Normalize a string for fuzzy matching: lowercase, strip special chars, collapse spaces */
function normalize(s: string): string {
  return s
    .toLowerCase()
    .replace(/\.pdf$/i, "")
    .replace(/[_\-./\\()+,]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

/** Extract meaningful words (skip filler words) */
function getWords(s: string): string[] {
  const filler = new Set([
    "the", "a", "an", "and", "or", "of", "for", "with", "w", "to", "in",
    "plan", "plans", "benefit", "benefits", "summary", "sbc", "document",
    "2024", "2025", "2026", "2027", "kennion", "ken", "pdf",
  ]);
  return normalize(s).split(" ").filter((w) => w.length > 0 && !filler.has(w));
}

/** Score how well a filename matches a plan name (higher = better) */
function matchScore(planName: string, fileName: string): number {
  const planNorm = normalize(planName);
  const fileNorm = normalize(fileName);

  // Exact match (after normalization)
  if (planNorm === fileNorm) return 100;

  // One contains the other entirely
  if (fileNorm.includes(planNorm)) return 90;
  if (planNorm.includes(fileNorm)) return 85;

  // Word-based matching: how many plan name words appear in the filename?
  const planWords = getWords(planName);
  const fileWords = getWords(fileName);

  if (planWords.length === 0) return 0;

  const matchedWords = planWords.filter((pw) =>
    fileWords.some((fw) => fw === pw || fw.includes(pw) || pw.includes(fw))
  );

  const ratio = matchedWords.length / planWords.length;

  // All plan words found in filename
  if (ratio === 1) return 80;
  // Most words found (e.g., "Freedom" + "Gold" from "Freedom Gold")
  if (ratio >= 0.5 && matchedWords.length >= 2) return 60;

  return Math.round(ratio * 40);
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
      const fileName = file.name;

      // Score each plan and pick the best match
      let bestMatch: (typeof plans)[0] | null = null;
      let bestScore = 0;

      for (const plan of plans) {
        const score = matchScore(plan.name, fileName);
        if (score > bestScore) {
          bestScore = score;
          bestMatch = plan;
        }
      }

      // Require a minimum score of 50 to accept a match
      if (bestMatch && bestScore >= 50) {
        await prisma.plan.update({
          where: { id: bestMatch.id },
          data: {
            pdfData: buffer,
            pdfName: file.name,
            summaryUrl: `/api/plans/${bestMatch.id}/pdf`,
          },
        });
        results.push({ fileName: file.name, matched: true, planName: bestMatch.name });
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
