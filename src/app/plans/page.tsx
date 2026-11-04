import { redirect } from "next/navigation";

// Plans are split into one page per category (Medical, Dental, Vision,
// Supplemental). The old combined page sends visitors to Medical.
export default function PlansPage() {
  redirect("/medical");
}
