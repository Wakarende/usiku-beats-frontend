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

		// pause_BG
		const pause_BG = this.add.image(180, 320, "Pause_BG");
		pause_BG.scaleX = 0.3333;
		pause_BG.scaleY = 0.3333;

		// pause_text
		const pause_text = this.add.text(180, 177, "", {});
		pause_text.setOrigin(0.5, 0.5);
		pause_text.text = "Paused";
		pause_text.setStyle({ "color": "#ff6a00", "fontFamily": "Afolkalips", "fontSize": "65px", "stroke": "#ff6a00" });

		// continue_btn
		const continue_btn = this.add.image(180, 527, "Continue");
		continue_btn.scaleX = 0.3333;
		continue_btn.scaleY = 0.3333;

		// quit_btn
		const quit_btn = this.add.image(180, 599, "Quit");
		quit_btn.scaleX = 0.3333;
		quit_btn.scaleY = 0.3333;

		this.continue_btn = continue_btn;
		this.quit_btn = quit_btn;

		this.events.emit("scene-awake");
	}

	/** @type {Phaser.GameObjects.Image} */
	continue_btn;
	/** @type {Phaser.GameObjects.Image} */
	quit_btn;

	/* START-USER-CODE */

  // Write your code here

  create() {
    this.editorCreate();
    const router = this.registry.get("router");

    this.continue_btn.setInteractive();
    this.continue_btn.on("pointerup", () => {
      // start_sfx.play();
      this.scene.stop();
      this.scene.resume("Level");
    });

    this.quit_btn.setInteractive();
    this.quit_btn.on("pointerup", () => {
      const levelScene = this.scene.get("Level");
      levelScene.cleanUp(); // clean-up Level scene
      this.scene.stop("Level");
      // this.scene.start("BufferScene");
      router.push("/");
    });
  }

  /* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
