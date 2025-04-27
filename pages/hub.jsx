"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useSelector, useDispatch } from "react-redux";
import moment from "moment-timezone";
import Image from "next/image";
import { motion } from "framer-motion";

import Header from "../components/header/Header";
import { instance as axios } from "../services/axios.config";
import { BASE_URL } from "../services/config";
import { updateUser } from "../redux/main/authActions";
import { OverlayCard, ArtistImage } from "../components/artistinfo/OverlayCard";
import LevelUpPopup from "../components/leveluppopup/LevelUpPopup";
import LibraryFooter from "../components/footer/Footer";
import UnlockSongsRow from "../components/hubScreen/UnlockSongsRow";
import DailyRewardPopup from "../components/dailyreward/DailyPopup";
import InfoPanel from "../components/infopanel/InfoPanel"; // <--- import your info panel

import useClickSound from "../hooks/useClickSound";
import { useAudio } from "../src/context/AudioProvider";
import "./pages.css";

const HubScreen = () => {
  const [isDailyPopupOpen, setIsDailyPopupOpen] = useState(false);
  const [isUnlockPopupOpen, setIsUnlockPopupOpen] = useState(false);
  const [unlockedSong, setUnlockedSong] = useState(null);
  const [songs, setSongs] = useState([]);
  const [unlockableSongs, setUnlockableSongs] = useState([]);
  const [visibleUnlockableSongs, setVisibleUnlockableSongs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isOverlayOpen, setIsOverlayOpen] = useState(false);
  const [selectedArtist, setSelectedArtist] = useState({
    artistName: "",
    bio: "",
    socialMedia: [],
  });
  const [isLevelUpPopupOpen, setIsLevelUpPopupOpen] = useState(false);
  const [newLevel, setNewLevel] = useState();
  const [isPulsing, setIsPulsing] = useState(false);

  const [showFtuePanel, setShowFtuePanel] = useState(false);

  const auth = useSelector((state) => state.auth);
  const { user_data } = auth;
  const dispatch = useDispatch();
  const router = useRouter();

  const unlockable = user_data?.profile?.player?.total_discs >= 30;

  const { fadeOutBgMusic, playBoom } = useAudio();

  // useEffect(() => {
  //   playBgMusic();
  // }, [playBgMusic]);

  const [footerGlowActive, setFooterGlowActive] = useState(false);
  const [ftueStep, setFtueStep] = useState(0);

  useEffect(() => {
    const storedStep = parseInt(localStorage.getItem("ftueStep") || "1");
    setFtueStep(storedStep);
  }, []);

  useEffect(() => {
    checkAnonUser();
    checkRedirect();
    checkFirstLoginOfDay();
    fetchUnlockableSongs();
  }, [router.query, user_data]);

  useEffect(() => {
    if (songs.length === 1) {
      setIsPulsing(true);
    } else {
      setIsPulsing(false);
    }
  }, [songs]);
  const checkFirstLoginOfDay = () => {
    const lastLoginDate = localStorage.getItem("lastLoginDate");
    const loginCount = parseInt(localStorage.getItem("loginCount") || "0", 10);
    const today = new Date().toISOString().split("T")[0];

    const sessionActive = sessionStorage.getItem("sessionActive");

    if (lastLoginDate !== today) {
      localStorage.setItem("lastLoginDate", today);
      localStorage.setItem("loginCount", "1");
      sessionStorage.setItem("sessionActive", "true");
      console.log("First login of the day. Count reset to 1.");
    } else if (!sessionActive) {
      const updatedLoginCount = loginCount + 1;
      localStorage.setItem("loginCount", updatedLoginCount.toString());
      sessionStorage.setItem("sessionActive", "true");

      if (updatedLoginCount > 1) {
        setIsDailyPopupOpen(true);
      }
    } else {
      console.log("Session already active. No increment.");
    }
  };

  const checkAnonUser = async () => {
    if (!user_data) {
      setLoading(true);
      try {
        let anonUserObject = {
          profile: {
            id: Math.floor(100000 + Math.random() * 900000).toString(),
            player: {
              level: 1,
              total_discs: 30,
              total_gems: 30,
              total_stars: 0,
              player_song_instances: [],
              data: null,
            },
          },
        };

        dispatch(updateUser(anonUserObject));
        setSongs([]);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.log("error creating anon user", error);
      }
    } else {
      setSongs(
        user_data?.profile?.player?.player_song_instances
          ?.filter((item) => item.unlocked)
          .sort((a, b) => new Date(b.date_added) - new Date(a.date_added))
          .map(({ song, ...rest }) => ({ ...song, ...rest }))
      );
      setLoading(false);
    }
  };

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const ftueParam = params.get("ftueGameplayCompleted");
    const ftueCompleted = localStorage.getItem("ftueCompleted");
    const footerGlowCleared = localStorage.getItem("footerGlowCleared");
    if (ftueParam === "true" && ftueCompleted !== "true") {
      setShowFtuePanel(true);
    }
    if (!footerGlowCleared) {
      setFooterGlowActive(true);
    }
  }, []);

  const clearFooterGlow = () => {
    setFooterGlowActive(false);
    localStorage.setItem("footerGlowCleared", "true");
  };

  const closeFtuePanel = () => {
    localStorage.setItem("ftueCompleted", "false");
    setShowFtuePanel(false);

    const currentQuery = { ...router.query };
    delete currentQuery.ftueGameplayCompleted;

    router.replace({
      pathname: "/hub",
      query: currentQuery,
    });
  };

  const fetchUnlockableSongs = () => {
    axios.get(`${BASE_URL}/songs/?ids=14&ids=54&ids=65&ids=136`).then((res) => {
      const songsWithUnlockStatus = res.data.map((song) => ({
        ...song,
        isUnlocked: user_data?.profile?.player?.player_song_instances.some(
          (instance) => instance.song.id === song.id && instance.unlocked
        ),
      }));

      const lockedSongs = songsWithUnlockStatus.filter((song) => !song.isUnlocked);
      setUnlockableSongs(lockedSongs);
      setVisibleUnlockableSongs(lockedSongs.slice(0, 2));
      setLoading(false);
    });
  };

  // const checkNewLevel = () => {
  //   const { newLevelAchieved } = router.query;
  //   if (newLevelAchieved === "true") {
  //     const level = parseInt(router.query.newLevel, 10);
  //     setNewLevel(level);
  //     setIsLevelUpPopupOpen(true);
  //   }
  // };

  const gotoGameDetail = (track) => {
    // Store track data in localStorage
    localStorage.setItem("currentTrackData", JSON.stringify(track));

    router.push("/game");

    // // Check if we're in development environment
    // if (process.env.NODE_ENV === "development") {
    //   router.push("/game");
    // } else {
    //   window.location.href = `/game.html`;
    // }
  };
  const checkRedirect = () => {
    const params = new URLSearchParams(window.location.search);
    const trackParam = params.get("track");
    const trackId = params.get("id");

    if (trackId) {
      axios.get(`${BASE_URL}song-detail/${trackId}/`).then((d) => {
        let trackObject = d.data;

        // Store track data in localStorage
        localStorage.setItem("currentTrackData", JSON.stringify(trackObject));
        router.push("/game");
      });
    }

    if (trackParam) {
      try {
        const trackObject = JSON.parse(decodeURIComponent(trackParam));

        // Store track data in localStorage
        localStorage.setItem("currentTrackData", JSON.stringify(trackObject));
        router.push("/game");
      } catch (error) {
        console.error("Error parsing track JSON:", error);
      }
    }
  };

  // const closeLevelUpPopup = () => {
  //   setIsLevelUpPopupOpen(false);
  //   const currentPath = router.pathname;
  //   const currentQuery = { ...router.query };
  //   delete currentQuery.newLevelAchieved;
  //   delete currentQuery.newLevel;
  //   router.replace({
  //     pathname: currentPath,
  //     query: currentQuery,
  //   });
  // };

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

  // const handleArtistClick = (e, artist) => {
  //   openOverlay(artist.id);
  // };

  const handlePlayClick = (song, index) => {
    if (index === 0 && songs.length === 1) {
      setIsPulsing(false);
    }
    gotoGameDetail(song);

    // gotoGameDetail(song);
  };

  // const handleSongUnlock = (song) => {
  //   if (song.isUnlocked) return;

  //   setUnlockedSong(song);
  //   setIsUnlockPopupOpen(true);

  //   const unlockedSongsCount =
  //     user_data.profile.player.player_song_instances.length;

  //   const additionalTime = Math.floor(unlockedSongsCount / 2) * 5;

  //   let unlockTime = moment().add(5, "seconds").toISOString();

  //   const newUserdata = JSON.parse(JSON.stringify(user_data));
  //   let newSongInstance = {
  //     date_added: new Date().toISOString(),
  //     favourited: false,
  //     high_score: 0,
  //     maximum_progress: 0,
  //     no_of_plays: 0,
  //     paid_for_flag: false,
  //     unlock_time: unlockTime,
  //     unlocked: true,
  //     song,
  //   };

  //   newUserdata.profile.player.player_song_instances.push(newSongInstance);
  //   newUserdata.profile.player.total_discs -= 30;
  //   dispatch(updateUser(newUserdata));

  //   setUnlockableSongs((prev) => prev.filter((s) => s.id !== song.id));
  //   setVisibleUnlockableSongs((prevVisible) => {
  //     let updatedVisible = prevVisible.filter((s) => s.id !== song.id);
  //     const remainingLockedSongs = unlockableSongs.filter(
  //       (s) => s.id !== song.id
  //     );
  //     if (remainingLockedSongs.length > 0) {
  //       updatedVisible.push(remainingLockedSongs[0]);
  //     }
  //     return updatedVisible;
  //   });

  //   setSongs((prevSongs) => [...prevSongs, song]);
  // };

  const toggleDailyPopup = () => {
    setIsDailyPopupOpen(!isDailyPopupOpen);
  };

  const level = user_data?.profile?.player?.level || 1;

  const totalDiscs = user_data?.profile?.player?.total_discs || 0;

  const handleClickSound = useClickSound();

  if (loading) {
    return (
      <div className="hubscreen-container">
        <Header />
        <div style={{ textAlign: "center", marginTop: "3rem" }}>Loading...</div>
        <LibraryFooter />
      </div>
    );
  }

  return (
    <div className="hubscreen-container">
      <Header />
      {/* The FTUE panel if needed */}
      {showFtuePanel && (
        <InfoPanel
          className=""
          onClose={closeFtuePanel}
          paragraphs={[
            <>
              <p className="font-bold sm:text-md mb-4">
                Usiku Beats is all about collecting great songs to play and master!
              </p>
              <p className="text-lg sm:text-md">
                This page is where you access all <span className="font-bold">Your Songs...</span>{" "}
                but right now it's empty! To get your first song, tap this button to open the
                <br />
                <span className="font-bold"> Song Library!</span>
              </p>
            </>,
          ]}
        />
      )}

      {/* Container */}
      <div className="px-1 mx-auto max-w-7xl hub-content-wrapper">
        {/* Your Songs Section */}
        <div className="flex align-center justify-center">
          <h1 className="your-songs text-center md:mt-4 sm:mt-1.5 sm:mb-4 md:mb-3 text-5xl uppercase tracking-wider">
            Your Songs
          </h1>
        </div>
        <div className="">
          <div
            className={`kayfo-masonry-main overflow-x-auto overflow-y-hidden flex flex-nowrap hide-scrollbar gap-2 w-full shrink-0 ${
              songs.length === 1 ? "justify-center" : ""
            }`}
          >
            {songs?.length > 0 ? (
              songs.map((item, index) => (
                <ArtistImage
                  key={index}
                  song={item}
                  onArtistClick={(e, artist) => openOverlay(artist.id)}
                  onPlayClick={() => {
                    handlePlayClick(item, index), playBoom();
                  }}
                  isPulsing={isPulsing && index === 0}
                />
              ))
            ) : (
              <div className="flex justify-center items-center w-full h-40">
                <pending className="text-center text-[#6c6b6b] tracking-wide">
                  No unlocked songs yet. Head to the <span className="text-yellow">Library!</span>
                </pending>
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
        {/* Horizontal Cards Row */}
        <UnlockSongsRow user_data={user_data} songs={songs} loading={loading} />
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

      {/* Overlays / popups */}
      <OverlayCard
        isOpen={isOverlayOpen}
        onClose={closeOverlay}
        artistName={selectedArtist.artistName}
        bio={selectedArtist.bio}
        socialMedia={selectedArtist.socialMedia}
      />

      {/* (Optional) LevelUpPopup, etc. */}
      {/* <LevelUpPopup isOpen={isLevelUpPopupOpen} ... /> */}

      {/* Daily Reward Popup */}
      <DailyRewardPopup
        isOpen={isDailyPopupOpen}
        closePopup={() => setIsDailyPopupOpen(false)}
        className="popup-overlay"
      >
        <div className="daily-reward-content mt-5">
          <h1 className="daily-welcome uppercase text-8xl mb-4">Welcome back</h1>
          <p className="daily-gift-title uppercase font-bold text-3xl text-yellow">
            Your Daily Gift
          </p>
          <p className="daily-gift-subtext text-xl mt-1 text-yellow">
            Check in everyday to get more rewards
          </p>
          <div className="daily-gem-section">
            <Image
              src="/assets/img/dailyreward/Gem.png"
              alt="Gem Icon"
              width={100}
              height={100}
              className="daily-reward-gem"
            />
            <h3 className="gem-value text-yellow text-6xl tracking-wider">+10</h3>
          </div>
          <motion.button
            className="daily-claim-button"
            onClick={() => setIsDailyPopupOpen(false)}
            whileHover={{ scale: 1.1 }}
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 1, repeat: Infinity, repeatType: "loop" }}
          >
            <Image
              src="/assets/img/dailyreward/Collect button.png"
              alt="Claim Button"
              width={220}
              height={100}
            />
          </motion.button>
        </div>
      </DailyRewardPopup>

      <LibraryFooter footerGlowActive={footerGlowActive} clearFooterGlow={clearFooterGlow} />
    </div>
  );
};

export default HubScreen;
