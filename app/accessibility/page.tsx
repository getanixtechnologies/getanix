import { PageHero, TextLink } from "@/components/ui";
import { pageMetadata } from "@/lib/metadata";
export const metadata = pageMetadata(
  "Accessibility",
  "Using the KILF website and planning an accessible visit.",
  "/accessibility",
);
export default function Accessibility() {
  return (
    <>
      <PageHero
        eyebrow="A CONVERSATION FOR EVERYONE"
        title={
          <>
            Room for <em>everyone.</em>
          </>
        }
        description="We want the website, and the festival it represents, to be welcoming and usable."
      />
      <article className="container legal-content section-bottom">
        <h2>Using the website</h2>
        <p>
          Navigate using your keyboard. A skip link is available at the start of
          each page. Controls have visible focus states. Carousels support arrow
          keys; schedule tabs support Left, Right, Home and End. Open a session
          with Enter or Space.
        </p>
        <h2>Motion preferences</h2>
        <p>
          Reduced motion in your device settings disables smooth scrolling,
          parallax and animated reveals. Content remains visible without
          animation.
        </p>
        <h2>Visiting the festival</h2>
        <p>
          Venue access routes, accessible toilets, seating, assistance and
          interpretation arrangements have not yet been confirmed. The festival
          will publish details with the venue plan.
        </p>
        <h2>Tell us what you need</h2>
        <p>
          If something is difficult to use or you need help planning your visit,
          reach out to the organising team.
        </p>
        <TextLink href="/contact">Contact the festival team</TextLink>
      </article>
    </>
  );
}
