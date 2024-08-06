import React, { Component, useEffect, useState } from "react";
import {
  Button,
  Spinner,
} from "react-bootstrap";
import moment from 'moment-timezone';
import { useSelector } from "react-redux";
import Popup from "../components/Popup";
import countries from "../services/mocks/countries.json";
import Image from "next/image";
import userService from "../services/user.service";
import { Alert, Snackbar } from "@mui/material";
import accountErrors from "../services/mocks/accountErrors";
import { instance as axios } from "../services/axios.config";
import { nanoid } from "nanoid";
import packs from "../services/mocks/packs";
import { BASE_URL } from "../services/config";
import { Navigate } from "react-router-dom";
import CategoriesFooter from "../components/CategoriesFooter";
import BottomTabNav from "../components/BottomTabNav";
import { useRouter } from "next/router";
import { updateUser } from "../redux/main/authActions";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useDispatch } from "react-redux";

const Library = () => {
  const [songs, setSongs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const dispatch = useDispatch();
  const [unlockedSong, setUnlockedSong] = useState(null);

  const auth = useSelector((state) => state.auth);
  const { user_data, isAuthenticated } = auth;
  const router = useRouter();

  useEffect(() => {
    setLoading(true);
    axios.get(`${BASE_URL}/songs/?ids=14&ids=54&ids=65`).then((res) => {
      setSongs(res.data);
      setLoading(false);
    });
  }, []);

  const unlockable = user_data?.profile?.player?.total_discs >= 30;

  const handleSongUnlock = (song) => {
    setUnlockedSong(song);
    setIsPopupOpen(true);
  
    let unlockTime = moment().add(120, 'minutes').toISOString(); // Set unlock time 120 minutes into the future
  
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
        {songs.map((song, index) => (
          <div key={index} className="m-8">
            <div className="song-item">
              <div className="flex flex-row justify-between">
                <Image
                  src={song.thumbnail_file}
                  alt="Song Cover"
                  width={100}
                  height={100}
                />
                {/* <p>{song.song_name}</p> */}

                <div style={{ color: "white" }} className="mt-6">
                  <p>{song.song_name}</p>
                  <p>{song.artist_name}</p>
                </div>
                <Button
                  className="mt-6"
                  disabled={!unlockable}
                  variant="primary"
                  style={{ maxHeight: "40px" }}
                  onClick={() => {
                    handleSongUnlock(song);
                  }}
                >
                  Unlock
                </Button>
              </div>
            </div>
          </div>
        ))}

        <Popup
          isOpen={isPopupOpen}
          closePopup={() => {
            setIsPopupOpen(!isPopupOpen);
          }}
        >
          {/* <h2>Welcome Back</h2> */}
          <h1 className="mt-2">You have successfully unlocked the song:</h1>
          <b style={{ fontSize: "50px" }}>{unlockedSong?.song_name}</b>
          <button
            onClick={() => {
              setIsPopupOpen(!isPopupOpen);
              router.push("/");
            }}
            className="mt-3 px-6 py-3 bg-blue-500 text-white font-semibold text-xl rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-700 focus:ring-opacity-50"
          >
            Go to my library
          </button>
        </Popup>
      </div>

      <BottomTabNav />
    </div>
  );
};

export default Library;
