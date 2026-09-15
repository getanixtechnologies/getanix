import { z } from "zod";
const name = z.string().trim().min(2, "Please enter your full name.").max(100);
const email = z.email("Please enter a valid email address.").max(254);
const phone = z
  .string()
  .trim()
  .regex(/^\+?[\d\s()-]{7,20}$/, "Please enter a valid phone number.");
export const contactSchema = z.object({
  kind: z.literal("contact"),
  name,
  email,
  subject: z.string().trim().min(3).max(200),
  message: z.string().trim().min(10).max(5000),
});
export const newsletterSchema = z.object({
  kind: z.literal("newsletter"),
  email,
  consent: z.literal(true),
});
export const volunteerSchema = z.object({
  kind: z.literal("volunteer"),
  name,
  email,
  phone,
  age: z.coerce
    .number()
    .int()
    .min(18, "Applicants must be 18 or older.")
    .max(100),
  city: z.string().trim().min(2).max(100),
  interest: z.enum([
    "Guest hospitality",
    "Stage & sessions",
    "Registration",
    "Media & storytelling",
    "Venue operations",
  ]),
  availability: z
    .array(z.enum(["Jan 15", "Jan 16", "Jan 17", "Jan 18"]))
    .min(1, "Choose at least one day."),
  experience: z.string().max(3000),
  motivation: z
    .string()
    .trim()
    .min(20, "Please share at least 20 characters.")
    .max(3000),
  consent: z.literal(true),
});
export const submissionSchema = z.discriminatedUnion("kind", [
  contactSchema,
  newsletterSchema,
  volunteerSchema,
]);
export const checkoutSchema = z
  .object({
    passId: z.enum(["day", "festival", "student"]),
    name,
    email,
    phone,
    quantity: z.coerce.number().int().min(1).max(10),
    date: z.string().optional(),
    studentId: z.string().max(100).optional(),
    institution: z.string().max(150).optional(),
    consent: z.literal(true),
  })
  .superRefine((data, ctx) => {
    if (
      data.passId === "day" &&
      !["Jan 15", "Jan 16", "Jan 17", "Jan 18"].includes(data.date || "")
    )
      ctx.addIssue({
        code: "custom",
        path: ["date"],
        message: "Choose your festival day.",
      });
    if (
      data.passId === "student" &&
      (!(data.studentId || "").trim() || !(data.institution || "").trim())
    )
      ctx.addIssue({
        code: "custom",
        path: ["studentId"],
        message:
          "Enter your institution and student ID. Bring your original ID for verification.",
      });
  });
