import type { NextConfig } from "next";

/**
 * Content-Security-Policy.
 *
 * Nonces are the stronger form, and they are deliberately not used here: a
 * per-request nonce has to be injected by middleware, which forces every page
 * to render dynamically. The landing page is static on purpose — it is what
 * keeps the site working while the API is asleep — and trading that away for a
 * marginally tighter script policy would be the wrong side of the deal.
 *
 * So the policy is tight everywhere it can be. There are no third-party
 * scripts, no analytics and no external fonts (next/font self-hosts at build
 * time), so nothing needs allowing beyond this origin. `unsafe-inline` on
 * scripts covers Next's own bootstrap and is the one concession; everything
 * that limits the damage of an injection — frame-ancestors, object-src,
 * base-uri, form-action — is locked down.
 */
const csp = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline'",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob:",
  "font-src 'self' data:",
  "connect-src 'self'",
  "form-action 'self'",
  "frame-ancestors 'none'",
  "base-uri 'self'",
  "object-src 'none'",
  "manifest-src 'self'",
  "upgrade-insecure-requests",
].join("; ");

const securityHeaders = [
  { key: "Content-Security-Policy", value: csp },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), interest-cohort=()",
  },
  { key: "X-DNS-Prefetch-Control", value: "on" },
  {
    key: "Cross-Origin-Opener-Policy",
    value: "same-origin",
  },
];

const nextConfig: NextConfig = {
  // Nothing needs to know which framework served the page.
  poweredByHeader: false,


  async headers() {
    return [
      {
        source: "/:path*",
        headers: securityHeaders,
      },
      {
        // The portal is reachable by anyone holding the link, so it must never
        // reach an index, and the token must never travel in a Referer header
        // to anything the client clicks through to.
        source: "/portal/:path*",
        headers: [
          { key: "X-Robots-Tag", value: "noindex, nofollow" },
          { key: "Referrer-Policy", value: "no-referrer" },
          { key: "Cache-Control", value: "private, no-store, max-age=0" },
        ],
      },
    ];
  },
};

export default nextConfig;
