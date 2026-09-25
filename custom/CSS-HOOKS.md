# CSS hooks

Every element inside the app root carries `data-p="p<N>"`, unique per element in document order on that page, stable across pipeline runs as long as the markup order does not change. Use it to target one specific element: `[data-p="p142"]`.

Semantic hooks (`data-pylon`), present wherever the region exists:

| Hook | Element |
| --- | --- |
| `header` | site header |
| `header.nav` | primary navigation container (also `role="navigation"`, `aria-label="Primary"`) |
| `header.cta` | Request access button in the header |
| `main` | main content (also `id="pylon-main"`, skip-link target) |
| `footer` | site footer (also `aria-label="Footer"`) |
| `post.header` | post header column (category, title, meta) |
| `post.category`, `post.title`, `post.meta`, `post.date`, `post.author` | post header parts |
| `post.body` | content column |
| `post.hero` | hero image wrapper |
| `post.block.<n>` | each content block in order |
| `post.related`, `post.sources`, `post.share` | appended blocks |
| `cta`, `cta.heading`, `cta.hook`, `cta.primary`, `cta.secondary` | end-of-page CTA band |
| `listing.tabs`, `listing.tab` | category tab row and tabs |
| `listing.grid`, `listing.card`, `card.image`, `card.category`, `card.title` | listing grid |
| `form` | HubSpot form wrapper |

Root tokens live in `root.css` (`--pylon-*`). Overrides go in `custom.css`.
