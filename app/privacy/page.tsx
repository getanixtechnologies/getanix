import { PageHero, TextLink } from "@/components/ui";
import { pageMetadata } from "@/lib/metadata";
export const metadata = pageMetadata(
  "Privacy notice",
  "Information handling on the KILF website.",
  "/privacy",
);
export default function Privacy() {
  return (
    <>
      <PageHero
        title={
          <>
            Your information.
            <br />
            <em>Handled with care.</em>
          </>
        }
        eyebrow="PRIVACY NOTICE · DEVELOPMENT PREVIEW"
        description="The organiser must approve a full privacy policy before public registration opens."
      />
      <article className="container legal-content section-bottom">
        <h2>Information you share</h2>
        <p>
          Contact forms request your name, email, subject and message. Volunteer
          applications also request contact details, age, city, interests,
          availability and experience. Newsletter signup requests email and
          consent.
        </p>
        <h2>Submissions</h2>
        <p>
          Until the festival connects its submission service, forms do not save
          or send information to the organising team. They show an unavailable
          message. Once connected, information is sent to the configured service
          to handle your enquiry or application.
        </p>
        <h2>Payments</h2>
        <p>
          If registration is enabled, Stripe hosts checkout. Card details are
          never entered or stored on this website. Necessary booking details are
          sent to Stripe. Student identification is checked at entry; no ID
          document upload is required here.
        </p>
        <h2>External services</h2>
        <p>
          This preview includes no advertising trackers. Fonts and festival
          images are served locally. Opening Google Maps, or enabling its
          embedded map, connects to Google. Stripe checkout follows its own
          service policies.
        </p>
        <h2>Your choices</h2>
        <p>
          The organiser must publish its legal identity, retention periods,
          contact details and procedures for access, correction, deletion and
          unsubscribing before collecting live submissions.
        </p>
        <TextLink href="/contact">Contact the festival</TextLink>
      </article>
    </>
  );
}
