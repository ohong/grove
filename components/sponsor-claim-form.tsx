"use client";

import { ArrowRight, Check, LoaderCircle, LockKeyhole, RotateCcw } from "lucide-react";
import { FormEvent, useMemo, useState } from "react";

import { formatPrice, sponsorSlots } from "@/lib/sponsors";

export function SponsorClaimForm({ initialSlot = 2 }: { initialSlot?: number }) {
  const [brand, setBrand] = useState("");
  const [url, setUrl] = useState("");
  const [email, setEmail] = useState("");
  const [slot, setSlot] = useState(initialSlot);
  const [status, setStatus] = useState<"idle" | "saving" | "done">("idle");
  const [error, setError] = useState("");
  const [intentId, setIntentId] = useState("");

  const availableSlots = sponsorSlots.filter((item) => item.status === "open");
  const selected = useMemo(
    () => availableSlots.find((item) => item.slot === slot) ?? availableSlots[0],
    [availableSlots, slot],
  );

  async function submitIntent(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("saving");
    setError("");
    const form = new FormData(event.currentTarget);

    try {
      const response = await fetch("/api/sponsors/claim", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          brand,
          url,
          email,
          slot,
          company: form.get("company"),
        }),
      });
      const result = (await response.json()) as {
        intentId?: string;
        error?: string;
      };

      if (!response.ok || !result.intentId) {
        throw new Error(result.error || "Your request could not be recorded.");
      }

      setIntentId(result.intentId);
      setStatus("done");
    } catch (submitError) {
      setError(
        submitError instanceof Error
          ? submitError.message
          : "Your request could not be recorded.",
      );
      setStatus("idle");
    }
  }

  if (status === "done") {
    return (
      <div className="rounded-[2rem] border border-leaf/25 bg-lime/45 p-7 sm:p-9" role="status">
        <span className="flex size-12 items-center justify-center rounded-full bg-ink text-lime">
          <Check className="size-6" strokeWidth={2.5} />
        </span>
        <p className="mt-7 text-xs font-bold tracking-[0.15em] text-ink/55 uppercase">
          Interest recorded · no charge made
        </p>
        <h2 className="mt-3 font-display text-4xl leading-none font-semibold tracking-[-0.035em]">
          Slot {String(slot).padStart(2, "0")} is on your radar.
        </h2>
        <p className="mt-5 max-w-lg text-sm leading-6 text-ink-soft">
          Grove saved the request for {brand}. A human can follow up at {email}
          with availability and payment details. This is not a reservation or a
          completed purchase.
        </p>
        <p className="mt-5 font-mono text-xs text-ink/45">
          Reference {intentId.slice(0, 8)}
        </p>
        <button
          type="button"
          onClick={() => {
            setStatus("idle");
            setIntentId("");
            setError("");
          }}
          className="mt-8 inline-flex items-center gap-2 rounded-full bg-ink px-5 py-3 text-sm font-bold text-paper"
        >
          <RotateCcw className="size-4" /> Edit request
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={submitIntent}
      className="rounded-[2rem] border border-ink/12 bg-white/65 p-5 shadow-[0_22px_65px_rgb(24_59_45/9%)] sm:p-8"
    >
      <div className="flex items-start justify-between gap-5 border-b border-ink/10 pb-7">
        <div>
          <p className="text-xs font-bold tracking-[0.14em] text-leaf uppercase">
            Claim a slot
          </p>
          <h2 className="mt-2 font-display text-3xl font-semibold tracking-[-0.03em]">
            Start with your brand.
          </h2>
        </div>
        <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-paper-deep text-leaf">
          <LockKeyhole className="size-5" />
        </span>
      </div>

      <div className="mt-7 grid gap-5 sm:grid-cols-2">
        <label className="block text-sm font-semibold">
          Brand name
          <input
            required
            value={brand}
            onChange={(event) => setBrand(event.target.value)}
            autoComplete="organization"
            maxLength={80}
            placeholder="Acme"
            className="mt-2.5 h-13 w-full rounded-xl border border-ink/15 bg-paper px-4 text-sm font-normal placeholder:text-ink/35 focus:border-leaf focus:outline-none"
          />
        </label>
        <label className="block text-sm font-semibold">
          Website
          <input
            required
            type="url"
            value={url}
            onChange={(event) => setUrl(event.target.value)}
            autoComplete="url"
            placeholder="https://acme.com"
            className="mt-2.5 h-13 w-full rounded-xl border border-ink/15 bg-paper px-4 text-sm font-normal placeholder:text-ink/35 focus:border-leaf focus:outline-none"
          />
        </label>
        <label className="block text-sm font-semibold sm:col-span-2">
          Contact email
          <input
            required
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            autoComplete="email"
            placeholder="you@acme.com"
            className="mt-2.5 h-13 w-full rounded-xl border border-ink/15 bg-paper px-4 text-sm font-normal placeholder:text-ink/35 focus:border-leaf focus:outline-none"
          />
        </label>
        <label className="block text-sm font-semibold sm:col-span-2">
          Sponsor slot
          <select
            required
            value={slot}
            onChange={(event) => setSlot(Number(event.target.value))}
            className="mt-2.5 h-13 w-full rounded-xl border border-ink/15 bg-paper px-4 text-sm font-normal focus:border-leaf focus:outline-none"
          >
            {availableSlots.map((item) => (
              <option key={item.slot} value={item.slot}>
                Slot {String(item.slot).padStart(2, "0")} — {formatPrice(item.price)}
              </option>
            ))}
          </select>
        </label>
      </div>

      <label className="absolute -left-[10000px]" aria-hidden="true">
        Company fax
        <input name="company" tabIndex={-1} autoComplete="off" />
      </label>

      <div className="mt-7 rounded-[1.25rem] bg-paper-deep p-5">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-xs font-bold tracking-[0.12em] text-ink-soft uppercase">
              Selected
            </p>
            <p className="mt-1.5 text-sm font-semibold">
              Slot {String(selected.slot).padStart(2, "0")}
            </p>
          </div>
          <p className="font-display text-3xl font-semibold tracking-[-0.03em]">
            {formatPrice(selected.price)}
          </p>
        </div>
      </div>

      {error && (
        <div className="mt-5 rounded-xl border border-coral/35 bg-coral/10 px-4 py-3 text-sm leading-5" role="alert">
          {error}
        </div>
      )}

      <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="max-w-xs text-xs leading-5 text-ink/50">
          This records purchase intent only. No card is requested and no payment
          is charged.
        </p>
        <button
          type="submit"
          disabled={status === "saving"}
          className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-ink px-5 text-sm font-bold text-paper disabled:opacity-50"
        >
          {status === "saving" ? (
            <>
              <LoaderCircle className="size-4 animate-spin" /> Recording
            </>
          ) : (
            <>
              Record my interest <ArrowRight className="size-4" />
            </>
          )}
        </button>
      </div>
    </form>
  );
}
