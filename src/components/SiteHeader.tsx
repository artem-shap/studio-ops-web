import Link from "next/link";

export function SiteHeader() {
  return (
    <header className="border-b border-rule">
      <div className="mx-auto flex h-16 w-full max-w-5xl items-center justify-between px-6">
        <Link
          href="/"
          className="text-sm font-semibold tracking-tight"
          aria-label="StudioOps home"
        >
          Studio<span className="text-ink-faint">Ops</span>
        </Link>

        <nav aria-label="Primary">
          <a
            href="#inquiry"
            className="text-sm text-ink-soft transition-colors hover:text-ink"
          >
            Start a project
          </a>
        </nav>
      </div>
    </header>
  );
}
