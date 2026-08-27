/**
 * Shared class strings for the form controls and buttons on the public site.
 *
 * These are styled native elements, not components. The registry versions of
 * the same four primitives pulled a component runtime into the bundle — 88 KB
 * gzipped on a page that is otherwise static — in exchange for nothing this
 * site uses: no polymorphic render, no controlled state, no floating layer.
 *
 * The registry is still configured in components.json, so anything that
 * genuinely needs behaviour — a listbox, a dialog, a date picker — can be
 * pulled in when it is needed. Nothing is kept installed that nothing uses.
 */

export const control =
  "w-full rounded-lg border border-rule bg-paper px-3.5 py-2.5 text-sm text-ink transition-colors placeholder:text-ink-faint hover:border-rule-strong focus-visible:border-brand focus-visible:outline-none aria-invalid:border-destructive";

export const label = "text-sm font-medium text-ink";

export const buttonBase =
  "inline-flex shrink-0 items-center justify-center gap-2 rounded-lg text-sm font-medium whitespace-nowrap transition-opacity disabled:pointer-events-none disabled:opacity-50";

export const buttonPrimary = `${buttonBase} bg-ink text-paper hover:opacity-90`;

export const buttonOutline = `${buttonBase} border border-rule bg-paper text-ink hover:border-rule-strong hover:opacity-100`;
