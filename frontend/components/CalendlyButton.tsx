"use client";

import { Button } from "@/components/ui/Button";

export function CalendlyButton({ label = "Book a Discovery Call" }: { label?: string }) {
  const handleClick = () => {
    window.open("https://calendly.com/syshub365", "_blank", "noopener,noreferrer");
  };

  return (
    <Button variant="neon" className="w-full !rounded-xl" onClick={handleClick}>
      {label}
    </Button>
  );
}
