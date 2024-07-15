// OverlayCard.js
import React from "react";
import { FaSpotify, FaTwitter, FaYoutube, FaInstagram } from 'react-icons/fa';
import { CgWebsite } from "react-icons/cg";
import { Tooltip } from "@mui/material";
import Image from "next/image";
import { Button } from "react-bootstrap";
import "./styles.css";

const OverlayCard = ({ isOpen, onClose, artistName, bio, socialMedia = {} }) => {
  if (!isOpen) return null;

  const socialIcons = {
    spotify: <FaSpotify />,
    twitter: <FaTwitter />,
    youtube: <FaYoutube />,
    instagram: <FaInstagram />,
    website: <CgWebsite />
  };

  return (
    <div className="overlay">
      <div className="overlay-content">
        <div className="overlay-header">
          {/* <TbInfoSquare className="info-icon" /> */}
        </div>
        <h2 className="artist">{artistName}</h2>
        <div className="social-icons">
          {Object.keys(socialMedia).map((platform, index) => (
            socialMedia[platform] && (
              <a key={index} href={socialMedia[platform]} className="social-icon-link" target="_blank" rel="noopener noreferrer">
                {socialIcons[platform]}
              </a>
            )
          ))}
        </div>
        <div className="overlay-body">
          <p>{bio}</p>
        </div>
        <button onClick={onClose} className="overlay-close-btn">Close</button>
      </div>
    </div>
  );
};

const ArtistImage = ({ artist, onArtistClick, onPlayClick }) => {
  const handleTouchStart = (e) => {
    const artistNameElement = e.currentTarget.querySelector(".artist-name");
    if (artistNameElement) {
      artistNameElement.style.opacity = "1";
    }
  };

  const handleTouchEnd = (e) => {
    const artistNameElement = e.currentTarget.querySelector(".artist-name");
    if (artistNameElement) {
      artistNameElement.style.opacity = "0";
    }
  };

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
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <div
        className="kayfo-masonry-item"
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
        }}
        onClick={(e) => onArtistClick(e, artist.artist)}
      >
        <div style={{ position: "relative" }}>
          <Tooltip placement="top" title={artist.song_name}>
            <Image
              src={artist.thumbnail_file}
              alt=""
              width={250}
              height={250}
              style={{
                maxWidth: "100%",
                height: "auto",
                objectFit: "contain",
              }}
            />
          </Tooltip>
          <div className="artist-name" style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            background: "rgba(0, 0, 0, 0.7)",
            color: "#fff",
            padding: "5px",
            textAlign: "center",
            opacity: 0,
            transition: "opacity 0.3s ease",
          }}>
            {artist.artist_name}
          </div>
        </div>
      </div>
      <Button
        variant="default"
        style={{
          backgroundColor: "orange",
          color: "white",
          width: "200px",
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