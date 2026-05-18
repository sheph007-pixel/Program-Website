import { sections } from "../faq/data";

export const dynamic = "force-static";

function format(): string {
  const lines: string[] = [];
  lines.push("KENNION BENEFITS PROGRAM — EMPLOYER FAQ");
  lines.push("https://www.kennionprogram.com/faq");
  lines.push("");
  lines.push(
    "A reference for employers, advisors, and attorneys evaluating the Kennion Program."
  );
  lines.push("");

  for (const section of sections) {
    lines.push("=".repeat(64));
    lines.push(section.title.toUpperCase());
    lines.push("=".repeat(64));
    lines.push("");
    for (const item of section.items) {
      lines.push(`Q: ${item.question}`);
      lines.push(`A: ${item.answer}`);
      lines.push("");
    }
  }

  lines.push("—");
  lines.push("Contact: Hunter Shepherd, President — 205-641-0469 — hunter@kennion.com");

  return lines.join("\n");
}

export async function GET() {
  return new Response(format(), {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "X-Robots-Tag": "noindex, nofollow",
      "Cache-Control": "public, max-age=300",
    },
  });
}
