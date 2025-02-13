"use client";

import React, {
  createContext,
  useContext,
  useRef,
  useEffect,
  useState,
} from "react";
import { Howl } from "howler";
import { usePathname } from "next/navigation";

const AudioContext = createContext<any>(null);

export function useAudio() {
  return useContext(AudioContext);
}

export default function AudioProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const howlsRef = useRef<{
    bgMusic?: Howl;
  }>({});

  const [wasPlaying, setWasPlaying] = useState(false);
  const pathname = usePathname() || "";

  useEffect(() => {
    const bgMusic = new Howl({
      src: ["/assets/sounds/ui/themeMusic.mp3"],
      loop: true,
      volume: 1,
    });
    howlsRef.current.bgMusic = bgMusic;

    bgMusic.play();

    bgMusic.once("playerror", (id, error) => {
      console.warn("Howler play error:", error);
    });

    return () => {
      bgMusic.unload();
    };
  }, []);

  useEffect(() => {
    if (!howlsRef.current.bgMusic) return;

    if (pathname === "/game") {
      // Stop bgMusic when entering the game section
      if (howlsRef.current.bgMusic.playing()) {
        setWasPlaying(true);
        howlsRef.current.bgMusic.stop();
      }
    } else if (pathname === "/hub" || pathname === "/library") {
      // Resume bgMusic when returning to Hub or Library
      if (!howlsRef.current.bgMusic.playing()) {
        howlsRef.current.bgMusic.play();
        setWasPlaying(false);
      }
    }
  }, [pathname]);

  const playBgMusic = () => {
    howlsRef.current.bgMusic?.play();
  };

  const stopBgMusic = () => {
    howlsRef.current.bgMusic?.stop();
  };

  const fadeOutBgMusic = (duration = 1000) => {
    const bgMusic = howlsRef.current.bgMusic;
    if (bgMusic) {
      const currentVol = bgMusic.volume();
      bgMusic.fade(currentVol, 0, duration);
      setTimeout(() => {
        bgMusic.stop();
        bgMusic.volume(currentVol);
      }, duration);
    }
  };

  const playBoom = () => {
    const boomSfx = new Howl({
      src: ["/assets/sounds/ui/boomHitSfx.mp3"],
      volume: 0.5,
    });
    boomSfx.play();
  };

  return (
    <AudioContext.Provider
      value={{
        playBgMusic,
        stopBgMusic,
        fadeOutBgMusic,
        playBoom,
      }}
    >
      {children}
    </AudioContext.Provider>
  );
}
