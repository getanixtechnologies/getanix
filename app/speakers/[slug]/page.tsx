import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { speakers } from "@/data/speakers";
import { SpeakerCard } from "@/components/speaker-card";
import { PreviewNote, SectionHeading, TextLink } from "@/components/ui";
import { pageMetadata } from "@/lib/metadata";
export function generateStaticParams() {
  return speakers.map((s) => ({ slug: s.slug }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const s = speakers.find((s) => s.slug === slug);
  return s
    ? pageMetadata(s.name + " — Sample profile", s.bio, "/speakers/" + slug)
    : { title: "Speaker not found" };
}
export default async function SpeakerProfile({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const speaker = speakers.find((s) => s.slug === slug);
  if (!speaker) notFound();
  return (
    <>
      <section className="container profile-section">
        <Link className="text-link back-link" href="/speakers">
          <ArrowLeft size={16} />
          All voices
        </Link>
        <div className="profile-grid">
          <div className="profile-portrait">
            <Image
              src={speaker.image}
              alt={"Illustrative reference portrait of " + speaker.name}
              fill
              priority
              sizes="(max-width:768px) 100vw, 45vw"
            />
          </div>
          <div className="profile-copy">
            <p className="eyebrow">
              {speaker.role} / {speaker.country}
            </p>
            <h1>{speaker.name}</h1>
            <PreviewNote>
              Sample profile · Participation is not confirmed.
            </PreviewNote>
            <p>{speaker.bio}</p>
            <div className="profile-prompt">
              <p className="eyebrow">
                A CONVERSATION STARTER · EDITORIAL PROMPT
              </p>
              <h2>{speaker.quote}</h2>
              <small>
                This is a sample topic, not a quotation from the speaker.
              </small>
            </div>
            <h3>At the festival</h3>
            <p>
              Sessions and official social links will be added after
              participation is confirmed.
            </p>
            <TextLink href="/schedule">Explore the sample programme</TextLink>
          </div>
        </div>
      </section>
      <section className="section container">
        <SectionHeading
          eyebrow="KEEP EXPLORING"
          title={
            <>
              More <em>perspectives.</em>
            </>
          }
        />
        <div className="related-speakers">
          {speakers
            .filter((s) => s.id !== speaker.id)
            .slice(0, 3)
            .map((s, i) => (
              <SpeakerCard speaker={s} index={i} key={s.id} />
            ))}
        </div>
      </section>
    </>
  );
}
