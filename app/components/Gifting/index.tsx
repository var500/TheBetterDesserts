import React, { useState } from "react";
import { Text } from "../ui/text";
import ProductAccordion from "./productAccordion";
import { hampersData } from "~/constants";
import { WhatsappLink } from "~/lib/utils";

export default function HamperShowcase() {
  const [activeHamper, setActiveHamper] = useState(hampersData[0]);
  const dynamicWhatsappLink = WhatsappLink(
    `Hi! I'd like to inquire about the ${activeHamper.title} hamper.`,
  );

  return (
    <div className="relative min-h-screen bg-white">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-20">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:items-start lg:gap-16">
          <div className="mx-auto flex w-full max-w-md flex-col gap-6 lg:sticky lg:top-24 lg:col-span-5 lg:max-w-none">
            <div className="relative aspect-square w-full overflow-hidden rounded-xl bg-[#F5F0E6] shadow-sm">
              <img
                key={activeHamper.id}
                src={activeHamper.image}
                alt={activeHamper.title}
                className="animate-in fade-in h-full w-full object-cover object-center duration-700 ease-out"
              />
            </div>

            <div className="grid grid-cols-3 gap-4">
              {hampersData.map((hamper) => (
                <button
                  key={hamper.id}
                  onClick={() => setActiveHamper(hamper)}
                  className={`group relative aspect-square overflow-hidden rounded-lg border-2 transition-all duration-300 ${
                    activeHamper.id === hamper.id
                      ? "border-[#C04B36] opacity-100 ring-4 ring-[#C04B36]/10"
                      : "border-transparent opacity-60 hover:opacity-100"
                  }`}
                >
                  <img
                    src={hamper.image}
                    alt={hamper.title}
                    className={`h-full w-full object-cover transition-transform duration-500 ${
                      activeHamper.id !== hamper.id && "group-hover:scale-110"
                    }`}
                  />
                </button>
              ))}
            </div>
          </div>

          <div className="flex flex-col lg:col-span-7 lg:pl-4">
            <div className="mb-4 flex flex-wrap items-center gap-4">
              <span className="rounded bg-[#E6EAF2] px-3 py-1 text-xs font-semibold tracking-wider text-[#5A6B8C] uppercase">
                {activeHamper.badge}
              </span>
              <Text
                as="span"
                variant="secondary"
                className="text-lg text-[#C04B36] italic"
              >
                {activeHamper.subtitle}
              </Text>
            </div>

            <Text
              as="h1"
              variant="secondary"
              className="mb-6 text-4xl tracking-tight text-gray-900 md:text-5xl lg:text-6xl"
            >
              {activeHamper.title}
            </Text>

            <Text
              as="p"
              variant="primary"
              className="mb-8 max-w-2xl text-base leading-relaxed text-gray-600 md:text-lg"
            >
              {activeHamper.description}
            </Text>

            <ul className="mb-10 space-y-4">
              {activeHamper.features.map((feature, index) => (
                <li key={index} className="flex items-center text-gray-700">
                  <svg
                    className="mr-4 h-5 w-5 shrink-0 text-[#C04B36]"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <Text
                    as="span"
                    variant="primary"
                    className="text-base font-medium"
                  >
                    {feature}
                  </Text>
                </li>
              ))}
            </ul>

            <div className="mb-12 flex flex-col gap-4 sm:flex-row">
              <a
                href={dynamicWhatsappLink}
                target="_blank"
                rel="noreferrer"
                className="group flex w-fit items-center justify-center rounded-md bg-[#25D366] px-8 py-4 text-base font-bold text-white shadow-md transition-all duration-300 hover:-translate-y-1 hover:bg-[#20bd5a] hover:shadow-lg"
              >
                <svg
                  className="mr-3 h-6 w-6 transition-transform group-hover:scale-110"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 00-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                </svg>
                Inquire via WhatsApp
              </a>
            </div>

            <div className="border-t border-gray-100 pt-8">
              <Text
                as="h2"
                variant="secondary"
                className="mb-6 text-2xl text-gray-900"
              >
                Product Details
              </Text>
              <ProductAccordion />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
