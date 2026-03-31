import { NextRequest, NextResponse } from "next/server";

const ADMIN_PASSWORD = "willwill";

export async function POST(req: NextRequest) {
  try {
    const { password } = await req.json();

    if (password !== ADMIN_PASSWORD) {
      return NextResponse.json({ error: "Wrong password" }, { status: 401 });
    }

    const secret = process.env.ADMIN_SESSION_SECRET || "kennion-admin-secret-2024";
    const res = NextResponse.json({ success: true });

    res.cookies.set("kennion_admin", secret, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7, // 7 days
    });

    return res;
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
}

export async function DELETE() {
  const res = NextResponse.json({ success: true });
  res.cookies.set("kennion_admin", "", {
    httpOnly: true,
    path: "/",
    maxAge: 0,
  });
  return res;
}
