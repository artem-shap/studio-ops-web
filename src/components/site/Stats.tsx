const stats = [
  { figure: "2 days", label: "To a real answer on your inquiry" },
  { figure: "6", label: "Studios and practices we work with" },
  { figure: "100%", label: "Of projects handed over with docs" },
  { figure: "0", label: "Status meetings you have to attend" },
];

export function Stats() {
  return (
    <section aria-label="By the numbers" className="border-b border-rule">
      <dl className="mx-auto grid w-full max-w-6xl grid-cols-2 gap-px bg-rule lg:grid-cols-4">
        {stats.map((stat) => (
          <div key={stat.label} className="bg-paper px-6 py-10">
            <dt className="sr-only">{stat.label}</dt>
            <dd>
              <span className="block text-3xl font-semibold tracking-tight tabular-nums sm:text-4xl">
                {stat.figure}
              </span>
              <span className="mt-3 block max-w-[16rem] text-sm leading-relaxed text-ink-soft">
                {stat.label}
              </span>
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
