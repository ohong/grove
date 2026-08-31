import { getBotById } from "@/lib/bots";
import { recordBotSubmission } from "@/lib/store";
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
    if (existing) {
      return Response.json(
        {
          error: "That bot is already in Grove.",
          existingSlug: existing.slug,
        },
        { status: 409 },
      );
    }

    const submissionId = await recordBotSubmission(preview);
    return Response.json({ submissionId }, { status: 201 });
  } catch (error) {
    if (error instanceof XaiLookupError) {
      return Response.json({ error: error.message }, { status: error.status });
    }

    return Response.json(
      {
        error:
          "We could not save this submission. Check the server’s persistent data directory and try again.",
      },
      { status: 503 },
    );
  }
}
