"use client";

import { ArrowUpRight } from "lucide-react";

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
    <a
      href={addUrl}
      onClick={recordAdd}
      className="mt-8 flex h-14 w-full items-center justify-center gap-2 rounded-full bg-ink px-6 text-sm font-bold text-paper lg:hidden"
    >
      Add {name} to Grok Bot <ArrowUpRight className="size-4" />
    </a>
  );
}
