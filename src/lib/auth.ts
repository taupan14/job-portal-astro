// src/lib/auth.ts
import { apiGet } from "./api";

export interface UserSession {
  id: string;
  name: string;
  email: string;
  role: string; // 'user' | 'employer' | 'admin'
  // Tambahkan field lain sesuai response Express kamu
}

/**
 * Ambil user yang sedang login dengan cara mengirim cookie ke Express.
 * Express yang memutuskan apakah session valid atau tidak.
 *
 * @param cookie - Cookie header dari Astro.request (diteruskan ke Express)
 * @returns UserSession jika valid, null jika tidak login / session expired
 */
export async function getCurrentUser(
  cookie: string,
): Promise<UserSession | null> {
  // Endpoint ini harus ada di Express: GET /api/auth/me
  // Response: { id, name, email, role } jika valid
  // Response: 401 jika tidak login
  return apiGet<UserSession>("/api/auth/me", cookie);
}
