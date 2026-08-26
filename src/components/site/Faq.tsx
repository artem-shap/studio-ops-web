import { Plus } from "lucide-react";

const faqs = [
  {
    q: "What does a project usually cost?",
    a: "Most work lands between fifteen and forty thousand. We quote a fixed price against a written scope, so the number you approve is the number you pay. If the scope changes we requote before doing the work, not after.",
  },
  {
    q: "How long does it take?",
    a: "A brand refresh is four to six weeks. A site is six to ten. Internal tools depend entirely on what they replace, and we will not guess at that before a conversation.",
  },
  {
    q: "Do we have to sign a retainer?",
    a: "No, and we would rather you did not. Everything is handed over with source and documentation so your own team can take it forward. Plenty of clients come back, which is different from having to.",
  },
  {
    q: "Who actually does the work?",
    a: "The people you meet. We are small on purpose, and there is no layer of account management between you and whoever is building the thing.",
  },
  {
    q: "What is the client portal?",
    a: "A private link to your project showing status, milestones and dates, updated as the work happens. No account to create and no password to lose. It exists so nobody has to send an email asking where things are.",
  },
  {
    q: "What if we are not the right fit?",
    a: "We will say so, usually within two days, and point you at someone better suited. A project neither side is sure about is worse for us than an empty week.",
  },
];

/**
 * Native details/summary rather than a JavaScript accordion.
 *
 * The component library's version cost 111 KB gzipped on a page whose whole
 * point is being static and fast, in exchange for behaviour the browser
 * already implements — keyboard support, the expanded state, and the
 * accessible name are all free here. It also keeps working with JavaScript
 * disabled, which a marketing page should.
 */
export function Faq() {
  return (
    <section
      id="faq"
      aria-labelledby="faq-heading"
      className="scroll-mt-16 border-b border-rule py-20 sm:py-24"
    >
      <div className="site-x grid w-full gap-14 lg:grid-cols-[22rem_1fr]">
        <div>
          <p className="eyebrow">Questions</p>
          <h2
            id="faq-heading"
            className="mt-4 text-3xl font-semibold tracking-tight text-balance sm:text-4xl"
          >
            The ones we get asked first
          </h2>
        </div>

        <div className="reveal flex flex-col">
          {faqs.map((faq) => (
            <details
              key={faq.q}
              className="group border-b border-rule first:border-t first:border-rule"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-5 text-base font-medium transition-colors hover:text-ink-soft [&::-webkit-details-marker]:hidden">
                {faq.q}
                <Plus
                  className="size-4 shrink-0 text-ink-faint transition-all duration-200 group-open:rotate-45 group-open:text-clay"
                  strokeWidth={1.75}
                  aria-hidden="true"
                />
              </summary>
              <p className="max-w-2xl pb-6 leading-relaxed text-ink-soft">
                {faq.a}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
