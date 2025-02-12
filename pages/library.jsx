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
import { OverlayCard } from "../components/artistinfo/OverlayCard";
import InfoPanel from "../components/infopanel/InfoPanel";
import useSound from "use-sound";
import useClickSound from "../hooks/useClickSound";
import "./pages.css";

const isSongInQueue = (songInstance) => {
  if (!songInstance) return false;
  if (songInstance.unlocked) return false;
  if (!songInstance.unlock_time) return false;

  const unlockTime = new Date(songInstance.unlock_time).getTime();
  return unlockTime > Date.now();
};

const Library = () => {
  const [songs, setSongs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [unlockedSong, setUnlockedSong] = useState(null);
  const [isOverlayOpen, setIsOverlayOpen] = useState(false);
  const [selectedArtist, setSelectedArtist] = useState({
    artistName: "",
    bio: "",
    socialMedia: [],
  });

  const [isFtue, setIsFtue] = useState(false); // Are we in tutorial flow?
  const [showFtuePanel, setShowFtuePanel] = useState(false); // Show info panel?

  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const { user_data } = auth;
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

    setSongs((prevSongs) =>
      prevSongs.map((s) => (s.id === song.id ? { ...s, isUnlocked: true } : s))
    );

    handleClickSound();
  };

  useEffect(() => {
    setLoading(true);

    const params = new URLSearchParams(window.location.search);
    const ftueParam = params.get("ftueGameplayCompleted");
    const libraryTutorialSeen = localStorage.getItem("libraryTutorialSeen");
    const ftueCompleted = localStorage.getItem("ftueCompleted");
    if (
      ftueParam === "true" &&
      ftueCompleted !== "true" &&
      !libraryTutorialSeen
    ) {
      setIsFtue(true);
      setShowFtuePanel(true);
      localStorage.setItem("libraryTutorialSeen", "true");
    }

    const songIds = [14, 54, 65, 56, 143, 144, 119, 136, 142, 147];
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
  const unlockable = totalDiscs >= 30;

  const handleSongUnlock = (song) => {
    if (song.isUnlocked) return;

    setUnlockedSong(song);
    setIsPopupOpen(true);

    let unlockTime = null;
    let unlockedFlag = true;

    if (!isFtue) {
      unlockTime = moment().add(2, "minutes").toISOString();
      unlockedFlag = false;
    }

    const newUserdata = JSON.parse(JSON.stringify(user_data));
    const existingInstance =
      newUserdata.profile.player.player_song_instances.find(
        (instance) => instance.song.id === song.id
      );

    if (
      existingInstance &&
      !existingInstance.unlocked &&
      isSongInQueue(existingInstance)
    ) {
      console.log("Song is already unlocking; cannot purchase again");
      return;
    }

    let newSongInstance = {
      date_added: new Date().toISOString(),
      favourited: false,
      high_score: 0,
      maximum_progress: 0,
      no_of_plays: 0,
      paid_for_flag: false,
      unlock_time: unlockTime,
      unlocked: unlockedFlag,
      song,
    };

    newUserdata.profile.player.total_discs -= 30;
    newUserdata.profile.player.player_song_instances.push(newSongInstance);

    dispatch(updateUser(newUserdata));

    setSongs((prevSongs) =>
      prevSongs.map((s) => (s.id === song.id ? { ...s, isUnlocked: true } : s))
    );
    handleClickSound();
  };

  const handlePopupContinue = () => {
    setIsPopupOpen(false);

    if (isFtue) {
      router.push("/hub?ftueGameplayCompleted=true");
    } else {
      router.push("/hub");
    }
    handleClickSound();
  };

  const openOverlay = async (artistId) => {
    handleClickSound();
    setIsOverlayOpen(true);

    try {
      const response = await axios.get(`${BASE_URL}artist-detail/${artistId}/`);
      let artist = response.data;
      setSelectedArtist({
        artistName: artist.name,
        bio: artist.bio,
        socialMedia: {
          spotify: artist.spotify_link,
          twitter: artist.twitter_link,
          youtube: artist.youtube_link,
          instagram: artist.instagram_link,
          website: artist.website_link,
        },
      });
    } catch (error) {
      console.error("Error fetching artist details:", error);
      setIsOverlayOpen(false);
    }
  };

  const closeOverlay = () => {
    handleClickSound();
    setIsOverlayOpen(false);
  };

  const handleArtistClick = (artistId) => {
    openOverlay(artistId);
  };

  const handleClickSound = useClickSound();
  if (loading) {
    return (
      <div className="cmd-page">
        <div className="kayfo-body-content">
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </div>
        <BottomTabNav />
      </div>
    );
  }

  const hasUnlockedSong =
    user_data?.profile?.player?.player_song_instances?.some(
      (instance) => instance.unlocked
    );

  return (
    <div className="cmd-page">
      <Header />
      {showFtuePanel && (
        <InfoPanel
          onClose={() => setShowFtuePanel(false)}
          paragraphs={[
            <>
              This is the <span className="font-bold">Library</span> where you
              can browse and unlock songs for your collection
            </>,
            "Choose your first song now!",
          ]}
        />
      )}
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
        {/* Songs List */}
        <div className="flex flex-wrap justify-center items-stretch gap-8">
          {songs.map((song, index) => {
            const instance =
              user_data?.profile?.player?.player_song_instances.find(
                (inst) => inst.song.id === song.id
              );
            const inQueue = isSongInQueue(instance);
            const showUnlocked = song.isUnlocked || inQueue;

            return (
              <div key={index} className="w-full max-w-xl ">
                <div className="p-4 flex flex-row justify-center items-center">
                  <div className="w-[150px] h-[150px] flex-shrink-0">
                    <Image
                      src={song.thumbnail_file}
                      alt="Song Cover"
                      width={150}
                      height={150}
                      className="rounded"
                    />
                  </div>

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
                      <p
                        className="text-white uppercase text-xs cursor-pointer"
                        onClick={() => handleArtistClick(song.artist?.id)}
                      >
                        {song.artist_name}
                      </p>
                      <p className="text-white uppercase text-xs">Medium</p>
                    </div>

                    {/* Unlock Button */}
                    {showUnlocked ? (
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
                        <div className="md:w-[400px]">
                          <Image
                            src="/assets/img/library/Get song button.png"
                            width={200}
                            height={80}
                            alt="get-song-btn"
                          />
                          <span className="text-yellow font-bold text-lg absolute top-0 left-[7%] md:text-md sm:text-xs">
                            30
                          </span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
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
            );
          })}
        </div>

        {/* Popup shown after user clicks unlock */}
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
                <div className="absolute top-[21.8%] left-[11.6%] overflow-hidden w-[237px] h-[256px]">
                  <Image
                    src={unlockedSong?.thumbnail_file}
                    alt="Artist Image"
                    layout="fill"
                    className="z-0 w-[237px] h-[256px] object-contain"
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

          {/* If NOT in FTUE, show the usual timer & gem unlock. If FTUE, skip this section. */}
          {!isFtue && (
            <>
              <div className="flex justify-center w-[80%]">
                <p className="text-yellow text-center mb-2 text-lg">
                  This song will unlock in
                  <Image
                    src="/assets/img/library/Timer_icon.png"
                    alt="timer-icon"
                    width={18}
                    height={18}
                    className="inline-block mx-2 align-middle"
                  />
                  <span className="text-white text-lg font-bold">2:00m</span> or
                  use your gems to unlock it now
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
                  user_data?.profile?.player?.total_gems <
                  gemsRequiredToUnlockSong
                    ? "opacity-80 cursor-not-allowed"
                    : ""
                }`}
                disabled={
                  user_data?.profile?.player?.total_gems <
                  gemsRequiredToUnlockSong
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
            </>
          )}

          <button
            onClick={() => {
              // In FTUE, go to hub with ftueGameplayCompleted=true
              handlePopupContinue();
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
      {/* FOOTER */}
      <footer className="bg-contain bg-center bg-no-repeat sticky bottom-0 library-footer flex items-center justify-center">
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
          onClick={() => {
            handleClickSound();
            if (isFtue && !hasUnlockedSong) {
              console.log("FTUE: User must unlock a song first");
              return;
            } else {
              router.push("/hub");
            }
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
      </footer>

      <OverlayCard
        isOpen={isOverlayOpen}
        onClose={closeOverlay}
        artistName={selectedArtist.artistName}
        bio={selectedArtist.bio}
        socialMedia={selectedArtist.socialMedia}
      />
      {/* FTUE Info Panel */}
    </div>
  );
};

export default Library;
