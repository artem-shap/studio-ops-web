import { ArrowRight } from "lucide-react";
import { buttonOutline, buttonPrimary } from "@/components/site/controls";

/**
 * The hero animates on load rather than on scroll — it is already in view, so
 * a scroll-triggered reveal would either never fire or fire immediately and
 * look like a glitch. Delays are staggered so the eye moves down the block in
 * the order the content is meant to be read.
 */
export function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-rule">
      <div
        className="grid-backdrop pointer-events-none absolute inset-0 opacity-60"
        aria-hidden="true"
      />
      {/* A single warm wash so the grid does not read as pure grey. */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-72 bg-gradient-to-b from-oat/10 to-transparent"
        aria-hidden="true"
      />

      <div className="site-x relative w-full pt-20 pb-24 sm:pt-28 sm:pb-32">
        <p className="rise eyebrow">Design and development studio</p>

        <h1
          className="rise mt-8 max-w-4xl text-4xl font-semibold tracking-tight text-balance sm:text-6xl lg:text-7xl"
          style={{ animationDelay: "70ms" }}
        >
          Good work, and always knowing where it stands
        </h1>

        <p
          className="rise mt-7 max-w-xl text-lg leading-relaxed text-pretty text-ink-soft"
          style={{ animationDelay: "140ms" }}
        >
          We design and build brands, websites and internal tools — then hand
          them over properly. Every client gets a private link to their own
          project, updated as the work moves.
        </p>

        <div
          className="rise mt-10 flex flex-wrap items-center gap-4"
          style={{ animationDelay: "210ms" }}
        >
          <a href="#inquiry" className={`${buttonPrimary} group h-11 px-6`}>
            Start a project
            <ArrowRight
              className="size-4 transition-transform group-hover:translate-x-0.5"
              strokeWidth={1.75}
              aria-hidden="true"
            />
          </a>
          <a href="#work" className={`${buttonOutline} h-11 px-6`}>
            See recent work
          </a>
        </div>
      </div>
    </section>
  );
}
