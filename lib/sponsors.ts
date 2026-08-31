export type SponsorSlot = {
  slot: number;
  price: number;
  status: "sold" | "open";
  sponsor?: {
    name: string;
    url: string;
    tagline: string;
  };
};

export const sponsorSlots: SponsorSlot[] = Array.from(
  { length: 10 },
  (_, index) => {
    const slot = index + 1;

    if (slot === 1) {
      return {
        slot,
        price: 200,
        status: "sold" as const,
        sponsor: {
          name: "Startups.RIP",
          url: "https://www.startups.rip/",
          tagline: "Dead YC startups, alive ideas.",
        },
      };
    }

    return {
      slot,
      price: 200 * 2 ** index,
      status: "open" as const,
    };
  },
);

export function formatPrice(price: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(price);
}

export function getSponsorSlot(slot: number) {
  return sponsorSlots.find((item) => item.slot === slot);
}
