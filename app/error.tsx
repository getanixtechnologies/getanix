"use client";
export default function ErrorPage({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <section className="container empty-page">
      <p className="eyebrow">A BRIEF INTERRUPTION</p>
      <h1>
        Let’s try that <em>again.</em>
      </h1>
      <p>Something went wrong while loading this page.</p>
      <button className="button button-primary" onClick={reset}>
        Try again
      </button>
    </section>
  );
}
