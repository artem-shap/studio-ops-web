"use client";

// Client component because it holds form state and renders validation errors
// as they come back. Everything around it on the page stays a Server Component.

import { ArrowRight, Check } from "lucide-react";
import { useActionState, useId } from "react";
import { sendInquiry, type InquiryState } from "@/app/actions";
import { budgetRanges } from "@/lib/schemas/inquiry";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const initial: InquiryState = { status: "idle" };

function FieldError({ id, messages }: { id: string; messages?: string[] }) {
  if (!messages?.length) {
    return null;
  }

  return (
    <p id={id} className="text-sm text-destructive" role="alert">
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
        <span className="flex size-10 items-center justify-center rounded-full border border-rule-strong bg-paper">
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
      className="flex max-w-xl flex-col gap-6 rounded-lg border border-rule bg-raised p-8"
      noValidate
    >
      <div className="grid gap-6 sm:grid-cols-2">
        <div className="flex flex-col gap-2">
          <Label htmlFor={`${uid}-name`}>Your name</Label>
          <Input
            id={`${uid}-name`}
            name="name"
            required
            autoComplete="name"
            aria-describedby={
              state.errors?.name ? `${uid}-name-error` : undefined
            }
            aria-invalid={state.errors?.name ? true : undefined}
          />
          <FieldError id={`${uid}-name-error`} messages={state.errors?.name} />
        </div>

        <div className="flex flex-col gap-2">
          <Label htmlFor={`${uid}-email`}>Email</Label>
          <Input
            id={`${uid}-email`}
            name="email"
            type="email"
            required
            autoComplete="email"
            aria-describedby={
              state.errors?.email ? `${uid}-email-error` : undefined
            }
            aria-invalid={state.errors?.email ? true : undefined}
          />
          <FieldError
            id={`${uid}-email-error`}
            messages={state.errors?.email}
          />
        </div>
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <div className="flex flex-col gap-2">
          <Label htmlFor={`${uid}-company`}>
            Company <span className="font-normal text-ink-faint">optional</span>
          </Label>
          <Input
            id={`${uid}-company`}
            name="company"
            autoComplete="organization"
          />
          <FieldError
            id={`${uid}-company-error`}
            messages={state.errors?.company}
          />
        </div>

        <div className="flex flex-col gap-2">
          <Label htmlFor={`${uid}-budget`}>
            Budget <span className="font-normal text-ink-faint">optional</span>
          </Label>
          {/*
            A native select on purpose. The styled one is a listbox that keeps
            its value in React state, and this form is submitted natively as
            FormData by a Server Action — so a component that does not put a
            value in the form is a component that silently drops the field.
          */}
          <select
            id={`${uid}-budget`}
            name="budgetRange"
            defaultValue=""
            className="h-9 w-full rounded-lg border border-input bg-background px-3 text-sm shadow-xs transition-colors hover:border-rule-strong focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none"
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
        <Label htmlFor={`${uid}-message`}>What are you trying to do?</Label>
        <Textarea
          id={`${uid}-message`}
          name="message"
          rows={6}
          required
          placeholder="A sentence or two is plenty. What is the work, and when does it need to be done?"
          aria-describedby={
            state.errors?.message ? `${uid}-message-error` : undefined
          }
          aria-invalid={state.errors?.message ? true : undefined}
          className="leading-relaxed"
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
        <p className="text-sm text-destructive" role="alert">
          {state.message}
        </p>
      ) : null}

      <div className="flex flex-wrap items-center gap-x-6 gap-y-3 border-t border-rule pt-6">
        <Button
          type="submit"
          disabled={pending}
          className="group h-11 gap-2 px-6 text-sm"
        >
          {pending ? "Sending" : "Send inquiry"}
          <ArrowRight
            className="transition-transform group-hover:translate-x-0.5"
            strokeWidth={1.75}
            aria-hidden="true"
          />
        </Button>
        <p className="text-sm text-ink-faint">
          No newsletter, no follow-up sequence.
        </p>
      </div>
    </form>
  );
}
