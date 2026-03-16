import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, subject, message } = body;

    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    // When DATABASE_URL is configured, save to database:
    // const { prisma } = await import("@/lib/db");
    // await prisma.contactInquiry.create({ data: { name, email, subject, message } });

    return NextResponse.json({ success: true, message: "Inquiry received" });
  } catch {
    return NextResponse.json(
      { error: "Failed to submit inquiry" },
      { status: 500 }
    );
  }
}
