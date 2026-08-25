import type { NextConfig } from "next";

/**
 * Applied to every response. A Content-Security-Policy is deliberately absent
 * for now: a strict one needs a nonce threaded through middleware and has to be
 * verified against real pages, and a policy written against pages that do not
 * exist yet is a guess that fails as a white screen after deploying. It lands
 * with the landing page and the portal.
 */
const securityHeaders = [
  { key: "X-Frame-Options", value: "DENY" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=()",
  },
];

const nextConfig: NextConfig = {
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
        ],
      },
    ];
  },
};

export default nextConfig;
