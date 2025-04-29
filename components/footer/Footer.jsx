import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";
import useClickSound from "../../hooks/useClickSound";

const LibraryFooter = ({ footerGlowActive, clearFooterGlow }) => {
  const auth = useSelector((state) => state.auth);
  const { user_data } = auth;
  const totalDiscs = user_data?.profile?.player?.total_discs || 0;
  const canUnlockSongs = totalDiscs >= 30;

  const handleClickSound = useClickSound();

  return (
    <>
      {/* Hand Layer (OUTSIDE Footer) */}
      {footerGlowActive && (
        <div className="fixed bottom-[120px] right-6 z-[2000] animate-bounce pointer-events-none">
          <Image
            src="/assets/img/ftue/hand icon.png"
            width={100}
            height={100}
            alt="Hand pointing to Song Library"
            className="w-24 h-24 object-contain transform -rotate-[120deg]"
          />
        </div>
      )}

      {/*  Footer Content */}
      <footer className="fixed bottom-0 left-0 right-0 w-full pointer-events-none">
        <div
          className={`absolute bottom-0 left-0 right-0 w-full h-[130px] sm:h-[150px] md:h-[180px] overflow-visible`}
          style={{
            zIndex: 0,
            filter: footerGlowActive ? "drop-shadow(0 -10px 10px rgba(0, 245, 255, 0.8))" : "none",
          }}
        >
          <Image
            src="/assets/img/footer/hub_banner_BG.png"
            fill
            sizes="100vw"
            priority
            alt="Footer background"
            className="object-fill"
            style={{
              objectPosition: "center bottom",
            }}
          />
        </div>
        <div className="relative w-full h-[130px] sm:h-[150px] md:h-[180px] pointer-events-auto z-[5]">
          <Link
            href="/library"
            onClick={() => {
              handleClickSound();
              clearFooterGlow();
              localStorage.setItem("ftueStep", "2");
            }}
            className="absolute inset-0 w-full h-full"
          ></Link>
          {/* Disc Counter - Fixed positioning */}
          <div className="absolute bottom-8 sm:bottom-10 md:bottom-12 right-4 sm:right-8">
            <div className="flex flex-col items-center">
              <motion.p
                className="text-xs sm:text-sm md:text-base font-bold uppercase text-center text-white whitespace-nowrap leading-tight"
                animate={canUnlockSongs ? { scale: [1, 1.15, 1] } : {}}
                transition={
                  canUnlockSongs
                    ? {
                        duration: 0.8,
                        repeat: Infinity,
                        repeatType: "reverse",
                        ease: "easeInOut",
                      }
                    : {}
                }
              >
                YOU NOW HAVE <br />
                <span className="text-sm sm:text-base md:text-lg">{totalDiscs} DISCS</span>
              </motion.p>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default LibraryFooter;
