import type { Metadata } from "next";
import { FaCompass, FaEnvelopeOpenText, FaSun } from "react-icons/fa6";
import { getAllArticles } from "@/data/articles";
import PageHero from "@/app/components/PageHero";
import Container from "@/app/components/ui/Container";
import NewsletterForm from "@/app/components/ui/NewsletterForm";

export const metadata: Metadata = {
  title: "Newsletter",
  description: "Get new Phil Strats travel guides, seasonal picks, and hidden gems in your inbox every week.",
  alternates: { canonical: "/newsletter" },
};

const PERKS = [
  { icon: FaEnvelopeOpenText, title: "New guides first", text: "Every new destination guide, the week it's published." },
  { icon: FaSun, title: "Seasonal picks", text: "Where the weather's best, and when to skip typhoon season." },
  { icon: FaCompass, title: "Hidden gems", text: "Quiet beaches and local spots that don't make the big lists." },
];

export default function NewsletterPage() {
  const covers = getAllArticles().slice(0, 3);

  return (
    <>
      <PageHero
        eyebrow="Newsletter"
        title="A postcard from the islands, every week"
        description="One short email. New guides, seasonal tips, and a hidden gem or two. No spam, unsubscribe anytime."
      >
        <NewsletterForm id="newsletter-page" className="mt-8 max-w-xl" />
      </PageHero>
      <Container className="pb-24">
        <div className="grid gap-5 md:grid-cols-3">
          {PERKS.map(({ icon: Icon, title, text }) => (
            <div key={title} className="rounded-3xl bg-white p-8 shadow-card">
              <span className="grid h-12 w-12 place-items-center rounded-2xl bg-lagoon-100 text-lagoon-700">
                <Icon aria-hidden className="h-5 w-5" />
              </span>
              <h2 className="mt-5 text-xl font-semibold text-ocean-900">{title}</h2>
              <p className="mt-2 text-muted">{text}</p>
            </div>
          ))}
        </div>
        <div aria-hidden className="mt-16 flex justify-center">
          {covers.map((a, i) => (
            <img
              key={a.slug}
              src={a.image}
              alt=""
              loading="lazy"
              className={`h-56 w-40 rounded-3xl border-4 border-white object-cover shadow-card-hover sm:h-72 sm:w-52 ${
                ["-rotate-6 translate-y-4", "z-10 -mx-6", "rotate-6 translate-y-4"][i]
              }`}
            />
          ))}
        </div>
      </Container>
    </>
  );
}
