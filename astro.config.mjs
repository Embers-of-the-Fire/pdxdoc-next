import { defineConfig } from "astro/config";
import starlight from "@astrojs/starlight";
import starlightLinksValidator from "starlight-links-validator";
import starlightImageZoomPlugin from "starlight-image-zoom";
import starlightSidebarTopicsPlugin from "starlight-sidebar-topics";
import starlightBlogPlugin from "starlight-blog";
// import sidebar from "./sidebar.json";
import { sidebar } from "./src/sidebar/sidebar.ts";
import authors from "./author.ts";
import { rehypeAccessibleEmojis } from "rehype-accessible-emojis";

// https://astro.build/config
export default defineConfig({
	markdown: {
		syntaxHighlight: false,
		rehypePlugins: [rehypeAccessibleEmojis],
	},
	site: "https://main--pdxdoc-next.netlify.app/",
	integrations: [
		starlightLinksValidator(),
		starlight({
			title: "Stellaris Mod 教程",
			social: {
				github: "https://github.com/embers-of-the-fire/pdxdoc-next",
			},
			defaultLocale: "root",
			expressiveCode: false,
			locales: {
				root: {
					label: "简体中文",
					lang: "zh-CN",
				},
			},
			editLink: {
				baseUrl: "https://github.com/Embers-of-the-Fire/pdxdoc-next/edit/main",
			},
			components: {
				ContentPanel: "./src/components/overrides/ContentPanel.astro",
				MarkdownContent: "./src/components/overrides/MarkdownContent.astro",
				Sidebar: "starlight-sidebar-topics/overrides/Sidebar.astro",
				Footer: "./src/components/overrides/Footer.astro",
			},
			plugins: [
				starlightBlogPlugin({ authors }),
				starlightImageZoomPlugin(),
				starlightSidebarTopicsPlugin(sidebar),
			],
			logo: { src: "./src/assets/smglogo.webp" },
			head: [
				{
					tag: "link",
					attrs: {
						href: "/prism-darcula.css",
						rel: "stylesheet",
					},
				},
				{
					tag: "link",
					attrs: {
						href: "/prism-line-number.css",
						rel: "stylesheet",
					},
				},
				{
					tag: "script",
					attrs: {
						src: "/scripts/prism.min.js",
					},
				},
				{
					tag: "script",
					attrs: {
						src: "/scripts/prism-pdxlang.min.js",
					},
				},
				{
					tag: "script",
					attrs: {
						src: "/scripts/prism-yaml.min.js",
					},
				},
				{
					tag: "script",
					attrs: {
						src: "/scripts/prism-diff.min.js",
					},
				},
				{
					tag: "script",
					attrs: {
						src: "/scripts/prism-diff-lang.min.js",
					},
				},
				{
					tag: "script",
					attrs: {
						src: "/scripts/prism-line-number.min.js",
					},
				},
			],
		}),
	],
});
