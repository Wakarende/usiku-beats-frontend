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
        zIndex: 9999,

      }}
    >
      <div
        className="flex flex-col absolute translate-y-[90%] left-[50%] transform translate-x-[-50%] w-full h-auto  p-4 text-white tracking-widest rounded-lg text-center"
        style={{
          backgroundImage: `url(${bgImage})`,
          backgroundSize: "contain",
          backgroundRepeat: "no-repeat",
          backgroundPosition:"center"
        }}
      >
        {/* <motion.div
          animate={{
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 1,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <h1
            className="text-5xl mb-3 tracking-widest text-[rgb(255,106,0)]  font-bold "
            style={{
              textShadow: "1.5px 1.5px 0px #faf05d",
              transform:
                "matrix(1.24224541509235, -0.00527636487041, 0.00527636487041, 1.24224541509236, 0, 0)",
            }}
          >
            {title}
          </h1>
        </motion.div> */}
        <div className="text-xl mb-2 text-yellow small:text-xs medium:w-full large:w-[80%] xl:w-[60%] xl:text-2xl mx-auto">
          {paragraphs.map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 3, duration: 1 }}
          className="mt-3"
          onClick={onClose}
        >
          <Image
            src="/assets/img/ftue/Close_button.png"
            width={250}
            height={100}
            alt="continue-btn"
          />
        </motion.button>
      </div>
    </div>
  );
}
