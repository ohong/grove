import { ArrowUpRight, Check, MoveUpRight } from "lucide-react";
import Link from "next/link";

import { formatPrice, sponsorSlots } from "@/lib/sponsors";

export function SponsorBoard({ variant = "home" }: { variant?: "home" | "full" }) {
  if (variant === "full") {
    return (
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
        {sponsorSlots.map((item) => {
          const content = (
            <>
              <div className="flex items-center justify-between gap-3">
                <span className="font-mono text-xs font-bold text-ink/45">
                  SLOT {String(item.slot).padStart(2, "0")}
                  {item.status === "sold" && ` · ${formatPrice(item.price)}`}
                </span>
                {item.status === "sold" ? (
                  <span className="inline-flex items-center gap-1 rounded-full bg-ink px-2.5 py-1 text-[0.62rem] font-bold tracking-[0.1em] text-paper uppercase">
                    <Check className="size-3" /> Sold
                  </span>
                ) : (
                  <MoveUpRight className="size-4 text-ink/35 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                )}
              </div>
              <div className="mt-12">
                {item.sponsor ? (
                  <>
                    <p className="font-display text-2xl leading-none font-semibold">
                      {item.sponsor.name}
                    </p>
                    <p className="mt-3 text-xs leading-5 text-ink-soft">
                      {item.sponsor.tagline}
                    </p>
                  </>
                ) : (
                  <>
                    <p className="font-display text-3xl leading-none font-semibold tracking-[-0.03em]">
                      {formatPrice(item.price)}
                    </p>
                    <p className="mt-3 text-xs text-ink-soft">Available now</p>
                  </>
                )}
              </div>
            </>
          );

          const classes = `group card-lift flex min-h-52 flex-col justify-between rounded-[1.4rem] border p-5 ${
            item.status === "sold"
              ? "border-leaf/25 bg-lime/45"
              : "border-ink/12 bg-white/55 hover:border-leaf/45"
          }`;

          return item.sponsor ? (
            <a
              key={item.slot}
              href={item.sponsor.url}
              target="_blank"
              rel="noreferrer"
              className={classes}
            >
              {content}
            </a>
          ) : (
            <Link
              key={item.slot}
              href={`/sponsors?slot=${item.slot}#claim`}
              className={classes}
            >
              {content}
            </Link>
          );
        })}
      </div>
    );
  }

  return (
    <section className="bg-paper px-5 py-20 sm:px-8 sm:py-24">
      <div className="mx-auto max-w-7xl overflow-hidden rounded-[2.25rem] bg-ink text-paper shadow-[0_28px_80px_rgb(24_59_45/15%)]">
        <div className="grid gap-8 border-b border-paper/12 px-6 py-8 sm:px-10 sm:py-10 lg:grid-cols-[1fr_auto] lg:items-end">
          <div>
            <p className="text-xs font-bold tracking-[0.16em] text-lime uppercase">
              The sponsor grove
            </p>
            <h2 className="mt-3 max-w-2xl font-display text-4xl leading-[0.98] font-semibold tracking-[-0.035em] sm:text-5xl">
              Ten slots. Each one doubles.
            </h2>
            <p className="mt-4 max-w-xl text-sm leading-6 text-paper/62 sm:text-base">
              A transparent, permanent price ladder. Slot 01 is planted;
              nine are open.
            </p>
          </div>
          <Link
            href="/sponsors"
            className="inline-flex h-12 w-fit items-center gap-2 rounded-full bg-lime px-5 text-sm font-bold text-ink transition-transform hover:-translate-y-0.5"
          >
            See sponsor details <ArrowUpRight className="size-4" />
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5">
          {sponsorSlots.map((item) => {
            const tileClass = `group relative min-h-44 border-r border-b border-paper/12 p-5 transition-colors sm:min-h-48 ${
              item.status === "sold"
                ? "bg-lime text-ink"
                : "hover:bg-paper/[0.07]"
            }`;
            const tile = (
              <>
                <div className="flex items-center justify-between gap-2">
                  <span className={`font-mono text-[0.65rem] font-bold tracking-[0.08em] ${item.status === "sold" ? "text-ink/80" : "text-paper/65"}`}>
                    {String(item.slot).padStart(2, "0")}
                    {item.status === "sold" && ` · ${formatPrice(item.price)}`}
                  </span>
                  {item.status === "sold" ? (
                    <span className="rounded-full bg-ink px-2 py-1 text-[0.58rem] font-bold tracking-wider text-paper uppercase">
                      Sold
                    </span>
                  ) : (
                    <ArrowUpRight className="size-3.5 text-paper/30 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-lime" />
                  )}
                </div>
                <div className="absolute right-5 bottom-5 left-5">
                  {item.sponsor ? (
                    <>
                      <p className="font-display text-xl leading-none font-semibold sm:text-2xl">
                        {item.sponsor.name}
                      </p>
                      <p className="mt-2 line-clamp-2 text-[0.68rem] leading-4 text-ink/80">
                        {item.sponsor.tagline}
                      </p>
                    </>
                  ) : (
                    <>
                      <p className="font-display text-xl leading-none font-semibold tracking-[-0.02em] sm:text-2xl">
                        {formatPrice(item.price)}
                      </p>
                      <p className="mt-2 text-[0.66rem] font-bold tracking-[0.1em] text-paper/65 uppercase">
                        Open slot
                      </p>
                    </>
                  )}
                </div>
              </>
            );

            return item.sponsor ? (
              <a
                key={item.slot}
                href={item.sponsor.url}
                target="_blank"
                rel="noreferrer"
                className={tileClass}
              >
                {tile}
              </a>
            ) : (
              <Link
                key={item.slot}
                href={`/sponsors?slot=${item.slot}#claim`}
                className={tileClass}
              >
                {tile}
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
