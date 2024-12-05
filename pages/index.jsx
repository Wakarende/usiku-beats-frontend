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
      if (auth === "4321") {
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
    <div className="fixed inset-0 h-full w-full overflow-hidden flex flex-col justify-between items-center">
      {/* Logo Section */}
      <motion.div
        className="flex justify-center relative z-10"
        initial={{ y: -300, opacity: 0 }}
        animate={logoVisible ? { y: 0, opacity: 1 } : { y: -300, opacity: 0 }}
        transition={{ type: "spring", stiffness: 100, damping: 10 }}
      >
        <div className="">
          <Image
            src="/assets/img/start/LogoTail.png"
            width={250}
            height={200}
            alt="logo"
            className="w-60 h-auto "
          />
        </div>
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
      <div className="absolute bottom-16 md:bottom-20 left-1/2 -translate-x-1/2 w-72">
        <motion.div
          initial={{ x: "100vw", opacity: 0 }}
          animate={
            buttonVisible ? { x: 0, opacity: 1, scale: [1, 1.05, 1] } : { x: "100vw", opacity: 0 }
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
            className="w-full transition-opacity h-auto cursor-pointer"
            onClick={handleStart}
          />
        </motion.div>
      </div>
    </div>
  );
}
