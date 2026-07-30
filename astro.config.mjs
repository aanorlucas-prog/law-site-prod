// @ts-check
// import { defineConfig } from "astro/config";
// import tailwindcss from "@tailwindcss/vite";
// // https://astro.build/config
// export default defineConfig({
//   vite: {
//     plugins: [tailwindcss()],
//   },
// });

// import { defineConfig } from "astro/config";
// import tailwind from "@tailwindcss/vite";
// import cloudflare from "@astrojs/cloudflare";

// export default defineConfig({
//   adapter: cloudflare(),
//   vite: {
//     plugins: [tailwind()],
//   },
// });

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
