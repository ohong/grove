const TEMPLATE_ID_PATTERN = /^[A-Za-z0-9_-]{10,64}$/;

export type XaiBotPreview = {
  templateId: string;
  name: string;
  creator: string;
  description: string;
  sourceUrl: string;
};

export class XaiLookupError extends Error {
  status: number;

  constructor(message: string, status = 400) {
    super(message);
    this.name = "XaiLookupError";
    this.status = status;
  }
}

function decodeHtml(value: string) {
  return value
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#x27;|&#39;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&#(\d+);/g, (_, code: string) =>
      String.fromCodePoint(Number(code)),
    )
    .trim();
}

function extractTag(html: string, expression: RegExp) {
  const match = html.match(expression);
  return match?.[1] ? decodeHtml(match[1]) : "";
}

export function normalizeXaiBotUrl(input: string) {
  let parsed: URL;

  try {
    parsed = new URL(input.trim());
  } catch {
    throw new XaiLookupError("Paste a complete x.ai/bot link.");
  }

  if (parsed.protocol !== "https:") {
    throw new XaiLookupError("The bot link must use https.");
  }

  if (parsed.hostname !== "x.ai" && parsed.hostname !== "www.x.ai") {
    throw new XaiLookupError("Only public x.ai bot links can be submitted.");
  }

  const parts = parsed.pathname.split("/").filter(Boolean);
  if (parts.length !== 2 || parts[0] !== "bot") {
    throw new XaiLookupError("Use a public link in the form x.ai/bot/{id}.");
  }

  const templateId = parts[1];
  if (!TEMPLATE_ID_PATTERN.test(templateId)) {
    throw new XaiLookupError("That template ID does not look valid.");
  }

  return {
    templateId,
    sourceUrl: `https://x.ai/bot/${templateId}`,
  };
}

export function parseXaiPreview(
  html: string,
  sourceUrl: string,
  templateId: string,
): XaiBotPreview {
  const title = extractTag(html, /<title>([^<]+)<\/title>/i);
  const description =
    extractTag(
      html,
      /<meta\s+name="description"\s+content="([^"]*)"[^>]*>/i,
    ) ||
    extractTag(
      html,
      /<meta\s+property="og:description"\s+content="([^"]*)"[^>]*>/i,
    );

  if (
    !title ||
    !description ||
    title.toLowerCase().includes("could not be found")
  ) {
    throw new XaiLookupError(
      "We could not read a public preview from that link. Check that sharing is enabled.",
      404,
    );
  }

  const byIndex = title.lastIndexOf(" by ");
  const name = byIndex > 0 ? title.slice(0, byIndex).trim() : title.trim();
  const creator = byIndex > 0 ? title.slice(byIndex + 4).trim() : "x.ai creator";

  return {
    templateId,
    name,
    creator,
    description,
    sourceUrl,
  };
}

export async function lookupXaiBot(input: string): Promise<XaiBotPreview> {
  const { templateId, sourceUrl } = normalizeXaiBotUrl(input);
  let response: Response;

  try {
    response = await fetch(sourceUrl, {
      cache: "no-store",
      headers: {
        Accept: "text/html,application/xhtml+xml",
        "User-Agent": "GroveBotDirectory/1.0 (+public preview lookup)",
      },
      signal: AbortSignal.timeout(10_000),
    });
  } catch {
    throw new XaiLookupError(
      "x.ai did not respond in time. Please try that link again.",
      504,
    );
  }

  if (response.status === 404) {
    throw new XaiLookupError(
      "That template could not be found. It may be private, expired, or deleted.",
      404,
    );
  }

  if (!response.ok) {
    throw new XaiLookupError(
      "x.ai is not returning that preview right now. Please try again shortly.",
      502,
    );
  }

  const contentLength = Number(response.headers.get("content-length") ?? 0);
  if (contentLength > 1_000_000) {
    throw new XaiLookupError("That preview is unexpectedly large.", 502);
  }

  const html = await response.text();
  return parseXaiPreview(html, sourceUrl, templateId);
}
