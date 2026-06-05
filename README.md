# JG Digital

Digital marketing agency workspace — clients, campaigns, creative, analytics, and operations in one place.

## Public website

Static marketing site: open [`website/index.html`](./website/index.html) in a browser (or serve the `website/` folder).

## Quick start

1. Read [STRUCTURE.md](./STRUCTURE.md) for the full folder map.
2. Copy `clients/_template-client/` when onboarding a new client (rename to `clients/<client-slug>/`).
3. Use `templates/` for proposals, reports, briefs, and content calendars.
4. Store SOPs and brand rules in `docs/`.
5. Track agency growth in `marketing/`; internal experiments in `campaigns/`.

## Services covered

| Area | Folder |
|------|--------|
| Client delivery | `clients/` |
| Internal / agency campaigns | `campaigns/` |
| Case studies & portfolio | `projects/` |
| Content & copy | `content/` |
| Design & ads | `creative/` |
| Performance & reporting | `analytics/` |
| New business | `sales/` |
| Contracts, billing, PM | `operations/` |
| Agency marketing | `marketing/` |
| Reusable assets | `templates/` |
| Team & onboarding | `team/` |
| Case studies & portfolio | `projects/` |
| Checklists & utilities | `tools/` |

## Conventions

- **Folders:** lowercase-with-hyphens (`client-slug`, not `Client Slug`).
- **Dates in filenames:** `YYYY-MM-DD-description.md`
- **Client folders:** `clients/<client-slug>/` — never delete; archive to `clients/<client-slug>/archive/` if inactive.
- **Secrets:** never commit API keys or passwords; use `.env.example` as a template only.

## Getting help

- Process questions → `docs/sops/`
- Brand voice & visuals → `docs/brand/`
- New hire checklist → `team/onboarding-checklist.md`
