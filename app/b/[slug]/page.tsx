import type { Metadata } from "next";
import {
  Badge,
  Card,
  Flex,
  Heading,
  Link as RadixLink,
  Text,
} from "@radix-ui/themes";
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
      <section className="mx-auto max-w-[1136px] px-4 py-8 lg:py-12">
        <RadixLink asChild size="2" color="gray">
          <Link href="/#discover">← Directory</Link>
        </RadixLink>

        <div className="mt-6 grid gap-10 lg:grid-cols-[1fr_18rem] lg:gap-14">
          <div>
            <Flex align="start" gap="4">
              <BotAvatar name={bot.name} size="xl" />
              <div>
                <Flex gap="2" wrap="wrap" align="center">
                  <Badge color="gray" variant="soft" size="1">
                    {bot.category}
                  </Badge>
                  <Text size="1" color="gray">
                    {bot.role}
                  </Text>
                </Flex>
                <Heading as="h1" size="8" weight="medium" highContrast className="mt-2 tracking-tight">
                  {bot.name}
                </Heading>
                <Text as="p" size="2" color="gray" className="mt-2">
                  {bot.creator}
                </Text>
              </div>
            </Flex>

            <MobileAddButton name={bot.name} slug={bot.slug} addUrl={bot.addUrl} />

            <Text as="p" size="3" className="mt-8 max-w-2xl leading-7" highContrast>
              {bot.description}
            </Text>
            <Flex gap="1" wrap="wrap" className="mt-5">
              {bot.tags.map((tag) => (
                <Badge key={tag} color="gray" variant="soft" size="1">
                  {tag}
                </Badge>
              ))}
            </Flex>

            <div className="mt-10 grid gap-3 sm:grid-cols-2">
              <Card size="2">
                <Text as="p" size="2" weight="medium" highContrast>
                  Review before connecting
                </Text>
                <Text as="p" size="2" color="gray" className="mt-2">
                  This is a third-party template. Read its public preview and
                  review requested tools before you connect accounts.
                </Text>
              </Card>
              <Card size="2" asChild>
                <a href={bot.sourceUrl} target="_blank" rel="noreferrer">
                  <Text as="p" size="2" weight="medium" highContrast>
                    Open source preview
                  </Text>
                  <Text as="p" size="2" color="gray" className="mt-2">
                    Confirm the original creator, description, and template on
                    x.ai.
                  </Text>
                </a>
              </Card>
            </div>
          </div>

          <aside>
            <Card size="2" className="lg:sticky lg:top-6">
              <Heading as="h2" size="4" weight="medium" highContrast>
                Add {bot.name}
              </Heading>
              <Text as="p" size="2" color="gray" className="mt-2">
                Opens the official Grok Bot import link on this device.
              </Text>
              <div className="mt-5">
                <BotActions slug={bot.slug} addUrl={bot.addUrl} initialStats={stats} />
              </div>
              <div className="mt-4 rounded-[var(--radius-2)] bg-[var(--gray-a2)] px-3 py-2">
                <Text as="p" size="1" color="gray">
                  Template ID
                </Text>
                <Text as="p" size="1" className="mt-0.5 truncate font-mono" highContrast>
                  {bot.id}
                </Text>
              </div>
            </Card>
          </aside>
        </div>
      </section>

      <section className="border-t border-[var(--gray-a5)]">
        <div className="mx-auto max-w-[1136px] px-4 py-10">
          <Flex align="baseline" justify="between" gap="4">
            <Heading as="h2" size="4" weight="medium" highContrast>
              More bots
            </Heading>
            <RadixLink asChild size="2" color="gray">
              <Link href="/#discover">View all</Link>
            </RadixLink>
          </Flex>
          <div className="mt-5 grid gap-3 md:grid-cols-2">
            {related.map((item) => (
              <BotCard key={item.id} bot={item} />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
