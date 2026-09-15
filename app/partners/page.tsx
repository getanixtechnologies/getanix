import { PageHero, Button } from "@/components/ui";
import { SponsorGrid } from "@/components/sponsor-grid";
import { pageMetadata } from "@/lib/metadata";
export const metadata = pageMetadata(
  "Partners & Sponsors",
  "Together for a brighter, more thoughtful tomorrow. Explore KILF partnership opportunities.",
  "/partners",
);
export default function Partners() {
  return (
    <>
      <PageHero
        eyebrow="A SHARED BELIEF IN WHAT COMES NEXT"
        title={
          <>
            Partners <em>& Sponsors.</em>
          </>
        }
        description="Together for a brighter, more thoughtful tomorrow."
      />
      <section className="container section-bottom">
        <p className="preview-note">
          Partner placements below are placeholders. No partnerships have been
          announced.
        </p>
        <SponsorGrid />
      </section>
      <section className="maroon-quote partnership-cta">
        <p className="eyebrow">IDEAS NEED ALLIES</p>
        <h2>
          Put your belief
          <br />
          <em>into possibility.</em>
        </h2>
        <p>Help create a space where literature, culture and community meet.</p>
        <Button href="/contact?subject=Partnership%20enquiry" variant="outline">
          Partner With Us
        </Button>
      </section>
    </>
  );
}
