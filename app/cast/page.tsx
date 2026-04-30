"use client";

import { useRouter } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";

import { DeckShell } from "../_components/deck-shell";

type CastMember = {
  name: string;
  role: string;
  image: string;
  hoverImage?: string;
  video: string;
  imageClassName?: string;
  cardClassName?: string;
  mediaClassName?: string;
};

const players: CastMember[] = [
  {
    name: "Leah Klenke",
    role: "Rookie",
    image: "/leah-1.png",
    hoverImage: "/leah-2.png",
    video: "/leahvid.mp4",
  },
  {
    name: "Kat Rader",
    role: "Rookie",
    image: "/kat-1.png",
    hoverImage: "/kat-2.png",
    video: "/katvid.mp4",
  },
  {
    name: "Kate Faasse",
    role: "Rookie",
    image: "/kate-1.png",
    hoverImage: "/kate-2.png",
    video: "/katevid.mp4",
  },
  {
    name: "Cate Hardin",
    role: "Rookie",
    image: "/cate-1.png",
    hoverImage: "/cate-2.png",
    video: "/catevid.mp4",
    imageClassName: "aspect-[4/5] w-full object-cover object-[center_60%]",
  },
  {
    name: "Kiki Van Zanten",
    role: "Star Striker",
    image: "/kiki-1.png",
    hoverImage: "/kiki-2.png",
    video: "/kikivid.mp4",
    cardClassName: "lg:w-[16rem]",
  },
];

const staff: CastMember[] = [
  {
    name: "Angela Hucles",
    role: "General Manager",
    image: "/angela.png",
    video: "/angelavid.mp4",
    mediaClassName: "h-[260px] w-full rounded-xl",
    imageClassName:
      "h-full w-full object-cover object-center scale-110 transition-transform duration-300 group-hover:scale-[1.13]",
  },
  {
    name: "Jason Lowe",
    role: "Assistant GM",
    image: "/jason.png",
    video: "/jasonvid.mp4",
    mediaClassName: "h-[260px] w-full rounded-xl",
    imageClassName:
      "h-full w-full object-cover object-top transition-transform duration-300 group-hover:scale-[1.03]",
  },
  {
    name: "Fabrice Gautrat",
    role: "Head Coach",
    image: "/fabrice.png",
    video: "/fabricevid.mp4",
    mediaClassName: "h-[260px] w-full rounded-xl",
    imageClassName:
      "h-full w-full object-cover object-top transition-transform duration-300 group-hover:scale-[1.03]",
  },
];

type MemberCardProps = {
  member: CastMember;
  hoveredName: string | null;
  onHover: (name: string | null) => void;
  onSelect: (member: CastMember) => void;
  enableHoverSwap?: boolean;
};

function MemberCard({
  member,
  hoveredName,
  onHover,
  onSelect,
  enableHoverSwap = false,
}: MemberCardProps) {
  const isHovered = hoveredName === member.name;
  const imageSrc =
    enableHoverSwap && isHovered && member.hoverImage
      ? member.hoverImage
      : member.image;
  const mediaClassName = `relative overflow-hidden bg-black/20 ${member.mediaClassName ?? ""}`;
  const imageClassName =
    member.imageClassName ??
    "aspect-[4/5] w-full object-cover transition duration-500 group-hover:scale-[1.02]";

  return (
    <button
      type="button"
      onMouseEnter={() => onHover(member.name)}
      onMouseLeave={() => onHover(null)}
      onFocus={() => onHover(member.name)}
      onBlur={() => onHover(null)}
      onClick={() => onSelect(member)}
      className={`group w-full overflow-hidden rounded-[1.75rem] border border-white/10 bg-white/[0.04] text-left transition duration-300 hover:-translate-y-1 hover:border-[#ff7a00]/40 hover:shadow-[0_22px_60px_rgba(0,0,0,0.35)] focus:outline-none focus:ring-2 focus:ring-[#ff7a00]/60 ${member.cardClassName ?? ""}`}
    >
      <div className={mediaClassName}>
        <img
          src={imageSrc}
          alt={member.name}
          className={imageClassName}
          onError={(event) => {
            const target = event.currentTarget;
            if (target.src.endsWith(member.image)) return;
            target.src = member.image;
          }}
        />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-black/75 to-transparent" />
      </div>
      <div className="p-5">
        <p className="text-lg font-semibold text-white">{member.name}</p>
        <p className="mt-2 text-xs uppercase tracking-[0.28em] text-white/55">
          {member.role}
        </p>
      </div>
    </button>
  );
}

