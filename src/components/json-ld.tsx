"use client";
import "client-only";
import { useEffect } from "react";


export default function JSONLD({ schemaData }: { schemaData: { [key: string]: unknown } }) {
  useEffect(() => {
    const newJsonLDSript = document.createElement('script');
    newJsonLDSript.type = 'application/ld+json';
    newJsonLDSript.textContent = JSON.stringify(schemaData);

    const oldJsonLDScript = document.querySelector('script[type="application/ld+json"]');
    if (!!oldJsonLDScript) {
      oldJsonLDScript.remove();
    }

    document.head.appendChild(newJsonLDSript);
  }, [schemaData]);

  return null;
}