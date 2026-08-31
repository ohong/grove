import { Badge, Box, Flex, Grid, Heading, Link as RadixLink, Text } from "@radix-ui/themes";
import Link from "next/link";

import { formatPrice, sponsorSlots } from "@/lib/sponsors";

function SlotCell({ slot }: { slot: (typeof sponsorSlots)[number] }) {
  const label = String(slot.slot).padStart(2, "0");
  const inner = (
    <Flex direction="column" justify="between" className="h-full min-h-24 p-3">
      <Flex align="center" justify="between" gap="2">
        <Text size="1" color="gray" weight="medium">
          {label}
        </Text>
        {slot.status === "sold" ? (
          <Badge color="gray" variant="soft" size="1">
            Sold
          </Badge>
        ) : (
          <Text size="1" color="gray">
            Open
          </Text>
        )}
      </Flex>
      <Box>
        {slot.sponsor ? (
          <>
            <Text as="p" size="2" weight="medium" highContrast>
              {slot.sponsor.name}
            </Text>
            <Text as="p" size="1" color="gray" className="mt-1 line-clamp-2">
              {slot.sponsor.tagline}
            </Text>
          </>
        ) : (
          <Text as="p" size="3" weight="medium" highContrast>
            {formatPrice(slot.price)}
          </Text>
        )}
      </Box>
    </Flex>
  );

  const className =
    "block h-full border-r border-b border-[var(--gray-a5)] last:border-r-0 hover:bg-[var(--gray-a2)]";

  if (slot.sponsor) {
    return (
      <a href={slot.sponsor.url} target="_blank" rel="noreferrer" className={className}>
        {inner}
      </a>
    );
  }

  return (
    <Link href={`/sponsors?slot=${slot.slot}#claim`} className={className}>
      {inner}
    </Link>
  );
}

export function SponsorBoard({ variant = "home" }: { variant?: "home" | "full" }) {
  if (variant === "full") {
    return (
      <div className="overflow-hidden rounded-[var(--radius-3)] border border-[var(--gray-a5)]">
        <Grid columns={{ initial: "2", sm: "5" }} gap="0">
          {sponsorSlots.map((item) => (
            <SlotCell key={item.slot} slot={item} />
          ))}
        </Grid>
      </div>
    );
  }

  return (
    <section className="mx-auto max-w-[1136px] px-4 py-10">
      <Flex align="baseline" justify="between" gap="4" className="mb-4">
        <Heading as="h2" size="4" weight="medium" highContrast>
          Sponsors
        </Heading>
        <RadixLink asChild size="2" color="gray">
          <Link href="/sponsors">Ten slots, doubling prices</Link>
        </RadixLink>
      </Flex>
      <div className="overflow-hidden rounded-[var(--radius-3)] border border-[var(--gray-a5)]">
        <Grid columns={{ initial: "2", sm: "5" }} gap="0">
          {sponsorSlots.map((item) => (
            <SlotCell key={item.slot} slot={item} />
          ))}
        </Grid>
      </div>
    </section>
  );
}
