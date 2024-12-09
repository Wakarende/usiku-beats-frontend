import React, { useEffect, useState } from "react";
import { Spinner } from "react-bootstrap";
import moment from "moment-timezone";
import { useSelector, useDispatch } from "react-redux";
import Popup from "../components/library/Popup";
import Image from "next/image";
import Link from "next/link";
import { instance as axios } from "../services/axios.config";
import { BASE_URL } from "../services/config";
import { useRouter } from "next/router";
import { updateUser } from "../redux/main/authActions";
import { motion } from "framer-motion";
import Header from "../components/header/Header";
import BottomTabNav from "../components/BottomTabNav";

import "./pages.css";

const Library = () => {
  const [songs, setSongs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [unlockedSong, setUnlockedSong] = useState(null);

  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const { user_data, isAuthenticated } = auth;
  const router = useRouter();

  const gemsRequiredToUnlockSong = 20;

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

    // Update the song's unlocked status in the state
    setSongs((prevSongs) =>
      prevSongs.map((s) => (s.id === song.id ? { ...s, isUnlocked: true } : s))
    );
  };

  useEffect(() => {
    setLoading(true);

    const songIds = [14, 54, 65, 56, 143, 144, 119, 146, 142];
    const url = `${BASE_URL}/songs/?${songIds
      .map((id) => `ids=${id}`)
      .join("&")}`;

    axios.get(url).then((res) => {
      const songsWithUnlockStatus = res.data.map((song) => ({
        ...song,
        isUnlocked: user_data?.profile?.player?.player_song_instances.some(
          (instance) => instance.song.id === song.id && instance.unlocked
        ),
      }));
      setSongs(songsWithUnlockStatus);
      setLoading(false);
    });
  }, [user_data]);

  const totalDiscs = user_data?.profile?.player?.total_discs || 0;
  const unlockable = user_data?.profile?.player?.total_discs >= 30;

  const handleSongUnlock = (song) => {
    if (song.isUnlocked) return;

    setUnlockedSong(song);
    setIsPopupOpen(true);

    let unlockTime = moment().add(50, "minutes").toISOString();

    const newUserdata = JSON.parse(JSON.stringify(user_data));
    let newSongInstance = {
      date_added: new Date().toISOString(),
      favourited: false,
      high_score: 0,
      maximum_progress: 0,
      no_of_plays: 0,
      paid_for_flag: false,
      unlock_time: unlockTime,
      unlocked: false,
      song,
    };

    newUserdata.profile.player.player_song_instances.push(newSongInstance);
    newUserdata.profile.player.total_discs -= 30;
    dispatch(updateUser(newUserdata));

    setSongs((prevSongs) =>
      prevSongs.map((s) => (s.id === song.id ? { ...s, isUnlocked: true } : s))
    );
  };

  if (loading) {
    return (
      <div className="cmd-page">
        <Header />
        <div className="kayfo-body-content">
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </div>
        <BottomTabNav />
      </div>
    );
  }

  return (
    <div className="cmd-page">
      <Header />
      <div className="kayfo-body-content">
        <div className="flex justify-center items-center mt-3 ">
          <h1 className="uppercase lib-header text-7xl">Full Song Library</h1>
        </div>
        <div className=" flex mt-4 justify-center items-center">
          <div className="flex justify-center flex-col items-center ">
            <p className="text-library uppercase font-bold text-lg">
              You have {totalDiscs} discs!
            </p>
            <p className="text-white mt-2">Each song costs 30 discs</p>
            <p className="text-white">Find your next song now!</p>
          </div>
          <div className="mt-2">
            <Image
              src={"/assets/img/hub/Disc.png"}
              width={120}
              height={120}
              alt="disc-icon"
            />
          </div>
        </div>
        <div className="gradient-container item-stretch w-full">
          <Image
            src={"/assets/img/library/Gradient-copy.png"}
            alt="gradient-separator"
            width={150}
            height={20}
            className="gradient-image w-full"
          />
        </div>
        <div className="flex flex-wrap justify-center items-stretch gap-8">
          {songs.map((song, index) => (
            <div key={index} className="w-full max-w-xl ">
              <div className="p-4  flex flex-row justify-center items-center">
                {/* Image Section */}
                <div className="w-[150px] h-[150px] flex-shrink-0">
                  <Image
                    src={song.thumbnail_file}
                    alt="Song Cover"
                    width={150}
                    height={150}
                    className="rounded"
                  />
                </div>
                {/* Song Details Section */}
                <div className="flex-grow ml-6">
                  <div className="flex items-center justify-between w-full">
                    <p className="font-bold text-yellow text-lg md:text-md">
                      {song.song_name}
                    </p>
                    <p className="text-yellow uppercase text-xs">
                      {song.country_name}
                    </p>
                  </div>
                  <div className="flex items-center justify-between w-full">
                    <p className="text-white uppercase text-xs">
                      {song.artist_name}
                    </p>
                    <p className="text-white uppercase text-xs">Medium</p>
                  </div>

                  {song.isUnlocked ? (
                    <div className="text-green-500 font-bold mt-4">
                      Unlocked
                    </div>
                  ) : (
                    <div
                      className={`relative mt-3 cursor-pointer ${
                        !unlockable ? "pointer-events-none opacity-50" : ""
                      }`}
                      onClick={() => unlockable && handleSongUnlock(song)}
                    >
                      {/* Button Background Image */}
                      <div className="md:w-[400px]">
                        <Image
                          src="/assets/img/library/Get song button.png"
                          width={200}
                          height={80}
                          alt="get-song-btn"
                        />
                        <span className="text-yellow font-bold text-lg absolute top-0 left-[7%]  md:text-md sm:text-xs">
                          30
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
              {/* Divider */}
              <div className="w-full">
                <Image
                  src={"/assets/img/library/Divider.png"}
                  width={400}
                  height={100}
                  alt="divider"
                  className="w-full"
                />
              </div>
            </div>
          ))}
        </div>
        <Popup isOpen={isPopupOpen} closePopup={() => setIsPopupOpen(false)}>
          <div className="flex justify-center flex-col items-center">
            <h1 className="text-5xl popup-header tracking-wider">
              You've Just Got
            </h1>
            <div className="flex flex-col justify-center items-center relative">
              <div className="relative flex justify-center items-center">
                <Image
                  src={"/assets/img/library/Group_13.png"}
                  width={320}
                  height={380}
                  alt="popup-frame"
                  className="rounded-lg z-1"
                />
                <div className="absolute top-[21.8%] left-[11.6%] overflow-hidden w-[237px] h-[256px] rounded-t-sm">
                  <Image
                    src={unlockedSong?.thumbnail_file}
                    image
                    alt="Artist Image"
                    layout="fill"
                    objectFit="cover"
                    className="z-0"
                  />
                </div>
                <div className="flex flex-col absolute bottom-[10%] z-1">
                  <p className="text-yellow uppercase text-xs text-nowrap ">
                    {unlockedSong?.artist_name}
                  </p>
                  <p className="text-white text-sm">
                    {unlockedSong?.song_name}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="flex justify-center w-[80%]">
            <p className="text-yellow text-center mb-2 text-lg">
              This song will unlock in
              <Image
                src="/assets/img/library/Timer_icon.png"
                alt="timer-icon"
                width={18} // You can set the desired width
                height={18} // Set the desired height
                className="inline-block mx-2 align-middle" // Style to position the image
              />
              <span className="text-white text-lg font-bold">2:00m</span> or use
              your gems to unlock it now
            </p>
          </div>
          <button
            onClick={() => {
              if (
                user_data?.profile?.player?.total_gems >=
                gemsRequiredToUnlockSong
              ) {
                unlockSongWithGems(unlockedSong);
                setIsPopupOpen(false);
                router.push("/hub");
              }
            }}
            className={`mb-3 relative ${
              user_data?.profile?.player?.total_gems < gemsRequiredToUnlockSong
                ? "opacity-80 cursor-not-allowed"
                : ""
            }`}
            disabled={
              user_data?.profile?.player?.total_gems < gemsRequiredToUnlockSong
            }
          >
            <Image
              src={"/assets/img/library/Continue.png"}
              width={250}
              height={100}
              alt="unlocknow-btn"
            />
            <div className="absolute bottom-6">
              <p className="text-yellow ml-2 font-bold text-md">
                {gemsRequiredToUnlockSong}
              </p>
            </div>
          </button>
          <button
            onClick={() => {
              setIsPopupOpen(false);
              router.push("/hub");
            }}
            className=""
          >
            <Image
              src={"/assets/img/library/Continue_button copy.png"}
              width={150}
              height={100}
              alt="continue-btn"
            />
          </button>
        </Popup>
      </div>
      <footer className="bg-contain bg-center bg-no-repeat sticky bottom-0 library-footer flex items-center justify-center">
        <Link href="/hub">
          <motion.div
            className="flex justify-center mt-5"
            animate={{
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              repeatType: "loop",
              ease: "easeInOut",
            }}
          >
            <Image
              src="/assets/img/levelinfo/Back_Button.png"
              alt="Back"
              width={200}
              height={50}
              className="object-contain"
            />
          </motion.div>
        </Link>
      </footer>
    </div>
  );
};

export default Library;
