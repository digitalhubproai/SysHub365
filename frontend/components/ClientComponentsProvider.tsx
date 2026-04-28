"use client";

import dynamic from "next/dynamic";

// Dynamically import heavy client-side components to reduce initial JS execution time
// ssr: false is safe here because this is a Client Component
const Cursor = dynamic(() => import("@/components/Cursor").then((mod) => mod.Cursor), { ssr: false });
const Chatbot = dynamic(() => import("@/components/Chatbot").then((mod) => mod.Chatbot), { ssr: false });

export function ClientComponentsProvider() {
  return (
    <>
      <Cursor />
      <Chatbot />
    </>
  );
}
