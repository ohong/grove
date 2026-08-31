import { Badge, Box, Flex, Heading, Text } from "@radix-ui/themes";
import Link from "next/link";

import { BotAvatar } from "@/components/bot-avatar";
import type { GroveBot } from "@/lib/bots";

export function BotCard({ bot }: { bot: GroveBot }) {
  return (
    <article className="relative rounded-[var(--radius-3)] border border-[var(--gray-a5)] bg-[var(--color-panel-solid)] p-4">
      <Flex align="start" gap="3">
        <BotAvatar name={bot.name} size="md" />
        <Box minWidth="0" className="flex-1">
          <Heading as="h3" size="3" weight="medium" highContrast>
            <Link href={`/b/${bot.slug}`} className="after:absolute after:inset-0">
              {bot.name}
            </Link>
          </Heading>
          <Text as="p" size="1" color="gray" className="mt-0.5">
            {bot.creator}
          </Text>
        </Box>
      </Flex>
      <Text as="p" size="2" color="gray" className="mt-3 line-clamp-2 leading-5">
        {bot.description}
      </Text>
      <Flex gap="1" wrap="wrap" className="mt-3">
        {bot.tags.slice(0, 3).map((tag) => (
          <Badge key={tag} color="gray" variant="soft" size="1" highContrast={false}>
            {tag}
          </Badge>
        ))}
      </Flex>
    </article>
  );
}
