import { Check, Minus } from "lucide-react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SiteFooter } from "@/components/SiteFooter";
import { StatusBadge } from "@/components/StatusBadge";
import { fetchPortal } from "@/lib/api/portal";
import type { Milestone, ProjectWithMilestones } from "@/types/studio";

/*
 * Never cached. This page exists to show a client where their project is right
 * now; a stale render does not fail loudly, it quietly shows last week's status
 * and nobody notices until someone asks about a milestone that finished days
 * ago. `fetch` has been uncached by default since Next 15, but the route-level
 * cache is a separate mechanism and worth being explicit about.
 *
 * `cacheComponents` is not enabled, so this route segment config still applies.
 * If it is ever turned on, this export stops existing and the landing page opts
 * into caching with `use cache` instead.
 */
export const dynamic = "force-dynamic";

// A link anyone can hold must never reach a search index.
export const metadata: Metadata = {
  robots: { index: false, follow: false },
  title: "Your project",
};

function formatDate(value: string | null): string {
  if (value === null) {
    return "Not scheduled";
  }

  return new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(new Date(value));
}

function Marker({ milestone }: { milestone: Milestone }) {
  const state = milestone.status.value;

  if (state === "done") {
    return (
      <span className="relative z-10 flex size-6 items-center justify-center rounded-full bg-ink text-paper">
        <Check className="size-3.5" strokeWidth={2.5} aria-hidden="true" />
      </span>
    );
  }

  if (state === "in_progress") {
    return (
      <span className="relative z-10 flex size-6 items-center justify-center rounded-full border-2 border-ink bg-paper">
        <span className="size-2 rounded-full bg-ink" />
      </span>
    );
  }

  return (
    <span className="relative z-10 flex size-6 items-center justify-center rounded-full border border-rule-strong bg-paper text-ink-faint">
      <Minus className="size-3" strokeWidth={2} aria-hidden="true" />
    </span>
  );
}

function Timeline({ milestones }: { milestones: Milestone[] }) {
  if (milestones.length === 0) {
    return (
      <p className="text-sm text-ink-soft">
        Milestones are being planned and will appear here shortly.
      </p>
    );
  }

  return (
    <ol className="relative flex flex-col gap-6">
      {/* The spine. Decorative, so it stays out of the accessibility tree. */}
      <span
        className="absolute top-3 bottom-3 left-3 w-px -translate-x-1/2 bg-rule"
        aria-hidden="true"
      />

      {milestones.map((milestone) => (
        <li key={milestone.id} className="flex items-start gap-4">
          <Marker milestone={milestone} />
          <div className="flex min-w-0 flex-1 flex-col gap-1 pt-0.5 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6">
            <span
              className={
                milestone.status.value === "done"
                  ? "text-sm text-ink-soft line-through decoration-rule-strong"
                  : "text-sm font-medium"
              }
            >
              {milestone.title}
            </span>
            <span className="flex shrink-0 items-center gap-3">
              <StatusBadge status={milestone.status} />
              <span className="text-xs text-ink-faint tabular-nums">
                {formatDate(milestone.due_date)}
              </span>
            </span>
          </div>
        </li>
      ))}
    </ol>
  );
}

function ProjectCard({ project }: { project: ProjectWithMilestones }) {
  const done = project.milestones.filter(
    (milestone) => milestone.status.value === "done",
  ).length;
  const total = project.milestones.length;
  const percent = total === 0 ? 0 : Math.round((done / total) * 100);

  return (
    <section
      aria-labelledby={`project-${project.id}`}
      className="rounded-lg border border-rule bg-raised"
    >
      <header className="flex flex-col gap-4 border-b border-rule p-6 sm:p-8">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="flex flex-col gap-1">
            <h2
              id={`project-${project.id}`}
              className="text-xl font-semibold tracking-tight"
            >
              {project.title}
            </h2>
            <p className="text-sm text-ink-soft">
              Due {formatDate(project.due_date)}
            </p>
          </div>
          <StatusBadge status={project.status} />
        </div>

        {total > 0 ? (
          <div className="flex flex-col gap-2">
            <div className="flex items-baseline justify-between text-xs text-ink-faint">
              <span>
                {done} of {total} milestones complete
              </span>
              <span className="tabular-nums">{percent}%</span>
            </div>
            <div
              className="h-1 w-full overflow-hidden rounded-full bg-rule"
              role="progressbar"
              aria-valuenow={percent}
              aria-valuemin={0}
              aria-valuemax={100}
              aria-label={`${project.title} progress`}
            >
              <div
                className="h-full rounded-full bg-ink transition-[width]"
                style={{ width: `${percent}%` }}
              />
            </div>
          </div>
        ) : null}
      </header>

      <div className="flex flex-col gap-6 p-6 sm:p-8">
        {project.description ? (
          <p className="max-w-2xl leading-relaxed text-ink-soft">
            {project.description}
          </p>
        ) : null}

        <Timeline milestones={project.milestones} />
      </div>
    </section>
  );
}

export default async function PortalPage({
  params,
}: PageProps<"/portal/[token]">) {
  const { token } = await params;
  const result = await fetchPortal(token);

  // Invalid, expired and revoked all land here, exactly as they do in the API.
  // Which one it was is only useful to someone guessing tokens.
  if (result.state === "not-found") {
    notFound();
  }

  if (result.state === "waking") {
    return (
      <main id="main" className="mx-auto w-full max-w-3xl px-6 py-24">
        <p className="eyebrow">One moment</p>
        <h1 className="mt-5 text-3xl font-semibold tracking-tight">
          Fetching your project
        </h1>
        <p className="mt-4 max-w-prose leading-relaxed text-ink-soft">
          The system is coming back from idle, which takes about a minute.
          Reload the page and everything will be here.
        </p>
        <a
          href={`/portal/${token}`}
          className="mt-8 inline-block rounded-md bg-ink px-6 py-3 text-sm font-medium text-paper transition-opacity hover:opacity-90"
        >
          Reload
        </a>
      </main>
    );
  }

  const { portal } = result;
  const name = portal.client.company ?? portal.client.name;

  return (
    <>
      <header className="border-b border-rule">
        <div className="mx-auto flex h-16 w-full max-w-3xl items-center px-6">
          <span className="text-sm font-semibold tracking-tight">
            Studio<span className="text-ink-faint">Ops</span>
          </span>
        </div>
      </header>

      <main id="main" className="mx-auto w-full max-w-3xl flex-1 px-6">
        <div className="border-b border-rule py-14">
          <p className="eyebrow">Client portal</p>
          <h1 className="mt-5 text-3xl font-semibold tracking-tight sm:text-4xl">
            {name}
          </h1>
          <p className="mt-4 max-w-prose leading-relaxed text-ink-soft">
            Everything we are currently building for you, kept current as the
            work moves. No login, and nothing to chase.
          </p>
        </div>

        {portal.projects.length === 0 ? (
          <div className="my-14 rounded-lg border border-dashed border-rule-strong px-6 py-16 text-center">
            <h2 className="font-medium">Nothing here yet</h2>
            <p className="mx-auto mt-2 max-w-sm text-sm leading-relaxed text-ink-soft">
              Your project has not been set up yet. It will appear here as soon
              as we start, and this link will keep working.
            </p>
          </div>
        ) : (
          <div className="my-14 flex flex-col gap-10">
            {portal.projects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        )}

        <p className="border-t border-rule py-8 text-sm text-ink-faint">
          Something look wrong? Reply to the email this link came from and we
          will fix it.
        </p>
      </main>

      <SiteFooter />
    </>
  );
}
