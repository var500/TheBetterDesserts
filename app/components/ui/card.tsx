import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "~/lib/utils";

const cardVariants = cva(
  // Base classes that ALL cards will have
  "flex flex-col overflow-hidden transition-all duration-300 group",
  {
    variants: {
      variant: {
        // The default bakery card you are using now
        default:
          "bg-white shadow-sm border border-primary-dark/5 hover:shadow-md",

        // A flat, solid colored card (good for banners or alternative sections)
        solid: "bg-[#E8E3D9] text-primary-dark border-none",

        // An outline-only card (good for minimal UI)
        outline:
          "bg-transparent border-2 border-primary-dark/10 hover:border-primary-dark/30 shadow-none",

        // A highly elevated card that floats up on hover (good for featured items)
        elevated:
          "bg-white shadow-lg hover:-translate-y-2 hover:shadow-2xl border border-primary-dark/5",
      },
      radius: {
        default: "rounded-2xl",
        sm: "rounded-lg",
        lg: "rounded-3xl",
        none: "rounded-none",
      },
    },
    defaultVariants: {
      variant: "default",
      radius: "default",
    },
  },
);

export interface CardProps
  extends
    React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardVariants> {}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant, radius, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(cardVariants({ variant, radius, className }))}
        {...props}
      />
    );
  },
);
Card.displayName = "Card";

export { Card, cardVariants };
