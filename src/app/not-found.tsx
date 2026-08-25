import Link from "next/link";

export default function NotFound() {
  return (
    <main className="mx-auto flex w-full max-w-4xl flex-col items-start gap-4 px-6 py-24">
      <h1 className="text-2xl font-semibold tracking-tight">
        There is nothing at this address
      </h1>
      <p className="max-w-prose text-muted">
        If you followed a project link from an email, it may have expired — they
        are valid for ninety days. Ask the studio for a fresh one.
      </p>
      <Link href="/" className="text-accent underline underline-offset-4">
        Back to the studio
      </Link>
    </main>
  );
}
