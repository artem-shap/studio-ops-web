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
