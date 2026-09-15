import { MapPin, Mail, Phone, ArrowUpRight } from "lucide-react";
import { PageHero } from "@/components/ui";
import { FestivalForm } from "@/components/forms";
import { site } from "@/data/site";
import { venue } from "@/data/venue";
import { pageMetadata } from "@/lib/metadata";
export const metadata = pageMetadata(
  "Contact Us",
  "We would love to hear from you. Get in touch with the KILF festival team.",
  "/contact",
);
export default async function Contact({
  searchParams,
}: {
  searchParams: Promise<{ subject?: string }>;
}) {
  const { subject } = await searchParams;
  return (
    <>
      <PageHero
        eyebrow="EVERY CONVERSATION STARTS SOMEWHERE"
        title={
          <>
            Let’s <em>talk.</em>
          </>
        }
        description="Contact Us. We’d love to hear from you."
      />
      <section className="container contact-layout section-bottom">
        <div>
          <h2>
            A question.
            <br />
            An idea. <em>A hello.</em>
          </h2>
          <p>
            For festival enquiries, partnerships, access requirements or simply
            to connect — leave us a note.
          </p>
          <div className="contact-details">
            <div>
              <MapPin size={20} />
              <span>
                <strong>The festival</strong>Asramam Maidan
                <br />
                Kollam, Kerala, India
                <a
                  href={venue.mapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View location
                  <ArrowUpRight size={14} />
                </a>
              </span>
            </div>
            <div>
              <Mail size={20} />
              <span>
                <strong>Email</strong>
                {site.email ? (
                  <a href={"mailto:" + site.email}>{site.email}</a>
                ) : (
                  "Official email to be announced"
                )}
              </span>
            </div>
            <div>
              <Phone size={20} />
              <span>
                <strong>Phone</strong>
                {site.phone ? (
                  <a href={"tel:" + site.phone}>{site.phone}</a>
                ) : (
                  "Festival helpline to be announced"
                )}
              </span>
            </div>
          </div>
        </div>
        <div className="contact-form-wrap paper">
          <h2>Write to us.</h2>
          <FestivalForm
            kind="contact"
            defaultSubject={subject?.slice(0, 200)}
          />
        </div>
      </section>
    </>
  );
}
