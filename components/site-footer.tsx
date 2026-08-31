import { Flex, Link as RadixLink, Separator, Text } from "@radix-ui/themes";
import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="mt-auto">
      <Separator size="4" />
      <div className="mx-auto flex max-w-[1136px] flex-col gap-3 px-4 py-5 sm:flex-row sm:items-center sm:justify-between">
        <Text size="1" color="gray">
          © {new Date().getFullYear()} Grove · Independent, not affiliated with xAI.
        </Text>
        <Flex gap="4" wrap="wrap">
          <RadixLink asChild size="1" color="gray" underline="none">
            <Link href="/#discover">Bots</Link>
          </RadixLink>
          <RadixLink asChild size="1" color="gray" underline="none">
            <Link href="/submit">Submit</Link>
          </RadixLink>
          <RadixLink asChild size="1" color="gray" underline="none">
            <Link href="/sponsors">Sponsors</Link>
          </RadixLink>
          <RadixLink asChild size="1" color="gray" underline="none">
            <Link href="/about">About</Link>
          </RadixLink>
          <RadixLink href="https://x.ai/bot" target="_blank" rel="noreferrer" size="1" color="gray" underline="none">
            Grok Bot
          </RadixLink>
        </Flex>
      </div>
    </footer>
  );
}
