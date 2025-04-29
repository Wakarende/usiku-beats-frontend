import React, { useState, useEffect } from "react";
import Image from "next/image";

import "../styles.css";

const getStarsFromScore = (score) => {
  if (score === 0) return 0;
  if (score < 5000) return 1;
  if (score >= 5000 && score < 10000) return 2;
  if (score >= 10000 && score < 15000) return 3;
  if (score >= 15000 && score < 20000) return 4;
  if (score >= 20000) return 5;
  return 0; 
};

const OverlayCard = ({ isOpen, onClose, artistName, bio, socialMedia = {} }) => {
  if (!isOpen) return null;

  const socialIcons = {
    twitter: "/assets/img/artistinfo/X_icon.png",
    youtube: "/assets/img/artistinfo/Youtube_icon.png",
    instagram: "/assets/img/artistinfo/Instagram_icon.png",
    facebook: "/assets/img/artistinfo/facebook_icon.png",
  };

  return (
    <div className="overlay">
      <div className="overlay-content">
        <div className="overlay-header mb-1">
          <Image
            src="/assets/img/artistinfo/Info_icon.png"
            alt="info-icon"
            width={25}
            height={25}
          />
        </div>
        <h2 className="artist">{artistName}</h2>
        <div className="social-icons">
          {Object.keys(socialMedia).map((platform, index) =>
            socialMedia[platform] ? (
              <a
                key={index}
                href={socialMedia[platform]}
                className="social-icon-link"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Image
                  src={socialIcons[platform]}
                  alt={`${platform} icon`}
                  width={40}
                  height={40}
                />
              </a>
            ) : null
          )}
        </div>
        <div className="overlay-body">
          <p className="text-white">{bio}</p>
        </div>
        <button onClick={onClose} className="">
          <Image
            src="/assets/img/artistinfo/Close_button.png"
            alt="close-button"
            width={200}
            height={200}
          />
        </button>
      </div>
    </div>
  );
};

