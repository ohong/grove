import type { Metadata } from "next";
import {
  ArrowLeft,
  ArrowUpRight,
  BadgeCheck,
  ExternalLink,
  Fingerprint,
  ShieldCheck,
} from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

import { BotActions } from "@/components/bot-actions";
import { BotAvatar } from "@/components/bot-avatar";
import { BotCard } from "@/components/bot-card";
import { MobileAddButton } from "@/components/mobile-add-button";
import { bots, getBotBySlug } from "@/lib/bots";
import { getBotStats } from "@/lib/store";

export const dynamic = "force-dynamic";

export function generateStaticParams() {
  return bots.map((bot) => ({ slug: bot.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const bot = getBotBySlug(slug);
  if (!bot) return { title: "Bot not found" };

  return {
    title: bot.name,
    description: bot.description,
    alternates: { canonical: `/b/${bot.slug}` },
    openGraph: {
      title: `${bot.name} by ${bot.creator}`,
      description: bot.description,
      type: "website",
      images: [{ url: `/b/${bot.slug}/opengraph-image`, width: 1200, height: 630 }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${bot.name} by ${bot.creator}`,
      description: bot.description,
      images: [`/b/${bot.slug}/opengraph-image`],
    },
  };
}

export default async function BotPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const bot = getBotBySlug(slug);
  if (!bot) notFound();

  const stats = await getBotStats(bot.slug);
  const related = bots.filter((item) => item.slug !== bot.slug).slice(0, 2);

  return (
    <main>
      <section className="border-b border-ink/10">
        <div className="mx-auto max-w-7xl px-5 py-7 sm:px-8">
          <Link
            href="/#discover"
            className="inline-flex items-center gap-2 text-sm font-semibold text-ink-soft hover:text-ink"
          >
            <ArrowLeft className="size-4" /> Back to discover
          </Link>
        </div>
      </section>

      <section className="relative overflow-hidden">
        <div
          className="absolute inset-x-0 top-0 h-[28rem] opacity-55"
          style={{
            background: `radial-gradient(circle at 72% 15%, ${bot.tint}, transparent 52%)`,
          }}
          aria-hidden="true"
        />
        <div className="relative mx-auto grid max-w-7xl gap-12 px-5 py-14 sm:px-8 sm:py-20 lg:grid-cols-[1fr_22rem] lg:gap-20 lg:py-24">
          <div>
            <div className="flex flex-col items-start gap-8 sm:flex-row sm:items-center">
              <BotAvatar
                accent={bot.accent}
                shape={bot.shape}
                size="xl"
                className="ring-[10px] ring-white/50"
              />
              <div>
                <div className="flex flex-wrap items-center gap-2.5">
                  <span className="rounded-full bg-ink px-3 py-1.5 text-[0.66rem] font-bold tracking-[0.12em] text-paper uppercase">
                    {bot.category}
                  </span>
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-leaf/20 bg-lime/35 px-3 py-1.5 text-[0.66rem] font-bold tracking-[0.1em] text-leaf uppercase">
                    <BadgeCheck className="size-3.5" /> Public preview verified
                  </span>
                </div>
                <h1 className="mt-5 font-display text-[4rem] leading-[0.9] font-semibold tracking-[-0.055em] text-balance sm:text-[5.6rem]">
                  {bot.name}
                </h1>
                <p className="mt-4 text-base text-ink-soft">
                  Built by <span className="font-semibold text-ink">{bot.creator}</span>
                </p>
              </div>
            </div>

            <MobileAddButton
              name={bot.name}
              slug={bot.slug}
              addUrl={bot.addUrl}
            />

            <div className="mt-12 max-w-3xl border-t border-ink/12 pt-10">
              <p className="text-xs font-bold tracking-[0.16em] text-leaf uppercase">
                What it does
              </p>
              <p className="mt-5 font-display text-[2rem] leading-[1.28] tracking-[-0.02em] text-ink sm:text-[2.55rem]">
                {bot.description}
              </p>
              <div className="mt-8 flex flex-wrap gap-2">
                {bot.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-ink/12 bg-white/55 px-3.5 py-2 text-xs font-semibold text-ink-soft"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-12 grid gap-4 sm:grid-cols-2">
              <div className="rounded-[1.5rem] border border-ink/12 bg-white/55 p-6">
                <ShieldCheck className="size-6 text-leaf" />
                <h2 className="mt-5 text-sm font-bold">Review before connecting</h2>
                <p className="mt-2 text-sm leading-6 text-ink-soft">
                  This is a third-party template. Read its public preview and
                  review requested tools before you connect accounts.
                </p>
              </div>
              <a
                href={bot.sourceUrl}
                target="_blank"
                rel="noreferrer"
                className="group rounded-[1.75rem] border border-ink/12 bg-white/55 p-6 transition-colors hover:bg-paper-deep"
              >
                <ExternalLink className="size-6 text-leaf" />
                <h2 className="mt-5 flex items-center gap-2 text-sm font-bold">
                  Open the source preview
                  <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </h2>
                <p className="mt-2 text-sm leading-6 text-ink-soft">
                  Confirm the original creator, description, and template on x.ai.
                </p>
              </a>
            </div>
          </div>

          <aside className="lg:pt-8">
            <div className="sticky top-28 overflow-hidden rounded-[1.75rem] bg-ink p-6 text-paper shadow-[0_26px_70px_rgb(24_59_45/18%)] sm:p-7">
              <p className="text-xs font-bold tracking-[0.15em] text-lime uppercase">
                Ready to try it?
              </p>
              <h2 className="mt-3 font-display text-3xl leading-none font-semibold">
                Add {bot.name}
              </h2>
              <p className="mt-3 text-sm leading-6 text-paper/55">
                Opens the official Grok Bot import link on this device.
              </p>
              <div className="mt-7">
                <BotActions
                  slug={bot.slug}
                  addUrl={bot.addUrl}
                  initialStats={stats}
                />
              </div>

              <div className="mt-6 flex gap-3 rounded-xl bg-paper/[0.06] p-4">
                <Fingerprint className="mt-0.5 size-4 shrink-0 text-lime" />
                <div className="min-w-0">
                  <p className="text-[0.65rem] font-bold tracking-[0.11em] text-paper/70 uppercase">
                    Template ID
                  </p>
                  <p className="mt-1 truncate font-mono text-[0.68rem] text-paper/60">
                    {bot.id}
                  </p>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </section>

      <section className="border-t border-ink/10 bg-paper-deep/55 px-5 py-20 sm:px-8 sm:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="flex items-end justify-between gap-6">
            <div>
              <p className="text-xs font-bold tracking-[0.15em] text-leaf uppercase">
                Keep looking
              </p>
              <h2 className="mt-3 font-display text-4xl font-semibold tracking-[-0.035em] sm:text-5xl">
                Two more from the grove.
              </h2>
            </div>
            <Link
              href="/#discover"
              className="hidden text-sm font-bold underline decoration-ink/25 underline-offset-4 sm:block"
            >
              View all bots
            </Link>
          </div>
          <div className="mt-9 grid gap-5 md:grid-cols-2">
            {related.map((item) => (
              <BotCard key={item.id} bot={item} />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
