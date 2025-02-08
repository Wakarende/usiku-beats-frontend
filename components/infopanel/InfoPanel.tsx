import React from "react";

export default function InfoPanel({ onClose }) {
  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        backgroundColor: "rgba(0,0,0,0.5)",
        zIndex: 9999,
      }}
    >
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: "50%",
          transform: "translateX(-50%)",
          width: "90%",
          maxWidth: 600,
          backgroundColor: "white",
          borderRadius: "10px",
          padding: "1rem",
          color: "#333",
        }}
      >
        <h2>Welcome to the Hub!</h2>
        <p>
          This is where you’ll find all the songs you’ve unlocked. From here,
          you can jump into a game at any time.
        </p>
        <p>Good luck, and have fun exploring more tracks!</p>
        <button onClick={onClose} style={{ marginTop: "1rem" }}>
          Got It!
        </button>
      </div>
    </div>
  );
}
