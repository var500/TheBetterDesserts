import { useState } from "react";
import { Text } from "~/components/ui/text";

import type { FAQItem } from "~/common/types";

interface ProductFAQProps {
  faqs?: FAQItem[] | null;
}

export function ProductFAQ({ faqs }: ProductFAQProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  // If there are no FAQs, don't render the section at all
  if (!faqs || faqs.length === 0) return null;

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-16 px-4 md:px-8 max-w-3xl mx-auto w-full">
      <Text
        variant={"secondary"}
        as="h3"
        className="text-3xl md:text-5xl  tracking-wider text-primary-dark mb-10 text-center"
      >
        FAQs
      </Text>

      <div className="flex flex-col gap-4">
        {faqs.map((faq, index) => {
          const isOpen = openIndex === index;

          return (
            <div
              key={index}
              className="bg-primary-dark/5 rounded-2xl border border-primary-dark/10 overflow-hidden transition-all duration-200"
            >
              {/* Question / Clickable Header */}
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full flex items-center justify-between p-6 text-left focus:outline-none"
              >
                <Text
                  as="h4"
                  variant={"primary"}
                  className="text-lg font-playfair tracking-wide  font-semibold text-primary-dark pr-4"
                >
                  {faq.question}
                </Text>

                {/* Plus / Minus Icon */}
                <div
                  className={`shrink-0 text-primary-dark/60 transition-transform duration-300 ${isOpen ? "rotate-45" : "rotate-0"}`}
                >
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <line x1="12" y1="5" x2="12" y2="19"></line>
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                  </svg>
                </div>
              </button>

              {/* Answer / Dropdown Content */}
              <div
                className={`grid transition-all duration-300 ease-in-out ${
                  isOpen
                    ? "grid-rows-[1fr] opacity-100"
                    : "grid-rows-[0fr] opacity-0"
                }`}
              >
                <div className="overflow-hidden">
                  <div className="p-6 pt-0">
                    <Text
                      as="p"
                      className="text-primary-dark/80 leading-relaxed whitespace-pre-wrap"
                    >
                      {faq.answer}
                    </Text>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
