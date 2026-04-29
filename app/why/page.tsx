import { DeckShell } from "../_components/deck-shell";

export default function Page() {
  const tickerText =
    "TED LASSO   •   WELCOME TO WREXHAM   •   ALL OR NOTHING   •   DRIVE TO SURVIVE";

  return (
    <DeckShell
      slide="08 / Why"
      backHref="/season"
      nextHref="/"
    >
      <div className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 z-10 overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.1)_64%,rgba(0,0,0,0.22)_100%)]" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/24 via-transparent to-black/18" />
        </div>

        <div className="relative z-20 mx-auto grid max-w-6xl gap-12 py-24 lg:grid-cols-2 lg:items-center">
          <div className="relative">
            <div className="absolute -left-8 top-0 h-64 w-64 rounded-full bg-[#ff7a00]/10 blur-3xl" />
            <div className="relative space-y-1 text-left">
              {[
                "Diversity",
                "Equity",
                "Inclusion",
                "Motivational",
                "Inspirational",
                "Empowerment",
                "Leadership",
              ].map((word) => (
                <p
                  key={word}
                  className="text-3xl font-black uppercase leading-tight tracking-wide text-white/90 sm:text-4xl lg:text-5xl"
                >
                  {word}
                </p>
              ))}
            </div>
          </div>

          <div className="relative overflow-hidden rounded-2xl border border-[#ff7a00]/20 bg-black/70 p-8 shadow-[0_26px_80px_rgba(0,0,0,0.4),0_0_32px_rgba(255,122,0,0.08)] backdrop-blur-xl sm:p-10">
            <div className="absolute -right-12 top-6 h-32 w-32 rounded-full bg-[#ff7a00]/10 blur-3xl" />
            <div className="absolute bottom-8 right-8 grid grid-cols-4 gap-2 opacity-20">
              {Array.from({ length: 16 }).map((_, index) => (
                <span
                  key={index}
                  className="h-1.5 w-1.5 rounded-full bg-[#ff7a00]"
                />
              ))}
            </div>

            <div className="relative">
              <div className="mb-6">
                <p className="text-xs font-semibold uppercase tracking-[0.38em] text-[#ff7a00]">
                  Why This Series
                </p>
                <div className="mt-4 h-px w-20 bg-gradient-to-r from-[#ff7a00] to-transparent" />
              </div>

              <h1 className="text-3xl font-black uppercase leading-[0.95] tracking-[0.1em] text-white sm:text-4xl">
                Why Are We Doing This?
              </h1>

              <p className="mt-6 max-w-2xl text-sm leading-relaxed text-white/80 sm:text-base">
                Women’s soccer is exploding, with the FIFA Women’s World Cup
                delivering record-breaking audiences. Alongside breakout hits
                like Ted Lasso and Welcome to Wrexham, the sport has become a
                global cultural force. This series captures the next generation
                of players as they fight for opportunity, identity, and success.
              </p>
            </div>
          </div>
        </div>

        <div className="pointer-events-none absolute inset-x-0 bottom-12 z-20 overflow-hidden sm:bottom-11">
          <div className="absolute inset-y-0 left-0 w-12 bg-gradient-to-r from-black via-black/80 to-transparent sm:w-16" />
          <div className="absolute inset-y-0 right-0 w-12 bg-gradient-to-l from-black via-black/80 to-transparent sm:w-16" />
          <div className="animate-whyTickerReveal px-6 text-center sm:px-10">
            <p className="mx-auto max-w-5xl text-xs font-semibold uppercase tracking-[0.28em] text-[#ff6a00]/90 sm:text-sm sm:tracking-[0.34em]">
              {tickerText}
            </p>
          </div>
        </div>
      </div>
    </DeckShell>
  );
}
