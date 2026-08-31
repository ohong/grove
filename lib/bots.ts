export type BotShape = "blob" | "teardrop" | "gem" | "hex";

export type GroveBot = {
  id: string;
  slug: string;
  name: string;
  creator: string;
  description: string;
  category: "Work" | "Life" | "Build";
  role: string;
  tags: string[];
  accent: string;
  tint: string;
  shape: BotShape;
  sourceUrl: string;
  addUrl: string;
};

// Every entry below was verified against its public x.ai preview on 2026-08-30.
// Engagement metrics are intentionally not seeded; they are recorded separately.
export const bots: GroveBot[] = [
  {
    id: "ph5mcXqVy2p176Br7BJYi",
    slug: "echo",
    name: "Echo",
    creator: "Krista Letz",
    description:
      "Turns a customer call into slides from customer context. What we heard, next steps, project initiatives, or all of the above. Works with Figma or Google Slides, and Granola or Gong notes.",
    category: "Work",
    role: "Customer call → slides",
    tags: ["Figma", "Google Slides", "Granola", "Gong"],
    accent: "#168B68",
    tint: "#DDF5E8",
    shape: "blob",
    sourceUrl: "https://x.ai/bot/ph5mcXqVy2p176Br7BJYi",
    addUrl: "grokbot://app/v1/bot-template?id=ph5mcXqVy2p176Br7BJYi",
  },
  {
    id: "7f5AjmpjZkmTIsSybedYS",
    slug: "chicken-joe",
    name: "Chicken Joe",
    creator: "Parker Conrad",
    description:
      "NorCal surf desk. Every morning, scan reports and cams from Marin County through Santa Cruz. Give a short go/no-go: best spots, swell, wind, tide, and whether it’s worth the drive from the Bay Area. Weekends count.",
    category: "Life",
    role: "Daily NorCal surf desk",
    tags: ["Surfline", "NWS", "CDIP", "Local cams"],
    accent: "#0A78C9",
    tint: "#DCEFFC",
    shape: "teardrop",
    sourceUrl: "https://x.ai/bot/7f5AjmpjZkmTIsSybedYS",
    addUrl: "grokbot://app/v1/bot-template?id=7f5AjmpjZkmTIsSybedYS",
  },
  {
    id: "93gOz3op1UQdBdbekQFLK",
    slug: "dr-eggbot",
    name: "dr eggbot",
    creator: "Lauren Tan",
    description:
      "Designs high-quality Grok Bots. Asks a few preference questions, then creates them with CreateAgent. Coding bots get the pstack bar: one job, unslopped, verified. Non-coding bots get the same tightness: one job, one voice, explicit anti-jobs.",
    category: "Build",
    role: "Grok Bot designer",
    tags: ["CreateAgent", "pstack", "Bot design"],
    accent: "#ED4B45",
    tint: "#FBE3DF",
    shape: "gem",
    sourceUrl: "https://x.ai/bot/93gOz3op1UQdBdbekQFLK",
    addUrl: "grokbot://app/v1/bot-template?id=93gOz3op1UQdBdbekQFLK",
  },
  {
    id: "oq-mYZXM23ShlY7UbJWeB",
    slug: "ai-harness-assistant",
    name: "AI Harness Assistant",
    creator: "Alan Garcia",
    description:
      "Keep your computers current on AI coding harnesses you already use—Codex, Claude Code, Grok Build, OpenCode, Cursor, and similar. Update installed tools only. Do not add new products.",
    category: "Build",
    role: "Coding harness upkeep",
    tags: ["Codex", "Claude Code", "Cursor", "OpenCode"],
    accent: "#7957D5",
    tint: "#EAE3FA",
    shape: "hex",
    sourceUrl: "https://x.ai/bot/oq-mYZXM23ShlY7UbJWeB",
    addUrl: "grokbot://app/v1/bot-template?id=oq-mYZXM23ShlY7UbJWeB",
  },
];

export function getBotBySlug(slug: string) {
  return bots.find((bot) => bot.slug === slug);
}

export function getBotById(id: string) {
  return bots.find((bot) => bot.id === id);
}
