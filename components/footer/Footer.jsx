import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useSelector } from "react-redux";

const LibraryFooter = () => {
  const auth = useSelector((state) => state.auth);
  const { user_data } = auth;
  const totalDiscs = user_data?.profile?.player?.total_discs || 0;

  return (
    <Link href={"/library"}>
      <footer className="fixed hub-footer bottom-0 bg-center bg-norepeat bg-cover w-full small:h-[6rem]">
        <div>
          <Image
            src="/assets/img/footer/footer-bg.png"
            alt="Footer background pattern"
            fill
            className="object-contain z-1"
            priority
          />
          <div className="absolute inset-0 z-1">
            <div className="flex flex-col justify-between">
              <div className="absolute max-w-[45%] medium:right-[33%] medium:bottom-[10%] p-2  small:w-[40%] small:bottom-[5%] small:right-[32%]">
                <p className=",medium:font-medium   small:font-medium text-white footer-text leading-tight">
                  Add more songs to your collection by earning discs
                </p>
              </div>
            </div>
            {/* Right Section */}
            <div className="text-white text-right absolute inset-0">
              <div className="absolute flex flex-col discs-text-container">
                <p className="text-sm lg:text-3xl font-bold uppercase mb-1 discs-text text-center text-nowrap leading-tight">
                  You now have <br />
                  {totalDiscs} discs
                </p>
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
