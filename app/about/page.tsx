import type { Metadata } from "next";
import {
  ArrowRight,
  BadgeCheck,
  Eye,
  HeartHandshake,
  Link2,
  MousePointerClick,
  Search,
  Sprout,
} from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About",
  description:
    "Why Grove exists, how public Grok Bot templates are verified, and what its engagement numbers mean.",
};

const principles = [
  {
    icon: Link2,
    number: "01",
    title: "The source wins",
    copy: "A Grove page is a useful doorway, not a replacement. Every bot keeps a direct line back to its public x.ai template and named creator.",
  },
  {
    icon: Search,
    number: "02",
    title: "Discovery beats virality",
    copy: "Search by the job, tool, or maker. A good bot should stay findable after the post that launched it disappears down the feed.",
  },
  {
    icon: Eye,
    number: "03",
    title: "Honest signal only",
    copy: "No invented installs, seeded likes, or copied engagement. If Grove cannot measure a thing directly, Grove does not present it as a metric.",
  },
];

export default function AboutPage() {
  return (
    <main>
      <section className="border-b border-ink/10">
        <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-24 lg:py-28">
          <div className="grid gap-12 lg:grid-cols-[1.22fr_0.78fr] lg:items-end">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full border border-ink/12 bg-lime/35 px-3.5 py-2 text-xs font-bold tracking-[0.11em] text-leaf uppercase">
                <Sprout className="size-3.5" /> Why Grove exists
              </span>
              <h1 className="mt-8 max-w-4xl font-display text-[4.15rem] leading-[0.9] font-semibold tracking-[-0.055em] text-balance sm:text-[6rem]">
                Good bots need more than{" "}
                <span className="text-leaf italic">a good tweet.</span>
              </h1>
            </div>
            <p className="max-w-xl text-lg leading-8 text-ink-soft lg:pb-2">
              The current sharing stack is a public link plus a post and some
              luck. Grove adds the missing layer: a small, searchable, social
              directory for Grok Bot templates—and nothing else.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-paper-deep/55 px-5 py-20 sm:px-8 sm:py-24">
        <div className="mx-auto max-w-7xl">
          <p className="text-xs font-bold tracking-[0.15em] text-leaf uppercase">
            The operating principles
          </p>
          <div className="mt-8 grid gap-4 lg:grid-cols-3">
            {principles.map((item) => (
              <article
                key={item.number}
                className="rounded-[1.75rem] border border-ink/12 bg-white/55 p-7 sm:p-8"
              >
                <div className="flex items-center justify-between">
                  <span className="flex size-11 items-center justify-center rounded-xl bg-ink text-lime">
                    <item.icon className="size-5" />
                  </span>
                  <span className="font-mono text-xs font-bold text-ink/30">
                    {item.number}
                  </span>
                </div>
                <h2 className="mt-10 font-display text-3xl leading-none font-semibold tracking-[-0.03em]">
                  {item.title}
                </h2>
                <p className="mt-4 text-sm leading-6 text-ink-soft">{item.copy}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 py-20 sm:px-8 sm:py-24">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.72fr_1.28fr] lg:gap-20">
          <div>
            <p className="text-xs font-bold tracking-[0.15em] text-leaf uppercase">
              From link to listing
            </p>
            <h2 className="mt-4 font-display text-4xl leading-none font-semibold tracking-[-0.035em] sm:text-5xl">
              Very little ceremony.
              <br />
              <span className="italic">Just enough trust.</span>
            </h2>
          </div>
          <ol className="border-t border-ink/12">
            {[
              {
                icon: Link2,
                step: "Paste",
                copy: "Share a public URL in the exact x.ai/bot/{id} format.",
              },
              {
                icon: BadgeCheck,
                step: "Verify",
                copy: "Grove fetches the public preview and shows the name, creator, and description before submission.",
              },
              {
                icon: MousePointerClick,
                step: "Discover",
                copy: "After review, the bot gets a searchable page with a direct import link and its source intact.",
              },
            ].map((item, index) => (
              <li
                key={item.step}
                className="grid gap-4 border-b border-ink/12 py-7 sm:grid-cols-[3rem_1fr_1.6fr] sm:items-center"
              >
                <span className="font-display text-3xl font-semibold text-ink/25">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="flex items-center gap-3 text-sm font-bold">
                  <item.icon className="size-4.5 text-leaf" /> {item.step}
                </span>
                <p className="text-sm leading-6 text-ink-soft">{item.copy}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="bg-ink px-5 py-20 text-paper sm:px-8 sm:py-24">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.82fr_1.18fr] lg:items-start lg:gap-20">
          <div>
            <HeartHandshake className="size-8 text-lime" />
            <h2 className="mt-7 font-display text-4xl leading-none font-semibold tracking-[-0.035em] sm:text-5xl">
              What the numbers mean.
            </h2>
            <p className="mt-5 max-w-md text-sm leading-6 text-paper/58">
              Counts start at zero. Grove only reports interactions it receives;
              it does not claim access to x.ai install telemetry.
            </p>
          </div>
          <div className="overflow-hidden rounded-[1.5rem] border border-paper/14">
            <div className="grid grid-cols-[0.7fr_1.3fr] border-b border-paper/14 bg-paper/[0.06] px-5 py-4 text-[0.65rem] font-bold tracking-[0.12em] text-paper/70 uppercase sm:grid-cols-[0.7fr_1fr_1.4fr]">
              <span>Label</span>
              <span className="hidden sm:block">Source</span>
              <span>Exactly what it means</span>
            </div>
            {[
              ["Add clicks", "Grove event log", "Clicks on the official Grok Bot import action—not confirmed installs."],
              ["Likes", "Grove event log", "Current unique browser likes recorded on Grove."],
              ["Verified", "Public x.ai preview", "The source returned a readable public name and description."],
            ].map(([label, source, meaning]) => (
              <div
                key={label}
                className="grid grid-cols-[0.7fr_1.3fr] gap-4 border-b border-paper/10 px-5 py-5 text-sm last:border-0 sm:grid-cols-[0.7fr_1fr_1.4fr]"
              >
                <span className="font-semibold text-paper">{label}</span>
                <span className="hidden text-paper/65 sm:block">{source}</span>
                <span className="leading-6 text-paper/62">{meaning}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 py-20 sm:px-8 sm:py-24">
        <div className="mx-auto flex max-w-7xl flex-col gap-8 rounded-[2rem] bg-lime/55 px-7 py-10 sm:px-10 md:flex-row md:items-center md:justify-between md:py-12">
          <div>
            <p className="text-xs font-bold tracking-[0.15em] text-ink/55 uppercase">
              Help the grove grow
            </p>
            <h2 className="mt-3 font-display text-4xl leading-none font-semibold tracking-[-0.035em] sm:text-5xl">
              Bring one useful bot.
            </h2>
          </div>
          <Link
            href="/submit"
            className="inline-flex h-13 w-fit items-center gap-2 rounded-full bg-ink px-6 text-sm font-bold text-paper transition-transform hover:-translate-y-0.5"
          >
            Share a public link <ArrowRight className="size-4" />
          </Link>
        </div>
      </section>
    </main>
  );
}
