export const site = {
  name: "KILF",
  title: "Kollam International Literature Festival",
  description:
    "Kollam International Literature Festival — a celebration of stories, ideas, people and a more human tomorrow.",
  tagline: "Words. People. Possibilities.",
  dates: "Jan 15–18, 2026",
  location: "Asramam Maidan, Kollam",
  url: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
  email: process.env.NEXT_PUBLIC_CONTACT_EMAIL || "",
  phone: process.env.NEXT_PUBLIC_CONTACT_PHONE || "",
  socials: { instagram: "", x: "", facebook: "", youtube: "" },
};
export const navigation = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Speakers", href: "/speakers" },
  { label: "Schedule", href: "/schedule" },
  { label: "Partners", href: "/partners" },
  { label: "Venue", href: "/venue" },
  { label: "Contact", href: "/contact" },
];
export const images = {
  lighthouse: "/images/lighthouse.webp",
  backwaters: "/images/backwaters.webp",
  maidan: "/images/maidan.webp",
  coast: "/images/coast.webp",
  volunteer: "/images/volunteer.webp",
  logo: "/images/kilf-mark.png",
};
export const stats = [
  { value: 50, suffix: "+", label: "Speakers" },
  { value: 100, suffix: "+", label: "Sessions" },
  { value: 25, suffix: "+", label: "Countries" },
  { value: 4, suffix: "", label: "Days" },
  { value: null, suffix: "∞", label: "Ideas" },
];
export const beliefs = [
  {
    title: "Global conversations",
    text: "Stories travel across languages, geographies and generations. This is a place to meet them.",
  },
  {
    title: "Diverse voices",
    text: "A richer conversation begins when more people have a place in it.",
  },
  {
    title: "Inclusive & accessible",
    text: "Literature belongs to everyone. We imagine a festival that welcomes curiosity in all its forms.",
  },
  {
    title: "A platform for change",
    text: "A good story can change how we see. A conversation can change what comes next.",
  },
];
