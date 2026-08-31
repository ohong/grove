import type { Metadata } from "next";
import { BadgeCheck, Eye, Link2, ShieldCheck } from "lucide-react";

import { SubmitBotForm } from "@/components/submit-bot-form";

export const metadata: Metadata = {
  title: "Share a Grok Bot",
  description:
    "Paste a public x.ai/bot link. Grove reads its public preview and puts it in the review queue.",
};

const promises = [
  {
    icon: Link2,
    title: "One link is enough",
    copy: "No duplicate name or description fields to babysit.",
  },
  {
    icon: Eye,
    title: "Preview before submit",
    copy: "See exactly what x.ai made public before anything is recorded.",
  },
  {
    icon: ShieldCheck,
    title: "Source stays canonical",
    copy: "Grove points people back to the original x.ai template.",
  },
];

export default function SubmitPage() {
  return (
    <main>
      <section className="mx-auto grid max-w-7xl gap-12 px-5 py-14 sm:px-8 sm:py-20 lg:grid-cols-[0.78fr_1.22fr] lg:gap-20 lg:py-24">
        <div>
          <span className="inline-flex items-center gap-2 rounded-full border border-ink/12 bg-lime/35 px-3.5 py-2 text-xs font-bold tracking-[0.11em] text-leaf uppercase">
            <BadgeCheck className="size-3.5" /> Public previews only
          </span>
          <h1 className="mt-7 font-display text-[3.9rem] leading-[0.92] font-semibold tracking-[-0.05em] sm:text-[5rem]">
            Share the link.
            <br />
            <span className="text-leaf italic">Keep the credit.</span>
          </h1>
          <p className="mt-7 max-w-lg text-lg leading-8 text-ink-soft">
            If a Grok Bot is genuinely useful, help it travel. Grove reads the
            public x.ai preview and keeps its creator and source attached.
          </p>

          <div className="mt-12 space-y-7 border-t border-ink/12 pt-8">
            {promises.map((item) => (
              <div key={item.title} className="flex gap-4">
                <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-paper-deep text-leaf">
                  <item.icon className="size-4.5" />
                </span>
                <div>
                  <p className="text-sm font-bold">{item.title}</p>
                  <p className="mt-1 text-sm leading-6 text-ink-soft">{item.copy}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="lg:pt-4">
          <SubmitBotForm />
        </div>
      </section>
    </main>
  );
}
