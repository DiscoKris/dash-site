"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

export default function SizzlePage() {
  const router = useRouter();
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const navigationTimeoutRef = useRef<number | null>(null);
  const [hasStarted, setHasStarted] = useState(false);
  const [showSkip, setShowSkip] = useState(false);
  const [hasNavigated, setHasNavigated] = useState(false);

  useEffect(() => {
    return () => {
      if (navigationTimeoutRef.current !== null) {
        window.clearTimeout(navigationTimeoutRef.current);
      }
    };
  }, []);

  const startVideo = async () => {
    if (!videoRef.current) return;

    videoRef.current.muted = false;
    videoRef.current.currentTime = 0;

    try {
      await videoRef.current.play();
      setHasStarted(true);

      window.setTimeout(() => {
        setShowSkip(true);
      }, 30000);
    } catch (error) {
      console.error("Video play failed:", error);
    }
  };

  const handleVideoEnded = () => {
    if (hasNavigated) return;

    setHasNavigated(true);
    navigationTimeoutRef.current = window.setTimeout(() => {
      router.push("/cast");
    }, 500);
  };

  return (
    <main className="relative h-screen w-screen overflow-hidden bg-black">
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 z-0 h-full w-full object-cover"
      >
        <source src="/dashweb.mp4" type="video/mp4" />
      </video>

      <div className="absolute inset-0 z-10 bg-black/60" />

      <div className="relative z-20 h-full w-full">
        <video
          ref={videoRef}
          className={`absolute inset-0 h-full w-full object-contain bg-black transition-opacity duration-500 ${hasStarted ? "opacity-100" : "opacity-0"}`}
          onEnded={handleVideoEnded}
          playsInline
          preload="auto"
        >
          <source src="/dashvideo.mp4" type="video/mp4" />
        </video>

        {!hasStarted && (
          <div className="absolute inset-0 flex items-center justify-center px-6 text-center">
            <button
              onClick={startVideo}
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
