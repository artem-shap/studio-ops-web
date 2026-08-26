"use client";

export default function Error({ reset }: { reset: () => void }) {
  // The actual error is logged server-side. A visitor cannot act on a stack
  // trace, and showing one only helps someone mapping the system.
  return (
    <main id="main" className="site-x mx-auto w-full max-w-4xl flex-1 py-24">
      <p className="eyebrow">Something broke</p>
      <h1 className="mt-5 text-3xl font-semibold tracking-tight">
        That one is on us
      </h1>
      <p className="mt-4 max-w-prose leading-relaxed text-ink-soft">
        Try again — it usually works the second time. If it keeps happening,
        email us directly and we will sort it out.
      </p>
      <button
        type="button"
        onClick={reset}
        className="mt-8 rounded-md bg-ink px-6 py-3 text-sm font-medium text-paper transition-opacity hover:opacity-90"
      >
        Try again
      </button>
    </main>
  );
}
