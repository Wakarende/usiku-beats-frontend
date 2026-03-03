import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";
import useClickSound from "../../hooks/useClickSound";
import useFTUEStore from "../../stores/ftueStore";
import {
  DEFAULT_DISCS_TRACK_UNLOCK_COST,
  getDiscsTrackUnlockCost,
} from "../../services/gameSettings.service";
import { current } from "immer";
const LibraryFooter = ({ footerGlowActive, clearFooterGlow }) => {
  const auth = useSelector((state) => state.auth);
  const { user_data } = auth;
  const totalDiscs = user_data?.profile?.player?.total_discs || 0;
  const [discsTrackUnlockCost, setDiscsTrackUnlockCost] = useState(
    DEFAULT_DISCS_TRACK_UNLOCK_COST
  );
  const canUnlockSongs = totalDiscs >= discsTrackUnlockCost;
  const [inFtue, setInFtue] = useState(false);

  const handleClickSound = useClickSound();

  const { currentStep, completeStep, isCompleted } = useFTUEStore();

  useEffect(() => {
    setInFtue(currentStep === 1 && !isCompleted);
  }, [currentStep, isCompleted]);

  useEffect(() => {
    let cancelled = false;

    const loadDiscsTrackUnlockCost = async () => {
      const unlockCost = await getDiscsTrackUnlockCost();
      if (!cancelled) {
        setDiscsTrackUnlockCost(unlockCost);
      }
    };

    loadDiscsTrackUnlockCost();

    return () => {
      cancelled = true;
    };
  }, []);

  const footerZIndex = inFtue ? 61 : 10;
  const handZIndex = inFtue ? 62 : 11;
  const footerBgZIndex = inFtue ? 61 : 5;
  const contentZIndex = inFtue ? 62 : 10;

  return (
    <>
      {footerGlowActive && (
        <div
          className="fixed sm:bottom-[18rem] sm:left-[15rem] bottom-[-10rem] left-[15rem] lg:bottom-[-15rem] xl:bottom-[-10rem] xl:right-[15rem] animate-bounce pointer-events-none relative"
          style={{ zIndex: handZIndex }}
        >
          <Image
            src="./assets/img/ftue/hand_icon.png"
            width={1}
            height={1}
            alt="Hand pointing to Song Library"
            className="w-24 h-24 lg:w-32 lg:h-32 xl:w-24 xl:h-24 object-contain transform -rotate-[120deg]"
          />
        </div>
      )}
      <div className="h-[120px]"></div>
      <footer
        className="viewport-footer w-full pointer-events-none"
        style={{ zIndex: footerZIndex }}
      >
        <div
          className={`absolute bottom-0 left-0 right-0 w-full h-[130px] sm:h-[140px] md:h-[180px] lg:h-[300px] xl:h-[150px] overflow-visible`}
          style={{
            zIndex: footerBgZIndex,
            filter: footerGlowActive ? "drop-shadow(0 -10px 10px rgba(0, 245, 255, 0.8))" : "none",
          }}
        >
          <Image
            src="./assets/img/footer/Bottom_banner_BG.png"
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
          className="relative w-full h-[130px] sm:h-[150px] md:h-[180px] lg:h-[220px] xl:h-[150px] pointer-events-auto"
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

          <div className="absolute bottom-8  sm:right-[0.4rem] sm:bottom-10 md:bottom-14 lg:bottom-24 xl:bottom-10 right-[0rem] xl:right-[0rem] lg:right-[4rem] tracking-widest leading-tight">
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
              <p className="text-xs sm:text-xs md:text-base lg:text-xl xl:text-sm font-bold uppercase text-center text-white ">
                YOU HAVE
              </p>
              <p className="text-xs sm:text-xs md:text-base lg:text-xl xl:text-base font-bold uppercase text-center text-white md:-mt-2 sm:-mt-0.5 xl:-mt-2">
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
