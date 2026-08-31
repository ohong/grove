import { getBotBySlug } from "@/lib/bots";
import { getBotStats, recordBotEvent } from "@/lib/store";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const VISITOR_PATTERN = /^[A-Za-z0-9-]{10,80}$/;

export async function GET(
  request: Request,
  { params }: { params: Promise<{ slug: string }> },
) {
  const { slug } = await params;
  if (!getBotBySlug(slug)) {
    return Response.json({ error: "Bot not found." }, { status: 404 });
  }

  const visitorId = new URL(request.url).searchParams.get("visitor") ?? undefined;
  const safeVisitor =
    visitorId && VISITOR_PATTERN.test(visitorId) ? visitorId : undefined;
  const stats = await getBotStats(slug, safeVisitor);

  return Response.json(stats, {
    headers: { "Cache-Control": "no-store" },
  });
}

export async function POST(
  request: Request,
  { params }: { params: Promise<{ slug: string }> },
) {
  const { slug } = await params;
  if (!getBotBySlug(slug)) {
    return Response.json({ error: "Bot not found." }, { status: 404 });
  }

  try {
    const body = (await request.json()) as {
      action?: unknown;
      visitorId?: unknown;
      liked?: unknown;
    };

    if (body.action === "add") {
      await recordBotEvent({ slug, action: "add" });
      return Response.json(await getBotStats(slug), { status: 201 });
    }

    if (
      body.action === "like" &&
      typeof body.visitorId === "string" &&
      VISITOR_PATTERN.test(body.visitorId) &&
      typeof body.liked === "boolean"
    ) {
      await recordBotEvent({
        slug,
        action: "like",
        visitorId: body.visitorId,
        liked: body.liked,
      });
      return Response.json(await getBotStats(slug, body.visitorId), {
        status: 201,
      });
    }

    return Response.json({ error: "Invalid interaction." }, { status: 400 });
  } catch {
    return Response.json(
      { error: "This interaction could not be recorded." },
      { status: 503 },
    );
  }
}
