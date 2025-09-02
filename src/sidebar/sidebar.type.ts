import type starlight from "@astrojs/starlight";
import type starlightSidebarTopics from "starlight-sidebar-topics";

export type Sidebar = Parameters<typeof starlight>[0]["sidebar"];
export type MetaSidebar = Parameters<typeof starlightSidebarTopics>[0];
export type SidebarConf = {
    [key: string]: string[];
};
