# Lightweight Dynamic QR Redirect Engine

Static GitHub Pages redirect router for durable QR codes that can keep the same printed URL while changing destinations over time.

## How it works

Use QR codes that point to this site with an alias query string:

- `https://mlinnen.github.io/qr/?to=scarecrow2026`
- `https://mlinnen.github.io/qr/?id=mhscarecontest`

The router reads the alias, looks it up in `CONFIG.routes` in `src/index.html`, then redirects with `window.location.replace(...)`.
Alias-based routing depends on JavaScript being enabled.
Missing or unknown aliases fall back to the default destination.
When JavaScript is disabled, the page shows a direct link to the default destination.
Alias-specific `to`/`id` routing does not run in the no-JS path.

## Updating routes

Edit `src/index.html` and update:

- `CONFIG.routes` key/value pairs (alias -> full destination URL)
- The `#manual-link` URL, which is used as the default fallback destination
- The `<noscript>` fallback link URL (keep it aligned with `#manual-link`)

Example:

```js
"scarecrow2026": "https://docs.google.com/forms/d/e/.../viewform",
"mhscarecontest": "https://www.minthillevents.org/scarecrow-contest"
```

## Build & Deployment

### Local Build

To build the static site locally into the `dist/` directory:

```bash
npm run build
```

This cleans and populates `dist/` from `src/`.

### GitHub Pages Setup

This repository uses GitHub Actions to deploy to GitHub Pages:

1. In GitHub, go to your repository **Settings** > **Pages**.
2. Under **Build and deployment** > **Source**, select **GitHub Actions**.
3. Pushes to `main` will automatically trigger the `.github/workflows/deploy.yml` workflow, building `src/` to `dist/` and publishing the page.

## QR payload guidance

When generating QR codes, keep the URL format:

`https://mlinnen.github.io/qr/?to=<alias>`

Use a trailing slash before query parameters to avoid extra redirect hops.
