import { NextRequest, NextResponse } from "next/server";

/** Check the preview code and, when it matches, unlock the site for 30 days. */
export async function POST(req: NextRequest) {
  const code = process.env.SITE_ACCESS_CODE || "8787";
  const token = process.env.SITE_ACCESS_TOKEN || "bensync-preview-8787";
  let entered = "";
  try {
    const body = await req.json();
    entered = String(body?.code ?? "").trim();
  } catch {
    // treated as a wrong code
  }
  if (entered !== code) {
    return NextResponse.json({ ok: false }, { status: 401 });
  }
  const res = NextResponse.json({ ok: true });
  res.cookies.set("site_access", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 30,
  });
  return res;
}
