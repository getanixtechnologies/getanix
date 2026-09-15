import Image from "next/image";
import { Download } from "lucide-react";
import { PageHero, PreviewNote } from "@/components/ui";
import { ScheduleTimeline } from "@/components/schedule-timeline";
import { HandwrittenQuote } from "@/components/decorations";
import { images } from "@/data/site";
import { pageMetadata } from "@/lib/metadata";
export const metadata = pageMetadata(
  "Schedule",
  "Explore the KILF sample festival programme.",
  "/schedule",
);
export default function Schedule() {
  return (
    <>
      <PageHero
        eyebrow="JANUARY 15—18, 2026"
        title={
          <>
            The <em>Programme.</em>
          </>
        }
        description="Follow your curiosity."
      >
        <a
          className="button button-outline download-link"
          href="/api/schedule"
          download="KILF-preview-schedule.pdf"
        >
          <Download size={16} />
          Download Schedule PDF
        </a>
      </PageHero>
      <section className="container section-bottom">
        <PreviewNote>
          Sample programme · All sessions, stages and timings are illustrative
          and subject to confirmation.
        </PreviewNote>
        <div className="schedule-split">
          <ScheduleTimeline />
          <div className="schedule-photo">
            <Image
              src={images.backwaters}
              alt="Houseboats and coconut palms reflected in the water at sunset"
              fill
              sizes="(max-width:768px) 100vw, 35vw"
            />
            <HandwrittenQuote>
              Different stories.
              <br />
              Same sky.
            </HandwrittenQuote>
            <span className="photo-label">FIND YOUR NEXT CONVERSATION.</span>
          </div>
        </div>
      </section>
    </>
  );
}
