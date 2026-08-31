import { ArrowLeft, SearchX } from "lucide-react";
import Link from "next/link";

export default function NotFound() {
  return (
    <main className="px-5 py-24 sm:px-8 sm:py-32">
      <div className="mx-auto max-w-2xl rounded-[2rem] border border-ink/12 bg-white/55 px-6 py-16 text-center shadow-[0_20px_60px_rgb(24_59_45/8%)] sm:px-12">
        <span className="mx-auto flex size-14 items-center justify-center rounded-2xl bg-paper-deep text-leaf">
          <SearchX className="size-6" />
        </span>
        <p className="mt-7 text-xs font-bold tracking-[0.15em] text-leaf uppercase">
          404 · Not in this grove
        </p>
        <h1 className="mt-4 font-display text-5xl leading-none font-semibold tracking-[-0.04em]">
          This path has gone wild.
        </h1>
        <p className="mx-auto mt-5 max-w-md text-sm leading-6 text-ink-soft">
          The page may have moved, or the bot link may no longer be part of the
          directory.
        </p>
        <Link
          href="/"
          className="mt-8 inline-flex items-center gap-2 rounded-full bg-ink px-5 py-3 text-sm font-bold text-paper"
        >
          <ArrowLeft className="size-4" /> Back to Grove
        </Link>
      </div>
    </main>
  );
}
