import { NextRequest } from "next/server";
import { prisma } from "@/lib/db";

/** Upload/replace a PDF for a specific plan */
export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const formData = await req.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return Response.json({ error: "No file provided" }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());

    await prisma.plan.update({
      where: { id },
      data: {
        pdfData: buffer,
        pdfName: file.name,
        summaryUrl: `/api/plans/${id}/pdf`,
      },
    });

    return Response.json({ success: true });
  } catch (e) {
    const message = e instanceof Error ? e.message : "Upload failed";
    return Response.json({ error: message }, { status: 500 });
  }
}

/** Remove a PDF from a specific plan */
export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    await prisma.plan.update({
      where: { id },
      data: {
        pdfData: null,
        pdfName: null,
        summaryUrl: "",
      },
    });

    return Response.json({ success: true });
  } catch (e) {
    const message = e instanceof Error ? e.message : "Delete failed";
    return Response.json({ error: message }, { status: 500 });
  }
}
