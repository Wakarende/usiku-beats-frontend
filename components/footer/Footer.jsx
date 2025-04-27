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
      {/* ✋ Hand Layer (OUTSIDE Footer) */}
      {footerGlowActive && (
        <div className="fixed bottom-[110px] right-6 z-[2000] rotate-[250deg] animate-bounce-slow pointer-events-none">
          <Image
            src="/assets/img/ftue/hand icon.png"
            width={100}
            height={100}
            alt="Hand pointing to Song Library"
            className="w-24 h-24 object-contain"
          />
        </div>
      )}

      {/* 🎵 Footer Content */}
      <footer
        className={`fixed bottom-0 left-0 right-0 w-full pointer-events-none ${
          footerGlowActive ? "ftue-highlight-frame" : ""
        }`}
      >
        <div
          className="absolute inset-0 w-full h-full bg-bottom bg-no-repeat"
          style={{
            backgroundImage: "url('/assets/img/footer/Bottom_banner_bg.png')",
            backgroundSize: "cover",
            backgroundPosition: "bottom",
            zIndex: 0,
          }}
        ></div>

        <div className="relative w-full h-[150px] pointer-events-auto z-[5]">
          <Link
            href={"/library"}
            onClick={() => {
              handleClickSound();
              clearFooterGlow();
            }}
          >
            <button className="absolute sm:bottom-[6.6rem] md:bottom-28 left-0 right-0 max-w-[1000px] w-full px-4">
              <div className="relative mx-auto w-[1000px]">
                <Image
                  src={"/assets/img/footer/song_library_btn.png"}
                  width={500}
                  height={100}
                  className="w-full sm:h-8 md:h-10"
                  alt="Button background"
                />
              </div>
            </button>
          </Link>

          <div className="absolute sm:bottom-14 md:bottom-16 sm:left-[14rem] md:left-[15.5rem]">
            <div className="relative inset-0 flex justify-end items-center">
              <div>
                <motion.p
                  className="sm:text-xs md:text-sm lg:text-3xl font-bold uppercase mb-1 text-center text-white whitespace-nowrap leading-tight"
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
                  You now have <br />
                  {totalDiscs} discs
                </motion.p>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default LibraryFooter;
