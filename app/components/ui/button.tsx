import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "~/lib/utils";

const buttonVariants = cva(
  "inline-flex font-satoshi items-center justify-center cursor-pointer font-black tracking-widest uppercase transition-all duration-300 shadow-lg disabled:opacity-50 disabled:pointer-events-none",
  {
    variants: {
      variant: {
        default:
          "bg-primary-dark text-white hover:bg-opacity-90 hover:-translate-y-1",
        // Added some extra variants for examples
        outline:
          "border-2 border-primary-dark text-primary-dark hover:bg-primary-dark hover:text-white shadow-none",
        ghost: "hover:bg-primary-dark/10 text-primary-dark shadow-none",
        light:
          "bg-primary-light text-primary-dark hover:bg-primary-light/90 shadow-none hover:-translate-y-1",
        orderNow:
          "border-2 border-[#F5F0E6] text-[#F5F0E6] hover:bg-[#F5F0E6] hover:text-[#1A243F] transition-all duration-300 px-8 py-3 w-max rounded-full font-medium",
        checkout:
          "group w-full bg-primary-dark text-[#F5F0E6] py-4 rounded-full font-bold hover:bg-black transition-all duration-300 flex items-center justify-center gap-3 shadow-lg hover:-translate-y-1",
        rounded:
          "w-full bg-primary-dark text-white py-4 rounded-full font-bold hover:bg-opacity-90 transition-all flex items-center justify-center gap-2 disabled:opacity-70",
        destructive:
          "text-red-600 bg-transparent hover:bg-red-50 border border-transparent hover:border-red-100 transition-all duration-300 shadow-none",
        none: "bg-none shadow-none ",
      },
      size: {
        // Your original sizes
        default: "px-10 py-4 text-sm md:text-base h-10",
        sm: "px-6 py-2 text-xs",
        lg: "px-14 py-6 text-base md:text-lg",
        "sm-to-default": "px-6 py-2 text-xs md:px-10 md:py-4 md:text-base",
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
