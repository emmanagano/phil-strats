"use client";
import React, { useState } from "react";

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQProps {
  faq: FAQItem[];
}

export default function FAQ({ faq }: FAQProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleIndex = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      {faq.map((item, index) => (
        <div key={index} className="border-b border-gray-300">
          <button
            onClick={() => toggleIndex(index)}
            className="w-full text-left py-4 px-3 flex justify-between items-center focus:outline-none"
          >
            <span className="font-semibold text-gray-800">{item.question}</span>
            <svg
              className={`w-5 h-5 text-gray-600 transform transition-transform duration-300 ${
                openIndex === index ? "rotate-180" : ""
              }`}
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>
          <div
            className={`overflow-hidden transition-all duration-300 px-3 ${
              openIndex === index ? "max-h-96 py-2" : "max-h-0"
            }`}
          >
            <p className="text-gray-700">{item.answer}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
