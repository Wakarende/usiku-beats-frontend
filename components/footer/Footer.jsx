import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useSelector } from "react-redux";

const LibraryFooter = () => {
  const auth = useSelector((state) => state.auth);
  const { user_data } = auth;
  const totalDiscs = user_data?.profile?.player?.total_discs || 0;
  const unlocksReady = Math.floor(totalDiscs / 30);

  return (
    <footer className="fixed bottom-0 left-0 w-full h-28 md:h-52">
      {/* Background pattern */}
      <div className="absolute inset-0 w-full h-full">
        <Image
          src="/assets/img/bg/Bottom banner BG.png"
          alt="Footer background pattern"
          fill
          className="object-cover"
          priority
        />
      </div>
      {/* Main banner container */}
      <Link href={"/library"}>
        <div className="relative h-full w-full">
          <div className="relative w-full h-full overflow-hidden rounded-lg">
            <Image
              src="/assets/img/footer/Library_banner.png"
              alt="Library banner"
              fill
              className="object-contain lg:object-cover md:object-cover"
              priority
            />

            {/* Unlock ready text overlay */}
            <div className="absolute top-3 right-[-10px] md:top-6 md:right-10 lg:top-2 lg:right-12">
              <div className="flex flex-col items-center">
                <p className="text-white text-sm whitespace-nowrap mb-1 md:text-lg lg:text-2xl">
                  {unlocksReady} unlock{unlocksReady !== 1 ? "s" : ""} ready
                </p>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </footer>
  );
};

export default LibraryFooter;
