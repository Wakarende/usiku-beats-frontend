import React from "react";
import Image from "next/image";
import "../styles.css";

const LibraryBanner = () => {
  return (
    <div className="library-banner-wrapper">
      <div className="banner-container">
        <Image
          src="/assets/img/hub/Banner BG.png"
          alt="Library Banner"
          width={1200}
          height={100}
          className="banner-image"
        />
        <div className="absolute inset-0 flex justify-between items-center px-8">
          <div className="w-24"></div>
          {/* Left side content */}
          <div className="text-center">
            {/* Text content */}
            <div className="ml-7">
              <h2 className="text-3xl font-bold text-yellow-300 mb-1 tracking-wide">
                FULL LIBRARY
              </h2>
              <p className="text-white text-sm">
                Unlock new tracks for your collection by earning discs
              </p>
            </div>
          </div>
          {/* Right side content */}
          <div className="flex flex-col items-center gap-0">
            <p className="text-white text-sm whitespace-nowrap absolute">
              1 unlock ready
            </p>
            <Image
              src="/assets/img/hub/Disc icon.png"
              alt="Disc"
              width={150}
              height={150}
              className="footer-disc-icon"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LibraryBanner;
