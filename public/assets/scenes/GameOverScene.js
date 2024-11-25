// You can write more code here

/* START OF COMPILED CODE */

class GameOverScene extends Phaser.Scene {

	constructor() {
		super("GameOverScene");

		/* START-USER-CTR-CODE */
    // Write your code here.
    /* END-USER-CTR-CODE */
	}

	/** @returns {void} */
	editorCreate() {

		// hub_background
		const hub_background = this.add.image(180, 320, "summary_BG");
		hub_background.scaleX = 0.3333;
		hub_background.scaleY = 0.3333;

		// bottom_banner
		const bottom_banner = this.add.image(180, 606.5033500000001, "Bottom banner");
		bottom_banner.scaleX = 0.3333;
		bottom_banner.scaleY = 0.3333;

		// top_banner
		const top_banner = this.add.image(180, 27.497249999999998, "Top banner");
		top_banner.scaleX = 0.3333;
		top_banner.scaleY = 0.3333;

		// round_frame
		const round_frame = this.add.image(180, 238, "Round Frame");
		round_frame.scaleX = 0.3333;
		round_frame.scaleY = 0.3333;

		// current_score
		const current_score = this.add.text(180, 434, "", {});
		current_score.setOrigin(0.5, 0.5);
		current_score.text = "00000";
		current_score.setStyle({ "color": "#faf05e", "fontFamily": "Afolkalips", "fontSize": "45px", "stroke": "#faf05e" });

		// song_name
		const song_name = this.add.text(180, 99, "", {});
		song_name.setOrigin(0.5, 0.5);
		song_name.text = "song_name";
		song_name.setStyle({ "color": "#ff6a00", "fontFamily": "Afolkalips", "fontSize": "30px", "stroke": "#ff6a00" });

		// artist_name
		const artist_name = this.add.text(180, 68, "", {});
		artist_name.setOrigin(0.5, 0.5);
		artist_name.text = "artist_name";
		artist_name.setStyle({ "color": "#faf05e", "fontFamily": "Carlito-Regular", "fontSize": "8px", "stroke": "#faf05e" });

		// star_empty_4
		const star_empty_4 = this.add.image(260, 376, "Star_Inactive");
		star_empty_4.scaleX = 0.3333;
		star_empty_4.scaleY = 0.3333;

		// star_empty_3
		const star_empty_3 = this.add.image(220, 375, "Star_Inactive");
		star_empty_3.scaleX = 0.3333;
		star_empty_3.scaleY = 0.3333;

		// star_empty_2
		const star_empty_2 = this.add.image(180, 375, "Star_Inactive");
		star_empty_2.scaleX = 0.3333;
		star_empty_2.scaleY = 0.3333;

		// star_empty_1
		const star_empty_1 = this.add.image(140, 375, "Star_Inactive");
		star_empty_1.scaleX = 0.3333;
		star_empty_1.scaleY = 0.3333;

		// star_empty
		const star_empty = this.add.image(100, 375, "Star_Inactive");
		star_empty.scaleX = 0.3333;
		star_empty.scaleY = 0.3333;

		// retry_button
		const retry_button = this.add.image(180, 586, "Retry button");
		retry_button.scaleX = 0.3333;
		retry_button.scaleY = 0.3333;

		// carousel
		const carousel = this.add.image(180, 238, "carousel_2");
		carousel.scaleX = 0.6;
		carousel.scaleY = 0.6;

		// continue_button
		const continue_button = this.add.image(180, 515, "Continue");
		continue_button.scaleX = 0.3333;
		continue_button.scaleY = 0.3333;

		// no_of_stars
		const no_of_stars = this.add.image(53, 22, "No of stars");
		no_of_stars.scaleX = 0.3333;
		no_of_stars.scaleY = 0.3333;

		// difficulty_text
		const difficulty_text = this.add.text(323, 21, "", {});
		difficulty_text.setOrigin(0.5, 0.5);
		difficulty_text.text = "MEDIUM";
		difficulty_text.setStyle({ "color": "#faf05e", "fontFamily": "Carlito-Regular", "fontSize": "12px", "stroke": "#faf05e" });

		// total_stars_text
		const total_stars_text = this.add.text(47, 22, "", {});
		total_stars_text.setOrigin(0.5, 0.5);
		total_stars_text.text = "000";
		total_stars_text.setStyle({ "color": "#faf05e", "fontFamily": "Carlito-Regular", "fontSize": "15px", "stroke": "#faf05e" });

		// lists
		const stars = [star_empty, star_empty_1, star_empty_2, star_empty_3, star_empty_4];

		this.round_frame = round_frame;
		this.current_score = current_score;
		this.song_name = song_name;
		this.artist_name = artist_name;
		this.retry_button = retry_button;
		this.carousel = carousel;
		this.continue_button = continue_button;
		this.difficulty_text = difficulty_text;
		this.total_stars_text = total_stars_text;
		this.stars = stars;

		this.events.emit("scene-awake");
	}

