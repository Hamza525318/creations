import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex flex-row items-center justify-center gap-2 whitespace-nowrap rounded-full text-sm font-semibold transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-burgundy focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default:
          "bg-burgundy text-ivory hover:bg-burgundy-dark shadow-none active:scale-[0.99]",
        primary:
          "bg-burgundy text-ivory hover:bg-burgundy-dark shadow-none active:scale-[0.99]",
        secondary:
          "border border-burgundy bg-transparent text-burgundy hover:bg-burgundy hover:text-ivory active:scale-[0.99]",
        outline:
          "border border-border bg-transparent text-espresso hover:border-burgundy hover:text-burgundy",
        ghost:
          "bg-transparent text-espresso hover:bg-sand/50 hover:text-burgundy",
        link: "p-0 text-burgundy underline-offset-4 hover:underline font-normal h-auto",
        textCta:
          "p-0 text-burgundy font-medium hover:text-burgundy-dark inline-flex items-center gap-1.5 transition-transform hover:translate-x-0.5 h-auto",
      },
      size: {
        default: "h-12 px-6 py-3 min-h-[48px]",
        sm: "h-10 px-4 py-2 text-xs min-h-[40px]",
        lg: "h-13 px-8 py-3.5 text-base min-h-[52px]",
        icon: "h-11 w-11 p-0 rounded-full",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
