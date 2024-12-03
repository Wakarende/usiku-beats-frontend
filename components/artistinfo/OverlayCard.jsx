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
            src="/assets/img/artistinfo/info_icon.png"
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
    <div className="frame relative flex flex-col items-stretch w-[250px] h-[310px] overflow-hidden mx-1">
      <div className="relative w-full h-[230px]">
        <Image
          src={song.thumbnail_file}
          alt={song.song_name}
          layout="fill"
          objectFit="cover"
          className="rounded-t-md"
        />
      </div>
      {/* Star rating at the top */}

      <div className="absolute top-0 left-0 w-full h-8  bg-gradient-to-b from-black/60 to-transparent">
        <div className="absolute top-1 left-1/2 transform -translate-x-1/2 flex mt-2">
          {[...Array(5)].map((_, index) => (
            <div key={index} className="relative w-6 h-6">
              <Image
                src={
                  starCount > 0 && index < starCount
                    ? "/assets/img/hub/Star Active.png"
                    : "/assets/img/hub/Star_Inactive.png"
                }
                alt="star"
                width={16}
                height={16}
                className="stars"
              />
            </div>
          ))}
        </div>
      </div>
      {/* Bottom gradient and content */}
      <div className="absolute bottom-0 left-0 p-2 w-full ">
        <div className="flex w-full justify-between items-end absolute bottom-28">
          <p className="uppercase text-yellow-300 tracking-tighter country-text absolute top-[50%] left-[-30px] ">
            {song.country_name}
          </p>

          <div className="flex gap-x-0.5 items-end">
            <div className="flex flex-col">
              <p className="text-yellow-300 uppercase tracking-tighter difficulty-text absolute right-[-14px] gradient-text">
                Medium
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col flex-grow overflow-hidden justify-end ">
        <div className="flex flex-col items-center text-md tracking-wide">
          <p className="text-yellow-300">{song.song_name}</p>
          <p
            onClick={(e) => onArtistClick(e, song.artist)}
            className="text-white uppercase text-xs tracking-wide cursor-pointer"
          >
            {song.artist_name}
          </p>
        </div>
      </div>
      {/* </div> */}
      <div className="flex justify-center ">
        <button variant="default" onClick={onPlayClick}>
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
  );
};

export default ArtistImage;
export { OverlayCard, ArtistImage };
