import React from "react";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "outline" | "danger";
  className?: string;
}

export default function Badge({
  children,
  variant = "primary",
  className = "",
}: BadgeProps) {
  const baseStyles =
    "inline-block font-bold tracking-widest uppercase px-4 py-1 rounded-full text-xs w-max mb-6";

  const variants = {
    primary: "bg-[#F5F0E6] text-[#1A243F]",
    secondary: "bg-[#1A243F] text-[#F5F0E6]",
    outline: "border border-[#1A243F] text-[#1A243F] bg-transparent",
    danger: "bg-red-100 text-red-800",
  };

  return (
    <div className={`${baseStyles} ${variants[variant]} ${className}`}>
      {children}
    </div>
  );
}
