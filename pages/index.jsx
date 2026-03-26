"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import "react-toastify/dist/ReactToastify.css";
import useClickSound from "../hooks/useClickSound";
import { useSelector, useDispatch } from "react-redux";
import { updateUser, googleSignIn } from "../redux/main/authActions";
import { useGoogleLogin } from "@react-oauth/google";
import { instance as axios } from "../services/axios.config";
import { BASE_URL } from "../services/config";
import { getInitialGems } from "../services/gameSettings.service";
import { useAudio } from "../src/context/AudioProvider";
import DesktopViewport from "../components/viewport/DesktopViewport";

import "./pages.css";

export default function TitleScreen() {
  const handleClickSound = useClickSound();
  const router = useRouter();
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const { user_data, isAuthenticated } = auth;
  const player = user_data?.profile?.player;
  const hasProgress =
    (player?.level || 1) > 1 ||
    (player?.total_stars || 0) > 0 ||
    (player?.player_song_instances?.length || 0) > 0;
  const hideGuestOption = isAuthenticated && hasProgress;

  const { playBoom } = useAudio();
  const [loading, setLoading] = useState(false);
  
  const currentVersion = "0.3.2"; // Match the version displayed in the UI


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
  //Intro.jsx Anonymous user setup
  useEffect(() => {
    const checkAnon = async () => {
      if (!user_data) {
        setLoading(true);
        try {
          const initialGems = await getInitialGems();
          const anonUserObject = {
            profile: {
              id: Math.floor(100000 + Math.random() * 900000).toString(),
              player: {
                level: 1,
                total_discs: 0,
                total_gems: initialGems,
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

  const googleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      const response = await dispatch(googleSignIn(tokenResponse.access_token));
      if (response?.success) {
        handleStart();
      }
    },
    onError: (error) => console.error("Google login error:", error),
  });

  const handleLogIn = () => {
    handleClickSound();
    if (isAuthenticated) {
      handleStart();
    } else {
      googleLogin();
    }
  };

  // Combined intro and index logic
  const handleStart = async () => {
    handleClickSound();
    router.push("/sound");
    try {
      if (document.documentElement.requestFullscreen) {
        await document.documentElement.requestFullscreen();
      } else {
        console.warn("Fullscreen API is not supported");
      }
    } catch (err) {
      console.error("Error enabling full-screen mode:", err);
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

      await new Promise((resolve) => setTimeout(resolve, 100));
      setLogoVisible(true);

      await new Promise((resolve) => setTimeout(resolve, 300));
      setButtonVisible(true);
    };

    sequence();
  }, []);

  return (
    <DesktopViewport>
      <div className="desktop-only-scroll relative min-h-screen">
      <div className="flex justify-end px-2 py-1">
        <p className="text-white leading-wide sm:text-[10px] md:text-sm xl:text-sm">
          Version: {currentVersion}
        </p>
      </div>
      <div className="relative flex flex-col justify-between items-center min-h-screen w-full overflow-hidden">
        {/* Logo Section */}
        <motion.div
          className="flex flex-col justify-center relative z-10"
          initial={{ y: -300, opacity: 0 }}
          animate={logoVisible ? { y: 0, opacity: 1 } : { y: -300, opacity: 0 }}
          transition={{ type: "spring", stiffness: 100, damping: 10 }}
        >
          <Image
            src="./assets/img/start/logo_beta.png"
            width={1}
            height={1}
            alt="logo"
            className="w-[16rem] sm:w-[12rem]"
            priority={true}
          />
        </motion.div>
        {/* Background Banner */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: backgroundVisible ? 1 : 0 }}
          transition={{ duration: 0.8 }}
          className="absolute inset-x-0 bottom-10 w-full aspect-[6/5] overflow-hidden"
        >
          <Image
            src="./assets/img/start/bottom-banner.png"
            alt="bottom-banner"
            fill
            className="object-cover object-center"
            sizes="100vw"
            priority={true}
          />
        </motion.div>
        {/* Log In + Guest buttons (shared wrapper) */}
        {(!isAuthenticated || !hideGuestOption) && (
          <div
            className="inset-x-2 bottom-20 z-10 index-auth-guest-wrapper"
            style={{ position: "absolute", display: "flex", justifyContent: "center", padding: 0 }}
          >
            <motion.div
              className="mx-auto flex w-[52%] max-w-xs flex-col items-center gap-3"
              initial={{ x: "100vw", opacity: 0 }}
              animate={buttonVisible ? { x: 0, opacity: 1 } : { x: "100vw", opacity: 0 }}
              transition={{ type: "spring", stiffness: 100, damping: 10 }}
            >
              {!isAuthenticated && (
                <button
                  onClick={handleLogIn}
                  className="relative flex items-center justify-center w-full index-login-btn"
                >
                  <Image
                    src={"/assets/img/header/blank_btn.png"}
                    width={240}
                    height={60}
                    alt="log-in-btn"
                    className="w-full h-auto"
                    priority={true}
                  />
                  <span className="absolute text-white font-extrabold uppercase tracking-widest text-xl text-nowrap">
                    Log In
                  </span>
                </button>
              )}
              {!hideGuestOption && (
                <button
                  onClick={() => {
                    handleStart();
                    handleClickSound();
                  }}
                  className="relative flex items-center justify-center w-full index-guest-btn"
                >
                  <Image
                    src={"/assets/img/header/blank_btn.png"}
                    width={240}
                    height={60}
                    alt="guest-btn"
                    className="w-full h-auto"
                    priority={true}
                  />
                  <span className="absolute text-white font-extrabold uppercase tracking-widest text-xl text-nowrap">
                    Play as Guest
                  </span>
                </button>
              )}
            </motion.div>
          </div>
        )}

        {/* Continue button (independent wrapper) */}
        {isAuthenticated && (
          <div
            className={`inset-x-2 z-10 index-continue-wrapper ${hideGuestOption ? "bottom-28" : "bottom-40"}`}
            style={{ position: "absolute", display: "flex", justifyContent: "center", padding: 0 }}
          >
            <motion.div
              className="mx-auto flex w-[52%] max-w-xs flex-col items-center"
              initial={{ x: "100vw", opacity: 0 }}
              animate={buttonVisible ? { x: 0, opacity: 1 } : { x: "100vw", opacity: 0 }}
              transition={{ type: "spring", stiffness: 100, damping: 10 }}
            >
              <button
                onClick={handleStart}
                className="relative flex items-center justify-center w-full index-continue-btn"
              >
                <Image
                  src={"/assets/img/header/blank_btn.png"}
                  width={240}
                  height={60}
                  alt="continue-btn"
                  className="w-full h-auto"
                  priority={true}
                />
                <span className="absolute text-white font-extrabold uppercase tracking-widest text-xl text-nowrap">
                  Continue
                </span>
              </button>
            </motion.div>
          </div>
        )}
      </div>
      {/* Content Sections */}
      <div className="relative z-20 -mt-6">
        {/* About The Game Section */}
        <section className="landing-section py-16 px-6 md:px-12 lg:px-24">
          <div className="max-w-6xl mx-auto">
            <h2 className="landing-section-title text-4xl md:text-5xl mb-8 text-white text-center">
              ABOUT THE GAME
            </h2>
            <div className="landing-section-content text-white text-center max-w-3xl mx-auto">
              <p className="text-xl mb-4">
                Usiku Beats is a rhythm-based mobile game where you tap, swipe, and hold notes to
                real African music. Every beat, sound, and visual is designed to immerse you in the
                vibrant energy of the continent's soundscape.
              </p>
              <p className="text-lg font-semibold">
                Play, listen, and move to the rhythm of Africa — wherever you are.
              </p>
            </div>
          </div>
        </section>

        {/* Core Features Section */}
        <section className="landing-section py-16 px-6 md:px-12 lg:px-24">
          <div className="max-w-6xl mx-auto">
            <h2 className="landing-section-title text-4xl md:text-5xl mb-12 text-white text-center">
              CORE FEATURES
            </h2>
            <div className="features-grid">
              <div className="feature-card">
                <h3 className="feature-title">Real African Music</h3>
                <p className="feature-description">
                  Play to the beat of licensed tracks from talented African artists across genres
                  like Afrobeats, Amapiano, Bongo Flava, and Gengetone.
                </p>
              </div>
              <div className="feature-card">
                <h3 className="feature-title">Easy to Play, Hard to Master</h3>
                <p className="feature-description">
                  Simple tap-based gameplay that challenges your timing, precision, and rhythm.
                </p>
              </div>
              <div className="feature-card">
                <h3 className="feature-title">Cultural Vibes</h3>
                <p className="feature-description">
                  Beautiful African-inspired visuals and animations that change with each track.
                </p>
              </div>
              <div className="feature-card">
                <h3 className="feature-title">Leaderboards & Challenges</h3>
                <p className="feature-description">
                  Compete with friends, earn points, and climb the ranks to prove your rhythm
                  mastery.
                </p>
              </div>
              <div className="feature-card">
                <h3 className="feature-title">Unlock New Tracks</h3>
                <p className="feature-description">
                  Progress through levels and unlock more songs, visuals, and challenges as you
                  play.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Meet The Artists Section */}
        <section className="landing-section py-16 px-6 md:px-12 lg:px-24">
          <div className="max-w-6xl mx-auto">
            <h2 className="landing-section-title text-4xl md:text-5xl mb-4 text-white text-center">
              MEET THE ARTISTS
            </h2>
            <p className="text-white text-center text-xl mb-12">Celebrate Africa's creativity.</p>
            <p className="text-white text-center mb-12 landing-section-content">
              Usiku Beats features African musicians whose tracks give life to the game.
            </p>
            <div className="artists-grid">
              <div className="artist-card">
                <h3 className="artist-name">Mashu Blaq</h3>
                <p className="artist-description">
                  Mashu Blaq represents every red blooded, rugby loving, bok super fan
                </p>
              </div>
              <div className="artist-card">
                <h3 className="artist-name">Anna Piano</h3>
                <p className="artist-description">
                  With flavors of Tyla, Kamo Mphela, Anna Piano was created to push the amapiano
                  genre
                </p>
              </div>
              <div className="artist-card">
                <h3 className="artist-name">Inda ICU</h3>
                <p className="artist-description">
                  Inspired by some of the great pioneers of amapiano beats like: Tyler ICU, DJ
                  Maphorisa & Uncle Waffles
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* How To Play Section */}
        <section className="landing-section py-16 px-6 md:px-12 lg:px-24">
          <div className="max-w-4xl mx-auto">
            <h2 className="landing-section-title text-4xl md:text-5xl mb-12 text-white text-center">
              HOW TO PLAY
            </h2>
            <div className="how-to-play-steps">
              <div className="play-step">
                <div className="step-number">1</div>
                <div className="step-content">
                  <p>Choose a track and start the beat.</p>
                </div>
              </div>
              <div className="play-step">
                <div className="step-number">2</div>
                <div className="step-content">
                  <p>Tap, hold, or swipe the notes as they appear on screen.</p>
                </div>
              </div>
              <div className="play-step">
                <div className="step-number">3</div>
                <div className="step-content">
                  <p>Match the rhythm to earn points and build combos.</p>
                </div>
              </div>
              <div className="play-step">
                <div className="step-number">4</div>
                <div className="step-content">
                  <p>Level up and unlock more songs.</p>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* Why Usiku Beats Section */}
        <section className="landing-section py-16 px-6 md:px-12 lg:px-24">
          <div className="max-w-4xl mx-auto">
            <h2 className="landing-section-title text-4xl md:text-5xl mb-8 text-white text-center">
              Why Usiku Beats?
            </h2>
            <div className="why-usiku-content text-white text-center space-y-6">
              <p className="text-xl font-semibold">Made in Africa, for the world.</p>
              <p className="text-lg">A fresh, authentic rhythm game experience.</p>
              <p className="text-lg">A platform that amplifies African music and talent.</p>
              <p className="text-xl font-bold mt-8 italic">
                "At Usiku Games, we believe in creating fun, meaningful experiences that celebrate
                our culture and inspire the world."
              </p>
            </div>
          </div>
        </section>
        {/* About Us Section */}
        <section className="landing-section py-16 px-6 md:px-12 lg:px-24">
          <div className="max-w-6xl mx-auto">
            <h2 className="landing-section-title text-4xl md:text-5xl mb-8 text-white text-center">
              ABOUT US
            </h2>
            <div className="landing-section-content text-white space-y-4 text-center max-w-4xl mx-auto">
              <p>At Usiku Games, we build great games that matter.</p>
              <p>
                Founded in 2019 in Nairobi, Kenya, we're a passionate team on a mission to create
                engaging, meaningful games that inspire action and positive change.
              </p>
              <p>
                Rooted in our African heritage, we craft thoughtful, high-quality experiences that
                celebrate creativity, culture, and community. Whether developing our own titles or
                collaborating with partners, we believe in the power of play to educate, empower,
                and entertain.
              </p>
              <p>
                As the largest games industry employer in East Africa, we're proud to nurture and
                grow local talent—fueling innovation and shaping the future of African gaming.
              </p>
              <p>
                We're also proud co-founders of the Pan-Africa Gaming Group, connecting studios
                across the continent to showcase Africa's creative excellence to the world.
              </p>
              <p className="font-bold text-xl mt-6">
                At Usiku Games, we believe games can change the world—
                <br />
                and we're building the ones that will.
              </p>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="landing-section py-16 px-6 md:px-12 lg:px-24">
          <div className="max-w-4xl mx-auto">
            <h2 className="landing-section-title text-4xl md:text-5xl mb-8 text-white text-center">
              CONTACT
            </h2>
            <div className="landing-section-content text-white space-y-4 text-center">
              <p>
                We're easy to get hold of! Feel free to get in touch about any business, media or
                general enquires
              </p>
              <p className="text-xl">
                <span className="font-bold">Email:</span>{" "}
                <a
                  href="mailto:info@usiku.africa"
                  className="text-white hover:text-gray-300 underline"
                >
                  info@usiku.africa
                </a>
              </p>
            </div>
          </div>
        </section>
        {/* Footer */}
        <footer className="landing-section py-8 px-6 md:px-12 lg:px-24 border-t border-white/20">
          <div className="max-w-6xl mx-auto text-center">
            <div className="text-white text-sm md:text-base">
              <p className="mb-2">&copy; {new Date().getFullYear()} Usiku Games. All rights reserved.</p>
              <div className="flex justify-center items-center gap-2">
                <Link
                  href="/privacy-policy"
                  onClick={handleClickSound}
                  className="text-white hover:text-orange-500 underline transition-colors duration-200"
                >
                  Privacy Policy
                </Link>
                <span className="text-white">|</span>
                <Link
                  href="/terms-of-service"
                  onClick={handleClickSound}
                  className="text-white hover:text-orange-500 underline transition-colors duration-200"
                >
                  Terms of Service
                </Link>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
    </DesktopViewport>
  );
}
