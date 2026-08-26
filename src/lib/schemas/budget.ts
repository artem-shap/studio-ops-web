/**
 * Kept apart from the schema module on purpose.
 *
 * The form component needs this list to render a select, and nothing else from
 * that file — it does not validate in the browser, because validation belongs
 * to the Server Action. Importing it from the schema module dragged Zod into
 * the client bundle: 283 KB of a validation library shipped to render six
 * options.
 */
export const budgetRanges = [
  "Under $5k",
  "$5k - $15k",
  "$15k - $40k",
  "$40k+",
  "Not sure yet",
] as const;