const ArtistImage = ({
  song,
  onArtistClick,
  onPlayClick,
  isPulsing,
  isHighlightedForFtue = false,
}) => {
  const [ftueStep, setFtueStep] = useState(0);

  
  useEffect(() => {
    const storedStep = parseInt(localStorage.getItem("ftueStep") || "1");
    const isFtueCompleted = localStorage.getItem("ftueCompleted") === "true";
    setFtueStep(storedStep);

    if (isFtueCompleted && isHighlightedForFtue) {
      console.log("HIGHLIGHT ACTIVE for song:", song.id, song.song_name);
    }
  }, [isHighlightedForFtue, song]);

  const starCount = getStarsFromScore(song.high_score);

  const handlePlay = () => {
    console.log("Play button clicked, FTUE status:", {
      isHighlightedForFtue,
      ftueStep,
      ftueCompleted: localStorage.getItem("ftueCompleted"),
    });

    
    if (ftueStep === 6 || isHighlightedForFtue) {
      // console.log("COMPLETING FTUE!");
      localStorage.setItem("ftueCompleted", "true");
      localStorage.setItem("playSongPanelSeen", "true");
      
    }

    onPlayClick();
  };
  useEffect(() => {
    if (isHighlightedForFtue) {
      console.log("Song highlighted for FTUE:", song.id, song.song_name);
    }
  }, [isHighlightedForFtue, song]);
  return (
    <div
      className={`   ${
        isHighlightedForFtue && localStorage.getItem("ftueCompleted") !== "true"
          ? "ftue-song-highlight-frame"
          : ""
      }`}
    >
      <div
        className={`shrink-0 mt-1 sm:mb-0.5 relative overflow-hidden flex justify-center items-center mx-1 sm:w-[140px] sm:h-[210px] md:w-[160px] md:h-[250px] lg:w-[160px] lg:h-[250px] xl:w-[160px] xl:h-[250px] `}
      >
        <Image
          src="/assets/img/hub/Frame_.png"
          width={240}
          height={200}
          alt="song-frame"
          className="z-2"
        />
        {/* Artist Image Container */}
        <div className="absolute overflow-hidden sm:left-[2%] sm:w-[134px] sm:h-[142px] sm:top-[1.3%] sm:rounted-t-lg md:left-1 md:w-[152px] md:h-[165px] md:top-1.5 md:rounded-t-lg lg:top-1.5 lg:left-1 lg:w-[152px] lg:h-[165px] lg:rounded-t-lg xl:w-[152px] xl:h-[235px] lg:top-1.5 lg:left-1 xl:rounded-t-lg">
          <Image src={song.thumbnail_file} alt="Artist Image" layout="fill" objectFit="cover" />
        </div>
        {/* Star Rating Overlay */}
        <div className="absolute top-0 left-0 w-full h-8 bg-gradient-to-b from-black/60 rounded-2xl to-transparent z-20">
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 flex mt-2">
            {[...Array(5)].map((_, index) => (
              <div
                key={index}
                className="relative md:w-5 md:h-5 sm:w-4 sm:h-4 lg:w-5 lg:h-5 xl:w-5 xl:h-5"
              >
                <Image
                  src={
                    starCount > 0 && index < starCount
                      ? "/assets/img/hub/Star Active.png"
                      : "/assets/img/hub/Star_Inactive.png"
                  }
                  alt="star"
                  width={15}
                  height={15}
                  className="stars object-contain md:min-w-5 md:min-h-5 sm:min-w-4 sm:min-h-4 lg:min-w-5 lg:min-h-5 xl:min-w-5 xl:min-h-5"
                />
              </div>
            ))}
          </div>
        </div>
        {/* Country and Difficulty Labels */}
        <div className="absolute w-full flex justify-start items-end z-20 sm:bottom-[78px] sm:left-[-10px] md:bottom-[92px] md:left-0 lg:bottom-[92px] lg:left-0 xl:bottom-[92px] xl:left-0">
          <svg
            viewBox="0 0 450 70"
            className="absolute md:left-[-25px] sm:left-[-16px] lg:left-[-25px] xl:left-[-25px]"
          >
            <text
              className="svgText uppercase tracking-normal text-yellow md:text-[8px] sm:text-[8px] lg:text-[8px] xl:text-[8px]"
              x="1"
              y="45"
            >
              {song.country_name}
            </text>
          </svg>
          <svg
            viewBox="0 0 450 70"
            className="absolute md:left-[91px] sm:left-[81px] lg:left-[91px] xl:left-[91px]"
          >
            <text
              className="svgText uppercase tracking-normal text-yellow md:text-[8px] sm:text-[8px] lg:text-[8px] xl:text-[8px]"
              x="3"
              y="45"
            >
              Medium
            </text>
          </svg>
        </div>
        {/* Text (Artist and Song) and Play Button */}
        <div className="absolute left-1/2 transform -translate-x-1/2 flex flex-col items-center z-2 leading-tight md:bottom-[-1px] sm:bottom-[-1px] lg:bottom-[-1px] xl:bottom-[-1px]">
          <p className="text-yellow text-nowrap md:text-base lg:text-base sm:text-sm leading-tight">
            {song.song_name}
          </p>
          <p
            onClick={(e) => onArtistClick(e, song.artist)}
            className="text-white uppercase text-nowrap leading-tight sm:text-[8px] md:text-[10px] lg:text-[10px] xl:text-[10px]"
          >
            {song.artist_name}
          </p>
          <div className="md:w-[145px] sm:w-[120px] lg:w-[145px] xl:w-[145px] relative">
            <button
              onClick={handlePlay}
              className={`md:mt-1 relative ${
                isHighlightedForFtue ? "ftue-play-button-highlight" : ""
              }`}
            >
              <Image
                src="/assets/img/hub/Play_now.png"
                width={200}
                height={30}
                alt="play-now-btn"
                className={`w-full h-full ${isPulsing ? "pulse" : ""}`}
              />
            </button>
            {/* Bouncing hand for FTUE step 6 */}
          </div>
        </div>
      </div>
      {isHighlightedForFtue && localStorage.getItem("ftueCompleted") !== "true" && (
        <div className="absolute bottom-[-10px] right-[-90px] animate-bounce pointer-events-none z-[100]">
          <Image
            src="/assets/img/ftue/hand icon.png"
            width={80}
            height={80}
            alt="Hand pointing to play button"
            className="w-24 h-24 object-contain transform -rotate-90 "
          />
        </div>
      )}
    </div>
  );
};
export default ArtistImage;

export { OverlayCard, ArtistImage };
