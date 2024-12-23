// @ts-check
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import expressiveCode from "astro-expressive-code";
import { defineConfig } from "astro/config";
import twoSlash from "expressive-code-twoslash";

// https://astro.build/config
export default defineConfig({
	site: "https://example.com",
	integrations: [
		expressiveCode({
			plugins: [twoSlash()]
		}),
		mdx(),
		sitemap()
	]
});
