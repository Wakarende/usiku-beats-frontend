"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useSelector, useDispatch } from "react-redux";
import { updateUser } from "../redux/main/authActions";
import { instance as axios } from "../services/axios.config";
import { BASE_URL } from "../services/config";
import { motion } from "framer-motion";
import useSound from "use-sound";
import useClickSound from "../hooks/useClickSound";
import { useAudio } from "../src/context/AudioProvider";
import "./pages.css";

export default function IntroPanel() {
  const router = useRouter();

  const auth = useSelector((state) => state.auth);
  const { user_data } = auth;
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);
  const { playBoom } = useAudio();

  // const [buttonSound] = useSound("/assets/sounds/ui/buttonSfx.mp3");

  useEffect(() => {
    const checkAnon = async () => {
      if (!user_data) {
        setLoading(true);
        try {
          // let response = await axios.get(
          //   `${BASE_URL}initial-song-list/?ids=147`
          // );
          let anonUserObject = {
            profile: {
              id: Math.floor(100000 + Math.random() * 900000).toString(),
              player: {
                level: 1,
                total_discs: 0,
                total_gems: 30,
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

  const handleOk = async () => {
    playBoom();
    // handleClickSound();
    //check if first time user
    const ftueCompleted = localStorage.getItem("ftueCompleted");

    if (!ftueCompleted || ftueCompleted === "false") {
      try {
        const response = await axios.get(`${BASE_URL}song-detail/148/`);
        const tutorialTrack = response.data;

        router.push({
          pathname: "/game",
          query: { track: JSON.stringify(tutorialTrack) },
        });
      } catch (err) {
        console.log("Error fetching tutorial track", err);
        router.push("/hub");
      }
    } else {
      router.push("/hub");
    }
  };

  const handleClickSound = useClickSound();

  return (
    <div className="intro-bg">
      <div className="intro-card flex flex-col justify-center items-center text-white mb-4">
        <div className="intro-logo flex justify-center">
          <Image
            src={"/assets/img/start/LogoTail.png"}
            width={130}
            height={130}
            alt="w-full"
          />
        </div>
        <div className="flex flex-col justify-center items-center mb-3 px-2 mt-1 tracking-widest text-center small: text-xs small:w-[75vw] medium:text-sm medium: w-[75vw] large:text-xl large:w-[80vw] xl:text-2xl xl:w-[80vw]">
          <p className=" mb-4 font-bold medium:text-xl large:text-2xl large:mt-4 text-nowrap">
            Feel the Beat of Africa!
          </p>
          <div className="mb-4">
            <p className="font-extralight">
              Welcome to <span className="font-bold">Usiku Beats</span> - the
              rhythm game that brings Africa's music to life!
            </p>
            <p>Tap, swipe, and groove to the continent's best sounds.</p>
          </div>
          <p className="mb-2">
            This is just the beginning! Usiku Beats is in early access, with new
            music and features coming soon.
          </p>
          <p className="font-bold mt-4">Ready to move to the rhythm?</p>
        </div>
      </div>
      <motion.div
        className="w-full justify-center flex"
        animate={{
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          repeatType: "loop",
          ease: "easeInOut",
        }}
      >
        <button
          onClick={handleOk}
          disabled={loading}
          className="relative text-white font-bold text-2xl uppercase tracking-wider small:w-[250px] small:h-[50px]  medium:w-[300px] medium:h-[50px] large:w-[300px] large:h-[50px] large:mt-4 xl:h-[50px] xl:w-[500px]"
        >
          <Image
            src={"/assets/img/hub/Button blank.png"}
            alt="button-bg"
            fill
            className="object-contain pointer-events-none "
          />
          <span className="absolute inset-0 flex items-center justify-center z-10">
            Let&apos;s Play!
          </span>
        </button>
      </motion.div>
    </div>
  );
}
