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
    <Navbar expand="lg" className="kayfo-header navbar">
      <Container fluid className="flex items-center justify-between">
        {/* Stars and Gems Section */}
        <div className="header-left flex flex-col items-center gap-x-4 gap-y-1">
          {/* Number of stars */}
          <div className=" relative flex items-center">
            <Image
              src="/assets/img/header/No_of_stars.png"
              alt="Number of stars"
              width={70}
              height={70}
            />
            <p className="absolute text-yellow-300 font-bold text-lg star-gem-text">
              {stars}
            </p>
          </div>
          {/* Number of gems */}
          <div className="relative flex items-center">
            <Image
              src="/assets/img/header/No_of_gems.png"
              alt="Number of gems"
              width={75}
              height={75}
              className="header-gem"
            />
            <p className="absolute text-yellow-300 font-bold text-lg star-gem-text">
              {gems}
            </p>
          </div>
        </div>
        {/* Level Info Section */}
        <Link href={"/levelinfo"}>
          <div className="header-level relative flex items-center justify-center">
            <Image
              src="/assets/img/header/Star_Level.png"
              alt="Star Level"
              width={100}
              height={100}
              className="star-levels"
            />
            <h3 className="level-text absolute text-white text-3xl font-bold tracking-widest">
              0{level}
            </h3>
          </div>
        </Link>
        {/* Header Icons Section */}
        <div className="header-right flex items-center gap-x-4">
          <Link href={"#"}>
            <Image
              src="/assets/img/header/Leaderboard_icon.png"
              alt="Leaderboard"
              width={40}
              height={40}
            />
          </Link>
          <Link href={"/login"}>
            <Image
              src="/assets/img/header/Settings.png"
              alt="Settings"
              width={40}
              height={40}
            />
          </Link>
        </div>
      </Container>
    </Navbar>
  );
};

export default Header;
