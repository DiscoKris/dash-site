import Link from "next/link";

type BottomNavProps = {
  prev: string;
  next: string;
  step: string;
};

export default function BottomNav({ prev, next, step }: BottomNavProps) {
  return (
    <div className="fixed bottom-0 left-0 z-50 w-full bg-gradient-to-t from-black via-black/80 to-transparent backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-6">
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

        <div className="text-xs tracking-[0.3em] text-white/30">{step}</div>

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
  );
}
