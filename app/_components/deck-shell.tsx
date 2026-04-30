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
        className={`relative flex min-h-screen w-full flex-col ${hideBottomNav ? "" : "pb-24 sm:pb-28"} ${fullBleed ? "px-0" : "mx-auto max-w-7xl px-6 sm:px-10 lg:px-12"}`}
      >
        <section
          className={`flex flex-1 ${fullBleed ? "px-6 sm:px-10 lg:px-12" : ""} ${centered ? "items-center py-6 sm:py-8" : "items-start py-4 sm:py-6 lg:py-8"}`}
        >
          <div className="w-full">
            {(kicker || title) && (
              <div className="mb-6 max-w-5xl lg:mb-7">
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
