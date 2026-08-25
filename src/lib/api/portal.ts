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
export async function fetchPortal(token: string): Promise<Portal | null> {
  try {
    const payload = await callApi<{ data: Portal }>(
      `/api/portal/${encodeURIComponent(token)}`,
    );

    return payload.data;
  } catch (error) {
    if (error instanceof ApiError && error.status === 404) {
      return null;
    }

    throw error;
  }
}
