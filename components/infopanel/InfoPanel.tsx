import React from "react";
import Image from "next/image";
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
      <div className="flex flex-col absolute bottom-0 left-[50%] transform translate-x-[-50%] w-[100%] bg-[#1a1a1a] p-4 text-white tracking-widest rounded-lg">
        <div className="absolute left-[-2%]">
          <Image
            src="/assets/img/artistinfo/Info_icon.png"
            alt="info-icon"
            width={25}
            height={25}
          />
        </div>
        <h1 className="text-6xl mb-4 leading-tight">Did you know?</h1>
        <div className="text-lg mb-4 text-yellow">
          <p>
            This is the <span className=" font-extrabold">Hubscreen</span>,
            where you can play the songs you've unlocked and access the library
            to unlock more.
          </p>
          <p>Press play now, on your first song to get playing!</p>
        </div>
        <button className="mt-4" onClick={onClose}>
          <Image
            src="/assets/img/ftue/Close_button.png"
            width={250}
            height={100}
            alt="continue-btn"
          />
        </button>
      </div>
    </div>
  );
}
