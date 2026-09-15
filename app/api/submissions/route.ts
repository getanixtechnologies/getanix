import { isSameOrigin } from "@/lib/request-origin";
import { NextResponse } from "next/server";
import { submissionSchema } from "@/lib/validation";
export async function POST(request: Request) {
  try {
    if (!isSameOrigin(request))
      return NextResponse.json(
        { error: "This request is not allowed." },
        { status: 403 },
      );
    const text = await request.text();
    if (text.length > 20000)
      return NextResponse.json(
        { error: "Your message is too long." },
        { status: 413 },
      );
    const body = JSON.parse(text);
    if (body.website)
      return NextResponse.json(
        { error: "Unable to process this submission." },
        { status: 400 },
      );
    const parsed = submissionSchema.safeParse(body);
    if (!parsed.success)
      return NextResponse.json(
        { error: parsed.error.issues[0].message },
        { status: 400 },
      );
    const webhook = process.env.FORMS_WEBHOOK_URL;
    if (!webhook)
      return NextResponse.json(
        {
          error:
            "Submissions are not open yet. Please check back when the festival announces registration.",
        },
        { status: 503 },
      );
    const response = await fetch(webhook, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(process.env.FORMS_WEBHOOK_TOKEN
          ? { Authorization: "Bearer " + process.env.FORMS_WEBHOOK_TOKEN }
          : {}),
      },
      body: JSON.stringify({
        ...parsed.data,
        submittedAt: new Date().toISOString(),
      }),
      signal: AbortSignal.timeout(12000),
    });
    if (!response.ok) throw new Error("Receiver failed");
    return NextResponse.json({
      message:
        parsed.data.kind === "newsletter"
          ? "You’re on the list. We’ll be in touch with festival news."
          : parsed.data.kind === "volunteer"
            ? "Your application has been received. The festival team will be in touch."
            : "Your message has been received. Thank you for reaching out.",
    });
  } catch (error) {
    return NextResponse.json(
      {
        error:
          error instanceof SyntaxError
            ? "Please send a valid form."
            : "We couldn’t send your message. Please try again later.",
      },
      { status: error instanceof SyntaxError ? 400 : 502 },
    );
  }
}
