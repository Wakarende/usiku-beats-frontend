import React from "react";
import Image from "next/image";
export default function InfoPanel({
  title = "Did you know?",
  paragraphs = [],
  onClose,
  bgImage = "/assets/img/ftue/Info_panel.png",
}) {
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
        className="flex flex-col absolute bottom-0 left-[50%] transform translate-x-[-50%] w-[100%] bg-[#1a1a1a] p-4 text-white tracking-widest rounded-lg text-center"
        style={{
          backgroundImage: `url(${bgImage})`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
        }}
      >
        <h1 className="text-6xl mb-4 leading-tight">{title}</h1>
        <div className="text-lg mb-4 text-yellow small:text-xs medium:w-full large:w-[80%] xl:w-[60%] xl:text-2xl mx-auto">
          {paragraphs.map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
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
