export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-24 border-t border-rule">
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-2 px-6 py-10 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm font-semibold tracking-tight">
          Studio<span className="text-ink-faint">Ops</span>
        </p>
        <p className="text-sm text-ink-faint">
          &copy; {year} StudioOps. Brand, websites and internal tools.
        </p>
      </div>
    </footer>
  );
}
