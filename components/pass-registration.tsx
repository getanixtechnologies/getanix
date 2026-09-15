"use client";
import { useRef, useState } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight, Check, LoaderCircle } from "lucide-react";
import { passes, formatPrice, type Pass } from "@/data/passes";
import { checkoutSchema } from "@/lib/validation";
type Attendee = {
  passId: "day" | "festival" | "student";
  name: string;
  email: string;
  phone: string;
  quantity: number;
  date?: string;
  studentId?: string;
  institution?: string;
  consent: true;
};
export function PassRegistration({
  paymentEnabled,
}: {
  paymentEnabled: boolean;
}) {
  const [selected, setSelected] = useState<Pass | null>(null);
  const [step, setStep] = useState(1);
  const [attendee, setAttendee] = useState<Attendee | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const panel = useRef<HTMLDivElement>(null);
  function select(pass: Pass) {
    setSelected(pass);
    setStep(2);
    setError("");
    setTimeout(() => {
      panel.current?.scrollIntoView({
        behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
          ? "instant"
          : "smooth",
        block: "start",
      });
      panel.current?.focus({ preventScroll: true });
    }, 50);
  }
  function review(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const values = new FormData(e.currentTarget);
    const parsed = checkoutSchema.safeParse({
      ...Object.fromEntries(values.entries()),
      passId: selected?.id,
      consent: values.get("consent") === "on",
    });
    if (!parsed.success) {
      setError(parsed.error.issues[0].message);
      return;
    }
    setAttendee(parsed.data);
    setStep(3);
    setError("");
    panel.current?.focus();
  }
  async function checkout() {
    if (!attendee) return;
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(attendee),
      });
      const data = await res.json();
      if (!res.ok)
        throw new Error(data.error || "Checkout could not be started.");
      if (
        typeof data.url !== "string" ||
        !data.url.startsWith("https://checkout.stripe.com/")
      )
        throw new Error(
          "Invalid checkout response. Please contact the festival.",
        );
      window.location.assign(data.url);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Please try again.");
      setLoading(false);
    }
  }
  return (
    <>
      <div className="pass-grid">
        {passes.map((pass) => (
          <article
            className={"pass-card " + (pass.popular ? "popular" : "")}
            key={pass.id}
          >
            {pass.popular && (
              <span className="popular-label">
                THE COMPLETE EXPERIENCE · MOST POPULAR
              </span>
            )}
            <p className="eyebrow">
              {pass.id === "day"
                ? "A LITTLE CURIOSITY"
                : pass.id === "festival"
                  ? "EVERY CHAPTER"
                  : "FRESH PERSPECTIVES"}
            </p>
            <h2>{pass.name}</h2>
            <p className="pass-price">
              {formatPrice(pass.price)}
              <small>/ person</small>
            </p>
            <p>{pass.access}</p>
            <ul>
              {pass.benefits.map((b) => (
                <li key={b}>
                  <Check size={16} />
                  {b}
                </li>
              ))}
            </ul>
            <button
              className="button button-primary"
              onClick={() => select(pass)}
            >
              Select {pass.name}
              <ArrowUpRight size={16} />
            </button>
          </article>
        ))}
      </div>
      <p className="preview-note">
        Preview pricing · Registration opens after the festival team confirms
        the programme and payment setup.
      </p>
      {selected && (
        <div className="registration-panel" ref={panel} tabIndex={-1}>
          <div className="registration-steps">
            <span className={step === 2 ? "active" : ""}>
              01 / Your details
            </span>
            <span className={step === 3 ? "active" : ""}>02 / Review</span>
            <span>03 / Secure payment</span>
          </div>
          <div className="registration-heading">
            <div>
              <p className="eyebrow">{selected.name}</p>
              <h2>{step === 2 ? "Make it your story." : "One last look."}</h2>
            </div>
            <button
              className="text-link"
              onClick={() => {
                if (step === 3) setStep(2);
                else setSelected(null);
              }}
            >
              <ArrowLeft size={16} />
              {step === 3 ? "Edit details" : "Change pass"}
            </button>
          </div>
          {step === 2 ? (
            <form className="festival-form" onSubmit={review}>
              <div className="form-grid">
                <label>
                  Full name
                  <input
                    name="name"
                    autoComplete="name"
                    required
                    minLength={2}
                    maxLength={100}
                    defaultValue={attendee?.name}
                  />
                </label>
                <label>
                  Email address
                  <input
                    type="email"
                    name="email"
                    autoComplete="email"
                    required
                    defaultValue={attendee?.email}
                  />
                </label>
                <label>
                  Phone number
                  <input
                    name="phone"
                    type="tel"
                    autoComplete="tel"
                    required
                    defaultValue={attendee?.phone}
                  />
                </label>
                <label>
                  Number of passes
                  <input
                    type="number"
                    name="quantity"
                    required
                    min={1}
                    max={10}
                    defaultValue={attendee?.quantity || 1}
                  />
                </label>
                {selected.id === "day" && (
                  <label>
                    Choose your day
                    <select
                      name="date"
                      required
                      defaultValue={attendee?.date || ""}
                    >
                      <option value="" disabled>
                        Select a day
                      </option>
                      {["Jan 15", "Jan 16", "Jan 17", "Jan 18"].map((d) => (
                        <option key={d}>{d}</option>
                      ))}
                    </select>
                  </label>
                )}
                {selected.id === "student" && (
                  <>
                    <label>
                      Institution
                      <input
                        name="institution"
                        required
                        maxLength={150}
                        defaultValue={attendee?.institution}
                      />
                    </label>
                    <label>
                      Student ID number
                      <input
                        name="studentId"
                        required
                        maxLength={100}
                        defaultValue={attendee?.studentId}
                      />
                    </label>
                    <p className="form-help">
                      Bring your original, valid student ID to the festival for
                      verification.
                    </p>
                  </>
                )}
              </div>
              <label className="check-label">
                <input
                  name="consent"
                  type="checkbox"
                  required
                  defaultChecked={attendee?.consent}
                />
                I have read the <Link href="/terms">booking terms</Link> and{" "}
                <Link href="/privacy">privacy notice</Link>.
              </label>
              <button className="button button-primary">
                Review registration
                <ArrowUpRight size={16} />
              </button>
            </form>
          ) : (
            attendee && (
              <div className="booking-review">
                <dl>
                  <div>
                    <dt>Attendee</dt>
                    <dd>{attendee.name}</dd>
                  </div>
                  <div>
                    <dt>Email</dt>
                    <dd>{attendee.email}</dd>
                  </div>
                  <div>
                    <dt>Phone</dt>
                    <dd>{attendee.phone}</dd>
                  </div>
                  <div>
                    <dt>Pass</dt>
                    <dd>
                      {selected.name} × {attendee.quantity}
                      {attendee.date ? " · " + attendee.date : ""}
                    </dd>
                  </div>
                  {selected.id === "student" && (
                    <div>
                      <dt>Student verification</dt>
                      <dd>{attendee.institution} · ID required at entry</dd>
                    </div>
                  )}
                  <div className="review-total">
                    <dt>Total</dt>
                    <dd>{formatPrice(selected.price * attendee.quantity)}</dd>
                  </div>
                </dl>
                {!paymentEnabled && (
                  <p className="form-message">
                    Registration is not open yet. No payment will be taken and
                    no booking has been made.
                  </p>
                )}
                <button
                  className="button button-primary"
                  disabled={loading || !paymentEnabled}
                  onClick={checkout}
                >
                  {loading ? (
                    <>
                      <LoaderCircle className="spin" size={16} />
                      Opening secure checkout…
                    </>
                  ) : (
                    <>
                      Continue to secure payment
                      <ArrowUpRight size={16} />
                    </>
                  )}
                </button>
              </div>
            )
          )}
          {error && (
            <p className="form-message error" role="alert">
              {error}
            </p>
          )}
        </div>
      )}
      <div className="pass-faq">
        <p className="eyebrow">GOOD TO KNOW</p>
        <h2>A few things, before you come.</h2>
        {[
          [
            "Can I attend individual sessions?",
            "Your selected pass provides access to the sessions listed in its benefits, subject to venue capacity. The final admission policy will be confirmed before sales open.",
          ],
          [
            "Do students need to bring ID?",
            "Yes. Student passes require a valid student ID, checked at entry. Enter your institution and ID number when registering.",
          ],
          [
            "Is registration open?",
            "This is the first website preview. Pricing and the sample programme need final approval. Checkout stays disabled until the festival configures payments.",
          ],
          [
            "What is the refund policy?",
            "The festival team will publish the approved cancellation and refund policy before registration opens.",
          ],
        ].map(([q, a]) => (
          <details key={q}>
            <summary>{q}</summary>
            <p>{a}</p>
          </details>
        ))}
      </div>
    </>
  );
}
