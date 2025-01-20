"use client";
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { updateUser } from "../../redux/main/authActions";
import Popup from "../library/Popup";
import { useRouter } from "next/router";
import Image from "next/image";
import "../styles.css";

const UnlockSongsRow = ({ user_data, songs, loading }) => {
  const [timerExpired, setTimerExpired] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");
  const gemsRequiredToUnlockSong = 20; // As previously defined

  const dispatch = useDispatch();
  const router = useRouter();

  const CountdownTimer = ({ unlockTime, onExpire }) => {
    const [timeLeft, setTimeLeft] = useState(
      calculateTimeLeft(new Date(unlockTime))
    );

    useEffect(() => {
      const timer = setTimeout(() => {
        const newTimeLeft = calculateTimeLeft(new Date(unlockTime));
        setTimeLeft(newTimeLeft);

        if (
          Object.keys(newTimeLeft).length === 0 &&
          typeof onExpire === "function"
        ) {
          onExpire();
        }
      }, 1000);

      return () => clearTimeout(timer);
    }, [timeLeft, unlockTime]);

    return (
      <p className="small:text-[6px] medium:text-[7px] large:text-[12px] small:pb-[5px] medium:pb-[4px] large:pb-[7px] ">
        {timeLeft.minutes}:{timeLeft.seconds}m
      </p>
    );
  };

  const calculateTimeLeft = (unlockTime) => {
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
  };

  const isUnlockTimePassed = (unlockTime) => {
    if (!unlockTime) {
      console.error("Invalid or missing unlock time:", unlockTime);
      return false;
    }

    try {
      const currentTimeUtc = new Date().toISOString();
      const unlockTimeUtc = new Date(unlockTime).toISOString();
      return unlockTimeUtc <= currentTimeUtc;
    } catch (error) {
      console.error("Error processing dates:", error);
      return false;
    }
  };

  const addToLibrary = (song) => {
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
  };

  const unlockSongWithGems = (song) => {
    let newUserdata = JSON.parse(JSON.stringify(user_data));

    if (newUserdata.profile.player.total_gems < gemsRequiredToUnlockSong) {
      setPopupMessage(
        "You don't have enough gems to unlock this song right now."
      );
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
  };

  // Get locked (not yet unlocked) songs
  const lockedSongs =
    user_data?.profile?.player?.player_song_instances?.filter(
      (item) => !item.unlocked
    ) || [];

  // We always want to show 3 slots. Fill with locked songs or placeholders.
  const slots = 3;
  const slotsContent = [];

  for (let i = 0; i < slots; i++) {
    const item = lockedSongs[i]; // item will be undefined if there's no locked song for this slot
    if (item) {
      // Render the song card
      const frameImage =
        i % 2 === 0
          ? "/assets/img/hub/unlock_frame.png"
          : "/assets/img/hub/unlock_frame_2.png";

      slotsContent.push(
        <div key={i} className="flex flex-col items-center unlock-card-wrapper">
          <div
            className="unlock-card relative bg-cover bg-center bg-no-repeat overflow-hidden rounded-t-lg small:w-[120px] medium:w-[132px] medium:h-[116px] large:w-[200px] large:h-[180px]"
            style={{
              backgroundImage: `url(${item.song.thumbnail_file})`,
            }}
          >
            <div className="flex justify-center items-center">
              <div className="absolute small:top-[-6%] medium:top-[-6%] large:top-[-1%]">
                <p className="text-yellow text-center title-text tracking-wider flex items-center justify-center whitespace-nowrap small:text-xl  medium:text-xl large:text-xl z-1">
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
                className="h-[7.3rem] large:h-[180px]"
              />
            </div>
            <div className="absolute bottom-0 left-0 right-0 flex items-center justify-center">
              <div className="flex items-center justify-center z-1 w-full">
                <p className="text-white font-bold ml-2">
                  {isUnlockTimePassed(item.unlock_time) ? (
                    <button onClick={() => addToLibrary(item.song)}>
                      <p className="tracking-wide unlocked-text text-nowrap large:ml-1 small:text-[6px] medium:text-[7px] large:text-[10px] small:pb-[5px] medium:pb-[4px] large:pb-[7px]">
                        Unlocked
                      </p>
                    </button>
                  ) : (
                    <CountdownTimer
                      unlockTime={item.unlock_time}
                      onExpire={() => setTimerExpired(!timerExpired)}
                    />
                  )}
                </p>
              </div>
            </div>
          </div>
          {!isUnlockTimePassed(item.unlock_time) ? (
            <div className="relative mt-0.5">
              <button
                className="w-full relative"
                // disabled={
                //   user_data?.profile?.player?.total_gems <
                //   gemsRequiredToUnlockSong
                // }
                onClick={() => unlockSongWithGems(item.song)}
              >
                <Image
                  src="/assets/img/hub/Button blank.png"
                  alt="Button"
                  width={160}
                  height={40}
                  className="small:h-[20px] small:w-[120px] medium:w-[200px] medium:h-[25px] large:w-[200px] large:h-[35px]"
                />
                <div className="absolute inset-0 flex items-center justify-between px-1">
                  <div className="flex items-center gap-0.5">
                    <Image
                      src="/assets/img/hub/Gem.png"
                      alt="Gem"
                      width={16}
                      height={16}
                      className="small:w-[16px] small:h-[16px] medium:w-[16px] medium:h-[16px] large:w-[20px] large:h-[20px]"
                    />
                    <div className="flex items-center">
                      <span className="text-yellow  small:text-[8px] medium:text-[10px] large:text-[14px] ">
                        {gemsRequiredToUnlockSong}
                      </span>
                    </div>
                  </div>
                  <p className="text-white uppercase whitespace-nowrap font-bold unlock-now-text small:text-[8px] medium:text-[10px] large:text-lg">
                    unlock now
                  </p>
                  <Image
                    src="/assets/img/hub/Unlock.png"
                    alt="Unlock"
                    width={16}
                    height={16}
                    className="small:w-[16px] small:h-[16px] medium:w-[16px] medium:h-[16px] large:w-[20px] large:h-[20px]"
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
                className="small:h-[20px] small:w-[120px] medium:w-[200px] medium:h-[25px] large:w-[200px] large:h-[35px] "
              />
              <div className="absolute gem-wrapper">
                <button onClick={() => addToLibrary(item.song)}>
                  <p className="text-white font-bold flex-grow tracking-wide uppercase unlock-now-text whitespace-nowrap text-center small:text-xs medium:text-md large:text-lg">
                    Add to Library
                  </p>
                </button>
              </div>
            </button>
          )}
        </div>
      );
    } else {
      // Render the placeholder slot card
      slotsContent.push(
        <div key={i} className="flex flex-col items-center unlock-card-wrapper">
          <div className="relative bg-cover bg-center bg-no-repeat overflow-hidden rounded-t-lg small:w-[120px] medium:w-[132px] medium:h-[140px] large:h-[220px] large:w-[202px]">
            <Image
              src="/assets/img/hub/No_song_unlock_.png"
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
      <h1 className="text-[#6e6d6d] text-center small:text-xl medium:text-4xl large:text-6xl large:mb-3">
        Currently Unlocking
      </h1>
      <div className="grid grid-cols-3 w-full gap-x-1.5">{slotsContent}</div>
      {songs?.length === 0 && (
        <div className="kayfo-filter-no-result-box">
          {!loading ? "No result" : "loading..."}
        </div>
      )}
      <Popup isOpen={isPopupOpen} closePopup={() => setIsPopupOpen(false)}>
        <div className="bg-[#1a1a1a] p-4 text-center md:w-2/3 rounded-lg">
          <p className="text-yellow font-bold text-2xl text-nowrap tracking-wide mb-3">
            Not Enough Gems!
          </p>
          <p className="text-white mb-3 tracking-wider">{popupMessage}</p>
          <button
            className="bg-[#5fc9d2] text-white px-4 py-2 mt-2 w-full uppercase text-xl"
            onClick={() => setIsPopupOpen(false)}
          >
            Ok
          </button>
        </div>
      </Popup>
    </div>
  );
};

export default UnlockSongsRow;
