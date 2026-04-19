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

type GetCurrentUserResult =
  | { user: AuthUser; expired: false }
  | { user: null; expired: boolean };

export async function getCurrentUser(
  cookieHeader: string,
): Promise<GetCurrentUserResult> {
  if (!cookieHeader) return { user: null, expired: false };
  const match = cookieHeader
    .split(";")
    .map((c) => c.trim())
    .find((c) => c.startsWith("auth_token="));
  const token = match
    ? decodeURIComponent(match.slice("auth_token=".length))
    : null;
  if (!token) return { user: null, expired: false };

  try {
    const user = jwt.verify(token, JWT_SECRET) as AuthUser;
    return { user, expired: false };
  } catch (err: any) {
    // ✅ Bedakan expired vs invalid token
    const expired = err?.name === "TokenExpiredError";
    return { user: null, expired };
  }
}
