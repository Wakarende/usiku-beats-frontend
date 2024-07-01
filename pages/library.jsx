import React, { Component, useEffect, useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as mainActions from "../redux/main/mainActions";
import { loginSuccess } from "../redux/main/authActions";
import { withRouter } from "next/router";
import {
  Button,
  Col,
  Container,
  Dropdown,
  Form,
  Row,
  Spinner,
} from "react-bootstrap";
import { useSelector } from "react-redux";

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

import Header from "../components/Header";
import Footer from "../components/Footer";

const Library = () => {
  const [songs, setSongs] = useState([]);
  const [loading, setLoading] = useState(false);

  const auth = useSelector((state) => state.auth);
  const { user_data, isAuthenticated } = auth;

  useEffect(() => {
    setLoading(true);
    axios.get(`${BASE_URL}/song-list/?limit=10`).then((res) => {
      setSongs(res.data);
      setLoading(false);
    });
  }, []);

  useEffect(() => {
    console.log(
      "user_data.profile.player.level",
      user_data?.profile.player.level
    );
  }, [user_data]);

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
                  disabled
                  variant="primary"
                  style={{ maxHeight: "40px" }}
                >
                  Unlock
                </Button>
              </div>
            </div>
          </div>
        ))}

        {/* <Footer />   */}
      </div>

      <BottomTabNav />
    </div>
  );
};

export default Library;
