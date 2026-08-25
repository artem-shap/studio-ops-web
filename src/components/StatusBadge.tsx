import type { Status, StatusColor } from "@/types/studio";

/**
 * Only the colours a project or milestone status can actually carry. The
 * generated contract has no `rose` on this side: it belongs to the inquiry
 * status, which never leaves the admin panel.
 *
 * Written out in full because Tailwind scans source for complete class names.
 * A template literal built from the colour would be purged from the bundle and
 * every badge would render unstyled in production and nowhere else.
 */
const classes: Record<StatusColor, string> = {
  slate:
    "border-rule-strong text-ink-soft dark:border-rule-strong dark:text-ink-soft",
  blue: "border-blue-500/40 text-blue-700 dark:border-blue-400/40 dark:text-blue-300",
  amber:
    "border-amber-500/40 text-amber-700 dark:border-amber-400/40 dark:text-amber-300",
  emerald:
    "border-emerald-500/40 text-emerald-700 dark:border-emerald-400/40 dark:text-emerald-300",
};

export function StatusBadge({ status }: { status: Status }) {
  return (
    <span
      className={`inline-flex shrink-0 items-center rounded-full border px-2.5 py-0.5 text-xs font-medium ${classes[status.color]}`}
    >
      {status.label}
    </span>
  );
}
