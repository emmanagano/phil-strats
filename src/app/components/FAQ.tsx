"use client";

import { useState } from "react";

const faqs = [
  {
    question: "What is Phil Strats?",
    answer:
      "Phil Strats is your go-to travel and culture guide to the Philippines. We explore destinations, traditions, food, and local stories to help travelers experience the country beyond the usual tourist spots.",
  },
  {
    question: "Who writes the content on this site?",
    answer:
      "Our articles are written and curated by a small team of Filipino travelers, writers, and digital creators who have explored different parts of the Philippines firsthand.",
  },
  {
    question: "What sort of topics do we cover?",
    answer:
      "We cover travel guides, itineraries, food spots, cultural insights, and off-the-beaten-path adventures from all over the Philippines — from iconic islands to hidden gems.",
  },
  {
    question: "Is the content based on facts, opinions, or both?",
    answer:
      "Our guides blend firsthand experiences, factual travel details, and local perspectives to ensure readers get accurate and authentic insights about each destination.",
  },
  {
    question: "Can I suggest a topic or article idea?",
    answer:
      "Absolutely! We welcome story ideas, travel tips, or local experiences you’d like us to feature. Just reach out through our contact page or social media.",
  },
  {
    question: "Do you accept guest writers or contributors?",
    answer:
      "Yes, we occasionally collaborate with Filipino and international writers who share our passion for travel and culture. Send us a short pitch if you're interested!",
  },
  {
    question: "Why are the topics on this site relevant today?",
    answer:
      "The Philippines is one of Asia’s fastest-growing travel destinations. Our content highlights authentic, sustainable, and locally-rooted experiences that matter in today’s tourism landscape.",
  },
  {
    question: "How often is the site updated with new content?",
    answer:
      "We update our site regularly with new destination guides, seasonal picks, and travel insights — usually every week or two.",
  },
  {
    question: "How can I contact you directly?",
    answer: "You can reach us through our contact page.",
  },
  {
    question: "Can I share or repost your articles?",
    answer:
      "Yes, you’re welcome to share our articles on social media or with friends, as long as you credit Phil Strats and link back to the original post.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="mt-16 max-w-2xl mx-auto">
      <h2 className="text-2xl font-semibold text-center mb-6 text-gray-800">
        Frequently Asked Questions
      </h2>
      <div className="space-y-1">
        {faqs.map((faq, index) => (
          <div key={index} className="border-b border-gray-200">
            <button
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
              className="w-full text-left px-4 py-3 focus:outline-none"
            >
              <div className="flex justify-between items-center">
                <span
                  className={`text-sm sm:text-base transition-colors duration-200 ${
                    openIndex === index
                      ? "font-semibold text-gray-800"
                      : "font-medium text-gray-800"
                  }`}
                >
                  {faq.question}
                </span>
                <span
                  className={`text-lg font-bold transition-colors duration-200 ${
                    openIndex === index ? "text-blue-700" : "text-gray-500"
                  }`}
                >
                  {openIndex === index ? "−" : "+"}
                </span>
              </div>
            </button>
            <div
              className={`overflow-hidden transition-all duration-300 text-sm leading-relaxed ${
                openIndex === index ? "max-h-96" : "max-h-0"
              }`}
            >
              <div className="px-4 pb-4 pt-2 bg-gray-100 text-gray-800">
                {faq.answer}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
