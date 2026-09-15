import { PageHero } from "@/components/ui";
import { PassRegistration } from "@/components/pass-registration";
import { pageMetadata } from "@/lib/metadata";
export const metadata = pageMetadata(
  "Pass Registration",
  "Be part of a global celebration of ideas. Explore KILF festival, day and student passes.",
  "/passes",
);
export default async function Passes({
  searchParams,
}: {
  searchParams: Promise<{ cancelled?: string }>;
}) {
  const query = await searchParams;
  return (
    <>
      <PageHero
        eyebrow="YOUR PLACE IN THE CONVERSATION"
        title={
          <>
            A pass to
            <br />
            <em>new possibilities.</em>
          </>
        }
        description="Be part of a global celebration of ideas."
      />
      <section className="container section-bottom">
        {query.cancelled && (
          <p className="form-message" role="status">
            Checkout was cancelled. No booking has been confirmed. You can
            choose a pass and try again.
          </p>
        )}
        <PassRegistration paymentEnabled={!!process.env.STRIPE_SECRET_KEY} />
      </section>
    </>
  );
}
