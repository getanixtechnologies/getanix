import Link from "next/link";
import { ArrowUpRight, ArrowRight } from "lucide-react";
import { useId, type ReactNode } from "react";
export function Logo({ large = false }: { large?: boolean }) {
  const maskId = useId();
  return (
    <svg className={large ? "reference-logo large" : "reference-logo"} viewBox="0 0 548 821" role="img" aria-label="KILF — Kollam International Literature Festival">
      <defs>
        <filter id={maskId} colorInterpolationFilters="sRGB">
          <feFlood floodColor="#c8a45d" />
          <feComposite in2="SourceAlpha" operator="in" />
        </filter>
      </defs>
      <image href="/images/kilf-logo-supplied.png" width="548" height="821" filter={"url(#" + maskId + ")"} />
    </svg>
  );
}
export function Button({
  href,
  children,
  variant = "primary",
  className = "",
  external = false,
}: {
  href: string;
  children: ReactNode;
  variant?: "primary" | "outline" | "text";
  className?: string;
  external?: boolean;
}) {
  return (
    <Link
      href={href}
      className={"button button-" + variant + " " + className}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
    >
      {children}
      <ArrowUpRight size={16} aria-hidden />
    </Link>
  );
}
export function SectionHeading({
  eyebrow,
  title,
  description,
  children,
}: {
  eyebrow?: string;
  title: ReactNode;
  description?: string;
  children?: ReactNode;
}) {
  return (
    <div className="section-heading" data-reveal suppressHydrationWarning>
      <div>
        {eyebrow && <p className="eyebrow">{eyebrow}</p>}
        <h2>{title}</h2>
        {description && <p className="section-description">{description}</p>}
      </div>
      {children}
    </div>
  );
}
export function PageHero({
  eyebrow,
  title,
  description,
  children,
}: {
  eyebrow?: string;
  title: ReactNode;
  description?: string;
  children?: ReactNode;
}) {
  return (
    <section className="page-hero container">
      <p className="eyebrow" data-reveal suppressHydrationWarning>
        {eyebrow || "KOLLAM INTERNATIONAL LITERATURE FESTIVAL"}
      </p>
      <h1 data-reveal suppressHydrationWarning>
        {title}
      </h1>
      {description && (
        <p className="lead" data-reveal suppressHydrationWarning>
          {description}
        </p>
      )}
      {children}
      <div className="hero-rule" />
    </section>
  );
}
export function TextLink({
  href,
  children,
}: {
  href: string;
  children: ReactNode;
}) {
  return (
    <Link className="text-link" href={href}>
      {children}
      <ArrowRight size={17} aria-hidden />
    </Link>
  );
}
export function PreviewNote({ children }: { children?: ReactNode }) {
  return (
    <p className="preview-note">
      <span aria-hidden>○</span>
      {children ||
        "Programme preview · Names and sessions are illustrative, not confirmed announcements."}
    </p>
  );
}
