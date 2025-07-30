import React, { useEffect, useState } from "react";
import { Spinner } from "react-bootstrap";
import moment from "moment-timezone";
import { useSelector, useDispatch } from "react-redux";
import Popup from "../components/library/Popup";
import Image from "next/image";
// import Link from "next/link";
import { instance as axios } from "../services/axios.config";
import { BASE_URL } from "../services/config";
import { useRouter } from "next/router";
import { updateUser } from "../redux/main/authActions";
import { motion } from "framer-motion";
import Header from "../components/header/Header";
import DesktopViewport from "../components/viewport/DesktopViewport";

import { OverlayCard } from "../components/artistinfo/OverlayCard";
import InfoPanel from "../components/infopanel/InfoPanel";
import useSound from "use-sound";
import useClickSound from "../hooks/useClickSound";
import useFTUEStore from "../stores/ftueStore";
import { AnalyticsService } from "../services/analytics.service";
// import ZustandDebug from "../components/zustandDebug";
import "./pages.css";
import { useAudio } from "../src/context/AudioProvider";

const isSongInQueue = (songInstance) => {
  if (!songInstance) return false;
  if (songInstance.unlocked) return false;
  if (!songInstance.unlock_time) return false;

  return true;
};

const Library = () => {
  const [songs, setSongs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [unlockedSong, setUnlockedSong] = useState(null);
  const [isOverlayOpen, setIsOverlayOpen] = useState(false);
  const [selectedArtist, setSelectedArtist] = useState({
    artistName: "",
    bio: "",
    socialMedia: [],
  });

  const [isFtue, setIsFtue] = useState(false);

  const [showLibraryFtuePanel, setShowLibraryFtuePanel] = useState(false);

  const {
    currentStep,
    isCompleted,
    libraryTutorialSeen,
    setCurrentStep,
    setLibraryTutorialSeen,
    completeStep,
  } = useFTUEStore();
  const [sessionUnlockCounter, setSessionUnlockCounter] = useState(0);
  const [currentlyPlayingSongId, setCurrentlyPlayingSongId] = useState(null);
  const [audioProgress, setAudioProgress] = useState(0);
  const [audioRef, setAudioRef] = useState(null);

  

  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const { user_data } = auth;
  const router = useRouter();

  const gemsRequiredToUnlockSong = 20;


  //Desktop Viewport
  const [isInIframe, setIsInIframe] = useState(false);
  const isIframeMode = router.query.iframe === 'true';

  const { duckBgMusic, restoreBgMusic } = useAudio();

  
  useEffect(() => {
    setIsInIframe(window !== window.parent);
  }, []);


  useEffect(() => {
    // Check if we're returning from game and in iframe
    if (isInIframe) {
      const params = new URLSearchParams(window.location.search);
      const fromGame = params.get('fromGame');
      
      if (fromGame === 'true') {
        // Notify parent to resume music
        window.parent.postMessage({ type: 'RESUME_MUSIC' }, '*');
        
        // Clean up URL parameter
        const newUrl = window.location.pathname;
        window.history.replaceState({}, '', newUrl);
      }
    }
  }, [isInIframe]);


  useEffect(() => {
    AnalyticsService.trackUIEvent("Library", "View");
  }, []);

  //audio cleanup mp3 preview
  useEffect(() => {
    return () => {
      if (audioRef) {
        audioRef.pause();
        audioRef.currentTime = 0;
      }
    };
  }, [audioRef]);

  useEffect(() => {
    if (currentStep === 2) {
      setShowLibraryFtuePanel(true);
      setIsFtue(true);
    } else if (isCompleted) {
      setIsFtue(false);
      setShowLibraryFtuePanel(false);
    }
  }, [currentStep, isCompleted]);

  useEffect(() => {
    setLoading(true);

    const params = new URLSearchParams(window.location.search);
    const ftueParam = params.get("ftueGameplayCompleted");

   

    if (ftueParam === "true" && !isCompleted && !libraryTutorialSeen) {
      setIsFtue(true);
      setShowLibraryFtuePanel(true);
      setLibraryTutorialSeen(true);
    }

    const songIds = [149, 150, 151, 152, 153, 154];
    const url = `${BASE_URL}/songs/?${songIds.map((id) => `ids=${id}`).join("&")}`;

    axios.get(url).then((res) => {
      const songsWithUnlockStatus = res.data.map((song) => ({
        ...song,
        isUnlocked: user_data?.profile?.player?.player_song_instances.some(
          (instance) => instance.song.id === song.id && instance.unlocked
        ),
      }));
      const sortedSongs = [...songsWithUnlockStatus].sort((a, b) => {
        const getDifficultyRank = (diff) => {
          diff = (diff || "").toLowerCase();
          if (diff === "easy") return 1;
          if (diff === "medium") return 2;
          if (diff === "hard") return 3;
          return 4;
        };

        return getDifficultyRank(a.difficulty) - getDifficultyRank(b.difficulty);
      });
      setSongs(sortedSongs);
      setLoading(false);
      // setSongs(songsWithUnlockStatus);
    });
  }, [user_data]);

  const unlockSongWithGems = (song) => {
    let newUserdata = JSON.parse(JSON.stringify(user_data));

    if (newUserdata.profile.player.total_gems < gemsRequiredToUnlockSong) {
      console.error("Not enough gems to unlock the song");
      return;
    }
    newUserdata.profile.player.total_gems -= gemsRequiredToUnlockSong;

    const songInstance = newUserdata.profile.player.player_song_instances.find(
      (instance) => instance.song.id === song.id
    );

    if (songInstance) {
      songInstance.unlocked = true;
      songInstance.unlock_time = null;
    } else {
      console.error("Song not found in song instances", song.id);
      return;
    }

    dispatch(updateUser(newUserdata));

    setSongs((prevSongs) =>
      prevSongs.map((s) => (s.id === song.id ? { ...s, isUnlocked: true } : s))
    );

    handleClickSound();
  };

  const totalDiscs = user_data?.profile?.player?.total_discs || 0;
  const unlockable = totalDiscs >= 30;

  const handleSongUnlock = (song) => {
    if (song.isUnlocked) return;
    const existingInstance = user_data.profile.player.player_song_instances.find(
      (instance) =>
        instance.song.id === song.id || // Direct match
        (instance.song &&
          instance.song.id &&
          song.id &&
          instance.song.id.toString() === song.id.toString())
    );

    if (existingInstance && !existingInstance.unlocked) {
      if (existingInstance.unlock_time) {
        const now = new Date();
        const unlockTime = new Date(existingInstance.unlock_time);

        if (unlockTime > now) {
          // console.log("Song is still unlocking; cannot purchase again");
          return;
        } else {
          // console.log(
          //   "Song has finished unlocking but hasn't been added to library yet; cannot purchase again"
          // );
          return;
        }
      }
    }

    setUnlockedSong(song);
    if (currentStep === 2) {
      AnalyticsService.trackFTUEStep("4 - Song Select");
      completeStep(currentStep);
    }
    setIsPopupOpen(true);

    let unlockTime = null;
    let unlockedFlag = false;

    {
      /* Previous unlocking logic that we WILL GO BACK TO LATER */
    }
    // if (!isCompleted && currentStep <= 5) {
    //   unlockTime = moment().add(15, "minutes").toISOString();
    // } else {
    //   const unlockedSongsCount = user_data.profile.player.player_song_instances.filter(
    //     (instance) => instance.unlocked
    //   ).length;

    //   const inQueueCount = user_data.profile.player.player_song_instances.filter(
    //     (instance) => !instance.unlocked && instance.unlock_time
    //   ).length;

    //   const baseTime = 5;

    //   const totalSongs = unlockedSongsCount + inQueueCount + sessionUnlockCounter;
    //   const additionalTime = totalSongs * 5;
    //   const totalUnlockTime = baseTime + additionalTime;

    //   console.log(
    //     `Regular unlock: Using ${totalUnlockTime} seconds (${baseTime} base + ${additionalTime} from ${totalSongs} previous unlocks)`
    //   );

    //   unlockTime = moment().add(totalUnlockTime, "seconds").toISOString();
    // }

    if (!isCompleted && currentStep <= 5) {
      unlockTime = moment().add(15, "minutes").toISOString();
    } else {
      const unlockedSongsCount = user_data.profile.player.player_song_instances.filter(
        (instance) => instance.unlocked
      ).length;

      const inQueueCount = user_data.profile.player.player_song_instances.filter(
        (instance) => !instance.unlocked && instance.unlock_time
      ).length;

      const totalSongs = unlockedSongsCount + inQueueCount + sessionUnlockCounter;
      const unlockTimes = [30, 60, 300, 600, 1200];

      const postFtueCount = totalSongs - 1;
      const unlockTimeIndex = Math.max(0, Math.min(postFtueCount, unlockTimes.length - 1));
      const unlockTimeInSeconds = unlockTimes[unlockTimeIndex];

      // console.log(
      //   `Regular unlock: Using ${unlockTimeInSeconds} seconds for song #${
      //     postFtueCount + 1
      //   } after FTUE`
      // );

      unlockTime = moment().add(unlockTimeInSeconds, "seconds").toISOString();
    }
    setSessionUnlockCounter((prevCount) => prevCount + 1);

    const newUserdata = JSON.parse(JSON.stringify(user_data));
    const now = new Date();
    const unlockDurationSec = (new Date(unlockTime).getTime() - now.getTime()) / 1000;

    let newSongInstance = {
      date_added: now.toISOString(),
      favourited: false,
      high_score: 0,
      maximum_progress: 0,
      no_of_plays: 0,
      paid_for_flag: false,
      unlock_time: unlockTime,
      unlock_start_time: new Date().toISOString(),
      unlockDurationSec,
      unlocked: unlockedFlag,
      song,
    };

    newUserdata.profile.player.total_discs -= 30;
    newUserdata.profile.player.player_song_instances.push(newSongInstance);

    dispatch(updateUser(newUserdata));

    setSongs((prevSongs) =>
      prevSongs.map((s) => (s.id === song.id ? { ...s, isUnlocked: true } : s))
    );
    handleClickSound();
  };

  const handlePopupContinue = () => {
    setIsPopupOpen(false);

    if (isFtue) {
      if (currentStep === 3) {
        AnalyticsService.trackFTUEStep("5 - Confirm SOng Select");
        completeStep(currentStep);
      }
      // router.push("/hub?ftueGameplayCompleted=true");
      router.push('/hub');
    } else {
      router.push("/hub");
    }
    handleClickSound();
  };

  const openOverlay = async (artistId) => {
    handleClickSound();
    setIsOverlayOpen(true);

    try {
      const response = await axios.get(`${BASE_URL}artist-detail/${artistId}/`);
      let artist = response.data;
      setSelectedArtist({
        artistName: artist.name,
        bio: artist.bio,
        socialMedia: {
          spotify: artist.spotify_link,
          twitter: artist.twitter_link,
          youtube: artist.youtube_link,
          instagram: artist.instagram_link,
          website: artist.website_link,
        },
      });
    } catch (error) {
      console.error("Error fetching artist details:", error);
      setIsOverlayOpen(false);
    }
  };

  const closeOverlay = () => {
    handleClickSound();
    setIsOverlayOpen(false);
  };

  const handleArtistClick = (artistId) => {
    openOverlay(artistId);
  };

  const handleClickSound = useClickSound();
  if (loading) {
    return (
      <div className="cmd-page">
        <div className="kayfo-body-content">
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </div>
        {/* <BottomTabNav /> */}
      </div>
    );
  }

  const hasUnlockedSong = user_data?.profile?.player?.player_song_instances?.some(
    (instance) => instance.unlocked
  );

  const handleSongPreview = async (song, canPreview) => {
   
    if (!canPreview) {
      return;
    }
    
    handleClickSound();
    
 
    if (currentlyPlayingSongId === song.id) {
      stopAudioPreview();
      return;
    }
    
   
    if (audioRef) {
      stopAudioPreview();
    }

    duckBgMusic(0.1);
    
    try {
   
      const audio = new Audio(song.mp3_file);
      
     
      const handleTimeUpdate = () => {
        const progress = (audio.currentTime / 10) * 100; 
        setAudioProgress(progress);
      };
      
      const handleEnded = () => {
        stopAudioPreview();
      };
      
      audio.addEventListener('timeupdate', handleTimeUpdate);
      audio.addEventListener('ended', handleEnded);
      
     
      setAudioRef(audio);
      setCurrentlyPlayingSongId(song.id);
      setAudioProgress(0);
      
      
      await audio.play();
      
      
      const timeoutId = setTimeout(() => {
        if (audio && !audio.paused && !audio.ended) {
          stopAudioPreview();
        }
      }, 10000); 
      
     
      audio.timeoutId = timeoutId;
      
    } catch (error) {
      
      console.warn('Audio playback failed:', error);
      stopAudioPreview();
    }
  };

  const stopAudioPreview = () => {
    if (audioRef) {
      
      if (audioRef.timeoutId) {
        clearTimeout(audioRef.timeoutId);
      }
      
      
      if (!audioRef.paused && !audioRef.ended) {
        audioRef.pause();
      }
      
      audioRef.currentTime = 0;
      
      
      audioRef.removeEventListener('timeupdate', () => {});
      audioRef.removeEventListener('ended', () => {});
    }

    restoreBgMusic();
    
    setCurrentlyPlayingSongId(null);
    setAudioProgress(0);
    setAudioRef(null);
  };

  const pageContent = (
    <div className="cmd-page">
      <Header />
      <div>
        <div className="flex justify-center items-center mt-4 w-full ">
          <h1 className="uppercase lib-header text-7xl sm:text-5xl lg:text-8xl">
            Full Song Library
          </h1>
        </div>
        <div className=" flex  justify-center items-center">
          <div className="flex justify-center flex-col items-center sm:text-sm text-lg lg:text-2xl ">
            <p className="text-library uppercase font-bold">You have {totalDiscs} discs!</p>
            {unlockable ? (
              <>
                <p className="text-white mt-1">Each song costs 30 discs</p>
                <p className="text-white">Find your next song now!</p>
              </>
            ) : (
              <>
                <p className="text-white">You don't have enough discs!</p>
                <p className="text-white">Play songs to earn more discs!</p>
              </>
            )}
          </div>
          <div className="mt-0">
            <Image src={"./assets/img/hub/disc.png"} width={120} height={120} alt="disc-icon" />
          </div>
        </div>
        <div className="gradient-container item-stretch w-full p-0">
          <Image
            src={"./assets/img/library/gradient_copy.png"}
            alt="gradient-separator"
            width={150}
            height={10}
            className="gradient-image w-full h-[20px]"
          />
        </div>
        {/* Songs List */}
        <div className="w-full flex flex-wrap justify-center  ">
          {songs.map((song, index) => {
            const instance = user_data?.profile?.player?.player_song_instances.find(
              (inst) => inst.song.id === song.id
            );
            const inQueue = isSongInQueue(instance);
            const showUnlocked = song.isUnlocked || inQueue;
            
            return (
              <div key={index} className="w-full max-w-xl ">
                <div className="p-4 flex flex-row justify-center items-center">
                 
                  <div className="flex-shrink-0 relative md:w-[150px] sm:w-[120px] lg:w-[180px] xl:w-[200px] ">
                   <Image
                      src={song.thumbnail_file}
                      alt="Song Cover"
                      width={1}
                      height={1}
                      className="object-cover rounded-lg w-full h-auto"
                    />
                    <div className="absolute inset-0 bg-black/50 rounded-lg"></div>
                    <button
                    className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 w-28 h-28"
                    onClick={() => {
                      const canPreview = !showUnlocked && unlockable;
                      if (canPreview) {
                        handleSongPreview(song, canPreview);
                      }
                    }}
                    disabled={showUnlocked || !unlockable}
                    style={{ opacity: (showUnlocked || !unlockable) ? 0.5 : 1 }}
                    >
                      {currentlyPlayingSongId === song.id ? (
                        <div className="border-2 border-red-500 flex flex-col justify-center items-center">
                        <Image alt="stop-icon" className="sm:w-12 md:w-16 lg:w-20 xl:w-28 h-auto" src={'/assets/img/library/stop-icon.png'} width={100} height={100}/>
                        </div>
                      ) : (
                        <div className="flex flex-col justify-center items-center w-full h-full gap-1.5">
                           <Image alt="speaker-icon" className="sm:w-12 md:w-16 lg:w-20 xl:w-28 h-auto object-contain" src={'/assets/img/library/speaker-icon.png'} width={10} height={10}/> 
                           <p className="text-yellow sm:text-lg md:font-xl uppercase">Preview</p> 
                        </div>
                      )}
                    </button>
                  );  
                </div>
                  <div className="flex-grow ml-6 min-w-0">
                    <div className="flex items-center justify-between w-full">
                      <p className="font-bold text-yellow text-lg md:text-md sm:text-sm text-nowrap lg:text-xl xl:text-2xl">
                        {song.song_name}
                      </p>
                      <p className="text-yellow uppercase text-xs text-nowrap">{song.difficulty}</p>
                    </div>
                    <div className="flex items-center justify-between w-full">
                      <p
                        className="text-white uppercase text-xs sm:text-[10px] cursor-pointer text-nowrap lg:text-sm xl:text-base"
                        onClick={() => handleArtistClick(song.artist?.id)}
                      >
                        {song.artist_name}
                      </p>
                      <p className="text-white uppercase text-xs sm:text-[10px] text-nowrap lg:text-sm xl:text-base">
                        {song.country_name}
                      </p>
                    </div>
                    {/* Unlock Button */}
                    {showUnlocked ? (
                      <div className="text-green-500 font-bold mt-4 ">Unlocked</div>
                    ) : (
                      <div
                        className={`
                        relative flex justify-center items-center mt-3 cursor-pointer overflow-visible z-10
                        ${currentStep === 2 && !isCompleted ? "ftue-lib-highlight-frame" : ""}
                        ${!unlockable ? "pointer-events-none opacity-50" : ""}
                        `}
                        onClick={() => unlockable && handleSongUnlock(song)}
                      >
                        <div className="relative flex justify-center items-center p-1 rounded-lg ">
                          <Image
                            src="./assets/img/library/get_song_button.png"
                            alt="get-song-btn"
                            width={460}
                            height={110}
                            className="object-contain"
                          />
                          <span className="absolute text-yellow font-bold text-lg top-[20%] left-[10%] sm:top-[10%] sm:left-[9%] sm:text-sm lg:top-[20%] lg:left-[15%] xl:top-[20%] xl:left-[15%] lg:text-xl xl:text-2xl">
                            30
                          </span>
                        </div>
                        {currentStep === 2 && !isCompleted && (
                          <div className="absolute top-[50px] right-[-40px] lg:top-[60px] lg:right-[-40px] animate-bounce z-[10000] pointer-events-none">
                            <Image
                              src="./assets/img/ftue/hand_icon.png"
                              width={80}
                              height={80}
                              alt="Hand pointing to get song"
                              className="w-20 h-20 object-contain"
                            />
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
                <div className="w-full p-0">
                  <Image
                    src={"./assets/img/library/divider.png"}
                    width={400}
                    height={100}
                    alt="divider"
                    className="w-full"
                  />
                </div>
              </div>
            );
          })}
        </div>
        {/* Popup shown after user clicks get song */}
        <Popup isOpen={isPopupOpen} closePopup={() => setIsPopupOpen(false)}>
          <div className="flex justify-start flex-col items-center  gap-8">
            <h1 className="text-6xl tracking-wider text-[#ff6b03] text-nowrap lg:text-7xl xl:text-8xl uppercase">
              You Just Chose
            </h1>
            <div className="flex flex-col justify-center items-center relative">
              <div className="relative flex justify-center items-center">
                <Image
                  src={"./assets/img/library/group_13.png"}
                  width={1}
                  height={1}
                  alt="popup-frame"
                  className="rounded-lg z-1 md:w-[320px] md:h-[400px] sm:w-[320px] sm:h-[400px] lg:w-[400px] lg:h-[450px] xl:w-[480px] xl:h-[550px] "
                />
                <div className="absolute top-[22%] left-[11.6%] overflow-hidden w-[237px] h-[250px] lg:top-[21%] lg:left-[11%] xl:top-[21%] xl:left-[12%] lg:w-[300px] lg:h-[265px] xl:w-[352px] xl:h-[370px]">
                  <Image
                    src={unlockedSong?.thumbnail_file}
                    alt="Artist Image"
                    layout="fill"
                    className="z-0 w-[237px] h-[256px] object-contains  lg:w-[300px] lg:h-[200px] "
                  />
                </div>
                <div className="flex flex-col absolute bottom-[10%] z-1">
                  <p className="text-yellow uppercase text-xs text-nowrap lg:text-base xl:text-lg">
                    {unlockedSong?.artist_name}
                  </p>
                  <p className="text-white text-sm lg:text-base xl:text-base">
                    {unlockedSong?.song_name}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div
            className={`relative flex justify-center items-center  ${
              currentStep === 3 && !isCompleted ? "ftue-continue-highlight-frame" : ""
            }`}
          >
            <button
              onClick={() => {
                handlePopupContinue();
              }}
              className="button-image-container"
            >
              <Image
                src={"./assets/img/hub/button_blank.png"}
                width={1}
                height={1}
                alt="continue-btn"
                className="w-[200px] lg:w-[250px] xl:w-[300px] object-contain"
              />
              <span className="text-white absolute inset-4 font-bold uppercase text-xl tracking-widest lg:inset-6 lg:text-2xl xl:inset-8 xl:text-3xl">
                Continue
              </span>
              {/* Bouncing hand for step 3 */}
            </button>
            {currentStep === 3 && !isCompleted && (
              <div className="absolute bottom-[20px] right-[-70px] animate-bounce z-[10000] pointer-events-none">
                <Image
                  src="./assets/img/ftue/hand_icon.png"
                  width={1}
                  height={1}
                  alt="Hand pointing to continue"
                  className="w-20 h-20 object-contain -rotate-[120deg]"
                />
              </div>
            )}
          </div>
        </Popup>
      </div>
      {currentStep === 2 && showLibraryFtuePanel && !isCompleted && (
        <InfoPanel
          onClose={() => setShowLibraryFtuePanel(false)}
          paragraphs={[
            <div key="wrapper">
              <p className="md:text-lg sm:text-sm lg:text-2xl">
                This is the <span className="font-bold">Song Library!</span>. Scroll through, and
                choose a song to start with.
              </p>
            </div>,
          ]}
          bottomPosition={true}
          transparentBg={true}
          allowClickThrough={true}
        />
      )}
      <footer className="bg-contain bg-center bg-no-repeat sticky bottom-0  flex items-center justify-center z-10">
        {isFtue && !hasUnlockedSong ? (
          <Image
            src="./assets/img/ftue/footer_pattern.png"
            alt="Footer pattern"
            width={400}
            height={100}
            className="object-contain"
          />
        ) : (
          <div className="relative w-full">
            <Image
              alt="footer-banner"
              src={"./assets/img/library/bottom_banner_bg.png"}
              width={400}
              height={100}
              className="object-contain w-full"
            />
            <motion.div
              className="absolute sm:top-8 sm:left-[4rem] md:top-10 md:left-20 lg:top-[5rem] lg:left-[11rem] xl:top-[5rem] xl:left-[11rem]"
              animate={{ scale: [1, 1.1, 1] }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                repeatType: "loop",
                ease: "easeInOut",
              }}
              onClick={() => {
                handleClickSound();
                router.push("/hub");
              }}
            >
              <Image
                src="./assets/img/levelinfo/back_button.png"
                alt="Back"
                width={190}
                height={50}
                className="object-contain sm:w-[200px] md:w-[200px] lg:w-[350px] xl:w-[350px] cursor-pointer"
              />
            </motion.div>
          </div>
        )}
      </footer>
      <OverlayCard
        isOpen={isOverlayOpen}
        onClose={closeOverlay}
        artistName={selectedArtist.artistName}
        bio={selectedArtist.bio}
        socialMedia={selectedArtist.socialMedia}
      />
      {/* <ZustandDebug /> */}
    </div>
  );

  if (isIframeMode) {
    return pageContent;
  }
  
  return (
      <DesktopViewport>
        {pageContent}
      </DesktopViewport>
  );
};

export default Library;
