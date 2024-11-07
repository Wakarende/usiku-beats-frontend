"use client";
import React, { useState } from "react";
import Image from "next/image";

import DailyRewardPopup from "./DailyPopup";
import "./style.css";

const RewardPopup = () => {
  const [isLevelUpPopupOpen, setIsLevelUpPopupOpen] = useState(false);
  const [newLevel, setNewLevel] = useState();
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const togglePopup = () => {
    setIsPopupOpen(!isPopupOpen);
  };

  return (
    <Popup isOpen={isPopupOpen} closePopup={togglePopup}>
      <h1 className="uppercase block">Welcome Back</h1>
      <h2 className=" uppercase">Your daily login gift</h2>
      <p className="text-2xl">10</p> gems
      <button
        onClick={togglePopup}
        className="mt-3 px-6 py-3 bg-blue-500 text-white font-semibold text-xl rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-700 focus:ring-opacity-50"
      >
        Claim daily gift
      </button>
    </Popup>
  );
};
