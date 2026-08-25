import { ArrowRight } from "lucide-react";
import { InquiryForm } from "@/components/InquiryForm";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";

// Static. Nothing on this page waits on anything.
export const dynamic = "force-static";

const services = [
  {
    title: "Brand and positioning",
    body: "Naming, identity, and the one sentence that makes everything else easier to write. Delivered as a system your team can apply without us.",
    detail: "Identity · Messaging · Guidelines",
  },
  {
    title: "Websites that get handed over",
    body: "Marketing sites and storefronts built on a stack your own developers can pick up. No retainer required to change a headline.",
    detail: "Design · Build · Handover",
  },
  {
    title: "Internal tools",
    body: "The spreadsheet that quietly runs your business, turned into something that will still work when the person who made it leaves.",
    detail: "Discovery · Product · Build",
  },
];

const process = [
  {
    title: "You send an inquiry",
    body: "One form, no discovery call to book a discovery call. We read it ourselves and answer within two working days, including when the answer is no.",
  },
  {
    title: "We scope it together",
    body: "A conversation, then a written scope with milestones and a fixed price. Nothing starts until you have both in hand.",
  },
  {
    title: "You watch it happen",
    body: "Every project gets a private link. Status, milestones and dates, current as the work moves. You never have to ask where things stand.",
  },
];

export default function Home() {
  return (
    <>
      <SiteHeader />

      <main id="main" className="mx-auto w-full max-w-5xl px-6">
        <section className="border-b border-rule py-20 sm:py-28">
          <p className="eyebrow">Design and development studio</p>
          <h1 className="mt-6 max-w-3xl text-4xl font-semibold tracking-tight text-balance sm:text-5xl lg:text-6xl">
            Good work, and always knowing where it stands
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-pretty text-ink-soft">
            Most studios go quiet between the kickoff and the launch. We give
            every client a private link to their own project — milestones,
            status and dates, updated as the work happens.
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4">
            <a
              href="#inquiry"
              className="group inline-flex items-center gap-2 rounded-md bg-ink px-6 py-3 text-sm font-medium text-paper transition-opacity hover:opacity-90"
            >
              Start a project
              <ArrowRight
                className="size-4 transition-transform group-hover:translate-x-0.5"
                strokeWidth={1.75}
                aria-hidden="true"
              />
            </a>
            <p className="text-sm text-ink-faint">
              Two working days to a real answer
            </p>
          </div>
        </section>

        <section
          aria-labelledby="services"
          className="border-b border-rule py-20"
        >
          <div className="grid gap-12 lg:grid-cols-[16rem_1fr]">
            <div>
              <p className="eyebrow">What we do</p>
              <h2
                id="services"
                className="mt-4 text-2xl font-semibold tracking-tight"
              >
                Three kinds of work
              </h2>
            </div>

            <ul className="grid gap-px bg-rule">
              {services.map((service) => (
                <li key={service.title} className="bg-paper py-8 first:pt-0">
                  <div className="flex flex-col gap-3 sm:flex-row sm:gap-10">
                    <h3 className="w-full shrink-0 text-base font-medium sm:w-56">
                      {service.title}
                    </h3>
                    <div className="flex flex-col gap-3">
                      <p className="max-w-xl leading-relaxed text-ink-soft">
                        {service.body}
                      </p>
                      <p className="text-xs tracking-wide text-ink-faint">
                        {service.detail}
                      </p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section
          aria-labelledby="process"
          className="border-b border-rule py-20"
        >
          <div className="grid gap-12 lg:grid-cols-[16rem_1fr]">
            <div>
              <p className="eyebrow">How it goes</p>
              <h2
                id="process"
                className="mt-4 text-2xl font-semibold tracking-tight"
              >
                Three steps, no surprises
              </h2>
            </div>

            <ol className="flex flex-col">
              {process.map((phase, index) => (
                <li
                  key={phase.title}
                  className="flex gap-6 border-t border-rule py-8 first:border-t-0 first:pt-0 sm:gap-10"
                >
                  <span
                    className="font-mono text-sm text-ink-faint tabular-nums"
                    aria-hidden="true"
                  >
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <div className="flex flex-col gap-2">
                    <h3 className="text-base font-medium">{phase.title}</h3>
                    <p className="max-w-xl leading-relaxed text-ink-soft">
                      {phase.body}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section
          id="inquiry"
          aria-labelledby="inquiry-heading"
          className="scroll-mt-4 py-20"
        >
          <div className="grid gap-12 lg:grid-cols-[16rem_1fr]">
            <div>
              <p className="eyebrow">Get in touch</p>
              <h2
                id="inquiry-heading"
                className="mt-4 text-2xl font-semibold tracking-tight"
              >
                Tell us about the work
              </h2>
              <p className="mt-4 max-w-xs leading-relaxed text-ink-soft">
                We are small and we read everything ourselves. If we are not the
                right fit we will say so, and usually point you somewhere
                better.
              </p>
            </div>

            <InquiryForm />
          </div>
        </section>
      </main>

      <SiteFooter />
    </>
  );
}
