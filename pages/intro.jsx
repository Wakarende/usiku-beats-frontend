"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useSelector, useDispatch } from "react-redux";
import { updateUser } from "../redux/main/authActions";
import { instance as axios } from "../services/axios.config";
import { BASE_URL } from "../services/config";
import { motion } from "framer-motion";
import "./pages.css";

export default function IntroPanel() {
  const router = useRouter();

  const auth = useSelector((state) => state.auth);
  const { user_data } = auth;
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const checkAnon = async () => {
      if (!user_data) {
        setLoading(true);
        try {
          let response = await axios.get(
            `${BASE_URL}initial-song-list/?ids=147`
          );
          let anonUserObject = {
            profile: {
              id: Math.floor(100000 + Math.random() * 900000).toString(),
              player: {
                level: 1,
                total_discs: 0,
                total_gems: 30,
                total_stars: 0,
                player_song_instances: response.data,
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

  return (
    <div className="intro-bg">
      <div className="intro-card flex flex-col justify-center items-center">
        <h1 className="flex justify-center text-5xl large:text-7xl xl:text-9xl uppercase intro-header tracking-wider text-balance">
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
        <div className="intro-text flex flex-col justify-center items-center mb-3 px-2 mt-1 tracking-wide text-center large:text-xl large:w-2/3 ">
          <p className="text-yellow mb-2 uppercase font-bold text-xl large:text-2xl large:mt-4">
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
          className="intro-btn bg-center bg-contain bg-no-repeat text-white font-bold text-2xl uppercase tracking-wider flex items-center justify-center large:mt-4 "
        >
          <p className="relative flex justify-center"> Ok</p>
        </button>
      </motion.div>
    </div>
  );
}
