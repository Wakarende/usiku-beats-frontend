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
    <div className="intro-bg">
      <div className="intro-card flex flex-col justify-center items-center">
        <h1 className="flex justify-center text-5xl lg:text-7xl uppercase intro-header tracking-wider">
          Welcome to
        </h1>
        <div className="intro-logo flex justify-center">
          <Image
            src={"/assets/img/start/LogoTail.png"}
            width={130}
            height={130}
            alt="w-full"
          />
        </div>
        <div className="intro-text flex flex-col justify-center items-center mb-3 px-2 mt-1 tracking-wide text-center ">
          <p className="text-yellow mb-2 uppercase font-bold text-xl">
            Demo Version 0.3
          </p>
          <p className="text-yellow mb-2">
            This is a fully featured playable demo of the game.
          </p>
          <p className="text-yellow mb-2">
            When you reach the next screen, just tap{" "}
            <span className="font-bold">'PLAY NOW'</span> under your songs to
            get started.
          </p>
          <p className="text-yellow mb-1">
            Play that song well enough, and you'll be able to add more songs to
            your collection.
          </p>
        </div>
      </div>
      <button
        onClick={handleOk}
        className="intro-btn bg-center bg-contain bg-no-repeat text-white font-bold text-2xl uppercase tracking-wider flex items-center justify-center "
      >
        <p className="relative flex justify-center"> Ok</p>
      </button>
    </div>
  );
}
