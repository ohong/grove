import { ImageResponse } from "next/og";
import { notFound } from "next/navigation";

import { getBotBySlug } from "@/lib/bots";

export const alt = "A Grok Bot listed on Grove";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const bot = getBotBySlug(slug);
  if (!bot) notFound();

  const initial = bot.name.trim().charAt(0).toUpperCase() || "G";

  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        background: "#fafaf8",
        color: "#1c1c16",
        fontFamily: "Arial, sans-serif",
        padding: "64px 72px",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          width: "100%",
          border: "1px solid #e4e4dc",
          borderRadius: 8,
          padding: "48px 52px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <div
            style={{
              width: 36,
              height: 36,
              borderRadius: 6,
              background: "#1c1c16",
              color: "#fafaf8",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 18,
              fontWeight: 600,
            }}
          >
            G
          </div>
          <div style={{ display: "flex", fontSize: 26, fontWeight: 600 }}>Grove</div>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 28 }}>
          <div
            style={{
              width: 88,
              height: 88,
              borderRadius: 8,
              background: "#eeeee6",
              border: "1px solid #e4e4dc",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 36,
              fontWeight: 600,
            }}
          >
            {initial}
          </div>
          <div style={{ display: "flex", flexDirection: "column", maxWidth: 860 }}>
            <div
              style={{
                display: "flex",
                fontSize: 64,
                lineHeight: 1.05,
                letterSpacing: -1.5,
                fontWeight: 600,
              }}
            >
              {bot.name}
            </div>
            <div style={{ display: "flex", marginTop: 12, fontSize: 24, color: "#6b6b60" }}>
              {bot.creator} · {bot.role}
            </div>
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            borderTop: "1px solid #e4e4dc",
            paddingTop: 22,
            fontSize: 20,
            color: "#6b6b60",
          }}
        >
          Public Grok Bot template
          <div style={{ marginLeft: "auto", display: "flex", fontWeight: 600, color: "#1c1c16" }}>
            grove
          </div>
        </div>
      </div>
    </div>,
    size,
  );
}
