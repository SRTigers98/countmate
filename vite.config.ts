import { purgeCss } from "vite-plugin-tailwind-purgecss";
import { sveltekit } from "@sveltejs/kit/vite";
import { defineConfig } from "vite";

export default defineConfig({
  // @ts-expect-error no overload matches purgeCss call
  plugins: [sveltekit(), purgeCss()],
});
