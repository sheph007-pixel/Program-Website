import { redirect } from "next/navigation";

// The Providers section is hidden from the site. This route redirects to Home so
// the page is not reachable while the previous content stays available in git
// history if it ever needs to be restored.
export default function ProvidersPage() {
  redirect("/");
}
