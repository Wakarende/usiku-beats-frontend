import React from "react";
import "./pages.css";
import Image from "next/image";
import { useAudio } from "../src/context/AudioProvider";
import { useRouter } from "next/router";
import { instance as axios } from "../services/axios.config";
import { BASE_URL } from "../services/config";
import useFTUEStore from "../stores/ftueStore";

const Sound = () => {
  const { playBoom } = useAudio();
  const router = useRouter();
  const stars = [
    {
      className: "absolute md:top-72 md:right-72 sm:top-1/3 sm:left-20 lg:top-96 lg:left-32 z-10 ",
      width: 22,
      height: 22,
      animation: "animate-pulse",
    },
    //Left star
    {
      className:
        "absolute md:bottom-1/2 md:left-36 sm:top-72 sm:left-36 lg:bottom-96 lg:left-80 z-0",
      width: 10,
      height: 10,
      animation: "animate-pulse",
    },
    //Right star
    {
      className:
        "absolute md:bottom-80 md:right-44 sm:bottom-80 sm:right-40 lg:bottom-96 lg:right-80 z-0",
      width: 30,
      height: 30,
      animation: "animate-pulse",
    },
  ];

  const { isCompleted } = useFTUEStore();

  const handleFtue = async () => {
    playBoom();

    if (!isCompleted) {
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
  return (
    <div className="sound-page flex flex-col justify-center">
      {stars.map((star, index) => (
        <div key={index} className={`${star.className} ${star.animation}`}>
          <Image
            src="/assets/img/sound/star.png"
            width={star.width}
            height={star.height}
            alt="Star"
          />
        </div>
      ))}
      <div className="uppercase text-yellow text-7xl mt-10 text-center z-10 lg:text-9xl xl:text-9xl">
        <h2>Turn Your</h2>
        <h2>sound on</h2>
      </div>
      <div className="flex justify-center">
        <div className="absolute bottom-56 lg:bottom-72 xl:bottom-72 flex justify-center ">
          <Image
            src={"/assets/img/sound/headphone.png"}
            width={50}
            height={50}
            className="sm:w-3/4 md:w-11/12 lg:w-1/2 xl:w-1/2 h-auto"
          />
        </div>
      </div>
      <div className="flex justify-center">
        <div className="text-center text-xl font-medium tracking-wider absolute bottom-36 lg:text-2xl lg:bottom-48  xl:text-2xl xl:bottom-48">
          <p className="text-[#cab05a]">This is a music game!</p>
          <p className="text-[#cab05a]">You need your sound on</p>
          <p className="text-[#cab05a]">to hear the beats.</p>
        </div>
      </div>
      <div className="flex justify-center">
        <button
          onClick={handleFtue}
          className="flex justify-center items-center absolute bottom-10"
        >
          <Image
            src={"/assets/img/hub/Button blank.png"}
            alt="sound-btn"
            width={1}
            height={1}
            className="w-full px-5"
          />
          <span className="absolute inset-0 flex items-center justify-center z-10 text-white font-bold text-3xl uppercase tracking-widest lg:text-5xl xl:text-6xl">
            Yes, its on!
          </span>
        </button>
      </div>
    </div>
  );
};

export default Sound;
