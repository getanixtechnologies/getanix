"use client";
import { useState } from "react";
import Link from "next/link";
import { ArrowUpRight, CheckCircle2, LoaderCircle } from "lucide-react";
import { submissionSchema } from "@/lib/validation";
type Status = "idle" | "loading" | "success" | "error";
export function FestivalForm({
  kind,
  defaultSubject = "",
}: {
  kind: "contact" | "volunteer" | "newsletter";
  defaultSubject?: string;
}) {
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");
  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const values = {
      ...Object.fromEntries(data.entries()),
      kind,
      consent: data.get("consent") === "on",
      availability: data.getAll("availability"),
    };
    const parsed = submissionSchema.safeParse(values);
    if (!parsed.success) {
      setStatus("error");
      setMessage(parsed.error.issues[0].message);
      return;
    }
    setStatus("loading");
    setMessage("");
    try {
      const response = await fetch("/api/submissions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...parsed.data, website: data.get("website") }),
      });
      const result = await response.json();
      if (!response.ok)
        throw new Error(
          result.error || "Something went wrong. Please try again.",
        );
      setStatus("success");
      setMessage(result.message);
      form.reset();
    } catch (error) {
      setStatus("error");
      setMessage(
        error instanceof Error
          ? error.message
          : "Could not send. Please try again.",
      );
    }
  }
  return (
    <form
      onSubmit={submit}
      className={
        "festival-form " + (kind === "newsletter" ? "newsletter-form" : "")
      }
      aria-label={
        kind === "newsletter"
          ? "Festival newsletter"
          : kind === "contact"
            ? "Contact form"
            : "Volunteer application"
      }
    >
      <div className="honeypot" aria-hidden>
        <label>
          Website
          <input name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>
      <fieldset disabled={status === "loading"}>
        <legend className="sr-only">{kind} details</legend>
        {kind === "newsletter" ? (
          <>
            <div className="newsletter-input">
              <label className="sr-only" htmlFor="newsletter-email">
                Newsletter email address
              </label>
              <input
                id="newsletter-email"
                name="email"
                type="email"
                placeholder="Your email address"
                required
                autoComplete="email"
                maxLength={254}
              />
              <button type="submit" aria-label="Subscribe to festival updates">
                {status === "loading" ? (
                  <LoaderCircle className="spin" size={20} />
                ) : (
                  <ArrowUpRight size={23} />
                )}
              </button>
            </div>
            <label className="check-label">
              <input type="checkbox" name="consent" required />I agree to
              receive festival updates. <Link href="/privacy">Privacy</Link>
            </label>
          </>
        ) : (
          <>
            <div className="form-grid">
              <label>
                Full name
                <input
                  name="name"
                  autoComplete="name"
                  placeholder="Your name"
                  required
                  minLength={2}
                  maxLength={100}
                />
              </label>
              <label>
                Email address
                <input
                  name="email"
                  type="email"
                  autoComplete="email"
                  placeholder="you@example.com"
                  required
                  maxLength={254}
                />
              </label>
              {kind === "volunteer" && (
                <>
                  <label>
                    Phone number
                    <input
                      name="phone"
                      type="tel"
                      autoComplete="tel"
                      required
                      placeholder="+91"
                      maxLength={20}
                    />
                  </label>
                  <label>
                    Age
                    <input
                      name="age"
                      type="number"
                      min={18}
                      max={100}
                      required
                      placeholder="18+"
                    />
                  </label>
                  <label>
                    City
                    <input
                      name="city"
                      autoComplete="address-level2"
                      required
                      minLength={2}
                      maxLength={100}
                    />
                  </label>
                  <label>
                    Area of interest
                    <select name="interest" required defaultValue="">
                      <option value="" disabled>
                        Select an area
                      </option>
                      {[
                        "Guest hospitality",
                        "Stage & sessions",
                        "Registration",
                        "Media & storytelling",
                        "Venue operations",
                      ].map((v) => (
                        <option key={v}>{v}</option>
                      ))}
                    </select>
                  </label>
                </>
              )}
            </div>
            {kind === "contact" ? (
              <>
                <label>
                  Subject
                  <input
                    name="subject"
                    defaultValue={defaultSubject}
                    required
                    minLength={3}
                    maxLength={200}
                    placeholder="What would you like to talk about?"
                  />
                </label>
                <label>
                  Message
                  <textarea
                    name="message"
                    required
                    minLength={10}
                    maxLength={5000}
                    rows={5}
                    placeholder="Tell us a little more…"
                  />
                </label>
              </>
            ) : (
              <>
                <fieldset className="availability">
                  <legend>
                    When can you join us? Select at least one day.
                  </legend>
                  <div>
                    {["Jan 15", "Jan 16", "Jan 17", "Jan 18"].map((day) => (
                      <label className="check-label" key={day}>
                        <input
                          type="checkbox"
                          name="availability"
                          value={day}
                        />
                        {day}
                      </label>
                    ))}
                  </div>
                </fieldset>
                <label>
                  Previous experience <span className="muted">(optional)</span>
                  <textarea
                    name="experience"
                    rows={3}
                    maxLength={3000}
                    placeholder="Events, creative projects, community work…"
                  />
                </label>
                <label>
                  Why would you like to volunteer?
                  <textarea
                    name="motivation"
                    rows={4}
                    required
                    minLength={20}
                    maxLength={3000}
                  />
                </label>
                <label className="check-label">
                  <input type="checkbox" name="consent" required />I agree to be
                  contacted about my application and have read the{" "}
                  <Link href="/privacy">privacy notice</Link>.
                </label>
              </>
            )}
            <button className="button button-primary" type="submit">
              {status === "loading" ? (
                <>
                  Sending <LoaderCircle className="spin" size={16} />
                </>
              ) : (
                <>
                  {kind === "contact" ? "Send message" : "Submit application"}
                  <ArrowUpRight size={17} />
                </>
              )}
            </button>
          </>
        )}
      </fieldset>
      {message && (
        <p
          className={"form-message " + status}
          role={status === "error" ? "alert" : "status"}
        >
          {status === "success" && <CheckCircle2 size={18} />} {message}
        </p>
      )}
    </form>
  );
}
