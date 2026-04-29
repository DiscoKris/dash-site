import Link from "next/link";

import { DeckShell } from "./_components/deck-shell";

export default function Page() {
  return (
    <DeckShell
      slide="01 / Cover"
      backHref={undefined}
      nextHref="/logline"
      centered
      fullBleed
      hideBottomNav
    >
      <div className="flex min-h-screen w-full items-center justify-center">
        <div className="relative z-10 flex w-full max-w-3xl flex-col items-center px-6 text-center">
          <p className="mb-6 text-xs font-semibold uppercase tracking-[0.45em] text-[#ff7a00]">
            Premium Documentary Series
          </p>
          <div className="animate-logoIntro relative z-10 flex justify-center">
            <img
              src="/logo.png"
              alt="NO LIMITS logo"
              className="animate-logoGlow mx-auto h-56 w-auto object-contain md:h-80 lg:h-[28rem]"
            />
          </div>
          <div className="mt-8">
            <Link
              href="/logline"
              className="inline-block rounded-full bg-orange-500 px-8 py-4 font-bold uppercase tracking-widest text-black transition hover:bg-orange-400"
            >
              Enter The Experience
            </Link>
          </div>
          <p className="mt-10 max-w-xl text-lg text-gray-300">
            Inside the Houston Dash, four rookies arrive chasing a dream while
            the veterans fight to extend theirs.
          </p>
        </div>
      </div>
    </DeckShell>
  );
}
