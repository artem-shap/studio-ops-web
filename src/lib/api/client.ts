import { env } from "@/lib/env";

/**
 * Every call to studio-ops-api goes through here, server-side only.
 *
 * The API is hosted on a free tier that suspends after fifteen idle minutes, so
 * the first request after a quiet spell spends most of a minute waiting for a
 * container to wake. A default fetch timeout would give up long before that and
 * report an outage that is not happening.
 */
const WAKE_TIMEOUT_MS = 60_000;

export class ApiError extends Error {
  constructor(
    message: string,
    readonly status: number,
  ) {
    super(message);
    this.name = "ApiError";
  }
}

type RequestOptions = {
  method?: "GET" | "POST";
  body?: unknown;
};

export async function callApi<T>(
  path: string,
  options: RequestOptions = {},
): Promise<T> {
  const attempt = async (): Promise<Response> =>
    fetch(`${env.STUDIO_API_URL}${path}`, {
      method: options.method ?? "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "X-Studio-Key": env.STUDIO_API_KEY,
      },
      body: options.body === undefined ? undefined : JSON.stringify(options.body),

      // Live data only. The portal shows project status, and a cached portal
      // page does not fail loudly — it shows last week's status to a client.
      cache: "no-store",
      signal: AbortSignal.timeout(WAKE_TIMEOUT_MS),
    });

  let response: Response;

  try {
    response = await attempt();

    // One retry, for the case where the container woke up mid-request.
    if (response.status === 502 || response.status === 503) {
      response = await attempt();
    }
  } catch {
    throw new ApiError("The studio API did not respond in time.", 504);
  }

  // A status alone is not enough to trust. Infrastructure in front of the API
  // answers with its own pages — a platform's "no such service" is a 404 with
  // an HTML body, and reading that as "this token does not exist" would tell a
  // client their link is invalid when the truth is that the API is missing.
  // Our API always answers JSON, so anything else did not come from it.
  const isJson = response.headers
    .get("content-type")
    ?.includes("application/json");

  if (!isJson) {
    throw new ApiError(
      `Non-JSON response with status ${response.status}: the API is unreachable`,
      502,
    );
  }

  if (!response.ok) {
    throw new ApiError(`Request failed with status ${response.status}`, response.status);
  }

  return (await response.json()) as T;
}
