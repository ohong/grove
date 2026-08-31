export const siteName = "Grove";

export const siteDescription =
  "A directory of public Grok Bot templates. Search by job, or submit one by pasting its x.ai link.";

export function getSiteUrl() {
  const configured = process.env.NEXT_PUBLIC_SITE_URL;

  try {
    return new URL(configured ?? "http://localhost:3000");
  } catch {
    return new URL("http://localhost:3000");
  }
}
