# Lightweight Dynamic QR Redirect Engine

Static GitHub Pages redirect router for durable QR codes that can keep the same printed URL while changing destinations over time.

## How it works

Use QR codes that point to this site with an alias query string:

- `https://mlinnen.github.io/qr/?to=scarecrow`
- `https://mlinnen.github.io/qr/?id=scarecrow`

The router reads the alias, looks it up in `CONFIG.routes` in `index.html`, then redirects with `window.location.replace(...)`.

## Updating routes

Edit `index.html` and update:

- `CONFIG.defaultUrl` for unmatched/missing aliases
- `CONFIG.routes` key/value pairs (alias -> full destination URL)

Example:

```js
"scarecrow": "https://docs.google.com/forms/d/e/.../viewform"
```

## QR payload guidance

When generating QR codes, keep the URL format:

`https://mlinnen.github.io/qr/?to=<alias>`

Use a trailing slash before query parameters to avoid extra redirect hops.
