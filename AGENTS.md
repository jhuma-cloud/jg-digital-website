# AGENTS.md

## Cursor Cloud specific instructions

This repository is a **static website + markdown workspace** for the "JG Digital" marketing agency. There is **no package manager, build step, lint, or automated test suite** — no `package.json`, `requirements.txt`, Makefile, or CI config. Nothing needs to be installed; the startup update script is a no-op.

### The "application"

- `website/` is the source static site (`index.html`, `styles.css`, `script.js`, plus `website/blog/`). This is what you develop.
- `docs/` is the GitHub Pages published copy of the site (note the `.nojekyll` file) and also contains the markdown workspace docs. Treat `website/` as the source of truth for site changes.
- Everything else (`clients/`, `campaigns/`, `content/`, `templates/`, etc.) is markdown documentation for agency operations, not code.

### Running the site (development)

Serve `website/` with any static file server, e.g.:

- `python3 -m http.server 8080` run from the `website/` directory, then open `http://localhost:8080/index.html`.

Both `python3` and `node` are available on the VM. There is no hot reload — refresh the browser after edits.

### Non-obvious notes

- The contact form ("Book a strategy call") is **front-end only** — there is no backend. Submitting a valid form just resets the fields and shows an inline success message ("Thank you! Your message has been received."). Validation logic lives in `website/script.js`.
- `website/index.html` links `styles.css` (the active stylesheet). `website/style.css` also exists but is **not referenced** by the page.
- There are no lint/test/build commands to run for verification; validate changes by serving the site and checking it in the browser.
