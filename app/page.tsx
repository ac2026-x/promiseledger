export default function Home() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <nav className="border-b border-slate-800 px-8 py-5">
        <div className="mx-auto flex max-w-6xl items-center justify-between">
          <h1 className="text-2xl font-bold tracking-tight">
            Promise<span className="text-emerald-400">Ledger</span>
          </h1>
          <span className="rounded-full border border-emerald-500/30 px-3 py-1 text-xs text-emerald-400">
            SOLANA DEVNET
          </span>
        </div>
      </nav>

      <section className="mx-auto max-w-6xl px-8 py-24">
        <p className="mb-5 text-sm font-semibold uppercase tracking-widest text-emerald-400">
          Public accountability, made verifiable
        </p>

        <h2 className="max-w-3xl text-5xl font-bold leading-tight md:text-6xl">
          Promises should be
          <span className="text-emerald-400"> trackable.</span>
        </h2>

        <p className="mt-8 max-w-2xl text-lg leading-8 text-slate-400">
          PromiseLedger turns public commitments into structured,
          reviewable records with a verifiable history anchored on Solana.
        </p>

        <div className="mt-10 flex flex-wrap gap-4">
          <button className="rounded-lg bg-emerald-400 px-6 py-3 font-semibold text-slate-950 hover:bg-emerald-300">
            Submit a promise
          </button>

          <button className="rounded-lg border border-slate-700 px-6 py-3 font-semibold hover:bg-slate-900">
            Explore records
          </button>
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-6 px-8 pb-24 md:grid-cols-3">
        <div className="rounded-xl border border-slate-800 bg-slate-900 p-6">
          <h3 className="text-lg font-semibold">01. Submit</h3>
          <p className="mt-3 text-sm leading-6 text-slate-400">
            Provide a public commitment and its original source.
          </p>
        </div>

        <div className="rounded-xl border border-slate-800 bg-slate-900 p-6">
          <h3 className="text-lg font-semibold">02. Review</h3>
          <p className="mt-3 text-sm leading-6 text-slate-400">
            Use AI to structure the information, then review and approve it.
          </p>
        </div>

        <div className="rounded-xl border border-slate-800 bg-slate-900 p-6">
          <h3 className="text-lg font-semibold">03. Verify</h3>
          <p className="mt-3 text-sm leading-6 text-slate-400">
            Anchor approved record hashes on Solana for a verifiable history.
          </p>
        </div>
      </section>
    </main>
  );
}