export default function Page() {
  const router = useRouter();
  const [hoveredPlayer, setHoveredPlayer] = useState<string | null>(null);
  const [selectedMember, setSelectedMember] = useState<CastMember | null>(null);
  const [showSoundPrompt, setShowSoundPrompt] = useState(false);
  const modalVideoRef = useRef<HTMLVideoElement | null>(null);
  const modalHistoryActiveRef = useRef(false);
  const rookies = players.slice(0, 4);
  const kiki = players[4];

  const resetModal = useCallback(() => {
    if (modalVideoRef.current) {
      modalVideoRef.current.pause();
      modalVideoRef.current.currentTime = 0;
      modalVideoRef.current.load();
    }

    setSelectedMember(null);
    setShowSoundPrompt(false);
  }, []);

  const handleBackToCast = useCallback(() => {
    if (modalHistoryActiveRef.current && window.history.length > 1) {
      router.back();
      return;
    }

    modalHistoryActiveRef.current = false;
    resetModal();

    if (window.location.pathname !== "/cast") {
      router.push("/cast");
    }
  }, [resetModal, router]);

  const handleSelectMember = (member: CastMember) => {
    setSelectedMember(member);
    setShowSoundPrompt(true);
  };

  const handleEnableSound = () => {
    if (modalVideoRef.current) {
      modalVideoRef.current.muted = false;
    }

    setShowSoundPrompt(false);
  };

  useEffect(() => {
    if (!selectedMember) return;

    modalHistoryActiveRef.current = true;

    const modalUrl = new URL(window.location.href);
    modalUrl.hash = `cast-${selectedMember.name.toLowerCase().replaceAll(" ", "-")}`;
    window.history.pushState({ castModal: true }, "", modalUrl);

    const handlePopState = () => {
      modalHistoryActiveRef.current = false;
      resetModal();
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      handleBackToCast();
    };

    window.addEventListener("popstate", handlePopState);
    window.addEventListener("keydown", handleEscape);
    return () => {
      window.removeEventListener("popstate", handlePopState);
      window.removeEventListener("keydown", handleEscape);
    };
  }, [handleBackToCast, resetModal, selectedMember]);

  return (
    <DeckShell slide="05 / Cast" backHref="/sizzle" nextHref="/format">
      <div className="space-y-12">
        <div className="max-w-4xl">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.42em] text-[#ff7a00]">
            The Characters
          </p>
          <h1 className="text-center text-4xl font-black uppercase tracking-[0.12em] text-white sm:text-5xl lg:text-left lg:text-6xl">
            Suggested Cast
          </h1>
        </div>

        <section className="space-y-5">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-center">
            <div className="grid flex-1 gap-5 sm:grid-cols-2 xl:grid-cols-4 xl:gap-6">
              {rookies.map((member) => (
                <MemberCard
                  key={member.name}
                  member={member}
                  hoveredName={hoveredPlayer}
                  onHover={setHoveredPlayer}
                  onSelect={handleSelectMember}
                  enableHoverSwap
                />
              ))}
            </div>

            <div className="hidden lg:flex items-center mx-6">
              <div className="h-[220px] w-[2px] bg-gradient-to-b from-transparent via-orange-500 to-transparent opacity-60" />
            </div>

            <div className="flex lg:ml-4">
              <div className="relative w-full">
                <div className="absolute inset-0 rounded-[1.75rem] bg-orange-500/10 blur-2xl" />
                <div className="relative">
                  <MemberCard
                    member={kiki}
                    hoveredName={hoveredPlayer}
                    onHover={setHoveredPlayer}
                    onSelect={handleSelectMember}
                    enableHoverSwap
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="space-y-5 pt-4">
          <p className="text-xs font-semibold uppercase tracking-[0.34em] text-white/42">
            Backroom Staff
          </p>
          <div className="grid gap-5 md:grid-cols-3">
            {staff.map((member) => (
              <MemberCard
                key={member.name}
                member={member}
                hoveredName={null}
                onHover={() => {}}
                onSelect={handleSelectMember}
              />
            ))}
          </div>
        </section>
      </div>

      {selectedMember ? (
        <div className="fixed inset-0 z-[80] bg-black/90 backdrop-blur-xl">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,122,0,0.18),transparent_30%),radial-gradient(circle_at_bottom,rgba(255,122,0,0.12),transparent_35%)]" />
          <button
            type="button"
            onClick={handleBackToCast}
            className="animate-castBackIntro fixed left-6 top-6 z-[82] text-lg font-semibold uppercase tracking-wide text-white transition duration-200 hover:scale-[1.04] hover:brightness-110"
          >
            ← Back
          </button>
          <button
            type="button"
            onClick={handleBackToCast}
            aria-label="Close cast video"
            className="absolute right-6 top-6 z-[81] flex h-12 w-12 items-center justify-center rounded-full border border-white/15 bg-black/50 text-lg font-semibold text-white transition hover:border-[#ff7a00]/40 hover:text-[#ffb36f]"
          >
            ×
          </button>

          <div
            className="flex h-full items-center justify-center p-6 md:p-10"
            onClick={handleBackToCast}
          >
            <div
              className="relative w-full max-w-[900px] overflow-hidden rounded-[2rem] border border-[#ff7a00]/35 bg-[#050505] shadow-[0_40px_120px_rgba(0,0,0,0.72),0_0_40px_rgba(255,122,0,0.12)]"
              onClick={(event) => event.stopPropagation()}
            >
              <div className="absolute inset-0 rounded-[2rem] ring-1 ring-inset ring-[#ffb36f]/15" />
              <div className="border-b border-white/10 px-6 pb-5 pt-6 sm:px-8">
                <p className="text-[0.72rem] font-semibold uppercase tracking-[0.34em] text-[#ff7a00]">
                  Cast Feature
                </p>
                <h2 className="mt-3 text-2xl font-black uppercase tracking-[0.08em] text-white sm:text-3xl">
                  {selectedMember.name}
                </h2>
                <p className="mt-2 text-sm uppercase tracking-[0.28em] text-white/55">
                  {selectedMember.role}
                </p>
              </div>

              <div className="relative flex flex-col items-center justify-center px-4 pb-4 sm:px-6 sm:pb-6">
                <div className="absolute inset-x-8 top-6 h-20 rounded-full bg-[#ff7a00]/10 blur-3xl" />
                <video
                  key={selectedMember.video}
                  ref={modalVideoRef}
                  src={selectedMember.video}
                  controls
                  autoPlay
                  muted
                  playsInline
                  className="relative z-10 max-h-[72vh] w-full rounded-[1.5rem] bg-black object-contain"
                />
                <div
                  className={`mt-5 flex flex-col items-center gap-3 transition-opacity duration-300 sm:mt-6 ${showSoundPrompt ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"}`}
                >
                  <p className="text-xs uppercase tracking-[0.24em] text-white/45">
                    Best experienced with sound
                  </p>
                  <button
                    type="button"
                    onClick={handleEnableSound}
                    className="animate-castSoundPrompt rounded-full bg-[#ff6a00] px-5 py-2 text-sm font-black uppercase tracking-[0.22em] text-black shadow-[0_0_24px_rgba(255,106,0,0.35)] transition-all duration-300 hover:scale-[1.03] hover:brightness-105"
                  >
                    Turn On Sound
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </DeckShell>
  );
}
