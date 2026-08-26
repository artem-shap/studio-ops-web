# AI notes

Where Claude Code's output was wrong, why it was wrong, and what replaced it.

Kept as the work happens rather than reconstructed afterwards, so the entries
are the real ones. The companion file in `studio-ops-api` holds the rest.

---

## 1. Generated .gitignore silently excluded .env.example

**Generated:** `create-next-app` writes `.env*` into `.gitignore`.

**Why it was wrong:** that pattern also matches `.env.example`, which is the one
environment file that belongs in the repository — it is the contract telling the
next person which variables exist. The failure is quiet: the file is created,
`git status` never mentions it, and it is simply missing from the clone.

**Fixed:** added `!.env.example` below the pattern. Noticed because the file did
not appear in `git status` when it should have.

**Commit:** `e2e945d`

---

## 2. A root loading.tsx turned every route into a streaming response

**Generated:** `loading.tsx` at the app root, which is the textbook way to give
a route a loading state and exactly what the plan called for.

**Why it was wrong:** at the root it applies to every route, and a streaming
response commits its HTTP status before the page body has run. The portal's
`notFound()` was therefore rendering the correct not-found page underneath a
**200**. Nothing threw, nothing logged, and the page looked right in a browser.
It was found by checking the status code with curl rather than by looking at it.

The trade-off is real and was weighed rather than assumed: streaming shows a
skeleton immediately, which matters when the API is waking from a free-tier
suspend. Correctness won, on the grounds that the portal's entire job is to
report state accurately, and reporting "found" for a token that was not found
is the one thing it must not do.

**Fixed:** removed the root `loading.tsx`. The landing page is static and never
needed one; the portal now resolves fully and answers 404 with a 404.

**Commit:** `b9a9853`

---

## 3. A honeypot a screen reader would have walked into

**Generated:** the honeypot field as a visually hidden input, which is what
every anti-spam guide describes.

**Why it was wrong:** "hidden" was doing two different jobs. Hidden from sighted
people is the point; hidden from assistive technology and from keyboard
navigation is a separate thing that has to be asked for. A screen reader would
have announced "Leave this empty" as an ordinary form field, and a blind visitor
filling it in would have had their inquiry rejected as spam.

**Fixed:** the wrapper carries `aria-hidden="true"` and the input `tabIndex={-1}`
and `autoComplete="off"`, so the trap is only reachable by something that ignores
all three. Verified in the rendered markup rather than assumed.

**Commit:** `b9a9853`


---

## 4. Trusting a status code from something that was not the API

**Generated:** `callApi` treated `response.status` as authoritative — 404 meant
not found, and `fetchPortal` turned that into the portal's 404 page. Every HTTP
client is written this way and it reads as obviously correct.

**Why it was wrong:** the site was deployed before the API existed, so the
portal's request reached the host's own "no such service" page: an HTML body
under a 404. The client trusted the status, decided the token did not exist, and
told the visitor their link was invalid.

That is the single thing this page must never get wrong. A client holding a
perfectly good link would have been told it was bad, and the studio would have
spent an afternoon reissuing a token that already worked. It fails in exactly
the situation where it is hardest to diagnose — the API is down, so nobody is
looking at the API, they are looking at a link that "expired".

**Fixed:** the API always answers JSON, so a non-JSON body means the response
did not come from it. That raises 502, which joins the timeout in a "waking"
state that says the visitor did nothing wrong. Found by deploying and opening
the page, not by reasoning about it.

**Commit:** `0ec8d36`

---

## 5. A generic error boundary for an expected condition

**Generated:** letting an API timeout propagate to `error.tsx`, which is where
unhandled errors belong.

**Why it was wrong:** the API is hosted on a tier that suspends after fifteen
idle minutes, so a timeout is not an error — it is what the first visit after a
quiet spell looks like, every time. The page spent sixty seconds and then said
"something went wrong" about something going precisely as designed.

**Fixed:** a three-state result from `fetchPortal`, and a purpose-built waking
state with a reload link. The error boundary stays for things that genuinely are
errors.

**Commit:** `b5bb308`

---

## 6. A validation library shipped to render six options

**Generated:** `budgetRanges` exported from the same module as the Zod schema,
and the client form importing it from there. Grouping a form's schema and its
option lists in one file is tidy and reads well.

**Why it was wrong:** the import pulled Zod into the client bundle. 283 KB of
raw JavaScript went to the browser so a `<select>` could render five options,
on a page that does no client-side validation at all — validation belongs to
the Server Action, which runs on the server, where Zod already is.

It never showed up in a type error or a test. The build succeeded, the page
worked, and the only symptom was the number in a bundle measurement nobody had
taken yet.

**Fixed:** the list moved to its own module with no imports, and the schema
re-exports it so nothing else had to change. Application JavaScript on the
landing page went from 74.6 KB gzipped to 11.4 KB.

**The general shape:** in a codebase with a server/client boundary, an import is
a decision about what ships to the browser. A file that groups server-only
dependencies with values a client component needs turns that decision into an
accident.

**Commit:** the bundle audit commit
