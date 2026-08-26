import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-rule">
      <div
        className="pointer-events-none absolute inset-0 grid-backdrop opacity-60"
        aria-hidden="true"
      />

      <div className="relative mx-auto w-full max-w-6xl px-6 pt-20 pb-24 sm:pt-28 sm:pb-32">
        <p className="eyebrow">Design and development studio</p>

        <h1 className="mt-8 max-w-4xl text-4xl font-semibold tracking-tight text-balance sm:text-6xl lg:text-7xl">
          Good work, and always knowing where it stands
        </h1>

        <p className="mt-7 max-w-xl text-lg leading-relaxed text-pretty text-ink-soft">
          We design and build brands, websites and internal tools — then hand
          them over properly. Every client gets a private link to their own
          project, updated as the work moves.
        </p>

        <div className="mt-10 flex flex-wrap items-center gap-4">
          <Button
            render={<a href="#inquiry" />}
            className="group h-11 gap-2 px-6 text-sm"
          >
            Start a project
            <ArrowRight
              className="transition-transform group-hover:translate-x-0.5"
              strokeWidth={1.75}
              aria-hidden="true"
            />
          </Button>
          <Button
            render={<a href="#work" />}
            variant="outline"
            className="h-11 px-6 text-sm"
          >
            See recent work
          </Button>
        </div>
      </div>
    </section>
  );
}
