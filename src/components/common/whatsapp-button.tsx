import React from "react";
import { MessageCircle } from "lucide-react";
import { Button, ButtonProps } from "@/components/ui/button";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";

interface WhatsAppButtonProps extends ButtonProps {
  label?: string;
  className?: string;
}

export default function WhatsAppButton({
  label = "Chat on WhatsApp",
  className,
  variant = "default",
  size = "default",
  ...props
}: WhatsAppButtonProps) {
  return (
    <Button
      asChild
      variant={variant}
      size={size}
      className={cn("group shrink-0", className)}
      {...props}
    >
      <a
        href={siteConfig.whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp with CREATION'S"
        className="inline-flex flex-row items-center justify-center gap-2 whitespace-nowrap"
      >
        <MessageCircle className="h-4 w-4 shrink-0 transition-transform duration-300 group-hover:scale-110" />
        <span className="whitespace-nowrap">{label}</span>
      </a>
    </Button>
  );
}
