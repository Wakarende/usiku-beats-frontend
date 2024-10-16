import React from "react";
import { FaSpotify, FaTwitter, FaYoutube, FaInstagram } from "react-icons/fa";
import { CgWebsite } from "react-icons/cg";
import { Tooltip } from "@mui/material";
import Image from "next/image";
import { Button } from "react-bootstrap";
import "./styles.css";
import { FaStar } from "react-icons/fa";

const getStarsFromScore = (score) => {
  if (score === 0) return 0;
  if (score < 5000) return 1;
  if (score >= 5000 && score < 10000) return 2;
  if (score >= 10000 && score < 15000) return 3;
  if (score >= 15000 && score < 20000) return 4;
  if (score >= 20000) return 5;
  return 0; // For unexpected cases
};

const OverlayCard = ({ isOpen, onClose, artistName, bio, socialMedia = {} }) => {
  if (!isOpen) return null;

  const socialIcons = {
    spotify: <FaSpotify />,
    twitter: <FaTwitter />,
    youtube: <FaYoutube />,
    instagram: <FaInstagram />,
    website: <CgWebsite />,
  };

  return (
    <div className="overlay">
      <div className="overlay-content">
        <div className="overlay-header">{/* <TbInfoSquare className="info-icon" /> */}</div>
        <h2 className="artist">{artistName}</h2>
        <div className="social-icons">
          {Object.keys(socialMedia).map(
            (platform, index) =>
              socialMedia[platform] && (
                <a
                  key={index}
                  href={socialMedia[platform]}
                  className="social-icon-link"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {socialIcons[platform]}
                </a>
              )
          )}
        </div>
        <div className="overlay-body">
          <p>{bio}</p>
        </div>
        <button onClick={onClose} className="overlay-close-btn">
          Close
        </button>
      </div>
    </div>
  );
};

const ArtistImage = ({ song, onArtistClick, onPlayClick }) => {
  const starCount = getStarsFromScore(song.high_score);

  return (
    <div
      className="kayfo-masonry-container"
      style={{
        display: "flex",
        minHeight: 234,
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        margin: "10px",
      }}
    >
      <div
        className="kayfo-masonry-item"
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
        }}
        onClick={(e) => onArtistClick(e, song.artist)}
      >
        <div style={{ position: "relative", width: 250, height: 250 }}>
          <Image src={song.thumbnail_file} alt="" layout="fill" objectFit="cover" />
          <div
            style={{
              position: "absolute",
              bottom: "5%",
              left: 0,
              right: 0,
              background: "rgba(0, 0, 0, 0.7)",
              color: "#fff",
              padding: "10px",
              marginRight: 10,
              marginLeft: 10,
            }}
          >
            <div className="flex flex-col items-center">
              <div style={{ fontSize: "16px", fontWeight: "bold" }}>{song.song_name}</div>
              <div style={{ fontSize: "14px" }}>{song.artist_name}</div>
              <div style={{ fontSize: "12px" }}>Medium Difficulty</div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-center">
        {[...Array(5)].map((_, index) => (
          <FaStar
            key={index}
            style={{
              color: starCount > 0 && index < starCount ? "#ffc107" : "#e4e5e9",
              marginRight: "2px",
            }}
          />
        ))}
      </div>
      <Button
        variant="default"
        style={{
          backgroundColor: "orange",
          color: "white",
          width: "200px",
          marginTop: "10px",
        }}
        size="lg"
        onClick={onPlayClick}
      >
        Play
      </Button>
    </div>
  );
};

export { OverlayCard, ArtistImage };
