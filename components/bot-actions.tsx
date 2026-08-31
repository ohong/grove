"use client";

import { ArrowUpRight, Check, Heart, Share2 } from "lucide-react";
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
      text: "A Grok Bot worth sharing on Grove",
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
      <a
        href={addUrl}
        onClick={recordAdd}
        className="flex h-14 w-full items-center justify-center gap-2 rounded-full bg-lime px-6 text-sm font-bold text-ink transition-transform hover:-translate-y-0.5"
      >
        Add to Grok Bot <ArrowUpRight className="size-4" />
      </a>

      <div className="mt-3 grid grid-cols-2 gap-3">
        <button
          type="button"
          onClick={toggleLike}
          aria-pressed={stats.viewerLiked}
          className={`flex h-12 items-center justify-center gap-2 rounded-full border text-sm font-semibold transition-colors ${
            stats.viewerLiked
              ? "border-coral/35 bg-coral/15 text-ink"
              : "border-paper/18 bg-paper/[0.06] text-paper hover:bg-paper/10"
          }`}
        >
          <Heart
            className="size-4"
            fill={stats.viewerLiked ? "currentColor" : "none"}
          />
          {stats.viewerLiked ? "Liked" : "Like"}
        </button>
        <button
          type="button"
          onClick={sharePage}
          className="flex h-12 items-center justify-center gap-2 rounded-full border border-paper/18 bg-paper/[0.06] text-sm font-semibold text-paper hover:bg-paper/10"
        >
          {copied ? <Check className="size-4" /> : <Share2 className="size-4" />}
          {copied ? "Copied" : "Share"}
        </button>
      </div>

      <div className="mt-6 grid grid-cols-2 border-y border-paper/12 py-5 text-center">
        <div className="border-r border-paper/12">
          <p className="font-display text-3xl leading-none font-semibold text-paper">
            {stats.adds}
          </p>
          <p className="mt-1.5 text-[0.65rem] font-bold tracking-[0.11em] text-paper/65 uppercase">
            Add {stats.adds === 1 ? "click" : "clicks"}
          </p>
        </div>
        <div>
          <p className="font-display text-3xl leading-none font-semibold text-paper">
            {stats.likes}
          </p>
          <p className="mt-1.5 text-[0.65rem] font-bold tracking-[0.11em] text-paper/65 uppercase">
            {stats.likes === 1 ? "Like" : "Likes"}
          </p>
        </div>
      </div>
      <p className="mt-4 text-center text-[0.68rem] leading-5 text-paper/65">
        Counts begin at zero and reflect Grove interactions only.
      </p>
      {message && (
        <p className="mt-3 text-center text-xs text-coral" role="status">
          {message}
        </p>
      )}
    </div>
  );
}
