"use client";
import React, { useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/router";

export default function TitleScreen() {
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

  return (
    <div className="relative h-screen w-full overflow-hidden">
      <div>
        <div>
          <Image
            src="/assets/img/start/Group 5.png"
            width={100}
            height={100}
            alt="logo"
          />
        </div>
      </div>
      <div
        className="absolute bottom-0 left-0 w-full h-[40vh] bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url(/assets/img/start/Bpttpm%20bannerv.png)",
          backgroundPosition: "bottom center",
        }}
      />
      <div className="absolute bottom-20 left-1/2 -translate-x-1/2 w-64 ">
        <Image
          src="/assets/img/start/start%20button.png"
          alt="Start"
          width={400}
          height={400}
          className="w-full transition-opacity"
          onClick={handleStart}
        />
      </div>
    </div>
  );
}
