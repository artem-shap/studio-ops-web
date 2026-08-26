import { Compass, LayoutGrid, Wrench } from "lucide-react";

/**
 * The tint is not decoration: each kind of work keeps the same colour here and
 * on its case study, so the two sections read as one taxonomy rather than two
 * lists. Written out in full because Tailwind reads complete class names.
 */
const services = [
  {
    icon: Compass,
    title: "Brand and positioning",
    body: "Naming, identity and the one sentence that makes everything else easier to write. Delivered as a system your team can apply without us.",
    includes: ["Identity", "Messaging", "Guidelines"],
    tint: "border-clay/30 bg-clay/10 text-clay",
  },
  {
    icon: LayoutGrid,
    title: "Websites that get handed over",
    body: "Marketing sites and storefronts built so your own developers can pick them up. No retainer required to change a headline.",
    includes: ["Design", "Build", "Handover"],
    tint: "border-indigo/30 bg-indigo/10 text-indigo",
  },
  {
    icon: Wrench,
    title: "Internal tools",
    body: "The spreadsheet that quietly runs your business, turned into something that still works when the person who made it leaves.",
    includes: ["Discovery", "Product", "Build"],
    tint: "border-sage/30 bg-sage/10 text-sage",
  },
];

export function Services() {
  return (
    <section
      id="services"
      aria-labelledby="services-heading"
      className="scroll-mt-16 border-b border-rule py-20 sm:py-24"
    >
      <div className="site-x w-full">
        <div className="reveal">
          <p className="eyebrow">What we do</p>
          <h2
            id="services-heading"
            className="mt-4 max-w-lg text-3xl font-semibold tracking-tight text-balance sm:text-4xl"
          >
            Three kinds of work, done properly
          </h2>
        </div>

        <ul className="reveal mt-14 grid gap-px bg-rule md:grid-cols-3">
          {services.map((service) => (
            <li
              key={service.title}
              className="group flex flex-col gap-5 bg-paper p-8 transition-colors hover:bg-raised"
            >
              <span
                className={`flex size-11 items-center justify-center rounded-lg border transition-transform duration-300 group-hover:-translate-y-0.5 ${service.tint}`}
              >
                <service.icon
                  className="size-5"
                  strokeWidth={1.5}
                  aria-hidden="true"
                />
              </span>
              <h3 className="text-lg font-medium tracking-tight">
                {service.title}
              </h3>
              <p className="leading-relaxed text-ink-soft">{service.body}</p>
              <ul className="mt-auto flex flex-wrap gap-x-2 gap-y-1 pt-2 text-xs text-ink-faint">
                {service.includes.map((item, index) => (
                  <li key={item}>
                    {item}
                    {index < service.includes.length - 1 ? (
                      <span className="ml-2" aria-hidden="true">
                        ·
                      </span>
                    ) : null}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
