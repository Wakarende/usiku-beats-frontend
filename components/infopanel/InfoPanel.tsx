import React from "react";
import Image from "next/image";

export default function InfoPanel({
  title = "How To Play?",
  paragraphs = [],
  onClose,
  bgImage = "./assets/img/ftue/Info_panel_blue.png",
  bottomPosition = false,
  transparentBg = false,
  customStyle = {},
  positionOffset = 0,
  customClassName = "",
  customPosition = false,
  allowClickThrough = false,
}) {
  const basePanelStyles = customPosition
    ? {}
    : {
        left: "50%",
        top: bottomPosition ? "auto" : "50%",
        bottom: bottomPosition ? `${positionOffset}px` : "auto",
        transform: `translateX(-50%) ${!bottomPosition ? "translateY(-50%)" : ""}`,
        maxWidth: "320px",
        width: "min(90vw, 320px)",
      };

  return (
    <div
      className={`${transparentBg ? "" : "bg-black/70"} info-panel-overlay`}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 60,
        pointerEvents: allowClickThrough ? "none" : "auto",
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
          ...basePanelStyles,
          ...customStyle,
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="text-lg xl:text-lg text-white w-full mx-auto">
          {paragraphs.map((paragraph, index) => (
            <p key={index} className="mb-2">
              {paragraph}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
}
