import { ProjectVisual } from "@/components/site/ProjectVisual";

const work = [
  {
    client: "Northlight Coffee",
    title: "One identity, two shops, two teams",
    body: "A second location meant the brand would be applied by people who had never met us. We rebuilt it as a system with rules tight enough to hand over — packaging, signage and the site all drawn from the same set.",
    caption: "Packaging system. The previous range sits at left.",
    outcome: "Opened on schedule",
    tags: ["Identity", "Website"],
    variant: "identity" as const,
    image: null as string | null,
    alt: "A design review table: the roaster's old packaging beside the new range, printed colour chips and a layout proof arranged in a grid.",
  },
  {
    client: "Tidewater Outfitters",
    title: "A checkout that stops losing people",
    body: "Half of the people who reached payment never finished. We took the flow apart screen by screen, replatformed the store, kept every URL, and rebuilt the last three steps.",
    caption: "Checkout flow, reworked screen by screen.",
    outcome: "Cart abandonment down by a third",
    tags: ["E-commerce", "Build"],
    variant: "commerce" as const,
    image: null as string | null,
    alt: "Printed checkout screens laid out left to right in flow order, annotated in pencil, with the rebuilt version running on a laptop at the end of the row.",
  },
  {
    client: "Meridian Dental",
    title: "Booking the front desk actually trusts",
    body: "A shared paper diary had become the booking system, and the crossings-out were the audit trail. We replaced it with availability by location, deposits, and reminders that send themselves.",
    caption: "The appointment book the tool replaced.",
    outcome: "No-shows halved in two months",
    tags: ["Product", "Internal tools"],
    variant: "product" as const,
    image: null as string | null,
    alt: "The practice's old paper appointment book open beside a tablet running the booking tool that replaced it.",
  },
];

export function Work() {
  return (
    <section
      id="work"
      aria-labelledby="work-heading"
      className="scroll-mt-16 border-b border-rule py-20 sm:py-24"
    >
      <div className="site-x w-full">
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
              <figure className="flex flex-col gap-3">
                <ProjectVisual
                  variant={item.variant}
                  image={item.image}
                  alt={item.alt}
                />
                <figcaption className="text-xs text-ink-faint">
                  {item.caption}
                </figcaption>
              </figure>

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
