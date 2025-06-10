import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import "../styles.css";
import useFTUEStore from "../../stores/ftueStore";

// Helper functions
function calculateTimeLeft(unlockTime) {
  const difference = +unlockTime - +new Date();
  let timeLeft = {};
  if (difference > 0) {
    timeLeft = {
      hours: Math.floor(difference / (1000 * 60 * 60)),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60),
    };
  }
  return timeLeft;
}

function isUnlockTimePassed(unlockTime) {
  if (!unlockTime) return false;
  try {
    return new Date(unlockTime) <= new Date();
  } catch (error) {
    console.error("Invalid or missing unlock time:", error);
    return false;
  }
}

// Separate component for the countdown timer
const CountdownTimer = ({ unlockTime, onExpire }) => {
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft(new Date(unlockTime)));

  useEffect(() => {
    const timer = setTimeout(() => {
      const newTime = calculateTimeLeft(new Date(unlockTime));
      setTimeLeft(newTime);

      if (Object.keys(newTime).length === 0 && typeof onExpire === "function") {
        onExpire();
      }
    }, 1000);

    return () => clearTimeout(timer);
  }, [timeLeft, unlockTime, onExpire]);

  return (
    <span
      className="text-[#0af0e4] font-bold text-[24px] sm:text-xl lg:text-3xl xl:text-3xl"
      style={{ fontFamily: "Digital-7" }}
    >
      {timeLeft.hours?.toString().padStart(2, "0") || "00"}:
      {timeLeft.minutes?.toString().padStart(2, "0") || "00"}:
      {timeLeft.seconds?.toString().padStart(2, "0") || "00"}
    </span>
  );
};

const TimerBar = ({ unlockTime, song }) => {
  const [fillPercent, setFillPercent] = useState(0);

  useEffect(() => {
    const calculateFill = () => {
      const now = new Date();
      const unlockDate = new Date(unlockTime);

      if (now >= unlockDate) {
        return 100;
      }

      const remainingTime = unlockDate.getTime() - now.getTime();

      const unlockDuration = getUnlockDuration(song);

      const elapsedTime = unlockDuration - remainingTime;

      const percentage = (elapsedTime / unlockDuration) * 100;

      return Math.max(0, Math.min(100, percentage));
    };

    function getUnlockDuration(song) {
      if (song.date_added) {
        const startTime = new Date(song.date_added).getTime();
        const endTime = new Date(unlockTime).getTime();
        return endTime - startTime;
      }

      const totalSeconds = song.unlock_duration || Math.ceil(remainingTimeInSeconds(unlockTime));

      return totalSeconds * 1000;
    }

    function remainingTimeInSeconds(unlockTime) {
      const now = new Date();
      const unlockDate = new Date(unlockTime);
      return Math.max(0, (unlockDate.getTime() - now.getTime()) / 1000);
    }

    const timer = setInterval(() => {
      setFillPercent(calculateFill());
    }, 100);

    setFillPercent(calculateFill());

    return () => clearInterval(timer);
  }, [unlockTime, song]);

  return (
    <div className="w-full h-3.5 px-[4px] md:-mt-1 sm:-mt-2">
      <div className="w-full h-2.5 bg-[#4e1b2e] mt-0.5 rounded-sm relative shadow-lg">
        <div
          className="h-full absolute left-0 rounded-sm transition-all duration-100 ease-linear"
          style={{
            width: `${fillPercent}%`,
            background: "linear-gradient(to right, #edca55, #3bc0b3)",
          }}
        />
      </div>
    </div>
  );
};

