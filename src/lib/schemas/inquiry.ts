import { z } from "zod";

/**
 * The one schema for the inquiry form, imported by the client component and by
 * the Server Action. Two schemas for one form drift, and the visitor is the one
 * who finds out: client validation passes, the server rejects it.
 *
 * Every limit here mirrors StoreInquiryRequest in studio-ops-api. A mismatch is
 * a defect, not a preference.
 */
export const inquirySchema = z.object({
  name: z.string().trim().min(1, "Tell us who you are").max(120),
  email: z.email("That email address does not look right").max(255),
  company: z.string().trim().max(160).optional().or(z.literal("")),
  message: z
    .string()
    .trim()
    .min(20, "A sentence or two about the work, so we can reply usefully")
    .max(2000, "Keep it under 2000 characters"),
  budgetRange: z.string().max(40).optional().or(z.literal("")),

  // Hidden from people by CSS, filled in by bots. Must arrive and be empty.
  website: z.literal("", { message: "This submission could not be accepted." }),
});

export type InquiryInput = z.infer<typeof inquirySchema>;

export const budgetRanges = [
  "Under $5k",
  "$5k - $15k",
  "$15k - $40k",
  "$40k+",
  "Not sure yet",
] as const;
