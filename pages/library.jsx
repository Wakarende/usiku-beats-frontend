import React, { useEffect, useState } from "react";
import { Button, Spinner } from "react-bootstrap";
import moment from "moment-timezone";
import { useSelector, useDispatch } from "react-redux";
import Popup from "../components/Popup";
import Image from "next/image";
import { instance as axios } from "../services/axios.config";
import { BASE_URL } from "../services/config";
import { useRouter } from "next/router";
import { updateUser } from "../redux/main/authActions";
import Header from "../components/header/Header";
import BottomTabNav from "../components/BottomTabNav";

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
    axios.get(`${BASE_URL}/songs/?ids=14&ids=54&ids=65&ids=136`).then((res) => {
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
        {songs.map((song, index) => (
          <div key={index} className="m-8">
            <div className="song-item">
              <div className="flex flex-row justify-between items-center">
                <Image
                  src={song.thumbnail_file}
                  alt="Song Cover"
                  width={100}
                  height={100}
                />
                <div style={{ color: "white" }} className="flex-grow mx-4">
                  <p className="font-bold">{song.song_name}</p>
                  <p>{song.artist_name}</p>
                </div>
                {song.isUnlocked ? (
                  <div className="text-green-500 font-bold">Unlocked</div>
                ) : (
                  <Button
                    className="mt-6"
                    disabled={!unlockable}
                    variant="primary"
                    style={{ maxHeight: "40px" }}
                    onClick={() => handleSongUnlock(song)}
                  >
                    Unlock
                  </Button>
                )}
              </div>
            </div>
          </div>
        ))}

        <Popup isOpen={isPopupOpen} closePopup={() => setIsPopupOpen(false)}>
          <h1 className="mt-2">You have successfully unlocked the song:</h1>
          <b style={{ fontSize: "50px" }}>{unlockedSong?.song_name}</b>
          <button
            onClick={() => {
              setIsPopupOpen(false);
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
