# Craft CMS Starter Project

Opinionated Craft CMS 5 starter by Caffeine Creations. Used as a boilerplate for client projects.

## Tech Stack
- **CMS**: Craft CMS 5
- **Local dev**: DDEV (`https://craft-starter.ddev.site`)
- **CSS**: Tailwind CSS 4 (compiled via `@tailwindcss/cli`)
- **JS**: Alpine.js 3 + plugins (collapse, focus, intersect, persist, sort), Swiper, Plyr
- **Templating**: Twig
- **Build**: npm scripts (no Webpack/Vite)

## Key Paths
- `templates/` - Twig templates
- `src/css/` - source CSS (Tailwind)
- `src/js/` - source JS
- `public/assets/` - compiled output (do not edit directly)
- `config/` - Craft config files
- `config/project/` - Craft project config (YAML)

## Local Development
- All Craft CLI commands run inside ddev: `ddev exec php craft ...`
- Start build process: `npm run start`
- Production build: `npm run build`
- Launch site + CP: `ddev launch-site`
- Import db: `ddev import-db --file=db.sql.gz`
- CP login: `cc_admin` / `letmein`

## Installed Plugins
AssetRev, CKEditor, Contact Form, Control Panel CSS, Environment Label, Hyper, Knock Knock, Minify, Retcon, SEOmatic, Sprig, Typogrify

## Shorthand Commands
- **`sdu`** (Show Don't Touch) — when included anywhere in a prompt, explain the concept and show example code, but do NOT edit or create any files. Read-only mode for that request.

## Rules
- Prefer editing existing files over creating new ones
- Do not install plugins unless absolutely necessary — use native Craft features where possible
- Never auto-commit or push without confirmation
- Do not add comments unless logic is non-obvious
- Templates use Twig — follow existing patterns in `templates/`
- CSS uses Tailwind utility classes; avoid writing custom CSS unless necessary
- Dark mode uses the `dark:` prefix; toggle is Alpine.js-based
- Sprig components only reload once on `localhost:3000` — test on the ddev domain
- Images use the `_includes/responsiveImage.twig` include for picture elements
- Navigation defaults to click-based dropdowns (better accessibility)

## Craft CMS Conventions
- Always check if a field has a value before outputting it (`{% if entry.field %}`)
- Use `entry.fieldHandle` dot notation, not bracket notation
- Never edit `config/project/` YAML files directly — use the CP and let Craft write them
- Use SEOmatic for all meta/SEO — don't hardcode meta tags
- Use Hyper for all links and buttons
- Eager-load relations with `.with()` to avoid N+1 queries
- Apply `|typogrify` filter on richtext/CKEditor fields

## Front-End Conventions
- Mobile-first CSS — write base styles for small screens, use `md:`, `lg:` etc. for larger
- No inline styles — use Tailwind classes
- No jQuery — use Alpine.js for interactivity
- Semantic HTML — use correct elements (`<nav>`, `<main>`, `<article>`, `<section>`, etc.)
- All images need meaningful `alt` text or `alt=""` if decorative
- Use `loading="lazy"` on images below the fold
- Use the `responsiveImage.twig` include for all images — don't use raw `<img>` tags
