import { useId } from "react";
export function MaroonBrush({ className = "" }: { className?: string }) {
  const filterId = useId();
  return (
    <svg
      className={"maroon-brush " + className}
      viewBox="0 0 900 900"
      preserveAspectRatio="none"
      fill="none"
      aria-hidden
      suppressHydrationWarning
    >
      <filter id={filterId} x="-30%" y="-30%" width="160%" height="160%">
        <feTurbulence
          type="fractalNoise"
          baseFrequency="0.012 0.02"
          numOctaves="2"
          seed="7"
          result="noise"
        />
        <feDisplacementMap in="SourceGraphic" in2="noise" scale="8" />
      </filter>
      <g filter={"url(#" + filterId + ")"} strokeLinecap="round">
        <path
          d="M40 -20C220 130 300 300 470 400C660 512 760 610 940 800"
          stroke="#4A1418"
          strokeWidth="150"
          strokeOpacity=".5"
        />
        <path
          d="M40 -20C220 130 300 300 470 400C660 512 760 610 940 800"
          stroke="#6B1E22"
          strokeWidth="98"
          strokeOpacity=".62"
        />
        <path
          d="M40 -20C220 130 300 300 470 400C660 512 760 610 940 800"
          stroke="#84272C"
          strokeWidth="52"
          strokeOpacity=".5"
        />
        <path
          d="M40 -20C220 130 300 300 470 400C660 512 760 610 940 800"
          stroke="#C8A45D"
          strokeOpacity=".4"
          strokeWidth="2.5"
        />
      </g>
    </svg>
  );
}
export function GoldLine() {
  return (
    <svg
      className="gold-line"
      viewBox="0 0 120 22"
      aria-hidden
      fill="none"
      suppressHydrationWarning
    >
      <path
        d="M1 11C35 35 68-12 118 9M54 18C79 7 100 8 119 13"
        stroke="currentColor"
      />
    </svg>
  );
}
export function GrainOverlay() {
  return (
    <svg className="grain" aria-hidden>
      <filter id="grain-filter">
        <feTurbulence
          type="fractalNoise"
          baseFrequency=".75"
          numOctaves="3"
          stitchTiles="stitch"
        />
      </filter>
      <rect
        width="100%"
        height="100%"
        filter="url(#grain-filter)"
        opacity=".2"
      />
    </svg>
  );
}
export function HandwrittenQuote({ children }: { children: React.ReactNode }) {
  return <p className="handwritten">{children}</p>;
}
export function WaveDecoration() {
  return (
    <svg
      className="wave-decoration"
      viewBox="0 0 800 140"
      fill="none"
      aria-hidden
    >
      {[0, 12, 24, 36, 48].map((n) => (
        <path
          key={n}
          d={
            "M-50 " +
            (80 + n) +
            "C180 " +
            (-80 + n) +
            " 450 " +
            (250 + n) +
            " 850 " +
            (20 + n)
          }
          stroke="currentColor"
          strokeWidth=".7"
        />
      ))}
    </svg>
  );
}
