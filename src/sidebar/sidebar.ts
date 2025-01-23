import { blogSidebar } from "./blog";
import { changelogSidebar } from "./changelog";
import { guidesSidebar } from "./guides";
import type { MetaSidebar } from "./sidebar.type";

export const sidebar: MetaSidebar = [
    {
        label: "Mod 教程",
        icon: "open-book",
        link: "/guides/",
        items: guidesSidebar,
    },
    {
        label: "博客",
        icon: "bars",
        link: "/blog/",
        id: "blog",
        items: blogSidebar,
    },
    {
        label: "改动日志",
        icon: "information",
        link: "/changelog/",
        items: changelogSidebar,
    },
    {
        label: "贡献",
        icon: "add-document",
        link: "/contribute/",
        items: [],
    },
];
