import Image from "next/image";
import { PageHero, Button } from "@/components/ui";
import { VenueMap } from "@/components/venue-map";
import { venue } from "@/data/venue";
import { images } from "@/data/site";
import { pageMetadata } from "@/lib/metadata";
export const metadata = pageMetadata(
  "Festival Venue",
  "Find your way to Asramam Maidan in Kollam, Kerala. Venue, directions and visitor information.",
  "/venue",
);
export default function Venue() {
  return (
    <>
      <PageHero
        eyebrow="KOLLAM, KERALA, INDIA"
        title={
          <>
            A place to <em>belong.</em>
          </>
        }
        description="Asramam Maidan. Under open skies, in the heart of Kollam."
      />
      <section className="container section-bottom venue-page-top">
        <div className="venue-wide-photo">
          <Image
            src={images.maidan}
            alt="Open festival grounds beneath spreading trees in Kerala"
            fill
            priority
            sizes="(max-width:768px) 100vw, 55vw"
          />
        </div>
        <div>
          <VenueMap />
          <Button href={venue.mapUrl} external variant="outline">
            Open in Google Maps
          </Button>
        </div>
      </section>
      <section className="paper section">
        <div className="container">
          <p className="eyebrow">PLAN YOUR VISIT</p>
          <h2>
            The journey is
            <br />
            part of <em>the story.</em>
          </h2>
          <div className="travel-grid">
            {venue.guides.map((guide, i) => (
              <article key={guide.title}>
                <span className="belief-number">0{i + 1}</span>
                <h3>{guide.title}</h3>
                <p>{guide.text}</p>
              </article>
            ))}
          </div>
          <Button href="/contact" variant="outline">
            Ask us about your visit
          </Button>
        </div>
      </section>
    </>
  );
}
