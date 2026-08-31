import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

import { GroveLogo } from "@/components/grove-logo";

export function SiteFooter() {
  return (
    <footer className="border-t border-ink/10 bg-paper-deep/70">
      <div className="mx-auto grid max-w-7xl gap-12 px-5 py-12 sm:px-8 md:grid-cols-[1.4fr_1fr_1fr] md:py-16">
        <div>
          <GroveLogo />
          <p className="mt-5 max-w-sm text-sm leading-6 text-ink-soft">
            A careful directory of public Grok Bot templates. Source-first,
            useful by default, and refreshingly free of made-up numbers.
          </p>
        </div>
        <div>
          <p className="text-xs font-bold tracking-[0.16em] text-ink/50 uppercase">
            Explore
          </p>
          <div className="mt-4 flex flex-col gap-3 text-sm font-medium">
            <Link href="/#discover" className="hover:text-leaf">
              Discover bots
            </Link>
            <Link href="/submit" className="hover:text-leaf">
              Share a bot
            </Link>
            <Link href="/sponsors" className="hover:text-leaf">
              Sponsor Grove
            </Link>
          </div>
        </div>
        <div>
          <p className="text-xs font-bold tracking-[0.16em] text-ink/50 uppercase">
            Small print
          </p>
          <div className="mt-4 flex flex-col gap-3 text-sm font-medium">
            <Link href="/about" className="hover:text-leaf">
              How Grove works
            </Link>
            <a
              href="https://x.ai/bot"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 hover:text-leaf"
            >
              Get Grok Bot <ArrowUpRight className="size-3.5" />
            </a>
          </div>
        </div>
      </div>
      <div className="border-t border-ink/10">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-5 py-5 text-xs text-ink/55 sm:flex-row sm:items-center sm:justify-between sm:px-8">
          <span>© {new Date().getFullYear()} Grove</span>
          <span>Independent and not affiliated with xAI.</span>
        </div>
      </div>
    </footer>
  );
}
