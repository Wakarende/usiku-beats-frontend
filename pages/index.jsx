"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import { motion } from "framer-motion";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import InfoIcon from "@mui/icons-material/Info";
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
          <p className="text-sm text-nowrap">
            Turn on your sound and raise your volume!
          </p>
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
      <div className=" relative flex flex-col justify-between items-center h-[100vh] w-[100%] overflow-hidden">
        {/* Logo Section */}
        <motion.div
          className="flex flex-col justify-center relative z-10 medium:w-[15rem] medium:mt-[5vh] small:mt-[4vh] small:w-[11rem] large:w-[15rem] large:mt-[5vh]"
          initial={{ y: -300, opacity: 0 }}
          animate={logoVisible ? { y: 0, opacity: 1 } : { y: -300, opacity: 0 }}
          transition={{ type: "spring", stiffness: 100, damping: 10 }}
        >
          <Image
            src="/assets/img/start/LogoTail.png"
            width={250}
            height={200}
            alt="logo"
            className="medium:w-60 medium:h-auto large:w-80 large:h-auto"
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
        <div className="absolute  small:bottom-[10%] small:left-[50%] medium:bottom-[10%] medium:left-[50%] small:transform -translate-x-[50%] small:w-[60%] medium:transform -translate-x-[50%] medium:w-[60%] large:bottom-[12%] large:left-[50%] large:transform -translate-x-[50%] large:w-[60%]">
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
    </div>
  );
}
