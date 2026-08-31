export function BotAvatar({
  name,
  size = "md",
}: {
  name: string;
  accent?: string;
  shape?: string;
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
}) {
  const sizes = {
    sm: "size-8 text-[11px]",
    md: "size-9 text-xs",
    lg: "size-11 text-sm",
    xl: "size-14 text-base",
  };

  const initial = name.trim().charAt(0).toUpperCase() || "G";

  return (
    <span
      aria-hidden="true"
      className={`inline-flex shrink-0 items-center justify-center rounded-[var(--radius-2)] border border-[var(--gray-a5)] bg-[var(--gray-3)] font-medium text-[var(--gray-12)] ${sizes[size]}`}
    >
      {initial}
    </span>
  );
}
