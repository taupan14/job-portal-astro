// src/lib/useSeo.ts
// Client-side script: fetch SEO dari backend dan update <head> secara dinamis.
// Import dan panggil di setiap halaman Astro yang butuh SEO dinamis.

import { fetchSeo, buildJsonLdScript, type FetchSeoOptions } from "./seo";

/**
 * Update meta tag di <head> secara dinamis.
 * Dipanggil client-side setelah halaman dimuat.
 *
 * @example
 * // Di halaman blog
 * import { useSeo } from "../lib/useSeo";
 * useSeo({ contentType: "blog", slug: "/blog/nama-artikel" });
 *
 * // Di halaman produk dengan ID
 * useSeo({ contentType: "product", contentId: entry.id, slug: entry.slug });
 */
export async function useSeo(opts: FetchSeoOptions): Promise<void> {
  const seo = await fetchSeo(opts);
  if (!seo) return;

  const setMeta = (
    selector: string,
    attr: string,
    value: string | null | undefined,
  ) => {
    if (!value) return;
    const el = document.querySelector(selector);
    if (el) el.setAttribute(attr, value);
  };

  const setMetaOrCreate = (
    id: string,
    tagName: string,
    attrs: Record<string, string>,
    attrToSet: string,
    value: string | null | undefined,
  ) => {
    if (!value) return;
    let el = document.getElementById(id);
    if (!el) {
      el = document.createElement(tagName);
      el.id = id;
      for (const [k, v] of Object.entries(attrs)) el.setAttribute(k, v);
      document.head.appendChild(el);
    }
    el.setAttribute(attrToSet, value);
  };

  // ── Title ────────────────────────────────────────────────────────────────
  if (seo.metaTitle) document.title = seo.metaTitle;

  // ── Basic Meta ────────────────────────────────────────────────────────────
  setMeta("#meta-description", "content", seo.metaDescription);
  setMeta("#meta-canonical", "href", seo.canonicalUrl ?? undefined);

  // ── Open Graph ────────────────────────────────────────────────────────────
  setMeta("#og-title", "content", seo.ogTitle ?? seo.metaTitle);
  setMeta(
    "#og-description",
    "content",
    seo.ogDescription ?? seo.metaDescription,
  );
  setMeta("#og-type", "content", seo.ogType);

  setMetaOrCreate(
    "og-image",
    "meta",
    { property: "og:image" },
    "content",
    seo.ogImage,
  );
  setMetaOrCreate(
    "og-image-alt",
    "meta",
    { property: "og:image:alt" },
    "content",
    seo.ogImageAlt,
  );

  // ── Twitter Card ─────────────────────────────────────────────────────────
  setMeta("#tw-title", "content", seo.ogTitle ?? seo.metaTitle);
  setMeta(
    "#tw-description",
    "content",
    seo.ogDescription ?? seo.metaDescription,
  );
  setMetaOrCreate(
    "tw-image",
    "meta",
    { name: "twitter:image" },
    "content",
    seo.ogImage,
  );

  // ── JSON-LD ───────────────────────────────────────────────────────────────
  if (seo.jsonLd) {
    // Hapus script JSON-LD lama jika ada
    const existing = document.getElementById("jsonld-script");
    if (existing) existing.remove();

    // Buat script baru dan inject ke <head>
    const script = document.createElement("script");
    script.id = "jsonld-script";
    script.type = "application/ld+json";
    script.textContent = JSON.stringify(seo.jsonLd);
    document.head.appendChild(script);
  }
}
