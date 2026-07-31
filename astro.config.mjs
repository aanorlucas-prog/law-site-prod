import { defineConfig } from "astro/config";
import tailwind from "@tailwindcss/vite";
import cloudflare from "@astrojs/cloudflare";

export default defineConfig({
  // output: "server",
  adapter: cloudflare(),
  vite: {
    plugins: [tailwind()],
  },
});
