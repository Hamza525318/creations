import React from "react";
import { cn } from "@/lib/utils";
import Container from "./container";

interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
  id?: string;
  className?: string;
  containerClassName?: string;
  variant?: "ivory" | "white" | "sand" | "olive" | "burgundy";
  fullWidth?: boolean;
}

export default function Section({
  children,
  id,
  className,
  containerClassName,
  variant = "ivory",
  fullWidth = false,
  ...props
}: SectionProps) {
  const variantStyles = {
    ivory: "bg-background text-espresso",
    white: "bg-card text-espresso border-y border-border/60",
    sand: "bg-sand text-espresso",
    olive: "bg-olive text-ivory",
    burgundy: "bg-burgundy text-ivory",
  };

  return (
    <section
      id={id}
      className={cn(
        "py-16 sm:py-20 md:py-24 lg:py-28 relative overflow-hidden",
        variantStyles[variant],
        className
      )}
      {...props}
    >
      {fullWidth ? (
        children
      ) : (
        <Container className={containerClassName}>{children}</Container>
      )}
    </section>
  );
}
