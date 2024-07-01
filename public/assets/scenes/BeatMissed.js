// You can write more code here

/* START OF COMPILED CODE */

class BeatMissed extends Phaser.Scene {

	constructor() {
		super("BeatMissed");

		/* START-USER-CTR-CODE */
    // Write your code here.
    /* END-USER-CTR-CODE */
	}

	/** @returns {void} */
	editorCreate() {

		// overlay
		this.add.image(180, 320, "overlay");

		// quit_button
		const quit_button = this.add.image(180, 349.32517808240533, "play_button");
		quit_button.scaleX = 0.8;
		quit_button.scaleY = 0.8;

		// quit_text
		const quit_text = this.add.text(180, 349.32517808240533, "", {});
		quit_text.setOrigin(0.5, 0.5);
		quit_text.text = "QUIT";
		quit_text.setStyle({ "fontFamily": "DINPro", "fontSize": "22px" });

		// continue_button
		const continue_button = this.add.image(180, 429.3251780824053, "play_button");
		continue_button.scaleX = 0.8;
		continue_button.scaleY = 0.8;

		// continue_text
		const continue_text = this.add.text(207, 429.3251780824053, "", {});
		continue_text.setOrigin(0.5, 0.5);
		continue_text.text = "CONTINUE";
		continue_text.setStyle({ "fontFamily": "DINPro", "fontSize": "12px" });

		// missed
		const missed = this.add.text(180, 244.32517808240533, "", {});
		missed.setOrigin(0.5, 0.5);
		missed.text = "MISSED";
		missed.setStyle({ "color": "#666363ff", "fontFamily": "Righteous-Regular", "fontSize": "50px", "stroke": "#666363ff" });

		// beat
		const beat = this.add.text(181, 209.32517808240533, "", {});
		beat.setOrigin(0.5, 0.5);
		beat.text = "BEAT";
		beat.setStyle({ "align": "center", "color": "#666363ff", "fontFamily": "DINPro", "fontSize": "18px", "stroke": "#666363ff" });

		// gem
		const gem = this.add.image(122, 430, "gem");
		gem.scaleX = 0.05;
		gem.scaleY = 0.05;

		// gem_count
		const gem_count = this.add.text(142, 429, "", {});
		gem_count.setOrigin(0.5, 0.5);
		gem_count.text = "5";
		gem_count.setStyle({ "fontFamily": "DINPro", "fontSize": "12px" });

		this.quit_button = quit_button;
		this.quit_text = quit_text;
		this.continue_button = continue_button;
		this.continue_text = continue_text;
		this.gem_count = gem_count;

		this.events.emit("scene-awake");
	}

	/** @type {Phaser.GameObjects.Image} */
	quit_button;
	/** @type {Phaser.GameObjects.Text} */
	quit_text;
	/** @type {Phaser.GameObjects.Image} */
	continue_button;
	/** @type {Phaser.GameObjects.Text} */
	continue_text;
	/** @type {Phaser.GameObjects.Text} */
	gem_count;

	/* START-USER-CODE */

  // Write your code here

  create() {
    this.editorCreate();
    console.log("BeatMissed create.js()");
    this.cameras.main.shake(500, 0.015);

    this.checkGems();

    // this.continue_button.setInteractive()
    // this.continue_button.on('pointerup', ()=>{
    // 	this.subtractGems(5);
    // 	this.scene.stop();
    // 	this.scene.resume("Level");

    // })
    this.quit_button.setInteractive();
    this.quit_button.on("pointerup", () => {
      this.scene.stop();
      const levelScene = this.scene.get("Level");
      levelScene.gameOver(); // clean-up Level scene
      // this.scene.stop("Level");
    });
  }

  checkGems() {
    let user_data = JSON.parse(localStorage.getItem("user_data"));
    const total_gems = user_data.profile.player.total_gems;
    this.gem_count.setText(total_gems);
    if (total_gems < 20) {
      this.continue_button.disableInteractive();
      this.continue_text.setText("INSUFFICIENT");
      this.continue_button.setTint(0x888888); // Gray out the button
    } else {
      this.continue_button.setInteractive();
      this.continue_text.setText("CONTINUE");
      this.continue_button.on("pointerup", () => {
        this.subtractGems(5);
        this.scene.stop();
        this.scene.resume("Level");
      });
    }
  }

  subtractGems(amount) {
    let user_data = JSON.parse(localStorage.getItem("user_data"));
    user_data.profile.player.total_gems -= amount;
    this.game.events.emit("updateUserEvent", { data: user_data });
  }

  /* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
