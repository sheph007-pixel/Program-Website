import { NextRequest } from "next/server";
import { Resend } from "resend";
import { prisma } from "@/lib/db";

function getResend() {
  return new Resend(process.env.RESEND || process.env.RESEND_API_KEY || "");
}

export async function POST(req: NextRequest) {
  try {
    const contentType = req.headers.get("content-type") || "";

    let name: string,
      employer: string,
      phone: string,
      email: string,
      issue: string,
      chatTranscript: string,
      sessionId: string | undefined;
    let attachment: { filename: string; content: Buffer } | null = null;

    if (contentType.includes("multipart/form-data")) {
      const formData = await req.formData();
      name = (formData.get("name") as string) || "";
      employer = (formData.get("employer") as string) || "";
      phone = (formData.get("phone") as string) || "";
      email = (formData.get("email") as string) || "";
      issue = (formData.get("issue") as string) || "";
      chatTranscript = (formData.get("chatTranscript") as string) || "";
      sessionId = (formData.get("sessionId") as string) || undefined;

      const file = formData.get("attachment") as File | null;
      if (file && file.size > 0) {
        const buffer = Buffer.from(await file.arrayBuffer());
        attachment = { filename: file.name, content: buffer };
      }
    } else {
      const json = await req.json();
      name = json.name || "";
      employer = json.employer || "";
      phone = json.phone || "";
      email = json.email || "";
      issue = json.issue || "";
      chatTranscript = json.chatTranscript || "";
      sessionId = json.sessionId || undefined;
    }

    if (!name || !email) {
      return Response.json({ error: "Name and email are required" }, { status: 400 });
    }

    const today = new Date().toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });

    const subject = `${name}${employer && employer !== "See transcript" ? ` | ${employer}` : ""}`;

    // Fetch AI summary from session if available
    let aiSummary = "";
    if (sessionId) {
      try {
        const session = await prisma.chatSession.findUnique({
          where: { id: sessionId },
          select: { summary: true },
        });
        if (session?.summary) aiSummary = session.summary;
      } catch {
        // continue without summary
      }
    }

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
              <td style="padding: 8px 0; color: #64748b; font-size: 14px;">Phone</td>
              <td style="padding: 8px 0; color: #0a1929; font-size: 14px; font-weight: 600;">${phone || "Not provided"}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #64748b; font-size: 14px;">Email</td>
              <td style="padding: 8px 0; color: #0a1929; font-size: 14px; font-weight: 600;"><a href="mailto:${email}" style="color: #0066cc; text-decoration: none;">${email}</a></td>
            </tr>
            ${attachment ? `
            <tr>
              <td style="padding: 8px 0; color: #64748b; font-size: 14px;">Attachment</td>
              <td style="padding: 8px 0; color: #0a1929; font-size: 14px; font-weight: 600;">${attachment.filename}</td>
            </tr>
            ` : ""}
          </table>

          ${aiSummary ? `
          <h2 style="color: #0a1929; font-size: 16px; margin: 0 0 12px; border-bottom: 2px solid #7c3aed; padding-bottom: 8px;">AI Summary</h2>
          <div style="background: #f5f3ff; border-radius: 8px; padding: 16px; margin-bottom: 24px; border: 1px solid #ddd6fe;">
            <p style="margin: 0; color: #4c1d95; font-size: 14px; line-height: 1.6;">${aiSummary}</p>
          </div>
          ` : ""}

          ${issue ? `
          <h2 style="color: #0a1929; font-size: 16px; margin: 0 0 12px; border-bottom: 2px solid #0066cc; padding-bottom: 8px;">Issue Description</h2>
          <div style="background: #f8fafc; border-radius: 8px; padding: 16px; margin-bottom: 24px; border: 1px solid #e2e8f0;">
            <p style="margin: 0; color: #334155; font-size: 14px; line-height: 1.6; white-space: pre-wrap;">${issue}</p>
          </div>
          ` : ""}

          ${chatTranscript ? `
          <h2 style="color: #0a1929; font-size: 16px; margin: 0 0 12px; border-bottom: 2px solid #0066cc; padding-bottom: 8px;">Chat Transcript</h2>
          <div style="background: #f8fafc; border-radius: 8px; padding: 16px; border: 1px solid #e2e8f0;">
            <pre style="margin: 0; color: #334155; font-size: 13px; line-height: 1.6; white-space: pre-wrap; font-family: Arial, sans-serif;">${chatTranscript}</pre>
          </div>
          ` : ""}
        </div>

        <div style="background: #f1f5f9; padding: 16px 32px; border-radius: 0 0 12px 12px; border: 1px solid #e2e8f0; border-top: none;">
          <p style="margin: 0; color: #64748b; font-size: 12px;">This support ticket was submitted via the Kennion Benefits Program portal.</p>
        </div>
      </div>
    `;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const emailPayload: any = {
      from: "Kennion Benefits <support@kennion.com>",
      to: ["support@kennion.com"],
      cc: ["hunter@kennion.com"],
      replyTo: email,
      subject,
      html: htmlBody,
    };

    if (attachment) {
      emailPayload.attachments = [
        {
          filename: attachment.filename,
          content: attachment.content,
        },
      ];
    }

    const { error } = await getResend().emails.send(emailPayload);

    if (error) {
      console.error("Resend error:", error);
      return Response.json({ error: "Failed to send email" }, { status: 500 });
    }

    // Link to chat session in DB
    if (sessionId) {
      prisma.chatSession
        .update({
          where: { id: sessionId },
          data: {
            ticketSent: true,
            userName: name !== "See transcript" ? name : undefined,
            userEmail: email !== "See transcript" ? email : undefined,
            userPhone: phone !== "See transcript" ? phone : undefined,
            employer: employer !== "See transcript" ? employer : undefined,
          },
        })
        .catch(() => {});
    }

    return Response.json({ success: true });
  } catch (e: unknown) {
    const message = e instanceof Error ? e.message : "Server error";
    console.error("Support ticket error:", e);
    return Response.json({ error: message }, { status: 500 });
  }
}
