import { blogSidebar } from "./blog";
import { changelogSidebar } from "./changelog";
import { guidesSidebar } from "./guides";
import type { MetaSidebar, SidebarConf } from "./sidebar.type";

export const sidebar: MetaSidebar = [
    {
        label: "Mod 教程",
        icon: "open-book",
        link: "/guides/",
        id: "guides",
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
        id: "changelog",
        items: changelogSidebar,
    },
    {
        label: "贡献",
        icon: "add-document",
        link: "/contribute/",
        id: "contribute",
        items: [],
    },
];

export const sidebarConf: SidebarConf = {
    guides: ["/guides/**/*"],
    blog: ["/blog/**/*"],
    changelog: ["/changelog/**/*"],
    contribute: ["/contribute/**/*"],
};
