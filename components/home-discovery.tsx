"use client";

import {
  Button,
  Flex,
  Heading,
  IconButton,
  Link as RadixLink,
  Tabs,
  Text,
  TextField,
} from "@radix-ui/themes";
import { Search, X } from "lucide-react";
import Link from "next/link";
import { FormEvent, useEffect, useMemo, useRef, useState } from "react";

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

  function onSearch(event: FormEvent) {
    event.preventDefault();
    document.querySelector("#discover")?.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <section className="mx-auto max-w-[1136px] px-4 pt-10 pb-8 sm:pt-14">
      <Heading as="h1" size="8" weight="medium" highContrast className="max-w-xl tracking-tight">
        There’s a Grok Bot for that.
      </Heading>
      <Text as="p" size="3" color="gray" className="mt-3 max-w-xl">
        A small directory of public templates. Search by job, tool, or maker.
      </Text>

      <form onSubmit={onSearch} className="mt-6 max-w-xl">
        <label htmlFor="bot-search" className="sr-only">
          Search Grok Bots
        </label>
        <TextField.Root
          ref={searchRef}
          id="bot-search"
          size="3"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search bots — try slides, surf, or Codex"
        >
          <TextField.Slot>
            <Search className="size-4" aria-hidden="true" />
          </TextField.Slot>
          {query ? (
            <TextField.Slot side="right">
              <IconButton
                type="button"
                size="1"
                variant="ghost"
                color="gray"
                onClick={() => {
                  setQuery("");
                  searchRef.current?.focus();
                }}
                aria-label="Clear search"
              >
                <X className="size-3.5" />
              </IconButton>
            </TextField.Slot>
          ) : (
            <TextField.Slot side="right" className="hidden sm:flex">
              <kbd className="rounded border border-[var(--gray-a6)] px-1.5 py-0.5 text-[11px] text-[var(--gray-9)]">
                /
              </kbd>
            </TextField.Slot>
          )}
        </TextField.Root>
      </form>

      <div id="discover" className="scroll-mt-16 pt-8">
        <Flex align="center" justify="between" gap="4" wrap="wrap">
          <Tabs.Root
            value={category}
            onValueChange={(value) => setCategory(value as Category)}
          >
            <Tabs.List aria-label="Filter by category">
              {categories.map((item) => (
                <Tabs.Trigger key={item} value={item}>
                  {item}
                </Tabs.Trigger>
              ))}
            </Tabs.List>
          </Tabs.Root>
          <Text size="1" color="gray">
            {visibleBots.length} {visibleBots.length === 1 ? "bot" : "bots"}
            {query && ` matching “${query}”`}
          </Text>
        </Flex>

        {visibleBots.length > 0 ? (
          <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {visibleBots.map((bot) => (
              <BotCard key={bot.id} bot={bot} />
            ))}
          </div>
        ) : (
          <div className="mt-5 rounded-[var(--radius-3)] border border-dashed border-[var(--gray-a6)] px-5 py-12 text-center">
            <Text as="p" size="3" weight="medium" highContrast>
              No bots match that.
            </Text>
            <Text as="p" size="2" color="gray" className="mx-auto mt-2 max-w-md">
              Know a public template that should be here? Paste its x.ai link.
            </Text>
            <Button asChild size="2" highContrast className="mt-4">
              <Link href="/submit">Submit a bot</Link>
            </Button>
          </div>
        )}

        {(query || category !== "All") && (
          <Flex justify="center" className="mt-4">
            <RadixLink
              href="#"
              size="2"
              color="gray"
              onClick={(event) => {
                event.preventDefault();
                setQuery("");
                setCategory("All");
              }}
            >
              Reset filters
            </RadixLink>
          </Flex>
        )}
      </div>
    </section>
  );
}
