import React, { Component, useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Link from "next/link";
import Image from "next/image";

import { updateUser } from "../../redux/main/authActions";
import { useSelector, useDispatch } from "react-redux";

import "../styles.css";

const Header = () => {
  const auth = useSelector((state) => state.auth);
  const { user_data, isAuthenticated } = auth;
  const [stars, setStars] = useState(0);
  const [gems, setGems] = useState(0);
  const [level, setLevel] = useState(1);
  const dispatch = useDispatch();

  useEffect(() => {
    console.log("updating header", user_data);
    setStars(user_data?.profile.player.total_stars || 0);
    setGems(user_data?.profile.player.total_gems || 0);
    setLevel(user_data?.profile.player.level || 1);
  }, [user_data]);

  const addGems = () => {
    const updatedUser = {
      ...user_data,
      profile: {
        ...user_data.profile,
        player: {
          ...user_data.profile.player,
          total_gems: user_data.profile.player.total_gems + 20,
        },
      },
    };
    dispatch(updateUser(updatedUser));
  };

  return (
    <Navbar expand="lg" className="navbar">
      <Container fluid className="flex items-center justify-between">
        {/* Stars and Gems Section */}
        <div className="header-left flex flex-col items-center gap-x-">
          {/* Number of stars */}
          <div className="relative flex items-center mb-1">
            <Image
              src="/assets/img/header/No_of_stars.png"
              alt="Number of stars"
              width={120}
              height={100}
              className="value-bg"
            />
            <div className="absolute inset-0 flex items-center justify-center pl-8">
              <p className="text-yellow text-lg whitespace-nowrap">{stars}</p>
            </div>
          </div>
          {/* Number of gems */}
          <div className="relative flex items-center">
            <Image
              src="/assets/img/header/No_of_gems.png"
              alt="Number of gems"
              width={120}
              height={100}
              className="header-gem"
            />
            <div className="absolute inset-0 flex items-center justify-center pl-8">
              <p className="text-yellow text-lg whitespace-nowrap">{gems}</p>
            </div>
          </div>
        </div>
        {/* Level Info Section */}
        {/* <Link href={"/levelinfo"}>
          <div className="header-level relative flex items-center justify-center">
            <Image
              src="/assets/img/header/Star_Level.png"
              alt="Star Level"
              width={110}
              height={110}
              className="star-levels"
            />
            <h3 className="level-text text-white text-4xl">{level}</h3>
          </div>
        </Link> */}
        {/* Ayoba Test  */}
        <div className="header-level relative flex items-center justify-center">
          <Image
            src="/assets/img/start/Group 5.png"
            alt="Star Level"
            width={75}
            height={75}
            className="star-levels"
          />
        </div>
        {/* Header Icons Section */}
        <div className="header-right flex items-center gap-x-2 h-full">
          <Link href={"#"} className="flex items-center">
            <Image
              src="/assets/img/header/Leaderboard_icon.png"
              alt="Leaderboard"
              width={50}
              height={50}
            />
          </Link>
          <Link href={"/login"} className="flex items-center">
            <Image
              src="/assets/img/header/Settings.png"
              alt="Settings"
              width={50}
              height={50}
            />
          </Link>
        </div>
      </Container>
    </Navbar>
  );
};

export default Header;
