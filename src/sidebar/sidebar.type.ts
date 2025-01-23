import type starlightSidebarTopicsPlugin from "starlight-sidebar-topics";
import type starlight from "@astrojs/starlight";

export type Sidebar = Parameters<typeof starlight>[0]["sidebar"];
export type MetaSidebar = Parameters<typeof starlightSidebarTopicsPlugin>[0];
