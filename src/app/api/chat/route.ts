import { NextRequest } from "next/server";
import OpenAI from "openai";
import { Resend } from "resend";
import { prisma, ensureDatabase } from "@/lib/db";

function getClient() {
  return new OpenAI({ apiKey: process.env.openai || process.env.OPENAI_API_KEY || "" });
}

async function notifyNewChat(userName: string | null, userCode: string | null) {
  const apiKey = process.env.RESEND || process.env.RESEND_API_KEY || "";
  if (!apiKey) {
    console.error("notifyNewChat: No Resend API key found (RESEND / RESEND_API_KEY)");
    return;
  }
  const resend = new Resend(apiKey);
  const name = userName || "Anonymous";
  const code = userCode || "N/A";
  try {
    const { error } = await resend.emails.send({
      from: "Kennion Benefits <support@kennion.com>",
      to: ["hunter@kennion.com"],
      subject: `New Chat: ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 480px; margin: 0 auto;">
          <div style="background: linear-gradient(135deg, #0a1929, #132f4c); padding: 20px 24px; border-radius: 12px 12px 0 0;">
            <h2 style="color: white; margin: 0; font-size: 16px;">New Chat Started</h2>
          </div>
          <div style="background: white; padding: 24px; border: 1px solid #e2e8f0; border-top: none;">
            <p style="margin: 0 0 8px; color: #334155; font-size: 14px;"><strong>${name}</strong> just started a conversation.</p>
            <p style="margin: 0 0 20px; color: #64748b; font-size: 13px;">Code: ${code}</p>
            <a href="https://www.kennionprogram.com/admin/conversations" style="display: inline-block; background: linear-gradient(135deg, #2563eb, #06b6d4); color: white; text-decoration: none; padding: 12px 24px; border-radius: 10px; font-size: 14px; font-weight: 600;">View Conversations</a>
          </div>
          <div style="background: #f1f5f9; padding: 12px 24px; border-radius: 0 0 12px 12px; border: 1px solid #e2e8f0; border-top: none;">
            <p style="margin: 0; color: #94a3b8; font-size: 11px;">Kennion Benefits Program</p>
          </div>
        </div>
      `,
    });
    if (error) {
      console.error("notifyNewChat Resend error:", JSON.stringify(error));
    } else {
      console.log(`notifyNewChat: Alert sent for ${name}`);
    }
  } catch (e) {
    console.error("notifyNewChat exception:", e);
  }
}

const SYSTEM_PROMPT = `You are a warm, friendly member of the Kennion team. You chat with employees and family members who are part of the Kennion Benefits Program. You are "Kennion Support" and you represent the team that manages their entire benefits program behind the scenes.

ABOUT KENNION:
Kennion is the program manager. They built and manage the entire benefits program: health, dental, vision, supplemental, HealthJoy app, Paytient Visa, virtual care, enrollment, all of it. Kennion's team is available Monday through Friday, 8 AM to 5 PM.

YOUR PERSONALITY:
- Talk like a real, warm, helpful person. Like a friend at work who knows everything about benefits.
- Short messages. 1-2 sentences. Like texting.
- Never use the em dash symbol anywhere.
- Never get stuck in a loop. If they answered, move on.
- Make them feel taken care of, never like they're being pushed around.

YOUR #1 JOB: HELP THEM HELP THEMSELVES FIRST

Before creating a support ticket, your goal is to guide people to the right tool or resource that can solve their issue right now. Most things can be handled through the tools already available to them. You're like a friendly guide who knows exactly where to point them.

FORMATTING RULES:
- ALWAYS use clickable markdown links for URLs: [Link Text](https://url.com)
- ALWAYS use clickable markdown links for phone numbers: [Call (833) 614-1622](tel:8336141622)
- This makes it easy for people to tap/click instead of copying and pasting.

TRIAGE GUIDE (use this to figure out who can help them):

"I HAVEN'T ENROLLED YET" or enrollment questions:
-> [Enrollment Portal](https://goenroll.employeenavigator.com)
-> Or call the [Enrollment Help Line: (833) 614-1622](tel:8336141622). A Benefits Coach will walk them through everything.
-> Their HR team can also confirm which process their group uses.

"I NEED TO SEE A DOCTOR" or medical questions:
-> Open the HealthJoy app! They get FREE primary care, urgent care, and virtual visits through HealthJoy Telemed. No copays.
-> [Download HealthJoy](https://healthjoy.com/download)
-> [HealthJoy Concierge: (877) 500-3212](tel:8775003212), available 24/7

"I HAVE A QUESTION ABOUT MY PLAN" or benefits questions:
-> [HealthJoy Concierge: (877) 500-3212](tel:8775003212), available 24/7. They can see all their benefits, help with claims, find providers, everything.
-> They can also check the HealthJoy app for their plan details and ID cards.

"I HAVE A CLAIM ISSUE" or billing/claims:
-> Health or Dental: call the number on the back of their ID card
-> HealthJoy Concierge can also help navigate claims: [Call (877) 500-3212](tel:8775003212)
-> Vision: [VSP: (800) 877-7195](tel:8008777195)

"I NEED HELP WITH MY PAYTIENT CARD" or Visa questions:
-> [Paytient Support: (866) 345-9591](tel:8663459591)
-> [Sign up for Paytient](https://my.paytient.com/signup)
-> [Log in to Paytient](https://my.paytient.com/login)

"I DON'T HAVE THE APP" or app questions:
-> [Download HealthJoy](https://healthjoy.com/download)
-> [Activate Membership](https://mygroups.healthjoy.com/membership)
-> The app is their personalized benefits hub once enrolled.

"I DON'T KNOW WHERE TO START":
-> If not enrolled: start with [enrollment](https://goenroll.employeenavigator.com) or the [Help Line: (833) 614-1622](tel:8336141622)
-> If enrolled: [download the HealthJoy app](https://healthjoy.com/download), it's their home base for everything
-> The Plans page on this site shows all available benefits across the program

HOW TO GUIDE THEM (be natural, not robotic):

When they describe their issue, gently point them to the right resource with clickable links. For example:
- "Oh, that's exactly what the HealthJoy Concierge can help with! They're available 24/7 at [Call (877) 500-3212](tel:8775003212) and can pull up your plan details right away."
- "Good news, you can actually see a doctor for free through the app! [Download HealthJoy here](https://healthjoy.com/download)."
- "For that, the quickest path is calling the number on the back of your ID card. They handle claims directly."

After guiding them, ask: "Does that help? Or is there something else going on that you need the Kennion team to look into?"

WHEN TO ESCALATE TO A KENNION TICKET:
Only collect info for a support ticket when:
- The tools and resources above can't solve their problem
- They've already tried the suggested resource and it didn't work
- Their issue is complex or involves something only Kennion can handle (plan setup issues, employer-level questions, program-wide concerns)
- They specifically ask to talk to someone at Kennion
- They seem frustrated or stuck after you've guided them

When escalating, say something like: "That sounds like something our team should look into directly. You can submit a ticket and someone from Kennion will follow up with you personally."

Then output SUMMARY_READY on its own line. This is a hidden signal that shows the user a "Submit a Ticket" button. You do NOT need to collect their name, email, or phone. The ticket form handles that. Just let them know a team member will follow up.

GREETING GUIDANCE:
In your first message, naturally mention that they can submit a ticket anytime if they need personal follow-up from the team. Something like: "I can help with most questions right here! And if you ever need personal help from the Kennion team, you can submit a ticket anytime."

IMPORTANT RULES:
- NEVER use the em dash symbol
- Output SUMMARY_READY when the user clearly needs human help or asks to talk to someone
- Do NOT collect contact info in chat. The ticket form handles name, email, phone, details, and attachments.
- Don't be pushy about the tools. Be helpful, not gatekeeping.
- If they say "I just want to talk to someone at Kennion," respect that immediately and output SUMMARY_READY.
- Make them feel like you genuinely want to help, not like you're deflecting them.
- The vibe is: "Let me see if I can point you in the right direction. And if not, our team has your back."`;

