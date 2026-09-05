import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { site } from "./src/data/site";

const normalizedEnv = (value: string | undefined) => {
  const trimmed = value?.trim();
  return trimmed ? trimmed : null;
};
const escape = (value: string) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
const canonical = normalizedEnv(process.env.SITE_URL) ?? site.seo.canonicalUrl;
if (
  canonical &&
  (!/^https:\/\/[^\s?#]+\/$/.test(canonical) ||
    new URL(canonical).search ||
    new URL(canonical).hash)
) {
  throw new Error(
    "SITE_URL или site.seo.canonicalUrl должен быть абсолютным HTTPS-адресом сайта с завершающим /, без query и hash.",
  );
}
const base =
  normalizedEnv(process.env.BASE_PATH) ??
  (canonical ? new URL(canonical).pathname : "/");
const business = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: site.name,
  description: site.description,
  telephone: site.phone,
  ...(canonical ? { url: canonical } : {}),
  address: {
    "@type": "PostalAddress",
    streetAddress: site.address.street,
    addressLocality: site.address.city,
    addressRegion: site.address.region,
    postalCode: site.address.postalCode,
    addressCountry: "RU",
  },
  sameAs: [site.links.telegram, site.links.yandex, site.links.dgis],
  openingHoursSpecification: {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday",
    ],
    opens: site.hours.opens,
    closes: site.hours.closes,
  },
  // Рейтинг намеренно не включён в structured data: отзывы находятся на внешних площадках.
};
const robots = canonical
  ? `User-agent: *\nAllow: /\nSitemap: ${canonical}sitemap.xml\n`
  : "User-agent: *\nDisallow: /\n# Set site.seo.canonicalUrl before publishing.\n";
const sitemap = `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${canonical ? `<url><loc>${escape(canonical)}</loc></url>` : ""}</urlset>`;

export default defineConfig({
  base,
  plugins: [
    react(),
    {
      name: "sotremont-seo",
      transformIndexHtml(html) {
        const tags = [
          `<meta name="description" content="${escape(site.seo.description)}" />`,
          '<meta property="og:type" content="website" /><meta property="og:locale" content="ru_RU" />',
          `<meta property="og:site_name" content="${site.name}" /><meta property="og:title" content="${escape(site.seo.title)}" />`,
          `<meta property="og:description" content="${escape(site.seo.description)}" />`,
          ...(canonical
            ? [
                `<link rel="canonical" href="${escape(canonical)}" /><meta property="og:url" content="${escape(canonical)}" />`,
                `<meta property="og:image" content="${escape(new URL(site.seo.socialImage, canonical).href)}" />`,
              ]
            : ['<meta name="robots" content="noindex, nofollow" />']),
          `<script type="application/ld+json">${JSON.stringify(business).replace(/</g, "\\u003c")}</script>`,
        ];
        return html
          .replace(
            /<title>.*?<\/title>/,
            `<title>${escape(site.seo.title)}</title>`,
          )
          .replace("<!--seo-->", tags.join("\n"))
          .replace(
            "<!--contact-fallback-->",
            `${escape(site.name)} — ${escape(site.description)} ${escape(site.address.full)} Позвоните: <a href="${escape(site.links.phone)}">${escape(site.phone)}</a> или <a href="${escape(site.links.telegram)}">напишите в Telegram</a>. Для интерактивной диагностики включите JavaScript.`,
          );
      },
      configureServer(server) {
        server.middlewares.use((req, res, next) => {
          if (req.url === "/robots.txt" || req.url === "/sitemap.xml") {
            res.setHeader(
              "Content-Type",
              req.url === "/robots.txt"
                ? "text/plain; charset=utf-8"
                : "application/xml; charset=utf-8",
            );
            res.end(req.url === "/robots.txt" ? robots : sitemap);
          } else next();
        });
      },
      generateBundle() {
        this.emitFile({
          type: "asset",
          fileName: "robots.txt",
          source: robots,
        });
        this.emitFile({
          type: "asset",
          fileName: "sitemap.xml",
          source: sitemap,
        });
      },
    },
  ],
});
