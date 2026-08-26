import { ClientMarquee } from "@/components/site/ClientMarquee";
import { Faq } from "@/components/site/Faq";
import { Hero } from "@/components/site/Hero";
import { Process } from "@/components/site/Process";
import { Services } from "@/components/site/Services";
import { SiteFooter } from "@/components/site/SiteFooter";
import { SiteHeader } from "@/components/site/SiteHeader";
import { Stats } from "@/components/site/Stats";
import { Testimonials } from "@/components/site/Testimonials";
import { Work } from "@/components/site/Work";
import { InquiryForm } from "@/components/InquiryForm";

// Static. Nothing on this page waits on anything.
export const dynamic = "force-static";

export default function Home() {
  return (
    <>
      <SiteHeader />

      <main id="main">
        <Hero />
        <ClientMarquee />
        <Work />
        <Stats />
        <Services />
        <Process />
        <Testimonials />
        <Faq />

        <section
          id="inquiry"
          aria-labelledby="inquiry-heading"
          className="scroll-mt-16 py-20 sm:py-24"
        >
          <div className="mx-auto grid w-full max-w-6xl gap-14 px-6 lg:grid-cols-[20rem_1fr]">
            <div>
              <p className="eyebrow">Get in touch</p>
              <h2
                id="inquiry-heading"
                className="mt-4 text-3xl font-semibold tracking-tight text-balance sm:text-4xl"
              >
                Tell us about the work
              </h2>
              <p className="mt-5 max-w-xs leading-relaxed text-ink-soft">
                We are small and we read everything ourselves. If we are not the
                right fit we will say so, and usually point you somewhere
                better.
              </p>
              <dl className="mt-8 flex flex-col gap-4 border-t border-rule pt-8 text-sm">
                <div>
                  <dt className="text-ink-faint">Response time</dt>
                  <dd className="mt-1 font-medium">Two working days</dd>
                </div>
                <div>
                  <dt className="text-ink-faint">Typical project</dt>
                  <dd className="mt-1 font-medium">$15k to $40k</dd>
                </div>
              </dl>
            </div>

            <InquiryForm />
          </div>
        </section>
      </main>

      <SiteFooter />
    </>
  );
}
