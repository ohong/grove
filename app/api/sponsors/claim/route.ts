import { getSponsorSlot } from "@/lib/sponsors";
import { recordSponsorIntent } from "@/lib/store";

export const runtime = "nodejs";

function isEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) && value.length <= 254;
}

function normalizeBrandUrl(value: string) {
  try {
    const url = new URL(value);
    if (
      !["http:", "https:"].includes(url.protocol) ||
      url.username ||
      url.password
    ) {
      return null;
    }
    return url.toString();
  } catch {
    return null;
  }
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as {
      brand?: unknown;
      url?: unknown;
      email?: unknown;
      slot?: unknown;
      company?: unknown;
    };

    // Quietly discard automated form fills without creating a record.
    if (typeof body.company === "string" && body.company) {
      return Response.json({ intentId: crypto.randomUUID() }, { status: 201 });
    }

    const brand = typeof body.brand === "string" ? body.brand.trim() : "";
    const email = typeof body.email === "string" ? body.email.trim() : "";
    const url =
      typeof body.url === "string" ? normalizeBrandUrl(body.url.trim()) : null;
    const slotNumber =
      typeof body.slot === "number" ? body.slot : Number(body.slot);
    const slot = getSponsorSlot(slotNumber);

    if (brand.length < 2 || brand.length > 80) {
      return Response.json(
        { error: "Enter a brand name between 2 and 80 characters." },
        { status: 400 },
      );
    }
    if (!url) {
      return Response.json(
        { error: "Enter a valid public brand URL." },
        { status: 400 },
      );
    }
    if (!isEmail(email)) {
      return Response.json(
        { error: "Enter a valid contact email." },
        { status: 400 },
      );
    }
    if (!slot || slot.status !== "open") {
      return Response.json(
        { error: "Choose one of the available sponsor slots." },
        { status: 400 },
      );
    }

    const intentId = await recordSponsorIntent({
      brand,
      url,
      email,
      slot: slot.slot,
      price: slot.price,
    });

    return Response.json({ intentId }, { status: 201 });
  } catch {
    return Response.json(
      {
        error:
          "We could not record this request. Check the server’s persistent data directory and try again.",
      },
      { status: 503 },
    );
  }
}
