import React from "react";

const DailyRewardPopup = ({ isOpen, closePopup, children, className }) => {
  if (!isOpen) return null;

  return (
    <div className={className}>
      <img
        src="/assets/img/dailyreward/BG.png"
        alt="Background"
        className="popup-background"
      />
      <div className="popup-content">{children}</div>
    </div>
  );
};

export default DailyRewardPopup;
