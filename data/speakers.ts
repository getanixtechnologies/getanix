export type Speaker = {
  id: string;
  slug: string;
  name: string;
  role: string;
  category: string;
  country: string;
  image: string;
  bio: string;
  quote: string;
  sessions: string[];
  socials: { label: string; url: string }[];
  demo: true;
};
// Editorial preview only. These are NOT announcements or confirmed appearances.
// Images are illustrative crops from the supplied design reference.
const previews = [
  [
    "arundhati-roy",
    "Arundhati Roy",
    "Author & Activist",
    "Activists",
    "India",
    "The stories we tell. The worlds we imagine.",
  ],
  [
    "amitav-ghosh",
    "Amitav Ghosh",
    "Author & Historian",
    "Authors",
    "India",
    "Literature in a changing world.",
  ],
  [
    "megha-majumdar",
    "Megha Majumdar",
    "Author",
    "Authors",
    "India",
    "Finding the extraordinary in the everyday.",
  ],
  [
    "william-dalrymple",
    "William Dalrymple",
    "Historian & Author",
    "Thinkers",
    "United Kingdom",
    "The past is always in conversation with us.",
  ],
  [
    "jeet-thayil",
    "Jeet Thayil",
    "Poet & Novelist",
    "Poets",
    "India",
    "Between the lines, another world.",
  ],
  [
    "devdutt-pattanaik",
    "Devdutt Pattanaik",
    "Mythologist & Author",
    "Thinkers",
    "India",
    "Old stories. New ways of seeing.",
  ],
  [
    "tishani-doshi",
    "Tishani Doshi",
    "Author & Dancer",
    "Artists",
    "India",
    "Where words and movement meet.",
  ],
  [
    "p-sainath",
    "P. Sainath",
    "Journalist & Writer",
    "Authors",
    "India",
    "Listening to the stories less often heard.",
  ],
];
export const speakers: Speaker[] = previews.map(
  ([slug, name, role, category, country, quote], index) => ({
    id: "speaker-" + (index + 1),
    slug,
    name,
    role,
    category,
    country,
    quote,
    image: "/images/speaker-" + (index + 1) + ".webp",
    bio:
      "This is a sample profile for " +
      name +
      ", included to demonstrate the festival directory. Participation has not been confirmed. An approved biography, session details and official links will be published with the final programme.",
    sessions: [],
    socials: [],
    demo: true,
  }),
);
export const categories = [
  "Authors",
  "Thinkers",
  "Artists",
  "Activists",
  "Filmmakers",
  "Academics",
  "Poets",
];
