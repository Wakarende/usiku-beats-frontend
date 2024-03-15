// You can write more code here

/* START OF COMPILED CODE */

class Pause extends Phaser.Scene {
  constructor() {
    super("Pause");

    /* START-USER-CTR-CODE */

    /* END-USER-CTR-CODE */
  }

  /** @returns {void} */
  editorCreate() {
    // pause_overlay
    this.add.image(180, 320, "pause_overlay");

    // score_text
    const score_text = this.add.text(180, 82, "", {});
    score_text.setOrigin(0.5, 0.5);
    score_text.text = "Pause";
    score_text.setStyle({ fontFamily: "Righteous-Regular", fontSize: "55px" });

    // continue_button
    const continue_button = this.add.image(180, 372, "play_button_inactive");

    // continue_text
    const continue_text = this.add.text(180, 370.0831465590536, "", {});
    continue_text.setOrigin(0.5, 0.5);
    continue_text.text = "Continue";
    continue_text.setStyle({ fontFamily: "DINPro", fontSize: "25px" });

    // quit_text
    const quit_text = this.add.text(180, 432.8584157011215, "", {});
    quit_text.setOrigin(0.5, 0.5);
    quit_text.text = "Quit";
    quit_text.setStyle({ fontFamily: "DINPro", fontSize: "25px" });

    this.score_text = score_text;
    this.continue_button = continue_button;
    this.quit_text = quit_text;

    this.events.emit("scene-awake");
  }

  /** @type {Phaser.GameObjects.Text} */
  score_text;
  /** @type {Phaser.GameObjects.Image} */
  continue_button;
  /** @type {Phaser.GameObjects.Text} */
  quit_text;

  /* START-USER-CODE */

  // Write your code here

  create() {
    this.editorCreate();
    const router = this.registry.get('router');

    this.continue_button.setInteractive();
    this.continue_button.on("pointerup", () => {
      // start_sfx.play();
      this.scene.stop();
      this.scene.resume("Level");
    });

    this.quit_text.setInteractive();
    this.quit_text.on("pointerup", () => {
      const levelScene = this.scene.get("Level");
      levelScene.cleanUp();   // clean-up Level scene
      this.scene.stop("Level");
      // this.scene.start("BufferScene");
      router.push('/')
    });
  }

  /* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
