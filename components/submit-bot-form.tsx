"use client";

import {
  Button,
  Callout,
  Card,
  Flex,
  Heading,
  Link as RadixLink,
  Text,
  TextField,
} from "@radix-ui/themes";
import { LoaderCircle } from "lucide-react";
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
      <Card size="3" role="status">
        <Text size="1" color="gray" weight="medium">
          Submission recorded
        </Text>
        <Heading as="h2" size="5" weight="medium" highContrast className="mt-2">
          {preview.name} is in the review queue.
        </Heading>
        <Text as="p" size="2" color="gray" className="mt-3 max-w-lg">
          Grove saved the public preview exactly as x.ai returned it. Links are
          reviewed before they join the directory.
        </Text>
        <Text as="p" size="1" color="gray" className="mt-4 font-mono">
          Reference {submissionId.slice(0, 8)}
        </Text>
        <Button
          type="button"
          size="2"
          highContrast
          className="mt-5"
          onClick={() => {
            setLink("");
            setPreview(null);
            setSubmissionId("");
            setStatus("idle");
          }}
        >
          Share another
        </Button>
      </Card>
    );
  }

  return (
    <Card size="3">
      <form onSubmit={inspectLink}>
        <Text size="1" color="gray" weight="medium">
          Step 1
        </Text>
        <Heading as="h2" size="5" weight="medium" highContrast className="mt-1">
          Paste the public x.ai link
        </Heading>

        <Text as="label" htmlFor="template-link" size="2" weight="medium" className="mt-5 block">
          Bot URL
        </Text>
        <Flex gap="2" direction={{ initial: "column", sm: "row" }} className="mt-2">
          <TextField.Root
            id="template-link"
            type="url"
            inputMode="url"
            required
            autoComplete="url"
            value={link}
            onChange={(event) => resetPreview(event.target.value)}
            placeholder="https://x.ai/bot/…"
            className="min-w-0 flex-1"
            size="3"
          />
          <Button
            type="submit"
            size="3"
            highContrast
            disabled={status === "looking" || !link.trim()}
          >
            {status === "looking" ? (
              <>
                <LoaderCircle className="size-4 animate-spin" /> Reading
              </>
            ) : (
              "Inspect"
            )}
          </Button>
        </Flex>
        <Text as="p" size="1" color="gray" className="mt-2">
          Grove fetches only the public name, creator, and description.
        </Text>
      </form>

      {error && (
        <Callout.Root color="red" role="alert" className="mt-4">
          <Callout.Text>{error}</Callout.Text>
        </Callout.Root>
      )}

      {preview && (
        <div className="mt-6 border-t border-[var(--gray-a5)] pt-5">
          <Text size="1" color="gray" weight="medium">
            Step 2 · Confirm the preview
          </Text>
          <div className="mt-3 rounded-[var(--radius-3)] border border-[var(--gray-a5)] p-4">
            <Flex align="start" justify="between" gap="4">
              <div>
                <Heading as="h3" size="4" weight="medium" highContrast>
                  {preview.name}
                </Heading>
                <Text as="p" size="2" color="gray" className="mt-1">
                  {preview.creator}
                </Text>
              </div>
              <RadixLink href={preview.sourceUrl} target="_blank" rel="noreferrer" size="2">
                x.ai
              </RadixLink>
            </Flex>
            <Text as="p" size="2" color="gray" className="mt-3">
              {preview.description}
            </Text>
            <Text as="p" size="1" color="gray" className="mt-3 truncate font-mono">
              {preview.templateId}
            </Text>
          </div>

          {existingSlug ? (
            <Flex
              align="center"
              justify="between"
              gap="3"
              wrap="wrap"
              className="mt-4 rounded-[var(--radius-3)] bg-[var(--gray-a2)] px-4 py-3"
            >
              <Text size="2">This bot is already in Grove.</Text>
              <RadixLink asChild size="2">
                <Link href={`/b/${existingSlug}`}>View listing</Link>
              </RadixLink>
            </Flex>
          ) : (
            <Flex
              align="center"
              justify="between"
              gap="3"
              wrap="wrap"
              className="mt-4"
            >
              <Text size="1" color="gray" className="max-w-sm">
                Submissions enter a review queue. This does not edit the source
                template.
              </Text>
              <Button
                type="button"
                size="2"
                highContrast
                onClick={submitBot}
                disabled={status === "submitting"}
              >
                {status === "submitting" ? (
                  <>
                    <LoaderCircle className="size-4 animate-spin" /> Saving
                  </>
                ) : (
                  "Submit to Grove"
                )}
              </Button>
            </Flex>
          )}
        </div>
      )}
    </Card>
  );
}
