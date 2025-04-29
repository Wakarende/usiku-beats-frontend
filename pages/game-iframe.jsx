// pages/game-iframe.jsx
import React from "react";
import dynamic from "next/dynamic";

// Import the PhaserGame component with SSR disabled
const PhaserGameNoSSR = dynamic(() => import("../components/MainGame"), {
  ssr: false,
  loading: () => <p style={{ color: "white" }}>Loading...</p>,
});

const GameIframe = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        width: "100%",
        position: "relative",
        backgroundColor: "black",
        overflow: "hidden",
      }}
    >
      <PhaserGameNoSSR />
    </div>
  );
};

export default GameIframe;
