import { Wordmark } from "@/components/site/Wordmark";

const columns = [
  {
    heading: "Studio",
    links: [
      { href: "#work", label: "Work" },
      { href: "#services", label: "Services" },
      { href: "#process", label: "Process" },
      { href: "#faq", label: "FAQ" },
    ],
  },
  {
    heading: "Services",
    links: [
      { href: "#services", label: "Brand and positioning" },
      { href: "#services", label: "Websites" },
      { href: "#services", label: "Internal tools" },
    ],
  },
];

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-rule bg-raised">
      <div className="site-x w-full py-16">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4">
          <div className="flex flex-col gap-4 lg:col-span-2">
            <Wordmark className="text-sm" />
            <p className="max-w-xs leading-relaxed text-ink-soft">
              A small design and development studio. Brand, websites and
              internal tools, handed over properly.
            </p>
          </div>

          {columns.map((column) => (
            <nav key={column.heading} aria-label={column.heading}>
              <h2 className="eyebrow">{column.heading}</h2>
              <ul className="mt-4 flex flex-col gap-2.5">
                {column.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-sm text-ink-soft transition-colors hover:text-ink"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className="mt-14 flex flex-col gap-3 border-t border-rule pt-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-ink-faint">
            &copy; {year} StudioOps. All rights reserved.
          </p>
          <p className="text-sm text-ink-faint">
            Brand, websites and internal tools
          </p>
        </div>
      </div>
    </footer>
  );
}
