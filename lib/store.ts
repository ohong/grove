import "server-only";

import { appendFile, mkdir, readFile } from "node:fs/promises";
import path from "node:path";

type BotEvent = {
  id: string;
  slug: string;
  action: "add" | "like";
  visitorId?: string;
  liked?: boolean;
  createdAt: string;
};

export type BotStats = {
  adds: number;
  likes: number;
  viewerLiked: boolean;
};

function getDataDirectory() {
  const configured = process.env.GROVE_DATA_DIR?.trim();
  return configured
    ? path.resolve(configured)
    : path.join(process.cwd(), ".data");
}

async function appendRecord(filename: string, value: object) {
  const directory = getDataDirectory();
  await mkdir(directory, { recursive: true });
  await appendFile(
    path.join(directory, filename),
    `${JSON.stringify(value)}\n`,
    "utf8",
  );
}

async function readRecords<T>(filename: string): Promise<T[]> {
  try {
    const contents = await readFile(
      path.join(getDataDirectory(), filename),
      "utf8",
    );

    return contents
      .split("\n")
      .filter(Boolean)
      .flatMap((line) => {
        try {
          return [JSON.parse(line) as T];
        } catch {
          return [];
        }
      });
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === "ENOENT") return [];
    throw error;
  }
}

export async function recordBotEvent(event: Omit<BotEvent, "id" | "createdAt">) {
  await appendRecord("bot-events.jsonl", {
    ...event,
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
  });
}

export async function getBotStats(
  slug: string,
  viewerId?: string,
): Promise<BotStats> {
  const events = (await readRecords<BotEvent>("bot-events.jsonl")).filter(
    (event) => event.slug === slug,
  );
  const likeState = new Map<string, boolean>();
  let adds = 0;

  for (const event of events) {
    if (event.action === "add") adds += 1;
    if (event.action === "like" && event.visitorId) {
      likeState.set(event.visitorId, Boolean(event.liked));
    }
  }

  return {
    adds,
    likes: [...likeState.values()].filter(Boolean).length,
    viewerLiked: viewerId ? Boolean(likeState.get(viewerId)) : false,
  };
}

export async function recordSponsorIntent(value: {
  brand: string;
  url: string;
  email: string;
  slot: number;
  price: number;
}) {
  const id = crypto.randomUUID();
  await appendRecord("sponsor-intents.jsonl", {
    ...value,
    id,
    status: "new",
    createdAt: new Date().toISOString(),
  });
  return id;
}

export async function recordBotSubmission(value: {
  templateId: string;
  sourceUrl: string;
  name: string;
  creator: string;
  description: string;
}) {
  const id = crypto.randomUUID();
  await appendRecord("bot-submissions.jsonl", {
    ...value,
    id,
    status: "pending_review",
    createdAt: new Date().toISOString(),
  });
  return id;
}
