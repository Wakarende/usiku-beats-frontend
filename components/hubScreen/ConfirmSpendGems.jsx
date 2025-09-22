"use client";
import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";

import "../styles.css";
import useFTUEStore from "../../stores/ftueStore";

// assets for the ads  buttons
const SPEND_GEMS_BTN_SRC = "./assets/img/spendgems/spend_gems_btn.png";
const WATCH_AD_BTN_SRC   = "./assets/img/spendgems/watch_add_btn.png"; 
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

//countdown timer 
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
      className="text-[#0af0e4] font-bold md:text-xl sm:text-md lg:text-3xl xl:text-3xl tracking-widest"
      style={{ fontFamily: "Digital-7" }}
    >
      {timeLeft.hours?.toString().padStart(2, "0") || "00"}:
      {timeLeft.minutes?.toString().padStart(2, "0") || "00"}:
      {timeLeft.seconds?.toString().padStart(2, "0") || "00"}
    </span>
  );
};

// TimerBar
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
          className="h-full rounded-sm"
          style={{
            width: `${fillPercent}%`,
            background: "linear-gradient(to right, #edca55, #3bc0b3)",
          }}
        />
      </div>
    </div>
  );
};

// class map ONLY for ads 
const ADS_UI = {
  frameClass:
    "w-[80px] h-auto sm:w-[150px] sm:h-[140px] md:w-[180px] md:h-[200px] lg:w-[200px] lg:h-[200px] xl:w-[200px] xl:h-[200px] z-10",
  thumbClass:
    "mx-auto rounded mb-3 sm:w-[145px] sm:h-[150px] sm:mb-1 md:w-[170px] md:h-[180px] lg:w-[170px] lg:h-[170px] rounded-t-md",
  titleClass: "text-5xl",
  timerWrapClass:
    "absolute sm:bottom-[0.3rem] md:bottom-[0.5rem] lg:bottom-[12rem] left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-2 z-10 sm:text-md md:text-xl lg:text-3xl tracking-wider text-nowrap sm:w-[55%] md:w-[55%] lg:w-[55%] xl:w-[50%]",
};

