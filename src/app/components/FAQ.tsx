import { FaPlus } from "react-icons/fa6";

interface FAQItem {
  question: string;
  answer: string;
}

// Native <details> accordion: keyboard accessible and works without JS.
export default function FAQ({ faq, title = "Frequently asked questions" }: { faq: FAQItem[]; title?: string }) {
  return (
    <section aria-labelledby="faq-heading" className="border-t-2 border-ocean-900 pt-8">
      <h2 id="faq-heading" className="mb-6 text-2xl font-semibold text-ocean-900 sm:text-3xl">
        {title}
      </h2>
      <div className="divide-y divide-sand-200 border-b border-sand-200">
        {faq.map((item) => (
          <details key={item.question} className="group">
            <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-6 py-4 font-semibold text-ocean-900 marker:hidden hover:underline [&::-webkit-details-marker]:hidden">
              {item.question}
              <span className="grid h-8 w-8 shrink-0 place-items-center text-ink-soft transition-transform duration-150 group-open:rotate-45">
                <FaPlus aria-hidden className="h-3.5 w-3.5" />
              </span>
            </summary>
            <p className="max-w-prose pb-6 pr-10 leading-relaxed text-ocean-800">{item.answer}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
