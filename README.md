# Stellaris Mod Document 群星 Mod 制作文档

本仓库部署于 [pdxdoc-next @ netlify](https://main--pdxdoc-next.netlify.app/)。

## 贡献指南

本仓库使用 [pnpm](https://pnpm.io) 作为统一包管理工具。

### 文档部分

文档内容位于 `./src/content/docs/guides` 目录下。

如果你想要添加新的页面，在创建并编写完成后，修改 [`sidebar.json`](./sidebar.json) 并将你的文档置于合适的分类下。

**注意**

在修改侧边栏后，需要重启整个应用程序，因为这一配置直接被 `astro.config.mjs` 引用而无法热重载。

### 博客

博客内容位于 `./src/content/docs/blog` 目录下。

关于博客可选内容的更多信息，参考 [Github: starlight-blog by HiDeoo](https://github.com/HiDeoo/starlight-blog)。

如果你想要发表博客，请将你的个人标识添加到 [`author.ts`](./author.ts) 中。你的个人头像应该放在 [`./public/authors`](./public/authors) 文件夹下。

### 其他注意事项

1.  在修改侧边栏 `sidebar.json` 或作者组 `author.ts` 后，需要重启整个应用程序，因为这些配置直接被 `astro.config.mjs` 引用而无法热重载。
2.  文章的图片应该放置于 `.assets` 结尾的子域中，例如：<br/>
    文章 `src/content/docs/blog/practical_editor.mdx` 的图片应放置在 `src/content/docs/blog/practical_editor.assets/` 文件夹下。
3.  文章应配备合适的摘要，文件名不使用中文或中文拼音。

## 构建命令

所有命令应该在终端中在项目根目录下运行：

| 命令                       | 行为                                                   |
| :------------------------- | :----------------------------------------------------- |
| `pnpm install`             | 下载依赖                                               |
| `pnpm run dev`             | 在 `localhost:4321` 处启动开发服务器                   |
| `pnpm run build`           | 将站点构建于 `./dist/` 目录下                          |
| `pnpm run preview`         | 在部署前本地预览站点                                   |
| `pnpm run astro ...`       | 运行 Astro 命令行程序，例如 `astro add`、`astro check` |
| `pnpm run astro -- --help` | 获取 Astro 命令行程序的帮助                            |

## 致谢

本站点基于 [Astro](https://astro.build) 构建，UI 配置基于 [Starlight](https://starlight.astro.build)。
