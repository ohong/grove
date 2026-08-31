import { Button, Heading, Text } from "@radix-ui/themes";
import Link from "next/link";

export default function NotFound() {
  return (
    <main className="mx-auto max-w-lg px-4 py-20 text-center">
      <Text size="1" color="gray" weight="medium">
        404
      </Text>
      <Heading as="h1" size="7" weight="medium" highContrast className="mt-2">
        Page not found
      </Heading>
      <Text as="p" size="2" color="gray" className="mt-3">
        The page may have moved, or the bot is no longer in the directory.
      </Text>
      <Button asChild size="2" highContrast className="mt-6">
        <Link href="/">Back to Grove</Link>
      </Button>
    </main>
  );
}
