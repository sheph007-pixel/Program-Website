import { NextRequest } from "next/server";
import { Resend } from "resend";

function getResend() {
  return new Resend(process.env.RESEND_API_KEY || "");
}

export async function POST(req: NextRequest) {
  try {
    const { name, employer, phone, email, issue, chatTranscript } = await req.json();

    if (!name || !email || !issue) {
      return Response.json({ error: "Missing required fields" }, { status: 400 });
    }

    const today = new Date().toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });

    const subject = `${name} - ${today}`;

    const htmlBody = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: linear-gradient(135deg, #0a1929, #132f4c); padding: 24px 32px; border-radius: 12px 12px 0 0;">
          <h1 style="color: white; margin: 0; font-size: 20px;">New Support Request</h1>
          <p style="color: rgba(255,255,255,0.7); margin: 4px 0 0; font-size: 14px;">${today}</p>
        </div>

        <div style="background: white; padding: 32px; border: 1px solid #e2e8f0; border-top: none;">
          <h2 style="color: #0a1929; font-size: 16px; margin: 0 0 16px; border-bottom: 2px solid #0066cc; padding-bottom: 8px;">Member Information</h2>

          <table style="width: 100%; border-collapse: collapse; margin-bottom: 24px;">
            <tr>
              <td style="padding: 8px 0; color: #64748b; font-size: 14px; width: 120px;">Name</td>
              <td style="padding: 8px 0; color: #0a1929; font-size: 14px; font-weight: 600;">${name}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #64748b; font-size: 14px;">Employer</td>
              <td style="padding: 8px 0; color: #0a1929; font-size: 14px; font-weight: 600;">${employer || "Not provided"}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #64748b; font-size: 14px;">Phone</td>
              <td style="padding: 8px 0; color: #0a1929; font-size: 14px; font-weight: 600;">${phone || "Not provided"}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #64748b; font-size: 14px;">Email</td>
              <td style="padding: 8px 0; color: #0a1929; font-size: 14px; font-weight: 600;"><a href="mailto:${email}" style="color: #0066cc; text-decoration: none;">${email}</a></td>
            </tr>
          </table>

          <h2 style="color: #0a1929; font-size: 16px; margin: 0 0 12px; border-bottom: 2px solid #0066cc; padding-bottom: 8px;">Issue Description</h2>
          <div style="background: #f8fafc; border-radius: 8px; padding: 16px; margin-bottom: 24px; border: 1px solid #e2e8f0;">
            <p style="margin: 0; color: #334155; font-size: 14px; line-height: 1.6; white-space: pre-wrap;">${issue}</p>
          </div>

          ${chatTranscript ? `
          <h2 style="color: #0a1929; font-size: 16px; margin: 0 0 12px; border-bottom: 2px solid #0066cc; padding-bottom: 8px;">Chat Transcript</h2>
          <div style="background: #f8fafc; border-radius: 8px; padding: 16px; border: 1px solid #e2e8f0;">
            <pre style="margin: 0; color: #334155; font-size: 13px; line-height: 1.6; white-space: pre-wrap; font-family: Arial, sans-serif;">${chatTranscript}</pre>
          </div>
          ` : ""}
        </div>

        <div style="background: #f1f5f9; padding: 16px 32px; border-radius: 0 0 12px 12px; border: 1px solid #e2e8f0; border-top: none;">
          <p style="margin: 0; color: #64748b; font-size: 12px;">This support ticket was submitted via the Kennion Benefits Program portal at site.kennion.com</p>
        </div>
      </div>
    `;

    const { error } = await getResend().emails.send({
      from: "Kennion Benefits <support@kennion.com>",
      to: ["support@kennion.com"],
      replyTo: email,
      subject,
      html: htmlBody,
    });

    if (error) {
      console.error("Resend error:", error);
      return Response.json({ error: "Failed to send email" }, { status: 500 });
    }

    return Response.json({ success: true });
  } catch (e: unknown) {
    const message = e instanceof Error ? e.message : "Server error";
    console.error("Support ticket error:", e);
    return Response.json({ error: message }, { status: 500 });
  }
}
