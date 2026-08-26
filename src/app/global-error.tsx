"use client";

/**
 * The last resort: an error thrown in the root layout itself, where the normal
 * error boundary has no shell left to render into. It has to bring its own
 * html and body.
 */
export default function GlobalError({ reset }: { reset: () => void }) {
  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#141518",
          color: "#f5f4f2",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        <main style={{ padding: "2rem", maxWidth: "34rem" }}>
          <h1 style={{ fontSize: "1.75rem", fontWeight: 600, margin: 0 }}>
            That one is on us
          </h1>
          <p style={{ color: "#8d8f95", lineHeight: 1.6 }}>
            Something failed before the page could load. Try again — and if it
            keeps happening, email us directly and we will sort it out.
          </p>
          <button
            type="button"
            onClick={reset}
            style={{
              marginTop: "1.5rem",
              padding: "0.75rem 1.5rem",
              borderRadius: "0.5rem",
              border: "none",
              background: "#f5f4f2",
              color: "#141518",
              fontSize: "0.875rem",
              fontWeight: 500,
              cursor: "pointer",
            }}
          >
            Try again
          </button>
        </main>
      </body>
    </html>
  );
}
