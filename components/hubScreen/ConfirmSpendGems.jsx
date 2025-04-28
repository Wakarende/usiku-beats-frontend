import React, { useState, useEffect } from "react";
import Image from "next/image";
import "../styles.css";

const ConfirmSpendGemsPopup = ({ isOpen, onConfirm, onCancel, selectedSong }) => {
  const [ftueStep, setFtueStep] = useState(0);

  useEffect(() => {
    const storedStep = parseInt(localStorage.getItem("ftueStep") || "1");
    setFtueStep(storedStep);
  }, []);

  const handleConfirm = () => {
    // If in FTUE step 4, advance to step 5 before confirming
    if (ftueStep === 4) {
      localStorage.setItem("ftueStep", "5");
    }
    onConfirm();
  };

  if (!isOpen || !selectedSong) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-30 bg-black/80 mt-10">
      <div
        style={{ backgroundImage: `url("/assets/img/dailyreward/BG.png")` }}
        className=" p-6 rounded-lg text-center relative w-[320px] md:w-[400px] h-auto bg-no-repeat bg-center bg-contain"
      >
        <p className="text-orange tracking-widest text-lg ">{selectedSong.song_name}</p>
        <h3 className="text-[#ff6b03] tracking-widest font-semibold text-6xl mb-5">
          {selectedSong.artist_name}
        </h3>

        {/* Song thumbnail */}
        {selectedSong.thumbnail_file && (
          <Image
            src={selectedSong.thumbnail_file}
            alt="Song Thumbnail"
            width={250}
            height={300}
            className="mx-auto rounded mb-3"
          />
        )}

        <p className="text-orange text-3xl tracking-widest">Unlock this track</p>
        <div className="flex items-center gap-2 justify-center mb-10">
          <p className="text-orange text-3xl tracking-widest">
            instantly for <span className="text-white">20</span>
          </p>
          <span className="flex items-center">
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
          <div className={`relative ${ftueStep === 4 ? "ftue-gems-highlight-frame" : ""}`}>
            <button className="relative text-white font-bold w-24 h-20" onClick={handleConfirm}>
              <Image
                src="/assets/img/spendgems/Left button.png"
                width={50}
                height={50}
                className="w-24 h-20"
                alt="Yes Button"
              />
              <span className="absolute -inset-7 flex items-center justify-center text-4xl tracking-widest uppercase">
                Yes
              </span>
            </button>
            {/* Bouncing hand for FTUE step 4 */}
            {ftueStep === 4 && (
              <div className="absolute top-[-20px] right-[-40px] animate-bounce z-[10000] pointer-events-none">
                <Image
                  src="/assets/img/ftue/hand icon.png"
                  width={80}
                  height={80}
                  alt="Hand pointing to yes button"
                  className="w-20 h-20 object-contain transform -rotate-45"
                />
              </div>
            )}
          </div>
          <button className="relative text-white font-bold w-24 h-20" onClick={onCancel}>
            <Image
              src="/assets/img/spendgems/Right button.png"
              width={50}
              height={50}
              className="w-24 h-20"
              alt="No Button"
            />
            <span className="absolute -inset-3 flex items-center justify-center text-4xl uppercase tracking-widest">
              No
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmSpendGemsPopup;
