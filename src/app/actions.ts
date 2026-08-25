"use server";

import { headers } from "next/headers";
import { ApiError, submitInquiry } from "@/lib/api/inquiries";
import { inquirySchema } from "@/lib/schemas/inquiry";

export type InquiryState = {
  status: "idle" | "success" | "error";
  errors?: Record<string, string[]>;
  message?: string;
};

/**
 * In-memory rate limiting, per IP.
 *
 * Deliberately modest: it stops a single browser hammering the form, and the
 * real limit lives in Laravel, which is the only place that can enforce one
 * across every instance. A shared store here would be a third moving part for a
 * problem the API already handles.
 */
const WINDOW_MS = 60_000;
const MAX_PER_WINDOW = 5;
const seen = new Map<string, number[]>();

function withinRateLimit(ip: string): boolean {
  const now = Date.now();
  const recent = (seen.get(ip) ?? []).filter((at) => now - at < WINDOW_MS);

  if (recent.length >= MAX_PER_WINDOW) {
    return false;
  }

  seen.set(ip, [...recent, now]);

  return true;
}

export async function sendInquiry(
  _previous: InquiryState,
  formData: FormData,
): Promise<InquiryState> {
  const parsed = inquirySchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    company: formData.get("company") ?? "",
    message: formData.get("message"),
    budgetRange: formData.get("budgetRange") ?? "",
    website: formData.get("website") ?? "",
  });

  if (!parsed.success) {
    return {
      status: "error",
      errors: parsed.error.flatten().fieldErrors as Record<string, string[]>,
    };
  }

  const headerList = await headers();
  const ip =
    headerList.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";

  if (!withinRateLimit(ip)) {
    return {
      status: "error",
      message: "That is a lot of messages. Give it a minute and try again.",
    };
  }

  try {
    await submitInquiry(parsed.data);
  } catch (error) {
    // The upstream reason is logged here and never shown. A visitor cannot act
    // on a 502, and telling them which service failed helps nobody but an
    // attacker mapping the system.
    console.error("Inquiry submission failed", error);

    return {
      status: "error",
      message:
        error instanceof ApiError && error.status === 504
          ? "The studio's system is waking up. Try again in a moment."
          : "Something went wrong sending that. Try again shortly.",
    };
  }

  return { status: "success" };
}
