import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";
import useClickSound from "../../hooks/useClickSound";
import useFTUEStore from "../../stores/ftueStore";
import { current } from "immer";
const LibraryFooter = ({ footerGlowActive, clearFooterGlow }) => {
  const auth = useSelector((state) => state.auth);
  const { user_data } = auth;
  const totalDiscs = user_data?.profile?.player?.total_discs || 0;
  const canUnlockSongs = totalDiscs >= 30;
  const [inFtue, setInFtue] = useState(false);

  const handleClickSound = useClickSound();

  const { currentStep, completeStep, isCompleted } = useFTUEStore();

  useEffect(() => {
    setInFtue(currentStep === 1 && !isCompleted);
  }, [currentStep, isCompleted]);

  const footerZIndex = inFtue ? 61 : 10;
  const handZIndex = inFtue ? 62 : 11;
  const footerBgZIndex = inFtue ? 61 : 5;
  const contentZIndex = inFtue ? 62 : 10;

  return (
    <>
      {footerGlowActive && (
        <div
          className="fixed bottom-[120px] right-6 lg:bottom-[180px] animate-bounce pointer-events-none"
          style={{ zIndex: handZIndex }}
        >
          <Image
            src="/assets/img/ftue/hand icon.png"
            width={1}
            height={1}
            alt="Hand pointing to Song Library"
            className="w-24 h-24 lg:w-32 lg:h-32 xl:w-32 xl:h-32 object-contain transform -rotate-[120deg]"
          />
        </div>
      )}
      <div className="h-[120px]"></div>
      <footer
        className="fixed bottom-0 left-0 right-0 w-full pointer-events-none"
        style={{ zIndex: footerZIndex }}
      >
        <div
          className={`absolute bottom-0 left-0 right-0 w-full h-[130px] sm:h-[140px] md:h-[180px] lg:h-[300px] overflow-visible`}
          style={{
            zIndex: footerBgZIndex,
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
        <div
          className="relative w-full h-[130px] sm:h-[150px] md:h-[180px] pointer-events-auto"
          style={{ zIndex: contentZIndex }}
        >
          <Link
            href="/library"
            onClick={() => {
              handleClickSound();
              clearFooterGlow();
              if (currentStep === 1) {
                completeStep(currentStep);
              }
            }}
            className="absolute inset-0 w-full h-full"
          ></Link>

          <div className="absolute bottom-8  sm:right-[0.4rem] sm:bottom-10 md:bottom-14 lg:bottom-24 right-[0rem] lg:right-[4rem] tracking-widest leading-tight">
            <motion.div
              className="flex flex-col items-center"
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
              <p className="text-xs sm:text-xs md:text-base lg:text-xl font-bold uppercase text-center text-white ">
                YOU HAVE
              </p>
              <p className="text-xs sm:text-xs md:text-base lg:text-xl font-bold uppercase text-center text-white md:-mt-2 sm:-mt-0.5">
                {totalDiscs} DISCS
              </p>
            </motion.div>
          </div>
        </div>
      </footer>
    </>
  );
};
export default LibraryFooter;
