import React ,{useState, useEffect} from "react";
import "./pages.css";
import Image from "next/image";
import { useAudio } from "../src/context/AudioProvider";
import { useRouter } from "next/router";
import { instance as axios } from "../services/axios.config";
import { BASE_URL } from "../services/config";
import useFTUEStore from "../stores/ftueStore";
import DesktopViewport from "../components/viewport/DesktopViewport";

const Sound = () => {
  const { playBoom } = useAudio();
  const router = useRouter();
  

  const stars = [
    //Left top star
    {
      className:
        "absolute md:top-72 md:right-72 xl:top-72 xl:right-72 sm:top-1/3 sm:left-20 z-10",
      width: 22,
      height: 22,
      animation: "animate-pulse",
    },
    //Left bottom star
    {
      className:
        "absolute md:bottom-1/2 md:left-44 xl:bottom-1/2 xl:left-36 sm:top-72 sm:left-40 z-0",
      width: 12,
      height: 12,
      animation: "animate-pulse",
    },
    //Right star
    {
      className:
        "absolute md:bottom-80 md:right-44 xl:bottom-80 xl:right-44 sm:bottom-80 sm:right-40 z-0",
      width: 30,
      height: 30,
      animation: "animate-pulse",
    },
  ];

  const { isCompleted } = useFTUEStore();
  
   const handlePlayBoom = () => {
      playBoom();
  };

  const handleFtue = async () => {
    handlePlayBoom();

    if (!isCompleted) {
      try {
        const response = await axios.get(`${BASE_URL}song-detail/148/`);
        const tutorialTrack = response.data;

        localStorage.setItem("currentTrackData", JSON.stringify(tutorialTrack));
        // handleNavigation('/game');
        router.push('/game');
      } catch (err) {
        console.log("Error fetching tutorial track", err);
        // handleNavigation("/hub");
        router.push('/hub');
      }
    } else {
      router.push("/hub");
    }
  };

  return (
    <DesktopViewport>
      <div className="sound-page flex flex-col justify-center">
        {stars.map((star, index) => (
          <div key={index} className={`${star.className} ${star.animation}`}>
            <Image
              src="./assets/img/sound/star.png"
              width={star.width}
              height={star.height}
              alt="Star"
              priority={true}
            />
          </div>
        ))}
        <div className="uppercase text-yellow text-7xl mt-10 text-center z-10 bg-black p-2">
          <h2 className="tracking-widest">Sound on!</h2>
        </div>
        <div className="flex justify-center">
          <div className="absolute bottom-56 flex justify-center sm:left-[2rem]">
            <Image
              src={"./assets/img/sound/headphone.png"}
              width={50}
              height={50}
              alt="headphone-img"
              className="w-11/12 sm:w-5/6 h-auto"
              priority={true}
            />
          </div>
        </div>
        <div className="text-center text-xl font-medium tracking-wider absolute bottom-36 flex flex-col">
          <p className="text-[#cab05a]">This is a music game!</p>
          <p className="text-[#cab05a]">Turn on your sound to hear the beats.</p>
        </div>
        <div className="flex justify-center">
          <button
            onClick={handleFtue}
            className="flex justify-center items-center absolute bottom-10"
          >
            <Image
              src={"./assets/img/hub/button_blank.png"}
              alt="sound-btn"
              width={1}
              height={1}
              className="w-full px-5"
              priority={true}
            />
            <span className="absolute  sm:right-[5rem] right-[4.5rem] lg:right-[4.5rem] xl:right-[4.5rem] flex items-center justify-center z-10 text-white font-bold text-3xl sm:text-2xl uppercase tracking-widest text-center">
              Yes, its on!
            </span>
          </button>
        </div>
      </div>
    </DesktopViewport>
  );
};

export default Sound;
