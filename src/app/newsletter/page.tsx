import type { Metadata } from "next";
import { FaCompass, FaEnvelopeOpenText, FaSun } from "react-icons/fa6";
import { getAllArticles } from "@/data/articles";
import PageHero from "@/app/components/PageHero";
import Container from "@/app/components/ui/Container";
import NewsletterForm from "@/app/components/ui/NewsletterForm";

export const metadata: Metadata = {
  title: "Newsletter",
  description: "Get new Phil Strats travel guides, seasonal picks, and lesser-known spots in your inbox whenever we publish.",
  alternates: { canonical: "/newsletter" },
};

const PERKS = [
  { icon: FaEnvelopeOpenText, title: "New guides first", text: "Every new destination guide, the week it's published." },
  { icon: FaSun, title: "Seasonal picks", text: "Where the weather's best, and when to skip typhoon season." },
  { icon: FaCompass, title: "Lesser-known spots", text: "Quiet beaches and local spots that don't make the big lists." },
];

export default function NewsletterPage() {
  const covers = getAllArticles().slice(0, 3);

  return (
    <>
      <PageHero
        tone="mango"
        images={covers.map((a, i) => ({ src: i === 0 ? a.image : a.imageSmall }))}
        eyebrow="Newsletter"
        title="A postcard from the islands"
        description="One short email. New guides, seasonal tips, and a lesser-known spot or two. No spam. Unsubscribe anytime."
      >
        <NewsletterForm id="newsletter-page" className="mt-8 max-w-xl" />
      </PageHero>
      <Container className="pb-24 pt-12 sm:pt-16">
        <div className="grid gap-8 border-t-2 border-ocean-900 pt-8 md:grid-cols-3 md:gap-10">
          {PERKS.map(({ icon: Icon, title, text }) => (
            <div key={title}>
              <Icon aria-hidden className="h-6 w-6 text-coral-600" />
              <h2 className="mt-4 text-xl font-semibold text-ocean-900">{title}</h2>
              <p className="mt-2 text-muted">{text}</p>
            </div>
          ))}
        </div>
      </Container>
    </>
  );
}
