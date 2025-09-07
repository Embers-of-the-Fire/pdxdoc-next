import starlight from "@astrojs/starlight";
import { pluginLineNumbers } from "@expressive-code/plugin-line-numbers";
import { defineConfig } from "astro/config";
import { pluginFullscreen } from "expressive-code-fullscreen";
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
			expressiveCode: {
				themes: ["dracula", "github-light"],
				plugins: [
					pluginFullscreen({
						fullscreenButtonTooltip: "全屏模式",
					}),
					pluginLineNumbers(),
				],
				shiki: {
					langs: [
						JSON.parse(fs.readFileSync("./src/code/pdx.grammar.json", "utf-8")),
						JSON.parse(fs.readFileSync("./src/code/vdf.grammar.json", "utf-8")),
						JSON.parse(
							fs.readFileSync("./src/code/yaml.grammar.json", "utf-8"),
						),
					],
				},
			},
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
		}),
	],
});
