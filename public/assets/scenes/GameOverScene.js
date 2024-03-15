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
		this.add.image(180, 320, "hub_background");

		// current_score
		const current_score = this.add.text(180, 444, "", {});
		current_score.setOrigin(0.5, 0.5);
		current_score.text = "00000";
		current_score.setStyle({ "fontFamily": "Righteous-Regular", "fontSize": "40px" });

		// song_name
		const song_name = this.add.text(180, 66, "", {});
		song_name.setOrigin(0.5, 0.5);
		song_name.text = "song_name";
		song_name.setStyle({ "fontFamily": "Righteous-Regular", "fontSize": "22px" });

		// artist_name
		const artist_name = this.add.text(180, 40, "", {});
		artist_name.setOrigin(0.5, 0.5);
		artist_name.text = "artist_name";
		artist_name.setStyle({ "fontFamily": "Righteous-Regular", "fontSize": "15px" });

		// star_empty_4
		const star_empty_4 = this.add.image(240, 402, "star_empty");

		// star_empty_3
		const star_empty_3 = this.add.image(210, 402, "star_empty");

		// star_empty_2
		const star_empty_2 = this.add.image(180, 402, "star_empty");

		// star_empty_1
		const star_empty_1 = this.add.image(150, 402, "star_empty");

		// star_empty
		const star_empty = this.add.image(120, 402, "star_empty");

		// retry_button
		const retry_button = this.add.image(180, 515, "play_button");

		// carousel
		const carousel = this.add.image(180, 229, "carousel_2");

		// continue_button
		const continue_button = this.add.image(180, 586, "play_button_inactive");

		// retrytext
		const retrytext = this.add.text(180, 515, "", {});
		retrytext.setOrigin(0.5, 0.5);
		retrytext.text = "Retry";
		retrytext.setStyle({ "fontFamily": "DINPro", "fontSize": "18px" });

		// continuetext
		const continuetext = this.add.text(180, 586, "", {});
		continuetext.setOrigin(0.5, 0.5);
		continuetext.text = "Song Selector";
		continuetext.setStyle({ "fontFamily": "DINPro", "fontSize": "18px" });

		// lists
		const stars = [star_empty, star_empty_1, star_empty_2, star_empty_3, star_empty_4];

		this.current_score = current_score;
		this.song_name = song_name;
		this.artist_name = artist_name;
		this.retry_button = retry_button;
		this.carousel = carousel;
		this.continue_button = continue_button;
		this.retrytext = retrytext;
		this.continuetext = continuetext;
		this.stars = stars;

		this.events.emit("scene-awake");
	}

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
	retrytext;
	/** @type {Phaser.GameObjects.Text} */
	continuetext;
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
    const router = this.registry.get('router');

    // this.cameras.main.fadeIn(500);

    this.artist_name.setText(this.track.artist_name);
    this.song_name.setText(this.track.song_name);
    // this.current_score.setText(Math.trunc(this.track.current_score))
    this.setStars(this.track.current_score);

    this.carousel.setTexture(this.track.thumbnail);

    this.retry_button.setInteractive();
    this.retry_button.on("pointerup", () => {
      // start_sfx.play();
      this.current_track.stop()
      this.scoreTickSound.stop();
      // background_music.stop()
      this.scene.stop("GameOverScene");
      this.scene.start("Level", { track: this.track, midi: this.track.midi });
    });

    this.continue_button.setInteractive();
    this.continue_button.on("pointerup", () => {
      // start_sfx.play();
      this.current_track.stop()
      this.scoreTickSound.stop();
      this.scene.stop("GameOverScene");
      router.push('/')

      // this.scene.start("BufferScene", { prime: this.track.prime });
    });

    this.buildScreen();
    this.animateScore();

    this.cameras.main.fadeIn(500);
  }

  animateScore() {
    let startingScore = 0;
    let targetScore = Math.trunc(this.track.current_score);

    // Load the sound effect
    this.scoreTickSound = this.sound.add('Score_Counter_Sfx');
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
          scale: { start: 1, to: 1.2 }, // adjust these values for the bounce effect
          yoyo: true, // makes the tween automatically reverse, creating the bounce effect
          duration: 500, // how long one 'bounce' should take
          ease: "Bounce.easeOut", // bounce easing function
        });
      },
    });
  }

  buildScreen() {
    this.retry_button.setDepth(2).setScale(0);
    this.retrytext.setDepth(2).setScale(0);
    this.continue_button.setDepth(2).setScale(0);
    this.continuetext.setDepth(2).setScale(0);

    this.retry_button.setScale(0);
    this.retrytext.setScale(0);
    this.carousel.setScale(0);

    this.tweens.add({
      targets: [this.artist_name, this.song_name],
      scale: { from: 0, to: 1, duration: 700, ease: "Bounce.easeOut" },

      onComplete: () => {
        this.tweens.add({
          targets: [this.carousel],
          scale: {
            from: 0,
            to: 1,
            duration: 700,
            ease: "Bounce.easeOut",
          },
          onComplete: () => {
            this.tweens.add({
              targets: [
                this.retry_button,
                this.continue_button,
                this.retrytext,
                this.continuetext,
              ],
              scale: {
                from: 0,
                to: 1,
                duration: 700,
                ease: "Bounce.easeOut",
              },
              onComplete: () => {
                this.play_emitter = this.add
                  .particles(
                    this.retry_button.x,
                    this.retry_button.y,
                    "Play_active",
                    {
                      lifespan: 500,
                      speed: { min: 100, max: 150 },
                      scale: { start: 0.5, end: 0 },
                      // gravityY: 150,
                      blendMode: "ADD",
                      active: true,
                    }
                  )
                  .setDepth(1.5);
              },
            });
          },
        });
      },
    });
  }

  setStars(score) {
    let fullStarsCount = 0;

    if (score < 20000) {
      fullStarsCount = 1;
    } else if (score >= 20000 && score < 50000) {
      fullStarsCount = 2;
    } else if (score >= 50000 && score < 80000) {
      fullStarsCount = 3;
    } else if (score >= 80000 && score < 95000) {
      fullStarsCount = 4;
    } else if (score > 95000) {
      fullStarsCount = 5;
    }

    let starSound = this.sound.add('Star_Reward_Sfx');

    this.stars.forEach((star, index) => {
      if (index < fullStarsCount) {
        this.tweens.add({
          targets: star,
          delay: index * 200, // delay based on index to make stars appear one by one
          onStart: () => {
            star.setTexture("star_full");

            starSound.play();

            let star_emitter = this.add
              .particles(star.x, star.y, "Play_active", {
                lifespan: 700,
                speed: { min: 100, max: 150 },
                scale: { start: 0.5, end: 0 },
                // gravityY: 150,
                blendMode: "ADD",
                emitting: false,
              })
              .setDepth(1);

            star_emitter.explode(30);
            star_emitter.stop();
          },
          scaleX: { from: 2, to: 1 }, // increased start scale
          scaleY: { from: 2, to: 1 }, // increased start scale
          duration: 2000, // increased duration
          ease: "Bounce.easeOut",
        });
      } else {
        star.setTexture("star_empty");
      }
    });
  }

  /* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