	/** @type {Phaser.GameObjects.Image} */
	round_frame;
	/** @type {Phaser.GameObjects.Text} */
	current_score;
	/** @type {Phaser.GameObjects.Text} */
	song_name;
	/** @type {Phaser.GameObjects.Text} */
	artist_name;
	/** @type {Phaser.GameObjects.Image} */
	retry_button;
	/** @type {Phaser.GameObjects.Image} */
	carousel;
	/** @type {Phaser.GameObjects.Image} */
	continue_button;
	/** @type {Phaser.GameObjects.Text} */
	difficulty_text;
	/** @type {Phaser.GameObjects.Text} */
	total_stars_text;
	/** @type {Phaser.GameObjects.Image[]} */
	stars;

	/* START-USER-CODE */

  // Write your code here
  init(data) {
    this.track = data.track;

    this.current_track = this.sound.add(data.track.song_name);
    this.current_track.play();
    this.current_track.pause();

    // console.log(this.track);
  }

  create() {
    console.log("GameOverScene.js create()");

    this.editorCreate();
    this.adjustViewport();
    const router = this.registry.get("router");

    this.newLevelAchieved = false;

    // this.cameras.main.fadeIn(500);

    this.artist_name.setText(this.track.artist_name.toUpperCase());
    this.song_name.setText(this.track.song_name);
    // this.current_score.setText(Math.trunc(this.track.current_score))
    this.setStars(this.track.current_score);
    this.stars.forEach((star) => {
      star.setDepth(2);
    });
    // Create circular mask for carousel
    const maskGraphics = this.add.graphics();
    // Set the graphics position to match carousel
    maskGraphics.clear();
    maskGraphics.fillStyle(0xffffff);
    maskGraphics.beginPath();
    maskGraphics.arc(180, 238, 100, 0, Math.PI * 2);
    maskGraphics.closePath();
    maskGraphics.fill();

    // Set carousel texture first
    this.carousel.setTexture(this.track.thumbnail);

    // Create and apply the mask
    const mask = new Phaser.Display.Masks.GeometryMask(this, maskGraphics);
    this.carousel.setMask(mask);

    // Hide the mask graphics - this is crucial!
    maskGraphics.setVisible(false);

    // Store mask references for cleanup
    this.carouselMask = mask;
    this.maskGraphics = maskGraphics;

    this.retry_button.setInteractive();
    this.retry_button.on("pointerup", () => {
      // start_sfx.play();
      this.current_track.stop();
      this.scoreTickSound.stop();
      // background_music.stop()
      this.scene.stop("GameOverScene");
      this.scene.start("Level", { track: this.track, midi: this.track.midi });
    });

    this.continue_button.setInteractive();
    this.continue_button.on("pointerup", () => {
      // start_sfx.play();
      this.current_track.stop();
      this.scoreTickSound.stop();
      this.scene.stop("GameOverScene");

      const updatedUserData = JSON.parse(localStorage.getItem("user_data"));
      const newLevel = updatedUserData.profile.player.level;
      router.push({
        pathname: "/",
        query: { newLevelAchieved: this.newLevelAchieved, newLevel: newLevel },
      });
    });

    this.buildScreen();
    this.animateScore();

    this.cameras.main.fadeIn(500);
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
  animateScore() {
    let startingScore = 0;
    let targetScore = Math.trunc(this.track.current_score);

    // Load the sound effect
    this.scoreTickSound = this.sound.add("Score_Counter_Sfx");
    this.scoreTickSound.setLoop(false); // If you want to loop the sound

    this.scoreTickSound.play();
    // create a tween that updates the scoreText
    this.tweens.addCounter({
      from: startingScore,
      to: targetScore,
      duration: 2000, // adjust this for how long the animation should take
      ease: Phaser.Math.Easing.Linear, // linear easing
      onUpdate: (tween) => {
        // round the tweened value and set scoreText
        this.current_score.setText(Math.round(tween.getValue()));
      },
      onComplete: () => {
        // Stop the sound effect
        this.scoreTickSound.stop();

        // this.current_track.seek = this.current_track.duration / 2; // set the position to halfway
        // this.current_track.resume(); // continue playing

        // background_music.play()
        // Scale bounce once the score animation is complete
        this.tweens.add({
          targets: this.current_score,
          scale: { start: 0.8, to: 1 }, // adjust these values for the bounce effect
          yoyo: false, // makes the tween automatically reverse, creating the bounce effect
          duration: 500, // how long one 'bounce' should take
          ease: "Bounce.easeOut", // bounce easing function
        });
      },
    });
  }

  buildScreen() {
    this.retry_button.setDepth(2).setScale(0);
    this.continue_button.setDepth(2).setScale(0);

    this.retry_button.setScale(0);
    this.carousel.setScale(1);

    this.tweens.add({
      targets: [this.artist_name, this.song_name],
      scale: { from: 0, to: 1, duration: 700, ease: "Bounce.easeOut" },

      onComplete: () => {
        this.tweens.add({
          targets: [this.retry_button, this.continue_button],
          scale: {
            from: 0,
            to: 0.3333,
            duration: 700,
            ease: "Bounce.easeOut",
          },
        });
      },
    });
  }

  setStars(score) {
    this.fullStarsCount = this.getStarsFromScore(score);
    let starSound = this.sound.add("Star_Reward_Sfx");

    // Remove existing yellow bar if it exists
    if (this.yellowBar) {
      this.yellowBar.destroy();
    }

    // Create yellow bar
    this.yellowBar = this.add.graphics();
    // this.yellowBar.setDepth(0);

    let activatedStars = 0;

    this.stars.forEach((star, index) => {
      if (index < this.fullStarsCount) {
        this.tweens.add({
          targets: star,
          delay: index * 200,
          onStart: () => {
            star.setTexture("Star Active");
            starSound.play();
            activatedStars++;

            // Animate yellow bar
            if (activatedStars > 1) {
              this.tweens.addCounter({
                from: 0,
                to: 100,
                duration: 200,
                onUpdate: (tween) => {
                  this.yellowBar.clear();
                  this.yellowBar.lineStyle(5, 0xfaf05e, 1);
                  this.yellowBar.beginPath();
                  this.yellowBar.moveTo(this.stars[0].x, this.stars[0].y);

                  for (let i = 1; i < activatedStars; i++) {
                    let progress = i === activatedStars - 1 ? tween.getValue() / 100 : 1;
                    let x = Phaser.Math.Linear(this.stars[i - 1].x, this.stars[i].x, progress);
                    let y = Phaser.Math.Linear(this.stars[i - 1].y, this.stars[i].y, progress);
                    this.yellowBar.lineTo(x, y);
                  }

                  this.yellowBar.strokePath();
                },
              });
            }
          },
          scaleX: { from: 1, to: 0.3333 },
          scaleY: { from: 1, to: 0.3333 },
          duration: 2000,
          ease: "Bounce.easeOut",
        });
      } else {
        star.setTexture("Star_Inactive");
      }
    });

    this.updateData();
  }

  getStarsFromScore(score) {
    let starsCount;

    if (score < 5000) {
      starsCount = 1;
    } else if (score >= 5000 && score < 10000) {
      starsCount = 2;
    } else if (score >= 10000 && score < 15000) {
      starsCount = 3;
    } else if (score >= 15000 && score < 20000) {
      starsCount = 4;
    } else if (score >= 20000) {
      starsCount = 5;
    } else {
      starsCount = 0; // Consider handling unexpected cases
    }

    return starsCount;
  }

  updateData() {
    let updatedUserData = JSON.parse(localStorage.getItem("user_data"));

    const songInstance = updatedUserData.profile.player.player_song_instances.find(
      (instance) => instance.song.id === this.track.id
    );
    if (songInstance) {
      let prevStarCount = 0;
      if (songInstance.no_of_plays !== 0) {
        prevStarCount = this.getStarsFromScore(songInstance.high_score);
      }

      // Update the high score if the current score is higher
      songInstance.high_score = Math.max(songInstance.high_score, this.track.current_score);

      // If it's the first play or if the current stars exceed the stars from the highest score
      if (songInstance.no_of_plays === 0 || this.fullStarsCount > prevStarCount) {
        // Update total stars only if current stars are greater
        updatedUserData.profile.player.total_stars += this.fullStarsCount - (prevStarCount || 0);
      }

      console.log(this.fullStarsCount);
      songInstance.no_of_plays++;

      // Calculate and update player level based on the new total stars
      const totalStars = updatedUserData.profile.player.total_stars;
      const currentLevel = updatedUserData.profile.player.level;
      let newLevel = currentLevel;
      if (totalStars >= 20 && currentLevel < 5) {
        newLevel = 5;
      } else if (totalStars >= 15 && currentLevel < 4) {
        newLevel = 4;
      } else if (totalStars >= 10 && currentLevel < 3) {
        newLevel = 3;
      } else if (totalStars >= 5 && currentLevel < 2) {
        newLevel = 2;
      }
      this.total_stars_text.setText(totalStars);

      // let newLevelAchieved = false;
      // Check if a new level has been achieved
      if (newLevel > currentLevel) {
        updatedUserData.profile.player.level = newLevel;
        this.newLevelAchieved = true; // Set the flag to true if new level is reached
      }

      // let’s give the player 2 Gems for every star they get
      updatedUserData.profile.player.total_gems += this.fullStarsCount * 2;

      // Emit the event with the flag indicating whether a new level has been achieved
      this.game.events.emit("updateUserEvent", { data: updatedUserData });
    }
  }

  /* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
