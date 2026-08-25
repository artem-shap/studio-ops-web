import "server-only";

import { ApiError, callApi } from "@/lib/api/client";
import type { InquiryInput } from "@/lib/schemas/inquiry";

/**
 * Submits an inquiry. Server-side only — the browser never holds the API key.
 */
export async function submitInquiry(input: InquiryInput): Promise<void> {
  await callApi<{ id: number }>("/api/inquiries", {
    method: "POST",
    body: {
      name: input.name,
      email: input.email,
      company: input.company || null,
      message: input.message,
      budget_range: input.budgetRange || null,
      website: "",
    },
  });
}

export { ApiError };
