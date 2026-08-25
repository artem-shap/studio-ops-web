"use client";

export default function Error({ reset }: { reset: () => void }) {
  // The actual error is logged server-side. A visitor cannot act on a stack
  // trace, and showing one only helps someone mapping the system.
  return (
    <main className="mx-auto flex w-full max-w-4xl flex-col items-start gap-4 px-6 py-24">
      <h1 className="text-2xl font-semibold tracking-tight">
        Something went wrong
      </h1>
      <p className="max-w-prose text-muted">
        That is on us, not you. Try again — and if it keeps happening, email the
        studio directly and we will sort it out.
      </p>
      <button
        type="button"
        onClick={reset}
        className="rounded-md bg-accent px-5 py-2.5 text-sm font-medium text-accent-foreground"
      >
        Try again
      </button>
    </main>
  );
}
