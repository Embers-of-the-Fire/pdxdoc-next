import { defineConfig } from "astro/config";
import starlight from "@astrojs/starlight";
import starlightLinksValidator from "starlight-links-validator";
import starlightBlog from "starlight-blog";
import sidebar from "./sidebar.json";
import authors from "./author.ts";
import { rehypeAccessibleEmojis } from "rehype-accessible-emojis";
import starlightImageZoom from "starlight-image-zoom";

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
            plugins: [starlightBlog({ authors }), starlightImageZoom()],
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
                SiteTitle: "./src/components/overrides/SiteTitle.astro",
                ContentPanel: "./src/components/overrides/ContentPanel.astro",
                MarkdownContent:
                    "./src/components/overrides/MarkdownContent.astro",
                // Sidebar: "starlight-blog/overrides/Sidebar.astro",
                Footer: "./src/components/overrides/Footer.astro",
            },
            sidebar: sidebar,
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
