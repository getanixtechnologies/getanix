import { FestivalStructuredData } from "@/components/structured-data";
import Image from "next/image";
import { MapPin, ArrowUpRight } from "lucide-react";
import { Intro } from "@/components/intro";
import { Hero } from "@/components/hero";
import { WhyKilf } from "@/components/why-kilf";
import { SectionHeading, Button, PreviewNote, TextLink } from "@/components/ui";
import { SpeakerCarousel } from "@/components/speaker-carousel";
import { SponsorGrid } from "@/components/sponsor-grid";
import { VenueMap } from "@/components/venue-map";
import { WaveDecoration } from "@/components/decorations";
import { images } from "@/data/site";
export default function Home() {
  return (
    <div className="editorial-home">
      <FestivalStructuredData />
      <Intro />
      <Hero />
      <section id="voices" className="section container speakers-section">
        <SectionHeading
          eyebrow="MEET THE VOICES"
          title={
            <>
              Coming Speakers
            </>
          }
          description="A remarkable lineup of authors, thinkers, artists and change-makers from around the world."
        >
          <Button href="/speakers" variant="outline">See All Speakers</Button>
        </SectionHeading>
        <SpeakerCarousel />
        <PreviewNote />
      </section>
      <WhyKilf />
      <section className="partners-section paper">
        <div className="container">
          <SectionHeading
            eyebrow="BETTER, TOGETHER"
            title={
              <>
                Our <em>Partners.</em>
              </>
            }
            description="A shared belief in the power of stories. A collective investment in a more thoughtful world."
          >
            <TextLink href="/partners">Partner with us</TextLink>
          </SectionHeading>
          <SponsorGrid compact />
          <div className="partners-powered" data-reveal suppressHydrationWarning>
            <span>Powered by</span>
            <strong>CAPITAL MEDIA</strong>
          </div>
        </div>
      </section>
      <section className="section container venue-teaser">
        <div data-reveal suppressHydrationWarning>
          <p className="eyebrow">COME FOR THE STORIES. STAY FOR KOLLAM.</p>
          <h2>
            A meeting place.
            <br />
            <em>A starting point.</em>
          </h2>
          <p className="venue-address">
            <MapPin size={18} />
            Asramam Maidan, Kollam
          </p>
          <p>
            Under wide skies, beside quiet waters. Discover a festival grounded
            in the warmth and cultural life of Kerala.
          </p>
          <Button href="/venue" variant="outline">
            Find your way here
          </Button>
          <a className="venue-coordinates" href="/venue">
            8.90° N · 76.59° E <ArrowUpRight size={14} />
          </a>
        </div>
        <div className="venue-collage">
          <div className="venue-photo">
            <Image
              src={images.maidan}
              alt="A tree-shaded open ground with traditional Kerala architecture"
              fill
              sizes="(max-width:768px) 100vw, 50vw"
            />
          </div>
          <VenueMap />
        </div>
      </section>
      <div className="maroon-quote">
        <WaveDecoration />
        <p className="eyebrow">A CELEBRATION OF OUR SHARED HUMANITY</p>
        <p>
          Words open worlds.
          <br />
          <em>People make them matter.</em>
        </p>
      </div>
    </div>
  );
}
