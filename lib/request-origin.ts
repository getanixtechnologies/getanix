import { site } from "@/data/site";
export function isSameOrigin(request: Request): boolean {
  const origin = request.headers.get("origin");
  if (!origin) return true;
  try {
    const parsed = new URL(origin);
    if (!["http:", "https:"].includes(parsed.protocol)) return false;
    // Next may normalize request.url to its bind address. Host retains the public address.
    return (
      parsed.origin === new URL(site.url).origin ||
      parsed.host === request.headers.get("host")
    );
  } catch {
    return false;
  }
}
