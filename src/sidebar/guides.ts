import type { Sidebar } from "./sidebar.type";

export const guidesSidebar: Sidebar = [
    {
        label: "序言",
        link: "guides",
    },
    {
        label: "工具链接",
        link: "guides/links",
    },
    {
        label: "快速入门",
        items: [
            {
                label: "建立你的第一个 MOD",
                link: "guides/your_first_mod/",
            },
            {
                label: "MOD 加载机制",
                link: "guides/mod_loading_mechanic",
            },
            {
                label: "MOD 基础知识与准备",
                link: "guides/mod_basic/",
            },
            {
                label: "MOD 本地化",
                link: "guides/localisation/",
            },
        ],
    },
    {
        label: "Common Modding",
        items: [{
            autogenerate: {
                collapsed: true, directory: "guides/common_modding"
            },
        }]
    },
    {
        label: "Event Modding",
        items: [{
            autogenerate: {
                collapsed: true, directory: "guides/event_modding"
            },
        }]
    },
    {
        label: "Event Modding 进阶",
        items: [{
            autogenerate: {
                collapsed: true, directory: "guides/event_modding_advanced"
            },
        }]
    },
    {
        label: "函数化",
        items: [{
            autogenerate: {
                collapsed: true, directory: "guides/functions"
            },
        }]
    },
    {
        label: "Dynamic Modding",
        items: [{
            autogenerate: {
                collapsed: true, directory: "guides/dynamic_modding"
            },
        }]
    },
    {
        label: "GUI 与视觉效果",
        items: [{
            autogenerate: {
                collapsed: true, directory: "guides/visual"
            },
        }]
    },
    {
        label: "其他教程",
        items: [{
            autogenerate: {
                collapsed: true, directory: "guides/other"
            },
        }],
    },
];
