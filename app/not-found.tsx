import { Button } from "@/components/ui";
export default function NotFound() {
  return (
    <section className="container empty-page">
      <p className="eyebrow">404 / A PAGE NOT YET WRITTEN</p>
      <h1>
        This story took
        <br />a different <em>turn.</em>
      </h1>
      <p>We couldn’t find the page you were looking for.</p>
      <Button href="/">Back to the festival</Button>
    </section>
  );
}
