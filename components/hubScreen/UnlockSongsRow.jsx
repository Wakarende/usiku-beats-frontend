import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { updateUser } from "../../redux/main/authActions";
import Popup from "../library/Popup";
import ConfirmSpendGemsPopup from "./ConfirmSpendGems";
import ParticleEffect from "./ParticleEffect";
import { useRouter } from "next/router";
import useClickSound from "../../hooks/useClickSound";
import InfoPanel from "../infopanel/InfoPanel";
import useFTUEStore from "../../stores/ftueStore";
import useUnlockSongsStore from "../../stores/unlockSongsStore";
import useStorageStore from "../../stores/storageStore";
import Image from "next/image";
import { AnalyticsService } from "../../services/analytics.service";
import "../styles.css";

const UnlockSongsRow = ({ user_data, songs, loading, onFtueProgressToStep6 }) => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");
  const [confirmPopupOpen, setConfirmPopupOpen] = useState(false);
  const [selectedSong, setSelectedSong] = useState(null);
  const [lockedSongs, setLockedSongs] = useState([]);

  // const [ftueStep, setFtueStep] = useState(0);
  const [showUnlockingInfoPanel, setShowUnlockingInfoPanel] = useState(false); // Moved from HubScreen
  const [showUnlockOverlayPanel, setShowUnlockOverlayPanel] = useState(false);
  const [unlockOverlaySong, setUnlockOverlaySong] = useState(null);

  const {
    currentStep,
    isCompleted,
    unlockingInfoSeen,
    addToLibrarySeen,
    setCurrentStep,
    completeStep,
    setUnlockingInfoSeen,
    setAddToLibrarySeen,
    completeFTUE,
  } = useFTUEStore();

  const {
    unlockedState,
    particleTrigger,
    markSongAsUnlocked,
    resetSongUnlockedState,
    triggerParticles,
    resetParticles,
  } = useUnlockSongsStore();

  // Add this near your other hooks
  const { setCurrentTrackData } = useStorageStore();
  const gemsRequiredToUnlockSong = 20;

  const dispatch = useDispatch();
  const handleClickSound = useClickSound();
  const router = useRouter();

  // Track FTUE step and show appropriate panels
  useEffect(() => {
    // Show "Finish Now" panel for step 4 if not seen yet
    if (currentStep === 4 && !unlockingInfoSeen) {
      setShowUnlockingInfoPanel(true);
    }
  }, [currentStep, unlockingInfoSeen]);

  // Update locked songs when user_data changes
  useEffect(() => {
    const newLockedSongs =
      user_data?.profile?.player?.player_song_instances?.filter((item) => !item.unlocked) || [];
    setLockedSongs(newLockedSongs);
  }, [user_data]);

  // Update unlocked and particle state based on unlock time
  useEffect(() => {
    if (!lockedSongs.length) return;

    let updatedUnlocked = { ...unlockedState };
    let updatedParticles = { ...particleTrigger };
    let changedUnlocked = false;
    let changedParticles = false;

    lockedSongs.forEach((locked) => {
      const songId = locked.song.id;
      if (isUnlockTimePassed(locked.unlock_time)) {
        if (!updatedUnlocked[songId]) {
          updatedUnlocked[songId] = true;
          changedUnlocked = true;
        }

        if (!updatedParticles[songId]) {
          updatedParticles[songId] = true;
          changedParticles = true;
        }
      }
    });

    // if (changedUnlocked) setUnlockedState(updatedUnlocked);
    // if (changedParticles) setParticleTrigger(updatedParticles);
    if (changedUnlocked) {
      // For each song that became unlocked, call the Zustand action
      Object.keys(updatedUnlocked).forEach((songId) => {
        if (updatedUnlocked[songId]) {
          markSongAsUnlocked(songId);
        }
      });
    }

    if (changedParticles) {
      // For each song that needs particles, call the Zustand action
      Object.keys(updatedParticles).forEach((songId) => {
        if (updatedParticles[songId]) {
          triggerParticles(songId);
        }
      });
    }
  }, [lockedSongs]);

  function isUnlockTimePassed(unlockTime) {
    if (!unlockTime) return false;
    try {
      return new Date(unlockTime) <= new Date();
    } catch (error) {
      console.error("Invalid or missing unlock time:", error);
      return false;
    }
  }

  const closeUnlockingInfoPanel = () => {
    setShowUnlockingInfoPanel(false);
  };

  function addToLibrary(song) {
    // console.log("Add to library clicked for song:", song.id);

    // Update user data
    const newUserdata = JSON.parse(JSON.stringify(user_data));
    const songInstance = newUserdata.profile.player.player_song_instances.find(
      (instance) => instance.song.id === song.id
    );

    if (songInstance) {
      songInstance.unlocked = true;
      songInstance.unlock_time = null;
      songInstance.unlock_start_time = new Date().toISOString();
      dispatch(updateUser(newUserdata));
      // console.log("Song unlocked and added to library:", song.id);
    } else {
      // console.error("Song not found in song instances", song.id);
    }

    resetSongUnlockedState(song.id);
    resetParticles(song.id);

    if (currentStep === 6 && !isCompleted) {
      AnalyticsService.trackFTUEStep("8 - Add to Library");
      setAddToLibrarySeen(true);

      completeStep(currentStep);

      if (showUnlockOverlayPanel) {
        setShowUnlockOverlayPanel(false);
      }

      if (song) {
        // console.log("Setting currentTrackData for song:", song.id);
        setCurrentTrackData(JSON.stringify(song));
      }

      if (onFtueProgressToStep6) {
        onFtueProgressToStep6(song);
      }

      return;
    }
    // Normal behavior for non-FTUE
    if (showUnlockOverlayPanel) {
      setShowUnlockOverlayPanel(false);
    }

    handleClickSound();
  }

  function handleUnlockNowClick(song) {
    setShowUnlockingInfoPanel(false);

    if (currentStep === 4 && !isCompleted) {
      AnalyticsService.trackFTUEStep("6 - Finish Now");
      completeStep(currentStep);
    }

    if (user_data.profile.player.total_gems < gemsRequiredToUnlockSong) {
      setPopupMessage("You don't have enough gems to unlock this song right now.");
      setIsPopupOpen(true);
      return;
    }

    const songInstance = user_data.profile.player.player_song_instances.find(
      (instance) => instance.song.id === song.id
    );

    setSelectedSong(songInstance);
    setConfirmPopupOpen(true);
  }

  function confirmUnlockNow() {
    if (!selectedSong) return;

    let newUserdata = JSON.parse(JSON.stringify(user_data));

    if (newUserdata.profile.player.total_gems < gemsRequiredToUnlockSong) {
      setPopupMessage("You don't have enough gems to unlock this song right now.");
      setIsPopupOpen(true);
      setConfirmPopupOpen(false);
      return;
    }

    newUserdata.profile.player.total_gems -= gemsRequiredToUnlockSong;

    const songId = selectedSong.id || selectedSong.song?.id;
    const songInstance = newUserdata.profile.player.player_song_instances.find(
      (instance) => instance.song.id === songId
    );

    if (songInstance) {
      songInstance.unlock_start_time = new Date().toISOString();
      songInstance.unlock_time = new Date().toISOString();
      dispatch(updateUser(newUserdata));

      markSongAsUnlocked(songId);
      triggerParticles(songId);

      if (currentStep === 5 && !isCompleted) {
        AnalyticsService.trackFTUEStep("7 - Unlock Instantly");
        setCurrentStep(6);

        setUnlockOverlaySong(selectedSong);

        setShowUnlockingInfoPanel(false);
        setShowUnlockOverlayPanel(true);
      }
    } else {
      console.error("Song not found in song instances", songId);
    }

    handleClickSound();
    setConfirmPopupOpen(false);
  }

  function CountdownTimer({ unlockTime, onExpire }) {
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

    const formattedHours = timeLeft.hours?.toString().padStart(2, "0") || "00";
    const formattedMinutes = timeLeft.minutes?.toString().padStart(2, "0") || "00";
    const formattedSeconds = timeLeft.seconds?.toString().padStart(2, "0") || "00";

    return (
      <span
        className="-ml-1 sm:text-[13px] md:text-[15px] lg:text-[18px] lg:-mt-1 xl:text-[15px] text-nowrap text-[#0af0e4] tracking-widest"
        style={{ fontFamily: "Digital-7", lineHeight: 1 }}
      >
        {formattedHours}:{formattedMinutes}:{formattedSeconds}
      </span>
    );
  }

  function calculateTimeLeft(unlockTime) {
    const difference = +unlockTime - +new Date();
    let timeLeft = {};
    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }
    return timeLeft;
  }

  function TimerBar({ unlockTime, song }) {
    const [fillPercent, setFillPercent] = useState(0);

    useEffect(() => {
      const calculateFill = () => {
        const now = new Date();
        const unlockDate = new Date(unlockTime);

        if (now >= unlockDate) {
          return 100;
        }

        let startTime;
        if (song && song.unlock_start_time) {
          startTime = new Date(song.unlock_start_time);
        } else {
          const estimatedDuration = 60 * 1000;
          startTime = new Date(unlockDate.getTime() - estimatedDuration);
        }

        const totalDuration = unlockDate.getTime() - startTime.getTime();

        const elapsedTime = now.getTime() - startTime.getTime();

        const percentage = (elapsedTime / totalDuration) * 100;

        return Math.max(0, Math.min(100, percentage));
      };

      const timer = setInterval(() => {
        setFillPercent(calculateFill());
      }, 50);

      setFillPercent(calculateFill());

      return () => clearInterval(timer);
    }, [unlockTime, song]);

    return (
      <div
        className="h-full absolute left-0 rounded-sm transition-all duration-50 ease-linear"
        style={{
          width: `${fillPercent}%`,
          background: "linear-gradient(to right, #edca55, #3bc0b3)",
        }}
      />
    );
  }
  const slots = 3;
  const slotsContent = [];
  for (let i = 0; i < slots; i++) {
    const item = lockedSongs[i];
    if (item) {
      const frameImage =
        i % 2 === 0 ? "/assets/img/unlock/unlock_frame.png" : "/assets/img/unlock/unlock_frame.png";
      slotsContent.push(
        <div
          key={`song${item.song.id}`}
          className="relative"
          onClick={() => {
            if (isUnlockTimePassed(item.unlock_time)) {
              addToLibrary(item.song);
            } else {
              handleUnlockNowClick(item.song);
            }
          }}
        >
          <div
            className={`${
              currentStep === 4 && i === 0 && !isCompleted ? "ftue-hub-highlight-frame" : ""
            }`}
          >
            <div
              className={`flex flex-col items-center unlock-card-wrapper 
      ${unlockedState[item.song.id] ? "pulse-effect" : ""}
      ${
        currentStep === 6 && i === 0 && isUnlockTimePassed(item.unlock_time) && !isCompleted
          ? "ftue-add-library-highlight-frame"
          : ""
      }`}
            >
              {/* Main card container with exact dimensions */}
              <div className="unlock-card relative overflow-hidden rounded-lg sm:w-[110px] sm:h-[130px] md:w-[134px] md:h-[140px] lg:w-[200px] lg:h-[200px]">
                {/* Background image covering the entire card */}
                <div className="absolute md:top-0 md:left-0 md:right-0 md:bottom-0 sm:top-0 sm:left-0 sm:right-0 sm:bottom-0 w-full h-full overflow-hidden">
                  <Image
                    src={item.song.thumbnail_file}
                    alt={`${item.song.song_name} thumbnail`}
                    width={500}
                    height={500}
                    className="absolute sm:top-0 sm:left-[-0.2rem] md:top-0 md:left-0  md:w-[150%] md:h-[120%] sm:w-[160%] sm:h-[120%]  lg:top-0 lg:left-0  lg:w-[150%] lg:h-[120%] xl:top-0 xl:left-0  xl:w-[150%] xl:h-[120%] max-w-none object-cover"
                    style={{ transform: "translate(-16%, -10%)" }}
                    priority
                  />
                </div>
                {/* Top purple frame */}
                <div className="absolute md:top-0 md:left-0 md:right-0 h-[20px] lg:h-[25px] bg-[#461159] sm:top-0 sm:left-0 sm:right-0 z-10  lg:top-0 lg:left-0 lg:right-0">
                  <p className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-yellow text-center tracking-wide whitespace-nowrap text-sm lg:text-lg xl:text-lg">
                    {item.song.song_name}
                  </p>
                </div>
                <div className="absolute md:bottom-0 md:left-0 md:right-0 sm:bottom-0 sm:left-0 sm:right-0 h-[60px] lg:h-[80px] bg-[#73274e] z-10 lg:bottom-0 lg:left-0 lg:right-0">
                  <div className="absolute md:top-[30%] md:left-0 md:right-2 sm:top-[30%] sm:left-0 sm:right-2 h-2.5 rounded-sm w-full bg-[#5e203f]  lg:top-[30%] lg:left-0 lg:right-2">
                    {item.unlock_time &&
                      (isUnlockTimePassed(item.unlock_time) ? (
                        <div
                          className="h-full absolute  sm:left-0 sm:top-0 md:left-0 md:top-0 lg:top-0 lg:left-0 w-full rounded-sm "
                          style={{ background: "linear-gradient(to right, #edca55, #3bc0b3)" }}
                        />
                      ) : (
                        <TimerBar
                          unlockTime={item.unlock_time}
                          unlockStartTime={item.unlock_start_time}
                        />
                      ))}
                  </div>
                  <div className="absolute sm:bottom-[2.5rem] sm:left-0 sm:right-0 md:bottom-[2.3rem] md:left-0 md:right-0  lg:bottom-[3.3rem] lg:left-0 lg:right-0  flex items-center justify-center z-20">
                    <div className="flex items-center justify-center w-full">
                      <span className="text-nowrap text-yellow sm:text-[13px] md:text-[15px] lg:text-lg xl:text-lg">
                        Time Left:
                      </span>
                      <span className="text-white font-bold ml-2 flex items-center">
                        {isUnlockTimePassed(item.unlock_time) ? (
                          <button
                            onClick={() => addToLibrary(item.song)}
                            className="flex items-center"
                          >
                            <span
                              className="tracking-wider text-nowrap sm:text-[13px] md:text-[15px] lg:text-lg xl:text-lg text-[#0af0e4] -ml-1"
                              style={{ fontFamily: "Digital-7", lineHeight: 1 }}
                            >
                              00:00:00
                            </span>
                          </button>
                        ) : (
                          <CountdownTimer
                            unlockTime={item.unlock_time}
                            onExpire={() => {
                              markSongAsUnlocked(item.song.id);
                              triggerParticles(item.song.id);
                            }}
                          />
                        )}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              {!isUnlockTimePassed(item.unlock_time) ? (
                <div className="absolute sm:bottom-[-0.1rem] sm:w-[190px] sm:left-[-1.35rem] md:bottom-[-0.2rem] md:w-[190px] md:left-[-1.8rem] lg:bottom-[-0.2rem] lg:w-[240px] lg:left-[0.1rem]">
                  <div className="relative mt-0.5 z-20">
                    <button
                      className="w-full relative"
                      // onClick={() => handleUnlockNowClick(item.song)}
                    >
                      <Image
                        src="/assets/img/hub/Button blank.png"
                        alt="Button"
                        width={10}
                        height={10}
                        className="sm:h-[20px] sm:w-[100px] md:w-[200px] md:h-[25px] lg:w-[200px] lg:h-[35px] xl:w-[200px] xl:h-[35px]"
                      />
                      <div className="absolute inset-0 flex items-center justify-between px-1">
                        <div className="flex items-center gap-0.5">
                          <Image
                            src="/assets/img/hub/Gem.png"
                            alt="Gem"
                            width={16}
                            height={16}
                            className="sm:w-[16px] sm:h-[16px] md:w-[16px] md:h-[16px] lg:w-[20px] lg:h-[20px] xl:w-[20px] xl:h-[20px]"
                          />
                          <div className="flex items-center">
                            <span className="text-yellow sm:text-[12px] md:text-[12px] lg:text-[20px] xl:text-[20px]">
                              {gemsRequiredToUnlockSong}
                            </span>
                          </div>
                        </div>
                        <p className="text-white uppercase whitespace-nowrap font-bold unlock-now-text sm:text-[9px] md:text-[12px] lg:text-[18px] xl:text-[18px] tracking-widest">
                          Finish Now
                        </p>
                      </div>
                    </button>
                  </div>
                </div>
              ) : (
                <div className="absolute sm:bottom-[-0.1rem] sm:w-[185px] sm:left-[-1.3rem] md:bottom-[-0.1rem] md:w-[185px] md:left-[-1.6rem] lg:bottom-[-0.1rem] lg:w-[230px] lg:left-[0.5rem]">
                  <div className="relative  z-20">
                    <button
                      className="w-full relative"
                      // onClick={() => addToLibrary(item.song)}
                    >
                      <Image
                        src="/assets/img/hub/Button blank.png"
                        alt="Button"
                        width={10}
                        height={10}
                        className="sm:h-[20px] sm:w-[100px] md:w-[200px] md:h-[25px] lg:w-[200px] lg:h-[35px] xl:w-[200px] xl:h-[35px]"
                      />
                      <div className="absolute -inset-[26px] flex items-center justify-center">
                        <p className="text-white uppercase whitespace-nowrap font-bold unlock-now-text sm:text-[10px] md:text-[12px] lg:text-lg xl:text-lg tracking-widest">
                          Add to Library
                        </p>
                      </div>
                    </button>
                  </div>
                </div>
              )}

              {/* Particle effect */}
              {particleTrigger[item.song.id] && (
                <ParticleEffect
                  active={true}
                  onComplete={() => {
                    resetParticles(item.song.id);
                  }}
                />
              )}
            </div>
          </div>

          {/* FTUE hand pointers - unchanged */}
          {currentStep === 6 && i === 0 && isUnlockTimePassed(item.unlock_time) && !isCompleted && (
            <div className="absolute bottom-[-80px] right-[-40px] animate-bounce pointer-events-none z-[100]">
              <Image
                src="/assets/img/ftue/hand icon.png"
                width={80}
                height={80}
                alt="Hand pointing to Add to Library"
                className="w-20 h-20 object-contain transform"
              />
            </div>
          )}
          {currentStep === 4 && i === 0 && !isCompleted && (
            <div className="absolute bottom-[-70px] right-[-40px] animate-bounce pointer-events-none z-[100]">
              <Image
                src="/assets/img/ftue/hand icon.png"
                width={80}
                height={80}
                alt="Hand pointing to unlocking song"
                className="w-20 h-20 object-contain"
              />
            </div>
          )}
        </div>
      );
    } else {
      slotsContent.push(
        <div key={i} className="flex flex-col items-center unlock-card-wrapper">
          <div className="relative bg-cover bg-center bg-no-repeat overflow-hidden rounded-t-lg sm:w-[115px] sm:h-[120px] md:w-[132px] md:h-[140px]  lg:w-[180px]  lg:h-[180px]xl:w-[202px] xl:h-[220px]">
            <Image
              src="/assets/img/hub/empty_slot.png"
              width={200}
              height={100}
              alt="Empty Slot"
              className="w-[200px] h-auto"
            />
          </div>
        </div>
      );
    }
  }
  return (
    <div className="w-full mb-1">
      <div className="flex justify-center items-center gap-x-1.5">
        {/* <Image
          alt="lock-icon"
          src={"/assets/img/footer/Unlock_copy.png"}
          width={10}
          height={10}
          className="sm:w-5 sm:h-5 sm:-mb-2 md:w-6 md:h-6 "
        /> */}
        <h1 className="text-[#6e6d6d] text-center sm:text-3xl md:text-4xl lg:text-6xl xl:text-6xl md:mb-3 lg:mb-3">
          Currently Unlocking
        </h1>
        {/* <Image
          alt="lock-icon"
          src={"/assets/img/footer/Unlock_copy.png"}
          width={10}
          height={10}
          className="sm:w-5 sm:h-5 sm:-mb-2 md:w-6 md:h-6 "
        /> */}
      </div>
      <div className="grid grid-cols-3 w-full gap-x-1.5">{slotsContent}</div>
      {songs?.length === 0 && <div className="p-1">{!loading ? "" : "loading..."}</div>}
      {/* Popups */}
      <Popup isOpen={isPopupOpen} closePopup={() => setIsPopupOpen(false)}>
        <div className="bg-[#1a1a1a] p-4 text-center md:w-2/3 rounded-lg sm:w-[280px]">
          <p className="text-yellow font-bold text-2xl mb-3">Not Enough Gems!</p>
          <p className="text-white mb-3">{popupMessage}</p>
          <button
            className="text-white bg-yellow-600 hover:bg-yellow-700 py-2 px-6 rounded uppercase font-bold"
            onClick={() => {
              setIsPopupOpen(false);
              handleClickSound();
            }}
          >
            Ok
          </button>
        </div>
      </Popup>
      <ConfirmSpendGemsPopup
        isOpen={confirmPopupOpen}
        onConfirm={confirmUnlockNow}
        onCancel={() => setConfirmPopupOpen(false)}
        selectedSong={selectedSong}
        currentGems={user_data?.profile?.player?.total_gems}
      />
      {/* "Finish Now" overlay panel (moved from HubScreen) */}
      {showUnlockingInfoPanel && !isCompleted && (
        <InfoPanel
          onClose={closeUnlockingInfoPanel}
          paragraphs={[
            <>
              <p className="text-lg sm:text-sm font-bold lg:text-xl"> Nice Choice!</p>
              <p className="text-lg sm:text-sm lg:text-xl">
                {" "}
                Your new song is now <span className="font-bold">unlocking</span>. But let's not
                wait! Tap here to get it now.
              </p>
            </>,
          ]}
          customPosition={true}
          customStyle={{
            width: "220px",
            maxWidth: "350px",
            right: "10px",
            left: "auto",
            top: "50%",
            transform: "translateY(-50%)",
            borderRadius: "15px",
            padding: "1.5rem",
            zIndex: "10000",
          }}
          customClassName="unlock-info-panel "
          transparentBg={false}
        />
      )}
      {/* "Add to Library" overlay panel */}
      {showUnlockOverlayPanel && (
        <InfoPanel
          onClose={() => setShowUnlockOverlayPanel(false)}
          paragraphs={[
            <>
              <p className="text-lg sm:text-sm">Now tap here to add it to your collection!</p>
            </>,
          ]}
          customPosition={true}
          customStyle={{
            width: "220px",
            maxWidth: "350px",
            right: "10px",
            left: "auto",
            top: "60%",
            transform: "translateY(-50%)",
            borderRadius: "15px",
            padding: "1.5rem",
            zIndex: "10001",
          }}
          customClassName="unlock-info-panel ftue-add-library-overlay"
          transparentBg={false}
        />
      )}
    </div>
  );
};

export default UnlockSongsRow;
