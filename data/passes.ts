export type Pass = {
  id: "day" | "festival" | "student";
  name: string;
  price: number;
  access: string;
  benefits: string[];
  popular?: boolean;
};
export const passes: Pass[] = [
  {
    id: "day",
    name: "Day Pass",
    price: 499,
    access: "A day of discovery.",
    benefits: [
      "All sessions on your selected day",
      "Festival exhibitions",
      "Food court access",
    ],
  },
  {
    id: "festival",
    name: "Festival Pass",
    price: 1499,
    access: "The whole story. All four days.",
    benefits: [
      "Access to all 4 days",
      "All stage sessions",
      "Festival exhibitions",
      "Food court access",
      "Exclusive festival merchandise",
    ],
    popular: true,
  },
  {
    id: "student",
    name: "Student Pass",
    price: 299,
    access: "For the next generation of voices.",
    benefits: [
      "All 4 festival days",
      "All stage sessions",
      "Festival exhibitions",
      "Valid student ID required",
    ],
  },
];
export const formatPrice = (price: number) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(price);
