"use client";

import { useEffect, useRef } from "react";
import { Button } from "@/components/ui/Button";

export function CalendlyButton({ label = "Book a Discovery Call" }: { label?: string }) {
  const scriptLoaded = useRef(false);

  useEffect(() => {
    if (scriptLoaded.current) return;
    const script = document.createElement("script");
    script.src = "https://assets.calendly.com/assets/external/widget.js";
    script.async = true;
    document.body.appendChild(script);
    scriptLoaded.current = true;
  }, []);

  const handleClick = () => {
    (window as any).Calendly?.initPopupWidget({
      url: "https://calendly.com/syshub365",
    });
  };

  return (
    <Button variant="neon" className="w-full !rounded-xl" onClick={handleClick}>
      {label}
    </Button>
  );
}
