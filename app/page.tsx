import { ArrowRight } from "lucide-react";
import Link from "next/link";

import { HomeDiscovery } from "@/components/home-discovery";
import { SponsorBoard } from "@/components/sponsor-board";

export default function HomePage() {
  return (
    <main>
      <HomeDiscovery />
      <SponsorBoard />
      <section className="border-t border-ink/10 px-5 py-20 sm:px-8 sm:py-24">
        <div className="mx-auto grid max-w-7xl gap-8 rounded-[2rem] border border-ink/12 bg-coral px-7 py-10 sm:px-10 md:grid-cols-[1fr_auto] md:items-center md:py-12">
          <div>
            <p className="text-xs font-bold tracking-[0.15em] text-[#10291f] uppercase">
              Know a good one?
            </p>
            <h2 className="mt-3 max-w-2xl font-display text-4xl leading-none font-semibold tracking-[-0.035em] sm:text-5xl">
              A useful bot deserves a path out of the group chat.
            </h2>
          </div>
          <Link
            href="/submit"
            className="inline-flex h-13 w-fit items-center gap-2 rounded-full bg-ink px-6 text-sm font-bold text-paper transition-transform hover:-translate-y-0.5"
          >
            Share its x.ai link <ArrowRight className="size-4" />
          </Link>
        </div>
      </section>
    </main>
  );
}
