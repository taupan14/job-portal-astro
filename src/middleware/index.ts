// src/middleware/index.ts
import { defineMiddleware } from "astro:middleware";
import { getCurrentUser } from "../lib/auth";

// Halaman yang WAJIB login
const PROTECTED_ROUTES = [
  "/profile",
  "/profile-address",
  "/profile-apps",
  "/profile-contact",
  "/profile-status",
  "/add-job",
  "/search-job",
];

// Halaman auth — redirect ke home jika sudah login
const AUTH_ROUTES = ["/login", "/signup"];

export const onRequest = defineMiddleware(async (context, next) => {
  // Ambil semua cookie dari request browser, teruskan ke Express
  const cookieHeader = context.request.headers.get("cookie") ?? "";

  // Tanya ke Express: siapa user ini?
  const user = await getCurrentUser(cookieHeader);

  // Simpan di locals agar bisa diakses di semua halaman .astro
  context.locals.user = user;

  const { pathname } = new URL(context.request.url);

  // Guard: halaman protected
  const isProtected = PROTECTED_ROUTES.some((route) =>
    pathname.startsWith(route),
  );
  if (isProtected && !user) {
    const redirectTo = encodeURIComponent(pathname);
    return context.redirect(`/login?redirect=${redirectTo}`);
  }

  // Guard: jangan tampilkan login/signup ke user yang sudah login
  if (AUTH_ROUTES.includes(pathname) && user) {
    return context.redirect("/");
  }

  return next();
});
