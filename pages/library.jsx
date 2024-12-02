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
        <div className="flex flex-wrap gap-8 mt-8">
          {songs.map((song, index) => (
            <div
              key={index}
              className="p-4 rounded-lg md:w-[400px] lg:w-[500px] sm:w-[400px] flex flex-row justify-center items-center"
            >
              {/* Image Section */}
              <Image
                src={song.thumbnail_file}
                alt="Song Cover"
                width={150}
                height={150}
                className="rounded"
              />
              {/* Song Details Section */}
              <div className="flex-grow ml-6">
                <p className="font-bold text-yellow-300 text-lg md:text-md">
                  {song.song_name}
                </p>
                <p className="text-white uppercase text-xs">
                  {song.artist_name}
                </p>
                {song.isUnlocked ? (
                  <div className="text-green-500 font-bold mt-4">Unlocked</div>
                ) : (
                  <div
                    className={` relative mt-3 cursor-pointer ${
                      !unlockable ? "pointer-events-none" : ""
                    }`}
                    onClick={() => unlockable && handleSongUnlock(song)}
                  >
                    {/* Button Background Image */}
                    <div className="md:w-[400px]">
                      <Image
                        src="/assets/img/hub/Button blank.png"
                        alt="Get Song Button"
                        width={200}
                        height={80}
                      />
                    </div>
                    {/* Disc Icon and Text Overlay */}
                    <div className="absolute inset-0 flex  items-center justify-between">
                      <div className="flex items-center mx-4">
                        {/* Disc Icon */}
                        <div className="flex items-center left-[-40px] absolute sm:w-6 sm:h-6">
                          <img
                            src="/assets/img/hub/Disc.png"
                            alt="Disc Icon"
                            className="w-14 h-14"
                          />
                          <span className="text-yellow-300 font-bold text-lg absolute left-12 top-3 md:text-md sm:text-xs">
                            30
                          </span>
                        </div>
                        {/* Button Text */}
                        <p className="text-white font-bold text-lg text-nowrap ml-4 text-center md:text-md sm:text-md">
                          GET SONG
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        <Popup isOpen={isPopupOpen} closePopup={() => setIsPopupOpen(false)}>
          <h1 className="mt-2">You have successfully unlocked the song:</h1>
          <b style={{ fontSize: "50px" }}>{unlockedSong?.song_name}</b>
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
      </div>
      <Link href="/hub" passHref>
        <div className="flex justify-center mt-5">
          <Image
            src="/assets/img/levelinfo/Back_Button.png"
            alt="Back"
            width={300}
            height={300}
          />
        </div>
      </Link>
    </div>
  );
};

export default Library;
