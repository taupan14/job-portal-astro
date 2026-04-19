// src/middleware.ts
import { defineMiddleware } from "astro:middleware";
import { getCurrentUser } from "../lib/auth";

const PROTECTED_ROUTES = ["/profile", "/add-job", "/search-job"];
const AUTH_ROUTES = ["/login", "/signup"];

export const onRequest = defineMiddleware(async (context, next) => {
  const cookieHeader = context.request.headers.get("cookie") ?? "";
  const { user, expired } = await getCurrentUser(cookieHeader);

  context.locals.user = user;
  context.locals.tokenExpired = expired; // ✅ true hanya jika JWT benar-benar expired

  const { pathname } = new URL(context.request.url);
  const isProtected = PROTECTED_ROUTES.some(
    (route) => pathname === route || pathname.startsWith(route + "/"),
  );

  if (isProtected && !user) {
    return context.redirect("/");
  }

  if (AUTH_ROUTES.includes(pathname) && user) {
    return context.redirect("/");
  }

  return next();
});
