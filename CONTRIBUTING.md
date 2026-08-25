# Contributing — studio-ops-web

Engineering standards for this repository. These are enforced in review and in CI.

StudioOps is an intake-and-tracking system for a small design studio. This repository is the **client-facing layer**: the public site with the inquiry form, and the client portal at `/portal/[token]`.

Data and business logic live in `studio-ops-api` (Laravel 13). There is no database here, no ORM, and no business rules. If something needs to be computed or persisted, it belongs in the API.

---

## Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript, strict |
| Styling | Tailwind 4 |
| Icons | Lucide |
| Validation | Zod |
| Tests | Vitest |
| Hosting | Vercel |

The Next.js minor version is pinned. Security releases are applied promptly.

---

## Getting started

```bash
git clone <repo> && cd studio-ops-web
pnpm install
cp .env.example .env.local
pnpm dev
```

Required environment variables:

| Variable | Scope | Purpose |
|---|---|---|
| `STUDIO_API_URL` | server only | base URL of `studio-ops-api` |
| `STUDIO_API_KEY` | server only | shared secret sent as `X-Studio-Key` |

Both are validated with Zod in `src/lib/env.ts` at startup, so a missing variable fails fast at boot instead of at the first request.

Neither is prefixed with `NEXT_PUBLIC_`, and neither ever will be.

---

## Architecture boundary

The browser talks only to the Next.js server. The Next.js server talks to Laravel.

```
browser  ->  Server Action / route handler  ->  studio-ops-api
```

This backend-for-frontend arrangement is deliberate, and several rules follow from it:

- **Never `fetch` the Laravel API from a client component.** The API credential is server-side, and it stays that way
- **CORS is not configured in either repository, and does not need to be.** Cross-origin never happens
- The portal token never appears in a browser network request
- Rate limiting exists at both layers, not just one

A `NEXT_PUBLIC_STUDIO_API_*` variable anywhere in the codebase is a defect.

---

## The API sleeps, and the code accounts for it

`studio-ops-api` is hosted on a free tier that suspends the service after 15 minutes of inactivity. The first request after idle takes roughly a minute while the container wakes.

Every server-side call in `src/lib/api/` therefore:

- sets a generous timeout, around 60 seconds, via `AbortSignal.timeout()`
- retries once on a timeout or a 502/503 response
- falls back to a designed error state with human wording — never a stack trace, never an upstream status code

The landing page renders statically, so a sleeping API never blocks a first impression. The portal is dynamic by necessity and shows a loading state while the API wakes.

This is a stated consequence of zero-cost hosting, and the README says so plainly. A cold start a reader was warned about is a cost decision. One that surprises them is a defect.

---

## Structure

```
src/
  app/
    page.tsx                  landing page
    loading.tsx  error.tsx  not-found.tsx
    portal/[token]/page.tsx   client portal
  components/ui/              primitives
  lib/
    api/                      every call to Laravel, server-side only
    schemas/                  Zod schemas shared by form and Server Action
    env.ts                    Zod-validated environment
  types/
    api.ts                    GENERATED — do not edit
```

`src/types/api.ts` is generated from the Laravel OpenAPI schema with `openapi-typescript`:

```bash
pnpm types:api
```

Hand edits to that file are overwritten on the next generation. The API contract has one owner, and it is the API.

---

## Code conventions

**Server Components by default.** `"use client"` is added only where there is real state, an event handler, or a browser API — and the reason should be obvious from the component. An unnecessary client component is the most common generated mistake in this codebase.

**Forms use Server Actions**, not hand-written fetch handlers.

**One Zod schema per form, shared between client and server.** Schemas live in `src/lib/schemas/` and are imported by both the form and the Server Action. Two schemas describing the same form is a defect, because they will drift.

Maximum lengths in these schemas match the Form Request rules in `studio-ops-api`. A mismatch is a defect: the user would pass client validation and then fail server validation.

**Data fetching is separated from UI.** All API calls live in `src/lib/api/`. Components receive data as props and render it. No `fetch` inside a file that returns JSX.

**Errors do not leak.** API failures are logged server-side; the user sees human wording. No stack traces, no upstream error codes in the UI.

---

## Caching

The portal shows live project status. A cached portal page does not fail loudly — it quietly shows a client last week's status, which is worse.

This project uses the **previous caching model**: `cacheComponents` is not enabled in `next.config.ts`, so route segment config still applies. `src/app/portal/[token]/page.tsx` therefore declares:

```ts
export const dynamic = 'force-dynamic'
```

