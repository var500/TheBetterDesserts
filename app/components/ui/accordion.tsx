import React, { useState } from "react";
import { cn } from "~/lib/utils";
import { Text } from "./text"; // Adjust this import path based on where text.tsx lives

export interface AccordionItemType {
  id: string;
  title: string | React.ReactNode;
  content: React.ReactNode;
}

interface AccordionProps extends React.HTMLAttributes<HTMLDivElement> {
  items: AccordionItemType[];
}

export const Accordion = React.forwardRef<HTMLDivElement, AccordionProps>(
  ({ items, className, ...props }, ref) => {
    const [openItem, setOpenItem] = useState<string | null>(null);

    const toggleItem = (id: string) => {
      setOpenItem((prev) => (prev === id ? null : id));
    };

    return (
      <div
        ref={ref}
        className={cn(
          "border-primary-dark/20 bg-primary-light mb-4 w-full border",
          className,
        )}
        {...props}
      >
        {items.map((item) => {
          const isOpen = openItem === item.id;

          return (
            <div
              key={item.id}
              className="border-primary-dark/20 border-b last:border-b-0"
            >
              {/* Accordion Header / Button */}
              <button
                onClick={() => toggleItem(item.id)}
                className="group hover:bg-primary-dark/5 flex w-full items-stretch justify-between text-left transition-colors"
                aria-expanded={isOpen}
              >
                <div className="flex-1 py-3 pr-2 pl-3 md:py-5 md:pr-4 md:pl-6">
                  <Text
                    as="span"
                    variant="secondary"
                    className="text-primary-dark text-lg tracking-wide md:text-2xl"
                  >
                    {item.title}
                  </Text>
                </div>

                {/* Icon Container */}
                <div className="border-primary-dark/20 text-primary-dark group-hover:bg-primary-dark/10 flex w-16 items-center justify-center border-l transition-colors">
                  {isOpen ? (
                    // Minus icon
                    <svg
                      className="h-6 w-6 font-light"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={1}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M20 12H4"
                      />
                    </svg>
                  ) : (
                    // Plus icon
                    <svg
                      className="h-6 w-6 font-light"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={1}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 4v16m8-8H4"
                      />
                    </svg>
                  )}
                </div>
              </button>

              {/* Accordion Content */}
              <div
                className={`grid transition-all duration-300 ease-in-out ${
                  isOpen
                    ? "grid-rows-[1fr] opacity-100"
                    : "grid-rows-[0fr] opacity-0"
                }`}
              >
                <div className="overflow-hidden">
                  <Text
                    as="div"
                    variant="primary"
                    className="px-3 pr-12 pb-6 text-sm leading-relaxed text-gray-600 md:px-6 md:text-base"
                  >
                    {item.content}
                  </Text>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    );
  },
);

Accordion.displayName = "Accordion";
