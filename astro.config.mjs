import { defineConfig } from "astro/config";
import starlight from "@astrojs/starlight";
import starlightLinksValidator from "starlight-links-validator";
import starlightBlog from "starlight-blog";
import sidebar from "./sidebar.json";
import authors from "./author.ts";

// https://astro.build/config
export default defineConfig({
    markdown: {
        syntaxHighlight: false,
    },
    integrations: [
        starlightLinksValidator(),
        starlightBlog({ authors }),
        starlight({
            title: "Stellaris Mod 教程",
            social: {
                github: "https://github.com/embers-of-the-fire",
            },
            defaultLocale: "zh-CN",
            locales: {
                root: {
                    label: "简体中文",
                    lang: "zh-CN",
                },
            },
			editLink: {
				baseUrl: 'https://github.com/tauri-apps/tauri-docs/edit/next',
			},
            components: {
                SiteTitle: "./src/components/overrides/SiteTitle.astro",
                MarkdownContent:
                    "starlight-blog/overrides/MarkdownContent.astro",
                Sidebar: "starlight-blog/overrides/Sidebar.astro",
                Footer: "./src/components/overrides/Footer.astro",
            },
            sidebar: sidebar,
            head: [
                {
                    tag: "link",
                    attrs: {
                        href: "/prism-darcula.css",
                        rel: "stylesheet",
                    },
                },
                {
                    tag: "script",
                    attrs: {
                        src: "https://cdn.jsdelivr.net/npm/prismjs@1.29.0/prism.min.js",
                        defer: true,
                    },
                },
                {
                    tag: "script",
                    attrs: {
                        src: "/scripts/prism-pdxlang.min.js",
                        defer: true,
                    },
                },
                {
                    tag: "script",
                    attrs: {
                        src: "/scripts/prism-yaml.min.js",
                        defer: true,
                    },
                },
                {
                    tag: "script",
                    attrs: {
                        src: "/scripts/prism-diff.min.js",
                        defer: true,
                    },
                },
            ],
        }),
    ],
});
