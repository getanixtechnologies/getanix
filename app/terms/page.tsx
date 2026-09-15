import { PageHero, TextLink } from "@/components/ui";
import { pageMetadata } from "@/lib/metadata";
export const metadata = pageMetadata(
  "Booking terms",
  "KILF preview status and booking information.",
  "/terms",
);
export default function Terms() {
  return (
    <>
      <PageHero
        eyebrow="BOOKING INFORMATION · DEVELOPMENT PREVIEW"
        title={
          <>
            Before you <em>join us.</em>
          </>
        }
        description="Final ticketing terms must be approved by the festival organiser before sales open."
      />
      <article className="container legal-content section-bottom">
        <h2>Programme and availability</h2>
        <p>
          Dates and venue are supplied project information. Speakers, sessions,
          statistics, portraits and pricing are preview content. They do not
          announce confirmed appearances or partnerships.
        </p>
        <h2>Passes and entry</h2>
        <p>
          Selecting a pass or reviewing details does not create a booking. A
          completed, verified payment is required when registration is enabled.
          Student pass holders must present valid student identification at
          entry.
        </p>
        <h2>Policies to be confirmed</h2>
        <p>
          The organiser must confirm admission limits, age rules, accessibility
          arrangements, taxes or fees, cancellation, refund and transfer
          policies before opening registration.
        </p>
        <h2>Questions</h2>
        <p>
          Please contact the festival before making plans that depend on
          unconfirmed programme details.
        </p>
        <TextLink href="/contact">Get in touch</TextLink>
      </article>
    </>
  );
}
