import React, { useState, useEffect } from "react";
import Image from "next/image";
import "../styles.css";
import useFTUEStore from "../../stores/ftueStore";

const ConfirmSpendGemsPopup = ({ isOpen, onConfirm, onCancel, selectedSong }) => {
  const { currentStep, isCompleted, setCurrentStep, completeStep } = useFTUEStore();

  const handleConfirm = () => {
    onConfirm();
  };

  if (!isOpen || !selectedSong) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-[110] bg-black/80">
      <div
        style={{ backgroundImage: `url("/assets/img/dailyreward/BG.png")` }}
        className=" text-center relative w-full h-auto bg-no-repeat bg-center bg-contain"
      >
        <div className="flex flex-col gap-0 mt-4">
          <p className="text-orange tracking-widest text-2xl font-semibold">
            {selectedSong.song_name}
          </p>
          <h3 className="text-[#ff6b03] tracking-widest font-semibold text-6xl -mt-6">
            {selectedSong.artist_name}
          </h3>
        </div>
        <div className="relative flex justify-center">
          <Image
            alt="confirmspendgems-frame"
            src={"/assets/img/unlock/unlocksongs_frame.png"}
            width={300}
            height={300}
            className="w-[100px] h-auto sm:w-[200px] sm:h-[200px] md:w-[250px] md:h-[300px] lg:w-[300px] lg:h-[300px] xl:w-[300px] xl:h-[300px] z-10 "
          />
          <div className="absolute sm:top-[4.5rem] md:top-[6rem] flex items-center justify-center">
            {selectedSong.thumbnail_file && (
              <Image
                src={selectedSong.thumbnail_file}
                alt="Song Thumbnail"
                width={150}
                height={100}
                className="mx-auto rounded mb-3 sm:w-[200px] sm:h-[200px]  sm:mb-1 md:w-[235px] md:h-[233px]  lg:w-[250px] lg:h-[100px] rounded-t-md"
              />
            )}
          </div>
        </div>
        <div className="absolute  sm:bottom-[13.5rem]  md:bottom-[14.5rem] left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-2 z-10 sm:text-xl md:text-2xl tracking-widest text-nowrap">
          <p className=" uppercase text-yellow">
            Time Left:<span className="text-cyan-200">02:13:00</span>
          </p>
        </div>
        {/* Song thumbnail */}
        <p className="text-orange text-3xl sm:text-md tracking-widest">Unlock this track</p>
        <div className="flex items-center gap-2 justify-center ">
          <p className="text-orange text-3xl sm:text-md tracking-widest">
            instantly for <span className="text-white font-semibold">20</span>
          </p>
          <span className=" inline flex items-center">
            <Image
              src={"/assets/img/spendgems/Gem.png"}
              width={50}
              height={50}
              className="w-6 h-6"
            />
          </span>
        </div>
        {/* Confirm / Cancel buttons */}
        <div className="flex justify-center gap-4 pb-4">
          <div
            className={`relative ${
              currentStep === 5 && !isCompleted ? "ftue-gems-highlight-frame" : ""
            }`}
          >
            <button className="relative text-white font-bold w-24 h-20" onClick={handleConfirm}>
              <Image
                src="/assets/img/spendgems/Left button.png"
                width={50}
                height={50}
                className="w-full h-20"
                alt="Yes Button"
              />
              <span className="absolute  -inset-4 flex items-center justify-center text-4xl tracking-widest uppercase">
                Yes
              </span>
            </button>
            {/* Bouncing hand for FTUE step 4 */}
          </div>
          {currentStep === 5 && !isCompleted && (
            <div className="absolute sm:bottom-[0rem] sm:left-[4rem] md:bottom-[-1rem] md:left-[6rem] animate-bounce z-[10000] pointer-events-none">
              <Image
                src="/assets/img/ftue/hand icon.png"
                width={80}
                height={80}
                alt="Hand pointing to yes button"
                className="w-20 h-20 object-contain transform "
              />
            </div>
          )}
          <button
            className="relative text-white font-bold w-24 h-20"
            onClick={currentStep === 5 && !isCompleted ? null : onCancel}
            disabled={currentStep === 5 && !isCompleted}
          >
            <Image
              src="/assets/img/spendgems/Right button.png"
              width={50}
              height={50}
              className={`w-24 h-20 ${
                currentStep === 5 && !isCompleted ? "opacity-50 brightness-50" : ""
              }`}
              alt="No Button"
            />
            <span
              className={`absolute -inset-2 flex items-center justify-center text-4xl uppercase tracking-widest  ${
                currentStep === 5 && !isCompleted ? "opacity-50 brightness-50" : ""
              }`}
            >
              No
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmSpendGemsPopup;
