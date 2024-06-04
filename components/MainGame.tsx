import React, { useRef, useEffect } from "react";
import Phaser from "phaser";
import { useRouter } from "next/router";
import WebFont from "webfontloader";
import { useDispatch } from "react-redux";
import { updateUser } from "../redux/main/authActions";
class Boot extends Phaser.Scene {
  preload() {
    this.load.pack("pack", "assets/preload-pack.json");
  }

  create() {
    //   start_sfx = this.sound.add("start_sfx", { volume: 0.7, loop: false });
    //   background_music = this.sound.add("BackGround_Music", { volume: 0.7, loop: false });
    //   background_music.play()

    const trackData = this.registry.get("trackData");

    // superglobal settings
    this.registry.set("transitionDuration", 500);
    this.scene.start("Preload", { track: trackData });
  }
}

// // Function to start a specific scene
// const startScene = (game, sceneKey) => {
//   if (game && game.scene && game.scene.keys[sceneKey]) {
//     game.scene.start(sceneKey);
//   } else {
//     console.error("Scene key not found:", sceneKey);
//   }
// };

const PhaserGame: React.FC = () => {
  const phaserGameRef = useRef<HTMLDivElement | null>(null);
  const gameRef = useRef<Phaser.Game | null>(null); // Ref to store the game instance

  const router = useRouter();
  const dispatch = useDispatch();
  const { track } = router.query;

  const updateUserEventListener = (data) => {
    console.log(data);
    dispatch(updateUser(data));
  };

  useEffect(() => {
    WebFont.load({
      custom: {
        families: [
          "Young-Techs",
          "Robot-Font",
          "D-DIN-Bold",
          "DINPro-Bold",
          "DINPro-Medium",
          "DINPro",
          "Misty-Cotton",
          "MyriadPro-Bold",
          "MyriadPro-Regular",
          "Roboto-Regular",
          "Righteous-Regular",
        ], // Add your font names here
      },
      active: () => {
        if (phaserGameRef.current) {
          const config: Phaser.Types.Core.GameConfig = {
            type: Phaser.AUTO,
            parent: phaserGameRef.current,
            width: 360,
            height: 640,
            backgroundColor: "#242424",
            scale: {
              mode: Phaser.Scale.FIT,
              autoCenter: Phaser.Scale.CENTER_BOTH,
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
            scene: [Boot], // Add other scenes as needed
          };

          // Initialize the Phaser game
          gameRef.current = new Phaser.Game(config);
          gameRef.current.registry.set("router", router);

          // Parse and store the track data in the registry
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

          //   if (scene && typeof scene === 'string') {
          //     startScene(gameRef.current, scene);
          //   }
          // };
          // gameRef.current.events.on('scenesLoaded', scenesLoadedListener);
          gameRef.current.events.on("updateUserEvent", updateUserEventListener);

          return () => {
            if (gameRef.current) {
              // gameRef.current.events.off('scenesLoaded', scenesLoadedListener);

              gameRef.current.events.off(
                "updateUserEvent",
                updateUserEventListener
              );

              gameRef.current.destroy(true);
              gameRef.current = null; // Reset the ref to null after destroying the game
            }
          };
        }
      },
    });
  }, [router, track]);

  return (
    <div
      ref={phaserGameRef}
      style={{
        width: "100%", // match the game's width
        height: "100%", // match the game's height
        position: "relative", // necessary for Phaser's autoCenter
        margin: "0 auto",
      }}
    />
  );
};

export default PhaserGame;
