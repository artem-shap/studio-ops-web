export function Wordmark({ className = "" }: { className?: string }) {
  return (
    <span className={`font-semibold tracking-tight ${className}`}>
      Studio<span className="text-ink-faint">Ops</span>
    </span>
  );
}
