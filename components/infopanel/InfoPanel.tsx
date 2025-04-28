import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

export default function InfoPanel({
  title = "How To Play?",
  paragraphs = [],
  onClose,
  bgImage = "/assets/img/ftue/info.png",
  bottomPosition = false,
  transparentBg = false,
  customStyle = {}, 
  positionOffset = 0,
}) {
  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        backgroundColor: transparentBg ? "transparent" : "rgba(0,0,0,0.5)",
        zIndex: 90,
      }}
      onClick={onClose}
    >
       <div
        className={`flex flex-col absolute left-1/2 w-[100%] max-w-3xl transform -translate-x-1/2 
        ${bottomPosition ? "" : "-translate-y-1/2"} text-white tracking-widest text-center`}
        style={{
          backgroundImage: `url(${bgImage})`,
          backgroundSize: "100% 100%",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          padding: "2rem",
          top: bottomPosition ? "auto" : "50%",
          bottom: bottomPosition ? `${positionOffset}px` : "auto",
          ...customStyle,
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="text-xl text-white md:w-full lg:w-[80%] xl:w-[60%] xl:text-2xl mx-auto">
          {paragraphs.map((paragraph, index) => (
            <p key={index} className="mb-2">{paragraph}</p>
          ))}
        </div>
      </div>
    </div>
  );
}