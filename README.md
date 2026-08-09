# U.S. Presidents

A personal static website presenting all numbered presidencies of the United States.

## Features

- 47 presidential-number cards
- Search by president name
- Sort by presidential number, name, or birth date
- Responsive layout for desktop and mobile
- PNG portrait support
- Download PNG link on each president card
- Image placeholders when a portrait has not yet been added
- Plain HTML, CSS, JavaScript, and JSON — no build system required

## Add your portraits

Place your PNG images in `images/presidents/` using the filenames specified in `data/presidents.json`.

Examples:

- `01-george-washington.png`
- `02-john-adams.png`
- `16-abraham-lincoln.png`
- `47-donald-trump.png`

If an image is missing, the site displays a neutral placeholder. When the PNG is present, visitors can use the **Download PNG** link on the president card to download the original image file.

## Image folder

The repository includes:

```text
images/
└── presidents/
    └── .gitkeep
```

The `.gitkeep` file exists only so GitHub retains the otherwise-empty `images/presidents/` directory. It can remain after portrait files are added or be deleted later.

## Run locally

Because the site loads JSON with `fetch()`, use a small local web server rather than opening `index.html` directly.

```bash
python -m http.server 8000
```

Then visit `http://localhost:8000`.

## GitHub Pages

Enable GitHub Pages from the repository's **Settings → Pages** and deploy from the `main` branch root.
