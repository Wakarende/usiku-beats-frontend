import React, { useState, useEffect } from "react";
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
    console.log("Add to library clicked for song:", song.id);

    // Update user data
    const newUserdata = JSON.parse(JSON.stringify(user_data));
    const songInstance = newUserdata.profile.player.player_song_instances.find(
      (instance) => instance.song.id === song.id
    );

    if (songInstance) {
      songInstance.unlocked = true;
      songInstance.unlock_time = null;
      dispatch(updateUser(newUserdata));
      console.log("Song unlocked and added to library:", song.id);
    } else {
      console.error("Song not found in song instances", song.id);
    }

    resetSongUnlockedState(song.id);
    resetParticles(song.id);

    if (currentStep === 6 && !isCompleted) {
      console.log("FTUE progressing from step 5 to 6");

      setAddToLibrarySeen(true);

      completeStep(currentStep);

      if (showUnlockOverlayPanel) {
        setShowUnlockOverlayPanel(false);
      }

      if (song) {
        console.log("Setting currentTrackData for song:", song.id);
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
      completeStep(currentStep);
    }

    if (user_data.profile.player.total_gems < gemsRequiredToUnlockSong) {
      setPopupMessage("You don't have enough gems to unlock this song right now.");
      setIsPopupOpen(true);
      return;
    }

    setSelectedSong(song);
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
      songInstance.unlock_time = new Date().toISOString();
      dispatch(updateUser(newUserdata));

      markSongAsUnlocked(songId);
      triggerParticles(songId);

      if (currentStep === 5 && !isCompleted) {
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

    return (
      <p className="sm:text-[6px] sm:pb-[5px] md:text-[7px] md:pb-[4px] lg:text-[12px] lg:pb-[7px] xl:text-[12px] xl:pb-[7px]">
        {timeLeft.minutes}:{timeLeft.seconds} m
      </p>
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

  const slots = 3;
  const slotsContent = [];

  for (let i = 0; i < slots; i++) {
    const item = lockedSongs[i];
    if (item) {
      const frameImage =
        i % 2 === 0 ? "/assets/img/hub/unlock_frame.png" : "/assets/img/hub/unlock_frame_2.png";

      slotsContent.push(
        <div key={i} className="relative">
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
              {/* Card content - the song image and info */}
              <div
                className="unlock-card relative bg-cover bg-center bg-no-repeat overflow-hidden rounded-t-lg sm:w-[120px] md:w-[132px] md:h-[116px] lg:w-[200px] lg:h-[180px]"
                style={{
                  backgroundImage: `url(${item.song.thumbnail_file})`,
                }}
              >
                <div className="flex justify-center items-center">
                  <div className="absolute sm:top-[-6%] md:top-[-6%] lg:top-[-1%]">
                    <p className="text-yellow text-center title-text tracking-wider flex items-center justify-center whitespace-nowrap z-1 sm:text-xl md:text-xl lg:text-xl xl:text-xl">
                      {item.song.song_name}
                    </p>
                  </div>
                </div>
                <div className="relative justify-center items-center">
                  <Image
                    src={frameImage}
                    alt="Title Bar"
                    width={300}
                    height={200}
                    className="h-[7.3rem] large:h-[180px] xl:h-[180px]"
                  />
                </div>
                <div className="absolute bottom-0 left-0 right-0 flex items-center justify-center">
                  <div className="flex items-center justify-center z-1 w-full">
                    <p className="text-white font-bold ml-2">
                      {isUnlockTimePassed(item.unlock_time) ? (
                        <button onClick={() => addToLibrary(item.song)}>
                          <p className="tracking-wide unlocked-text text-nowrap sm:text-[6px] sm:pb-[5px] md:text-[7px] md:pb-[4px] lg:text-[10px] lg:pb-[7px] lg:ml-1 xl:text-[10px] xl:pb-[7px] xl:ml-1">
                            Unlocked
                          </p>
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
                    </p>
                  </div>
                </div>
              </div>

              {/* Button section - either "Unlock Now" or "Add to Library" */}
              {!isUnlockTimePassed(item.unlock_time) ? (
                <div className="relative mt-0.5">
                  <button
                    className="w-full relative"
                    onClick={() => handleUnlockNowClick(item.song)}
                  >
                    <Image
                      src="/assets/img/hub/Button blank.png"
                      alt="Button"
                      width={160}
                      height={40}
                      className="sm:h-[20px] sm:w-[120px] md:w-[200px] md:h-[25px] lg:w-[200px] lg:h-[35px] xl:w-[200px] xl:h-[35px]"
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
                          <span className="text-yellow sm:text-[8px] md:text-[10px] lg:text-[14px] xl:text-[14px]">
                            {gemsRequiredToUnlockSong}
                          </span>
                        </div>
                      </div>
                      <p className="text-white uppercase whitespace-nowrap font-bold unlock-now-text sm:text-[8px] md:text-[10px] lg:text-lg xl:text-lg">
                        unlock now
                      </p>
                      <Image
                        src="/assets/img/hub/Unlock.png"
                        alt="Unlock"
                        width={16}
                        height={16}
                        className="sm:w-[16px] sm:h-[16px] md:w-[16px] md:h-[16px] lg:w-[20px] lg:h-[20px] xl:w-[20px] xl:h-[20px]"
                      />
                    </div>
                  </button>
                </div>
              ) : (
                <div className="relative">
                  <button className="unlock-button flex items-center justify-center w-full">
                    <Image
                      src="/assets/img/hub/Button blank.png"
                      alt="Unlock Button Background"
                      width={160}
                      height={100}
                      className="sm:h-[20px] sm:w-[120px] md:w-[200px] md:h-[25px] lg:w-[200px] lg:h-[35px] xl:w-[200px] xl:h-[35px]"
                    />
                    <div className="absolute gem-wrapper">
                      <button onClick={() => addToLibrary(item.song)}>
                        <p className="text-white font-bold flex-grow tracking-wide uppercase unlock-now-text whitespace-nowrap text-center sm:text-[8px] md:text-[10px] lg:text-lg xl:text-lg">
                          Add to Library
                        </p>
                      </button>
                    </div>
                  </button>
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
          {/* Hand pointer for step 5 */}
          {currentStep === 6 && i === 0 && isUnlockTimePassed(item.unlock_time) && !isCompleted && (
            <div className="absolute bottom-[-80px] right-[-40px] animate-bounce  pointer-events-none z-[100]">
              <Image
                src="/assets/img/ftue/hand icon.png"
                width={80}
                height={80}
                alt="Hand pointing to Add to Library"
                className="w-20 h-20 object-contain transform"
              />
            </div>
          )}
          {/* Hand pointer for step 4 */}
          {currentStep === 4 && i === 0 && !isCompleted && (
            <div className="absolute bottom-[-70px] right-[-40px] animate-bounce pointer-events-none z-[100]">
              <Image
                src="/assets/img/ftue/hand icon.png"
                width={80}
                height={80}
                alt="Hand pointing to unlocking song"
                className="w-20 h-20 object-contain "
              />
            </div>
          )}
        </div>
      );
    } else {
      slotsContent.push(
        <div key={i} className="flex flex-col items-center unlock-card-wrapper">
          <div className="relative bg-cover bg-center bg-no-repeat overflow-hidden rounded-t-lg sm:w-[120px] md:w-[132px] md:h-[140px] lg:h-[220px] lg:w-[202px] xl:w-[202px] xl:h-[220px]">
            <Image src="/assets/img/hub/empty_slot.png" width={200} height={100} alt="Empty Slot" />
          </div>
        </div>
      );
    }
  }
  return (
    <div className="w-full mb-1">
      <h1 className="text-[#6e6d6d] text-center sm:text-2xl md:text-4xl lg:text-6xl xl:text-6xl mb-3">
        Currently Unlocking
      </h1>
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
      />

      {/* "Finish Now" overlay panel (moved from HubScreen) */}
      {showUnlockingInfoPanel && !isCompleted && (
        <InfoPanel
          onClose={closeUnlockingInfoPanel}
          paragraphs={[
            <>
              <p className="text-lg sm:text-sm font-bold"> Nice Choice!</p>
              <p className="text-lg sm:text-sm">
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
          customClassName="unlock-info-panel"
          transparentBg={false}
        />
      )}

      {/* "Add to Library" overlay panel */}
      {showUnlockOverlayPanel && (
        <InfoPanel
          onClose={() => setShowUnlockOverlayPanel(false)}
          paragraphs={[
            <>
              <p className="text-lg sm:text-sm">
                Your new song is now unlocked, so tap{" "}
                <span className="font-bold">'Add to Library'</span> to make it playable!
              </p>
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
