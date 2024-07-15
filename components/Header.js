import { Avatar } from "@mui/material";
import { deepOrange } from "@mui/material/colors";
import Image from "next/image";
import { withRouter } from "next/router";
import React, { Component, useEffect, useState } from "react";
import { Dropdown } from "react-bootstrap";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as mainActions from "../redux/main/mainActions";

import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import userService from "../services/user.service";
import SettingsIcon from "@mui/icons-material/Settings";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import StarIcon from "@mui/icons-material/Star";
import DiamondIcon from "@mui/icons-material/Diamond";
import { useSelector } from "react-redux";
import Link from "next/link";

const Header = () => {
  const auth = useSelector((state) => state.auth);
  const { user_data, isAuthenticated } = auth;
  const [stars, setStars] = useState(0);
  const [gems, setGems] = useState(0);
  const [level, setLevel] = useState(1);

  useEffect(() => {
    console.log("updating header", user_data);
    setStars(user_data?.profile.player.total_stars || 0);
    setGems(user_data?.profile.player.total_gems || 0);
    setLevel(user_data?.profile.player.level || 1);
  }, [user_data]);

  // useEffect(() => {
  //   if (typeof window !== 'undefined') {
  //     let user_data = localStorage.getItem('user_data');
  //     user_data = JSON.parse(user_data);
  //     console.log("updating header", user_data);
  //     setStars(user_data?.profile.player.total_stars || 0);
  //     setGems(user_data?.profile.player.total_gems || 0);
  //     setLevel(user_data?.profile.player.level || 1);
  //   }
  // }, []);

  return (
    <Navbar
      expand="lg"
      className="bg-body-tertiary kayfo-header"
      style={{
        position: "sticky",
        top: 0,
        zIndex: 1000,
        backgroundColor: "#fff",
      }}
    >
      <Container fluid className="flex items-center">
        {/* <Navbar.Brand href="/">
            <Image
              src={require("../assets/icons/beats_logo.png")}
              className="beats-logo"
              width={150}
              alt="Beats"
            />
          </Navbar.Brand> */}
        <div className="flex flex-col items-center mr-4">
          <div className="flex items-center">
            <StarIcon className="text-yellow-500 text-xl" />
            <span className="text-base text-white ml-2">{stars} stars</span>
          </div>
          <div className="flex items-center">
            {/* Replace this with your gem icon */}
            <DiamondIcon className="text-blue-500 text-xl" />
            <span className="text-base text-white ml-2">{gems} gems</span>
          </div>
        </div>

        {/* <>
            {!this.props.hidebtn && !this.state.user_data &&
              <Button variant="default kayfo-connexion-btn" size='lg' onClick={this.gotoLogin} >Login</Button>
            }
          </> */}
        <Link href={"/levelinfo"}>
          <div className="relative flex items-center justify-center flex-grow">
            <StarIcon
              className="text-red-500 text-6xl"
              style={{ position: "absolute" }}
            />
            <span className="absolute text-white text-2xl font-bold">
              {level}
            </span>
          </div>
        </Link>
        <div className="header-icons">
          <EmojiEventsIcon
            style={{ fontSize: "36px", color: "gold", marginRight: "10px" }}
          />
          <Link href={"/login"}>
            <SettingsIcon style={{ fontSize: "36px", color: "white" }} />
          </Link>
        </div>

        {/* {isAuthenticated && (
            <Dropdown drop={"start"}>
              <Dropdown.Toggle
                variant="default"
                style={{ color: "#fff", border: "none" }}
                id="dropdown-basic"
              >
                <span style={{ position: "absolute", right: "150%" }}>
                  {user_data?.profile.user.username}
                </span>
                <Avatar
                  style={{ position: "absolute", top: 0, left: -5 }}
                  sx={{ bgcolor: deepOrange[500] }}
                ></Avatar>
              </Dropdown.Toggle>
              <Dropdown.Menu>

                <Dropdown.Item>
                  Logout
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          )} */}
      </Container>
    </Navbar>
  );
};

export default Header;
