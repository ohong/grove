"use client";

import { Button } from "@radix-ui/themes";

import type { BotStats } from "@/lib/store";

export function MobileAddButton({
  name,
  slug,
  addUrl,
}: {
  name: string;
  slug: string;
  addUrl: string;
}) {
  function recordAdd() {
    fetch(`/api/bots/${slug}/stats`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: "add" }),
      keepalive: true,
    })
      .then((response) => (response.ok ? response.json() : null))
      .then((stats: BotStats | null) => {
        if (stats) {
          window.dispatchEvent(
            new CustomEvent("grove:stats", { detail: { slug, stats } }),
          );
        }
      })
      .catch(() => undefined);
  }

  return (
    <Button asChild size="3" highContrast className="mt-6 w-full lg:hidden">
      <a href={addUrl} onClick={recordAdd}>
        Add {name} to Grok Bot
      </a>
    </Button>
  );
}
