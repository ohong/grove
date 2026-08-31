import type { Metadata } from "next";
import { Heading, Text } from "@radix-ui/themes";

import { SponsorBoard } from "@/components/sponsor-board";
import { SponsorClaimForm } from "@/components/sponsor-claim-form";
import { getSponsorSlot } from "@/lib/sponsors";

export const metadata: Metadata = {
  title: "Sponsors",
  description:
    "Ten sponsor slots, starting at $200 and doubling with each successive slot.",
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
      <section className="mx-auto max-w-[1136px] px-4 py-10 lg:py-14">
        <Heading as="h1" size="8" weight="medium" highContrast>
          Ten slots. Each one doubles.
        </Heading>
        <Text as="p" size="3" color="gray" className="mt-3 max-w-xl">
          Slot 01 started at $200. Every next slot costs twice the one before
          it. Slot 01 is sold to Startups.RIP. No auctions or unpublished rates.
        </Text>
      </section>

      <section id="slots" className="mx-auto max-w-[1136px] scroll-mt-16 px-4 pb-10">
        <SponsorBoard variant="full" />
        <div className="mt-4 grid gap-3 text-[13px] text-[var(--gray-11)] sm:grid-cols-3">
          <p>One-time slot price, shown before you ask.</p>
          <p>The ladder doubles by slot, as published.</p>
          <p>Claim requests collect no card and make no charge.</p>
        </div>
      </section>

      <section
        id="claim"
        className="mx-auto grid max-w-[1136px] scroll-mt-16 gap-10 px-4 py-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16 lg:py-14"
      >
        <div>
          <Heading as="h2" size="6" weight="medium" highContrast>
            Record interest
          </Heading>
          <Text as="p" size="2" color="gray" className="mt-3 max-w-md">
            Until checkout is configured, this form records brand, URL, email,
            chosen slot, and the published price. It never claims a payment
            happened.
          </Text>
        </div>
        <SponsorClaimForm initialSlot={initialSlot} />
      </section>
    </main>
  );
}
