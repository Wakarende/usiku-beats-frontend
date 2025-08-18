import React, { useRef, useEffect } from "react";
import Phaser from "phaser";
import { useRouter } from "next/router";
import WebFont from "webfontloader";
import { useDispatch } from "react-redux";
import { updateUser } from "../redux/main/authActions";
import ViewportCoordinatePlugin from "phaser3-rex-plugins/plugins/viewportcoordinate-plugin.js";
import ScaleOuterPlugin from "phaser3-rex-plugins/plugins/scaleouter-plugin.js";
import { useAudio } from "../src/context/AudioProvider";
import { AnalyticsService, logAnalytics } from "../services/analytics.service";
import useFTUEStore from "../stores/ftueStore";

class Boot extends Phaser.Scene {
  preload() {
    this.load.pack("pack", "assets/preload-pack.json");
  }

  create() {
    // Init audio sounds
    const sprinkle_chime = this.sound.add("sprinkle_chime", { volume: 0.7, loop: false });
    this.registry.set("sprinkle_chime", sprinkle_chime);

    const button_sfx = this.sound.add("button_sfx", { volume: 0.7, loop: false });
    this.registry.set("button_sfx", button_sfx);

    const background_music = this.sound.add("music_bed", { volume: 0.7, loop: true });
    this.registry.set("background_music", background_music);

    background_music.play();

    const trackData = this.registry.get("trackData");

    this.registry.set("transitionDuration", 500);

    try {
      // Try to get FTUE completed state
      let isFTUE = true; // Default to FTUE mode

      // Get the ftue-storage data
      const ftueStoreData = localStorage.getItem("ftue-storage");
      // console.log("Raw FTUE storage data:", ftueStoreData); // For debugging

      if (ftueStoreData) {
        const ftueStore = JSON.parse(ftueStoreData);
        // console.log("Parsed FTUE store:", ftueStore); // For debugging

        // Check different possible locations of the isCompleted flag
        if (ftueStore.state && ftueStore.state.isCompleted === true) {
          isFTUE = false;
        } else if (ftueStore.isCompleted === true) {
          isFTUE = false;
        }

        // console.log("FTUE mode:", isFTUE ? "Tutorial" : "Normal"); // For debugging
      }

      if (isFTUE) {
        this.scene.start("PreloadJ", { track: trackData });
      } else {
        this.scene.start("Preload", { track: trackData });
      }
    } catch (error) {
      console.error("Error checking FTUE state:", error);
      // Fallback to normal preload if there's an error
      this.scene.start("Preload", { track: trackData });
    }
  }
}

