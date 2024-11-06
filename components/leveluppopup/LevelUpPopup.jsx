import React from "react";
import PropTypes from "prop-types";
import Image from "next/image";
import { useRouter } from "next/router";

const LevelUpPopup = ({ isOpen, closePopup, newLevel }) => {
  const router = useRouter();
  if (!isOpen) return null;

  // Redirect to /levelinfo page and close the popup
  const handleOverlayTouch = () => {
    router.push("/levelinfo");
    closePopup();
  };

  return (
    <div
      className="fixed inset-0 flex items-center justify-center z-50 popup-container"
      onClick={handleOverlayTouch}
    >
      <div
        className="relative w-full max-w-md mx-auto"
        onTouchEnd={(e) => e.stopPropagation()}
      >
        <div className="relative">
          {/* Star Image */}
          <Image
            src="/assets/img/levelup/Level_Star.png"
            alt="Level Up Star"
            width={500}
            height={500}
            className="mx-auto"
          />
          <div className="absolute inset-0 z-20 flex items-center justify-center text-white">
            <h1 className="text-9xl font-bold level-number tracking-widest">
              0{newLevel}
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
};

LevelUpPopup.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  closePopup: PropTypes.func.isRequired,
  newLevel: PropTypes.number,
};

export default LevelUpPopup;
