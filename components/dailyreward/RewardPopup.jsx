import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import DailyRewardPopup from "./DailyPopup"; // Adjust the path if necessary
import { updateUser } from "../../redux/main/authActions";
import "../styles.css";

const DailyReward = () => {
  const [isDailyPopupOpen, setIsDailyPopupOpen] = useState(false);
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const { user_data } = auth;

  useEffect(() => {
    checkFirstLoginOfDay();
  }, []);

  const checkFirstLoginOfDay = () => {
    const lastLoginDate = localStorage.getItem("lastLoginDate");
    const today = new Date().toISOString().split("T")[0];

    if (lastLoginDate !== today) {
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

      setIsDailyPopupOpen(true);
      localStorage.setItem("lastLoginDate", today);
    }
  };

  const toggleDailyPopup = () => {
    setIsDailyPopupOpen(!isDailyPopupOpen);
  };

  return (
    <DailyRewardPopup
      isOpen={isDailyPopupOpen}
      closePopup={toggleDailyPopup}
      className="popup-overlay"
    >
      {/* Daily Reward Styling */}
      <div className="daily-reward-content mt-5">
        <h1 className="daily-welcome uppercase text-8xl mb-4">Welcome back</h1>
        <p className="daily-gift-title uppercase font-bold text-3xl text-yellow">Your Daily Gift</p>
        <p className="daily-gift-subtext text-xl mt-1 text-yellow">
          Check in everyday to get more rewards
        </p>
        <div className="daily-gem-section">
          <Image
            src="./assets/img/dailyreward/gem.png"
            alt="Gem Icon"
            width={100}
            height={100}
            className="daily-reward-gem"
          />
          <h3 className="gem-value text-yellow text-5xl">+10</h3>
        </div>
        <button className="daily-claim-button" onClick={toggleDailyPopup}>
          <Image
            src="./assets/img/dailyreward/collect_button.png"
            alt="Claim Button"
            width={220}
            height={100}
          />
        </button>
      </div>
    </DailyRewardPopup>
  );
};

export default DailyReward;