and passes `{ cache: 'no-store' }` explicitly, even though `fetch` has been uncached by default since Next.js 15. The route-level cache is a separate mechanism, and being explicit here is cheaper than investigating a stale-data report later.

If `cacheComponents: true` is ever enabled, this section stops being valid. Next.js 16 removes `dynamic`, `revalidate` and `fetchCache` under that flag, inverts the default so nothing is cached unless it opts in, and replaces them with the `use cache` directive plus `cacheLife`. Migrating means deleting `export const dynamic` from the portal and adding `use cache` to the landing page instead. The two models are not mixed.

The landing page is the opposite case: static, cached aggressively.

---

## Security

- `STUDIO_API_URL` and `STUDIO_API_KEY` are server-only and Zod-validated at startup
- The inquiry form is rate limited by IP inside the Server Action, and carries a CSS-hidden honeypot field
- The portal route sets `robots: { index: false, follow: false }` and `Referrer-Policy: no-referrer`
- An invalid token renders an ordinary 404 with human wording. The page never distinguishes invalid from expired — that distinction is information an attacker can use
- The token is never logged and never sent to analytics
- Security headers are set in `next.config.ts`: `X-Frame-Options: DENY`, `X-Content-Type-Options: nosniff`, `Referrer-Policy`, `Permissions-Policy`, and a Content Security Policy
- `dangerouslySetInnerHTML` is never used with API data
- `pnpm audit` runs clean before release

---

## UI standards

- Tailwind, mobile-first: unprefixed classes are mobile, then `sm:` `md:` `lg:`
- Dark mode from the first commit, implemented alongside light rather than retrofitted
- Colours come from CSS variables in `globals.css`. No hard-coded hex values in markup
- Icons come from Lucide. Check lucide.dev before writing a custom SVG
- No emoji anywhere — not in the interface, not in code, not in commit messages
- Accessibility, WCAG 2.1 AA: semantic HTML, a `<label>` for every input, visible focus states, `aria-label` on icon-only buttons, 4.5:1 contrast, skip-to-content link
- Every list has a designed empty state. A project with no milestones says something useful
- The portal is opened on phones. Layout changes are checked on a real device, not only in devtools

---

## Performance budget

| Metric | Target |
|---|---|
| LCP | < 2.0s |
| INP | < 200ms |
| CLS | < 0.1 |

Images go through `next/image` with explicit `width` and `height`. Fonts use `font-display: swap`.

Note that these targets apply to the statically rendered landing page. The portal's first paint is bounded by API wake time, which is a hosting trade-off rather than a front-end one.

---

## Tests and CI

Vitest. At minimum, the inquiry Zod schema is tested: it accepts valid input and rejects an empty email, an over-long message, and a filled honeypot.

Components are not unit-tested. At this size the cost outweighs the signal, and that is a deliberate choice.

GitHub Actions runs on every pull request:

```bash
pnpm lint
pnpm typecheck   # generates route types first, then tsc
pnpm test
pnpm build
```

`typecheck` runs `next typegen` before `tsc` on purpose. `LayoutProps` and
`PageProps` are generated into `.next/types` by Next.js, so on a clean checkout
`tsc` alone cannot find them — it passes on a machine that has already built and
fails in CI, which is the worst possible order to discover it in.

A red pipeline blocks the merge.

---

## Branching, commits, pull requests

- One branch per feature: `feat/portal-timeline`, `fix/form-validation`
- [Conventional Commits](https://www.conventionalcommits.org/): `feat:`, `fix:`, `refactor:`, `test:`, `docs:`, `chore:`
- Small, meaningful commits
- Every change goes through a pull request into `main` with green CI, even when working solo
- Never commit `.env.local`. `.env.example` is the contract and stays current

---

## AI-assisted development

This project is built with Claude Code, deliberately and with a documented process rather than ad hoc prompting.

**The loop:**

1. The feature is specified in writing first — routes, data shape, behaviour. Generation happens against a specification, never against "build me a landing page"
2. Repository-level conventions live in `CLAUDE.md`, so generation starts from this project's standards instead of generic defaults
3. Every diff is read before it is committed. Without exception
4. A separate review pass looks specifically for unnecessary client components, fetches that crossed the server boundary, and duplicated validation
5. Commits stay small, so a bad generation is cheap to reverse

**`AI-NOTES.md` records where the generated output was wrong and why.** Each entry states what was generated, why it was corrected, how it was corrected, and links the commit that did it. It is a record of judgement applied to AI output, which is the part of AI-assisted development that actually matters.
