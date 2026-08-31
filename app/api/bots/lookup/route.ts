import { getBotById } from "@/lib/bots";
import { lookupXaiBot, XaiLookupError } from "@/lib/xai";

export const runtime = "nodejs";

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as { link?: unknown };
    if (typeof body.link !== "string" || body.link.length > 500) {
      return Response.json(
        { error: "Paste a public x.ai bot link." },
        { status: 400 },
      );
    }

    const preview = await lookupXaiBot(body.link);
    const existing = getBotById(preview.templateId);

    return Response.json({
      preview,
      existingSlug: existing?.slug ?? null,
    });
  } catch (error) {
    if (error instanceof XaiLookupError) {
      return Response.json({ error: error.message }, { status: error.status });
    }

    return Response.json(
      { error: "We could not inspect that link. Please try again." },
      { status: 500 },
    );
  }
}
