import { Helmet } from "react-helmet-async";
import { useLanguage } from "@/contexts/LanguageContext";
import { SITE_URL, breadcrumbJsonLd, routeMeta } from "@/lib/seo";

interface SeoProps {
  /** Key into routeMeta, e.g. "home", "services" */
  page: keyof typeof routeMeta | string;
  /** Extra JSON-LD blocks to render for this route */
  jsonLd?: Record<string, unknown>[];
}

export function Seo({ page, jsonLd = [] }: SeoProps) {
  const { language } = useLanguage();
  const lang: "mk" | "en" = language === "en" ? "en" : "mk";
  const meta = routeMeta[page];

  if (!meta) return null;

  const { title, description } = meta[lang];
  const url = `${SITE_URL}${meta.path}`;
  const image = `${SITE_URL}/og-image.jpg`;
  const blocks = [breadcrumbJsonLd(page, lang), ...jsonLd];

  return (
    <Helmet>
      <html lang={lang} />
      <title>{title}</title>
      <meta name="title" content={title} />
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />

      <meta property="og:type" content="website" />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:locale" content={lang === "en" ? "en_US" : "mk_MK"} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={url} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      {blocks.map((block, index) => (
        <script type="application/ld+json" key={index}>
          {JSON.stringify(block)}
        </script>
      ))}
    </Helmet>
  );
}
