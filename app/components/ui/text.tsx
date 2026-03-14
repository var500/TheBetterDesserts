import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "~/lib/utils";

const textVariants = cva(
  // Base classes applied to all variants (400 font-weight)
  "",
  {
    variants: {
      variant: {
        primary: "font-satoshi",
        secondary: "font-playfair",
      },
    },
    defaultVariants: {
      variant: "secondary",
    },
  },
);

export interface TextProps
  extends React.HTMLAttributes<HTMLElement>, VariantProps<typeof textVariants> {
  // Allows you to pass 'span', 'h1', 'p', etc. Defaults to 'p'.
  as?: React.ElementType;
}

const Text = React.forwardRef<HTMLElement, TextProps>(
  ({ className, variant, as: Component = "p", ...props }, ref) => {
    return (
      <Component
        className={cn(textVariants({ variant, className }))}
        ref={ref}
        {...props}
      />
    );
  },
);
Text.displayName = "Text";

export { Text, textVariants };
