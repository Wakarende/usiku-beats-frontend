import React, { useRef, useEffect } from "react";
import Phaser from "phaser";
import { useRouter } from "next/router";
import WebFont from "webfontloader";
import { useDispatch } from "react-redux";
import { updateUser } from "../redux/main/authActions";
import ViewportCoordinatePlugin from "phaser3-rex-plugins/plugins/viewportcoordinate-plugin.js";
import ScaleOuterPlugin from "phaser3-rex-plugins/plugins/scaleouter-plugin.js";

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

    let ftueCompleted = localStorage.getItem("ftueCompleted");
    let isFTUE = false;
    if (!ftueCompleted || ftueCompleted != "true") {
      isFTUE = true;
    }

    if (isFTUE) {
      this.scene.start("PreloadJ", { track: trackData });
    } else {
      this.scene.start("Preload", { track: trackData });
    }
  }
}

const PhaserGame = () => {
  const phaserGameRef = useRef(null);
  const gameRef = useRef(null);

  const router = useRouter();
  const dispatch = useDispatch();
  const { track } = router.query;

  const updateUserEventListener = ({ data, new_level }) => {
    // console.log(data);
    // console.log(new_level);
    dispatch(updateUser(data));
  };

  const destroyGame = () => {
    if (gameRef.current) {
      // Object.keys(gameRef.current.scene.keys).forEach((key) => {
      //   gameRef.current.scene.remove(key);
      // });

      // Remove event listeners
      gameRef.current.events.off("updateUserEvent", updateUserEventListener);
      gameRef.current.events.off("destroyGame", destroyGame);
      // Destroy the game
      gameRef.current.destroy(true);
      gameRef.current = null;
    }
  };

  useEffect(() => {
    WebFont.load({
      custom: {
        families: ["Afolkalips", "Carlito-Bold", "Carlito-BoldItalic", "Carlito-Italic", "Carlito-Regular"],
      },
      active: () => {
        if (phaserGameRef.current) {
          const config = {
            type: Phaser.AUTO,
            parent: phaserGameRef.current,
            width: 720,
            height: 1280,
            backgroundColor: "#000000",
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

          let trackData = null;
          if (track) {
            const trackQuery = Array.isArray(track) ? track[0] : track;
            try {
              trackData = JSON.parse(trackQuery);
            } catch (e) {
              console.error("Error parsing track data:", e);
            }
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
