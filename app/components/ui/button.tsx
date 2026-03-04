import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "~/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center cursor-pointer font-black tracking-widest uppercase transition-all duration-300 shadow-lg disabled:opacity-50 disabled:pointer-events-none",
  {
    variants: {
      variant: {
        default:
          "bg-primary-dark text-white hover:bg-opacity-90 hover:-translate-y-1",
        // Added some extra variants for examples
        outline:
          "border-2 border-primary-dark text-primary-dark hover:bg-primary-dark hover:text-white shadow-none",
        ghost: "hover:bg-primary-dark/10 text-primary-dark shadow-none",
      },
      size: {
        // Your original sizes
        default: "px-10 py-4 text-sm md:text-base",
        sm: "px-6 py-2 text-xs",
        lg: "px-14 py-6 text-base md:text-lg",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

// 3. Create the Component
const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <button
        // Merge the variant classes with any custom classes passed in via `className`
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
