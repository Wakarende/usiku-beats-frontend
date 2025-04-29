import React, { useEffect, useState } from "react";
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
  const [inFtue, setInFtue] = useState(false);

  const handleClickSound = useClickSound();

  // Check if we're in FTUE step 1
  useEffect(() => {
    const checkFtueStatus = () => {
      const ftueStep = parseInt(localStorage.getItem("ftueStep") || "1");
      const ftueCompleted = localStorage.getItem("ftueCompleted") === "true";

      setInFtue(ftueStep === 1 && !ftueCompleted);
    };

    checkFtueStatus();

    window.addEventListener("storage", checkFtueStatus);
    return () => {
      window.removeEventListener("storage", checkFtueStatus);
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
          className="fixed bottom-[120px] right-6 animate-bounce pointer-events-none"
          style={{ zIndex: handZIndex }}
        >
          <Image
            src="/assets/img/ftue/hand icon.png"
            width={100}
            height={100}
            alt="Hand pointing to Song Library"
            className="w-24 h-24 object-contain transform -rotate-[120deg]"
          />
        </div>
      )}
      <div className="h-[120px]"></div>
      <footer
        className="fixed bottom-0 left-0 right-0 w-full pointer-events-none"
        style={{ zIndex: footerZIndex }}
      >
        <div
          className={`absolute bottom-0 left-0 right-0 w-full h-[130px] sm:h-[150px] md:h-[180px] overflow-visible`}
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
              localStorage.setItem("ftueStep", "2");
            }}
            className="absolute inset-0 w-full h-full"
          ></Link>

          <div className="absolute bottom-8 sm:bottom-12 md:bottom-12 right-[0rem] tracking-widest leading-tight">
            <div className="flex flex-col items-center">
              <motion.p
                className="text-xs sm:text-xs md:text-base font-bold uppercase text-center text-white leading-tight"
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
                YOU HAVE
                <br />
                <span className="">{totalDiscs} DISCS</span>
              </motion.p>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};
export default LibraryFooter;
