import Link from "next/link";

type BottomNavProps = {
  prev: string;
  next: string;
  step: string;
};

export default function BottomNav({ prev, next, step }: BottomNavProps) {
  const [currentRaw, totalRaw] = step.split("/").map((part) => part.trim());
  const current = Number(currentRaw);
  const total = Number(totalRaw);
  const progress =
    Number.isFinite(current) && Number.isFinite(total) && total > 0
      ? Math.min(Math.max(current / total, 0), 1)
      : 0;

  return (
    <div className="fixed bottom-0 left-0 z-50 w-full bg-gradient-to-t from-black via-black/80 to-transparent backdrop-blur-md">
      <div className="mx-auto grid max-w-6xl grid-cols-[1fr_auto_1fr] items-end gap-4 px-6 py-5">
        <div className="justify-self-start">
          {prev ? (
            <Link
              href={prev}
              className="text-sm font-semibold uppercase tracking-[0.25em] text-white/72 transition hover:text-white"
            >
              ← Back
            </Link>
          ) : (
            <span className="text-sm font-semibold uppercase tracking-[0.25em] text-white/20">
              ← Back
            </span>
          )}
        </div>

        <div className="min-w-[120px] justify-self-center text-center">
          <div className="text-xs font-medium tracking-[0.28em] text-white/65">
            {step}
          </div>
          <div className="relative mx-auto mt-2 h-px w-20 bg-white/18">
            <div
              className="absolute left-0 top-0 h-full bg-[#ff7a00]/55"
              style={{ width: `${progress * 100}%` }}
            />
            <span
              className="absolute top-1/2 h-2 w-2 -translate-y-1/2 rounded-full bg-[#ff7a00] shadow-[0_0_12px_rgba(255,122,0,0.45)]"
              style={{ left: `calc(${progress * 100}% - 4px)` }}
            />
          </div>
        </div>

        <div className="justify-self-end">
          {next ? (
            <Link
              href={next}
              className="text-sm font-semibold uppercase tracking-[0.25em] text-[#ffb36f] transition hover:text-[#ff7a00]"
            >
              Next →
            </Link>
          ) : (
            <span className="text-sm font-semibold uppercase tracking-[0.25em] text-[#ff7a00]/30">
              Next →
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
