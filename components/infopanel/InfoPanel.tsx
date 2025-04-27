import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
export default function InfoPanel({
  title = "How To Play?",
  paragraphs = [],
  onClose,
  bgImage = "/assets/img/ftue/info.png",
}) {
  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        backgroundColor: "rgba(0,0,0,0.5)",
        zIndex: 90,

      }}
    >
    <div
      className="flex flex-col absolute left-1/2 top-1/2 w-[100%] min-h-[300px] lg:min-h-[600px] max-w-3xl transform -translate-x-1/2 -translate-y-1/2 text-white tracking-widest text-center py-4"
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        // minHeight: "300px",
        
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
