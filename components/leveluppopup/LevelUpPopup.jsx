import React from "react";
import PropTypes from "prop-types";
import Image from "next/image";
import { useRouter } from "next/router";
import { motion } from "framer-motion";
import "../styles.css";

const LevelUpPopup = ({ isOpen, closePopup, newLevel }) => {
  const router = useRouter();
  if (!isOpen) return null;

  const MotionImage = motion(Image);

  // Redirect to /levelinfo page and close the popup
  const handleOverlayTouch = () => {
    router.push("/levelinfo");
    closePopup();
  };

  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center z-50 popup-container">
      <div
        className="relative w-full max-w-md mx-auto"
        onTouchEnd={(e) => e.stopPropagation()}
      >
        <div className="relative w-full mx-auto max-w-md">
          <div className=" flex flex-col justify-center items-center">
            <p className=" absolute top-[10%] text-yellow z-50 text-3xl uppercase font-bold tracking-wider">
              You've Reached
            </p>
            <h1 className="absolute top-[18%] text-yellow text-8xl">
              Level {newLevel}
            </h1>
          </div>
          {/* Star Image */}
          <Image
            src="/assets/img/levelup/Level_Star.png"
            alt="Level Up Star"
            width={500}
            height={500}
            className="mx-auto"
          />
          <div className="absolute inset-0 z-20 flex items-center justify-center text-white">
            <h1 className="text-9xl level-number tracking-wide">0{newLevel}</h1>
          </div>
        </div>
      </div>
      <motion.div
        onClick={handleOverlayTouch}
        className="w-full justify-center flex"
        animate={{
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          repeatType: "loop",
          ease: "easeInOut",
        }}
      >
        <button className="levelup-btn bg-center bg-contain bg-no-repeat text-white font-bold text-2xl uppercase tracking-wider flex items-center justify-center ">
          <Image
            src={"/assets/img/levelup/Unlock combined copy 4.png"}
            width={300}
            height={100}
          />
        </button>
      </motion.div>
    </div>
  );
};

LevelUpPopup.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  closePopup: PropTypes.func.isRequired,
  newLevel: PropTypes.number,
};

export default LevelUpPopup;
