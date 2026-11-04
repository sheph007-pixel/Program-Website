import { NextRequest, NextResponse } from "next/server";

/**
 * Temporary preview lock: until the site is finalized, every page is served
 * as the code prompt (/site-access) instead of the site. Entering the code at
 * /api/site-access sets a cookie that unlocks the site for 30 days.
 * Remove the lock by setting SITE_LOCK=off on the service.
 */
const SITE_ACCESS_COOKIE = "site_access";

function siteLocked(req: NextRequest): boolean {
  if (process.env.SITE_LOCK === "off") return false;
  const token = process.env.SITE_ACCESS_TOKEN || "bensync-preview-8787";
  return req.cookies.get(SITE_ACCESS_COOKIE)?.value !== token;
}

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Admin area keeps its own login and is not behind the preview lock.
  if (pathname.startsWith("/admin") || pathname.startsWith("/api/admin")) {
    if (pathname === "/admin/login" || pathname === "/api/admin/auth") {
      return NextResponse.next();
    }
    const token = req.cookies.get("kennion_admin")?.value;
    const expected = process.env.ADMIN_SESSION_SECRET || "kennion-admin-secret-2024";
    if (token !== expected) {
      if (pathname.startsWith("/api/admin")) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
      }
      return NextResponse.redirect(new URL("/admin/login", req.url));
    }
    return NextResponse.next();
  }

  if (pathname === "/api/site-access") return NextResponse.next();

  const locked = siteLocked(req);

  if (locked && pathname.startsWith("/api/")) {
    return NextResponse.json({ error: "Site is locked" }, { status: 401 });
  }

  // Tell the root layout whether the site is locked. Always overwrite the
  // header so a visitor cannot send their own value.
  const headers = new Headers(req.headers);
  headers.set("x-site-locked", locked ? "1" : "0");
  if (!locked) return NextResponse.next({ request: { headers } });

  // Locked: serve only the code prompt, never the requested page.
  const res = NextResponse.rewrite(new URL("/site-access", req.url), { request: { headers } });
  res.headers.set("Cache-Control", "no-store");
  res.headers.set("X-Robots-Tag", "noindex, nofollow");
  return res;
}

export const config = {
  // Everything except Next's build assets and public files with an extension.
  matcher: ["/((?!_next/static|_next/image|.*\\.[a-zA-Z0-9]+$).*)"],
};
