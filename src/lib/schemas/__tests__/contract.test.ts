import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { inquirySchema } from "@/lib/schemas/inquiry";

/**
 * The Zod schema and the Laravel Form Request describe the same form from two
 * sides. When they disagree, the visitor is the one who finds out: the browser
 * accepts their message and the server rejects it.
 *
 * These tests read the generated OpenAPI contract — derived from the Form
 * Request itself — and check the boundaries behaviourally rather than by
 * comparing numbers to numbers. Move a rule in Laravel, run `pnpm types:api`,
 * and this fails until the Zod schema follows.
 */

type Constraint = {
  maxLength?: number;
  minLength?: number;
  format?: string;
};

const contract = JSON.parse(readFileSync("openapi.json", "utf8")) as {
  components: {
    schemas: {
      StoreInquiryRequest: {
        properties: Record<string, Constraint>;
        required: string[];
      };
    };
  };
};

const inquiry = contract.components.schemas.StoreInquiryRequest;

function valid(overrides: Record<string, unknown> = {}) {
  return {
    name: "Dana Whitfield",
    email: "dana@northlightcoffee.com",
    company: "Northlight Coffee",
    message: "a".repeat(120),
    budgetRange: "$15k - $40k",
    website: "",
    ...overrides,
  };
}

describe("the Zod schema matches the published contract", () => {
  it("has a contract to check against", () => {
    expect(Object.keys(inquiry.properties).length).toBeGreaterThan(0);
  });

  it.each([
    ["name", "name"],
    ["email", "email"],
    ["company", "company"],
    ["message", "message"],
    ["budget_range", "budgetRange"],
  ] as const)("agrees on the maximum length of %s", (apiField, zodField) => {
    const max = inquiry.properties[apiField]?.maxLength;

    if (max === undefined) {
      return;
    }

    const atLimit =
      zodField === "email"
        ? `${"a".repeat(max - 20)}@northlightcoffee.com`.slice(0, max)
        : "a".repeat(max);

    expect(
      inquirySchema.safeParse(valid({ [zodField]: atLimit })).success,
      `${zodField} should accept exactly ${max} characters`,
    ).toBe(true);

    expect(
      inquirySchema.safeParse(valid({ [zodField]: `${atLimit}a` })).success,
      `${zodField} should reject ${max + 1} characters`,
    ).toBe(false);
  });

  it("agrees on the minimum length of message", () => {
    const min = inquiry.properties.message?.minLength;
    expect(min).toBeDefined();

    expect(
      inquirySchema.safeParse(valid({ message: "a".repeat(min!) })).success,
    ).toBe(true);
    expect(
      inquirySchema.safeParse(valid({ message: "a".repeat(min! - 1) })).success,
    ).toBe(false);
  });

  it("requires everything the contract requires", () => {
    const map: Record<string, string> = {
      name: "name",
      email: "email",
      message: "message",
      website: "website",
    };

    for (const field of inquiry.required) {
      const zodField = map[field];
      if (!zodField) continue;

      const without = valid();
      delete (without as Record<string, unknown>)[zodField];

      expect(
        inquirySchema.safeParse(without).success,
        `${zodField} is required by the contract`,
      ).toBe(false);
    }
  });
});
