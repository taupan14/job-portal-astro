// src/lib/api.ts
// Helper untuk fetch data dari Express backend

const API_URL = import.meta.env.PUBLIC_API_URL;

// ── Ekstrak JWT token dari cookie string ──────────────────────────────────────
// Dipanggil saat SSR — baca token dari cookie browser yang diteruskan Astro
function extractTokenFromCookie(cookie?: string): string | null {
  if (!cookie) return null;
  const match = cookie
    .split(";")
    .map((c) => c.trim())
    .find((c) => c.startsWith("auth_token="));
  return match ? decodeURIComponent(match.slice("auth_token=".length)) : null;
}

// ── Opsi default untuk semua request ke backend ───────────────────────────────
// Meneruskan token JWT sebagai Authorization Bearer (sesuai authMiddleware.ts)
// sekaligus meneruskan cookie asli (untuk endpoint yang masih pakai cookie)
function defaultOptions(cookie?: string): RequestInit {
  const token = extractTokenFromCookie(cookie);
  // console.log(
  //   "[apiGet] token extracted:",
  //   token ? token.substring(0, 20) : "NULL",
  // );
  return {
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(cookie ? { Cookie: cookie } : {}),
    },
    credentials: "include",
  };
}

/**
 * GET request ke Express backend.
 * @param path   - Endpoint path, contoh: '/api/applicants/1'
 * @param cookie - Cookie string dari Astro.request (untuk SSR auth)
 */
export async function apiGet<T>(
  path: string,
  cookie?: string,
): Promise<T | null> {
  try {
    const url = `${API_URL}${path}`;
    //console.log("[apiGet] fetch:", url);           // ← cek URL yang dihit

    const res = await fetch(url, {
      ...defaultOptions(cookie),
      method: "GET",
    });

    // console.log("[apiGet] status:", res.status, path); // ← cek status response

    if (!res.ok) {
      const text = await res.text();
      // console.error("[apiGet] error body:", text);  // ← cek pesan error
      console.error("[apiGet] error body:", text, "| path:", path);
      return null;
    }
    return res.json() as Promise<T>;
  } catch (err) {
    console.error("[apiGet] exception:", err); // ← cek exception
    return null;
  }
}

/**
 * POST request ke Express backend.
 * @param path   - Endpoint path
 * @param body   - Data yang dikirim (akan di-JSON.stringify)
 * @param cookie - Cookie string dari Astro.request
 */
export async function apiPost<T>(
  path: string,
  body: unknown,
  cookie?: string,
): Promise<{ data: T | null; ok: boolean; status: number }> {
  try {
    const res = await fetch(`${API_URL}${path}`, {
      ...defaultOptions(cookie),
      method: "POST",
      body: JSON.stringify(body),
    });
    const data = res.ok ? await res.json() : null;
    return { data, ok: res.ok, status: res.status };
  } catch {
    return { data: null, ok: false, status: 500 };
  }
}

/**
 * PUT request ke Express backend.
 * @param path   - Endpoint path
 * @param body   - Data yang dikirim
 * @param cookie - Cookie string dari Astro.request
 */
export async function apiPut<T>(
  path: string,
  body: unknown,
  cookie?: string,
): Promise<{ data: T | null; ok: boolean; status: number }> {
  try {
    const res = await fetch(`${API_URL}${path}`, {
      ...defaultOptions(cookie),
      method: "PUT",
      body: JSON.stringify(body),
    });
    const data = res.ok ? await res.json() : null;
    return { data, ok: res.ok, status: res.status };
  } catch {
    return { data: null, ok: false, status: 500 };
  }
}

/**
 * DELETE request ke Express backend.
 * @param path   - Endpoint path
 * @param cookie - Cookie string dari Astro.request
 */
export async function apiDelete<T>(
  path: string,
  cookie?: string,
): Promise<{ data: T | null; ok: boolean; status: number }> {
  try {
    const res = await fetch(`${API_URL}${path}`, {
      ...defaultOptions(cookie),
      method: "DELETE",
    });
    const data = res.ok ? await res.json() : null;
    return { data, ok: res.ok, status: res.status };
  } catch {
    return { data: null, ok: false, status: 500 };
  }
}
