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

/**
 * Static, not a marquee.
 *
 * A scrolling strip of eight names has to loop, and on a wide display the loop
 * is visible: the same two clients sit on screen at once and the fade at the
 * edge is nowhere near wide enough to hide the seam. Motion was also competing
 * with the hero for attention immediately below it.
 *
 * Standing still, each name appears once, the band reads as a quiet divider
 * between the hero and the work, and there is nothing to notice.
 */
export function ClientStrip() {
  return (
    <section aria-labelledby="clients-heading" className="border-b border-rule">
      <div className="site-x flex w-full flex-col gap-6 py-10 lg:flex-row lg:items-center lg:gap-12">
        <h2
          id="clients-heading"
          className="eyebrow shrink-0 lg:border-r lg:border-rule lg:pr-12"
        >
          Trusted by
        </h2>

        <ul className="grid w-full grid-cols-2 gap-x-8 gap-y-3 sm:grid-cols-3 lg:flex lg:justify-between lg:gap-x-6">
          {clients.map((client) => (
            <li
              key={client}
              className="text-sm font-medium text-ink-faint transition-colors hover:text-ink-soft lg:whitespace-nowrap"
            >
              {client}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
