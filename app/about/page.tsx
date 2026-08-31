import type { Metadata } from "next";
import { Button, Heading, Link as RadixLink, Table, Text } from "@radix-ui/themes";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About",
  description:
    "Why Grove exists, how public Grok Bot templates are listed, and what its engagement numbers mean.",
};

const principles = [
  {
    number: "01",
    title: "The source wins",
    copy: "A Grove page is a doorway, not a replacement. Every bot keeps a direct line back to its public x.ai template and named creator.",
  },
  {
    number: "02",
    title: "Discovery beats virality",
    copy: "Search by the job, tool, or maker. A good bot should stay findable after the post that launched it disappears down the feed.",
  },
  {
    number: "03",
    title: "Honest signal only",
    copy: "No invented installs, seeded likes, or copied engagement. If Grove cannot measure a thing directly, Grove does not present it as a metric.",
  },
];

export default function AboutPage() {
  return (
    <main>
      <section className="mx-auto max-w-[1136px] px-4 py-10 lg:py-14">
        <Heading as="h1" size="8" weight="medium" highContrast className="max-w-2xl tracking-tight">
          A directory for public Grok Bot templates.
        </Heading>
        <Text as="p" size="3" color="gray" className="mt-4 max-w-xl">
          Sharing a bot today is a public link plus a post and some luck. Grove
          adds a small, searchable catalog—and nothing else.
        </Text>
      </section>

      <section className="border-y border-[var(--gray-a5)]">
        <div className="mx-auto grid max-w-[1136px] gap-8 px-4 py-10 md:grid-cols-3">
          {principles.map((item) => (
            <article key={item.number}>
              <Text size="1" color="gray" className="font-mono">
                {item.number}
              </Text>
              <Heading as="h2" size="4" weight="medium" highContrast className="mt-2">
                {item.title}
              </Heading>
              <Text as="p" size="2" color="gray" className="mt-2">
                {item.copy}
              </Text>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-[1136px] px-4 py-10 lg:py-14">
        <Heading as="h2" size="6" weight="medium" highContrast>
          From link to listing
        </Heading>
        <ol className="mt-6 border-t border-[var(--gray-a5)]">
          {[
            ["Paste", "Share a public URL in the exact x.ai/bot/{id} format."],
            [
              "Verify",
              "Grove fetches the public preview and shows the name, creator, and description before submission.",
            ],
            [
              "Discover",
              "After review, the bot gets a searchable page with a direct import link and its source intact.",
            ],
          ].map(([step, copy], index) => (
            <li
              key={step}
              className="grid gap-2 border-b border-[var(--gray-a5)] py-5 sm:grid-cols-[3rem_7rem_1fr] sm:items-baseline"
            >
              <Text size="2" color="gray" className="font-mono">
                {String(index + 1).padStart(2, "0")}
              </Text>
              <Text size="2" weight="medium" highContrast>
                {step}
              </Text>
              <Text size="2" color="gray">
                {copy}
              </Text>
            </li>
          ))}
        </ol>
      </section>

      <section className="mx-auto max-w-[1136px] px-4 pb-10 lg:pb-14">
        <Heading as="h2" size="6" weight="medium" highContrast>
          What the numbers mean
        </Heading>
        <Text as="p" size="2" color="gray" className="mt-3 max-w-lg">
          Counts start at zero. Grove only reports interactions it receives; it
          does not claim access to x.ai install telemetry.
        </Text>
        <div className="mt-6 overflow-hidden rounded-[var(--radius-3)] border border-[var(--gray-a5)]">
          <Table.Root size="2">
            <Table.Header>
              <Table.Row>
                <Table.ColumnHeaderCell>Label</Table.ColumnHeaderCell>
                <Table.ColumnHeaderCell>Source</Table.ColumnHeaderCell>
                <Table.ColumnHeaderCell>Meaning</Table.ColumnHeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              <Table.Row>
                <Table.RowHeaderCell>Add clicks</Table.RowHeaderCell>
                <Table.Cell>Grove event log</Table.Cell>
                <Table.Cell>
                  Clicks on the official Grok Bot import action—not confirmed
                  installs.
                </Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.RowHeaderCell>Likes</Table.RowHeaderCell>
                <Table.Cell>Grove event log</Table.Cell>
                <Table.Cell>Current unique browser likes recorded on Grove.</Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.RowHeaderCell>Listed</Table.RowHeaderCell>
                <Table.Cell>Public x.ai preview</Table.Cell>
                <Table.Cell>
                  The source returned a readable public name and description.
                </Table.Cell>
              </Table.Row>
            </Table.Body>
          </Table.Root>
        </div>
      </section>

      <section className="mx-auto flex max-w-[1136px] flex-col gap-4 px-4 pb-14 sm:flex-row sm:items-center sm:justify-between">
        <Text size="3" highContrast>
          Have a public template?{" "}
          <RadixLink asChild>
            <Link href="/submit">Submit it.</Link>
          </RadixLink>
        </Text>
        <Button asChild size="2" highContrast>
          <Link href="/submit">Submit a bot</Link>
        </Button>
      </section>
    </main>
  );
}
