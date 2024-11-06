"use client";
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { updateUser } from "../../redux/main/authActions";
import moment from "moment";

import { useRouter } from "next/router";
import Image from "next/image";
import "../styles.css";

const UnlockSongsRow = ({ user_data, songs, loading }) => {
  const discsRequiredToUnlockSong = 30;
  const gemsRequiredToUnlockSong = 20;

  const dispatch = useDispatch();
  const router = useRouter();

  const CountdownTimer = ({ unlockTime }) => {
    const [timeLeft, setTimeLeft] = useState(
      calculateTimeLeft(new Date(unlockTime))
    );

    useEffect(() => {
      const timer = setTimeout(() => {
        setTimeLeft(calculateTimeLeft(new Date(unlockTime)));
        console.log("time left", timeLeft);
      }, 1000);

      return () => clearTimeout(timer);
    }, [timeLeft, unlockTime]);

    return (
      <p className="text-xs timer-text">
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
    } else {
      console.error("Song not found in song instances", song.id);
      return;
    }
    dispatch(updateUser(newUserdata));
  };

  const handleGemClick = (song) => {
    let newUserdata = JSON.parse(JSON.stringify(user_data));
    newUserdata.profile.player.total_gems -= gemsRequiredToUnlockSong;

    const songInstance = newUserdata.profile.player.player_song_instances.find(
      (instance) => instance.song.id === song.id
    );

    if (songInstance && songInstance.unlock_time) {
      const unlockTime = moment(songInstance.unlock_time);
      const now = moment();
      const timeDiff = unlockTime.diff(now);
      const percentageReduction = 0.5;
      const reducedTime = timeDiff * (1 - percentageReduction);
      const newUnlockTime = moment(now.valueOf() + reducedTime).toISOString();
      songInstance.unlock_time = newUnlockTime;
    }
    dispatch(updateUser(newUserdata));
  };

  const unlockSongWithGems = (song) => {
    let newUserdata = JSON.parse(JSON.stringify(user_data));

    if (newUserdata.profile.player.total_gems < gemsRequiredToUnlockSong) {
      console.error("Not enough gems to unlock the song");
      return;
    }
    newUserdata.profile.player.total_gems -= gemsRequiredToUnlockSong;
    const songInstance = newUserdata.profile.player.player_song_instances.find(
      (instance) => instance.song.id === song.id
    );
    if (songInstance) {
      songInstance.unlocked = true;
      songInstance.unlock_time = null;
    } else {
      console.error("Song not found in song instances", song.id);
      return;
    }
    dispatch(updateUser(newUserdata));
  };

  const totalDiscs = user_data?.profile?.player?.total_discs || 0;

  return (
    <div className="kayfo-masonry-main mt-2">
      <div className="flex flex-row justify-center item-start overflow-x-auto">
        {user_data?.profile?.player?.player_song_instances
          ?.filter((item) => !item.unlocked)
          .map((item, index) => (
            <div
              key={index}
              className="flex flex-col items-center m-1 unlock-card-wrapper "
            >
              {/* Unlock Card */}
              <div
                className="unlock-card relative bg-cover bg-center bg-no-repeat overflow-hidden rounded"
                style={{
                  backgroundImage: `url(${item.song.thumbnail_file})`,
                }}
              >
                {/* Top Banner with Song Name */}
                <div className="absolute top-0 left-0 right-0 h-4">
                  <Image
                    src="/assets/img/hub/Title bar.png"
                    alt="Title Bar"
                    layout="fill"
                    objectFit="cover"
                  />
                  <p className="absolute inset-0 text-yellow-300 text-center title-text tracking-wider">
                    {item.song.song_name}
                  </p>
                </div>

                {/* "Unlocks in" Text */}
                <div className="absolute bottom-6 left-0 right-0 flex flex-col items-center justify-center">
                  <h3 className="text-white text-lg tracking-wide uppercase">
                    unlocks in
                  </h3>
                </div>
                {/* Gradient Overlay with Timer */}
                <div className="gradient-overlay absolute bottom-0 left-0 right-0 h-8 flex items-center justify-center">
                  <Image
                    src="/assets/img/hub/Gradient.png"
                    alt="Gradient Overlay"
                    layout="fill"
                    objectFit="cover"
                  />
                  <div className="flex items-center timer-bg z-10 justify-center rounded ">
                    <Image
                      src="/assets/img/hub/Timer.png"
                      alt="Timer Icon"
                      width={10}
                      height={10}
                    />
                    <p className="text-white font-bold text-xs">
                      {isUnlockTimePassed(item.unlock_time) ? (
                        <button onClick={() => addToLibrary(item.song)}>
                          <p className="add-to-lib tracking-wide unlocked-text text-nowrap">
                            Add to library
                          </p>
                        </button>
                      ) : (
                        <CountdownTimer unlockTime={item.unlock_time} />
                      )}
                    </p>
                  </div>
                </div>
              </div>
              {/* Unlock Now Button Below the Card */}
              {!isUnlockTimePassed(item.unlock_time) && (
                <div className="mt-1">
                  <button
                    className="unlock-button flex items-center justify-center relative"
                    disabled={
                      user_data?.profile?.player?.total_gems <
                      gemsRequiredToUnlockSong
                    }
                    onClick={() => unlockSongWithGems(item.song)}
                  >
                    <Image
                      src="/assets/img/hub/Button Blank.png"
                      alt="Unlock Button Background"
                      width={160}
                      height={60}
                    />
                    <div className="absolute flex gem-wrapper">
                      <div className=" flex gap-0.5 btn-gem">
                        <Image
                          src="/assets/img/hub/Gem.png"
                          alt="Gem Icon"
                          width={10}
                          height={10}
                        />
                        <h3 className="text-yellow-300 tracking-wide gems-required-text">
                          {gemsRequiredToUnlockSong}
                        </h3>
                      </div>
                      <p className="text-white font-bold flex-grow tracking-wide uppercase unlock-now-text whitespace-nowrap text-center">
                        unlock now
                      </p>
                      <Image
                        src="/assets/img/hub/Unlock.png"
                        alt="Unlock Icon"
                        width={15}
                        height={15}
                        className="unlock-icon"
                      />
                    </div>
                  </button>
                </div>
              )}
            </div>
          ))}
        {/* Disc Indicator Card */}
        <div
          className="disc-indicator-wrapper my-2"
          onClick={() => router.push("/library")}
        >
          <h1 className="total-discs-text text-xl text-white tracking-wider">
            {totalDiscs}
          </h1>
          <Image
            src="/assets/img/hub/Disc.png"
            className="disc-icon"
            alt="Disc Icon"
            width={80}
            height={80}
          />
          <p className="text-yellow-300 disc-text text-center font-bold">
            {totalDiscs >= discsRequiredToUnlockSong
              ? "You have enough discs to unlock a new song!"
              : ` Earn ${
                  discsRequiredToUnlockSong - totalDiscs
                } more discs to unlock your next song`}
          </p>
        </div>

        {songs?.length === 0 && (
          <div className="kayfo-filter-no-result-box">
            {!loading ? "No result" : "loading..."}
          </div>
        )}
      </div>
    </div>
  );
};

export default UnlockSongsRow;
