"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

export default function SizzlePage() {
  const router = useRouter();
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const skipTimeoutRef = useRef<number | null>(null);
  const redirectTimeoutRef = useRef<number | null>(null);
  const [soundEnabled, setSoundEnabled] = useState(false);
  const [showSkip, setShowSkip] = useState(false);

  useEffect(() => {
    return () => {
      if (skipTimeoutRef.current !== null) {
        window.clearTimeout(skipTimeoutRef.current);
      }

      if (redirectTimeoutRef.current !== null) {
        window.clearTimeout(redirectTimeoutRef.current);
      }
    };
  }, []);

  const handleTurnOnSound = async () => {
    if (!videoRef.current) return;

    videoRef.current.muted = false;
    videoRef.current.volume = 1;

    try {
      await videoRef.current.play();
      setSoundEnabled(true);

      skipTimeoutRef.current = window.setTimeout(() => {
        setShowSkip(true);
      }, 30000);
    } catch (error) {
      console.error("Unable to play video with sound:", error);
    }
  };

  const handleVideoEnd = () => {
    redirectTimeoutRef.current = window.setTimeout(() => {
      router.push("/cast");
    }, 300);
  };

  return (
    <main className="relative h-screen w-screen overflow-hidden bg-black">
      <video
        ref={videoRef}
        autoPlay
        muted
        playsInline
        onEnded={handleVideoEnd}
        className="absolute inset-0 z-0 h-full w-full object-cover"
      >
        <source src="/dashweb.mp4" type="video/mp4" />
      </video>

      <div className="absolute inset-0 z-10 bg-black/20" />

      <div className="relative z-20 h-full w-full">
        {!soundEnabled && (
          <div className="absolute inset-0 flex items-center justify-center px-6 text-center">
            <button
              onClick={handleTurnOnSound}
              className="rounded-full bg-orange-500 px-8 py-4 text-sm font-black uppercase tracking-[0.25em] text-black transition hover:scale-105 hover:bg-orange-400"
            >
              Turn On Sound
            </button>
          </div>
        )}

        {showSkip && (
          <Link
            href="/cast"
            className="absolute bottom-8 right-8 z-30 rounded-full border border-white/20 bg-black/60 px-5 py-3 text-xs font-bold uppercase tracking-[0.25em] text-white backdrop-blur-md hover:text-orange-400"
          >
            Skip →
          </Link>
        )}
      </div>
    </main>
  );
}
