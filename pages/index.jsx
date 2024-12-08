"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import { motion } from "framer-motion";
import "./pages.css";

export default function TitleScreen() {
  const router = useRouter();
  // Password
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
          router.push("/intro");
        })
        .catch((err) => {
          console.error("Error enabling full-screen mode:", err);
          router.push("/intro");
        });
    } else {
      console.warn("Fullscreen API is not supported");
      router.push("/intro");
    }
  };

  // Animation states
  const [backgroundVisible, setBackgroundVisible] = useState(false);
  const [logoVisible, setLogoVisible] = useState(false);
  const [buttonVisible, setButtonVisible] = useState(false);

  useEffect(() => {
    // Start the animation sequence
    const sequence = async () => {
      setBackgroundVisible(true);

      await new Promise((resolve) => setTimeout(resolve, 1500));
      setLogoVisible(true);

      await new Promise((resolve) => setTimeout(resolve, 1000));
      setButtonVisible(true);
    };

    sequence();
  }, []);

  return (
    <div className="title-screen">
      {/* Logo Section */}
      <motion.div
        className="flex flex-col justify-center relative z-10 logo-container"
        initial={{ y: -300, opacity: 0 }}
        animate={logoVisible ? { y: 0, opacity: 1 } : { y: -300, opacity: 0 }}
        transition={{ type: "spring", stiffness: 100, damping: 10 }}
      >
        <span className="text-white font-bold text-center text-xl text-nowrap mt-0.5">
          Turn on your sound
        </span>
        <Image
          src="/assets/img/start/LogoTail.png"
          width={250}
          height={200}
          alt="logo"
          className="w-60 h-auto "
        />
      </motion.div>
      {/* Background Banner */}
      <motion.div
        className="absolute bottom-0 left-0 w-full h-[40vh] bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url(/assets/img/start/Bpttpm%20bannerv.png)",
          backgroundPosition: "bottom center",
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: backgroundVisible ? 1 : 0 }}
        transition={{ duration: 1.5 }}
      />

      {/* Start Button */}
      <div className="start-button-container">
        <motion.div
          initial={{ x: "100vw", opacity: 0 }}
          animate={
            buttonVisible
              ? { x: 0, opacity: 1, scale: [1, 1.05, 1] }
              : { x: "100vw", opacity: 0 }
          }
          transition={{
            x: { type: "spring", stiffness: 100, damping: 10 },
            scale: {
              duration: 1,
              repeat: Infinity,
              repeatType: "loop",
              ease: "easeInOut",
            },
          }}
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
