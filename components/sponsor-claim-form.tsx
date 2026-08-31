"use client";

import {
  Button,
  Callout,
  Card,
  Flex,
  Grid,
  Heading,
  Select,
  Text,
  TextField,
} from "@radix-ui/themes";
import { LoaderCircle } from "lucide-react";
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
      <Card size="3" role="status">
        <Text size="1" color="gray" weight="medium">
          Interest recorded · no charge made
        </Text>
        <Heading as="h2" size="5" weight="medium" highContrast className="mt-2">
          Slot {String(slot).padStart(2, "0")} request saved.
        </Heading>
        <Text as="p" size="2" color="gray" className="mt-3 max-w-lg">
          Grove saved the request for {brand}. Follow-up can go to {email} with
          availability and payment details. This is not a reservation or a
          purchase.
        </Text>
        <Text as="p" size="1" color="gray" className="mt-4 font-mono">
          Reference {intentId.slice(0, 8)}
        </Text>
        <Button
          type="button"
          size="2"
          highContrast
          className="mt-5"
          onClick={() => {
            setStatus("idle");
            setIntentId("");
            setError("");
          }}
        >
          Edit request
        </Button>
      </Card>
    );
  }

  return (
    <Card size="3">
      <form onSubmit={submitIntent}>
        <Text size="1" color="gray" weight="medium">
          Claim a slot
        </Text>
        <Heading as="h2" size="5" weight="medium" highContrast className="mt-1">
          Brand, URL, and contact
        </Heading>

        <Grid columns={{ initial: "1", sm: "2" }} gap="3" className="mt-5">
          <label>
            <Text as="div" size="2" weight="medium" className="mb-1.5">
              Brand name
            </Text>
            <TextField.Root
              required
              value={brand}
              onChange={(event) => setBrand(event.target.value)}
              autoComplete="organization"
              maxLength={80}
              placeholder="Acme"
              size="3"
            />
          </label>
          <label>
            <Text as="div" size="2" weight="medium" className="mb-1.5">
              Website
            </Text>
            <TextField.Root
              required
              type="url"
              value={url}
              onChange={(event) => setUrl(event.target.value)}
              autoComplete="url"
              placeholder="https://acme.com"
              size="3"
            />
          </label>
          <label className="sm:col-span-2">
            <Text as="div" size="2" weight="medium" className="mb-1.5">
              Contact email
            </Text>
            <TextField.Root
              required
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              autoComplete="email"
              placeholder="you@acme.com"
              size="3"
            />
          </label>
          <label className="sm:col-span-2">
            <Text as="div" size="2" weight="medium" className="mb-1.5">
              Sponsor slot
            </Text>
            <Select.Root
              required
              value={String(slot)}
              onValueChange={(value) => setSlot(Number(value))}
              size="3"
            >
              <Select.Trigger className="w-full" />
              <Select.Content>
                {availableSlots.map((item) => (
                  <Select.Item key={item.slot} value={String(item.slot)}>
                    Slot {String(item.slot).padStart(2, "0")} — {formatPrice(item.price)}
                  </Select.Item>
                ))}
              </Select.Content>
            </Select.Root>
          </label>
        </Grid>

        <label className="absolute -left-[10000px]" aria-hidden="true">
          Company fax
          <input name="company" tabIndex={-1} autoComplete="off" />
        </label>

        <Flex
          align="center"
          justify="between"
          className="mt-5 rounded-[var(--radius-3)] bg-[var(--gray-a2)] px-4 py-3"
        >
          <Text size="2" color="gray">
            Slot {String(selected.slot).padStart(2, "0")}
          </Text>
          <Text size="4" weight="medium" highContrast>
            {formatPrice(selected.price)}
          </Text>
        </Flex>

        {error && (
          <Callout.Root color="red" role="alert" className="mt-4">
            <Callout.Text>{error}</Callout.Text>
          </Callout.Root>
        )}

        <Flex
          align="center"
          justify="between"
          gap="3"
          wrap="wrap"
          className="mt-5"
        >
          <Text size="1" color="gray" className="max-w-xs">
            Records purchase intent only. No card is requested and no payment is
            charged.
          </Text>
          <Button type="submit" size="2" highContrast disabled={status === "saving"}>
            {status === "saving" ? (
              <>
                <LoaderCircle className="size-4 animate-spin" /> Recording
              </>
            ) : (
              "Record interest"
            )}
          </Button>
        </Flex>
      </form>
    </Card>
  );
}
