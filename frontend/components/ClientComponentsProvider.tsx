"use client";

import dynamic from "next/dynamic";

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
