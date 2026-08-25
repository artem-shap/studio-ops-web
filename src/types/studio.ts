/**
 * Domain types, taken from the generated API contract rather than restated.
 *
 * `api.ts` is produced by `pnpm types:api` from the OpenAPI document that
 * Scramble derives from the Laravel controllers, Form Requests and API
 * Resources. These aliases exist so the rest of the application reads
 * `Project` instead of `components["schemas"]["ProjectResource"]`, and so the
 * one place that knows about the wire format is this file.
 *
 * If the API changes shape, regenerating `api.ts` breaks compilation here
 * rather than producing undefined at runtime.
 */

import type { components } from "@/types/api";

export type Milestone = components["schemas"]["MilestoneResource"];
export type Project = components["schemas"]["ProjectResource"];
export type PortalPayload = components["schemas"]["PortalResource"];

/**
 * The contract marks `projects` and `milestones` optional, because an API
 * Resource only includes a relation when it was loaded. The portal endpoint
 * loads both every time, so the pages narrow them to present here rather than
 * guarding at every use.
 */
export type ProjectWithMilestones = Omit<Project, "milestones"> & {
  milestones: Milestone[];
};

export type Portal = Omit<PortalPayload, "projects"> & {
  projects: ProjectWithMilestones[];
};

/**
 * Statuses arrive with their label and colour already resolved by the PHP
 * enum. Nothing here re-derives them; a second status-to-colour map is the
 * exact thing this shape exists to prevent.
 */
export type Status = Project["status"] | Milestone["status"];

export type StatusColor = Status["color"];
