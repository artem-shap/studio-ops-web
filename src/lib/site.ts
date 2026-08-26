/**
 * The canonical origin, resolved once.
 *
 * Vercel exposes the production domain at build time, which keeps preview
 * deployments from advertising themselves as canonical. The fallback is only
 * for local development, where absolute URLs do not matter.
 */
const fromVercel = process.env.VERCEL_PROJECT_PRODUCTION_URL;

export const siteUrl = fromVercel
  ? `https://${fromVercel}`
  : "http://localhost:3000";

export const siteName = "StudioOps";

export const siteDescription =
  "A design and development studio. Brand, websites and internal tools, handed over properly — and every client sees their own project as it moves.";
