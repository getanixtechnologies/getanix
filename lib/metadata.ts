import type { Metadata } from "next";
import { site } from "@/data/site";
export function pageMetadata(
  title: string,
  description: string,
  path: string,
): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title: title + " — KILF",
      description,
      url: path,
      type: "website",
      siteName: site.title,
    },
    twitter: {
      card: "summary_large_image",
      title: title + " — KILF",
      description,
    },
  };
}
