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
		const overlay = this.add.image(180, 320, "overlay");

		// quit_button
		const quit_button = this.add.image(180, 349.32517808240533, "play_button");
		quit_button.scaleX = 0.8;
		quit_button.scaleY = 0.8;
		quit_button.visible = false;

		// quit_text
		const quit_text = this.add.text(180, 349.32517808240533, "", {});
		quit_text.setOrigin(0.5, 0.5);
		quit_text.visible = false;
		quit_text.text = "QUIT";
		quit_text.setStyle({ "fontFamily": "DINPro", "fontSize": "22px" });

		// continue_button
		const continue_button = this.add.image(180, 429.3251780824053, "play_button");
		continue_button.scaleX = 0.8;
		continue_button.scaleY = 0.8;

		// continue_text
		const continue_text = this.add.text(195, 429.3251780824053, "", {});
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

		// timer_text
		const timer_text = this.add.text(243, 429, "", {});
		timer_text.setOrigin(0.5, 0.5);
		timer_text.text = "5";
		timer_text.setStyle({ "fontFamily": "DINPro", "fontSize": "12px" });

		// lists
		const ui_layer = [gem_count, gem, beat, missed, continue_text, continue_button, quit_text, quit_button];

		this.overlay = overlay;
		this.quit_button = quit_button;
		this.quit_text = quit_text;
		this.continue_button = continue_button;
		this.continue_text = continue_text;
		this.gem_count = gem_count;
		this.timer_text = timer_text;
		this.ui_layer = ui_layer;

		this.events.emit("scene-awake");
	}

	/** @type {Phaser.GameObjects.Image} */
	overlay;
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
	/** @type {Phaser.GameObjects.Text} */
	timer_text;
	/** @type {Array<Phaser.GameObjects.Text|Phaser.GameObjects.Image>} */
	ui_layer;

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

	this.startAutoQuitTimer();

    // this.quit_button.setInteractive();
    // this.quit_button.on("pointerup", () => {
    //   this.scene.stop();
    //   const levelScene = this.scene.get("Level");
    //   levelScene.gameOver(); // clean-up Level scene
    //   // this.scene.stop("Level");
    // });
  }

  startAutoQuitTimer() {
    let timeLeft = 5;
    this.timer_text.setText(timeLeft);

    this.autoQuitTimer = this.time.addEvent({
      delay: 1000,
      callback: () => {
        timeLeft--;
        this.timer_text.setText(timeLeft);

        if (timeLeft <= 0) {
          this.autoQuit();
        }
      },
      repeat: 4
    });
  }

  autoQuit() {
    this.scene.stop();
    const levelScene = this.scene.get("Level");
    levelScene.gameOver(); // clean-up Level scene
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
		this.countDown()
        // this.scene.stop();
        // this.scene.resume("Level");
      });
    }
  }

  subtractGems(amount) {
    let user_data = JSON.parse(localStorage.getItem("user_data"));
    user_data.profile.player.total_gems -= amount;
    this.game.events.emit("updateUserEvent", { data: user_data });
  }

  countDown() {
	if (this.autoQuitTimer) {
		this.autoQuitTimer.remove();
	}
	  
	this.screenWidth = this.cameras.main.width;
	this.screenHeight = this.cameras.main.height;
	this.screenCenterX = this.cameras.main.worldView.x + this.screenWidth / 2;
	this.screenCenterY = this.cameras.main.worldView.y + this.screenHeight / 2;
	let countdown_sfx = this.sound.add("countdown_sfx", {
	  volume: 0.7,
	  loop: false,
	});

	this.ui_layer.forEach((child) => {
	  child.setAlpha(0);
	  child.setScale(0);
	});

	// this.overlay.setDepth(5);

	this.initialTime = 3;
	this.continuing_text = this.add
	.text(this.screenCenterX, this.screenCenterY - 50, "Continuing In: ", {
	  fontFamily: "DINPro",
	  fontSize: "20px",
	  fill: "#fe500b",
	})
	.setOrigin(0.5, 1)
	.setDepth(6)
	.setScale(0)
	.setAlpha(0);

	this.tweens.add({
		targets: this.continuing_text,
		scale: 1,
		alpha: 1,
		ease: "Linear",
		duration: 100,
	  });

	this.countDownText = this.add
	  .text(this.screenCenterX, this.screenCenterY + 20, this.initialTime, {
		fontFamily: "Righteous-Regular",
		fontSize: "65px",
		fill: "#fe500b",
	  })
	  .setOrigin(0.5, 0.5)
	  .setDepth(6)
	  .setScale(1)
	  .setAlpha(1);

	this.tweens.add({
	  targets: [this.countDownText],
	  scaleX: 2,
	  scaleY: 2,
	  alpha: 0.1,
	  duration: 250, // Reduced duration for faster animation
	  yoyo: true,
	  ease: "Power2",
	});

	countdown_sfx.play();

	const intervalId = setInterval(() => {
	  this.initialTime--;
	  this.countDownText.setText(this.initialTime);

	  if (this.initialTime === 0) {
		this.sound.play("Last Countdown Beep_Sfx", { volume: 1, loop: false });
	  } else {
		countdown_sfx.play();
	  }

	  this.tweens.add({
		targets: [this.countDownText],
		scaleX: 2,
		scaleY: 2,
		alpha: 0.1,
		duration: 250, // Reduced duration for faster animation
		yoyo: true,
		ease: "Power2",
	  });

	  if (this.initialTime <= 0) {
		this.countDownText.destroy();
		this.continuing_text.destroy();

		this.tweens.add({
		  targets: this.overlay,
		  alpha: 0,
		  ease: "Linear",
		  duration: 250, // Reduced duration for faster fade out
		  onComplete: () => {
			this.overlay.setVisible(false);
			this.overlay.setAlpha(1);
		  },
		});

		// this.createMusic();
		// this.createTileGroup();
		// this.pause_btn.setInteractive().setDepth(50);
		// clearInterval(intervalId);

		this.scene.stop();
        this.scene.resume("Level");
		clearInterval(intervalId);


	  }
	}, 1000); // Reduced interval for faster countdown
  }

  /* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
