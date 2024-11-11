// import React, { Component } from "react";
// import Image from "next/image";
// import LibraryBanner from "./LibraryBanner";

// class Footer extends Component {
//   render() {
//     return (
//       <div className="fixed bottom-0 left-0 w-full">
//         <div className="relative">
//           <Image
//             src="/assets/img/bg/Bottom banner BG.png"
//             alt="Bottom Banner"
//             width={1920}
//             height={300}
//             className="w-full"
//           />
//           <LibraryBanner />
//         </div>
//       </div>
//     );
//   }
// }
// export default Footer;
import React from "react";
import Image from "next/image";
import Link from "next/link";

const LibraryFooter = () => {
  return (
    <footer className="fixed bottom-0 left-0 w-full h-32 md:h-52">
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
        <div className="relative h-24 mx-1 mt-3">
          <div className="relative w-full h-24  md:h-40 overflow-hidden rounded-lg">
            {/* Banner background with gradient */}
            <Image
              src="/assets/img/hub/Banner BG.png"
              alt="Library banner"
              fill
              className="object-cover"
              priority
            />

            {/* Content overlay */}
            <div className="absolute inset-0 flex items-center justify-between px-4  lg:px-10">
              {/* Left space for artist images (empty div to maintain spacing) */}
              <div className="w-1/4"></div>
              {/* Center content */}
              <div className="flex flex-col items-center justify-center w-2/4">
                <h2 className="text-5xl md:text-7xl lg:text-8xl text-yellow-300 tracking-wider whitespace-nowrap">
                  FULL LIBRARY
                </h2>
                <div className="max-w-[200px] md:max-w-[200px] mx-auto">
                  <p className="text-white text-sm md:text-md text-center">
                    Unlock new tracks for your collection by earning discs
                  </p>
                </div>
              </div>
              {/* Right section with unlock status and disc icon */}
              <div className=" relative flex w-1/4 justify-center md:justify-end">
                <div className="absolute -top-0 right-0 -left-7 flex md:-left-2 md:-top-0">
                  <p className="text-white text-sm whitespace-nowrap text-center">
                    1 unlock ready
                  </p>
                </div>
                <div className="relative w-40">
                  <Image
                    src="/assets/img/hub/Disc icon.png"
                    alt="Disc icon"
                    width={100}
                    height={100}
                    className="object-contain"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </footer>
  );
};

export default LibraryFooter;
