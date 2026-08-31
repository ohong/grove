import { Flex, Text } from "@radix-ui/themes";
import Link from "next/link";

export function GroveMark({ className = "size-6" }: { className?: string }) {
  return (
    <svg aria-hidden="true" className={className} viewBox="0 0 24 24" fill="none">
      <rect width="24" height="24" rx="4" fill="var(--gray-12)" />
      <path
        d="M7.5 16.5h9M12 16.5V8.75M12 11.25c-2.4 0-4.35-1.6-4.35-3.6C10.05 7.65 12 9.25 12 11.25Zm0-2.4c0-2.2 1.85-4 4.15-4 0 2.2-1.85 4-4.15 4Z"
        stroke="var(--gray-1)"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function GroveLogo({ compact = false }: { compact?: boolean }) {
  return (
    <Link href="/" aria-label="Grove home">
      <Flex align="center" gap="2">
        <GroveMark />
        {!compact && (
          <Text size="4" weight="medium" highContrast>
            Grove
          </Text>
        )}
      </Flex>
    </Link>
  );
}
