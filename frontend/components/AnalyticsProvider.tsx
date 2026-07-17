"use client";

import { useEffect, useState } from "react";
import { getConsent } from "./CookieConsent";
import Script from "next/script";

export function AnalyticsProvider() {
  const [consent, setConsent] = useState<boolean>(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const status = getConsent();
    if (status === "accepted") {
      setConsent(true);
    }

    const handleStorageChange = () => {
      const updated = getConsent();
      setConsent(updated === "accepted");
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  if (!mounted || !consent) return null;

  return (
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
      <Script
        src="https://analytics.ahrefs.com/analytics.js"
        data-key="MhT69x5RT7gjX3m3wRRtxg"
        strategy="afterInteractive"
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
  );
}
