# U.S. Presidents

A personal static website presenting all numbered presidencies of the United States.

## Features

- 47 presidential-number cards
- Search by president name
- Sort by presidential number, name, or birth date
- Responsive layout for desktop and mobile
- Image placeholders that automatically disappear behind your own portraits
- Plain HTML, CSS, JavaScript, and JSON — no build system required

## Add your portraits

Place your JPG images in `images/presidents/` using the filenames already specified in `data/presidents.json`.

Examples:

- `01-george-washington.jpg`
- `02-john-adams.jpg`
- `16-abraham-lincoln.jpg`
- `47-donald-trump.jpg`

If an image is missing, the site displays a neutral placeholder.

## Run locally

Because the site loads JSON with `fetch()`, use a small local web server rather than opening `index.html` directly.

```bash
python -m http.server 8000
```

Then visit `http://localhost:8000`.

## GitHub Pages

After the repository is published, enable GitHub Pages from the repository's **Settings → Pages** and deploy from the `main` branch root.
