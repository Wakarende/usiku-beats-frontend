"use client";

import React, { createContext, useContext, useRef, useEffect, useState } from "react";
import { Howl } from "howler";
import { usePathname } from "next/navigation";

const AudioContext = createContext<any>(null);


export function useAudio() {
  const context = useContext(AudioContext);
  
 
  if (!context) {
    return {
      playBgMusic: () => {},
      stopBgMusic: () => {},
      fadeOutBgMusic: () => {},
      playBoom: () => {},
    };
  }
  
  return context;
}

export default function AudioProvider({ children }: { children: React.ReactNode }) {
  const howlsRef = useRef<{
    bgMusic?: Howl;
  }>({});

  const [wasPlaying, setWasPlaying] = useState(false);
  const pathname = usePathname() || "";

  useEffect(() => {
    const bgMusic = new Howl({
      src: ["./assets/sounds/ui/themeMusic.mp3"],
      loop: true,
      volume: 1,
    });
    howlsRef.current.bgMusic = bgMusic;

    bgMusic.once("playerror", (id, error) => {
      console.warn("Howler play error:", error);
    });

    return () => {
      bgMusic.unload();
    };
  }, []);

  useEffect(() => {
    const bgMusic = howlsRef.current.bgMusic;
    if (!bgMusic) return;
  });
  useEffect(() => {
    const bgMusic = new Howl({
      src: ["./assets/sounds/ui/themeMusic.mp3"],
      loop: true,
      volume: 1,
    });
    howlsRef.current.bgMusic = bgMusic;

    bgMusic.once("playerror", (id, error) => {
      console.warn("Howler play error:", error);
    });

    return () => {
      bgMusic.unload();
    };
  }, []);

  useEffect(() => {
    const bgMusic = howlsRef.current.bgMusic;
    if (!bgMusic) return;

    // If we’re in the Phaser route => stop
    if (pathname === "/game") {
      if (bgMusic.playing()) {
        setWasPlaying(true);
        bgMusic.stop();
      }
    } else {
      // For all other Next.js routes => play
      if (!bgMusic.playing()) {
        bgMusic.play();
        setWasPlaying(false);
      }
    }
  }, [pathname]);

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) {
        // Tab is inactive → Pause bgMusic
        if (howlsRef.current.bgMusic?.playing()) {
          setWasPlaying(true);
          howlsRef.current.bgMusic.pause();
        }
      } else {
        // Tab is active again → Resume bgMusic
        if (wasPlaying && pathname !== "/game") {
          howlsRef.current.bgMusic?.play();
          setWasPlaying(false);
        }
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [wasPlaying, pathname]);

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
      src: ["./assets/sounds/ui/boomHitSfx.mp3"],
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
