"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import { motion } from "framer-motion";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import InfoIcon from "@mui/icons-material/Info";
import useSound from "use-sound";
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
  const currentVersion = "0.2.2"; // Match the version displayed in the UI

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

  // const handleStart = () => {
  //   if (document.documentElement.requestFullscreen) {
  //     document.documentElement
  //       .requestFullscreen()
  //       .then(() => {
  //         router.push("/intro");
  //       })
  //       .catch((err) => {
  //         console.error("Error enabling full-screen mode:", err);
  //         router.push("/intro");
  //       });
  //   } else {
  //     console.warn("Fullscreen API is not supported");
  //     router.push("/intro");
  //   }
  //   handleClickSound();
  // };

  // Combined intro and index logic
  const handleStart = async () => {
    handleClickSound();
    playBoom();

    try {
      if (document.documentElement.requestFullscreen) {
        await document.documentElement.requestFullscreen();
      } else {
        console.warn("Fullscreen API is not supported");
      }
    } catch (err) {
      console.error("Error enabling full-screen mode:", err);
    }

    // Check FTUE
    const ftueCompleted = localStorage.getItem("ftueCompleted");
    if (!ftueCompleted || ftueCompleted === "false") {
      try {
        const response = await axios.get(`${BASE_URL}song-detail/148/`);
        const tutorialTrack = response.data;

        localStorage.setItem("currentTrackData", JSON.stringify(tutorialTrack));
        router.push("/game");
      } catch (err) {
        console.log("Error fetching tutorial track", err);
        router.push("/hub");
      }
    } else {
      router.push("/hub");
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

  useEffect(() => {
    if (buttonVisible) {
      toast(
        <div>
          <div className="flex items-center">
            <InfoIcon className="mr-1" />
            <span>
              <strong>Remember:</strong>
            </span>
          </div>
          <p className="text-sm text-nowrap">Turn on your sound and raise your volume!</p>
        </div>,
        {
          position: "top-left",
          autoClose: false,
          closeOnClick: false,
          draggable: false,
          className: "toast-message",
        }
      );
    }
  }, [buttonVisible]);

  return (
    <div>
      <ToastContainer />
      <div className="flex justify-end px-2 py-1">
        <p className="text-white leading-wide small:text-[10px] medium:text-sm">
          Version: {currentVersion}
        </p>
      </div>
      <div className=" relative flex flex-col justify-between items-center h-[100vh] w-[100%] overflow-hidden">
        {/* Logo Section */}
        <motion.div
          className="flex flex-col justify-center relative z-10 medium:w-[15rem] medium:mt-[5vh] small:mt-[4vh] small:w-[11rem] large:w-[15rem] large:mt-[5vh] xl:w-[20rem] xl:mt-[5vh]"
          initial={{ y: -300, opacity: 0 }}
          animate={logoVisible ? { y: 0, opacity: 1 } : { y: -300, opacity: 0 }}
          transition={{ type: "spring", stiffness: 100, damping: 10 }}
        >
          <Image
            src="/assets/img/start/LogoTail.png"
            width={250}
            height={200}
            alt="logo"
            className="medium:w-60 medium:h-auto large:w-80 large:h-auto xl:w-96 xl:h-auto"
          />
        </motion.div>
        {/* Background Banner */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: backgroundVisible ? 1 : 0 }}
          transition={{ duration: 1.5 }}
        >
          <Image
            src={"/assets/img/start/Bpttpm%20bannerv.png"}
            alt="bottom-banner"
            width={1000}
            height={400}
            className="medium:w-full medium:h-[40vh] bg-cover bg-center bg-no-repeat absolute bottom-0 left-0"
          />
        </motion.div>
        {/* Start Button */}
        <div className="absolute  small:bottom-[10%] small:left-[50%] medium:bottom-[11%] medium:left-[50%] small:transform -translate-x-[50%] small:w-[60%] medium:transform medium:w-[60%] large:bottom-[12%] large:left-[50%] large:transform large:w-[60%] xl:bottom-[12%] xl:left-[50%] xl:transform xl:w-[60%]">
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
              alt="button-bg"
              width={400}
              height={400}
              className=" w-full h-auto pointer-events-none "
              onClick={handleStart}
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
