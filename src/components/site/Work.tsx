import { ProjectVisual } from "@/components/site/ProjectVisual";

const work = [
  {
    client: "Northlight Coffee",
    title: "One brand across two locations",
    body: "A second site meant two sets of hours, two menus and one identity that had to hold both. We rebuilt the brand system and the site behind it.",
    outcome: "Opened on schedule",
    tags: ["Identity", "Website"],
    variant: "identity" as const,
  },
  {
    client: "Tidewater Outfitters",
    title: "A checkout that stops losing people",
    body: "Half of the people who reached payment never finished. We replatformed the store, kept every URL, and rebuilt the last three steps.",
    outcome: "Cart abandonment down by a third",
    tags: ["E-commerce", "Build"],
    variant: "commerce" as const,
  },
  {
    client: "Meridian Dental",
    title: "Booking that the front desk trusts",
    body: "A shared calendar had become the booking system. We replaced it with availability by location, deposits, and reminders that actually send.",
    outcome: "No-shows halved in two months",
    tags: ["Product", "Internal tools"],
    variant: "product" as const,
  },
];

export function Work() {
  return (
    <section
      id="work"
      aria-labelledby="work-heading"
      className="scroll-mt-16 border-b border-rule py-20 sm:py-24"
    >
      <div className="mx-auto w-full max-w-6xl px-6">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="eyebrow">Selected work</p>
            <h2
              id="work-heading"
              className="mt-4 max-w-lg text-3xl font-semibold tracking-tight text-balance sm:text-4xl"
            >
              Three projects, three different problems
            </h2>
          </div>
          <p className="max-w-xs text-sm leading-relaxed text-ink-soft">
            We take on work where the brief is a business problem, not a list of
            pages.
          </p>
        </div>

        <ul className="mt-14 grid gap-x-8 gap-y-14 md:grid-cols-3">
          {work.map((item) => (
            <li key={item.client} className="flex flex-col gap-5">
              <ProjectVisual variant={item.variant} />

              <div className="flex flex-col gap-3">
                <p className="eyebrow">{item.client}</p>
                <h3 className="text-lg font-medium tracking-tight text-balance">
                  {item.title}
                </h3>
                <p className="leading-relaxed text-ink-soft">{item.body}</p>
              </div>

              <div className="mt-auto flex flex-col gap-3 border-t border-rule pt-4">
                <p className="text-sm font-medium">{item.outcome}</p>
                <ul className="flex flex-wrap gap-2">
                  {item.tags.map((tag) => (
                    <li
                      key={tag}
                      className="rounded-full border border-rule px-2.5 py-0.5 text-xs text-ink-faint"
                    >
                      {tag}
                    </li>
                  ))}
                </ul>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
