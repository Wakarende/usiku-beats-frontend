"use client";

import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import CategoriesCards from "../components/CategoriesBanner";
import MasonryGames from "../components/MasonryGames";
import MySongs from "../components/MySongsHub";
import RectGamesList from "../components/RectGamesList";
import BoxGamesList from "../components/BoxGamesList";
import BottomTabNav from "../components/BottomTabNav";
import CategoriesFooter from "../components/CategoriesFooter";
import { useRouter } from "next/router";
import Popup from "../components/Popup";
import { instance as axios } from "../services/axios.config";
import { useSelector, useDispatch } from "react-redux";
import { BASE_URL } from "../services/config";
import Image from "next/image";
import { Container, Row, Col, Tooltip } from "react-bootstrap";
import { updateUser } from "../redux/main/authActions";
import { OverlayCard, ArtistImage } from "../components/OverlayCard";
import LevelUpPopup from "../components/LevelUpPopup";

let _rubrics = [
  {
    id: 1,
    attributes: {
      title: "My Songs",
      layout: "masonry",
      createdAt: "2024-01-06T21:13:20.362Z",
      updatedAt: "2024-01-17T14:11:25.437Z",
      publishedAt: "2024-01-06T21:13:34.146Z",
    },
  },
  {
    id: 2,
    attributes: {
      title: "Most Popular",
      layout: "box",
      createdAt: "2024-01-06T21:14:40.551Z",
      updatedAt: "2024-01-06T21:56:43.493Z",
      publishedAt: "2024-01-06T21:14:42.469Z",
    },
  },
  {
    id: 3,
    attributes: {
      title: "All Songs",
      layout: "rect",
      createdAt: "2024-01-06T21:13:58.767Z",
      updatedAt: "2024-01-16T16:34:31.327Z",
      publishedAt: "2024-01-06T21:14:00.352Z",
    },
  },
];

const HubScreen = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [rubrics, setRubrics] = useState(_rubrics);
  const [songs, setSongs] = useState([]);
  const [loading, setLoading] = useState(true);
  const auth = useSelector((state) => state.auth);
  const { user_data, isAuthenticated } = auth;
  const dispatch = useDispatch();
  const router = useRouter();
  const [isOverlayOpen, setIsOverlayOpen] = useState(false);
  const [selectedArtist, setSelectedArtist] = useState({
    artistName: "",
    bio: "",
    socialMedia: [],
  });

  const togglePopup = () => {
    setIsPopupOpen(!isPopupOpen);
  };

  const [isLevelUpPopupOpen, setIsLevelUpPopupOpen] = useState(false);
  const [newLevel, setNewLevel] = useState();

  useEffect(() => {
    const checkNewLevel = () => {
      if (router.query.newLevelAchieved === "true") {
        const level = parseInt(router.query.newLevel, 10);
        setNewLevel(level);
        setIsLevelUpPopupOpen(true);
      }
    };
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
        let response = await axios.get(
          `${BASE_URL}initial-song-list/?ids=14&ids=12&ids=13`
        );

        let anonUserObject = {
          profile: {
            id: Math.floor(100000 + Math.random() * 900000).toString(),
            player: {
              level: 1,
              total_discs: 0,
              total_gems: 20,
              total_stars: 0,
              player_song_instances: response.data,
              data: null,
            },
          },
        };
        dispatch(updateUser(anonUserObject));

        const songList = response.data.map((item) => item.song);

        setSongs(songList);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.log("error getting initial songs", error);
      }
    } else {
      setSongs(
        user_data?.profile?.player?.player_song_instances?.map(
          (item) => item.song
        )
      );
    }
  };

  const checkNewLevel = () => {
    const { newLevelAchieved } = router.query;
    console.log("newLevelAchieved", newLevelAchieved);
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

  useEffect(() => {
    console.log("Selected artist updated:", selectedArtist);
  }, [selectedArtist]);

  const closeOverlay = () => {
    setIsOverlayOpen(false);
  };

  const handleArtistClick = (e, artistId) => {
    openOverlay(artistId);
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
                {songs?.map((item, index) => {
                  return (
                    <ArtistImage
                      key={index}
                      artist={item}
                      onArtistClick={handleArtistClick}
                      onPlayClick={() => gotoGameDetail(item, index)}
                    />
                  );
                })}
              </div>
            ) : (
              <Col className="kayfo-filter-no-result-box">
                {!loading ? "No result" : "loading..."}
              </Col>
            )}
          </Col>
        </Row>
      </Container>
      <Container>
        <Col
          className="kayfo-masonry-main ml-5"
          style={{ overflowX: "auto", overflowY: "hidden", maxHeight: 160 }}
        >
          <div
            style={{
              minWidth: "100%",
              display: "flex",
              flexDirection: "row",
            }}
          >
            {songs?.slice(-2).map((item, index) => (
              <div
                className="kayfo-masonry-container"
                key={index}
                style={{
                  display: "flex",
                  maxHeight: 110,
                  flexDirection: "column",
                }}
              >
                <Col
                  className="kayfo-masonry-item"
                  style={{ maxHeight: 110, minWidth: 110 }}
                  onClick={() => gotoGameDetail(item, index)}
                >
                  <Tooltip placement="top" title={item.song_name}>
                    {/* Adjust the image styles here */}
                    <Image
                      src={
                        "https://www.freeiconspng.com/thumbs/gift-box-icon/yellow-gift-box-icon-20.jpg"
                      }
                      alt=""
                      width={110}
                      height={110}
                      style={{
                        maxWidth: "100%",
                        height: "auto",
                        objectFit: "contain",
                      }}
                    />
                  </Tooltip>
                </Col>
                <div className="song-info" style={{ maxWidth: "120px" }}>
                  <div className="text-container">
                    <p>UNLOCKING</p>
                    <p>{item.song_name}</p>
                  </div>
                </div>
              </div>
            ))}

            <div
              className="kayfo-masonry-container"
              style={{
                display: "flex",
                maxHeight: 110,
                flexDirection: "column",
              }}
            >
              <Col
                className="kayfo-masonry-item flex flex-col justify-center items-center"
                style={{ maxHeight: 110, minWidth: 110, color: "white" }}
              >
                <p className="text-2xl">
                  {" "}
                  {/* <DiscFull className="text-blue-500 text-6xl" /> {user_data?.profile?.player?.total_discs || 0} */}
                </p>
                <p className="text-2xl">discs</p>
              </Col>
              <div className="song-info" style={{ maxWidth: "120px" }}>
                <div className="text-container">
                  <p>Earn 30 more discs to unlock your next song</p>
                </div>
              </div>
            </div>

            {songs?.length == 0 && (
              <Col className="kayfo-filter-no-result-box">
                {!loading ? "No result" : "loading..."}
              </Col>
            )}
          </div>
        </Col>
      </Container>
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
      {/* Artist info card */}
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
      <BottomTabNav />
    </div>
  );
};

export default HubScreen;
