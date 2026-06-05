# Project structure — JG Digital

Full directory map. Conventions: lowercase-with-hyphens folders; `YYYY-MM-DD` date prefixes on versioned files.

```
JG Digital/
├── README.md
├── STRUCTURE.md
├── .gitignore
├── .env.example
│
├── website/                  # index.html, style.css, script.js
│
├── docs/
│   ├── README.md
│   ├── brand/
│   │   └── brand-guidelines.md
│   ├── onboarding/
│   │   └── client-onboarding.md
│   └── sops/
│       ├── README.md
│       └── monthly-reporting.md
│
├── clients/
│   ├── README.md
│   └── _template-client/
│       ├── README.md
│       ├── briefs/
│       ├── campaigns/
│       ├── reports/
│       └── assets/
│
├── campaigns/                    # Agency-owned / internal (not client slug folders)
│   ├── README.md
│   └── _template-campaign/
│       └── README.md
│
├── projects/
│   ├── README.md
│   └── case-studies/
│       └── README.md
│
├── content/
│   ├── README.md
│   ├── blog/
│   │   ├── README.md
│   │   └── post-outline.md
│   ├── social/
│   │   ├── README.md
│   │   └── post-template.md
│   └── email/
│       ├── README.md
│       └── newsletter-template.md
│
├── creative/
│   ├── README.md
│   ├── brand-assets/
│   ├── design-briefs/
│   └── ad-specs/
│       ├── README.md
│       └── platform-specs.md
│
├── analytics/
│   ├── README.md
│   ├── kpi-framework.md
│   ├── kpi-frameworks/
│   │   ├── README.md
│   │   └── seo-kpis.md
│   └── reporting-templates/
│       └── monthly-performance.md
│
├── sales/
│   ├── README.md
│   ├── crm-notes.md
│   ├── proposals/
│   ├── pitch-decks/
│   └── crm/
│       └── lead-notes-template.md
│
├── operations/
│   ├── README.md
│   ├── contracts/
│   │   ├── README.md
│   │   ├── sow-template.md
│   │   └── msa-template.md
│   ├── invoicing/
│   │   ├── README.md
│   │   └── invoice-template.md
│   └── project-management/
│       ├── README.md
│       └── project-tracker.md
│
├── marketing/
│   ├── README.md
│   ├── seo/
│   │   ├── README.md
│   │   └── audit-checklist.md
│   ├── paid/
│   │   ├── README.md
│   │   └── campaign-notes.md
│   ├── social/
│   │   └── content-calendar.md
│   └── social-calendars/
│       ├── README.md
│       └── 2026-06-social-calendar.md
│
├── templates/
│   ├── README.md
│   ├── proposal.md
│   ├── report.md
│   ├── monthly-report.md
│   ├── creative-brief.md
│   └── content-calendar.md
│
├── team/
│   ├── README.md
│   ├── roles.md
│   └── onboarding-checklist.md
│
└── tools/
    ├── README.md
    └── checklists/
        ├── campaign-launch.md
        └── new-hire-week-one.md
```

## What goes where

| You have… | Put it in… |
|-----------|------------|
| New client workspace | Copy `clients/_template-client/` → `clients/{client-slug}/` |
| Client campaign plan | `clients/{slug}/campaigns/` |
| Internal / agency campaign | Copy `campaigns/_template-campaign/` |
| Monthly client report | `templates/report.md` → `clients/{slug}/reports/` |
| Proposal for prospect | `templates/proposal.md` → `sales/proposals/` |
| Launch QA | `tools/checklists/campaign-launch.md` |
| Case study for sales | `projects/case-studies/` |
| JG Digital social plan | `marketing/social-calendars/` |

## Key entry points

| Document | Path |
|----------|------|
| Agency overview | `README.md` |
| This map | `STRUCTURE.md` |
| Client onboarding | `docs/onboarding/client-onboarding.md` |
| Brand guidelines | `docs/brand/brand-guidelines.md` |
| Proposal template | `templates/proposal.md` |
| Report template | `templates/report.md` |
| Creative brief | `templates/creative-brief.md` |
| Content calendar | `templates/content-calendar.md` |
