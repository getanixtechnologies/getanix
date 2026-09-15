import Image from "next/image";
import { PageHero, Button } from "@/components/ui";
import { HandwrittenQuote } from "@/components/decorations";
import { images, beliefs } from "@/data/site";
import { pageMetadata } from "@/lib/metadata";
export const metadata = pageMetadata(
  "About KILF",
  "A celebration of ideas, people and a more human tomorrow.",
  "/about",
);
export default function About() {
  return (
    <>
      <PageHero
        eyebrow="A PLACE FOR EVERY STORY"
        title={
          <>
            About <em>KILF.</em>
          </>
        }
        description="A celebration of ideas, people and a more human tomorrow."
      />
      <section className="editorial-split container section-bottom">
        <div className="editorial-copy" data-reveal suppressHydrationWarning>
          <p className="eyebrow">01 / WHAT IS KILF?</p>
          <h2>
            Rooted here.
            <br />
            <em>Reaching everywhere.</em>
          </h2>
          <p>
            The Kollam International Literature Festival is a meeting of words,
            people and possibilities. A place where writers, thinkers, artists
            and readers can enter the same conversation.
          </p>
          <p>
            From the shores of Kerala, we look outward. Across languages, across
            disciplines, across everything that keeps us apart.
          </p>
          <HandwrittenQuote>Stories travel further here.</HandwrittenQuote>
        </div>
        <div className="editorial-image">
          <Image
            src={images.backwaters}
            alt="Traditional houseboats on Kerala’s backwaters"
            fill
            sizes="(max-width:768px) 100vw, 50vw"
            data-parallax
            suppressHydrationWarning
          />
        </div>
      </section>
      <section className="paper section">
        <div className="container story-grid">
          <div data-reveal suppressHydrationWarning>
            <p className="eyebrow">02 / OUR STORY</p>
            <h2>
              A city of exchanges.
              <br />A festival of <em>ideas.</em>
            </h2>
          </div>
          <div>
            <p>
              Kollam is our starting point: a coastal city where people,
              languages and cultures meet. KILF draws on that spirit of openness
              to imagine a new space for literature and conversation.
            </p>
            <p>
              This first website introduces the festival’s vision. The approved
              programme, speaker announcements and the full festival story will
              follow.
            </p>
          </div>
        </div>
      </section>
      <section className="section container vision-grid">
        <div data-reveal suppressHydrationWarning>
          <p className="eyebrow">03 / OUR VISION</p>
          <h2>
            A more human
            <br />
            <em>tomorrow.</em>
          </h2>
          <p>
            A world where listening is an act of possibility, difference sparks
            curiosity and stories help us find common ground.
          </p>
        </div>
        <div data-reveal suppressHydrationWarning>
          <p className="eyebrow">04 / OUR MISSION</p>
          <h2>
            Make space.
            <br />
            <em>Start something.</em>
          </h2>
          <p>
            Bring diverse voices together. Encourage thoughtful disagreement.
            Connect literature with the questions of everyday life, and welcome
            the next generation of readers.
          </p>
        </div>
      </section>
      <section className="beliefs-section paper section">
        <div className="container">
          <p className="eyebrow">05 / WHY KILF? · WHAT WE BELIEVE</p>
          <h2>
            Because a conversation
            <br />
            can change <em>everything.</em>
          </h2>
          <div className="beliefs-grid">
            {beliefs.map((b, i) => (
              <article key={b.title} data-reveal suppressHydrationWarning>
                <span className="belief-number">0{i + 1}</span>
                <h3>{b.title}</h3>
                <p>{b.text}</p>
              </article>
            ))}
          </div>
          <Button href="/speakers">Explore the voices</Button>
        </div>
      </section>
    </>
  );
}
