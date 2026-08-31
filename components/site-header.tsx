import { ArrowUpRight, Menu, X } from "lucide-react";
import Link from "next/link";

import { GroveLogo } from "@/components/grove-logo";

const navItems = [
  { href: "/#discover", label: "Discover" },
  { href: "/sponsors", label: "Sponsors" },
  { href: "/about", label: "About" },
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-ink/10 bg-paper/90 backdrop-blur-xl">
      <div className="mx-auto flex h-[72px] max-w-7xl items-center justify-between px-5 sm:px-8">
        <GroveLogo />

        <nav className="hidden items-center gap-8 md:flex" aria-label="Primary">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-ink-soft transition-colors hover:text-ink"
            >
              {item.label}
            </Link>
          ))}
          <Link
            href="/submit"
            className="inline-flex h-11 items-center gap-2 rounded-full bg-ink px-5 text-sm font-semibold text-paper transition-transform hover:-translate-y-0.5"
          >
            Share a bot
            <ArrowUpRight className="size-4" />
          </Link>
        </nav>

        <details className="group relative md:hidden">
          <summary className="flex size-11 list-none items-center justify-center rounded-full border border-ink/15 bg-white/55" aria-label="Open menu">
            <Menu className="size-5 group-open:hidden" />
            <X className="hidden size-5 group-open:block" />
          </summary>
          <nav
            className="absolute top-14 right-0 flex w-56 flex-col rounded-2xl border border-ink/10 bg-paper p-2 shadow-[0_18px_50px_rgb(24_59_45/16%)]"
            aria-label="Mobile"
          >
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-xl px-4 py-3 text-sm font-medium hover:bg-paper-deep"
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="/submit"
              className="mt-1 flex items-center justify-between rounded-xl bg-ink px-4 py-3 text-sm font-semibold text-paper"
            >
              Share a bot
              <ArrowUpRight className="size-4" />
            </Link>
          </nav>
        </details>
      </div>
    </header>
  );
}
