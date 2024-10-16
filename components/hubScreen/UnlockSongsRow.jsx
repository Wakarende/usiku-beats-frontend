"use client";

import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Container, Row, Col, ListGroup, Button } from "react-bootstrap";
import DiscFull from "@mui/icons-material/DiscFull";
import { updateUser } from "../../redux/main/authActions";
import DiamondIcon from "@mui/icons-material/Diamond";
import moment from "moment";
import { useRouter } from "next/router";

const UnlockSongsRow = ({ user_data, songs, loading }) => {
  const discsRequiredToUnlockSong = 30;
  const gemsRequiredToUnlockSong = 20;

  const dispatch = useDispatch();
  const router = useRouter();

  const CountdownTimer = ({ unlockTime }) => {
    const [timeLeft, setTimeLeft] = useState(
      calculateTimeLeft(new Date(unlockTime))
    );

    useEffect(() => {
      const timer = setTimeout(() => {
        setTimeLeft(calculateTimeLeft(new Date(unlockTime)));
      }, 1000);

      return () => clearTimeout(timer);
    }, [timeLeft, unlockTime]);

    return (
      <div>
        {timeLeft.days} days, {timeLeft.hours} hrs, {timeLeft.minutes} mins,{" "}
        {timeLeft.seconds} secs
      </div>
    );
  };

  const calculateTimeLeft = (unlockTime) => {
    const difference = +unlockTime - +new Date();
    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }

    return timeLeft;
  };
  const isUnlockTimePassed = (unlockTime) => {
    if (!unlockTime) {
      console.error("Invalid or missing unlock time:", unlockTime);
      return false; // or true based on how you want to handle this case
    }

    try {
      const currentTimeUtc = new Date().toISOString();
      const unlockTimeUtc = new Date(unlockTime).toISOString();
      return unlockTimeUtc <= currentTimeUtc;
    } catch (error) {
      console.error("Error processing dates:", error);
      return false; // or true based on your error handling strategy
    }
  };

  const addToLibrary = (song) => {

    const newUserdata = JSON.parse(JSON.stringify(user_data));
    const songInstance = newUserdata.profile.player.player_song_instances.find(
      (instance) => instance.song.id === song.id
    );
    if (songInstance) {
      songInstance.unlocked = true;
    } else {
      console.error("Song not found in song instances", song.id);
      return;
    }
    dispatch(updateUser(newUserdata));
  };


  const handleGemClick = (song) => {
    let newUserdata = JSON.parse(JSON.stringify(user_data));
    newUserdata.profile.player.total_gems -= gemsRequiredToUnlockSong;

    const songInstance = newUserdata.profile.player.player_song_instances.find(
      (instance) => instance.song.id === song.id
    );

    if (songInstance && songInstance.unlock_time) {
      const unlockTime = moment(songInstance.unlock_time);
      const now = moment();
      const timeDiff = unlockTime.diff(now);
      const percentageReduction = 0.50;
      const reducedTime = timeDiff * (1 - percentageReduction);
      const newUnlockTime = moment(now.valueOf() + reducedTime).toISOString();
      songInstance.unlock_time = newUnlockTime;
    }
    dispatch(updateUser(newUserdata));
  };

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
  };

  return (
    <Container>
      <Col
        className="kayfo-masonry-main ml-5"
        style={{ overflowX: "auto", overflowY: "hidden", maxHeight: 180 }}
      >
        <div
          style={{
            minWidth: "100%",
            display: "flex",
            flexDirection: "row",
          }}
        >
          {user_data?.profile?.player?.player_song_instances
            ?.filter((item) => !item.unlocked)
            .map((item, index) => (
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
                  className="kayfo-masonry-item flex flex-col justify-center items-center"
                  style={{ maxHeight: 110, minWidth: 110, color: "white" }}
                >
                  <div className="song-info" style={{ maxWidth: "120px" }}>
                    <div className="text-container" style={{ maxWidth: "120px" }}>
                      <p style={{ fontSize: "18px", marginBottom: "10px", maxWidth: "110px", overflow: "hidden"}}>
                        {item.song.song_name}
                      </p>
                      <p>
                        {isUnlockTimePassed(item.unlock_time) ? (
                          <Button
                            variant="primary"
                            size="sm"
                            onClick={() => addToLibrary(item.song)}
                          >
                            Add to library
                          </Button>
                        ) : (
                          <CountdownTimer unlockTime={item.unlock_time} />
                        )}
                      </p>
                    </div>
                  </div>
                </Col>

                {!isUnlockTimePassed(item.unlock_time) && (
                  <div
                    className="song-info flex items-center"
                    style={{ maxWidth: "120px" }}
                  >
                    <div className="flex items-center">
                      <Button
                        variant="primary"
                        size="sm"
                        disabled={
                          user_data?.profile?.player?.total_gems <
                          gemsRequiredToUnlockSong
                        }
                        onClick={() => unlockSongWithGems(item.song)}
                      >
                        <div className="flex items-center">
                          <DiamondIcon className="text-black text-sm" />
                          <span className="text-base text-white ml-2">
                            {gemsRequiredToUnlockSong} gems
                          </span>
                        </div>
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            ))}

          <div
            className="kayfo-masonry-container"
            style={{
              display: "flex",
              maxHeight: 110,
              flexDirection: "column",
            }}
            onClick={() => router.push("/library")}
          >
            <Col
              className="kayfo-masonry-item flex flex-col justify-center items-center"
              style={{ maxHeight: 110, minWidth: 110, color: "white" }}
            >
              <p className="text-2xl">
                {" "}
                <DiscFull className="text-blue-500 text-6xl" />{" "}
                {user_data?.profile?.player?.total_discs || 0}
              </p>
              <p className="text-2xl">discs</p>
            </Col>
            <div className="song-info" style={{ maxWidth: "120px" }}>
              <div className="text-container">
                {user_data?.profile?.player?.total_discs <
                discsRequiredToUnlockSong ? (
                  <p>Earn 30 more discs to unlock your next song</p>
                ) : (
                  <p>You can unlock a song!</p>
                )}
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
  );
};

export default UnlockSongsRow;
