import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";
import useClickSound from "../../hooks/useClickSound";

const LibraryFooter = () => {
  const auth = useSelector((state) => state.auth);
  const { user_data } = auth;
  const totalDiscs = user_data?.profile?.player?.total_discs || 0;
  const canUnlockSongs = totalDiscs >= 30;

  const handleClickSound = useClickSound();

  return (
    <footer
      style={{
        backgroundImage: "url('/assets/img/footer/Bottom_banner_bg.png')",
      }}
      className="fixed bottom-0 left-0 right-0 w-full bg-bottom bg-no-repeat bg-contain h-full overflow-hidden"
    >
      <Link href={"/library"} onClick={handleClickSound}>
        <button className="absolute sm:bottom-[6.6rem] md:bottom-28 left-0 right-0 max-w-[1000px] w-full px-4">
          <div className="relative mx-auto w-[1000px]">
            <Image
              src={"/assets/img/footer/song_library_btn.png"}
              width={500}
              height={100}
              className="w-full sm:h-8 md:h-10 "
              alt="Button background"
            />
          </div>
        </button>
      </Link>
      <div className="absolute sm:bottom-14 md:bottom-16 sm:left-[14rem] md:left-[15.5rem]">
        <div className="relative inset-0 flex justify-end items-center">
          <div className="">
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
    </footer>
  );
};

export default LibraryFooter;
