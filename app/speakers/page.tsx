import { PageHero, PreviewNote } from "@/components/ui";
import { SpeakerGrid } from "@/components/speaker-grid";
import { pageMetadata } from "@/lib/metadata";
export const metadata = pageMetadata(
  "Speakers",
  "Extraordinary voices. Unforgettable conversations. Explore the KILF speaker directory preview.",
  "/speakers",
);
export default function Speakers() {
  return (
    <>
      <PageHero
        eyebrow="THE PEOPLE BEHIND THE POSSIBILITIES"
        title={
          <>
            Extraordinary voices.
            <br />
            <em>Unforgettable conversations.</em>
          </>
        }
        description="Writers, thinkers, artists and change-makers. A world of perspectives."
      />
      <section className="container section-bottom">
        <PreviewNote>
          Editorial preview · These names are sample content, not confirmed
          participants. Portraits are illustrative; conversation prompts are not
          speaker quotations.
        </PreviewNote>
        <SpeakerGrid />
      </section>
    </>
  );
}
