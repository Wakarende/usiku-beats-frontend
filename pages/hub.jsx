"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useSelector, useDispatch } from "react-redux";
import moment from "moment-timezone";
import Image from "next/image";

import Header from "../components/header/Header";
import { instance as axios } from "../services/axios.config";
import { BASE_URL } from "../services/config";
import { updateUser } from "../redux/main/authActions";
import { OverlayCard, ArtistImage } from "../components/artistinfo/OverlayCard";
import LevelUpPopup from "../components/leveluppopup/LevelUpPopup";
import LibraryFooter from "../components/footer/Footer";
import "./pages.css";
import UnlockSongsRow from "../components/hubScreen/UnlockSongsRow";
import DailyRewardPopup from "../components/dailyreward/DailyPopup";

const HubScreen = () => {
  // const [isDailyPopupOpen, setIsDailyPopupOpen] = useState(false);
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

  const auth = useSelector((state) => state.auth);
  const { user_data } = auth;
  const dispatch = useDispatch();
  const router = useRouter();

  const unlockable = user_data?.profile?.player?.total_discs >= 30;

  useEffect(() => {
    checkAnon();
    checkRedirect();
    // checkFirstLoginOfDay();
    checkNewLevel();
    fetchUnlockableSongs();
  }, [router.query, user_data]);

  useEffect(() => {
    if (songs.length === 1) {
      setIsPulsing(true); // Pulse if only one song is available
    } else {
      setIsPulsing(false); // Stop pulsing if more than one song is available
    }
  }, [songs]);

  // const checkFirstLoginOfDay = () => {
  //   const lastLoginDate = localStorage.getItem("lastLoginDate");
  //   const today = new Date().toISOString().split("T")[0];

  //   if (lastLoginDate !== today) {
  //     if (user_data && user_data.profile && user_data.profile.player) {
  //       const updatedUser = {
  //         ...user_data,
  //         profile: {
  //           ...user_data.profile,
  //           player: {
  //             ...user_data.profile.player,
  //             total_gems: user_data.profile.player.total_gems + 10,
  //           },
  //         },
  //       };
  //       dispatch(updateUser(updatedUser));
  //     }

  //     setIsDailyPopupOpen(true);
  //     localStorage.setItem("lastLoginDate", today);
  //   }
  // };

  const checkAnon = async () => {
    if (!user_data) {
      setLoading(true);

      try {
        let response = await axios.get(`${BASE_URL}initial-song-list/?ids=146`);

        let anonUserObject = {
          profile: {
            id: Math.floor(100000 + Math.random() * 900000).toString(),
            player: {
              level: 1,
              total_discs: 0,
              total_gems: 30,
              total_stars: 0,
              player_song_instances: response.data,
              data: null,
            },
          },
        };
        dispatch(updateUser(anonUserObject));

        const songList = response.data.map(({ song, ...rest }) => ({
          ...song,
          ...rest,
        }));

        setSongs(songList);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.log("error getting initial songs", error);
      }
    } else {
      setSongs(
        user_data?.profile?.player?.player_song_instances
          ?.filter((item) => item.unlocked)
          .sort((a, b) => new Date(b.date_added) - new Date(a.date_added))
          .map(({ song, ...rest }) => ({ ...song, ...rest }))
      );
    }
  };

  const fetchUnlockableSongs = () => {
    axios.get(`${BASE_URL}/songs/?ids=14&ids=54&ids=65&ids=136`).then((res) => {
      const songsWithUnlockStatus = res.data.map((song) => ({
        ...song,
        isUnlocked: user_data?.profile?.player?.player_song_instances.some(
          (instance) => instance.song.id === song.id && instance.unlocked
        ),
      }));

      const lockedSongs = songsWithUnlockStatus.filter(
        (song) => !song.isUnlocked
      );
      setUnlockableSongs(lockedSongs);

      setVisibleUnlockableSongs(lockedSongs.slice(0, 2));
      setLoading(false);
    });
  };

  const checkNewLevel = () => {
    const { newLevelAchieved } = router.query;
    if (newLevelAchieved === "true") {
      const level = parseInt(router.query.newLevel, 10);
      setNewLevel(level);
      setIsLevelUpPopupOpen(true);
    }
  };

  const gotoGameDetail = (track, index) => {
    router.push({
      pathname: "/game",
      query: { track: JSON.stringify(track) },
    });
  };

  const checkRedirect = () => {
    const params = new URLSearchParams(window.location.search);
    const trackParam = params.get("track");
    const trackId = params.get("id");

    if (trackId) {
      axios.get(`${BASE_URL}song-detail/${trackId}/`).then((d) => {
        let trackObject = d.data;
        router.push({
          pathname: "/game",
          query: { track: JSON.stringify(trackObject) },
        });
      });
    }

    if (trackParam) {
      try {
        const trackObject = JSON.parse(decodeURIComponent(trackParam));
        router.push({
          pathname: "/game",
          query: { track: JSON.stringify(trackObject) },
        });
      } catch (error) {
        console.error("Error parsing track JSON:", error);
      }
    }
  };

  const closeLevelUpPopup = () => {
    setIsLevelUpPopupOpen(false);
    const currentPath = router.pathname;
    const currentQuery = { ...router.query };
    delete currentQuery.newLevelAchieved;
    delete currentQuery.newLevel;
    router.replace({
      pathname: currentPath,
      query: currentQuery,
    });
  };

  const openOverlay = async (artistId) => {
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
    setIsOverlayOpen(false);
  };

  const handleArtistClick = (e, artist) => {
    openOverlay(artist.id);
  };

  const handlePlayClick = (song, index) => {
    if (index === 0 && songs.length === 1) {
      setIsPulsing(false);
    }

    gotoGameDetail(song, index);
  };

  const handleSongUnlock = (song) => {
    if (song.isUnlocked) return;

    setUnlockedSong(song);
    setIsUnlockPopupOpen(true);

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
      unlocked: true,
      song,
    };

    newUserdata.profile.player.player_song_instances.push(newSongInstance);
    newUserdata.profile.player.total_discs -= 30;
    dispatch(updateUser(newUserdata));

    // Remove the unlocked song from the unlockable songs list
    setUnlockableSongs((prevSongs) =>
      prevSongs.filter((s) => s.id !== song.id)
    );

    // Update visible unlockable songs
    setVisibleUnlockableSongs((prevVisibleSongs) => {
      // Remove the unlocked song
      let updatedVisible = prevVisibleSongs.filter((s) => s.id !== song.id);

      // Add the next song from unlockableSongs if available
      const remainingLockedSongs = unlockableSongs.filter(
        (s) => s.id !== song.id
      );
      if (remainingLockedSongs.length > 0) {
        // Add the next song to maintain two visible unlockable songs
        updatedVisible.push(remainingLockedSongs[0]);
      }

      return updatedVisible;
    });

    // Update user's songs
    setSongs((prevSongs) => [...prevSongs, song]);
  };

  // const toggleDailyPopup = () => {
  //   setIsDailyPopupOpen(!isDailyPopupOpen);
  // };

  const level = user_data?.profile?.player?.level || 1;

  const totalDiscs = user_data?.profile?.player?.total_discs || 0;

  return (
    <div className="hubscreen-container">
      <Header />
      {/* Container */}
      <div className="px-1 mx-auto max-w-7xl">
        {/* Your Songs Section */}
        <div className="flex align-center justify-center">
          <h1 className="your-songs text-center medium:mt-3 small:mt-1.5 small:mb-2.5 medium:mb-2 text-5xl uppercase tracking-wider">
            Your Songs
          </h1>
        </div>
        <div className="mb-1">
          <div
            className="kayfo-masonry-main overflow-x-auto overflow-y-hidden"
            style={{ minWidth: "100%" }}
          >
            {songs?.length > 0 ? (
              <div
                className={`flex flex-row ${
                  songs.length === 1 ? "mx-auto" : ""
                }`}
              >
                {songs?.map((item, index) => (
                  <ArtistImage
                    key={index}
                    song={item}
                    onArtistClick={handleArtistClick}
                    onPlayClick={() => handlePlayClick(item, index)}
                    isPulsing={isPulsing && index === 0}
                  />
                ))}
              </div>
            ) : (
              <div className="kayfo-filter-no-result-box">
                {!loading ? "No result" : "loading..."}
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
      <OverlayCard
        isOpen={isOverlayOpen}
        onClose={closeOverlay}
        artistName={selectedArtist.artistName}
        bio={selectedArtist.bio}
        socialMedia={selectedArtist.socialMedia}
      />
      <LevelUpPopup
        isOpen={isLevelUpPopupOpen}
        closePopup={closeLevelUpPopup}
        newLevel={newLevel}
      />
      {/* <DailyRewardPopup
        isOpen={isDailyPopupOpen}
        closePopup={toggleDailyPopup}
        className="popup-overlay"
      >
        {/* Daily Reward Styling */}
      {/* <div className="daily-reward-content mt-5">
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
          <h3 className="gem-value text-yellow text-6xl tracking-wider">
            +10
          </h3>
        </div>
        <button className="daily-claim-button" onClick={toggleDailyPopup}>
          <Image
            src="/assets/img/dailyreward/Collect button.png"
            alt="Claim Button"
            width={220}
            height={100}
          />
        </button>
      </div> */}
      {/* </DailyRewardPopup> */}
      <LibraryFooter />
    </div>
  );
};

export default HubScreen;
