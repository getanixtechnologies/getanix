export type Session = {
  id: string;
  time: string;
  title: string;
  type: string;
  speaker: string;
  venue: string;
  description: string;
};
export type FestivalDay = {
  day: number;
  date: string;
  theme: string;
  sessions: Session[];
};
const times = [
  "09:00 AM",
  "10:30 AM",
  "12:00 PM",
  "02:00 PM",
  "04:00 PM",
  "06:00 PM",
];
const titles = [
  [
    "Inauguration Ceremony",
    "Literature in a Fractured World",
    "The Future of Storytelling",
    "Writing the Climate Crisis",
    "Poetry Without Borders",
    "An Evening Conversation",
  ],
  [
    "A Morning of New Voices",
    "The Art of Remembering",
    "Beyond the Translation",
    "The Stories We Inherit",
    "A Place for Poetry",
    "From Page to Screen",
  ],
  [
    "Reading the Coast",
    "Whose History Is It?",
    "The Everyday Extraordinary",
    "Words That Move Us",
    "On Art and Resistance",
    "A World in Conversation",
  ],
  [
    "Letters to Tomorrow",
    "Writing Across Borders",
    "Young Readers, Big Ideas",
    "The Human in the Story",
    "One Last Poem",
    "Until We Meet Again",
  ],
];
const types = [
  "Festival gathering",
  "Panel discussion",
  "Fireside chat",
  "Conversation",
  "Poetry reading",
  "Evening session",
];
export const schedule: FestivalDay[] = titles.map((items, index) => ({
  day: index + 1,
  date: "Jan " + (15 + index),
  theme: [
    "New beginnings",
    "Shared worlds",
    "Different perspectives",
    "More human tomorrow",
  ][index],
  sessions: items.map((title, i) => ({
    id: "day-" + (index + 1) + "-session-" + (i + 1),
    time: times[i],
    title,
    type: types[i],
    speaker: "Speakers to be announced",
    venue: i % 2 ? "The Conversation Stage" : "KILF Main Stage",
    description:
      "A space to listen, question and discover a different perspective. This illustrative session is part of the sample programme; final speakers and timings will be announced.",
  })),
}));
