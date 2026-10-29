import { FaPlus } from "react-icons/fa6";

interface FAQItem {
  question: string;
  answer: string;
}

// Native <details> accordion: keyboard accessible and works without JS.
export default function FAQ({ faq, title = "Frequently asked questions" }: { faq: FAQItem[]; title?: string }) {
  return (
    <section aria-labelledby="faq-heading" className="rounded-3xl bg-white p-6 shadow-card sm:p-10">
      <h2 id="faq-heading" className="mb-6 text-2xl font-semibold text-ocean-900 sm:text-3xl">
        {title}
      </h2>
      <div className="divide-y divide-sand-200">
        {faq.map((item) => (
          <details key={item.question} className="group py-1">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-4 font-semibold text-ocean-900 marker:hidden hover:text-lagoon-700 [&::-webkit-details-marker]:hidden">
              {item.question}
              <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-lagoon-100 text-lagoon-700 transition-transform duration-300 group-open:rotate-45">
                <FaPlus aria-hidden className="h-3 w-3" />
              </span>
            </summary>
            <p className="pb-5 pr-12 leading-relaxed text-muted">{item.answer}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