const PhaserGame = () => {
  const phaserGameRef = useRef(null);
  const gameRef = useRef(null);

  const router = useRouter();
  const dispatch = useDispatch();
  const { stopBgMusic } = useAudio();
  stopBgMusic();

  // useEffect(() => {
  //   const handleMessage = (event) => {
  //     console.log("MainGame received message:", event.data);
  //     if (event.data?.type === "INIT_GAME_DATA" && event.data.data?.track) {
  //       localStorage.setItem("currentTrackData", JSON.stringify(event.data.data.track));
  //       console.log("Game received track data:", event.data.data.track.song_name);
  //     }
  //   };

  //   window.addEventListener("message", handleMessage);
  //   return () => window.removeEventListener("message", handleMessage);
  // }, []);

  const updateUserEventListener = ({ data, new_level }) => {
    // console.log(data);
    // console.log(new_level);
    dispatch(updateUser(data));
  };

  // const sendMessageToParent = (data) => {
  //   if (window.parent !== window) {
  //     window.parent.postMessage(data, "*");
  //   }
  // };

  // // Use this when you need to signal game events to parent
  // // Example: When game ends or needs to navigate away
  // const handleExitGame = () => {
  //   sendMessageToParent({ type: "GAME_ACTION", action: "EXIT_GAME" });
  // };

  // You can modify your destroy game function to communicate with parent
  const destroyGame = () => {
    if (gameRef.current) {
      // Remove event listeners
      gameRef.current.events.off("updateUserEvent", updateUserEventListener);
      gameRef.current.events.off("destroyGame", destroyGame);

      // Destroy the game
      gameRef.current.destroy(true);
      gameRef.current = null;

      // // Notify parent if needed
      // sendMessageToParent({ type: "GAME_ACTION", action: "GAME_DESTROYED" });
    }
  };

  useEffect(() => {
    WebFont.load({
      custom: {
        families: [
          "Afolkalips",
          "Carlito-Bold",
          "Carlito-BoldItalic",
          "Carlito-Italic",
          "Carlito-Regular",
        ],
      },
      active: () => {
        if (phaserGameRef.current) {
          const config = {
            type: Phaser.AUTO,
            parent: phaserGameRef.current,
            width: 720,
            height: 1280,
            backgroundColor: "#000000",
            loader: {
              baseURL: "/games/usiku/beats/", // This will be '/games/usiku/beats/'
            },
            scale: {
              mode: Phaser.Scale.FIT,
              autoCenter: Phaser.Scale.CENTER_BOTH,
            },
            plugins: {
              global: [
                {
                  key: "rexViewportCoordinate",
                  plugin: ViewportCoordinatePlugin,
                  start: true,
                },
              ],
              scene: [
                {
                  key: "rexScaleOuter",
                  plugin: ScaleOuterPlugin,
                  mapping: "rexScaleOuter",
                },
              ],
            },
            physics: {
              default: "arcade",
              arcade: {
                gravity: { y: 0 },
                debug: false,
              },
            },
            render: {
              pixelArt: false,
            },
            input: {
              activePointers: 3,
            },
            scene: [Boot],
          };

          gameRef.current = new Phaser.Game(config);
          gameRef.current.registry.set("router", router);

          gameRef.current.registry.set("analytics", AnalyticsService);
          gameRef.current.registry.set("logAnalytics", logAnalytics);

          let version = "0.3.1";
          // Generate and set session ID
          const sessionId = `session_${version}_${Date.now()}_${Math.random()
            .toString(36)
            .substr(2, 9)}`;
          gameRef.current.registry.set("sessionId", sessionId);
          sessionStorage.setItem("sessionId", sessionId);

          let trackData = null;
          try {
            // Get track data from localStorage instead of query params
            const trackDataString = localStorage.getItem("currentTrackData");
            if (trackDataString) {
              trackData = JSON.parse(trackDataString);
              // Optional: Clear the localStorage item after retrieving to prevent stale data
              // localStorage.removeItem("currentTrackData");
            }
          } catch (e) {
            console.error("Error parsing track data from localStorage:", e);
          }

          // Fallback to query params if localStorage is empty (for backward compatibility)
          if (!trackData && router.query.track) {
            const trackQuery = Array.isArray(router.query.track)
              ? router.query.track[0]
              : router.query.track;
            try {
              trackData = JSON.parse(trackQuery);
            } catch (e) {
              console.error("Error parsing track data from query:", e);
            }
          }

          if (!trackData) {
            console.warn("No track data found in localStorage or query params");
          }

          gameRef.current.registry.set("trackData", trackData);

          gameRef.current.events.on("updateUserEvent", updateUserEventListener);
          gameRef.current.events.on("destroyGame", destroyGame);

          return () => {
            destroyGame();
          };
        }
      },
    });
  }, []);

  return (
    <div
      ref={phaserGameRef}
      style={{
        width: "100%",
        height: "100%",
        position: "fixed",
        top: 0,
        left: 0,
        overflow: "hidden",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <style jsx global>{`
        body {
          margin: 0;
          padding: 0;
          overflow: hidden;
          position: fixed;
          width: 100%;
          height: 100%;
        }
        canvas {
          display: block;
          touch-action: none;
          -webkit-touch-callout: none;
          -webkit-user-select: none;
          -khtml-user-select: none;
          -moz-user-select: none;
          -ms-user-select: none;
          user-select: none;
          outline: none;
          -webkit-tap-highlight-color: rgba(255, 255, 255, 0);
        }
      `}</style>
    </div>
  );
};

export default PhaserGame;
