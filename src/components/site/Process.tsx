const steps = [
  {
    title: "You send an inquiry",
    body: "One form. No discovery call to book a discovery call. We read it ourselves and answer within two working days, including when the answer is no.",
  },
  {
    title: "We scope it together",
    body: "A conversation, then a written scope with milestones and a fixed price. Nothing starts until you have both in hand.",
  },
  {
    title: "You watch it happen",
    body: "Every project gets a private link. Status, milestones and dates, current as the work moves. You never have to ask where things stand.",
  },
  {
    title: "We hand it over",
    body: "Source, documentation and a walkthrough with whoever will own it next. Staying on is an option, not a dependency.",
  },
];

export function Process() {
  return (
    <section
      id="process"
      aria-labelledby="process-heading"
      className="scroll-mt-16 border-b border-rule py-20 sm:py-24"
    >
      <div className="mx-auto grid w-full max-w-6xl gap-14 px-6 lg:grid-cols-[20rem_1fr]">
        <div>
          <p className="eyebrow">How it goes</p>
          <h2
            id="process-heading"
            className="mt-4 text-3xl font-semibold tracking-tight text-balance sm:text-4xl"
          >
            Four steps, no surprises
          </h2>
          <p className="mt-5 max-w-xs leading-relaxed text-ink-soft">
            The third one is the part most studios skip, and the reason clients
            end up chasing.
          </p>
        </div>

        <ol className="flex flex-col">
          {steps.map((step, index) => (
            <li
              key={step.title}
              className="flex gap-6 border-t border-rule py-7 first:border-t-0 first:pt-0 sm:gap-10"
            >
              <span
                className="font-mono text-sm text-ink-faint tabular-nums"
                aria-hidden="true"
              >
                {String(index + 1).padStart(2, "0")}
              </span>
              <div className="flex flex-col gap-2">
                <h3 className="text-base font-medium">{step.title}</h3>
                <p className="max-w-xl leading-relaxed text-ink-soft">
                  {step.body}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
