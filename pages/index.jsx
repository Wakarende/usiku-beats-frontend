"use client";

import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import BottomTabNav from "../components/BottomTabNav";
import Popup from "../components/Popup";
import { useRouter } from "next/router";
import { instance as axios } from "../services/axios.config";
import { useSelector, useDispatch } from "react-redux";
import { BASE_URL } from "../services/config";
import Image from "next/image";
import { Container, Row, Col, Tooltip, Button } from "react-bootstrap";
import { updateUser } from "../redux/main/authActions";
import UnlockSongsRow from "../components/hubScreen/UnlockSongsRow";
import { OverlayCard, ArtistImage } from "../components/OverlayCard";
import LevelUpPopup from "../components/LevelUpPopup";

const HubScreen = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [songs, setSongs] = useState([]);
  const [loading, setLoading] = useState(true);
  const auth = useSelector((state) => state.auth);
  const { user_data } = auth;
  const dispatch = useDispatch();
  const router = useRouter();
  const [isOverlayOpen, setIsOverlayOpen] = useState(false);
  const [selectedArtist, setSelectedArtist] = useState({
    artistName: "",
    bio: "",
    socialMedia: [],
  });
  const [isLevelUpPopupOpen, setIsLevelUpPopupOpen] = useState(false);
  const [newLevel, setNewLevel] = useState();

  const togglePopup = () => {
    setIsPopupOpen(!isPopupOpen);
  };

  useEffect(() => {
    checkAnon();
    checkRedirect();
    checkFirstLoginOfDay();
    checkNewLevel();
  }, [router.query, user_data]);

  const checkFirstLoginOfDay = () => {
    const lastLoginDate = localStorage.getItem("lastLoginDate");
    const today = new Date().toISOString().split("T")[0];

    if (lastLoginDate !== today) {
      if (user_data && user_data.profile && user_data.profile.player) {
        const updatedUser = {
          ...user_data,
          profile: {
            ...user_data.profile,
            player: {
              ...user_data.profile.player,
              total_gems: user_data.profile.player.total_gems + 10,
            },
          },
        };
        dispatch(updateUser(updatedUser));
      }

      setIsPopupOpen(true);
      localStorage.setItem("lastLoginDate", today);
    }
  };

  const checkAnon = async () => {
    if (!user_data) {
      setLoading(true);

      try {
        let response = await axios.get(`${BASE_URL}initial-song-list/?ids=56`);

        let anonUserObject = {
          profile: {
            id: Math.floor(100000 + Math.random() * 900000).toString(),
            player: {
              level: 1,
              total_discs: 0,
              total_gems: 40,
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
          .map(({ song, ...rest }) => ({ ...song, ...rest }))
      );
    }
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

  const level = user_data?.profile?.player?.level || 1; // Directly fetching the level from user_data

  return (
    <div className="cmd-page">
      <Header />
      <Container>
        <Row className="kayfo-block-header">
          <div className="kayfo-block-title">
            <span>My Songs</span>
          </div>
        </Row>
        <Row>
          <Col
            className="kayfo-masonry-main"
            style={{ overflowX: "auto", overflowY: "hidden" }}
          >
            {songs?.length > 0 ? (
              <div
                style={{
                  minWidth: "100%",
                  display: "flex",
                  flexDirection: "row",
                }}
              >
                {songs?.map((item, index) => (
                  <ArtistImage
                    key={index}
                    song={item}
                    onArtistClick={handleArtistClick}
                    onPlayClick={() => gotoGameDetail(item, index)}
                  />
                ))}
              </div>
            ) : (
              <Col className="kayfo-filter-no-result-box">
                {!loading ? "No result" : "loading..."}
              </Col>
            )}
          </Col>
        </Row>
      </Container>

      <UnlockSongsRow user_data={user_data} songs={songs} loading={loading} />

      <Container>
        <Row className="kayfo-block-header">
          <div className="kayfo-block-title">
            <span>All Songs</span>
          </div>
        </Row>
        <Row>
          <Col
            className="kayfo-masonry-main"
            style={{ width: "100%", overflowX: "auto", overflowY: "hidden" }}
          >
            <div
              style={{ width: "100%", display: "flex", flexDirection: "row" }}
            >
              <div
                className="kayfo-masonry-container"
                style={{
                  width: "100%",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                }}
              >
                <Col
                  className="kayfo-masonry-item"
                  style={{ width: "100%" }}
                  onClick={() => router.push("/library")}
                >
                  <div
                    style={{
                      width: "100%",
                      height: 110,
                      backgroundColor: "yourColor",
                      borderRadius: 6,
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <span
                      style={{
                        color: "white",
                        fontSize: "20px",
                        fontWeight: "bold",
                      }}
                    >
                      Go to all songs
                    </span>
                  </div>
                </Col>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
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
      <Popup isOpen={isPopupOpen} closePopup={togglePopup}>
        <h2>Welcome Back</h2>
        <h1 className="mt-2">Your daily login gift is:</h1>
        <b style={{ fontSize: "50px" }}>10</b> gems
        <button
          onClick={togglePopup}
          className="mt-3 px-6 py-3 bg-blue-500 text-white font-semibold text-xl rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-700 focus:ring-opacity-50"
        >
          Claim daily gift
        </button>
      </Popup>
    </div>
  );
};

export default HubScreen;
