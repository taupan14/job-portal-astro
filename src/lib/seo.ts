// src/lib/seo.ts
// Utility untuk fetch SEO meta dari backend Express

export interface SeoData {
  contentType: string;
  contentId: string | null;
  slug: string | null;
  metaTitle: string | null;
  metaDescription: string | null;
  ogTitle: string | null;
  ogDescription: string | null;
  ogImage: string | null;
  ogImageAlt: string | null;
  ogType: string;
  canonicalUrl: string | null;
  jsonLd: object | null;
}

const API_BASE = import.meta.env.PUBLIC_API_URL ?? "http://localhost:4000";

export interface FetchSeoOptions {
  contentType: "blog" | "product" | "category";
  contentId?: string;
  slug?: string;
}

/**
 * Fetch SEO data dari backend.
 * Gunakan di client-side (script tag di Astro) atau di Astro frontmatter jika SSR.
 */
export async function fetchSeo(opts: FetchSeoOptions): Promise<SeoData | null> {
  const params = new URLSearchParams({ contentType: opts.contentType });
  if (opts.contentId) params.set("contentId", opts.contentId);
  if (opts.slug) params.set("slug", opts.slug);

  try {
    const res = await fetch(`${API_BASE}/api/seo?${params}`, {
      headers: { Accept: "application/json" },
      cache: "no-store", // selalu ambil data terbaru
    });

    if (!res.ok) return null;
    const json = await res.json();
    return json.data ?? null;
  } catch (err) {
    console.error("[fetchSeo] Error:", err);
    return null;
  }
}

/**
 * Build JSON-LD script string dari objek.
 */
export function buildJsonLdScript(data: object | null): string {
  if (!data) return "";
  return `<script type="application/ld+json">${JSON.stringify(data)}</script>`;
}
