"use client";

import { ArrowDown, ArrowRight, Search, Sparkles, X } from "lucide-react";
import Link from "next/link";
import { FormEvent, useEffect, useMemo, useRef, useState } from "react";

import { BotAvatar } from "@/components/bot-avatar";
import { BotCard } from "@/components/bot-card";
import { bots } from "@/lib/bots";

const categories = ["All", "Work", "Life", "Build"] as const;
type Category = (typeof categories)[number];

export function HomeDiscovery() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<Category>("All");
  const searchRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (
        event.key === "/" &&
        !["INPUT", "TEXTAREA", "SELECT"].includes(
          (event.target as HTMLElement).tagName,
        )
      ) {
        event.preventDefault();
        searchRef.current?.focus();
      }
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  const visibleBots = useMemo(() => {
    const needle = query.trim().toLowerCase();

    return bots.filter((bot) => {
      const matchesCategory = category === "All" || bot.category === category;
      const haystack = [
        bot.name,
        bot.creator,
        bot.description,
        bot.role,
        ...bot.tags,
      ]
        .join(" ")
        .toLowerCase();

      return matchesCategory && (!needle || haystack.includes(needle));
    });
  }, [category, query]);

  function revealResults(event: FormEvent) {
    event.preventDefault();
    document.querySelector("#discover")?.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <>
      <section className="mx-auto grid max-w-7xl gap-12 px-5 pt-12 pb-20 sm:px-8 sm:pt-16 lg:grid-cols-[1.06fr_0.94fr] lg:items-center lg:gap-16 lg:pt-20 lg:pb-28">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-ink/12 bg-white/55 px-3.5 py-2 text-xs font-bold tracking-[0.1em] text-ink-soft uppercase">
            <Sparkles className="size-3.5 text-coral" />
            Public templates, carefully verified
          </div>
          <h1 className="mt-7 max-w-3xl font-display text-[3.65rem] leading-[0.92] font-medium tracking-[-0.052em] text-balance sm:text-[5rem] lg:text-[5.45rem]">
            Find a bot that already <span className="text-leaf italic">knows the job.</span>
          </h1>
          <p className="mt-7 max-w-xl text-lg leading-8 text-ink-soft sm:text-xl">
            Grove turns good Grok Bot links into a useful directory—so the
            right teammate is one search away, not buried in a timeline.
          </p>

          <form onSubmit={revealResults} className="relative mt-9 max-w-xl">
            <label htmlFor="bot-search" className="sr-only">
              Search Grok Bots
            </label>
            <Search
              className="pointer-events-none absolute top-1/2 left-5 size-5 -translate-y-1/2 text-ink/45"
              aria-hidden="true"
            />
            <input
              ref={searchRef}
              id="bot-search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Try “slides”, “surf”, or “Codex”"
              className="h-16 w-full rounded-2xl border border-ink/15 bg-white/80 pr-24 pl-14 text-base shadow-[0_12px_35px_rgb(24_59_45/7%)] placeholder:text-ink/38 focus:border-leaf focus:outline-none"
            />
            {query ? (
              <button
                type="button"
                onClick={() => {
                  setQuery("");
                  searchRef.current?.focus();
                }}
                className="absolute top-1/2 right-4 flex size-9 -translate-y-1/2 items-center justify-center rounded-full hover:bg-paper-deep"
                aria-label="Clear search"
              >
                <X className="size-4" />
              </button>
            ) : (
              <kbd className="pointer-events-none absolute top-1/2 right-5 hidden -translate-y-1/2 rounded-md border border-ink/12 bg-paper px-2 py-1 font-sans text-xs text-ink/45 sm:block">
                /
              </kbd>
            )}
          </form>

          <a
            href="#discover"
            className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-ink-soft hover:text-ink"
          >
            Browse {bots.length} verified templates
            <ArrowDown className="size-4" />
          </a>
        </div>

        <div className="hero-grid relative min-h-[600px] overflow-hidden rounded-[2.25rem] bg-ink p-5 text-paper shadow-[0_32px_70px_rgb(24_59_45/18%)] sm:min-h-[620px] sm:p-7">
          <div className="relative z-10 flex items-center justify-between">
            <span className="flex items-center gap-2 text-xs font-bold tracking-[0.13em] uppercase">
              <span className="size-2 rounded-full bg-lime shadow-[0_0_0_5px_rgb(212_246_63/14%)]" />
              Grove index
            </span>
            <span className="rounded-full border border-paper/20 px-3 py-1.5 text-xs text-paper/70">
              Source checked
            </span>
          </div>

          <div className="relative z-10 mt-8 grid grid-cols-2 gap-3 sm:gap-4">
            {bots.map((bot, index) => (
              <Link
                key={bot.id}
                href={`/b/${bot.slug}`}
                className={`group flex min-h-40 flex-col justify-between rounded-[1.5rem] border border-paper/14 p-4 transition-all hover:-translate-y-1 hover:border-lime/70 sm:min-h-44 sm:p-5 ${
                  index === 0 || index === 3
                    ? "bg-paper/10"
                    : "translate-y-6 bg-paper/[0.06]"
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <BotAvatar
                    accent={bot.accent}
                    shape={bot.shape}
                    size="sm"
                  />
                  <ArrowRight className="size-4 text-paper/45 transition-transform group-hover:translate-x-1 group-hover:text-lime" />
                </div>
                <div>
                  <p className="font-display text-xl leading-tight font-semibold sm:text-2xl">
                    {bot.name}
                  </p>
                  <p className="mt-1 text-xs text-paper/55">{bot.role}</p>
                </div>
              </Link>
            ))}
          </div>

          <div className="absolute right-7 bottom-6 left-7 flex items-end justify-between border-t border-paper/15 pt-5">
            <div>
              <p className="font-display text-4xl leading-none font-semibold text-lime">
                04
              </p>
              <p className="mt-1 text-xs text-paper/55">live public previews</p>
            </div>
            <p className="max-w-[11rem] text-right text-xs leading-5 text-paper/55">
              No invented bots.
              <br />
              No borrowed install counts.
            </p>
          </div>
          <div
            className="absolute -right-20 -bottom-32 size-80 rounded-full border-[55px] border-lime/10"
            aria-hidden="true"
          />
        </div>
      </section>

      <section
        id="discover"
        className="scroll-mt-24 border-y border-ink/10 bg-paper-deep/55"
      >
        <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-24">
          <div className="flex flex-col gap-7 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-xs font-bold tracking-[0.16em] text-leaf uppercase">
                Discover
              </p>
              <h2 className="mt-3 font-display text-4xl leading-none font-semibold tracking-[-0.035em] sm:text-5xl">
                Bots with a real source.
              </h2>
              <p className="mt-4 max-w-xl text-base leading-7 text-ink-soft">
                Every listing opens the original public x.ai template. Search by
                task, tool, or maker.
              </p>
            </div>
            <div className="flex gap-2 overflow-x-auto pb-1" role="group" aria-label="Filter by category">
              {categories.map((item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() => setCategory(item)}
                  aria-pressed={category === item}
                  className={`shrink-0 rounded-full px-4 py-2.5 text-sm font-semibold transition-colors ${
                    category === item
                      ? "bg-ink text-paper"
                      : "border border-ink/12 bg-white/60 text-ink-soft hover:border-ink/30"
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-10 flex items-center justify-between border-b border-ink/10 pb-4 text-sm text-ink-soft">
            <span>
              {visibleBots.length} {visibleBots.length === 1 ? "bot" : "bots"}
              {query && ` matching “${query}”`}
            </span>
            {(query || category !== "All") && (
              <button
                type="button"
                onClick={() => {
                  setQuery("");
                  setCategory("All");
                }}
                className="font-semibold text-ink underline decoration-ink/25 underline-offset-4"
              >
                Reset filters
              </button>
            )}
          </div>

          {visibleBots.length > 0 ? (
            <div className="mt-7 grid gap-5 md:grid-cols-2">
              {visibleBots.map((bot) => (
                <BotCard key={bot.id} bot={bot} />
              ))}
            </div>
          ) : (
            <div className="mt-7 rounded-[1.75rem] border border-dashed border-ink/25 bg-white/35 px-6 py-16 text-center">
              <p className="font-display text-3xl font-semibold">No bot in this patch yet.</p>
              <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-ink-soft">
                If you know a public template that should be here, share its x.ai
                link. Grove will read the source preview for you.
              </p>
              <Link
                href="/submit"
                className="mt-6 inline-flex items-center gap-2 rounded-full bg-ink px-5 py-3 text-sm font-semibold text-paper"
              >
                Share a bot <ArrowRight className="size-4" />
              </Link>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
