import { useEffect } from "react";
import { useTranslation } from "react-i18next";

const baseUrl = "https://www.orestias.co";
const locales = ["en", "es", "de", "tr"] as const;

type MetaConfig = {
  attr: "name" | "property";
  key: string;
  content: string;
};

const upsertMeta = ({ attr, key, content }: MetaConfig) => {
  const selector = `meta[${attr}="${key}"]`;
  let tag = document.head.querySelector(selector) as HTMLMetaElement | null;

  if (!tag) {
    tag = document.createElement("meta");
    tag.setAttribute(attr, key);
    tag.setAttribute("data-seo", "true");
    document.head.appendChild(tag);
  }

  tag.setAttribute("content", content);
};

const upsertLink = (rel: string, href: string, extra?: Record<string, string>) => {
  const selector = `link[rel="${rel}"]`;
  let tag = document.head.querySelector(selector) as HTMLLinkElement | null;

  if (!tag) {
    tag = document.createElement("link");
    tag.setAttribute("rel", rel);
    tag.setAttribute("data-seo", "true");
    document.head.appendChild(tag);
  }

  tag.setAttribute("href", href);
  if (extra) {
    Object.entries(extra).forEach(([key, value]) => {
      tag.setAttribute(key, value);
    });
  }
};

const Seo = () => {
  const { t, i18n } = useTranslation();

  useEffect(() => {
    const title = t("meta.title");
    const description = t("meta.description");
    const currentLang = i18n.resolvedLanguage ?? "en";

    document.title = title;

    upsertMeta({ attr: "name", key: "description", content: description });
    upsertMeta({ attr: "name", key: "theme-color", content: "#f7f7f4" });
    upsertMeta({ attr: "name", key: "language", content: currentLang });
    upsertMeta({ attr: "property", key: "og:title", content: title });
    upsertMeta({ attr: "property", key: "og:description", content: description });
    upsertMeta({ attr: "property", key: "og:type", content: "website" });
    upsertMeta({ attr: "property", key: "og:url", content: baseUrl });
    upsertMeta({ attr: "property", key: "og:site_name", content: "Orestias" });
    upsertMeta({ attr: "name", key: "twitter:card", content: "summary_large_image" });
    upsertMeta({ attr: "name", key: "twitter:title", content: title });
    upsertMeta({ attr: "name", key: "twitter:description", content: description });

    upsertLink("canonical", baseUrl);

    document
      .querySelectorAll('link[rel="alternate"][data-seo="true"]')
      .forEach((node) => node.remove());

    locales.forEach((locale) => {
      const link = document.createElement("link");
      link.setAttribute("rel", "alternate");
      link.setAttribute("hrefLang", locale);
      link.setAttribute("href", `${baseUrl}/?lng=${locale}`);
      link.setAttribute("data-seo", "true");
      document.head.appendChild(link);
    });

    const xDefault = document.createElement("link");
    xDefault.setAttribute("rel", "alternate");
    xDefault.setAttribute("hrefLang", "x-default");
    xDefault.setAttribute("href", baseUrl);
    xDefault.setAttribute("data-seo", "true");
    document.head.appendChild(xDefault);
  }, [i18n.resolvedLanguage, t]);

  return null;
};

export default Seo;
