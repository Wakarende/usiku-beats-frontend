"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useSelector, useDispatch } from "react-redux";
import moment from "moment-timezone";
import Image from "next/image";
import { motion } from "framer-motion";
import Link from "next/link";
import Header from "../components/header/Header";
import { instance as axios } from "../services/axios.config";
import { BASE_URL } from "../services/config";
import { updateUser } from "../redux/main/authActions";
import { OverlayCard, ArtistImage } from "../components/artistinfo/OverlayCard";
import LevelUpPopup from "../components/leveluppopup/LevelUpPopup";
import LibraryFooter from "../components/footer/Footer";
import UnlockSongsRow from "../components/hubScreen/UnlockSongsRow";
import DailyRewardPopup from "../components/dailyreward/DailyPopup";
import InfoPanel from "../components/infopanel/InfoPanel";
import useFTUEStore from "../stores/ftueStore";
import useUnlockSongsStore from "../stores/unlockSongsStore";
import useClickSound from "../hooks/useClickSound";
import { useAudio } from "../src/context/AudioProvider";
import "./pages.css";
// import ZustandDebug from "../components/zustandDebug";
import useStorageStore from "../stores/storageStore";

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

  const [footerGlowActive, setFooterGlowActive] = useState(false);

  const [showUnlockingInfoPanel, setShowUnlockingInfoPanel] = useState(false);
  const [showAddToLibraryPanel, setShowAddToLibraryPanel] = useState(false);
  const [showPlaySongPanel, setShowPlaySongPanel] = useState(false);
  const [highlightedSongId, setHighlightedSongId] = useState(null);

  //Zustand FTUE STATE
  const {
    currentStep,
    isCompleted,
    hubTutorialSeen,
    unlockingInfoSeen,
    addToLibrarySeen,
    footerGlowCleared,
    setCurrentStep,
    setHubTutorialSeen,
    setUnlockingInfoSeen,
    setAddToLibrarySeen,
    setFooterGlowCleared,
    completeStep,
    completeFTUE,
  } = useFTUEStore();

  const {
    lastLoginDate,
    loginCount,
    sessionActive,
    currentTrackData,
    playSongPanelSeen,
    setLastLoginDate,
    setLoginCount,
    setSessionActive,
    setCurrentTrackData,
    setPlaySongPanelSeen,
    trackDailyLogin,
  } = useStorageStore();

  useEffect(() => {
    // if (typeof window === "undefined") return;

    // Set appropriate panels based on FTUE step
    if (currentStep === 4 && !unlockingInfoSeen) {
      setShowUnlockingInfoPanel(true);
    } else {
      setShowUnlockingInfoPanel(false);
    }

    if (currentStep === 5 && !addToLibrarySeen) {
      setShowAddToLibraryPanel(true);
    } else {
      setShowAddToLibraryPanel(false);
    }
  }, [currentStep, unlockingInfoSeen, addToLibrarySeen]);

  useEffect(() => {
    // if (typeof window === "undefined") return;

    if (currentStep === 7 && !isCompleted) {
      setShowPlaySongPanel(true);
      // Find the latest song to highlight
      if (songs && songs.length > 0) {
        const latestSong = songs[0];
        setHighlightedSongId(latestSong.id);
      }
    } else if (isCompleted) {
      setShowPlaySongPanel(false);
      setHighlightedSongId(null);
    }
  }, [currentStep, songs, isCompleted]);

  useEffect(() => {
    // if (typeof window === "undefined") return;

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

  useEffect(() => {
    // if (typeof window === "undefined") return;

    if (currentStep === 7 && !isCompleted) {
      console.log("FTUE Step 7 active, highlight song:", highlightedSongId);
      console.log(
        "Songs available:",
        songs.map((s) => ({ id: s.id, name: s.song_name }))
      );
      const matchingSong = songs.find((s) => s.id === highlightedSongId);
      console.log("Matching song found:", matchingSong ? true : false);
    }
  }, [currentStep, highlightedSongId, songs]);

  // const checkFirstLoginOfDay = () => {
  //   if (typeof window === "undefined") return;

  //   const lastLoginDate = getLocalStorage("lastLoginDate", "");
  //   const loginCount = parseInt(getLocalStorage("loginCount", "0"), 10);
  //   const today = new Date().toISOString().split("T")[0];

  //   const sessionActive = getSessionStorage("sessionActive", "");

  //   if (lastLoginDate !== today) {
  //     setLocalStorage("lastLoginDate", today);
  //     setLocalStorage("loginCount", "1");
  //     setSessionStorage("sessionActive", "true");
  //     console.log("First login of the day. Count reset to 1.");
  //   } else if (!sessionActive) {
  //     const updatedLoginCount = loginCount + 1;
  //     setLocalStorage("loginCount", updatedLoginCount.toString());
  //     setSessionStorage("sessionActive", "true");

  //     if (updatedLoginCount > 1) {
  //       setIsDailyPopupOpen(true);
  //     }
  //   } else {
  //     console.log("Session already active. No increment.");
  //   }
  // };

  const checkFirstLoginOfDay = () => {
    const { isFirstLogin, loginCount } = trackDailyLogin();

    if (!isFirstLogin && loginCount > 1) {
      setIsDailyPopupOpen(true);
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
      const sortedSongs = user_data?.profile?.player?.player_song_instances
        ?.filter((item) => item.unlocked)
        .sort((a, b) => new Date(b.date_added) - new Date(a.date_added))
        .map(({ song, ...rest }) => ({ ...song, ...rest }));

      setSongs(sortedSongs || []);

      if (typeof window !== "undefined") {
        // const currentStep = parseInt(getLocalStorage("ftueStep", "1"));
        if (currentStep === 6 && sortedSongs && sortedSongs.length > 0) {
          console.log("Setting highlighted song in checkAnonUser");
          setHighlightedSongId(sortedSongs[0].id);
        }
      }
      setLoading(false);
    }
  };

  useEffect(() => {
    // if (typeof window === "undefined") return;

    const params = new URLSearchParams(window.location.search);
    const ftueParam = params.get("ftueGameplayCompleted");

    if (ftueParam === "true" && !isCompleted && !hubTutorialSeen) {
      setShowFtuePanel(true);
      setHubTutorialSeen(true);
    }

    if (!footerGlowCleared) {
      setFooterGlowActive(true);
    }
  }, [isCompleted, hubTutorialSeen, footerGlowCleared]);

  const closeUnlockingInfoPanel = () => {
    setShowUnlockingInfoPanel(false);
    setUnlockingInfoSeen(true);

    completeStep(currentStep);
  };

  const closeAddToLibraryPanel = () => {
    setShowAddToLibraryPanel(false);
    setAddToLibrarySeen(true);

    completeStep(currentStep);
  };

  const closePlaySongPanel = () => {
    setShowPlaySongPanel(false);
    if (currentStep === 6) {
      completeFTUE();
      setHighlightedSongId(null);
    }
  };

  const clearFooterGlow = () => {
    setFooterGlowActive(false);
    setFooterGlowCleared(true);
  };

  const closeFtuePanel = () => {
    console.log("Closing FTUE panel. Current step:", currentStep);
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

  const handleFtueProgressToStep6 = (song) => {
    console.log("MANUALLY TRIGGERING STEP 6 SETUP");
    console.log("Song passed to callback:", song);

    completeStep(currentStep);

    setShowPlaySongPanel(true);

    // Set the highlighted song explicitly
    if (song) {
      console.log("Setting highlighted song ID to:", song.id);
      setHighlightedSongId(song.id);
      setCurrentTrackData(JSON.stringify(song));
    } else if (songs && songs.length > 0) {
      const latestSong = songs[0];
      console.log("Fallback - Setting highlighted song ID to:", latestSong.id);
      setHighlightedSongId(latestSong.id);
      setCurrentTrackData(JSON.stringify(latestSong));
    }

    checkAnonUser();
  };

  const gotoGameDetail = (track) => {
    console.log("Setting current track data:", track.id, track.song_name);

    setCurrentTrackData(JSON.stringify(track));

    const src = process.env.NODE_ENV === "production" ? `/game.html` : `/game`;
    window.location.href = src;
    // router.push("/game");
  };

  const checkRedirect = () => {
    const params = new URLSearchParams(window.location.search);
    const trackParam = params.get("track");
    const trackId = params.get("id");

    if (trackId) {
      axios.get(`${BASE_URL}song-detail/${trackId}/`).then((d) => {
        let trackObject = d.data;

        setCurrentTrackData(JSON.stringify(trackObject));
        router.push("/game");
      });
    } else if (trackParam) {
      try {
        const trackObject = JSON.parse(decodeURIComponent(trackParam));

        setCurrentTrackData(JSON.stringify(trackObject));
        router.push("/game");
      } catch (error) {
        console.error("Error parsing track JSON:", error);
      }
    }
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

  const handlePlayClick = (song, index) => {
    if (index === 0 && songs.length === 1) {
      setIsPulsing(false);
    }
    setCurrentTrackData(song);
    gotoGameDetail(song);
  };

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
              <p className="font-bold text-md sm:text-sm lg:text-xl mb-4">
                Usiku Beats is all about collecting great songs to play and master!
              </p>
              <p className="text-lg sm:text-sm lg:text-xl">
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
      <div className=" mx-auto hub-content-wrapper">
        {/* Your Songs Section */}
        <div className="flex items-center w-full relative">
          <h1 className="text-[#ff6b03] text-center w-full md:mt-3  sm:mb-1 text-5xl uppercase tracking-wider">
            Your Songs
          </h1>
          <Link href={"/library"}>
            <button className="absolute sm:right-[-2rem] md:right-[-2rem] top-[2rem] transform -translate-y-1/2 h-10">
              <Image
                src={"/assets/img/hub/Button blank.png"}
                alt="your-songs-btn"
                width={120}
                height={40}
                className="h-full w-24"
              />
              <span className="absolute sm:inset-2.5 md:inset-2 flex items-center justify-center text-white font-bold tracking-widest sm:text-xs md:text-xs uppercase text-nowrap ">
                + ADD SONGS
              </span>
            </button>
          </Link>
        </div>
        <div className="md:-mt-3">
          <div
            className={`overflow-x-auto overflow-y-hidden flex flex-nowrap hide-scrollbar w-full shrink-0 ${
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
                    handlePlayClick(item, index);
                    playBoom();
                  }}
                  isPulsing={isPulsing && index === 0}
                  isHighlightedForFtue={
                    currentStep === 7 && highlightedSongId === item.id && !isCompleted
                  }
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
        {showPlaySongPanel && (
          <InfoPanel
            onClose={() => {
              closePlaySongPanel();
              if (currentStep === 7) {
                completeFTUE();
                localStorage.setItem("ftueCompleted", "true");
              }
            }}
            bottomPosition={true}
            positionOffset={40}
            paragraphs={[
              <>
                <p className="font-bold sm:text-sm mb-4">Your new song is now ready to play!</p>
                <p className="text-lg sm:text-sm mb-2">
                  When you're' ready, tap the song's'{" "}
                  <span className="font-bold sm:text-sm">Play Now</span> button, and have a great
                  time!
                </p>
                <p className="sm:text-sm">Tap anywhere else to close this message.</p>
              </>,
            ]}
          />
        )}
        <div className="w-full md:-mt-2.5 ">
          <Image
            src={"/assets/img/library/Divider.png"}
            width={4}
            height={1}
            alt="divider"
            className="w-full"
          />
        </div>
        <UnlockSongsRow
          user_data={user_data}
          songs={songs}
          loading={loading}
          onFtueProgressToStep6={handleFtueProgressToStep6}
        />
        <div className="w-full">
          <Image
            src={"/assets/img/library/Divider.png"}
            width={4}
            height={1}
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
              width={1}
              height={1}
              className="daily-reward-gem w-20 h-20"
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
              className="w-52 h-24"
            />
          </motion.button>
        </div>
      </DailyRewardPopup>
      <LibraryFooter footerGlowActive={footerGlowActive} clearFooterGlow={clearFooterGlow} />
      {/* <ZustandDebug /> */}
    </div>
  );
};

export default HubScreen;
