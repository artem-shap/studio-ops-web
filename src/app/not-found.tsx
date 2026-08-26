import Link from "next/link";
import { SiteFooter } from "@/components/site/SiteFooter";

export default function NotFound() {
  return (
    <>
      <main id="main" className="site-x mx-auto w-full max-w-4xl flex-1 py-24">
        <p className="eyebrow">Nothing here</p>
        <h1 className="mt-5 text-3xl font-semibold tracking-tight">
          There is nothing at this address
        </h1>
        <p className="mt-4 max-w-prose leading-relaxed text-ink-soft">
          If you followed a project link from an email, it may have expired —
          they are valid for ninety days. Ask us for a fresh one and we will
          send it straight over.
        </p>
        <Link
          href="/"
          className="mt-8 inline-block rounded-md bg-ink px-6 py-3 text-sm font-medium text-paper transition-opacity hover:opacity-90"
        >
          Back to the studio
        </Link>
      </main>
      <SiteFooter />
    </>
  );
}
