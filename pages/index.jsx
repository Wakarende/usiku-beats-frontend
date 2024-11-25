"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import { motion, useAnimation } from "framer-motion";
import "./pages.css";

export default function TitleScreen() {
  const [isLoaded, setIsLoaded] = useState(false);
  const router = useRouter();

  //Password
  useEffect(() => {
    const isAuthenticated = localStorage.getItem("isAuthenticated");
    const checkAuth = () => {
      const auth = prompt("Please enter the password:", "");
      if (auth === "1234") {
        localStorage.setItem("isAuthenticated", "true");
      } else {
        alert("Incorrect password");
        checkAuth();
      }
    };
    if (!isAuthenticated) {
      checkAuth();
    }
  }, []);

  const handleStart = () => {
    if (document.documentElement.requestFullscreen) {
      document.documentElement
        .requestFullscreen()
        .then(() => {
          router.push("/hub"); // Navigate to the HubScreen
        })
        .catch((err) => {
          console.error("Error enabling full-screen mode:", err);
          router.push("/hub");
        });
    } else {
      console.warn("Fullscreen API is not supported");
      router.push("/hub");
    }
  };

  const logoVariants = {
    hidden: { y: -300 },
    visible: {
      y: 0,
      transition: { type: "spring", stiffness: 100, damping: 10 },
    },
  };

  //Start Button Animations
  const controls = useAnimation();

  useEffect(() => {
    async function sequence() {
      await controls.start("visible");
      controls.start("pulse");
    }
    sequence();
  }, [controls]);

  const startButtonVariants = {
    hidden: { x: "100vw", opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 100, damping: 10 },
    },
    pulse: {
      scale: [1, 1.05, 1],
      transition: {
        duration: 1,
        repeat: Infinity,
        repeatType: "loop",
        ease: "easeIn",
      },
    },
  };
  return (
    <div className="relative h-screen w-full overflow-hidden">
      <div className="flex justify-center relative z-1">
        <div className="slide-down absolute top-14">
          <Image
            src="/assets/img/start/LogoTail.png"
            width={250}
            height={200}
            alt="logo w-auto h-auto"
          />
        </div>
      </div>
      <div
        className="absolute bottom-0 left-0 w-full h-[40vh] bg-cover bg-center bg-no-repeat fade-in"
        style={{
          backgroundImage: "url(/assets/img/start/Bpttpm%20bannerv.png)",
          backgroundPosition: "bottom center",
        }}
      />
      <div className="absolute bottom-20 left-1/2 -translate-x-1/2 w-72">
        <motion.div
          // className="absolute bottom-20 left-1/2 -translate-x-1/2 w-72"
          variants={startButtonVariants}
          initial="hidden"
          animate={controls}
        >
          <Image
            src="/assets/img/start/start%20button.png"
            alt="Start"
            width={400}
            height={400}
            className="w-full transition-opacity h-auto"
            onClick={handleStart}
          />
        </motion.div>
      </div>
    </div>
  );
}
