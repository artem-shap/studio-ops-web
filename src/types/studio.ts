/**
 * The shapes studio-ops-api returns.
 *
 * Hand-written for now. The intended source is an OpenAPI schema generated from
 * the Laravel API Resources; until that is wired up these are maintained by
 * hand, and the file says so rather than pretending otherwise.
 */

export type StatusColor = "slate" | "blue" | "amber" | "emerald" | "rose";

export type Status = {
  value: string;
  label: string;
  color: StatusColor;
};

export type Milestone = {
  id: number;
  title: string;
  due_date: string | null;
  status: Status;
};

export type Project = {
  id: number;
  title: string;
  description: string | null;
  status: Status;
  budget_cents: number | null;
  currency: string;
  start_date: string | null;
  due_date: string | null;
  milestones: Milestone[];
};

export type Portal = {
  client: { name: string; company: string | null };
  projects: Project[];
};
