import SiteGate from "@/components/SiteGate";

export const metadata = { title: "BenSync" };

/** The code prompt. Middleware serves this in place of every page while the site is locked. */
export default function SiteAccessPage() {
  return <SiteGate />;
}
