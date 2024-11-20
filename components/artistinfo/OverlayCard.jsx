import React from "react";
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

const ArtistImage = ({ song, onArtistClick, onPlayClick }) => {
  const starCount = getStarsFromScore(song.high_score);
  return (
    <div className="relative w-64 h-[365px]">
      {/* Frame image */}
      <Image
        src="/assets/img/hub/Frame.png"
        alt="Card Frame"
        fill
        className="object-contain"
      />
      <div className="absolute inset-0 flex flex-col">
        {/* Image container */}
        <div className="relative w-[225px] h-[255px] mt-[7px]">
          <Image
            src={song.thumbnail_file}
            alt="Thumbnail"
            fill
            className="object-cover rounded-t-lg"
            priority
          />
          {/* Stars overlay */}
          <div className="absolute top-0 left-0 w-full h-16 bg-gradient-to-b from-black/60 to-transparent">
            <div className="absolute top-1 left-1/2 transform -translate-x-1/2 flex">
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
          {/* Country and difficulty info to bottom of image */}
          <div className="absolute bottom-0 left-0 w-full p-2 bg-gradient-to-t from-black/60 to-transparent">
            <div className="flex justify-between items-end w-full absolute left-0">
              <p className=" uppercase text-yellow-300 absolute bottom-[-3px] left-[-25px] country-text tracking-tighter">
                Kenya
              </p>

              <div className="flex gap-x-0.5 items-end absolute bottom-0 right-3">
                <div className="relative">
                  <Image
                    src="/assets/img/hub/Extreme.png"
                    alt="difficulty"
                    width={35}
                    height={35}
                    className=""
                  />
                </div>
                <div className="flex flex-col">
                  <p className="text-yellow-300 uppercase text-xs difficulty-text p-0 absolute bottom-[-3px] tracking-tighter">
                    Medium
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Card body content */}
        <div className="flex flex-col w-[240px] overflow-hidden">
          <div className="flex flex-col items-center tracking-wide">
            <p className="text-yellow-300">{song.song_name}</p>
            <p
              onClick={(e) => onArtistClick(e, song.artist)}
              className="text-white uppercase text-xs tracking-wide cursor-pointer"
            >
              {song.artist_name}
            </p>
          </div>
        </div>
        <div className="mb-2.5">
          <button
            variant="default"
            onClick={onPlayClick}
            className="w-full flex justify-center items-center"
          >
            <Image
              src="/assets/img/hub/Play_now.png"
              alt="play-now-btn"
              width={250}
              height={50}
              className="max-w-[230px]"
            />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ArtistImage;
export { OverlayCard, ArtistImage };
