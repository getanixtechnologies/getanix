import { isSameOrigin } from "@/lib/request-origin";
import { NextResponse } from "next/server";
import Stripe from "stripe";
import { checkoutSchema } from "@/lib/validation";
import { passes } from "@/data/passes";
import { site } from "@/data/site";
export async function POST(request: Request) {
  try {
    if (!isSameOrigin(request))
      return NextResponse.json(
        { error: "This request is not allowed." },
        { status: 403 },
      );
    const text = await request.text();
    if (text.length > 10000)
      return NextResponse.json(
        { error: "Invalid registration." },
        { status: 413 },
      );
    const parsed = checkoutSchema.safeParse(JSON.parse(text));
    if (!parsed.success)
      return NextResponse.json(
        { error: parsed.error.issues[0].message },
        { status: 400 },
      );
    if (!process.env.STRIPE_SECRET_KEY)
      return NextResponse.json(
        { error: "Registration is not open yet. No payment has been taken." },
        { status: 503 },
      );
    const data = parsed.data;
    const pass = passes.find((p) => p.id === data.passId)!;
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      customer_email: data.email,
      line_items: [
        {
          price_data: {
            currency: "inr",
            product_data: { name: "KILF — " + pass.name },
            unit_amount: pass.price * 100,
          },
          quantity: data.quantity,
        },
      ],
      metadata: {
        passId: pass.id,
        name: data.name,
        phone: data.phone,
        date: data.date || "",
        studentVerification:
          data.passId === "student" ? "required-at-entry" : "not-applicable",
        institution: data.institution || "",
      },
      success_url:
        site.url + "/passes/confirmation?session_id={CHECKOUT_SESSION_ID}",
      cancel_url: site.url + "/passes?cancelled=true",
    });
    return NextResponse.json({ url: session.url });
  } catch (error) {
    return NextResponse.json(
      {
        error:
          error instanceof SyntaxError
            ? "Invalid registration."
            : "Checkout is unavailable right now. Please try again.",
      },
      { status: error instanceof SyntaxError ? 400 : 502 },
    );
  }
}
