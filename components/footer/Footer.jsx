import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";
import Confetti from "react-confetti";

const LibraryFooter = () => {
  const auth = useSelector((state) => state.auth);
  const { user_data } = auth;
  const totalDiscs = user_data?.profile?.player?.total_discs || 0;
  const canUnlockSongs = totalDiscs >= 30;

  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  return (
    <Link href={"/library"}>
      <footer className="fixed hub-footer bottom-0 bg-center bg-norepeat bg-contain w-full ">
        <div className="relative medium:h-[100px] medium:top-[15%] ">
          <Image
            src="/assets/img/footer/footer-bg.png"
            alt="Footer background pattern"
            height={100}
            width={100}
            className="small:object-contain medium:object-contain large:object-contain z-1 bg-no-repeat w-full"
            priority
          />
          <div className="absolute inset-0 z-1">
            <div className="flex flex-col justify-between">
              <div className="absolute small:max-w-[45%] medium:max-w-[45%] medium:right-[33%] medium:bottom-[10%] p-2  small:w-[40%] small:bottom-[5%] small:right-[32%] large:right-[35%] large:bottom-[5%] large:max-w-[30%] ">
                <p className="small:font-medium medium:font-medium large:font-medium text-white leading-tight small:text-[10px] medium:text-[12px] large:text-[16px]">
                  Add more songs to your collection by earning discs
                </p>
              </div>
            </div>
            {/* Right Section */}
            <div className="text-white text-right absolute inset-0">
              <div className="absolute flex flex-col discs-text-container">
                <motion.p
                  className="text-sm large:text-3xl font-bold uppercase mb-1 discs-text text-center text-nowrap leading-tight"
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
              <div className="absolute flex flex-col text-yellow text-nowrap bottom-text-container small:right-[-5%] small:bottom-[5%] medium: right-[-4%] medium:bottom-[15%] leading-tight ">
                <p className="text-sm md:text-base font-medium bottom-text text-nowrap leading-tight">
                  Each song costs 30 discs.
                </p>
                <p className="text-sm md:text-base font-medium bottom-text text-nowrap leading-tight">
                  Get discs by playing your song
                </p>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </Link>
  );
};

export default LibraryFooter;
