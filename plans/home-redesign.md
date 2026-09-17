# Home redesign (branch `redesign/home`)

Source brief: vault `03-projects/personal-website/research/2026-09-17-product-designer-websites.md`.
UI skills used (ui-skills CLI): `anthropics/frontend-design`, `emilkowalski/emil-design-eng`.

## Subject

A designer-engineer who ships fintech product work and the token systems under it.
Audience: hiring reviewers. Job of the page: identify the specialty in 10 seconds, reach one study or the Lab in two actions.

## The one bold move

The hero is rendered twice, once in the light palette and once in the dark, with a draggable split between them.
The handle reads `surface-0  #FFFFFF | #0A0A0A`: one semantic token resolving per mode, which is what the dark-mode work is about.
Dark side sets the display type one weight lighter (560 to 500): the halation compensation a real dark mode needs.
It sweeps in once on load (the only non-user motion on the page). Reduced motion: static at 50%. Keyboard: slider with arrows, Home, End.

## Tokens

- Light side: `#FFFFFF` surface, `#171717` ink, `#525252` muted, `#C94200` accent (existing site tokens).
- Dark side: `#0A0A0A`, `#F5F5F5`, `#A3A3A3`, `#FF6B22`.
- Lab band: `#2F6F52`, the FX entry's own tint from `components/lab/data.ts`.
- Type: Geist Variable only, display at 7vw with -0.035em tracking. Geist Mono only for token values.

## Layout

```
HERO (split light | dark, ~92svh)
  name + role                                   Work  Lab  About  Résumé
  I design financial products
  and the systems behind them.             (display, 3 lines)
  At GetirFinans ... SwiftUI and React.          [Get in touch]
  ───────── surface-0 #FFFFFF (grip) surface-0 #0A0A0A ─────────

SELECTED WORK (12-col, asymmetric)
  [ AI image 8 ]            [ title / line / role, year, status 4 ]
  [ text 3 ]     [ DS image 8, offset ]
  [ Jotform 5 ]      [ WiseCare 6, dropped 10rem ]

LAB (full bleed #2F6F52)
  [ phone recording ]   Two fingers, one date range.  [Pause] [How it works] [All 4 entries]

ALL WORK (grouped by year; year numerals in the left gutter)
CLOSE: open to remote work and relocation. hello@ulasalyesil.com (display size) + links
```

## Guardrails

- Whole work pieces are links; no information only on hover; hover effects gated to fine pointers.
- View-transition names `project-{slug}-title|cover` kept so the route morph into studies still works.
- Tap targets 44px minimum. Visible focus. No horizontal overflow at 360px.
- Real copy only. Status lines come from existing case-study metadata.
