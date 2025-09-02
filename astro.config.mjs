import starlight from "@astrojs/starlight";
import { defineConfig } from "astro/config";
import { rehypeAccessibleEmojis } from "rehype-accessible-emojis";
import starlightBlogPlugin from "starlight-blog";
import starlightImageZoomPlugin from "starlight-image-zoom";
import starlightLinksValidator from "starlight-links-validator";
import starlightSidebarTopics from "starlight-sidebar-topics";
import authors from "./author.ts";
import { sidebar } from "./src/sidebar/sidebar.ts";

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
			social: [
				{
					icon: "github",
					label: "GitHub",
					href: "https://github.com/embers-of-the-fire/pdxdoc-next",
				},
			],
			defaultLocale: "root",
			expressiveCode: false,
			locales: {
				root: {
					label: "简体中文",
					lang: "zh-CN",
				},
			},
			editLink: {
				baseUrl:
					"https://github.com/Embers-of-the-Fire/pdxdoc-next/edit/main",
			},
			components: {
				ContentPanel: "./src/components/overrides/ContentPanel.astro",
				MarkdownContent:
					"./src/components/overrides/MarkdownContent.astro",
				Footer: "./src/components/overrides/Footer.astro",
			},
			plugins: [
				starlightBlogPlugin({
					authors,
					title: "博客",
					metrics: {
						readingTime: true,
						words: "total",
					},
				}),
				starlightImageZoomPlugin(),
				starlightSidebarTopics(sidebar, {
					topics: {
						blog: ["/blog/**/*"],
					},
				}),
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
						src: "/scripts/prism-vdf.min.js",
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
