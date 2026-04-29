import Image from "next/image";

import { DeckShell } from "../_components/deck-shell";
import { formatMoments } from "../deck-data";

export default function Page() {
  return (
    <DeckShell
      slide="06 / Format"
      kicker="Doc-Follow Format"
      title="24/7 Access"
      backHref="/cast"
      nextHref="/season"
    >
      <div className="grid gap-x-5 gap-y-7 md:grid-cols-2 xl:grid-cols-3">
        {formatMoments.map((moment) => (
          <article
            key={moment.title}
            className="group overflow-hidden rounded-[1.75rem] border border-[#ff7a00]/15 bg-white/[0.03] transition duration-300 hover:-translate-y-1.5 hover:border-[#ff7a00]/35 hover:shadow-[0_26px_70px_rgba(0,0,0,0.38),0_0_28px_rgba(255,122,0,0.08)]"
          >
            <div className="relative h-[200px] w-full overflow-hidden rounded-t-[1.75rem]">
              <Image
                src={moment.image}
                alt={moment.title}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                className="object-cover transition duration-500 group-hover:scale-[1.03]"
                style={{ objectPosition: moment.imagePosition ?? "center" }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/18 via-transparent to-white/5" />
            </div>
            <div className="rounded-b-[1.75rem] border-t border-white/8 bg-black/45 p-6 backdrop-blur-xl">
              <h2 className="text-xl font-semibold text-white">{moment.title}</h2>
              <p className="mt-3 text-sm leading-7 text-white/68">{moment.text}</p>
            </div>
          </article>
        ))}
      </div>
    </DeckShell>
  );
}
