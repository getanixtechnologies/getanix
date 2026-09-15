import Stripe from "stripe";
import { CheckCircle2, Clock3 } from "lucide-react";
import { Logo, Button } from "@/components/ui";
export const metadata = {
  title: "Registration status",
  robots: { index: false, follow: false },
};
export default async function Confirmation({
  searchParams,
}: {
  searchParams: Promise<{ session_id?: string }>;
}) {
  const { session_id } = await searchParams;
  let paid = false;
  let valid = false;
  if (
    session_id?.startsWith("cs_") &&
    session_id.length < 200 &&
    process.env.STRIPE_SECRET_KEY
  ) {
    try {
      const session = await new Stripe(
        process.env.STRIPE_SECRET_KEY,
      ).checkout.sessions.retrieve(session_id);
      valid = true;
      paid = session.payment_status === "paid";
    } catch {
      /* A missing or invalid session never confirms a booking. */
    }
  }
  return (
    <section className="container confirmation-page">
      <Logo large />
      {paid ? (
        <CheckCircle2 className="gold" size={40} />
      ) : (
        <Clock3 className="gold" size={40} />
      )}
      <p className="eyebrow">YOUR FESTIVAL REGISTRATION</p>
      <h1>{paid ? "Payment received." : "Not confirmed yet."}</h1>
      <p>
        {paid
          ? "Your payment has been verified. Please retain your Stripe receipt. Ticket delivery will follow the festival’s fulfilment process."
          : valid
            ? "Your payment is still pending. Return after completing payment or contact the festival team."
            : "We could not verify a completed payment. No booking is confirmed by this page."}
      </p>
      <Button href={paid ? "/schedule" : "/passes"}>
        {paid ? "Explore the programme" : "Back to passes"}
      </Button>
    </section>
  );
}
