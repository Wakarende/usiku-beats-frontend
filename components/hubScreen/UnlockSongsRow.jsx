import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { updateUser } from "../../redux/main/authActions";
import Popup from "../library/Popup";
import ConfirmSpendGemsPopup from "./ConfirmSpendGems";
import ParticleEffect from "./ParticleEffect";
import { useRouter } from "next/router";
import useClickSound from "../../hooks/useClickSound";
import InfoPanel from "../infopanel/InfoPanel";
import Image from "next/image";
import "../styles.css";

const UnlockSongsRow = ({ user_data, songs, loading }) => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");
  const [confirmPopupOpen, setConfirmPopupOpen] = useState(false);
  const [selectedSong, setSelectedSong] = useState(null);
  const [unlockedState, setUnlockedState] = useState({});
  const [particleTrigger, setParticleTrigger] = useState({});
  const [lockedSongs, setLockedSongs] = useState([]);

  // FTUE state
  const [ftueStep, setFtueStep] = useState(0);
  const [showUnlockingInfoPanel, setShowUnlockingInfoPanel] = useState(false); // Moved from HubScreen
  const [showUnlockOverlayPanel, setShowUnlockOverlayPanel] = useState(false);
  const [unlockOverlaySong, setUnlockOverlaySong] = useState(null);

  const gemsRequiredToUnlockSong = 20;

  const dispatch = useDispatch();
  const handleClickSound = useClickSound();
  const router = useRouter();

  // Log FTUE status on render
  useEffect(() => {
    console.log("UnlockSongsRow rendered, FTUE status:", {
      step: localStorage.getItem("ftueStep"),
      completed: localStorage.getItem("ftueCompleted"),
    });
  }, []);

  // Track FTUE step and show appropriate panels
  useEffect(() => {
    const storedStep = parseInt(localStorage.getItem("ftueStep") || "1");
    setFtueStep(storedStep);

    // Show "Finish Now" panel for step 4 if not seen yet
    if (storedStep === 4 && !localStorage.getItem("unlockingInfoSeen")) {
      setShowUnlockingInfoPanel(true);
    }
  }, []);

  // Load local storage on mount
  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      const savedUnlocked = JSON.parse(localStorage.getItem("unlockedState")) || {};
      const savedParticles = JSON.parse(localStorage.getItem("particleTrigger")) || {};
      setUnlockedState(savedUnlocked);
      setParticleTrigger(savedParticles);
    } catch (error) {
      console.error("Failed to load from localStorage:", error);
    }
  }, []);

  // Save local storage whenever states change
  useEffect(() => {
    localStorage.setItem("unlockedState", JSON.stringify(unlockedState));
  }, [unlockedState]);

  useEffect(() => {
    localStorage.setItem("particleTrigger", JSON.stringify(particleTrigger));
  }, [particleTrigger]);

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

    if (changedUnlocked) setUnlockedState(updatedUnlocked);
    if (changedParticles) setParticleTrigger(updatedParticles);
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

  // Handle "Finish Now" panel closure
  const closeUnlockingInfoPanel = () => {
    setShowUnlockingInfoPanel(false);
    localStorage.setItem("unlockingInfoSeen", "true");

    // Progress to step 5
    localStorage.setItem("ftueStep", "5");
    setFtueStep(5);
  };

  function addToLibrary(song) {
    console.log("Add to library clicked for song:", song.id);

    // Get current FTUE step
    const currentFtueStep = parseInt(localStorage.getItem("ftueStep") || "1");
    console.log("Current FTUE step:", currentFtueStep);

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

    // Reset UI states
    setUnlockedState((prev) => {
      const newState = { ...prev, [song.id]: false };
      localStorage.setItem("unlockedState", JSON.stringify(newState));
      return newState;
    });
    setParticleTrigger((prev) => ({ ...prev, [song.id]: false }));

    // Handle FTUE step 5 progression
    if (currentFtueStep === 5) {
      console.log("FTUE progressing from step 5 to 6");

      localStorage.setItem("addToLibraryCompleted", "true");
      localStorage.setItem("ftueStep", "6");

      // Use router instead of window.location
      router.push("/hub");
      return;
    }

    if (showUnlockOverlayPanel) {
      setShowUnlockOverlayPanel(false);
    }

    handleClickSound();
  }

  function handleUnlockNowClick(song) {
    setShowUnlockingInfoPanel(false);

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

    // Deduct gems
    newUserdata.profile.player.total_gems -= gemsRequiredToUnlockSong;

    const songId = selectedSong.id || selectedSong.song?.id;
    const songInstance = newUserdata.profile.player.player_song_instances.find(
      (instance) => instance.song.id === songId
    );

    if (songInstance) {
      songInstance.unlock_time = new Date().toISOString();
      dispatch(updateUser(newUserdata));

      setUnlockedState((prev) => {
        const newState = { ...prev, [songId]: true };
        localStorage.setItem("unlockedState", JSON.stringify(newState));
        return newState;
      });

      setParticleTrigger((prev) => ({
        ...prev,
        [songId]: true,
      }));

      if (ftueStep === 4) {
        localStorage.setItem("ftueStep", "5");
        setFtueStep(5);

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
          <div className={`${ftueStep === 4 && i === 0 ? "ftue-hub-highlight-frame" : ""}`}>
            <div
              className={`flex flex-col items-center unlock-card-wrapper 
          ${unlockedState[item.song.id] ? "pulse-effect" : ""}
          ${
            ftueStep === 5 && i === 0 && isUnlockTimePassed(item.unlock_time)
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
                            setUnlockedState((prev) => {
                              const newState = { ...prev, [item.song.id]: true };
                              localStorage.setItem("unlockedState", JSON.stringify(newState));
                              return newState;
                            });
                            setParticleTrigger((prev) => ({
                              ...prev,
                              [item.song.id]: true,
                            }));
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
                    setParticleTrigger((prev) => ({
                      ...prev,
                      [item.song.id]: false,
                    }));
                  }}
                />
              )}
            </div>
          </div>
          {/* Hand pointer for step 5 */}
          {ftueStep === 5 && i === 0 && isUnlockTimePassed(item.unlock_time) && (
            <div className="absolute bottom-[-80px] right-[-40px] animate-bounce z-[10000] pointer-events-none">
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
          {ftueStep === 4 && i === 0 && (
            <div className="absolute bottom-[-70px] right-[-40px] animate-bounce z-[10000] pointer-events-none">
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
          <div className="relative bg-cover bg-center bg-no-repeat overflow-hidden rounded-t-lg sm:w-[120px] md:w-[132px] md:h-[140px] lg:h-[220px] lg:w-[202px] xl:w-[202px] xl:h-[220px]">
            <Image src="/assets/img/hub/empty_slot.png" width={200} height={100} alt="Empty Slot" />
          </div>
        </div>
      );
    }
  }
  return (
    <div className="w-full mb-1">
      <h1 className="text-[#6e6d6d] text-center sm:text-xl md:text-4xl lg:text-6xl xl:text-6xl mb-3">
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
      {showUnlockingInfoPanel && (
        <InfoPanel
          onClose={closeUnlockingInfoPanel}
          paragraphs={[
            <>
              <p className="text-lg">
                We're now back at <span className="font-bold">Your Songs,</span> and the song you
                chose is unlocking, and will be available soon. But let's not wait! Get it now, by
                tapping the <span className="font-bold">Unlock Now</span> button!
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
            zIndex: "10000",
          }}
          customClassName="unlock-info-panel"
          transparentBg={true}
        />
      )}

      {/* "Add to Library" overlay panel */}
      {showUnlockOverlayPanel && (
        <InfoPanel
          onClose={() => setShowUnlockOverlayPanel(false)}
          paragraphs={[
            <>
              <p className="text-lg">
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
          transparentBg={true}
        />
      )}
    </div>
  );
};

export default UnlockSongsRow;
