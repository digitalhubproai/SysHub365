"use client";

import { useEffect, useState } from "react";
import { getPreferences } from "./CookieConsent";
import Script from "next/script";
import { Analytics } from "@vercel/analytics/next";

export function AnalyticsProvider() {
  const [active, setActive] = useState<{ analytics: boolean; marketing: boolean } | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    updateActive();

    const handleStorage = () => updateActive();
    window.addEventListener("storage", handleStorage);
    window.addEventListener("cookieConsentChange", handleStorage);
    return () => {
      window.removeEventListener("storage", handleStorage);
      window.removeEventListener("cookieConsentChange", handleStorage);
    };
  }, []);

  function updateActive() {
    const prefs = getPreferences();
    if (!prefs) {
      setActive(null);
      return;
    }
    setActive({ analytics: prefs.analytics, marketing: prefs.marketing });
  }

  return (
    <>
      {mounted && active?.analytics && (
        <>
          <Analytics />
          <Script
            src="https://analytics.ahrefs.com/analytics.js"
            data-key="MhT69x5RT7gjX3m3wRRtxg"
            strategy="afterInteractive"
          />
        </>
      )}
      {mounted && active?.marketing && (
        <>
          <Script
            async
            src="https://www.googletagmanager.com/gtag/js?id=AW-18145714125"
            strategy="afterInteractive"
          />
          <Script
            id="google-ads"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', 'AW-18145714125');
              `,
            }}
          />
          <Script
            id="gtm"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `
                (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
                new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
                j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
                'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
                })(window,document,'script','dataLayer','GTM-NL7TQQ23');
              `,
            }}
          />
          <noscript>
            <iframe
              src="https://www.googletagmanager.com/ns.html?id=GTM-NL7TQQ23"
              height="0"
              width="0"
              style={{ display: "none", visibility: "hidden" }}
            />
          </noscript>
        </>
      )}
    </>
  );
}
