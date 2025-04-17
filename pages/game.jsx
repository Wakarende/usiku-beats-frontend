// pages/game.jsx
import React, { useRef, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { updateUser } from "../redux/main/authActions";

const Game = () => {
  const iframeRef = useRef(null);
  const router = useRouter();
  const dispatch = useDispatch();
  const [iframeKey, setIframeKey] = useState(Date.now());

  // Function to reset the game
  const resetGame = () => {
    // Generate a new key to force iframe reload
    setIframeKey(Date.now());
  };

  // Expose the reset function to the parent window
  useEffect(() => {
    window.resetGame = resetGame;

    // Handle messages from the iframe
    const handleMessage = (event) => {
      if (event.data) {
        // Handle game actions
        if (event.data.type === "GAME_ACTION") {
          if (event.data.action === "EXIT_GAME") {
            router.push("/"); // Navigate to home or wherever
          }
        }

        // Handle user updates
        if (event.data.type === "UPDATE_USER_EVENT") {
          dispatch(updateUser(event.data.data));
        }
      }
    };

    window.addEventListener("message", handleMessage);
    return () => {
      window.removeEventListener("message", handleMessage);
      delete window.resetGame;
    };
  }, [router, dispatch, resetGame]);

  // Get the appropriate iframe URL based on environment
  const origin = typeof window !== "undefined" ? window.location.origin : "";
  const iframeSrc =
    process.env.NODE_ENV === "production" ? `${origin}/game-iframe.html` : `${origin}/game-iframe`;
  // In pages/game.jsx
  return (
    <div
      style={{
        position: "fixed", // Change from relative to fixed
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "black",
        zIndex: 1000,
        overflow: "hidden",
      }}
    >
      <iframe
        ref={iframeRef}
        key={iframeKey}
        src={iframeSrc}
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          border: "none",
          overflow: "hidden",
        }}
        allow="fullscreen"
        allowFullScreen
      />
    </div>
  );
};

export default Game;
