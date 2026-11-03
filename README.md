# appu.dev

Source for [appu.dev](https://appu.dev), the personal site and notes of Prince Santhosh.

Built with [Astro](https://astro.build) on the [Astro Cactus](https://github.com/chrismwilliams/astro-theme-cactus) theme, and deployed to GitHub Pages by `.github/workflows/deploy.yml` on every push to `main`.

## Commands

| Command        | Action                                              |
| :------------- | :-------------------------------------------------- |
| `pnpm install` | Install dependencies                                |
| `pnpm dev`     | Start the dev server at `localhost:4321`            |
| `pnpm build`   | Build the site to `./dist/` and index it for search |
| `pnpm preview` | Preview the built site locally                      |
| `pnpm check`   | Type-check with `astro check` and lint with Biome   |

## Where things live

- `src/site.config.ts`: site title, author, description, URL and menu links
- `content/notes/`: notes, one `.md` file each (`title` and an ISO `publishDate` are required)
- `content/posts/`: longer posts; the Posts and Tags pages are left out of the sitemap until the first one exists
- `src/pages/index.astro`: the homepage text
- `src/components/SocialList.astro`: social links
- `src/pages/og-image/_ogMarkup.ts`: the social card at `/social-card.png` and the per-post OG images
- `astro.config.ts`: integrations and fonts (downloaded at build, served from the site)
- `public/CNAME`: the custom domain for GitHub Pages

## License

MIT, see [LICENSE](LICENSE). The theme is © Chris Williams.
