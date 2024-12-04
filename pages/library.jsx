import React, { useEffect, useState } from "react";
import { Button, Spinner } from "react-bootstrap";
import moment from "moment-timezone";
import { useSelector, useDispatch } from "react-redux";
import Popup from "../components/Popup";
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

    let unlockTime = moment().add(2, "minutes").toISOString();

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
        <div className="flex justify-center mt-3 ">
          <h1 className="uppercase lib-header text-7xl">Full Song Library</h1>
        </div>
        <div className=" flex mt-4 justify-center">
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
        <div className="gradient-container w-full mt-0">
          <Image
            src={"/assets/img/library/Gradient-copy.png"}
            alt="gradient-separator"
            width={150}
            height={20}
            className="gradient-image w-full "
          />
        </div>
        <div className="flex flex-wrap gap-8 mt-8">
          {songs.map((song, index) => (
            <div key={index}>
              <div className="p-4 rounded-lg md:w-[400px] lg:w-[500px] sm:w-[400px] flex flex-row justify-center items-center">
                {/* Image Section */}
                <div>
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
                  <p className="font-bold text-yellow text-lg md:text-md">
                    {song.song_name}
                  </p>
                  <p className="text-white uppercase text-xs">
                    {song.artist_name}
                  </p>
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
                        <span className="text-yellow font-bold text-lg absolute top-1 left-4 sm:left-3 md:text-md sm:text-xs">
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
                />
              </div>
            </div>
          ))}
        </div>
        <Popup isOpen={isPopupOpen} closePopup={() => setIsPopupOpen(false)}>
          <h1 className="mt-2 text-xl">
            You have successfully unlocked the song:
          </h1>
          <b className="text-nowrap" style={{ fontSize: "50px" }}>
            {unlockedSong?.song_name}
          </b>
          <button
            onClick={() => {
              setIsPopupOpen(false);
              router.push("/hub");
            }}
            className="mt-3 px-6 py-3 bg-blue-500 text-white font-semibold text-xl rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-700 focus:ring-opacity-50"
          >
            Go to my library
          </button>
        </Popup>
        {/* <Popup isOpen={isPopupOpen} closePopup={() => setIsPopupOpen(false)}>
          <div
            className=" w-full h-full p-6 flex flex-col items-center"
            style={{
              backgroundImage: "url('/assets/img/dailyreward/BG.png')",
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
            }}
          >
            <h1 className="mt-2 text-2xl text-white tracking-wide">
              You have successfully unlocked the song:
            </h1>
            <b
              style={{ fontSize: "50px" }}
              className="text-yellow-300 text-center"
            >
              {unlockedSong?.song_name}
            </b>
            {/* <button
              onClick={() => {
                setIsPopupOpen(false);
                router.push("/hub");
              }}
              className="mt-3 px-6 py-3 bg-blue-500 text-white font-semibold text-xl rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-700 focus:ring-opacity-50"
            >
              Go to my library
            </button> */}
        {/* <button
              onClick={() => {
                setIsPopupOpen(false);
                router.push("/hub");
              }}
              className="mt-6 px-6 py-3 text-white font-semibold text-md text-nowrap rounded focus:outline-none focus:ring-2 focus:ring-blue-700 focus:ring-opacity-50 uppercase"
              style={{
                backgroundImage: "url('/assets/img/hub/Button blank.png')",
                backgroundSize: "cover",
                backgroundPosition: "center",
                border: "none",
                width: "200px",
                height: "60px",
              }}
            >
              Go to my library
            </button>
          </div>
        </Popup> */}
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
            />
          </motion.div>
        </Link>
      </footer>
    </div>
  );
};

export default Library;
