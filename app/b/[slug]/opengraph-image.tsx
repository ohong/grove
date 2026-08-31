import { ImageResponse } from "next/og";
import { notFound } from "next/navigation";

import { getBotBySlug } from "@/lib/bots";

export const alt = "A Grok Bot shared on Grove";
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

  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        position: "relative",
        overflow: "hidden",
        background: "#F7F8ED",
        color: "#183B2D",
        fontFamily: "Arial, sans-serif",
        padding: "64px 72px",
      }}
    >
      <div
        style={{
          position: "absolute",
          width: 520,
          height: 520,
          right: -120,
          top: -180,
          borderRadius: 999,
          background: bot.tint,
        }}
      />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          width: "100%",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <div
            style={{
              width: 54,
              height: 54,
              borderRadius: 16,
              background: "#183B2D",
              color: "#D4F63F",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 30,
            }}
          >
            <span style={{ display: "flex", color: "#D4F63F", fontWeight: 700 }}>
              G
            </span>
          </div>
          <div style={{ display: "flex", fontSize: 34, fontWeight: 700 }}>Grove</div>
          <div
            style={{
              marginLeft: "auto",
              display: "flex",
              border: "2px solid rgba(24,59,45,.16)",
              borderRadius: 999,
              padding: "12px 20px",
              fontSize: 18,
            }}
          >
            Verified public template
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 48 }}>
          <div
            style={{
              width: 150,
              height: 150,
              borderRadius: 48,
              background: bot.accent,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 16,
              boxShadow: "inset 0 -18px 28px rgba(0,0,0,.12)",
            }}
          >
            <div style={{ width: 20, height: 50, borderRadius: 999, background: "white" }} />
            <div style={{ width: 20, height: 50, borderRadius: 999, background: "white" }} />
          </div>
          <div style={{ display: "flex", flexDirection: "column", maxWidth: 820 }}>
            <div
              style={{
                display: "flex",
                fontSize: 74,
                lineHeight: 0.98,
                letterSpacing: -3,
                fontWeight: 700,
              }}
            >
              {bot.name}
            </div>
            <div style={{ display: "flex", marginTop: 18, fontSize: 27, color: "#496458" }}>
              by {bot.creator} · {bot.role}
            </div>
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            borderTop: "2px solid rgba(24,59,45,.13)",
            paddingTop: 25,
            fontSize: 21,
            color: "#496458",
          }}
        >
          A Grok Bot worth sharing
          <div style={{ marginLeft: "auto", display: "flex", fontWeight: 700, color: "#183B2D" }}>
            Find it in the Grove →
          </div>
        </div>
      </div>
    </div>,
    size,
  );
}
