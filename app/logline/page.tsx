import { DeckShell } from "../_components/deck-shell";

export default function Page() {
  return (
    <DeckShell
      slide="02 / Logline"
      backHref="/"
      nextHref="/access"
      fullBleed
    >
      <div className="relative h-full overflow-hidden">
        <div className="pointer-events-none absolute right-[-220px] top-[10px] z-20 hidden lg:block">
          <img
            src="/socgirl.png"
            alt="Soccer player"
            className="h-[680px] w-auto object-contain mix-blend-screen drop-shadow-[0_40px_100px_rgba(0,0,0,0.9)] xl:h-[760px]"
          />
        </div>
        <div className="pointer-events-none absolute right-0 top-0 z-10 hidden h-full w-[35%] bg-gradient-to-l from-black via-black/60 to-transparent lg:block"></div>

        <div className="relative z-30 flex w-full items-center justify-center px-4 pb-6 pt-2 sm:px-6 lg:px-16">
          <div className="grid w-full max-w-7xl grid-cols-1 gap-12 items-center">
            <div className="relative z-20 max-w-2xl">
              <p className="mb-5 text-xs font-semibold uppercase tracking-[0.42em] text-[#ff7a00]">
                Logline
              </p>
              <h2 className="max-w-2xl text-4xl font-black leading-[0.95] text-white md:text-6xl lg:text-7xl">
                Inside a pro women’s soccer team, four rookies fight to earn
                their place, while veterans fight to hold onto theirs.
              </h2>
              <p className="mt-8 max-w-2xl text-lg leading-9 text-white/70">
                <span className="text-white">With unprecedented access</span> NO LIMITS captures
                the intensity, sacrifice, and emotional toll behind the
                fastest-growing sport in the world. As the season unfolds, the
                game becomes more than what happens on the field, it shapes who
                they are off it.
              </p>
            </div>
          </div>
        </div>
      </div>
    </DeckShell>
  );
}
