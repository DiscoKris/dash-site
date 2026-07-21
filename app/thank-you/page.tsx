import { DeckShell } from "../_components/deck-shell";

export default function Page() {
  return (
    <DeckShell
      slide="09 / Thank You"
      backHref="/why"
      centered
      hideNext
    >
      <div className="flex w-full items-center justify-center text-center">
        <h1 className="text-6xl font-black uppercase leading-none tracking-[0.08em] text-[#ff7a00] sm:text-8xl lg:text-9xl">
          Thank You!
        </h1>
      </div>
    </DeckShell>
  );
}
