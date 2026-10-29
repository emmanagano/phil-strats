import type { Metadata } from "next";
import { FaInstagram, FaXTwitter } from "react-icons/fa6";
import { siteFaq } from "@/data/siteFaq";
import { SOCIALS } from "@/lib/site";
import FAQ from "@/app/components/FAQ";
import PageHero from "@/app/components/PageHero";
import Container from "@/app/components/ui/Container";
import ContactForm from "./ContactForm";

export const metadata: Metadata = {
  title: "Contact",
  description: "Questions, destination tips, or collaboration ideas — get in touch with Phil Strats.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Let's talk travel"
        description="Got a question, a hidden gem we should know about, or an idea for a story? Send us a message."
      />
      <Container className="pb-20">
        <div className="grid gap-10 lg:grid-cols-5">
          <div className="space-y-6 lg:col-span-2">
            <div className="rounded-3xl bg-lagoon-700 p-8 text-white">
              <h2 className="text-2xl font-semibold">Find us online</h2>
              <p className="mt-2 text-lagoon-50/90">
                Daily island snaps and travel notes live on our socials.
              </p>
              <div className="mt-6 flex flex-col gap-3">
                <a
                  href={SOCIALS.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 rounded-full bg-white/10 px-5 py-3 font-semibold transition hover:bg-white hover:text-ocean-900"
                >
                  <FaInstagram aria-hidden className="h-5 w-5" /> Instagram
                </a>
                <a
                  href={SOCIALS.x}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 rounded-full bg-white/10 px-5 py-3 font-semibold transition hover:bg-white hover:text-ocean-900"
                >
                  <FaXTwitter aria-hidden className="h-5 w-5" /> X (Twitter)
                </a>
              </div>
            </div>
            <div className="rounded-3xl bg-mango-100 p-8">
              <h2 className="text-2xl font-semibold text-ocean-900">Reply time</h2>
              <p className="mt-2 text-ocean-800">We usually answer within two or three days.</p>
            </div>
          </div>
          <div className="lg:col-span-3">
            <ContactForm />
          </div>
        </div>
        <div className="mx-auto mt-20 max-w-3xl">
          <FAQ faq={siteFaq} />
        </div>
      </Container>
    </>
  );
}
