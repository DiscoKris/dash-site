import type { ReactNode } from "react";

import BottomNav from "../components/BottomNav";

type DeckShellProps = {
  slide: string;
  title?: string;
  kicker?: string;
  backHref?: string;
  nextHref?: string;
  children: ReactNode;
  centered?: boolean;
  fullBleed?: boolean;
  hideBottomNav?: boolean;
};

export function DeckShell({
  slide,
  title,
  kicker,
  backHref,
  nextHref,
  children,
  centered = false,
  fullBleed = false,
  hideBottomNav = false,
}: DeckShellProps) {
  const slideIndicatorMatch = slide.match(/^(\d{2})\s*\/\s*(.+)$/);
  const slideIndicator = slideIndicatorMatch
    ? `${slideIndicatorMatch[1]} / 08`
    : slide;

  return (
    <div className="relative min-h-screen overflow-hidden text-white">
      <div
        className={`relative flex min-h-screen w-full flex-col ${hideBottomNav ? "" : "pb-32 sm:pb-36"} ${fullBleed ? "px-0 py-0" : "mx-auto max-w-7xl px-6 py-6 sm:px-10 lg:px-12"}`}
      >
        <header className="flex items-center justify-between gap-4 pb-6">
          <div className={fullBleed ? "px-6 pt-6 sm:px-10 lg:px-12" : ""}>
            <p className="text-[0.65rem] font-semibold uppercase tracking-[0.38em] text-[#ff7a00]">
              NO LIMITS
            </p>
            <p className="mt-2 text-[0.65rem] uppercase tracking-[0.32em] text-white/40">
              {slide}
            </p>
          </div>
        </header>

        <section
          className={`flex flex-1 ${centered ? "items-center" : "items-start py-8 lg:py-10"}`}
        >
          <div className="w-full">
            {(kicker || title) && (
              <div className="mb-8 max-w-5xl">
                {kicker ? (
                  <p className="mb-4 text-xs font-semibold uppercase tracking-[0.42em] text-[#ff7a00]">
                    {kicker}
                  </p>
                ) : null}
                {title ? (
                  <h1 className="text-4xl font-black uppercase leading-[0.92] tracking-[0.12em] text-white sm:text-5xl lg:text-7xl">
                    {title}
                  </h1>
                ) : null}
              </div>
            )}
            {children}
          </div>
        </section>
      </div>
      {hideBottomNav ? null : (
        <BottomNav prev={backHref ?? ""} next={nextHref ?? ""} step={slideIndicator} />
      )}
    </div>
  );
}
