import React from "react";
import Image from "next/image";

export default function InfoPanel({
  title = "How To Play?",
  paragraphs = [],
  onClose,
  bgImage = "/assets/img/ftue/info.png",
  bottomPosition = false,
  transparentBg = false,
  customStyle = {},
  positionOffset = 0,
  customClassName = "",
  customPosition = false,
}) {
  return (
    <div
    className="bg-black/50"
      style={{
        position: "fixed",
        inset: 0,  
        zIndex: 90,
      }}
      onClick={onClose}
    >
      <div
        className={`flex flex-col text-white tracking-widest text-center ${customClassName}`}
        style={{
          backgroundImage: `url(${bgImage})`,
          backgroundSize: "100% 100%",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          padding: "2rem",
          position: "absolute",
          
          // Apply either custom positioning or default centered positioning
          ...(customPosition 
            ? {} // Empty object because customStyle will have all positioning values
            : {
                left: "50%",
                top: bottomPosition ? "auto" : "50%",
                bottom: bottomPosition ? `${positionOffset}px` : "auto",
                transform: `translateX(-50%) ${!bottomPosition ? "translateY(-50%)" : ""}`,
                 maxWidth: "3xl",
                width: "100%",
              }),
          
          ...customStyle,
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="text-lg text-white w-full mx-auto">
          {paragraphs.map((paragraph, index) => (
            <p key={index} className="mb-2">{paragraph}</p>
          ))}
        </div>
      </div>
    </div>
  );
}