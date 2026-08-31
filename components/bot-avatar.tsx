import type { BotShape } from "@/lib/bots";

const shapeClasses: Record<BotShape, string> = {
  blob: "rounded-[38%_62%_55%_45%/44%_42%_58%_56%]",
  teardrop: "rounded-[52%_48%_48%_12%] rotate-[-5deg]",
  gem: "[clip-path:polygon(50%_0%,94%_25%,86%_79%,50%_100%,14%_79%,6%_25%)]",
  hex: "[clip-path:polygon(25%_7%,75%_7%,100%_50%,75%_93%,25%_93%,0%_50%)]",
};

export function BotAvatar({
  accent,
  shape,
  size = "md",
  className = "",
}: {
  accent: string;
  shape: BotShape;
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
}) {
  const sizes = {
    sm: "size-10",
    md: "size-14",
    lg: "size-20",
    xl: "size-28 sm:size-32",
  };

  return (
    <span
      aria-hidden="true"
      className={`relative inline-flex shrink-0 items-center justify-center overflow-hidden shadow-[inset_0_-8px_18px_rgb(0_0_0/12%)] ${sizes[size]} ${shapeClasses[shape]} ${className}`}
      style={{ backgroundColor: accent }}
    >
      <span className="absolute top-[28%] left-[27%] h-[31%] w-[15%] rounded-full bg-white/95" />
      <span className="absolute top-[28%] right-[27%] h-[31%] w-[15%] rounded-full bg-white/95" />
      <span className="absolute right-[18%] bottom-[12%] size-[14%] rounded-full bg-white/30" />
    </span>
  );
}
