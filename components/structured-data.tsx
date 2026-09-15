import { site } from "@/data/site";
export function FestivalStructuredData() {
  const data = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": site.url + "/#organization",
        name: site.title,
        url: site.url,
        logo: site.url + "/images/kilf-mark.png",
      },
      {
        "@type": "Event",
        name: site.title,
        description: site.description,
        url: site.url,
        startDate: "2026-01-15",
        endDate: "2026-01-18",
        location: {
          "@type": "Place",
          name: "Asramam Maidan",
          address: {
            "@type": "PostalAddress",
            addressLocality: "Kollam",
            addressRegion: "Kerala",
            addressCountry: "IN",
          },
        },
        organizer: { "@id": site.url + "/#organization" },
      },
    ],
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  );
}
