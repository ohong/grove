import Link from "next/link";

export function GroveMark({ className = "size-9" }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      viewBox="0 0 40 40"
      fill="none"
    >
      <rect width="40" height="40" rx="12" fill="#183B2D" />
      <path
        d="M20 30V17.5M20 21.5C16 21.5 12.75 18.8 12.75 15.45C16.75 15.45 20 18.15 20 21.5ZM20 17.5C20 13.75 23.15 10.7 27.05 10.7C27.05 14.45 23.9 17.5 20 17.5Z"
        stroke="#D4F63F"
        strokeWidth="2.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M14.5 30h11"
        stroke="#F7F8ED"
        strokeWidth="2.25"
        strokeLinecap="round"
      />
      <circle cx="28.5" cy="25.5" r="2.25" fill="#FF6F4D" />
    </svg>
  );
}

export function GroveLogo({ compact = false }: { compact?: boolean }) {
  return (
    <Link
      href="/"
      className="group inline-flex items-center gap-2.5 rounded-xl"
      aria-label="Grove home"
    >
      <GroveMark />
      {!compact && (
        <span className="font-display text-[1.7rem] leading-none font-semibold tracking-[-0.035em]">
          Grove
        </span>
      )}
    </Link>
  );
}
