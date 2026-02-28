// astro.config.mjs
import { defineConfig } from "astro/config";
import vercel from "@astrojs/vercel";
import tailwindcss from "@tailwindcss/vite";
import path from "path";

export default defineConfig({
  output: "server",
  adapter: vercel(),
  vite: {
    plugins: [tailwindcss()],
    resolve: {
      alias: {
        "@scripts": path.resolve("./src/scripts"),
        "@js": path.resolve("./public/assets/js"),
        "@css": path.resolve("./public/assets/css"),
        "@fonts": path.resolve("./public/assets/fonts"),
      },
    },
  },
});
