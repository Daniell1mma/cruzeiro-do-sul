import { useEffect } from "react";

interface SeoOptions {
  title: string;
  description?: string;
  canonicalPath?: string;
}

export function useSeo({ title, description, canonicalPath }: SeoOptions) {
  useEffect(() => {
    const fullTitle = title.includes("Fraternidade")
      ? title
      : `${title} — Fraternidade Cruzeiro do Sul de Apometria`;
    
    document.title = fullTitle;

    if (description) {
      let metaDesc = document.querySelector('meta[name="description"]');
      if (!metaDesc) {
        metaDesc = document.createElement("meta");
        metaDesc.setAttribute("name", "description");
        document.head.appendChild(metaDesc);
      }
      metaDesc.setAttribute("content", description);

      let ogDesc = document.querySelector('meta[property="og:description"]');
      if (ogDesc) ogDesc.setAttribute("content", description);
    }

    let ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) ogTitle.setAttribute("content", fullTitle);

    if (canonicalPath) {
      let canonical = document.querySelector('link[rel="canonical"]');
      if (canonical) {
        canonical.setAttribute("href", `https://cruzeiro-do-sul-sp.web.app${canonicalPath}`);
      }
    }
  }, [title, description, canonicalPath]);
}

