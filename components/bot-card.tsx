import { ArrowUpRight, BadgeCheck } from "lucide-react";
import Link from "next/link";

import { BotAvatar } from "@/components/bot-avatar";
import type { GroveBot } from "@/lib/bots";

export function BotCard({ bot }: { bot: GroveBot }) {
  return (
    <article className="card-lift group relative flex min-h-[330px] flex-col overflow-hidden rounded-[1.75rem] border border-ink/12 bg-white/62 p-6 sm:p-7">
      <div
        className="absolute -top-12 -right-10 size-36 rounded-full opacity-65 blur-2xl transition-transform duration-500 group-hover:scale-125"
        style={{ backgroundColor: bot.tint }}
        aria-hidden="true"
      />
      <div className="relative flex items-start justify-between gap-5">
        <BotAvatar accent={bot.accent} shape={bot.shape} size="md" />
        <span className="inline-flex items-center gap-1.5 rounded-full border border-ink/10 bg-paper/85 px-3 py-1.5 text-[0.68rem] font-bold tracking-[0.13em] text-ink-soft uppercase">
          <BadgeCheck className="size-3.5 text-leaf" />
          Verified
        </span>
      </div>

      <div className="relative mt-7">
        <div className="flex items-center gap-2 text-xs font-bold tracking-[0.12em] text-ink/50 uppercase">
          <span>{bot.category}</span>
          <span className="size-1 rounded-full bg-coral" />
          <span>{bot.role}</span>
        </div>
        <h3 className="mt-3 font-display text-[2rem] leading-none font-semibold tracking-[-0.035em]">
          <Link href={`/b/${bot.slug}`} className="after:absolute after:inset-0">
            {bot.name}
          </Link>
        </h3>
        <p className="mt-2 text-sm text-ink-soft">by {bot.creator}</p>
        <p className="mt-5 line-clamp-3 text-[0.96rem] leading-6 text-ink-soft">
          {bot.description}
        </p>
      </div>

      <div className="relative mt-auto flex items-end justify-between gap-4 pt-7">
        <div className="flex flex-wrap gap-1.5">
          {bot.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-ink/10 bg-paper px-2.5 py-1 text-[0.69rem] font-medium text-ink-soft"
            >
              {tag}
            </span>
          ))}
        </div>
        <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-ink text-paper transition-transform group-hover:rotate-6 group-hover:scale-105">
          <ArrowUpRight className="size-4" />
        </span>
      </div>
    </article>
  );
}
