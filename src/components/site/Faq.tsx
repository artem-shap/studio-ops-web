import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

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

export function Faq() {
  return (
    <section
      id="faq"
      aria-labelledby="faq-heading"
      className="scroll-mt-16 border-b border-rule py-20 sm:py-24"
    >
      <div className="mx-auto grid w-full max-w-6xl gap-14 px-6 lg:grid-cols-[20rem_1fr]">
        <div>
          <p className="eyebrow">Questions</p>
          <h2
            id="faq-heading"
            className="mt-4 text-3xl font-semibold tracking-tight text-balance sm:text-4xl"
          >
            The ones we get asked first
          </h2>
        </div>

        <Accordion multiple={false} className="w-full">
          {faqs.map((faq) => (
            <AccordionItem key={faq.q} value={faq.q}>
              <AccordionTrigger className="text-left text-base font-medium">
                {faq.q}
              </AccordionTrigger>
              <AccordionContent className="max-w-2xl leading-relaxed text-ink-soft">
                {faq.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
