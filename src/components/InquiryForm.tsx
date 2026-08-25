"use client";

// Client component because it holds form state and renders validation errors
// as they come back. Everything around it on the page stays a Server Component.

import { ArrowRight, Check } from "lucide-react";
import { useActionState, useId } from "react";
import { sendInquiry, type InquiryState } from "@/app/actions";
import { budgetRanges } from "@/lib/schemas/inquiry";

const initial: InquiryState = { status: "idle" };

const field =
  "w-full rounded-md border border-rule bg-raised px-3.5 py-2.5 text-sm text-ink transition-colors placeholder:text-ink-faint hover:border-rule-strong focus:border-accent focus:outline-none";

function FieldError({ id, messages }: { id: string; messages?: string[] }) {
  if (!messages?.length) {
    return null;
  }

  return (
    <p id={id} className="text-sm text-red-600 dark:text-red-400" role="alert">
      {messages[0]}
    </p>
  );
}

export function InquiryForm() {
  const [state, formAction, pending] = useActionState(sendInquiry, initial);
  const uid = useId();

  if (state.status === "success") {
    return (
      <div className="flex max-w-xl flex-col items-start gap-4 rounded-lg border border-rule bg-raised p-8">
        <span className="flex size-9 items-center justify-center rounded-full border border-rule-strong">
          <Check className="size-4" strokeWidth={2} aria-hidden="true" />
        </span>
        <h3 className="text-lg font-medium tracking-tight">That is with us</h3>
        <p className="leading-relaxed text-ink-soft">
          We read every inquiry ourselves and reply within two working days.
          Once the project starts you get a private link to follow it, so you
          will not need to email to ask.
        </p>
      </div>
    );
  }

  return (
    <form
      action={formAction}
      className="flex max-w-xl flex-col gap-6"
      noValidate
    >
      <div className="grid gap-6 sm:grid-cols-2">
        <div className="flex flex-col gap-2">
          <label htmlFor={`${uid}-name`} className="text-sm font-medium">
            Your name
          </label>
          <input
            id={`${uid}-name`}
            name="name"
            required
            autoComplete="name"
            aria-describedby={
              state.errors?.name ? `${uid}-name-error` : undefined
            }
            className={field}
          />
          <FieldError id={`${uid}-name-error`} messages={state.errors?.name} />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor={`${uid}-email`} className="text-sm font-medium">
            Email
          </label>
          <input
            id={`${uid}-email`}
            name="email"
            type="email"
            required
            autoComplete="email"
            aria-describedby={
              state.errors?.email ? `${uid}-email-error` : undefined
            }
            className={field}
          />
          <FieldError
            id={`${uid}-email-error`}
            messages={state.errors?.email}
          />
        </div>
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <div className="flex flex-col gap-2">
          <label htmlFor={`${uid}-company`} className="text-sm font-medium">
            Company <span className="font-normal text-ink-faint">optional</span>
          </label>
          <input
            id={`${uid}-company`}
            name="company"
            autoComplete="organization"
            className={field}
          />
          <FieldError
            id={`${uid}-company-error`}
            messages={state.errors?.company}
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor={`${uid}-budget`} className="text-sm font-medium">
            Budget <span className="font-normal text-ink-faint">optional</span>
          </label>
          <select
            id={`${uid}-budget`}
            name="budgetRange"
            defaultValue=""
            className={field}
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
        <label htmlFor={`${uid}-message`} className="text-sm font-medium">
          What are you trying to do?
        </label>
        <textarea
          id={`${uid}-message`}
          name="message"
          rows={6}
          required
          placeholder="A sentence or two is plenty. What is the work, and when does it need to be done?"
          aria-describedby={
            state.errors?.message ? `${uid}-message-error` : undefined
          }
          className={`${field} resize-y leading-relaxed`}
        />
        <FieldError
          id={`${uid}-message-error`}
          messages={state.errors?.message}
        />
      </div>

      {/*
        Honeypot. Hidden from people, filled in by bots, validated as "present
        and empty" on both sides. aria-hidden and tabIndex keep it away from
        screen readers and keyboard navigation too: a hidden field a blind
        visitor can fill in is a trap for exactly the wrong person.
      */}
      <div className="hidden" aria-hidden="true">
        <label htmlFor={`${uid}-website`}>Leave this empty</label>
        <input
          id={`${uid}-website`}
          name="website"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      <FieldError
        id={`${uid}-website-error`}
        messages={state.errors?.website}
      />

      {state.message ? (
        <p className="text-sm text-red-600 dark:text-red-400" role="alert">
          {state.message}
        </p>
      ) : null}

      <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
        <button
          type="submit"
          disabled={pending}
          className="group inline-flex items-center gap-2 rounded-md bg-ink px-6 py-3 text-sm font-medium text-paper transition-opacity hover:opacity-90 disabled:opacity-50"
        >
          {pending ? "Sending" : "Send inquiry"}
          <ArrowRight
            className="size-4 transition-transform group-hover:translate-x-0.5"
            strokeWidth={1.75}
            aria-hidden="true"
          />
        </button>
        <p className="text-sm text-ink-faint">
          No newsletter, no follow-up sequence.
        </p>
      </div>
    </form>
  );
}
