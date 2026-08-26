import Image from "next/image";

/**
 * A photograph when there is one, an abstract composition when there is not.
 *
 * The fallback is drawn in SVG from the site palette rather than left as a
 * broken image or a grey box: a card with nothing in it is worse than a card
 * with something quiet in it. Drop a file into `public/work/` and set `image`
 * on the entry in Work.tsx to switch a card over.
 */

type Variant = "identity" | "commerce" | "product";

export function ProjectVisual({
  variant,
  image,
  alt,
}: {
  variant: Variant;
  image?: string | null;
  alt?: string;
}) {
  return (
    <div className="relative aspect-[11/6] w-full overflow-hidden rounded-lg border border-rule bg-sunken">
      {image ? (
        <Image
          src={image}
          alt={alt ?? ""}
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover"
        />
      ) : (
        <div className="size-full" aria-hidden="true">
          {variant === "identity" ? <Identity /> : null}
          {variant === "commerce" ? <Commerce /> : null}
          {variant === "product" ? <Product /> : null}
        </div>
      )}
    </div>
  );
}

function Identity() {
  return (
    <svg viewBox="0 0 400 300" className="size-full" role="presentation" preserveAspectRatio="xMidYMid slice">
      <circle cx="140" cy="150" r="66" fill="currentColor" className="text-ink" />
      <circle
        cx="228"
        cy="150"
        r="66"
        className="text-ink"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <rect x="60" y="238" width="112" height="8" rx="4" className="fill-current text-rule-strong" />
      <rect x="60" y="256" width="64" height="8" rx="4" className="fill-current text-rule-strong" />
    </svg>
  );
}

function Commerce() {
  return (
    <svg viewBox="0 0 400 300" className="size-full" role="presentation" preserveAspectRatio="xMidYMid slice">
      <rect x="44" y="40" width="140" height="180" rx="8" className="fill-current text-paper" />
      <rect x="60" y="56" width="108" height="88" rx="4" className="fill-current text-rule-strong" />
      <rect x="60" y="158" width="80" height="7" rx="3.5" className="fill-current text-rule-strong" />
      <rect x="60" y="174" width="52" height="7" rx="3.5" className="fill-current text-rule" />
      <rect x="60" y="196" width="64" height="12" rx="6" className="fill-current text-ink" />
      <rect x="216" y="72" width="140" height="180" rx="8" className="fill-current text-paper" />
      <rect x="232" y="88" width="108" height="88" rx="4" className="fill-current text-rule" />
      <rect x="232" y="190" width="80" height="7" rx="3.5" className="fill-current text-rule-strong" />
      <rect x="232" y="206" width="52" height="7" rx="3.5" className="fill-current text-rule" />
    </svg>
  );
}

function Product() {
  return (
    <svg viewBox="0 0 400 300" className="size-full" role="presentation" preserveAspectRatio="xMidYMid slice">
      <rect x="40" y="52" width="320" height="196" rx="10" className="fill-current text-paper" />
      <rect x="40" y="52" width="320" height="30" rx="10" className="fill-current text-rule" />
      <rect x="60" y="102" width="84" height="126" rx="6" className="fill-current text-rule" />
      <rect x="160" y="102" width="180" height="10" rx="5" className="fill-current text-ink" />
      <rect x="160" y="126" width="140" height="8" rx="4" className="fill-current text-rule-strong" />
      <rect x="160" y="148" width="164" height="8" rx="4" className="fill-current text-rule-strong" />
      <rect x="160" y="180" width="52" height="34" rx="6" className="fill-current text-ink" />
      <rect x="224" y="180" width="52" height="34" rx="6" className="fill-current text-rule" />
    </svg>
  );
}