const ConfirmSpendGemsPopup = ({ isOpen, onConfirm, onCancel, selectedSong, currentGems }) => {
  const ftueStore = useFTUEStore();
  const currentStep = ftueStore?.currentStep || 0;
  const isCompleted = ftueStore?.isCompleted || false;
  const [shouldClose, setShouldClose] = useState(false);

  useEffect(() => {
    if (shouldClose) {
      onCancel();
    }
  }, [shouldClose, onCancel]);

  // For debugging
  // console.log("ConfirmSpendGemsPopup - selectedSong:", selectedSong);

  if (!isOpen || !selectedSong) return null;

  const unlockTime = selectedSong.unlock_time;
  // console.log("ConfirmSpendGemsPopup - unlockTime:", unlockTime);

  const song = selectedSong.song || selectedSong;

  const songName = song.song_name;
  const artistName = song.artist_name;
  const thumbnailFile = song.thumbnail_file;

  const isUnlocked = isUnlockTimePassed(unlockTime);

  const handleTimerExpire = () => {
    console.log("Timer expired while popup is open");
    setShouldClose(true);
  };

  if (isUnlocked) {
    setTimeout(() => onCancel(), 0);
    return null;
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center z-[110] bg-black/80">
      <div
        style={{ backgroundImage: `url("./assets/img/dailyreward/BG-v1.png")` }}
        className="text-center relative w-full h-auto bg-no-repeat bg-center bg-contain"
      >
        <div className="flex flex-col gap-0 mt-10">
          <p className="text-orange tracking-widest text-2xl font-semibold">{songName}</p>
          <h3 className="text-[#ff6b03] tracking-widest font-semibold text-6xl">{artistName}</h3>
        </div>
        <div className="relative flex justify-center">
          <Image
            alt="confirmspendgems-frame"
            src={"./assets/img/unlock/spendgems-frame.png"}
            width={100}
            height={100}
            className="w-[100px] h-auto sm:w-[200px] sm:h-[200px] md:w-[250px] md:h-[300px] lg:w-[300px] lg:h-[300px] xl:w-[300px] xl:h-[300px] z-10"
          />
          <div className="absolute sm:top-[4.5rem] md:top-[6rem] lg:top-[7rem] flex items-center justify-center">
            {thumbnailFile && (
              <Image
                src={thumbnailFile}
                alt="Song Thumbnail"
                width={100}
                height={100}
                className="mx-auto rounded mb-3 sm:w-[192px] sm:h-[200px] sm:mb-1 md:w-[235px] md:h-[233px] lg:w-[285px] lg:h-[290px] rounded-t-md"
              />
            )}
          </div>
        </div>
        <div className="absolute sm:bottom-[14rem] md:bottom-[14.5rem] lg:bottom-[15rem] left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-2 z-10 sm:text-xl md:text-2xl lg:text-3xl tracking-wider text-nowrap w-[70%] lg:w-[45%] xl:w-[40%]">
          <p className=" text-yellow ">
            Time Left:{" "}
            {unlockTime ? (
              <CountdownTimer unlockTime={unlockTime} onExpire={handleTimerExpire} />
            ) : (
              <span className="text-[#0af0e4] font-bold" style={{ fontFamily: "Digital-7" }}>
                00:00:00
              </span>
            )}
          </p>

          {/* Add timer bar */}
          {unlockTime && <TimerBar unlockTime={unlockTime} song={selectedSong} />}
        </div>
        {/* Song thumbnail */}
        <div className="mb-2">
          <p className="text-orange text-2xl sm:text-md tracking-widest">Unlock this track</p>
          <div className="flex items-center gap-2 justify-center">
            <p className="text-orange text-2xl sm:text-md tracking-widest">
              instantly for <span className="text-white font-semibold">20</span>
            </p>
            <span className="inline flex items-center">
              <Image
                src={"./assets/img/spendgems/Gem.png"}
                width={50}
                height={50}
                className="w-6 h-6"
                alt="gem-icon"
              />
            </span>
          </div>
          <p className="text-white text-md lg:text-lg tracking-widest">
            You have:
            <div className=" ml-1 inline-flex items-center gap-0.5">
              <span className="text-white">{currentGems} </span>
              <span>
                <Image
                  src={"./assets/img/spendgems/Gem.png"}
                  width={50}
                  height={50}
                  className="w-4 h-auto"
                  alt="gem-icon"
                />
              </span>
            </div>
          </p>
        </div>
        {/* Confirm / Cancel buttons */}
        <div className="flex justify-center gap-4 pb-4">
          <div
            className={`relative ${
              currentStep === 5 && !isCompleted ? "ftue-gems-highlight-frame" : ""
            }`}
          >
            <button className="relative text-white font-bold w-24 h-20" onClick={onConfirm}>
              <Image
                src="./assets/img/spendgems/left_button.png"
                width={50}
                height={50}
                className="w-full h-20"
                alt="Yes Button"
              />
              <span className="absolute -inset-4 flex items-center justify-center text-4xl tracking-widest uppercase">
                Yes
              </span>
            </button>
            {/* Bouncing hand for FTUE step 4 */}
          </div>
          {currentStep === 5 && !isCompleted && (
            <div className="absolute sm:bottom-[0rem] sm:left-[4rem] md:bottom-[-1rem] md:left-[6rem] lg:bottom-[-2rem] lg:left-[16rem] xl:bottom-[-2rem] xl:left-[16rem] animate-bounce z-[10000] pointer-events-none">
              <Image
                src="./assets/img/ftue/hand_icon.png"
                width={80}
                height={80}
                alt="Hand pointing to yes button"
                className="w-20 h-20 object-contain transform"
              />
            </div>
          )}
          <button
            className="relative text-white font-bold w-24 h-20"
            onClick={currentStep === 5 && !isCompleted ? null : onCancel}
            disabled={currentStep === 5 && !isCompleted}
          >
            <Image
              src="./assets/img/spendgems/right_button.png"
              width={50}
              height={50}
              className={`w-24 h-20 ${
                currentStep === 5 && !isCompleted ? "opacity-50 brightness-50" : ""
              }`}
              alt="No Button"
            />
            <span
              className={`absolute -inset-2 flex items-center justify-center text-4xl uppercase tracking-widest ${
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
