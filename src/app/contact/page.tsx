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
  description: "Questions, destination tips, or collaboration ideas? Get in touch with Phil Strats.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        tone="coral"
        images={["boracay-aklan", "batanes-islands", "vigan-and-laoag-ilocos"].map((s, i) => ({
          src: i === 0 ? `/images/${s}.jpg` : `/images/${s}-800.jpg`,
        }))}
        eyebrow="Contact"
        title="Let's talk travel"
        description="Got a question, a lesser-known spot we should know about, or an idea for a story? Send us a message."
      />
      <Container className="pb-20 pt-12 sm:pt-16">
        <div className="grid gap-10 lg:grid-cols-5">
          <div className="divide-y divide-sand-200 border-t-2 border-ocean-900 lg:col-span-2">
            <div className="pb-8 pt-6">
              <h2 className="text-2xl font-semibold text-ocean-900">Find us online</h2>
              <p className="mt-2 text-muted">Daily island snaps and travel notes live on our socials.</p>
              <div className="mt-5 flex flex-col gap-2 sm:flex-row lg:flex-col">
                <a
                  href={SOCIALS.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-11 items-center gap-3 rounded-control border border-sand-300 bg-white px-4 py-2.5 font-semibold text-ocean-900 transition hover:border-ocean-900 hover:bg-ocean-900 hover:text-white"
                >
                  <FaInstagram aria-hidden className="h-5 w-5" /> Instagram
                </a>
                <a
                  href={SOCIALS.x}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-11 items-center gap-3 rounded-control border border-sand-300 bg-white px-4 py-2.5 font-semibold text-ocean-900 transition hover:border-ocean-900 hover:bg-ocean-900 hover:text-white"
                >
                  <FaXTwitter aria-hidden className="h-5 w-5" /> X (Twitter)
                </a>
              </div>
            </div>
            <div className="py-8">
              <h2 className="text-2xl font-semibold text-ocean-900">Reply time</h2>
              <p className="mt-2 text-muted">We usually answer within two or three days.</p>
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
