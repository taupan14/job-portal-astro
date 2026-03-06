import { defineMiddleware } from "astro:middleware";
import { getCurrentUser } from "../lib/auth";

const PROTECTED_ROUTES = ["/profile", "/add-job", "/search-job"];
const AUTH_ROUTES = ["/login", "/signup"];

export const onRequest = defineMiddleware(async (context, next) => {
  const cookieHeader = context.request.headers.get("cookie") ?? "";
  const user = await getCurrentUser(cookieHeader);
  context.locals.user = user;

  const { pathname } = new URL(context.request.url);

  const isProtected = PROTECTED_ROUTES.some(
    (route) => pathname === route || pathname.startsWith(route + "/"),
  );

  if (isProtected && !user) {
    return context.redirect(`/login?redirect=${encodeURIComponent(pathname)}`);
  }

  if (AUTH_ROUTES.includes(pathname) && user) {
    return context.redirect("/");
  }

  return next();
});
