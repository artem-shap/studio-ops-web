import { ClipboardList, Compass, MessagesSquare, Rocket } from "lucide-react";
import { InquiryForm } from "@/components/InquiryForm";

// Static. The API being asleep must never be the first thing a visitor meets.
export const dynamic = "force-static";

const services = [
  {
    icon: Compass,
    title: "Positioning and brand",
    body: "Naming, identity and the one sentence that makes the rest of the site easy to write.",
  },
  {
    icon: ClipboardList,
    title: "Sites that get handed over",
    body: "Built on a stack your team can edit after we leave, not one that needs us on retainer.",
  },
  {
    icon: Rocket,
    title: "Internal tools",
    body: "The spreadsheet that runs your business, turned into something that will not break next quarter.",
  },
];

const process = [
  {
    step: "01",
    title: "You send an inquiry",
    body: "One form. We read it ourselves and reply within two working days, including when the answer is no.",
  },
  {
    step: "02",
    title: "We scope it together",
    body: "A call, then a written scope with milestones and a fixed price. Nothing starts before you have both.",
  },
  {
    step: "03",
    title: "You watch it happen",
    body: "Every project gets a private link. Status and milestones, always current, so you never email to ask.",
  },
];

export default function Home() {
  return (
    <main id="main" className="mx-auto w-full max-w-4xl px-6 py-16 sm:py-24">
      <section className="flex flex-col gap-6">
        <p className="text-sm font-medium tracking-wide text-accent uppercase">
          StudioOps
        </p>
        <h1 className="text-4xl font-semibold tracking-tight text-balance sm:text-5xl">
          A design studio that tells you where your project actually is
        </h1>
        <p className="max-w-2xl text-lg text-pretty text-muted">
          Most studios go quiet between the kickoff and the launch. We give every
          client a link to their own project — milestones, status and dates,
          updated as the work happens. No status meetings, no chasing.
        </p>
        <a
          href="#inquiry"
          className="self-start rounded-md bg-accent px-5 py-2.5 text-sm font-medium text-accent-foreground"
        >
          Start a project
        </a>
      </section>

      <section aria-labelledby="services" className="mt-20 flex flex-col gap-8">
        <h2 id="services" className="text-2xl font-semibold tracking-tight">
          What we take on
        </h2>
        <ul className="grid gap-6 sm:grid-cols-3">
          {services.map((service) => (
            <li
              key={service.title}
              className="flex flex-col gap-3 rounded-xl border border-border bg-surface p-6"
            >
              <service.icon
                className="size-6 text-accent"
                strokeWidth={1.5}
                aria-hidden="true"
              />
              <h3 className="font-medium">{service.title}</h3>
              <p className="text-sm text-muted">{service.body}</p>
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="process" className="mt-20 flex flex-col gap-8">
        <h2 id="process" className="text-2xl font-semibold tracking-tight">
          How it goes
        </h2>
        <ol className="flex flex-col gap-6">
          {process.map((phase) => (
            <li key={phase.step} className="flex gap-5">
              <span className="font-mono text-sm text-muted tabular-nums">
                {phase.step}
              </span>
              <div className="flex flex-col gap-1">
                <h3 className="font-medium">{phase.title}</h3>
                <p className="max-w-2xl text-sm text-muted">{phase.body}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <section
        id="inquiry"
        aria-labelledby="inquiry-heading"
        className="mt-20 flex flex-col gap-8 scroll-mt-8"
      >
        <div className="flex flex-col gap-3">
          <MessagesSquare
            className="size-6 text-accent"
            strokeWidth={1.5}
            aria-hidden="true"
          />
          <h2
            id="inquiry-heading"
            className="text-2xl font-semibold tracking-tight"
          >
            Tell us about the work
          </h2>
          <p className="max-w-2xl text-muted">
            We are a small studio and we read everything ourselves. If we are not
            the right fit we will say so, and usually point you at someone who is.
          </p>
        </div>

        <InquiryForm />
      </section>

      <footer className="mt-20 border-t border-border pt-8 text-sm text-muted">
        <p>StudioOps — a demonstration project, built end to end on two stacks.</p>
      </footer>
    </main>
  );
}
