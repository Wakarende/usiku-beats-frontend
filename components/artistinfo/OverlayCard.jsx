import React, { useState, useEffect } from "react";
import Image from "next/image";
import useFTUEStore from "../../stores/ftueStore";
import useStorageStore from "../../stores/storageStore";
import { AnalyticsService, logAnalyticsEvent } from "../../services/analytics.service";
import "../styles.css";

// const getStarsFromScore = (score) => {
//   if (score === 0) return 0;
//   if (score < 5000) return 1;
//   if (score >= 5000 && score < 10000) return 2;
//   if (score >= 10000 && score < 15000) return 3;
//   if (score >= 15000 && score < 20000) return 4;
//   if (score >= 20000) return 5;
//   return 0;
// };

const OverlayCard = ({ isOpen, onClose, artistName, bio, socialMedia = {} }) => {
  if (!isOpen) return null;

  const socialIcons = {
    twitter: "./assets/img/artistinfo/X_icon.png",
    youtube: "./assets/img/artistinfo/Youtube_icon.png",
    instagram: "./assets/img/artistinfo/Instagram_icon.png",
    facebook: "./assets/img/artistinfo/facebook_icon.png",
  };

  return (
    <div className="overlay">
      <div className="overlay-content">
        <div className="overlay-header mb-1">
          <Image
            src="./assets/img/artistinfo/Info_icon.png"
            alt="info-icon"
            width={25}
            height={25}
            className="w-[25px] h-[25px]"
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
                  className="w-[40px] h-[40px]"
                />
              </a>
            ) : null
          )}
        </div>
        <div className="overlay-body">
          <p className="text-white">{bio}</p>
        </div>
        <button onClick={onClose} className="absolute bottom-0 w-[20rem] relative">
          <Image
            src="./assets/img/hub/button_blank.png"
            alt="close-button"
            width={100}
            height={100}
            className="w-full h-auto"
          />
          <div className="absolute top-0 left-[4.8rem] flex justify-center items-center w-full">
            <p className="text-white font-bold uppercase text-4xl tracking-widest ">CLOSE</p>
          </div>
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
  const { setPlaySongPanelSeen } = useStorageStore();
  const { currentStep, isCompleted, completeFTUE } = useFTUEStore();
  const getStarsFromScore = (score) => {
    let starsCount;
    if (score < 18000) {
      starsCount = 0;
    } else if (score >= 18000 && score < 36000) {
      starsCount = 1;
    } else if (score >= 36000 && score < 54000) {
      starsCount = 2;
    } else if (score >= 54000 && score < 72000) {
      starsCount = 3;
    } else if (score >= 72000 && score < 90000) {
      starsCount = 4;
    } else if (score >= 90000) {
      starsCount = 5;
    } else {
      starsCount = 0; // Handle unexpected cases
    }
    return starsCount;
  };

  useEffect(() => {
    if (isCompleted && isHighlightedForFtue) {
      console.log("HIGHLIGHT ACTIVE for song:", song.id, song.song_name);
    }
  }, [isHighlightedForFtue, song, isCompleted]);

  const starCount = getStarsFromScore(song.high_score);

  const isNewSong = () => {
    // Song is considered new if it's unlocked and has no high score (never played)
    return song.unlocked && (!song.high_score || song.high_score === 0);
  };

  const getDifficultyPositioning = (difficulty) => {
    const difficultyLower = difficulty.toLowerCase();

    switch (difficultyLower) {
      case "easy":
        return {
          svgLeft: "md:left-[6.2rem] sm:left-[92px] lg:left-[7rem] xl:left-[7rem]",
          textX: "3",
        };
      case "medium":
        return {
          svgLeft: "md:left-[5.5rem] sm:left-[78px] lg:left-[6rem] xl:left-[6rem]",
          textX: "3",
        };
      case "hard":
        return {
          svgLeft: "md:left-[6.1rem] sm:left-[90px] lg:left-[7rem] xl:left-[7rem]",
          textX: "3",
        };
      default:
        return {
          svgLeft: "md:left-[5.5rem] sm:left-[81px] lg:left-[91px] xl:left-[91px]",
          textX: "3",
        };
    }
  };

  const handlePlay = () => {
    if (currentStep === 7 || isHighlightedForFtue) {
      AnalyticsService.trackFTUEStep("9 - Play Now", true);
      logAnalyticsEvent("9 - Play Now");
      completeFTUE();
      setPlaySongPanelSeen(true);
    }

    onPlayClick();
  };
  useEffect(() => {
    if (isHighlightedForFtue) {
      console.log("Song highlighted for FTUE:", song.id, song.song_name);
    }
  }, [isHighlightedForFtue, song]);

  const difficultyStyle = getDifficultyPositioning(song.difficulty);
  return (
    <div className={`${isHighlightedForFtue && !isCompleted ? "ftue-song-highlight-frame" : ""}`}>
      <div
        className={`sm:mb-0.5 relative overflow-hidden flex justify-center items-center mx-1 sm:w-[140px] sm:h-[200px] md:w-[160px] md:h-[256px] lg:w-[180px] lg:h-[266px] xl:w-[160px] xl:h-[266px]    `}
      >
        <Image
          src="./assets/img/hub/frame.png"
          width={240}
          height={200}
          alt="song-frame"
          className="z-2 w-[240px] h-[200px]"
        />
        {/* Artist Image Container */}
        <div className="absolute overflow-hidden sm:left-[2%] sm:w-[134px] sm:h-[140px] sm:top-[0.2rem] sm:rounded-t-lg md:left-1 md:w-[152px] md:h-[150px] md:top-[1.8rem] md:rounded-t-lg lg:top-[2.2rem] lg:left-[0.rem] lg:w-[173px] lg:h-[160px] lg:rounded-t-lg w-[173px] xl:h-[170px]  xl:rounded-t-lg">
          <Image
            src={song.thumbnail_file}
            alt="Artist Image"
            layout="fill"
            className="object-cover"
          />
        </div>
        {/* Star Rating Overlay */}
        <div className="absolute sm:top-[0.2rem] md:top-[1.5rem] lg:top-[1.7rem] left-0 w-full h-8 bg-gradient-to-b from-black/70 rounded-2xl to-transparent z-20">
          {isNewSong() ? (
            <div className="absolute sm:top-0 md:top-[0rem] lg:top-[0rem] xl:top-[0rem] left-1/2 transform -translate-x-1/2 flex items-center justify-center sm:mt-0.5 md:mt-2 lg:mt-2 xl:mt-2">
              <svg viewBox="0 0 100 30" className="w-20 h-6 animate-pulse">
                <text
                  className="svgText uppercase tracking-widest font-bold sm:text-[14px] md:text-[16px] lg:text-[16px] xl:text-[12px] text-yellow"
                  x="50"
                  y="20"
                  textAnchor="middle"
                  fontSize="12"
                >
                  NEW SONG!
                </text>
              </svg>
            </div>
          ) : (
            <div className="absolute sm:top-0 md:top-[0rem] lg:top-[0rem] left-1/2 transform -translate-x-1/2 flex mt-2">
              {[...Array(5)].map((_, index) => (
                <div
                  key={index}
                  className="relative md:w-5 md:h-5 sm:w-4 sm:h-4 lg:w-5 lg:h-5 xl:w-5 xl:h-5"
                >
                  <Image
                    src={
                      starCount > 0 && index < starCount
                        ? "./assets/img/hub/Star_Active.png"
                        : "./assets/img/hub/Star_Inactive.png"
                    }
                    alt="star"
                    width={15}
                    height={15}
                    className="stars object-contain md:min-w-5 md:min-h-5 sm:min-w-5 sm:min-h-5 lg:min-w-6 lg:min-h-6 xl:min-w-6 xl:min-h-6"
                  />
                </div>
              ))}
            </div>
          )}
          {/* <div className="absolute sm:top-0 md:top-[0rem] left-1/2 transform -translate-x-1/2 flex mt-2">
            {[...Array(5)].map((_, index) => (
              <div
                key={index}
                className="relative md:w-5 md:h-5 sm:w-4 sm:h-4 lg:w-5 lg:h-5 xl:w-5 xl:h-5"
              >
                <Image
                  src={
                    starCount > 0 && index < starCount
                      ? "./assets/img/hub/Star_Active.png"
                      : "./assets/img/hub/Star_Inactive.png"
                  }
                  alt="star"
                  width={15}
                  height={15}
                  className="stars object-contain md:min-w-5 md:min-h-5 sm:min-w-5 sm:min-h-5 lg:min-w-5 lg:min-h-5 xl:min-w-5 xl:min-h-5"
                />
              </div>
            ))}
          </div> */}
        </div>
        {/* Country and Difficulty Labels */}
        <div className="absolute w-full flex justify-start items-end z-20 sm:bottom-[76px] sm:left-[-9px] md:bottom-[102px] md:left-0 lg:bottom-[6.8rem] lg:left-0 xl:bottom-[102px] xl:left-0">
          <svg
            viewBox="0 0 450 70"
            className="absolute md:left-[-1.6rem] sm:left-[-1.1rem] lg:left-[-1.3rem] xl:left-[-1.3rem]"
          >
            <text
              className="svgText uppercase tracking-widest text-yellow md:text-[8px] sm:text-[8px] lg:text-[10px] xl:text-[10px]"
              x="1"
              y="45"
            >
              {song.country_name}
            </text>
          </svg>
          <svg
            viewBox="0 0 450 70"
            // className="absolute md:left-[5.5rem] sm:left-[81px] lg:left-[91px] xl:left-[91px]"
            className={`absolute ${difficultyStyle.svgLeft}`}
          >
            <text
              className="svgText uppercase tracking-widest text-yellow md:text-[8px] sm:text-[8px] lg:text-[10px] xl:text-[10px]"
              x={difficultyStyle.textX}
              y="45"
            >
              {song.difficulty}
            </text>
          </svg>
        </div>
        {/* Text (Artist and Song) and Play Button */}
        <div className="absolute left-1/2 transform -translate-x-1/2 flex flex-col items-center z-2 leading-tight md:bottom-[1.6rem] sm:bottom-[0rem] lg:bottom-[1.8rem] xl:bottom-[1.2rem]">
          <p className="text-yellow text-nowrap md:text-md lg:text-medium xl:text-base sm:text-sm leading-tight md:-mb-1">
            {song.song_name}
          </p>
          <p
            onClick={(e) => onArtistClick(e, song.artist)}
            className="text-white uppercase text-nowrap leading-tight sm:text-[10px] md:text-[10px] lg:text-[10px] xl:text-[10px]"
          >
            {song.artist_name}
          </p>
          <div className="md:w-[130px] sm:w-[120px] lg:w-[140px] xl:w-[140px] relative">
            <button
              onClick={handlePlay}
              className={`md:mt-1 relative ${
                isHighlightedForFtue ? "ftue-play-button-highlight" : ""
              }`}
            >
              <Image
                src="./assets/img/hub/Play_now.png"
                width={200}
                height={30}
                alt="play-now-btn"
                className={`w-full h-auto ${isPulsing ? "pulse" : ""}`}
              />
            </button>
            {/* Bouncing hand for FTUE step 6 */}
          </div>
        </div>
      </div>
      {isHighlightedForFtue && !isCompleted && (
        <div className="absolute sm:bottom-[-10px] sm:right-[-90px] md:bottom-1 md:right-[-90px] lg:bottom-1 lg:right-[-90px] xl:bottom-1 xl:right-[-90px] animate-bounce pointer-events-none z-[100]">
          <Image
            src="./assets/img/ftue/hand_icon.png"
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
