const clients = [
  "Northlight Coffee",
  "Meridian Dental",
  "Harborview Architects",
  "Wildflower Bakery",
  "Ravenscourt Legal",
  "Tidewater Outfitters",
  "Foxglove Interiors",
  "Beacon Hill Cycles",
];

export function ClientMarquee() {
  return (
    <section
      aria-label="Selected clients"
      className="border-b border-rule py-10"
    >
      <div className="mx-auto w-full max-w-6xl px-6">
        <p className="eyebrow text-center">Trusted by</p>
      </div>

      <div className="relative mt-6 overflow-hidden">
        {/* Fades so the loop does not visibly cut at the edges. */}
        <div
          className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-paper to-transparent"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-paper to-transparent"
          aria-hidden="true"
        />

        {/* Duplicated once so the translate can loop seamlessly. The copy is
            hidden from assistive technology, which reads the list only once. */}
        <div className="flex w-max animate-marquee">
          {[0, 1].map((copy) => (
            <ul
              key={copy}
              className="flex shrink-0 items-center gap-14 pr-14"
              aria-hidden={copy === 1 ? "true" : undefined}
            >
              {clients.map((client) => (
                <li
                  key={client}
                  className="text-sm font-medium whitespace-nowrap text-ink-faint"
                >
                  {client}
                </li>
              ))}
            </ul>
          ))}
        </div>
      </div>
    </section>
  );
}
