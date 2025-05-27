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

		// black_background
		const black_background = this.add.image(180, 320, "BG_1");
		black_background.scaleX = 0.3333;
		black_background.scaleY = 0.3333;

		// bm_BG
		const bm_BG = this.add.image(180, 320, "bm_BG");
		bm_BG.scaleX = 0.3333;
		bm_BG.scaleY = 0.3333;

		// Beat_Missed_Text
		const beat_Missed_Text = this.add.text(180, 182, "", {});
		beat_Missed_Text.setOrigin(0.5, 0.5);
		beat_Missed_Text.text = "Missed \na Beat";
		beat_Missed_Text.setStyle({ "align": "center", "color": "#fe3400", "fontFamily": "Afolkalips", "fontSize": "60px", "stroke": "#fe3400" });

		// timer_text
		const timer_text = this.add.text(199, 609, "", {});
		timer_text.setOrigin(0.5, 0.5);
		timer_text.text = "5";
		timer_text.setStyle({ "color": "#fcb320", "fontFamily": "Carlito-BoldItalic", "fontSize": "24px", "stroke": "#fcb320" });

		// continue_btn
		const continue_btn = this.add.image(180, 541, "bm_continue");
		continue_btn.scaleX = 0.3333;
		continue_btn.scaleY = 0.3333;

		// gem_small
		const gem_small = this.add.image(79, 538, "Gem_small");
		gem_small.scaleX = 0.3333;
		gem_small.scaleY = 0.3333;

		// gem_count
		const gem_count = this.add.text(106, 538, "", {});
		gem_count.setOrigin(0.5, 0.5);
		gem_count.text = "5";
		gem_count.setStyle({ "color": "#000", "fontFamily": "Afolkalips", "fontSize": "30px", "stroke": "#000" });

		// timer_icon
		const timer_icon = this.add.image(170, 607, "Timer_icon");
		timer_icon.scaleX = 0.5;
		timer_icon.scaleY = 0.5;

		// motivation_text
		const motivation_text = this.add.text(183, 425, "", {});
		motivation_text.setOrigin(0.5, 0.5);
		motivation_text.text = "You missed a beat! Continue from where you left off, or wait to see your score.";
		motivation_text.setStyle({ "align": "center", "fontFamily": "Carlito-Italic", "fontSize": "20px", "maxLines":4});
		motivation_text.setWordWrapWidth(300);

		// motivation_text_1
		const motivation_text_1 = this.add.text(152, 487, "", {});
		motivation_text_1.setOrigin(0.5, 0.5);
		motivation_text_1.text = "You have";
		motivation_text_1.setStyle({ "align": "center", "fontFamily": "Carlito-Italic", "fontSize": "20px", "maxLines":4});
		motivation_text_1.setWordWrapWidth(300);

		// total_gem_count_txt
		const total_gem_count_txt = this.add.text(208, 488, "", {});
		total_gem_count_txt.setOrigin(0.5, 0.5);
		total_gem_count_txt.text = "15";
		total_gem_count_txt.setStyle({ "align": "center", "fontFamily": "Carlito-Italic", "fontSize": "20px", "maxLines":4});
		total_gem_count_txt.setWordWrapWidth(300);

		// gem_outline
		const gem_outline = this.add.image(240, 488, "gem_outline");
		gem_outline.scaleX = 0.2;
		gem_outline.scaleY = 0.2;

		// lists
		const ui_layer = [gem_count, beat_Missed_Text, continue_btn, gem_small, timer_icon, motivation_text, bm_BG, timer_text];

		this.black_background = black_background;
		this.timer_text = timer_text;
		this.continue_btn = continue_btn;
		this.gem_count = gem_count;
		this.motivation_text = motivation_text;
		this.total_gem_count_txt = total_gem_count_txt;
		this.ui_layer = ui_layer;

		this.events.emit("scene-awake");
	}

	/** @type {Phaser.GameObjects.Image} */
	black_background;
	/** @type {Phaser.GameObjects.Text} */
	timer_text;
	/** @type {Phaser.GameObjects.Image} */
	continue_btn;
	/** @type {Phaser.GameObjects.Text} */
	gem_count;
	/** @type {Phaser.GameObjects.Text} */
	motivation_text;
	/** @type {Phaser.GameObjects.Text} */
	total_gem_count_txt;
	/** @type {Array<Phaser.GameObjects.Text|Phaser.GameObjects.Image>} */
	ui_layer;

	/* START-USER-CODE */

  // Write your code here

  create() {
    this.analytics = this.registry.get("analytics");

    this.editorCreate();
    this.adjustViewport();
    console.log("BeatMissed create.js()");
    this.cameras.main.shake(500, 0.0025);

    const scratch_sound = this.sound.add("scratch_sound", { volume: 0.7, loop: false });
    scratch_sound.play();

    this.button_sfx = this.registry.get("button_sfx");
    this.background_music = this.registry.get("background_music");
    this.background_music.play();

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

  adjustViewport() {
    this.rexScaleOuter.scale();
    const baseWidth = 360;
    const baseHeight = 640;
    const targetWidth = 720;
    const targetHeight = 1280;

    var viewport = new Phaser.Geom.Rectangle();

    var UpdateViewport = function () {
      var innerViewport = this.rexScaleOuter.innerViewport;
      var scaleX = targetWidth / baseWidth;
      var scaleY = targetHeight / baseHeight;
      var scale = Math.min(scaleX, scaleY);

      var newWidth = baseWidth * scale;
      var newHeight = baseHeight * scale;
      var x = (targetWidth - newWidth) / 2;
      var y = (targetHeight - newHeight) / 2;

      viewport.setTo(x, y, newWidth, newHeight);
      this.cameras.main.setViewport(viewport.x, viewport.y, viewport.width, viewport.height);
      this.cameras.main.setZoom(scale);
      this.cameras.main.centerOn(baseWidth / 2, baseHeight / 2);

      this.adjustTextProperties(scale);
    }.bind(this);

    // this.scale.on("resize", UpdateViewport);
    UpdateViewport();
  }

  adjustTextProperties(scale) {
    this.children.list.forEach((child) => {
      if (child instanceof Phaser.GameObjects.Text) {
        // Font size adjustment
        if (!child.originalFontSize) {
          child.originalFontSize = parseInt(child.style.fontSize);
        }
        const newSize = Math.round(child.originalFontSize * scale);
        child.setScale(0.5).setFontSize(`${newSize}px`);

        // Word wrap width adjustment
        if (child.style.wordWrapWidth) {
          if (!child.originalWordWrapWidth) {
            child.originalWordWrapWidth = child.style.wordWrapWidth;
          }
          const newWrapWidth = Math.round(child.originalWordWrapWidth * scale);
          child.setWordWrapWidth(newWrapWidth);
        }

        // Padding adjustment
        if (child.padding) {
          if (!child.originalPadding) {
            child.originalPadding = { ...child.padding };
          }
          child.setPadding({
            left: Math.round(child.originalPadding.left * scale),
            right: Math.round(child.originalPadding.right * scale),
            top: Math.round(child.originalPadding.top * scale),
            bottom: Math.round(child.originalPadding.bottom * scale),
          });
        }

        // Line spacing adjustment
        if (child.lineSpacing !== undefined) {
          if (child.originalLineSpacing === undefined) {
            child.originalLineSpacing = child.lineSpacing;
          }
          child.setLineSpacing(Math.round(child.originalLineSpacing * scale));
        }
      }
    });
  }

  startAutoQuitTimer() {
    let timeLeft = 4;
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
      repeat: 3,
    });
  }

  autoQuit() {
    this.background_music.stop();
    this.scene.stop();
    const levelScene = this.scene.get("Level");
    levelScene.gameOver(); // clean-up Level scene
  }

  checkGems() {
    let user_data = JSON.parse(localStorage.getItem("user_data"));
    const total_gems = user_data.profile.player.total_gems;

    const continueCost = (this.continueCount + 1) * 5; // Calculate the cost
    this.total_gem_count_txt.setText(total_gems);
    this.gem_count.setText(continueCost);
    // Initially disable the button
    this.continue_btn.disableInteractive();
    // this.continue_btn.setAlpha(0.5); // Optional: make it look disabled

    if (total_gems < continueCost) {
      this.motivation_text.setText(`Insufficient gems to continue. Need ${continueCost} gems.`);
      this.continue_btn.setTint(0x888888); // Gray out the button
    } else {
      // this.motivation_text.setText(`Continue for ${continueCost} gems?`);
      this.continue_btn.clearTint(); // Remove the gray tint

      // Set a timer to enable the button after 1 second
      this.time.delayedCall(800, () => {
        this.continue_btn.setInteractive();
        this.continue_btn.setAlpha(1); // Optional: restore full opacity

        // Add the click event listener here
        this.continue_btn.on("pointerup", () => {
          this.subtractGems(continueCost);
          this.background_music.stop();
          this.countDown();
        });
      });
    }
  }

  subtractGems(amount) {
    let user_data = JSON.parse(localStorage.getItem("user_data"));
    user_data.profile.player.total_gems -= amount;
    this.game.events.emit("updateUserEvent", { data: user_data });

    // Get the current song from the Level scene
    const levelScene = this.scene.get("Level");
    const currentSong = levelScene.songItem || "unknown";

    // Track resource use in analytics, tied to the specific song
    this.analytics.trackResourceUse("Gems", amount, "continue", currentSong);

    this.continueCount++; // Increment the continue count
  }

  countDown() {
    if (this.autoQuitTimer) {
      this.autoQuitTimer.remove();
    }

    this.screenWidth = 360; // this.cameras.main.width;
    this.screenHeight = 640; //this.cameras.main.height;
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
        fontFamily: "Carlito-Italic",
        fontSize: "26px",
        fill: "#fe3400",
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
        fontFamily: "Afolkalips",
        fontSize: "85px",
        fill: "#fe3400",
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
        this.sound.play("countdown_sfx", { volume: 1, loop: false });
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