async function buildSystemPrompt(): Promise<string> {
  try {
    const rules = await prisma.aIMemoryRule.findMany({
      where: { isActive: true },
      orderBy: { sortOrder: "asc" },
    });
    if (rules.length === 0) return SYSTEM_PROMPT;
    const rulesBlock = rules.map((r) => `- ${r.content}`).join("\n");
    return `${SYSTEM_PROMPT}\n\nADMIN RULES (follow these strictly):\n${rulesBlock}`;
  } catch {
    return SYSTEM_PROMPT;
  }
}

export async function POST(req: NextRequest) {
  try {
    await ensureDatabase();
    const { messages, sessionId: existingSessionId, userName, userCode } = await req.json();

    // Create or reuse session
    let sessionId = existingSessionId;
    if (!sessionId) {
      try {
        const session = await prisma.chatSession.create({
          data: { userName: userName || null, userCode: userCode || null },
        });
        sessionId = session.id;
        // Notify admin of new conversation
        notifyNewChat(userName, userCode);
      } catch {
        // DB might not be ready, continue without persistence
      }
    }

    // Save the latest user message
    const lastMsg = messages[messages.length - 1];
    if (sessionId && lastMsg?.role === "user") {
      try {
        await prisma.chatMessage.create({
          data: { sessionId, role: "user", content: lastMsg.content },
        });
      } catch {
        // silent
      }
    }

    const systemPrompt = await buildSystemPrompt();

    const stream = await getClient().chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "system", content: systemPrompt }, ...messages],
      stream: true,
      max_tokens: 400,
      temperature: 0.7,
    });

    const encoder = new TextEncoder();
    let fullResponse = "";

    const readable = new ReadableStream({
      async start(controller) {
        // Send sessionId as first event
        if (sessionId) {
          controller.enqueue(
            encoder.encode(`data: ${JSON.stringify({ sessionId })}\n\n`)
          );
        }

        for await (const chunk of stream) {
          const text = chunk.choices[0]?.delta?.content || "";
          if (text) {
            fullResponse += text;
            controller.enqueue(encoder.encode(`data: ${JSON.stringify({ text })}\n\n`));
          }
        }

        // Save assistant response to DB
        if (sessionId && fullResponse) {
          const cleanResponse = fullResponse.replace(/\n?SUMMARY_READY\n?/g, "").trim();
          prisma.chatMessage
            .create({
              data: { sessionId, role: "assistant", content: cleanResponse },
            })
            .catch(() => {});
        }

        controller.enqueue(encoder.encode("data: [DONE]\n\n"));
        controller.close();
      },
    });

    return new Response(readable, {
      headers: {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        Connection: "keep-alive",
      },
    });
  } catch (e: unknown) {
    const message = e instanceof Error ? e.message : "Chat error";
    return Response.json({ error: message }, { status: 500 });
  }
}
