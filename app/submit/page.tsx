import type { Metadata } from "next";
import { Heading, Text } from "@radix-ui/themes";

import { SubmitBotForm } from "@/components/submit-bot-form";

export const metadata: Metadata = {
  title: "Submit a Grok Bot",
  description:
    "Paste a public x.ai/bot link. Grove reads its public preview and puts it in the review queue.",
};

export default function SubmitPage() {
  return (
    <main className="mx-auto grid max-w-[1136px] gap-10 px-4 py-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16 lg:py-14">
      <div>
        <Heading as="h1" size="8" weight="medium" highContrast>
          Submit a bot
        </Heading>
        <Text as="p" size="3" color="gray" className="mt-3 max-w-md">
          Paste a public x.ai/bot URL. Grove reads the preview and keeps the
          creator and source attached.
        </Text>
        <ul className="mt-8 space-y-4 border-t border-[var(--gray-a5)] pt-6">
          {[
            ["One link", "No extra name or description fields to babysit."],
            ["Preview first", "See what x.ai made public before anything is recorded."],
            ["Source stays canonical", "Listings point back to the original template."],
          ].map(([title, copy]) => (
            <li key={title}>
              <Text as="p" size="2" weight="medium" highContrast>
                {title}
              </Text>
              <Text as="p" size="2" color="gray" className="mt-1">
                {copy}
              </Text>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <SubmitBotForm />
      </div>
    </main>
  );
}