const ConfirmSpendGemsPopup = ({ isOpen, onConfirm, onCancel, selectedSong, currentGems }) => {
  const ftueStore = useFTUEStore();
  const currentStep = ftueStore?.currentStep || 0;
  const isCompleted = ftueStore?.isCompleted || false;

  const [shouldClose, setShouldClose] = useState(false);

  //Ads 
  const [adVisible, setAdVisible] = useState(false);
  const [adPushed, setAdPushed] = useState(false);
  const [adSeen, setAdSeen] = useState(false);
  const adRef = useRef(null);
  const observerRef = useRef(null);
  const timersRef = useRef({});

  const RENDER_TIMEOUT_MS = 5000;// how long we wait for an ad iframe to appear
  const WATCH_TIME_MS = 8000;// how long counts as "watched" before we reward

  function addGems(amount) {
  try {
    const raw = localStorage.getItem("user_data");
    if (!raw) return;
    const data = JSON.parse(raw);
    const current = data?.profile?.player?.total_gems ?? 0;
    if (data?.profile?.player) {
      data.profile.player.total_gems = current + amount;
      localStorage.setItem("user_data", JSON.stringify(data));
      window.dispatchEvent?.(new CustomEvent("updateUserEvent", { detail: { data } }));
    }
  } catch {}
}

function unlockOnly() {
  setAdVisible(false);
  onConfirm({ source: "ad_fail" });
}

function rewardAndUnlock() {
  addGems(10);
  setAdVisible(false);
  onConfirm({ source: "reward_ad" });
}

useEffect(() => {
  if (!adVisible || adPushed) return;

  
  if (typeof window === "undefined" || !window.adsbygoogle) {
    unlockOnly();
    return;
  }

  
  try {
    (window.adsbygoogle = window.adsbygoogle || []).push({});
    setAdPushed(true);
  } catch (e) {
    
    unlockOnly();
    return;
  }

  // 2) watch the <ins> 
  const el = adRef.current;
  if (!el) {
    // if no container, fail fast
    unlockOnly();
    return;
  }

  observerRef.current = new MutationObserver(() => {
    if (!adSeen && el.querySelector("iframe")) {
      setAdSeen(true);
      // user "watch" window; after this delay, give reward + unlock
      timersRef.current.watch = setTimeout(rewardAndUnlock, WATCH_TIME_MS);
    }
  });
  observerRef.current.observe(el, { childList: true, subtree: true });

  // 3) if no iframe shows up in time, fail path = unlock only
  timersRef.current.renderTimeout = setTimeout(() => {
    if (!adSeen) unlockOnly();
  }, RENDER_TIMEOUT_MS);

  return () => {
    observerRef.current?.disconnect();
    clearTimeout(timersRef.current.watch);
    clearTimeout(timersRef.current.renderTimeout);
  };
}, [adVisible, adPushed, adSeen]);

  useEffect(() => {
    if (shouldClose) {
      onCancel();
    }
  }, [shouldClose, onCancel]);

  if (!isOpen || !selectedSong) return null;

  const unlockTime = selectedSong.unlock_time;
  const song = selectedSong.song || selectedSong;

  const songName = song.song_name;
  const artistName = song.artist_name;
  const thumbnailFile = song.thumbnail_file;

  const isUnlocked = isUnlockTimePassed(unlockTime);

  const handleTimerExpire = () => {
    setShouldClose(true);
  };

  if (isUnlocked) {
    setTimeout(() => onCancel(), 0);
    return null;
  }

  // If FTUE not completed UI
  if (!isCompleted) {
    return (
      <div className="fixed inset-0 flex items-center justify-center z-[110] bg-black/80">
        <div
          style={{ backgroundImage: `url("./assets/img/dailyreward/bg_v1.png")` }}
          className="text-center relative w-full h-auto bg-no-repeat bg-center bg-contain"
        >
          <div className="flex flex-col gap-0 mt-10">
            <p className="text-orange tracking-widest text-2xl font-semibold">{songName}</p>
            <h3 className="text-[#ff6b03] tracking-widest font-semibold text-6xl">{artistName}</h3>
          </div>
          <div className="relative flex justify-center -mt-8">
            <Image
              alt="confirmspendgems-frame"
              src={"./assets/img/unlock/spendgems-frame.png"}
              width={100}
              height={100}
              className="w-[100px] h-auto sm:w-[200px] sm:h-[200px] md:w-[220px] md:h-[250px] lg:w-[300px] lg:h-[300px] xl:w-[300px] xl:h-[300px] z-10"
            />
            <div className="absolute sm:top-[4.5rem] md:top-[5rem] lg:top-[7rem] flex items-center justify-center">
              {thumbnailFile && (
                <Image
                  src={thumbnailFile}
                  alt="Song Thumbnail"
                  width={100}
                  height={100}
                  className="mx-auto rounded mb-3 sm:w-[192px] sm:h-[200px] sm:mb-1 md:w-[210px] md:h-[233px] lg:w-[285px] lg:h-[290px] rounded-t-md"
                />
              )}
            </div>
            <div className="absolute sm:bottom-[1rem] md:bottom-[1rem] lg:bottom-[15rem] left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-2 z-10 sm:text-xl md:text-xl lg:text-3xl tracking-widest text-nowrap md:w-[64%] lg:w-[45%] xl:w-[40%]">
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
              {unlockTime && <TimerBar unlockTime={unlockTime} song={selectedSong} />}
            </div>
          </div>
          <div className="mb-2">
            <p className="text-orange text-xl sm:text-md tracking-widest mt-2.5">Unlock this track</p>
            <div className="flex items-center gap-1 justify-center">
              <p className="text-orange text-xl sm:text-md tracking-widest">
                instantly for <span className="text-white font-semibold">20</span>
              </p>
              <span className="inline flex items-center">
                <Image
                  src={"./assets/img/spendgems/gem.png"}
                  width={50}
                  height={50}
                  className="w-6 h-6"
                  alt="gem-icon"
                />
              </span>
            </div>
            <p className="text-white text-md lg:text-lg tracking-widest mt-4 mb-3">
              You have:
              <div className=" ml-1 inline-flex items-center gap-0.5">
                <span className="text-white">{currentGems} </span>
                <span>
                  <Image
                    src={"./assets/img/spendgems/gem.png"}
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
              <button onClick={() => onConfirm({ source: "spend_gems" })} className="relative text-white font-bold w-24 h-20" >
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
            </div>
            {currentStep === 5 && !isCompleted && (
              <div className="absolute sm:bottom-[-1rem] sm:left-[4rem] md:bottom-[-1.5rem] md:left-[6rem] lg:bottom-[-2rem] lg:left-[16rem] xl:bottom-[-2rem] xl:left-[16rem] animate-bounce z-[10000] pointer-events-none">
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
  }
  // POST-FTUE Completed UI 
  return (
  <>   
    <div className="fixed inset-0 flex items-center justify-center z-[110] bg-black/80">
      <div
        style={{ backgroundImage: `url("./assets/img/dailyreward/bg_v1.png")` }}
        className="text-center relative w-full h-auto bg-no-repeat bg-center bg-contain"
      >
        <div className="flex flex-col gap-0 mt-10">
          <p className="text-orange tracking-widest text-2xl font-semibold">{songName}</p>
          <h3 className={`text-[#ff6b03] tracking-widest font-semibold ${ADS_UI.titleClass}`}>
            {artistName}
          </h3>
        </div>
        <div className="relative flex justify-center">
          <Image
            alt="confirmspendgems-frame"
            src={"./assets/img/unlock/spendgems-frame.png"}
            width={100}
            height={100}
            className={ADS_UI.frameClass}
          />
          <div className="absolute sm:top-[3.3rem] md:top-[4.2rem] lg:top-[7rem] flex items-center justify-center">
            {thumbnailFile && (
              <Image
                src={thumbnailFile}
                alt="Song Thumbnail"
                width={100}
                height={100}
                className={ADS_UI.thumbClass}
              />
            )}
          </div>
        <div className={ADS_UI.timerWrapClass}>
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
          {unlockTime && <TimerBar unlockTime={unlockTime} song={selectedSong} />}
        </div>
        </div>
        <div className="mb-4 mt-2">
          <p className="text-yellow text-xl tracking-widest">Don’t wait. Get this track now!</p>
        </div>
        <div className="flex flex-col items-center gap-4 pb-6">
          {/* Spend Gems button */}
          <button onClick={() => onConfirm({ source: "spend_gems" })} className="relative" aria-label="Unlock with gems">
            <Image src={SPEND_GEMS_BTN_SRC} width={120} height={110} alt="Spend Gems" />
            <div className="absolute inset-8 flex items-center justify-center gap-2 pointer-events-none">
              <span className="text-white font-bold sm:text-3xl md:text-3xl tracking-widest -mt-3 mx-1">20</span>  
            </div>
          </button>
           <div className="inline-flex items-center gap-1 -mt-4"> 
              <span className="text-yellow text-lg ml-2">You have <span className="text-white font-extrabold">{currentGems}</span></span>
              <Image src={"./assets/img/spendgems/gem.png"} width={18} height={22} alt="gem" />
            </div>
          {/* Watch Video button*/}
          <button  onClick={() => { setAdPushed(false); setAdSeen(false); setAdVisible(true);}} disabled={adVisible} className="relative -mt-2" aria-label="Watch ad">
            <Image src={WATCH_AD_BTN_SRC} width={250} height={110} alt="Watch Video" />
            <div className="absolute inset-7 flex items-center justify-center gap-3 pointer-events-none mx-2.5">
              <div className="flex flex-col items-center justify-center">
                 <span className="text-white font-extrabold uppercase tracking-widest text-2xl">
                FREE
              </span>
              <span className="text-yellow  text-nowrap tracking-widest text-lg -mt-2">Watch Video</span>
              </div>
              <span className="inline-flex items-center text-white font-extrabold text-sm mt-[2rem] mx-3">
                +10
              </span>
            </div>
          </button>
          {/* Show the ad container only after click */}
          {adVisible && (
            <div className="mt-3 w-full flex justify-center">
              <ins
                ref={adRef}
                className="adsbygoogle"
                style={{ display: "block", width: "100%" }}
                data-ad-client="ca-pub-6193376247880661"
                data-ad-slot="6804075243"
                data-ad-format="auto"
                data-full-width-responsive="true"
              />
            </div>
          )}
          {/* No thanks */}
          <button onClick={onCancel} className="text-white underline underline-offset-4 text-xl -mt-2">
            No thanks!
          </button>
        </div>
      </div>
    </div>
    </>
  );
};

export default ConfirmSpendGemsPopup;