import type { Metadata } from "next";
import { Cormorant_Garamond, DM_Sans, Caveat } from "next/font/google";
import Script from "next/script";
import { Header } from "@/components/header";
import { Footer, Newsletter } from "@/components/footer";
import { MotionProvider } from "@/components/motion-provider";
import { GrainOverlay } from "@/components/decorations";
import { site } from "@/data/site";
import "./globals.css";
import "./home-editorial.css";
import "./intro.css";
const serif = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-display",
  display: "swap",
});
const sans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});
const handwriting = Caveat({ subsets: ["latin"], weight: "400", variable: "--font-handwriting", display: "swap" });
export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "KILF — Kollam International Literature Festival",
    template: "%s — KILF",
  },
  description: site.description,
  alternates: { canonical: "/" },
  icons: { icon: "/images/kilf-mark.png" },
  openGraph: {
    title: site.title,
    description: site.description,
    type: "website",
    images: [
      {
        url: "/images/lighthouse.webp",
        width: 761,
        height: 508,
        alt: "Kollam lighthouse at sunset",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: site.title,
    description: site.description,
  },
  robots: { index: true, follow: true },
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={serif.variable + " " + sans.variable + " " + handwriting.variable}
      suppressHydrationWarning
    >
      <body>
        <Script id="kilf-intro-seen" strategy="beforeInteractive">
          {`try{if(sessionStorage.getItem('kilf-intro-shown')==='1'){document.documentElement.classList.add('intro-seen')}}catch(e){}`}
        </Script>
        <a href="#main-content" className="skip-link">
          Skip to content
        </a>
        <Header />
        <main id="main-content">{children}<Newsletter /></main>
        <Footer />
        <GrainOverlay />
        <MotionProvider />
      </body>
    </html>
  );
}
