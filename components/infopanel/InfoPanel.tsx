import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

export default function InfoPanel({
  title = "How To Play?",
  paragraphs = [],
  onClose,
  bgImage = "/assets/img/ftue/info.png",
  bottomPosition = false,
  transparentBg = false, // <-- add this
}) {
  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        backgroundColor: transparentBg ? "transparent" : "rgba(0,0,0,0.5)", // <-- this line
        zIndex: 90,
      }}
      onClick={onClose}
    >
      <div
        className={`flex flex-col absolute left-1/2 ${
          bottomPosition ? "bottom-0" : "top-1/2"
        } w-[100%] min-h-[300px] lg:min-h-[600px] max-w-3xl transform -translate-x-1/2 ${
          bottomPosition ? "" : "-translate-y-1/2"
        } text-white tracking-widest text-center py-4`}
        style={{
          backgroundImage: `url(${bgImage})`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="text-xl mb-2 text-white md:w-full lg:w-[80%] xl:w-[60%] xl:text-2xl mx-auto">
          {paragraphs.map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>
      </div>
    </div>
  );
}
