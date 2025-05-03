import React from "react";
import "./pages.css";
import Image from "next/image";
import { useAudio } from "../src/context/AudioProvider";
import { useRouter } from "next/router";
import { instance as axios } from "../services/axios.config";
import { BASE_URL } from "../services/config";
import useFTUEStore from "../stores/ftueStore";
// import { use } from "matter";
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

    // Check FTUE
    // const ftueStep = useFTUEStore.getState().currentStep;
    // const ftueCompleted = ftueStep.isCompleted;
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
      <div className="uppercase text-yellow text-7xl mt-10 text-center z-10 lg:text-9xl ">
        <h2>Turn Your</h2>
        <h2>sound on</h2>
      </div>
      <div className="flex justify-center">
        <div className="absolute bottom-56 lg:bottom-72 flex justify-center ">
          <Image
            src={"/assets/img/sound/headphone.png"}
            width={50}
            height={50}
            className="sm:w-3/4 md:w-11/12 lg:w-1/2 h-auto"
          />
        </div>
      </div>
      <div className="flex justify-center">
        <div className="text-center text-xl font-medium tracking-wider absolute bottom-36 lg:text-2xl lg:bottom-48">
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
          <svg
            width="713"
            height="187"
            viewBox="0 0 713 187"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-80 h-auto lg:w-8/12"
          >
            <path d="M0 0H713V187H0V0Z" fill="url(#pattern0_188_2)" />
            <path d="M181 33H532V125H181V33Z" fill="#1FA5B1" />
            <defs>
              <pattern
                id="pattern0_188_2"
                patternContentUnits="objectBoundingBox"
                width="1"
                height="1"
              >
                <use href="#image0_188_2" transform="scale(0.00140252 0.00534759)" />
              </pattern>
              <image
                id="image0_188_2"
                width="713"
                height="187"
                preserveAspectRatio="none"
                href="data:image/png;base64,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"
              />
            </defs>
          </svg>
          <span className="absolute inset-0 flex items-center justify-center z-10 text-white font-bold text-3xl uppercase tracking-widest lg:text-5xl">
            Yes, its on!
          </span>
        </button>
      </div>
    </div>
  );
};

export default Sound;
