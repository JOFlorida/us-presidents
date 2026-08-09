# U.S. Presidents

A personal static website presenting all numbered presidencies of the United States.

## Features

- 47 presidential-number cards
- Search by president name
- Sort by presidential number, name, or birth date
- Responsive layout for desktop and mobile
- Optimized WebP portrait previews for fast browsing
- Full-resolution PNG originals for visitor downloads
- Automatic fallback to the full-resolution PNG if a preview has not been created yet
- Image placeholders when no portrait has been uploaded
- Plain HTML, CSS, JavaScript, and JSON — no build system required

## Image structure

Portraits are stored in two separate folders:

```text
images/
└── presidents/
    ├── originals/
    │   ├── 01-george-washington.png
    │   ├── 02-john-adams.png
    │   └── ...
    └── previews/
        ├── 01-george-washington.webp
        ├── 02-john-adams.webp
        └── ...
```

### Originals

Place the full-resolution PNG artwork in `images/presidents/originals/`.

Examples:

- `01-george-washington.png`
- `02-john-adams.png`
- `16-abraham-lincoln.png`
- `47-donald-trump.png`

The **Download Full-Resolution PNG** link on each president card points to the file in this folder.

### Previews

Place an optimized WebP preview in `images/presidents/previews/` using the same base filename.

Examples:

- `01-george-washington.webp`
- `02-john-adams.webp`
- `16-abraham-lincoln.webp`
- `47-donald-trump.webp`

A preview around 600–800 pixels wide is recommended for normal card display. The browser displays the preview at the card size, while the original PNG remains untouched for downloading.

If a WebP preview is missing, the site automatically tries the full-resolution PNG instead. If neither file exists, a neutral placeholder is displayed.

## Adding a new portrait

1. Upload the full-resolution PNG to `images/presidents/originals/`.
2. Optionally create a smaller WebP copy and upload it to `images/presidents/previews/`.
3. Use the exact base filename already defined for that president in `data/presidents.json`.
4. GitHub Pages will redeploy automatically after the commit is published.

## Run locally

Because the site loads JSON with `fetch()`, use a small local web server rather than opening `index.html` directly.

```bash
python -m http.server 8000
```

Then visit `http://localhost:8000`.

## GitHub Pages

Enable GitHub Pages from the repository's **Settings → Pages** and deploy from the `main` branch root.
