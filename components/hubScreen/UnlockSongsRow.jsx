"use client";
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { updateUser } from "../../redux/main/authActions";
import Popup from "../library/Popup";
import { useRouter } from "next/router";
import Image from "next/image";
import useClickSound from "../../hooks/useClickSound";
import ParticleEffect from "./ParticleEffect";
import "../styles.css";

const UnlockSongsRow = ({ user_data, songs, loading }) => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");
  const gemsRequiredToUnlockSong = 20;

  // Use local state for whether each song is "pulsing" and "particle effect triggered"
  const [unlockedState, setUnlockedState] = useState({});
  const [particleTrigger, setParticleTrigger] = useState({});

  const dispatch = useDispatch();
  const router = useRouter();
  const handleClickSound = useClickSound();

  // On mount, read both states from localStorage (if any)
  useEffect(() => {
    if (typeof window === "undefined") return; // safeguard for SSR
    try {
      const savedUnlocked = JSON.parse(localStorage.getItem("unlockedState")) || {};
      const savedParticles = JSON.parse(localStorage.getItem("particleTrigger")) || {};
      setUnlockedState(savedUnlocked);
      setParticleTrigger(savedParticles);
    } catch (error) {
      console.error("Failed to load from localStorage:", error);
    }
  }, []);

  // Whenever unlockedState or particleTrigger changes, save them
  useEffect(() => {
    localStorage.setItem("unlockedState", JSON.stringify(unlockedState));
  }, [unlockedState]);

  useEffect(() => {
    localStorage.setItem("particleTrigger", JSON.stringify(particleTrigger));
  }, [particleTrigger]);

  // ensures the user sees the pulse if they left the page and came back.
  const lockedSongs =
    user_data?.profile?.player?.player_song_instances?.filter((item) => !item.unlocked) || [];

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

  function addToLibrary(song) {
    const newUserdata = JSON.parse(JSON.stringify(user_data));
    const songInstance = newUserdata.profile.player.player_song_instances.find(
      (instance) => instance.song.id === song.id
    );
    if (songInstance) {
      songInstance.unlocked = true;
      songInstance.unlock_time = null;
      dispatch(updateUser(newUserdata));
    } else {
      console.error("Song not found in song instances", song.id);
    }
    // Turn off pulse & particle effect
    setUnlockedState((prev) => {
      const newState = { ...prev, [song.id]: false };
      localStorage.setItem("unlockedState", JSON.stringify(newState));
      return newState;
    });
    setParticleTrigger((prev) => ({ ...prev, [song.id]: false }));
    handleClickSound();
  }

  function unlockSongWithGems(song) {
    let newUserdata = JSON.parse(JSON.stringify(user_data));
    if (newUserdata.profile.player.total_gems < gemsRequiredToUnlockSong) {
      setPopupMessage("You don't have enough gems to unlock this song right now.");
      setIsPopupOpen(true);
      return;
    }

    newUserdata.profile.player.total_gems -= gemsRequiredToUnlockSong;
    const songInstance = newUserdata.profile.player.player_song_instances.find(
      (instance) => instance.song.id === song.id
    );
    if (songInstance) {
      songInstance.unlocked = true;
      songInstance.unlock_time = null;
      dispatch(updateUser(newUserdata));
    } else {
      console.error("Song not found in song instances", song.id);
    }

    handleClickSound();
  }

  //Countdown timer
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

  //Generate up to 3 locked-song slots
  const slots = 3;
  const slotsContent = [];

  for (let i = 0; i < slots; i++) {
    const item = lockedSongs[i];
    if (item) {
      const frameImage =
        i % 2 === 0 ? "/assets/img/hub/unlock_frame.png" : "/assets/img/hub/unlock_frame_2.png";

      slotsContent.push(
        <div
          key={i}
          className={`flex flex-col items-center unlock-card-wrapper ${
            unlockedState[item.song.id] ? "pulse-effect" : ""
          }`}
        >
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

          {!isUnlockTimePassed(item.unlock_time) ? (
            <div className="relative mt-0.5">
              <button className="w-full relative" onClick={() => unlockSongWithGems(item.song)}>
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
            <button className="unlock-button flex items-center justify-center">
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
          )}
          {/* Show particle effect if triggered */}
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
      );
    } else {
      // Render the placeholder slot card
      slotsContent.push(
        <div key={i} className="flex flex-col items-center unlock-card-wrapper">
          <div className="relative bg-cover bg-center bg-no-repeat overflow-hidden rounded-t-lg sm:w-[120px] md:w-[132px] md:h-[140px] lg:h-[220px] lg:w-[202px] xl:w-[202px] xl:h-[220px]">
            <Image
              src="/assets/img/hub/empty_slot.png"
              width={200}
              height={100}
              alt="no-song-to-unlock-card"
            />
          </div>
        </div>
      );
    }
  }

  return (
    <div className="w-full mb-1">
      <h1 className="text-[#6e6d6d] text-center sm:text-xl md:text-4xl  lg:text-6xl lg:mb-3 xl:text-6xl xl:mb-3">
        Currently Unlocking
      </h1>
      <div className="grid grid-cols-3 w-full gap-x-1.5">{slotsContent}</div>
      {songs?.length === 0 && <div className="p-1">{!loading ? "" : "loading..."}</div>}
      <Popup isOpen={isPopupOpen} closePopup={() => setIsPopupOpen(false)}>
        <div className="bg-[#1a1a1a] p-4 text-center md:w-2/3 rounded-lg sm:w-[280px]">
          <p className="text-yellow font-bold text-2xl text-nowrap tracking-wide mb-3">
            Not Enough Gems!
          </p>
          <p className="text-white mb-3 tracking-wider">{popupMessage}</p>
          <button
            className="text-white mt-2 w-full uppercase text-xl enough-gems-btn bg-no-repeat bg-center bg-contain"
            onClick={() => {
              setIsPopupOpen(false);
              handleClickSound();
            }}
          >
            Ok
          </button>
        </div>
      </Popup>
    </div>
  );
};

export default UnlockSongsRow;
