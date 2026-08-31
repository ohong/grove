"use client";

import {
  ArrowRight,
  BadgeCheck,
  Check,
  ExternalLink,
  Link2,
  LoaderCircle,
  RotateCcw,
} from "lucide-react";
import Link from "next/link";
import { FormEvent, useState } from "react";

type Preview = {
  templateId: string;
  name: string;
  creator: string;
  description: string;
  sourceUrl: string;
};

type LookupResponse = {
  preview?: Preview;
  existingSlug?: string | null;
  error?: string;
};

export function SubmitBotForm() {
  const [link, setLink] = useState("");
  const [preview, setPreview] = useState<Preview | null>(null);
  const [existingSlug, setExistingSlug] = useState<string | null>(null);
  const [status, setStatus] = useState<
    "idle" | "looking" | "ready" | "submitting" | "done"
  >("idle");
  const [error, setError] = useState("");
  const [submissionId, setSubmissionId] = useState("");

  function resetPreview(nextLink: string) {
    setLink(nextLink);
    if (preview) {
      setPreview(null);
      setExistingSlug(null);
      setStatus("idle");
      setError("");
    }
  }

  async function inspectLink(event: FormEvent) {
    event.preventDefault();
    setStatus("looking");
    setError("");
    setPreview(null);
    setExistingSlug(null);

    try {
      const response = await fetch("/api/bots/lookup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ link }),
      });
      const result = (await response.json()) as LookupResponse;

      if (!response.ok || !result.preview) {
        throw new Error(result.error || "That preview could not be read.");
      }

      setPreview(result.preview);
      setExistingSlug(result.existingSlug ?? null);
      setStatus("ready");
    } catch (lookupError) {
      setError(
        lookupError instanceof Error
          ? lookupError.message
          : "That preview could not be read.",
      );
      setStatus("idle");
    }
  }

  async function submitBot() {
    setStatus("submitting");
    setError("");

    try {
      const response = await fetch("/api/bots/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ link }),
      });
      const result = (await response.json()) as {
        submissionId?: string;
        existingSlug?: string;
        error?: string;
      };

      if (!response.ok || !result.submissionId) {
        if (result.existingSlug) setExistingSlug(result.existingSlug);
        throw new Error(result.error || "This submission could not be saved.");
      }

      setSubmissionId(result.submissionId);
      setStatus("done");
    } catch (submitError) {
      setError(
        submitError instanceof Error
          ? submitError.message
          : "This submission could not be saved.",
      );
      setStatus("ready");
    }
  }

  if (status === "done" && preview) {
    return (
      <div className="rounded-[2rem] border border-leaf/25 bg-lime/45 p-7 sm:p-9" role="status">
        <span className="flex size-12 items-center justify-center rounded-full bg-ink text-lime">
          <Check className="size-6" strokeWidth={2.5} />
        </span>
        <p className="mt-7 text-xs font-bold tracking-[0.15em] text-ink/55 uppercase">
          Submission recorded
        </p>
        <h2 className="mt-3 font-display text-4xl leading-none font-semibold tracking-[-0.035em]">
          {preview.name} is in the review queue.
        </h2>
        <p className="mt-5 max-w-lg text-sm leading-6 text-ink-soft">
          Grove saved the public preview exactly as x.ai returned it. We review
          links before they join the directory so the catalog stays useful.
        </p>
        <p className="mt-5 font-mono text-xs text-ink/45">
          Reference {submissionId.slice(0, 8)}
        </p>
        <button
          type="button"
          onClick={() => {
            setLink("");
            setPreview(null);
            setSubmissionId("");
            setStatus("idle");
          }}
          className="mt-8 inline-flex items-center gap-2 rounded-full bg-ink px-5 py-3 text-sm font-bold text-paper"
        >
          <RotateCcw className="size-4" /> Share another
        </button>
      </div>
    );
  }

  return (
    <div className="rounded-[2rem] border border-ink/12 bg-white/60 p-5 shadow-[0_22px_65px_rgb(24_59_45/9%)] sm:p-8">
      <form onSubmit={inspectLink}>
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-xs font-bold tracking-[0.14em] text-leaf uppercase">
              Step 1
            </p>
            <h2 className="mt-2 font-display text-3xl font-semibold tracking-[-0.03em]">
              Paste the share link
            </h2>
          </div>
          <span className="flex size-11 items-center justify-center rounded-full bg-paper-deep text-ink-soft">
            <Link2 className="size-5" />
          </span>
        </div>

        <label htmlFor="template-link" className="mt-7 block text-sm font-semibold">
          Public x.ai bot URL
        </label>
        <div className="mt-2.5 flex flex-col gap-3 sm:flex-row">
          <input
            id="template-link"
            type="url"
            inputMode="url"
            required
            autoComplete="url"
            value={link}
            onChange={(event) => resetPreview(event.target.value)}
            placeholder="https://x.ai/bot/…"
            className="h-13 min-w-0 flex-1 rounded-xl border border-ink/15 bg-paper px-4 text-sm placeholder:text-ink/35 focus:border-leaf focus:outline-none"
          />
          <button
            type="submit"
            disabled={status === "looking" || !link.trim()}
            className="inline-flex h-13 shrink-0 items-center justify-center gap-2 rounded-xl bg-ink px-5 text-sm font-bold text-paper transition-opacity disabled:cursor-not-allowed disabled:opacity-45"
          >
            {status === "looking" ? (
              <>
                <LoaderCircle className="size-4 animate-spin" /> Reading x.ai
              </>
            ) : (
              <>
                Inspect link <ArrowRight className="size-4" />
              </>
            )}
          </button>
        </div>
        <p className="mt-3 text-xs leading-5 text-ink/50">
          Grove fetches only the public name, creator, and description. Private
          bot configuration is never requested.
        </p>
      </form>

      {error && (
        <div className="mt-5 rounded-xl border border-coral/35 bg-coral/10 px-4 py-3 text-sm leading-5 text-ink" role="alert">
          {error}
        </div>
      )}

      {preview && (
        <div className="mt-8 border-t border-ink/10 pt-8">
          <div className="flex items-center justify-between gap-3">
            <p className="text-xs font-bold tracking-[0.14em] text-leaf uppercase">
              Step 2 · Confirm the preview
            </p>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-paper-deep px-3 py-1.5 text-[0.68rem] font-bold tracking-[0.1em] text-leaf uppercase">
              <BadgeCheck className="size-3.5" /> Source verified
            </span>
          </div>

          <div className="mt-5 rounded-[1.4rem] border border-ink/12 bg-paper p-5 sm:p-6">
            <div className="flex items-start justify-between gap-5">
              <div>
                <h3 className="font-display text-3xl leading-none font-semibold tracking-[-0.03em]">
                  {preview.name}
                </h3>
                <p className="mt-2 text-sm text-ink-soft">by {preview.creator}</p>
              </div>
              <a
                href={preview.sourceUrl}
                target="_blank"
                rel="noreferrer"
                className="flex size-10 shrink-0 items-center justify-center rounded-full border border-ink/12 hover:bg-paper-deep"
                aria-label="Open public preview on x.ai"
              >
                <ExternalLink className="size-4" />
              </a>
            </div>
            <p className="mt-5 text-sm leading-6 text-ink-soft">
              {preview.description}
            </p>
            <p className="mt-5 truncate font-mono text-[0.68rem] text-ink/40">
              {preview.templateId}
            </p>
          </div>

          {existingSlug ? (
            <div className="mt-5 flex flex-col gap-4 rounded-xl bg-lime/35 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-sm font-medium">This bot is already growing in Grove.</p>
              <Link
                href={`/b/${existingSlug}`}
                className="inline-flex items-center gap-2 text-sm font-bold underline decoration-ink/25 underline-offset-4"
              >
                View its page <ArrowRight className="size-4" />
              </Link>
            </div>
          ) : (
            <div className="mt-5 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <p className="max-w-sm text-xs leading-5 text-ink/50">
                Submissions enter a review queue; this does not edit or republish
                the source template.
              </p>
              <button
                type="button"
                onClick={submitBot}
                disabled={status === "submitting"}
                className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-leaf px-5 text-sm font-bold text-white disabled:opacity-50"
              >
                {status === "submitting" ? (
                  <>
                    <LoaderCircle className="size-4 animate-spin" /> Saving
                  </>
                ) : (
                  <>
                    Submit to Grove <ArrowRight className="size-4" />
                  </>
                )}
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
