"use client";

import React, { Component, useState, useEffect } from "react";
import Header from "../components/Header";
import BottomTabNav from "../components/BottomTabNav";
import Popup from "../components/Popup";
import { useRouter } from "next/router";
import { instance as axios } from "../services/axios.config";
import { useSelector } from "react-redux";
import { BASE_URL } from "../services/config";
import Image from "next/image";
import { Container, Row, Col, ListGroup, Button } from "react-bootstrap";
import { Tooltip } from "@mui/material";
import { updateUser } from "../redux/main/authActions";
import { useDispatch } from "react-redux";
import UnlockSongsRow from "../components/hubScreen/UnlockSongsRow";

const HubScreen = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [songs, setSongs] = useState([]);
  const [songsToUnlock, setSongsToUnlock] = useState([]);
  const [loading, setLoading] = useState(true);
  const auth = useSelector((state) => state.auth);
  const { user_data, isAuthenticated } = auth;
  const dispatch = useDispatch();
  const router = useRouter();

  const togglePopup = () => {
    setIsPopupOpen(!isPopupOpen);
  };

  useEffect(() => {
    checkAnon();
    checkRedirect();
    checkFirstLoginOfDay();
    checkNewLevel();
  }, [user_data]);

  const checkFirstLoginOfDay = () => {
    const lastLoginDate = localStorage.getItem("lastLoginDate");
    const today = new Date().toISOString().split("T")[0];

    if (lastLoginDate !== today) {
      // Update the user's total_gems count
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
      console.log("setting ftue");
      setLoading(true);

      try {
        let response = await axios.get(
          `${BASE_URL}initial-song-list/?ids=14&ids=12&ids=13`
        );

        // FTUE
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
        user_data?.profile?.player?.player_song_instances
          ?.filter((item) => item.unlocked)
          .map((item) => item.song)
      );
    }
  };

  const checkNewLevel = () => {
    const { newLevelAchieved } = router.query;
    console.log("newLevelAchieved", newLevelAchieved);

  }

  const gotoGameDetail = (track, index) => {
    router.push({
      pathname: "/game",
      query: { track: JSON.stringify(track) }, // for example
    });
  };

  const checkRedirect = () => {
    const params = new URLSearchParams(window.location.search);
    const trackParam = params.get("track"); // Get the 'track' parameter

    const trackId = params.get("id");

    if (trackId) {
      axios.get(`${BASE_URL}song-detail/${trackId}/`).then((d) => {
        let trackObject = d.data;

        router.push({
          pathname: "/game",
          query: { track: JSON.stringify(trackObject) }, // for example
        });
        //   navigate(
        //     `/game?track=${encodeURIComponent(JSON.stringify(trackObject))}`
        //   );
      });
    }

    if (trackParam) {
      try {
        const trackObject = JSON.parse(decodeURIComponent(trackParam));

        router.push({
          pathname: "/game",
          query: { track: JSON.stringify(trackObject) }, // for example
        });
        // navigate(
        //   `/game?track=${encodeURIComponent(JSON.stringify(trackObject))}`
        // );
      } catch (error) {
        console.error("Error parsing track JSON:", error);
      }
    }
  };

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
                    <div
                      key={index}
                      className="kayfo-masonry-container"
                      style={{
                        display: "flex",
                        minHeight: 234,
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        margin: "10px",
                      }}
                    >
                      <Col
                        className="kayfo-masonry-item"
                        style={{
                          width: "100%",
                          display: "flex",
                          justifyContent: "center",
                        }}
                        onClick={() => gotoGameDetail(item, index)}
                      >
                        <Tooltip placement="top" title={item.song_name}>
                          {/* Adjust the image styles here */}
                          <Image
                            src={item.thumbnail_file}
                            alt=""
                            width={250}
                            height={250}
                            style={{
                              maxWidth: "100%",
                              height: "auto",
                              objectFit: "contain",
                            }}
                          />
                        </Tooltip>
                      </Col>

                      <Button
                        variant="default"
                        style={{
                          backgroundColor: "orange",
                          color: "white",
                          width: "200px",
                        }}
                        size="lg"
                        onClick={() => gotoGameDetail(item, index)}
                      >
                        Play
                      </Button>
                    </div>
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
                      width: "100%", // Changed to 100% to span the entire screen width
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
