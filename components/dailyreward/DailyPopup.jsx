import React from "react";

const DailyRewardPopup = ({ isOpen, closePopup, children, className }) => {
  if (!isOpen) return null;

  return (
    <div className={className}>
      <div className="popup-content">{children}</div>
    </div>
  );
};

export default DailyRewardPopup;
