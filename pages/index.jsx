"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import { motion } from "framer-motion";
import "react-toastify/dist/ReactToastify.css";
import useClickSound from "../hooks/useClickSound";
import { useSelector, useDispatch } from "react-redux";
import { updateUser } from "../redux/main/authActions";
import { instance as axios } from "../services/axios.config";
import { BASE_URL } from "../services/config";
import { useAudio } from "../src/context/AudioProvider";

import "./pages.css";

export default function TitleScreen() {
  const handleClickSound = useClickSound();
  const router = useRouter();
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const { user_data } = auth;

  const { playBoom } = useAudio();
  const [loading, setLoading] = useState(false);
  const currentVersion = "0.2.3"; // Match the version displayed in the UI

  // Version check
  // Version check
  useEffect(() => {
    const checkVersion = async () => {
      try {
        const response = await axios.get(`${BASE_URL}version/`);
        const serverVersion = response.data.version;
        const localVersion = localStorage.getItem("gameVersion");

        if (localVersion !== serverVersion) {
          console.log("new version detected. reloading");

          // Store new version
          localStorage.setItem("gameVersion", serverVersion);

          // Clear cache if supported
          if (window.caches) {
            const cacheNames = await window.caches.keys();
            await Promise.all(cacheNames.map((cacheName) => window.caches.delete(cacheName)));
          }

          // Force reload of the page without clearing localStorage
          window.location.reload(true);
        }
      } catch (error) {
        console.error("Version check failed:", error);
        // Game continues with current version if check fails
      }
    };

    checkVersion();
  }, []);

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

  //Intro.jsx Anonymous user setup
  useEffect(() => {
    const checkAnon = async () => {
      if (!user_data) {
        setLoading(true);
        try {
          const anonUserObject = {
            profile: {
              id: Math.floor(100000 + Math.random() * 900000).toString(),
              player: {
                level: 1,
                total_discs: 0,
                total_gems: 100,
                total_stars: 0,
                player_song_instances: [],
                data: null,
              },
            },
          };
          dispatch(updateUser(anonUserObject));
        } catch (error) {
          console.log("Error creating anon user:", error);
        } finally {
          setLoading(false);
        }
      }
    };
    checkAnon();
  }, [user_data, dispatch]);

  // Combined intro and index logic
  const handleStart = async () => {
    handleClickSound();
    router.push("/sound");
    try {
      if (document.documentElement.requestFullscreen) {
        await document.documentElement.requestFullscreen();
      } else {
        console.warn("Fullscreen API is not supported");
      }
    } catch (err) {
      console.error("Error enabling full-screen mode:", err);
    }
  };
  // const handleStart = async () => {
  //   handleClickSound();
  //   playBoom();

  //   try {
  //     if (document.documentElement.requestFullscreen) {
  //       await document.documentElement.requestFullscreen();
  //     } else {
  //       console.warn("Fullscreen API is not supported");
  //     }
  //   } catch (err) {
  //     console.error("Error enabling full-screen mode:", err);
  //   }

  //   // Check FTUE
  //   const ftueCompleted = localStorage.getItem("ftueCompleted");
  //   if (!ftueCompleted || ftueCompleted === "false") {
  //     try {
  //       const response = await axios.get(`${BASE_URL}song-detail/148/`);
  //       const tutorialTrack = response.data;

  //       localStorage.setItem("currentTrackData", JSON.stringify(tutorialTrack));
  //       router.push("/game");
  //     } catch (err) {
  //       console.log("Error fetching tutorial track", err);
  //       router.push("/hub");
  //     }
  //   } else {
  //     router.push("/hub");
  //   }
  // };

  // Animation states
  const [backgroundVisible, setBackgroundVisible] = useState(false);
  const [logoVisible, setLogoVisible] = useState(false);
  const [buttonVisible, setButtonVisible] = useState(false);

  useEffect(() => {
    // Start the animation sequence
    const sequence = async () => {
      setBackgroundVisible(true);

      await new Promise((resolve) => setTimeout(resolve, 100));
      setLogoVisible(true);

      await new Promise((resolve) => setTimeout(resolve, 300));
      setButtonVisible(true);
    };

    sequence();
  }, []);

  return (
    <div className="fixed inset-0 overflow-hidden ">
      <div className="flex justify-end px-2 py-1">
        <p className="text-white leading-wide small:text-[10px] medium:text-sm">
          Version: {currentVersion}
        </p>
      </div>
      <div className="relative flex flex-col justify-between items-center h-full w-full overflow-hidden">
        {/* Logo Section */}
        <motion.div
          className="flex flex-col justify-center relative z-10 md:w-[15rem] sm:w-[11rem] lg:w-[16rem] xl:w-[20rem] "
          initial={{ y: -300, opacity: 0 }}
          animate={logoVisible ? { y: 0, opacity: 1 } : { y: -300, opacity: 0 }}
          transition={{ type: "spring", stiffness: 100, damping: 10 }}
        >
          <Image
            src="/assets/img/start/logo.png"
            width={1}
            height={1}
            alt="logo"
            className="w-[15rem]"
            priority={true}
          />
        </motion.div>
        {/* Background Banner */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: backgroundVisible ? 1 : 0 }}
          transition={{ duration: 0.8 }}
          className="absolute inset-x-0 bottom-0 w-full aspect-[6/5] overflow-hidden"
        >
          <Image
            src="/assets/img/start/bottom-banner.png"
            alt="bottom-banner"
            fill
            className="object-cover object-center"
            sizes="100vw"
            priority={true}
          />
        </motion.div>
        {/* Start Button */}
        <div className="absolute left-1/2 sm:bottom-20 md:bottom-20 w-3/5 max-w-xs transform -translate-x-1/2 lg:bottom-[10rem] xl:bottom-[12rem] z-10">
          <motion.div
            onClick={handleStart}
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
              src={"/assets/img/hub/Button blank.png"}
              width={1}
              height={1}
              alt="play-btn"
              className="w-full"
              priority={true}
            />
            <span className="absolute inset-0 flex items-center justify-center z-10 text-white font-bold text-3xl uppercase tracking-widest">
              Play
            </span>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
