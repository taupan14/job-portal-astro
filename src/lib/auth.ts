import jwt from "jsonwebtoken";

const JWT_SECRET = import.meta.env.JWT_SECRET ?? process.env.JWT_SECRET ?? "";

export interface AuthUser {
  id: number;
  refid: string;
  name: string;
  email: string;
  avatar?: string;
  role: "applicant" | "company" | "admin";
}

export async function getCurrentUser(
  cookieHeader: string,
): Promise<AuthUser | null> {
  if (!cookieHeader) return null;
  const match = cookieHeader
    .split(";")
    .map((c) => c.trim())
    .find((c) => c.startsWith("auth_token="));
  const token = match
    ? decodeURIComponent(match.slice("auth_token=".length))
    : null;
  if (!token) return null;
  try {
    return jwt.verify(token, JWT_SECRET) as AuthUser;
  } catch {
    return null;
  }
}
