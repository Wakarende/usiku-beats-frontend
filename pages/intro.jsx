"use client";
import Image from "next/image";
import { useRouter } from "next/router";
import { motion } from "framer-motion";
import "./pages.css";

export default function IntroPanel() {
  const router = useRouter();

  const handleOk = () => {
    router.push("/hub");
  };

  return (
    <div className="intro-bg flex flex-col justify-center items-center">
      <h1 className="flex justify-center text-7xl uppercase intro-header tracking-wider">
        Welcome to
      </h1>
      <div className="intro-logo">
        <Image
          src={"/assets/img/start/LogoTail.png"}
          width={150}
          height={150}
          alt="logo"
          className="z-10"
        />
      </div>
      <div className="intro-text flex flex-col justify-center items-center mb-3 w-72 mt-1 tracking-wide">
        <p className="text-yellow-300 mb-3">Demo Version 0.3</p>
        <p className="text-yellow-300 mb-3">
          This is a fully featured playable demo of the game
        </p>
        <p className="text-yellow-300 mb-3">
          When you reach the next screen, just tap 'PLAY NOW' under your songs
          to get started
        </p>
        <p className="text-yellow-300 mb-1">
          Play that song well enough, and you'll be able to add more songs to
          your collection
        </p>
      </div>
      <div className="w-80 justify-center flex items-center">
        <button
          onClick={handleOk}
          className="intro-btn bg-contain bg-no-repeat flex items-center justify-center text-white font-bold text-2xl uppercase pt-3 pb-3 tracking-wider"
        >
          Ok!
        </button>
      </div>
    </div>
  );
}
