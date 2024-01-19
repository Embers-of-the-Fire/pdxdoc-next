# Stellaris Mod Document

## Prerequisites

You have to install [pnpm](https://pnpm.io) before contributing to this project.

## Contribute

### Documentation

The documentation is available in [`./src/content/docs/guides`].

If you want to add new pages, after creating the file, edit [`sidebar.json`](./sidebar.json) and insert your new page's metadata.

Note that you must reload the entire application to update the sidebar, since it's used in `astro.config.mjs` and won't be auto- or hot-reloaded.

### Blogs

The blogs is available in [`./src/content/docs/blog`](src/content/docs/blog).

For more information, see [Github: starlight-blog by HiDeoo](https://github.com/HiDeoo/starlight-blog).

If you want to keep contributing or publishing blog, please add your profile to [`author.ts`](./author.ts).
Your image should be placed in the [`./public/authors`](public/authors) folder.

## Commands

All commands are run from the root of the project, from a terminal:

| Command                   | Action                                           |
| :------------------------ | :----------------------------------------------- |
| `pnpm install`             | Installs dependencies                            |
| `pnpm run dev`             | Starts local dev server at `localhost:4321`      |
| `pnpm run build`           | Build your production site to `./dist/`          |
| `pnpm run preview`         | Preview your build locally, before deploying     |
| `pnpm run astro ...`       | Run CLI commands like `astro add`, `astro check` |
| `pnpm run astro -- --help` | Get help using the Astro CLI                     |

## Want to learn more?

Check out [Starlight’s docs](https://starlight.astro.build/), read [the Astro documentation](https://docs.astro.build), or jump into the [Astro Discord server](https://astro.build/chat).
