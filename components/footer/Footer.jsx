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
    // <footer className="fixed bottom-0 left-0 w-full h-[100px] md:h-52">
    //   {/* Background pattern */}
    //   <div className="absolute inset-0 w-full h-full">
    //     <Image
    //       src="/assets/img/bg/Bottom banner BG.png"
    //       alt="Footer background pattern"
    //       fill
    //       className="object-cover"
    //       priority
    //     />
    //   </div>
    //   {/* Main banner container */}
    //   <Link href={"/library"}>
    //     <div className="relative h-full w-full">
    //       <div className="relative w-full h-full overflow-hidden rounded-lg">
    //         <Image
    //           src="/assets/img/footer/Library_banner.png"
    //           alt="Library banner"
    //           fill
    //           className="object-cover lg:object-cover md:object-cover"
    //           priority
    //         />
    //         {/* Unlock ready text overlay */}
    //         <div className="absolute top-0 right-[-10px] md:top-6 md:right-10 lg:top-2 lg:right-12">
    //           <div className="flex flex-col items-center">
    //             <p className="text-white text-sm whitespace-nowrap mb-1 md:text-lg lg:text-2xl">
    //               {unlocksReady} unlock{unlocksReady !== 1 ? "s" : ""} ready
    //             </p>
    //           </div>
    //         </div>
    //       </div>
    //     </div>
    //   </Link>
    // </footer>
    <footer className="fixed hub-footer bottom-0 bg-center bg-norepeat bg-cover w-full">
      <div>
        <Image
          src="/assets/img/footer/Footer-bg.png"
          alt="Footer background pattern"
          fill
          className="object-contain z-1"
          priority
        />
        <div className="absolute inset-0 z-1">
          <div className="flex flex-col justify-between">
            <div className="absolute max-w-[45%] right-[29%] bottom-[10%] p-2 footer-text-container">
              <p className="md:text-base font-medium text-white footer-text">
                Add more songs to your collection by earning discs
              </p>
            </div>
          </div>
          {/* Right Section */}
          <div className="text-white text-right absolute inset-0">
            <div className="absolute flex flex-col discs-text-container">
              <p className="text-sm lg:text-3xl font-bold uppercase mb-1 discs-text text-center text-nowrap">
                You now have <br />
                15 discs
              </p>
            </div>
            <div className="absolute flex flex-col text-yellow text-nowrap bottom-text-container">
              <p className="text-sm md:text-base font-medium bottom-text text-nowrap">
                Each song costs 20 discs.
              </p>
              <p className="text-sm md:text-base font-medium bottom-text text-nowrap">
                Get discs by playing your song
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default LibraryFooter;
