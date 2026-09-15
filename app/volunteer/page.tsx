import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { PageHero } from "@/components/ui";
import { FestivalForm } from "@/components/forms";
import { images } from "@/data/site";
import { pageMetadata } from "@/lib/metadata";
export const metadata = pageMetadata(
  "Become a Volunteer",
  "Be the energy behind the festival. Join the KILF volunteer community.",
  "/volunteer",
);
export default function Volunteer() {
  return (
    <>
      <PageHero
        eyebrow="GREAT STORIES HAPPEN WITH GREAT PEOPLE"
        title={
          <>
            Be part of
            <br />
            <em>something meaningful.</em>
          </>
        }
        description="Become a Volunteer. Be the energy behind the festival."
      />
      <section className="container editorial-split section-bottom">
        <div className="volunteer-photo">
          <Image
            src={images.volunteer}
            alt="Festival volunteer wearing a black shirt with the supplied lime-green KILF logo"
            fill
            priority
            sizes="(max-width:768px) 100vw, 45vw"
          />
        </div>
        <div className="editorial-copy">
          <p className="eyebrow">YOUR TIME. YOUR TALENT. OUR FESTIVAL.</p>
          <h2>
            Behind every moment,
            <br />
            <em>there is someone.</em>
          </h2>
          <div className="volunteer-reasons">
            {[
              "Be part of a global event",
              "Meet inspiring people",
              "Gain valuable experience",
              "Contribute to a meaningful cause",
            ].map((reason, i) => (
              <p key={reason}>
                <span>0{i + 1}</span>
                {reason}
              </p>
            ))}
          </div>
          <p>
            Welcome guests, support conversations, help readers find their way,
            and keep the festival moving. Choose an area that speaks to you.
          </p>
          <a className="button button-primary" href="#apply">
            Apply Now
            <ArrowUpRight size={16} />
          </a>
        </div>
      </section>
      <section className="paper section">
        <div className="container application-layout" id="apply">
          <div>
            <p className="eyebrow">MAKE YOURSELF PART OF THE STORY</p>
            <h2>
              A little about <em>you.</em>
            </h2>
            <p>
              Tell us what you enjoy, where you can help, and when you can join
              us. Applicants must be 18 or older.
            </p>
            <p>
              Role assignments, orientation and any volunteer benefits will be
              confirmed by the organising team.
            </p>
          </div>
          <FestivalForm kind="volunteer" />
        </div>
      </section>
    </>
  );
}
