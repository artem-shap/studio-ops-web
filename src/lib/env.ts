import { z } from "zod";

/**
 * Server-side environment, validated once at module load.
 *
 * Neither variable carries a NEXT_PUBLIC_ prefix and neither ever should: the
 * browser never talks to the API directly, so the key has no reason to leave
 * the server. A missing value fails here, at boot, instead of surfacing as a
 * confusing 401 on someone's first form submission.
 */
const schema = z.object({
  STUDIO_API_URL: z.url(),
  STUDIO_API_KEY: z.string().min(1, "STUDIO_API_KEY is required"),
});

const parsed = schema.safeParse({
  STUDIO_API_URL: process.env.STUDIO_API_URL,
  STUDIO_API_KEY: process.env.STUDIO_API_KEY,
});

if (!parsed.success) {
  throw new Error(
    `Invalid server environment:\n${z.prettifyError(parsed.error)}`,
  );
}

export const env = parsed.data;
