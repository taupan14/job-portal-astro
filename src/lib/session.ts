// src/lib/session.ts
const SESSION_COOKIE = "session_id";
const sessions = new Map<
  string,
  { userId: string; email: string; expiresAt: Date }
>();

export function createSession(userId: string, email: string) {
  const sessionId = crypto.randomUUID();
  const expiresAt = new Date(Date.now() + 1000 * 60 * 60 * 24 * 1); // 1 hari

  sessions.set(sessionId, { userId, email, expiresAt });
  return { sessionId, expiresAt };
}

export function getSession(sessionId: string) {
  const session = sessions.get(sessionId);
  if (!session) return null;
  if (session.expiresAt < new Date()) {
    sessions.delete(sessionId);
    return null;
  }
  return session;
}

export function deleteSession(sessionId: string) {
  sessions.delete(sessionId);
}

export { SESSION_COOKIE };
