"use client";

import { Button, Flex, Grid, Text } from "@radix-ui/themes";
import { Check, Heart, Share2 } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import type { BotStats } from "@/lib/store";

function getVisitorId() {
  const key = "grove-visitor-id";
  try {
    const current = window.localStorage.getItem(key);
    if (current) return current;
    const created = crypto.randomUUID();
    window.localStorage.setItem(key, created);
    return created;
  } catch {
    return crypto.randomUUID();
  }
}

export function BotActions({
  slug,
  addUrl,
  initialStats,
}: {
  slug: string;
  addUrl: string;
  initialStats: BotStats;
}) {
  const [stats, setStats] = useState(initialStats);
  const visitorId = useRef("");
  const [copied, setCopied] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const visitor = getVisitorId();
    visitorId.current = visitor;

    function syncRecordedStats(event: Event) {
      const detail = (event as CustomEvent<{ slug: string; stats: BotStats }>).detail;
      if (detail?.slug === slug) setStats(detail.stats);
    }

    window.addEventListener("grove:stats", syncRecordedStats);

    fetch(`/api/bots/${slug}/stats?visitor=${encodeURIComponent(visitor)}`, {
      cache: "no-store",
    })
      .then((response) => (response.ok ? response.json() : null))
      .then((value: BotStats | null) => {
        if (value) setStats(value);
      })
      .catch(() => undefined);

    return () => window.removeEventListener("grove:stats", syncRecordedStats);
  }, [slug]);

  function recordAdd() {
    setMessage("");
    fetch(`/api/bots/${slug}/stats`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: "add" }),
      keepalive: true,
    })
      .then((response) => (response.ok ? response.json() : null))
      .then((value: BotStats | null) => {
        if (value) setStats((current) => ({ ...current, adds: value.adds }));
      })
      .catch(() => undefined);
  }

  async function toggleLike() {
    const visitor = visitorId.current || getVisitorId();
    visitorId.current = visitor;
    const nextLiked = !stats.viewerLiked;
    setMessage("");

    try {
      const response = await fetch(`/api/bots/${slug}/stats`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "like",
          visitorId: visitor,
          liked: nextLiked,
        }),
      });
      if (!response.ok) throw new Error();
      setStats((await response.json()) as BotStats);
    } catch {
      setMessage("Like could not be recorded. Try again.");
    }
  }

  async function sharePage() {
    const shareData = {
      title: document.title,
      text: "A Grok Bot on Grove",
      url: window.location.href,
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        await navigator.clipboard.writeText(window.location.href);
        setCopied(true);
        window.setTimeout(() => setCopied(false), 1800);
      }
    } catch {
      // Dismissing the native share sheet is not an error worth surfacing.
    }
  }

  return (
    <div>
      <Button asChild size="3" highContrast className="w-full">
        <a href={addUrl} onClick={recordAdd}>
          Add to Grok Bot
        </a>
      </Button>

      <Grid columns="2" gap="2" className="mt-2">
        <Button
          type="button"
          size="2"
          variant={stats.viewerLiked ? "solid" : "outline"}
          color="gray"
          highContrast={stats.viewerLiked}
          onClick={toggleLike}
          aria-pressed={stats.viewerLiked}
        >
          <Heart className="size-3.5" fill={stats.viewerLiked ? "currentColor" : "none"} />
          {stats.viewerLiked ? "Liked" : "Like"}
        </Button>
        <Button type="button" size="2" variant="outline" color="gray" onClick={sharePage}>
          {copied ? <Check className="size-3.5" /> : <Share2 className="size-3.5" />}
          {copied ? "Copied" : "Share"}
        </Button>
      </Grid>

      <Flex className="mt-5 border-y border-[var(--gray-a5)] py-4" gap="0">
        <div className="flex-1 border-r border-[var(--gray-a5)] pr-3 text-center">
          <Text as="p" size="6" weight="medium" highContrast>
            {stats.adds}
          </Text>
          <Text as="p" size="1" color="gray">
            Add {stats.adds === 1 ? "click" : "clicks"}
          </Text>
        </div>
        <div className="flex-1 pl-3 text-center">
          <Text as="p" size="6" weight="medium" highContrast>
            {stats.likes}
          </Text>
          <Text as="p" size="1" color="gray">
            {stats.likes === 1 ? "Like" : "Likes"}
          </Text>
        </div>
      </Flex>
      <Text as="p" size="1" color="gray" className="mt-3 text-center">
        Counts begin at zero and reflect Grove interactions only.
      </Text>
      {message && (
        <Text as="p" size="1" color="red" className="mt-2 text-center" role="status">
          {message}
        </Text>
      )}
    </div>
  );
}
