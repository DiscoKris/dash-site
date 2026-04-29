import { DeckShell } from "../_components/deck-shell";
import { seasonArc } from "../deck-data";

export default function Page() {
  return (
    <DeckShell
      slide="07 / Season"
      kicker="Season Arc"
      title="Soccer Calendar Tentpoles"
      backHref="/format"
      nextHref="/why"
    >
      <div className="grid gap-5 lg:grid-cols-4">
        {seasonArc.map((item) => (
          <article
            key={item.phase}
            className="relative overflow-hidden rounded-[1.75rem] border border-white/10 bg-white/[0.04] p-6"
          >
            <div className="absolute left-0 top-0 h-1 w-full bg-gradient-to-r from-[#ff7a00] to-transparent" />
            <p className="text-xs font-semibold uppercase tracking-[0.32em] text-white/45">
              {item.month}
            </p>
            <h2 className="mt-6 text-2xl font-semibold text-white">
              {item.phase}
            </h2>
            <p className="mt-4 text-sm leading-7 text-white/65">{item.text}</p>
          </article>
        ))}
      </div>
    </DeckShell>
  );
}
