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
    <section className="mx-auto w-full max-w-3xl px-4 py-16 md:px-8">
      <Text
        variant={"secondary"}
        as="h3"
        className="text-primary-dark mb-10 text-center text-3xl tracking-wider md:text-5xl"
      >
        FAQs
      </Text>

      <div className="flex flex-col gap-4">
        {faqs.map((faq, index) => {
          const isOpen = openIndex === index;

          return (
            <div
              key={index}
              className="bg-primary-dark/5 border-primary-dark/10 overflow-hidden rounded-2xl border transition-all duration-200"
            >
              {/* Question / Clickable Header */}
              <button
                onClick={() => toggleFAQ(index)}
                className="flex w-full items-center justify-between p-6 text-left focus:outline-none"
              >
                <Text
                  as="h4"
                  variant={"primary"}
                  className="font-playfair text-primary-dark pr-4 text-lg font-semibold tracking-wide"
                >
                  {faq.question}
                </Text>

                {/* Plus / Minus Icon */}
                <div
                  className={`text-primary-dark/60 shrink-0 transition-transform duration-300 ${isOpen ? "rotate-45" : "rotate-0"}`}
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
