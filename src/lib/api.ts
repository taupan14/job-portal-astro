// src/lib/api.ts
// Helper untuk fetch data dari Express backend

const API_URL = import.meta.env.PUBLIC_API_URL;

// Opsi default untuk semua request ke backend
function defaultOptions(cookie?: string): RequestInit {
  return {
    headers: {
      "Content-Type": "application/json",
      // Forward cookie dari browser ke Express (untuk auth session)
      ...(cookie ? { Cookie: cookie } : {}),
    },
    credentials: "include",
  };
}

/**
 * GET request ke Express backend.
 * @param path   - Endpoint path, contoh: '/api/user/profile'
 * @param cookie - Cookie string dari Astro request (untuk SSR auth)
 */
export async function apiGet<T>(
  path: string,
  cookie?: string,
): Promise<T | null> {
  try {
    const res = await fetch(`${API_URL}${path}`, {
      ...defaultOptions(cookie),
      method: "GET",
    });
    if (!res.ok) return null;
    return res.json() as Promise<T>;
  } catch {
    return null;
  }
}

/**
 * POST request ke Express backend.
 * @param path - Endpoint path
 * @param body - Data yang dikirim (akan di-JSON.stringify)
 * @param cookie - Cookie string dari Astro request
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
