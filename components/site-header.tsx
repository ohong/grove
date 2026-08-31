import { Button, Flex, Link as RadixLink } from "@radix-ui/themes";
import { Menu, X } from "lucide-react";
import Link from "next/link";

import { GroveLogo } from "@/components/grove-logo";

const navItems = [
  { href: "/#discover", label: "Bots" },
  { href: "/sponsors", label: "Sponsors" },
  { href: "/about", label: "About" },
];

export function SiteHeader() {
  return (
    <header className="border-b border-[var(--gray-a5)]">
      <div className="mx-auto flex h-14 max-w-[1136px] items-center justify-between px-4">
        <GroveLogo />

        <Flex align="center" gap="5" display={{ initial: "none", md: "flex" }} asChild>
          <nav aria-label="Primary">
            {navItems.map((item) => (
              <RadixLink key={item.href} asChild color="gray" underline="none" size="2" weight="medium">
                <Link href={item.href}>{item.label}</Link>
              </RadixLink>
            ))}
            <Button asChild size="2" highContrast>
              <Link href="/submit">Submit</Link>
            </Button>
          </nav>
        </Flex>

        <details className="group relative md:hidden">
          <summary
            className="flex size-8 list-none items-center justify-center rounded-[var(--radius-2)] border border-[var(--gray-a6)]"
            aria-label="Open menu"
          >
            <Menu className="size-4 group-open:hidden" />
            <X className="hidden size-4 group-open:block" />
          </summary>
          <nav
            className="absolute top-10 right-0 z-20 flex w-48 flex-col gap-1 rounded-[var(--radius-3)] border border-[var(--gray-a5)] bg-[var(--color-panel-solid)] p-2"
            aria-label="Mobile"
          >
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-[var(--radius-2)] px-3 py-2 text-[13px] text-[var(--gray-12)]"
              >
                {item.label}
              </Link>
            ))}
            <Button asChild size="2" highContrast className="mt-1">
              <Link href="/submit">Submit</Link>
            </Button>
          </nav>
        </details>
      </div>
    </header>
  );
}
