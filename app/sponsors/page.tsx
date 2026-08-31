import type { Metadata } from "next";
import { ArrowDown, BadgeDollarSign, Check, TrendingUp } from "lucide-react";

import { SponsorBoard } from "@/components/sponsor-board";
import { SponsorClaimForm } from "@/components/sponsor-claim-form";
import { getSponsorSlot } from "@/lib/sponsors";

export const metadata: Metadata = {
  title: "Sponsor Grove",
  description:
    "Ten transparent sponsor slots, starting at $200 and doubling with each successive slot.",
};

export default async function SponsorsPage({
  searchParams,
}: {
  searchParams: Promise<{ slot?: string | string[] }>;
}) {
  const requested = (await searchParams).slot;
  const requestedNumber = Number(Array.isArray(requested) ? requested[0] : requested);
  const requestedSlot = getSponsorSlot(requestedNumber);
  const initialSlot = requestedSlot?.status === "open" ? requestedSlot.slot : 2;

  return (
    <main>
      <section className="overflow-hidden border-b border-ink/10">
        <div className="mx-auto grid max-w-7xl gap-12 px-5 py-14 sm:px-8 sm:py-20 lg:grid-cols-[1.05fr_0.95fr] lg:items-end lg:py-24">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-ink/12 bg-sun/35 px-3.5 py-2 text-xs font-bold tracking-[0.11em] text-ink-soft uppercase">
              <BadgeDollarSign className="size-3.5" /> 10 slots · public pricing
            </span>
            <h1 className="mt-7 max-w-3xl font-display text-[4rem] leading-[0.9] font-semibold tracking-[-0.052em] sm:text-[5.5rem]">
              Small board.
              <br />
              <span className="text-leaf italic">Big commitment.</span>
            </h1>
          </div>
          <div className="max-w-lg lg:justify-self-end">
            <p className="text-lg leading-8 text-ink-soft">
              Grove has exactly ten homepage sponsor plots. Slot 01 began at
              $200; every next slot costs twice the one before it. No auctions,
              mystery rates, or pretend scarcity.
            </p>
            <a
              href="#slots"
              className="mt-6 inline-flex items-center gap-2 text-sm font-bold"
            >
              See all ten prices <ArrowDown className="size-4" />
            </a>
          </div>
        </div>
      </section>

      <section id="slots" className="scroll-mt-24 bg-paper-deep/55 px-5 py-20 sm:px-8 sm:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="mb-9 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-xs font-bold tracking-[0.15em] text-leaf uppercase">
                The full ladder
              </p>
              <h2 className="mt-3 font-display text-4xl font-semibold tracking-[-0.035em] sm:text-5xl">
                Pick your plot.
              </h2>
            </div>
            <p className="max-w-sm text-sm leading-6 text-ink-soft">
              Slot 01 is sold to Startups.RIP. Open slots link directly to the
              claim form below.
            </p>
          </div>
          <SponsorBoard variant="full" />
        </div>
      </section>

      <section className="border-y border-ink/10 bg-ink px-5 py-10 text-paper sm:px-8">
        <div className="mx-auto grid max-w-7xl gap-6 sm:grid-cols-3">
          <div className="flex gap-3">
            <Check className="mt-0.5 size-5 shrink-0 text-lime" />
            <p className="text-sm leading-6 text-paper/70">
              One-time slot price, shown in full before you ask.
            </p>
          </div>
          <div className="flex gap-3">
            <TrendingUp className="mt-0.5 size-5 shrink-0 text-lime" />
            <p className="text-sm leading-6 text-paper/70">
              The ladder doubles by slot, exactly as published.
            </p>
          </div>
          <div className="flex gap-3">
            <BadgeDollarSign className="mt-0.5 size-5 shrink-0 text-lime" />
            <p className="text-sm leading-6 text-paper/70">
              Claim requests collect no card and make no charge.
            </p>
          </div>
        </div>
      </section>

      <section id="claim" className="scroll-mt-24 px-5 py-20 sm:px-8 sm:py-24">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <div>
            <p className="text-xs font-bold tracking-[0.15em] text-leaf uppercase">
              No Stripe keys yet
            </p>
            <h2 className="mt-4 font-display text-4xl leading-none font-semibold tracking-[-0.035em] sm:text-5xl">
              Raise your hand.
              <br />
              Keep your card.
            </h2>
            <p className="mt-6 max-w-md text-base leading-7 text-ink-soft">
              Until checkout is configured, this form records a clear purchase
              intent: brand, URL, email, chosen slot, and the published price.
              It never claims a payment happened.
            </p>
          </div>
          <SponsorClaimForm initialSlot={initialSlot} />
        </div>
      </section>
    </main>
  );
}
