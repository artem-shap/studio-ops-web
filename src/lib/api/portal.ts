import "server-only";

import { ApiError, callApi } from "@/lib/api/client";
import type { Portal } from "@/types/studio";

/**
 * Resolves a portal token to the client's projects, or null.
 *
 * The API answers invalid, expired and revoked tokens identically, and so does
 * this: the page shows one 404 for all three. Which of them it was is
 * information worth having only to someone guessing tokens.
 */
export type PortalResult =
  | { state: "found"; portal: Portal }
  | { state: "not-found" }
  | { state: "waking" };

export async function fetchPortal(token: string): Promise<PortalResult> {
  try {
    const payload = await callApi<{ data: Portal }>(
      `/api/portal/${encodeURIComponent(token)}`,
    );

    return { state: "found", portal: payload.data };
  } catch (error) {
    if (error instanceof ApiError && error.status === 404) {
      return { state: "not-found" };
    }

    // A timeout here is the expected shape of a free-tier container waking up,
    // not a fault. It gets its own state so the page can say something true
    // rather than falling through to the generic error boundary.
    // 504 is a timeout waking the container; 502 is the API not answering as
    // itself. Neither is the visitor's fault and neither means their link is
    // bad, so both get the honest message instead of a 404.
    if (
      error instanceof ApiError &&
      (error.status === 504 || error.status === 502)
    ) {
      return { state: "waking" };
    }

    throw error;
  }
}
