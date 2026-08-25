"use client";

// Client component because it holds form state and renders validation errors
// as they come back. Everything around it on the page stays a Server Component.

import { CheckCircle2 } from "lucide-react";
import { useActionState } from "react";
import { sendInquiry, type InquiryState } from "@/app/actions";
import { budgetRanges } from "@/lib/schemas/inquiry";

const initial: InquiryState = { status: "idle" };

function FieldError({ messages }: { messages?: string[] }) {
  if (!messages?.length) {
    return null;
  }

  return (
    <p className="text-sm text-red-600 dark:text-red-400" role="alert">
      {messages[0]}
    </p>
  );
}

export function InquiryForm() {
  const [state, formAction, pending] = useActionState(sendInquiry, initial);

  if (state.status === "success") {
    return (
      <div className="flex flex-col items-start gap-3 rounded-xl border border-border bg-surface p-6">
        <CheckCircle2
          className="size-6 text-accent"
          strokeWidth={1.5}
          aria-hidden="true"
        />
        <h3 className="text-lg font-medium">That is with us</h3>
        <p className="text-muted">
          We read every inquiry ourselves and reply within two working days.
          Once the project starts you get a link to follow it without emailing
          to ask.
        </p>
      </div>
    );
  }

  return (
    <form action={formAction} className="flex flex-col gap-5" noValidate>
      <div className="grid gap-5 sm:grid-cols-2">
        <div className="flex flex-col gap-2">
          <label htmlFor="name" className="text-sm font-medium">
            Your name
          </label>
          <input
            id="name"
            name="name"
            required
            autoComplete="name"
            className="rounded-md border border-border bg-background px-3 py-2 text-sm"
          />
          <FieldError messages={state.errors?.name} />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="email" className="text-sm font-medium">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            autoComplete="email"
            className="rounded-md border border-border bg-background px-3 py-2 text-sm"
          />
          <FieldError messages={state.errors?.email} />
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div className="flex flex-col gap-2">
          <label htmlFor="company" className="text-sm font-medium">
            Company <span className="text-muted">(optional)</span>
          </label>
          <input
            id="company"
            name="company"
            autoComplete="organization"
            className="rounded-md border border-border bg-background px-3 py-2 text-sm"
          />
          <FieldError messages={state.errors?.company} />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="budgetRange" className="text-sm font-medium">
            Budget <span className="text-muted">(optional)</span>
          </label>
          <select
            id="budgetRange"
            name="budgetRange"
            defaultValue=""
            className="rounded-md border border-border bg-background px-3 py-2 text-sm"
          >
            <option value="">Prefer not to say</option>
            {budgetRanges.map((range) => (
              <option key={range} value={range}>
                {range}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="message" className="text-sm font-medium">
          What are you trying to do?
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          required
          placeholder="A sentence or two is plenty. What is the work, and what is the deadline?"
          className="rounded-md border border-border bg-background px-3 py-2 text-sm"
        />
        <FieldError messages={state.errors?.message} />
      </div>

      {/*
        Honeypot. Hidden from people, filled in by bots, and validated as
        "present and empty" on both sides. aria-hidden and tabIndex keep it
        away from screen readers and keyboard navigation too — a hidden field
        a blind visitor can fill in is a trap for the wrong person.
      */}
      <div className="hidden" aria-hidden="true">
        <label htmlFor="website">Leave this empty</label>
        <input id="website" name="website" tabIndex={-1} autoComplete="off" />
      </div>

      <FieldError messages={state.errors?.website} />

      {state.message ? (
        <p className="text-sm text-red-600 dark:text-red-400" role="alert">
          {state.message}
        </p>
      ) : null}

      <button
        type="submit"
        disabled={pending}
        className="self-start rounded-md bg-accent px-5 py-2.5 text-sm font-medium text-accent-foreground disabled:opacity-60"
      >
        {pending ? "Sending…" : "Send inquiry"}
      </button>
    </form>
  );
}
