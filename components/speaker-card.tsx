import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Speaker } from "@/data/speakers";
export function SpeakerCard({
  speaker,
  index = 0,
  referencePortrait = false,
}: {
  speaker: Speaker;
  index?: number;
  referencePortrait?: boolean;
}) {
  return (
    <article
      className={"speaker-card tone-" + (index % 4)}
      suppressHydrationWarning
    >
      <Link
        href={"/speakers/" + speaker.slug}
        className="speaker-image-link"
        aria-label={"View sample profile: " + speaker.name}
      >
        <div className="speaker-image">
          {referencePortrait && index < 4 ? (
            <div className={"reference-portrait reference-portrait-" + index} role="img" aria-label={"Illustrative portrait of " + speaker.name + " from the supplied design reference"} />
          ) : <Image
            src={speaker.image}
            alt={
              "Illustrative portrait of " +
              speaker.name +
              " from the supplied design reference"
            }
            fill
            sizes="(max-width: 600px) 80vw, (max-width: 1000px) 42vw, 28vw"
          />}
          <span className="portrait-tag">IN CONVERSATION</span>
          <span className="portrait-arrow">
            <ArrowUpRight size={22} />
          </span>
        </div>
      </Link>
      <div className="speaker-body">
        <p className="eyebrow">{speaker.role}</p>
        <h3>
          <Link href={"/speakers/" + speaker.slug}>{speaker.name}</Link>
        </h3>
        <p className="speaker-prompt">{speaker.quote}</p>
        <Link className="profile-link" href={"/speakers/" + speaker.slug}>
          {referencePortrait ? "View Profile" : "View sample profile"} <ArrowUpRight size={14} />
        </Link>
      </div>
    </article>
  );
}
