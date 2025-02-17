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
  return 0; // For unexpected cases
};

const OverlayCard = ({
  isOpen,
  onClose,
  artistName,
  bio,
  socialMedia = {},
}) => {
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

const ArtistImage = ({ song, onArtistClick, onPlayClick, isPulsing }) => {
  const starCount = getStarsFromScore(song.high_score);

  return (
    <div className="shrink-0 relative overflow-hidden flex justify-center items-center mx-1 small:w-[140px] small:h-[210px] medium:w-[160px] medium:h-[250px] large:w-[160px] large:h-[250px] xl:w-[160px] xl:h-[250px]">
      {/* Frame */}
      <Image
        src="/assets/img/hub/Frame_.png"
        width={240}
        height={200}
        alt="song-frame"
        className="z-2"
      />
      {/* Artist Image Container */}
      <div className="absolute  overflow-hidden  small:left-[2%] small:w-[134px] small:h-[142px] small:top-[1.3%]  small:rounted-t-lg medium:left-1  medium:w-[152px] medium:h-[165px] medium:top-1.5 medium:rounded-t-lg large:top-1.5  large:left-1  large:w-[152px] large:h-[165px] large:rounded-t-lg xl:w-[152px] xl:h-[235px]  large:top-1.5 large:left-1 xl:rounded-t-lg">
        <Image
          src={song.thumbnail_file}
          alt="Artist Image"
          layout="fill"
          objectFit="cover"
        />
      </div>

      {/* Star Rating Overlay */}
      <div className="absolute top-0 left-0 w-full h-8 bg-gradient-to-b from-black/60 to-transparent z-20">
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 flex mt-2">
          {[...Array(5)].map((_, index) => (
            <div
              key={index}
              className="relative medium:w-5 medium:h-5 small:w-4 small:h-4 large:w-5 large:h-5 xl:w-5 xl:h-5"
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
                className="stars object-contain medium:min-w-5 medium:min-h-5 small:min-w-4 small:min-h-4 large:min-w-5 large:min-h-5 xl:min-w-5 xl:min-h-5"
              />
            </div>
          ))}
        </div>
      </div>
      {/* Country and Difficulty Labels */}
      <div className="absolute w-full flex justify-start items-end z-20  small:bottom-[78px] small:left-[-10px]  medium:bottom-[92px] medium:left-0 large:bottom-[92px] large:left-0 xl:bottom-[92px] xl:left-0">
        <svg
          viewBox="0 0 450 70"
          className="absolute medium:left-[-25px] small:left-[-16px] large:left-[-25px] xl:left-[-25px]"
        >
          <text
            className="svgText uppercase tracking-normal  text-yellow medium:text-[8px] small:text-[8px] large:text-[8px] xl:text-[8px]"
            x="1"
            y="45"
          >
            {song.country_name}
          </text>
        </svg>
        <svg
          viewBox="0 0 450 70"
          className="absolute medium:left-[91px] small:left-[81px] large:left-[91px] xl:left-[91px]"
        >
          <text
            className="svgText uppercase tracking-normal  text-yellow medium:text-[8px] small:text-[8px] large:text-[8px] xl:text-[8px]"
            x="3"
            y="45"
          >
            Medium
          </text>
        </svg>
      </div>
      {/* Text (Artist and Song) and Play Button */}
      <div className="absolute  left-1/2 transform -translate-x-1/2 flex flex-col items-center z-2 leading-tight medium:bottom-[-1px]  small:bottom-[-1px] large:bottom-[-1px] xl:bottom-[-1px]">
        <p className="text-yellow text-nowrap medium:text-base large:text-base small:text-sm leading-tight">
          {song.song_name}
        </p>
        <p
          onClick={(e) => onArtistClick(e, song.artist)}
          className="text-white uppercase text-nowrap leading-tight   small:text-[8px]  medium:text-[10px] large:text-[10px] xl:text-[10px]"
        >
          {song.artist_name}
        </p>
        <div className="medium:w-[145px] small:w-[120px] large:w-[145px] xl:w-[145px]">
          <button onClick={onPlayClick} className="medium:mt-1">
            <Image
              src="/assets/img/hub/Play_now.png"
              width={200}
              height={30}
              alt="play-now-btn"
              className={`w-full h-full ${isPulsing ? "pulse" : ""}`}
            />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ArtistImage;
export { OverlayCard, ArtistImage };
