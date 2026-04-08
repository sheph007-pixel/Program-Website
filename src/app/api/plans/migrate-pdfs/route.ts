import { prisma, ensureDatabase } from "@/lib/db";

/**
 * Auto-download PDFs from SharePoint sharing links and store in database.
 * This migrates plans from external links to internally-hosted PDFs.
 */
export async function GET() {
  try {
    await ensureDatabase();

    const plans = await prisma.plan.findMany({
      orderBy: [{ category: "asc" }, { sortOrder: "asc" }],
      select: {
        id: true,
        name: true,
        summaryUrl: true,
        externalUrl: true,
        pdfName: true,
      },
    });

    const results: {
      success: { name: string; size: number }[];
      skipped: { name: string; reason: string }[];
      failed: { name: string; error: string }[];
    } = { success: [], skipped: [], failed: [] };

    for (const plan of plans) {
      // Skip plans that already have internal PDF URLs
      if (plan.summaryUrl.startsWith("/api/plans/")) {
        results.skipped.push({ name: plan.name, reason: "Already has internal PDF" });
        continue;
      }

      // Skip non-SharePoint URLs (like ethoslife.com)
      if (!plan.summaryUrl.includes("sharepoint.com")) {
        results.skipped.push({ name: plan.name, reason: "Not a SharePoint URL" });
        continue;
      }

      try {
        // Convert SharePoint sharing link to download URL
        const downloadUrl = plan.summaryUrl + (plan.summaryUrl.includes("?") ? "&" : "?") + "download=1";

        const response = await fetch(downloadUrl, {
          redirect: "follow",
          headers: {
            "User-Agent": "Mozilla/5.0 (compatible; KennionBot/1.0)",
          },
        });

        if (!response.ok) {
          // Try alternate download approach - modify the SharePoint URL format
          const altResponse = await fetch(plan.summaryUrl, {
            redirect: "follow",
            headers: {
              "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
            },
          });

          if (!altResponse.ok) {
            results.failed.push({
              name: plan.name,
              error: `HTTP ${response.status} (download) / ${altResponse.status} (direct)`,
            });
            continue;
          }

          // Check if we got a PDF
          const contentType = altResponse.headers.get("content-type") || "";
          if (contentType.includes("text/html")) {
            // Got HTML page instead of PDF - try extracting download link
            results.failed.push({
              name: plan.name,
              error: "Got HTML page instead of PDF. SharePoint requires browser access.",
            });
            continue;
          }

          const buffer = Buffer.from(await altResponse.arrayBuffer());
          if (buffer.length < 1000) {
            results.failed.push({
              name: plan.name,
              error: `Response too small (${buffer.length} bytes) - likely not a PDF`,
            });
            continue;
          }

          await prisma.plan.update({
            where: { id: plan.id },
            data: {
              pdfData: buffer,
              pdfName: `${plan.name}.pdf`,
              summaryUrl: `/api/plans/${plan.id}/pdf`,
              externalUrl: plan.externalUrl || plan.summaryUrl,
            },
          });

          results.success.push({ name: plan.name, size: buffer.length });
          continue;
        }

        // Check content type
        const contentType = response.headers.get("content-type") || "";
        if (contentType.includes("text/html")) {
          results.failed.push({
            name: plan.name,
            error: "Got HTML page instead of PDF from download URL",
          });
          continue;
        }

        const buffer = Buffer.from(await response.arrayBuffer());

        // Sanity check - PDFs are at least a few KB
        if (buffer.length < 1000) {
          results.failed.push({
            name: plan.name,
            error: `Response too small (${buffer.length} bytes) - likely not a PDF`,
          });
          continue;
        }

        // Check for PDF magic bytes
        const header = buffer.subarray(0, 5).toString("ascii");
        if (header !== "%PDF-") {
          results.failed.push({
            name: plan.name,
            error: `Not a PDF file (header: ${header.substring(0, 10)})`,
          });
          continue;
        }

        await prisma.plan.update({
          where: { id: plan.id },
          data: {
            pdfData: buffer,
            pdfName: `${plan.name}.pdf`,
            summaryUrl: `/api/plans/${plan.id}/pdf`,
            externalUrl: plan.externalUrl || plan.summaryUrl,
          },
        });

        results.success.push({ name: plan.name, size: buffer.length });
      } catch (e) {
        results.failed.push({
          name: plan.name,
          error: e instanceof Error ? e.message : String(e),
        });
      }
    }

    return Response.json({
      totalPlans: plans.length,
      downloaded: results.success.length,
      skipped: results.skipped.length,
      failed: results.failed.length,
      details: results,
    });
  } catch (e) {
    return Response.json({ error: String(e) }, { status: 500 });
  }
}
