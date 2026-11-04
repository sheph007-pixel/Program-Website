import { NextRequest, NextResponse } from "next/server";

// The site is closed until the new program launches. Only the coming soon
// landing page at www.kennionprogram.com is served; every other host and path
// returns a bare 404 so nothing else is reachable or indexable.
const CANONICAL_HOST = "www.kennionprogram.com";
const APEX_HOST = "kennionprogram.com";

// Railway's deploy healthcheck calls "/" with this host header.
const HEALTHCHECK_HOST = "healthcheck.railway.app";

const PUBLIC_PATHS = new Set([
  "/",
  "/robots.txt",
  "/favicon.ico",
  "/kennion-logo-white.svg",
]);

const NOINDEX = "noindex, nofollow, noarchive, nosnippet, noimageindex";

function notFound() {
  return new NextResponse("Not Found", {
    status: 404,
    headers: { "Content-Type": "text/plain", "X-Robots-Tag": NOINDEX },
  });
}

export function middleware(req: NextRequest) {
  const host = (req.headers.get("host") || "").split(":")[0].toLowerCase();
  const { pathname } = req.nextUrl;
  const isDev =
    process.env.NODE_ENV !== "production" &&
    (host === "localhost" || host === "127.0.0.1");

  if (host === APEX_HOST && pathname === "/") {
    return NextResponse.redirect(`https://${CANONICAL_HOST}/`, 308);
  }

  if (host === HEALTHCHECK_HOST && pathname === "/") {
    return NextResponse.next();
  }

  if (host !== CANONICAL_HOST && !isDev) {
    return notFound();
  }

  if (PUBLIC_PATHS.has(pathname) || pathname.startsWith("/_next/static/")) {
    return NextResponse.next();
  }

  return notFound();
}

export const config = {
  matcher: "/:path*",
};
