import { describe, expect, it } from "vitest";
import { inquirySchema } from "@/lib/schemas/inquiry";

const valid = {
  name: "Dana Whitfield",
  email: "dana@northlightcoffee.com",
  company: "Northlight Coffee",
  message:
    "We are opening a second location in the spring and the booking flow cannot handle two sets of hours.",
  budgetRange: "$15k - $40k",
  website: "",
};

describe("inquirySchema", () => {
  it("accepts a complete submission", () => {
    expect(inquirySchema.safeParse(valid).success).toBe(true);
  });

  it("accepts one without the optional fields", () => {
    const result = inquirySchema.safeParse({
      ...valid,
      company: "",
      budgetRange: "",
    });

    expect(result.success).toBe(true);
  });

  it("rejects an empty email", () => {
    expect(inquirySchema.safeParse({ ...valid, email: "" }).success).toBe(
      false,
    );
  });

  it("rejects a malformed email", () => {
    expect(
      inquirySchema.safeParse({ ...valid, email: "not-an-address" }).success,
    ).toBe(false);
  });

  it("rejects a message too short to act on", () => {
    expect(inquirySchema.safeParse({ ...valid, message: "hi" }).success).toBe(
      false,
    );
  });

  // 2000 characters, matching StoreInquiryRequest in studio-ops-api. If these
  // two ever disagree, a visitor passes here and fails on the server.
  it("rejects an over-long message", () => {
    expect(
      inquirySchema.safeParse({ ...valid, message: "a".repeat(2001) }).success,
    ).toBe(false);
  });

  it("accepts a message at exactly the server's limit", () => {
    expect(
      inquirySchema.safeParse({ ...valid, message: "a".repeat(2000) }).success,
    ).toBe(true);
  });

  it("rejects a filled honeypot", () => {
    expect(
      inquirySchema.safeParse({ ...valid, website: "http://spam.example" })
        .success,
    ).toBe(false);
  });
});
