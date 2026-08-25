import { Check, Circle, CircleDot } from "lucide-react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { StatusBadge } from "@/components/StatusBadge";
import { fetchPortal } from "@/lib/api/portal";
import type { Milestone } from "@/types/studio";

/*
 * Never cached. The portal exists to show a client where their project is right
 * now; a stale render does not fail loudly, it quietly shows last week's status
 * and nobody notices until someone asks about a milestone that finished days
 * ago. `fetch` has been uncached by default since Next 15, but the route-level
 * cache is a separate mechanism and worth being explicit about.
 *
 * `cacheComponents` is not enabled in next.config.ts, so this route segment
 * config still applies. If it is ever turned on, this export stops existing and
 * the landing page opts into caching with `use cache` instead.
 */
export const dynamic = "force-dynamic";

// A link anyone can hold must never reach a search index.
export const metadata: Metadata = {
  robots: { index: false, follow: false },
  title: "Your project",
};

const icons = {
  done: Check,
  in_progress: CircleDot,
  pending: Circle,
} as const;

function MilestoneIcon({ milestone }: { milestone: Milestone }) {
  const Icon =
    icons[milestone.status.value as keyof typeof icons] ?? Circle;

  return (
    <Icon
      className={
        milestone.status.value === "done"
          ? "size-5 shrink-0 text-emerald-600 dark:text-emerald-400"
          : "size-5 shrink-0 text-muted"
      }
      strokeWidth={1.5}
      aria-hidden="true"
    />
  );
}

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

export default async function PortalPage({ params }: PageProps<"/portal/[token]">) {
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
        <h1 className="text-2xl font-semibold tracking-tight">
          Waking the studio&rsquo;s system up
        </h1>
        <p className="mt-3 max-w-prose text-muted">
          This demo runs on free infrastructure that goes to sleep when nobody
          is using it. It takes about a minute to come back. Reload the page and
          it will be here.
        </p>
        <a
          href={`/portal/${token}`}
          className="mt-6 inline-block rounded-md bg-accent px-5 py-2.5 text-sm font-medium text-accent-foreground"
        >
          Reload
        </a>
      </main>
    );
  }

  const portal = result.portal;
  const name = portal.client.company ?? portal.client.name;

  return (
    <main id="main" className="mx-auto w-full max-w-3xl px-6 py-16">
      <header className="flex flex-col gap-2">
        <p className="text-sm font-medium tracking-wide text-accent uppercase">
          StudioOps
        </p>
        <h1 className="text-3xl font-semibold tracking-tight">{name}</h1>
        <p className="text-muted">
          Everything we are currently building for you, kept current as the work
          happens.
        </p>
      </header>

      {portal.projects.length === 0 ? (
        <div className="mt-10 rounded-xl border border-dashed border-border p-10 text-center">
          <h2 className="font-medium">Nothing here yet</h2>
          <p className="mt-2 text-sm text-muted">
            Your project has not been set up yet. It will appear here as soon as
            we start, and this link will keep working.
          </p>
        </div>
      ) : (
        <div className="mt-10 flex flex-col gap-10">
          {portal.projects.map((project) => (
            <section
              key={project.id}
              aria-labelledby={`project-${project.id}`}
              className="flex flex-col gap-5 rounded-xl border border-border bg-surface p-6"
            >
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div className="flex flex-col gap-1">
                  <h2
                    id={`project-${project.id}`}
                    className="text-lg font-medium"
                  >
                    {project.title}
                  </h2>
                  <p className="text-sm text-muted">
                    Due {formatDate(project.due_date)}
                  </p>
                </div>
                <StatusBadge status={project.status} />
              </div>

              {project.description ? (
                <p className="text-sm text-muted">{project.description}</p>
              ) : null}

              {project.milestones.length === 0 ? (
                <p className="text-sm text-muted">
                  Milestones are being planned and will show up here shortly.
                </p>
              ) : (
                <ol className="flex flex-col gap-4">
                  {project.milestones.map((milestone) => (
                    <li key={milestone.id} className="flex items-start gap-3">
                      <MilestoneIcon milestone={milestone} />
                      <div className="flex flex-1 flex-col gap-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="text-sm font-medium">
                            {milestone.title}
                          </span>
                          <StatusBadge status={milestone.status} />
                        </div>
                        <span className="text-xs text-muted">
                          {formatDate(milestone.due_date)}
                        </span>
                      </div>
                    </li>
                  ))}
                </ol>
              )}
            </section>
          ))}
        </div>
      )}

      <footer className="mt-12 border-t border-border pt-6 text-sm text-muted">
        <p>
          Something look wrong? Reply to the email this link came from and we
          will fix it.
        </p>
      </footer>
    </main>
  );
}
