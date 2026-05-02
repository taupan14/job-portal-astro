import { defineConfig } from "astro/config";
import node from "@astrojs/node";
import tailwindcss from "@tailwindcss/vite";
import path from "path";

export default defineConfig({
  output: "server",
  adapter: node({
    mode: "standalone",
  }),
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
