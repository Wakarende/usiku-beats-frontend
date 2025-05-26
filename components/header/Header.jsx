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
  const [lastTapTime, setLastTapTime] = useState(0);
  const dispatch = useDispatch();

  useEffect(() => {
    // console.log("updating header", user_data);
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

  function resetGame() {
    // Clear all items in localStorage
    localStorage.clear();

    // Navigate to the start of the game (root path)
    window.location.href = "/";
  }

  const handleTap = () => {
    const currentTime = new Date().getTime();
    const timeSinceLastTap = currentTime - lastTapTime;

    // Check if this is a double tap (tap within 300ms of previous tap)
    if (timeSinceLastTap < 300 && timeSinceLastTap > 0) {
      resetGame();
      console.log("Double-tap reset triggered");
    }

    // Update the last tap time
    setLastTapTime(currentTime);
  };

  return (
    <Navbar expand="lg" className="navbar" style={{ zIndex: 21 }}>
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
            src="/assets/img/start/usiku.png"
            alt="Star Level"
            width={70}
            height={70}
            className="logo md:w-[75px] h-auto "
          />
        </div>
        {/* Header Icons Section */}
        <div className="header-right flex items-center justify-end gap-x-2 h-full">
          <div className="ml-10"></div>
          <button
            onClick={handleTap}
            className="flex items-center justify-center"
            style={{
              width: "50px",
              height: "50px",

              // border: "1px dashed red",
              // opacity: 0.3,
            }}
          >
            <div
              style={{
                width: "100%",
                height: "100%",
                touchAction: "manipulation",
              }}
            />
          </button>
        </div>
      </Container>
    </Navbar>
  );
};
export default Header;
