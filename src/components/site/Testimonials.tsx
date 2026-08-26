const quotes = [
  {
    quote:
      "The link to our project was the thing that sold the rest of the team. Nobody had to ask for an update once in three months.",
    name: "Dana Whitfield",
    role: "Owner, Northlight Coffee",
  },
  {
    quote:
      "They told us the first version of our brief was the wrong project, and explained why. That conversation saved us most of the budget.",
    name: "Priya Raman",
    role: "Practice manager, Meridian Dental",
  },
  {
    quote:
      "Handover was a real handover. Our developer had the whole thing running locally in an afternoon, from their documentation alone.",
    name: "Marcus Vandal",
    role: "Operations, Tidewater Outfitters",
  },
];

export function Testimonials() {
  return (
    <section
      aria-labelledby="testimonials-heading"
      className="border-b border-rule py-20 sm:py-24"
    >
      <div className="site-x w-full">
        <p className="eyebrow">What clients say</p>
        <h2
          id="testimonials-heading"
          className="mt-4 max-w-lg text-3xl font-semibold tracking-tight text-balance sm:text-4xl"
        >
          Mostly about not having to chase us
        </h2>

        <ul className="reveal mt-14 grid gap-6 md:grid-cols-3">
          {quotes.map((item) => (
            <li
              key={item.name}
              className="flex flex-col gap-6 rounded-lg border border-rule bg-raised p-7 transition-colors hover:border-rule-strong"
            >
              <blockquote className="leading-relaxed text-pretty">
                &ldquo;{item.quote}&rdquo;
              </blockquote>
              <div className="mt-auto flex items-center gap-3 border-t border-rule pt-5">
                <span
                  className="flex size-9 shrink-0 items-center justify-center rounded-full border border-bone/40 bg-bone/15 text-xs font-medium text-ink-soft"
                  aria-hidden="true"
                >
                  {item.name
                    .split(" ")
                    .map((part) => part[0])
                    .join("")}
                </span>
                <div className="min-w-0">
                  <p className="truncate text-sm font-medium">{item.name}</p>
                  <p className="truncate text-xs text-ink-faint">{item.role}</p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
