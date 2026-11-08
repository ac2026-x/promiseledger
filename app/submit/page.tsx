
"use client";

import { useState } from "react";

type ExtractedData = {
  organization: string | null;
  commitment: string | null;
  topic: string | null;
  target: string | null;
  deadline: string | null;
};

const fields: { key: keyof ExtractedData; label: string }[] = [
  { key: "organization", label: "Organization" },
  { key: "commitment", label: "Commitment" },
  { key: "topic", label: "Topic" },
  { key: "target", label: "Target" },
  { key: "deadline", label: "Deadline" },
];

export default function SubmitPage() {
  const [sourceText, setSourceText] = useState("");
  const [sourceUrl, setSourceUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [extracted, setExtracted] = useState<ExtractedData | null>(null);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError("");
    setExtracted(null);

    try {
      const response = await fetch("/api/extract", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ sourceText, sourceUrl }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Something went wrong.");
      }

      setExtracted(data.extracted);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Something went wrong."
      );
    } finally {
      setLoading(false);
    }
  }

  function updateField(key: keyof ExtractedData, value: string) {
    setExtracted((previous) =>
      previous ? { ...previous, [key]: value || null } : previous
    );
  }

  return (
    <main className="min-h-screen bg-slate-950 px-6 py-16 text-white">
      <div className="mx-auto max-w-3xl">
        <a href="/" className="text-sm text-emerald-400 hover:underline">
          ← Back to home
        </a>

        <p className="mt-12 text-sm font-semibold uppercase tracking-widest text-emerald-400">
          New public record
        </p>

        <h1 className="mt-4 text-4xl font-bold">Submit a promise</h1>

        <p className="mt-4 leading-7 text-slate-400">
          Provide the original public commitment and its source.
          AI will help structure the information for your review.
        </p>

        <form onSubmit={handleSubmit} className="mt-10 space-y-6">
          <div>
            <label className="mb-2 block text-sm font-medium">
              Original commitment or source text
            </label>
            <textarea
              required
              value={sourceText}
              onChange={(event) => setSourceText(event.target.value)}
              placeholder="Paste the public commitment here..."
              rows={8}
              className="w-full rounded-xl border border-slate-700 bg-slate-900 p-4 text-white placeholder:text-slate-500 focus:border-emerald-400 focus:outline-none"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">
              Source URL
            </label>
            <input
              required
              type="url"
              value={sourceUrl}
              onChange={(event) => setSourceUrl(event.target.value)}
              placeholder="https://example.com/public-commitment"
              className="w-full rounded-xl border border-slate-700 bg-slate-900 p-4 text-white placeholder:text-slate-500 focus:border-emerald-400 focus:outline-none"
            />
          </div>

          <button
            type="submit"
            disabled={!sourceText.trim() || !sourceUrl.trim() || loading}
            className="rounded-lg bg-emerald-400 px-6 py-3 font-semibold text-slate-950 hover:bg-emerald-300 disabled:cursor-not-allowed disabled:opacity-40"
          >
            {loading ? "Extracting..." : "Structure commitment with AI"}
          </button>

          {error && (
            <p className="rounded-lg border border-red-800 bg-red-950 p-4 text-sm text-red-300">
              {error}
            </p>
          )}
        </form>

        {extracted && (
          <section className="mt-12 rounded-2xl border border-slate-700 bg-slate-900 p-6">
            <p className="text-sm font-semibold uppercase tracking-widest text-emerald-400">
              Step 2 — Human review
            </p>

            <h2 className="mt-3 text-2xl font-bold">
              Review extracted information
            </h2>

            <p className="mt-3 text-sm leading-6 text-slate-400">
              AI suggestions are not verified facts. Check every field
              against the original source and correct anything inaccurate.
            </p>

            <div className="mt-6 space-y-5">
              {fields.map(({ key, label }) => (
                <div key={key}>
                  <label className="mb-2 block text-sm font-medium">
                    {label}
                  </label>

                  <textarea
                    rows={key === "commitment" ? 4 : 2}
                    value={extracted[key] ?? ""}
                    onChange={(event) =>
                      updateField(key, event.target.value)
                    }
                    placeholder={`Enter ${label.toLowerCase()}...`}
                    className="w-full rounded-lg border border-slate-700 bg-slate-950 p-3 text-white placeholder:text-slate-500 focus:border-emerald-400 focus:outline-none"
                  />
                </div>
              ))}
            </div>

            <p className="mt-6 text-sm text-slate-500">
              Source: {sourceUrl}
            </p>

            <p className="mt-4 rounded-lg border border-amber-800 bg-amber-950 p-4 text-sm text-amber-200">
              Review only — nothing has been saved or recorded on Solana yet.
            </p>
          </section>
        )}
      </div>
    </main>
  );
}
