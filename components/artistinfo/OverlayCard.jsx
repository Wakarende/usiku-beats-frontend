import React from "react";
import Image from "next/image";

import { Button } from "react-bootstrap";

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

const ArtistImage = ({ song, onArtistClick, onPlayClick }) => {
  const starCount = getStarsFromScore(song.high_score);
  return (
    <div className="kayfo-masonry-container frame relative flex flex-col items-center p-2 mt-1 max-w-[200px]">
      <div className="relative w-[180px] h-[200px] rounded-lg overflow-hidden">
        <div
          className="absolute inset-0 bg-center bg-cover bg-no-repeat"
          style={{
            backgroundImage: `url(${song.thumbnail_file})`,
          }}
        />
        <div className="absolute top-2 w-full flex justify-center">
          {[...Array(5)].map((_, index) => (
            <div key={index} className="w-4 h-4 relative">
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

      <div className="flex flex-col w-full max-w-[200px]">
        <div className="flex flex-col items-center font-bold text-lg mt-2">
          <p className="text-yellow-300">{song.song_name}</p>
          <p
            onClick={(e) => onArtistClick(e, song.artist)}
            className="text-white uppercase text-xs"
          >
            {song.artist_name}
          </p>
        </div>
        <div className="flex justify-between mb-1">
          <p className="text-yellow-300 uppercase text-xs">Kenya</p>
          <div className="flex gap-x-1">
            <Image
              src="/assets/img/hub/Extreme.png"
              alt="difficulty"
              width={20}
              height={20}
            />
            <p className="text-yellow-300 uppercase text-xs">Medium</p>
          </div>
        </div>
      </div>

      <div className="flex justify-center w-full max-w-[180px]">
        <button variant="default" onClick={onPlayClick} className="mt-1 w-full">
          <Image
            src="/assets/img/hub/Play_now.png"
            width={180}
            height={40}
            alt="play"
            className="w-full h-auto"
          />
        </button>
      </div>
    </div>
  );
};

export { OverlayCard, ArtistImage };
