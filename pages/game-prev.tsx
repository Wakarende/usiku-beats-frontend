import React from "react";
import dynamic from "next/dynamic";

// Import the PhaserGame component with SSR disabled
const PhaserGameNoSSR = dynamic(() => import("../components/MainGame"), {
  ssr: false,
  loading: () => <p style={{ color: "white" }}> Loading...</p>,
});

const Game: React.FC = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        width: "100%",
        position: "relative",
        backgroundColor: "black", // Set background color to black
        zIndex: 1000, // Ensure it's on top if needed
      }}
    >
      <PhaserGameNoSSR />
    </div>
  );
};

export default Game;
