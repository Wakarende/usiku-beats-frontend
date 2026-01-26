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
    const current_score = this.add.text(180, 465, "", {});
    current_score.setOrigin(0.5, 0.5);
    current_score.text = "00000";
    current_score.setStyle({
      color: "#faf05e",
      fontFamily: "Afolkalips",
      fontSize: "45px",
      stroke: "#faf05e",
    });

    // song_name
    const song_name = this.add.text(180, 99, "", {});
    song_name.setOrigin(0.5, 0.5);
    song_name.text = "song_name";
    song_name.setStyle({
      color: "#ff6a00",
      fontFamily: "Afolkalips",
      fontSize: "30px",
      stroke: "#ff6a00",
    });

    // artist_name
    const artist_name = this.add.text(180, 68, "", {});
    artist_name.setOrigin(0.5, 0.5);
    artist_name.text = "artist_name";
    artist_name.setStyle({
      color: "#faf05e",
      fontFamily: "Carlito-Regular",
      fontSize: "8px",
      stroke: "#faf05e",
    });

    // star_empty_4
    const star_empty_4 = this.add.image(260, 408, "Star_Inactive");
    star_empty_4.scaleX = 0.3333;
    star_empty_4.scaleY = 0.3333;

    // star_empty_3
    const star_empty_3 = this.add.image(220, 407, "Star_Inactive");
    star_empty_3.scaleX = 0.3333;
    star_empty_3.scaleY = 0.3333;

    // star_empty_2
    const star_empty_2 = this.add.image(180, 407, "Star_Inactive");
    star_empty_2.scaleX = 0.3333;
    star_empty_2.scaleY = 0.3333;

    // star_empty_1
    const star_empty_1 = this.add.image(140, 407, "Star_Inactive");
    star_empty_1.scaleX = 0.3333;
    star_empty_1.scaleY = 0.3333;

    // star_empty
    const star_empty = this.add.image(100, 407, "Star_Inactive");
    star_empty.scaleX = 0.3333;
    star_empty.scaleY = 0.3333;

    // retry_button
    const retry_button = this.add.image(180, 588, "Button_blank");
    retry_button.scaleX = 0.5;
    retry_button.scaleY = 0.7;
    retry_button.setOrigin(0.5, 0.6);

    // carousel
    const carousel = this.add.image(180, 238, "carousel_2");
    carousel.scaleX = 0.6;
    carousel.scaleY = 0.6;

    // continue_button
    const continue_button = this.add.image(181, 524, "Button_blank");
    continue_button.scaleX = 0.4;
    continue_button.scaleY = 0.5;

    // no_of_stars
    const no_of_stars = this.add.image(53, 22, "No of stars");
    no_of_stars.scaleX = 0.3333;
    no_of_stars.scaleY = 0.3333;

    // difficulty_text
    const difficulty_text = this.add.text(323, 21, "", {});
    difficulty_text.setOrigin(0.5, 0.5);
    difficulty_text.text = "MEDIUM";
    difficulty_text.setStyle({
      color: "#faf05e",
      fontFamily: "Carlito-Regular",
      fontSize: "12px",
      stroke: "#faf05e",
    });

    // total_stars_text
    const total_stars_text = this.add.text(47, 22, "", {});
    total_stars_text.setOrigin(0.5, 0.5);
    total_stars_text.text = "000";
    total_stars_text.setStyle({
      color: "#faf05e",
      fontFamily: "Carlito-Regular",
      fontSize: "15px",
      stroke: "#faf05e",
    });

    // continue_text
    const continue_text = this.add.text(181, 524, "", {});
    continue_text.setOrigin(0.5, 0.5);
    continue_text.text = "YOUR SONGS";
    continue_text.setStyle({ fontFamily: "Carlito-Bold", fontSize: "18px" });

    // retry_song_text
    const retry_song_text = this.add.text(180, 584, "", {});
    retry_song_text.setOrigin(0.5, 0.6);
    retry_song_text.text = "RETRY SONG";
    retry_song_text.setStyle({ fontFamily: "Carlito-Bold", fontSize: "22px" });

    // library_button
    const library_button = this.add.image(180, 602, "Button_blank");
    library_button.scaleX = 0.5;
    library_button.scaleY = 0.7;
    library_button.visible = false;

    // library_button_text
    const library_button_text = this.add.text(180, 599, "", {});
    library_button_text.setOrigin(0.5, 0.5);
    library_button_text.visible = false;
    library_button_text.text = "SONG LIBRARY";
    library_button_text.setStyle({ fontFamily: "Carlito-Bold", fontSize: "22px" });

    // gem_outline
    const gem_outline = this.add.image(140, 373, "gem_outline");
    gem_outline.scaleX = 0.25;
    gem_outline.scaleY = 0.25;
    gem_outline.visible = false;

    // gem_count_text
    const gem_count_text = this.add.text(151.55537833529974, 381.02468086157563, "", {});
    gem_count_text.setOrigin(0.5, 0.5);
    gem_count_text.visible = false;
    gem_count_text.text = "5";
    gem_count_text.setStyle({
      color: "#00D100",
      fontFamily: "Carlito-Regular",
      fontSize: "10px",
      stroke: "#00D100",
    });

    // gs_star
    const gs_star = this.add.image(320, 381, "gs_star");
    gs_star.scaleX = 0.3333;
    gs_star.scaleY = 0.3333;

    // ad_button
    const ad_button = this.add.image(317, 440, "gs_ad");
    ad_button.scaleX = 0.2;
    ad_button.scaleY = 0.2;

    // gem_count_text_1
    const gem_count_text_1 = this.add.text(346, 446, "", {});
    gem_count_text_1.setOrigin(0.5, 0.5);
    gem_count_text_1.text = "x2";
    gem_count_text_1.setStyle({ fontFamily: "Carlito-Regular", fontSize: "8px" });

    // gem_outline_1
    const gem_outline_1 = this.add.image(320, 389, "gem_outline");
    gem_outline_1.scaleX = 0.25;
    gem_outline_1.scaleY = 0.25;

    // final_gem_count
    const final_gem_count = this.add.text(320, 365, "", {});
    final_gem_count.setOrigin(0.5, 0.5);
    final_gem_count.text = "0";
    final_gem_count.setStyle({ fontFamily: "Carlito-Regular", fontSize: "12px" });

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
    this.continue_text = continue_text;
    this.retry_song_text = retry_song_text;
    this.library_button = library_button;
    this.library_button_text = library_button_text;
    this.gem_count_text = gem_count_text;
    this.ad_button = ad_button;
    this.gem_count_text_1 = gem_count_text_1;
    this.final_gem_count = final_gem_count;
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
  /** @type {Phaser.GameObjects.Text} */
  continue_text;
  /** @type {Phaser.GameObjects.Text} */
  retry_song_text;
  /** @type {Phaser.GameObjects.Image} */
  library_button;
  /** @type {Phaser.GameObjects.Text} */
  library_button_text;
  /** @type {Phaser.GameObjects.Text} */
  gem_count_text;
  /** @type {Phaser.GameObjects.Image} */
  ad_button;
  /** @type {Phaser.GameObjects.Text} */
  gem_count_text_1;
  /** @type {Phaser.GameObjects.Text} */
  final_gem_count;
  /** @type {Phaser.GameObjects.Image[]} */
  stars;

  /* START-USER-CODE */

  // Write your code here
  init(data) {
    this.track = data.track;
    this.isSongComplete = data.isSongComplete;

    this.current_track = this.sound.add(data.track.song_name);
    this.current_track.play();
    this.current_track.pause();
    this.analytics = this.registry.get("analytics");
    // console.log(this.track);
  }

  create() {
    console.log("GameOverScene.js create()");
    this.analytics.trackSongEnd(
      this.track.song_name,
      this.track.current_score,
      this.isSongComplete
    );

    this.editorCreate();
    this.adjustViewport();
    const router = this.registry.get("router");

    this.newLevelAchieved = false;

    // this.cameras.main.fadeIn(500);

    this.artist_name.setText(this.track.artist_name.toUpperCase());
    this.song_name.setText(this.track.song_name);
    this.difficulty_text.setText(this.track.difficulty.toUpperCase());
    // this.current_score.setText(Math.trunc(this.track.current_score))
    this.setStars(this.track.current_score);
    this.stars.forEach((star) => {
      star.setDepth(2);
    });

    this.adjustThumbnailImage();

    this.retry_button.setInteractive();
    this.retry_button.on("pointerup", () => {
      this.current_track.stop();
      this.scoreTickSound.stop();
      this.analytics.trackUIEvent("GameOverScene", "retry_button");

      this.button_sfx.play();
      this.background_music.stop();
      this.scene.stop("GameOverScene");
      this.scene.start("Level", { track: this.track, midi: this.track.midi });
    });

    this.continue_button.setInteractive();
    this.continue_button.on("pointerup", () => {
      this.analytics.trackUIEvent("GameOverScene", "continue_button");

      this.button_sfx.play();
      this.background_music.stop();
      this.current_track.stop();
      this.scoreTickSound.stop();
      this.scene.stop("GameOverScene");

      const updatedUserData = JSON.parse(localStorage.getItem("user_data"));
      const newLevel = updatedUserData.profile.player.level;

      this.scene.manager.scenes.forEach((scene) => {
        this.scene.stop(scene.scene.key);
      });
      this.game.events.emit("destroyGame");

      localStorage.setItem("newLevelAchieved", JSON.stringify(this.newLevelAchieved));
      localStorage.setItem("newLevel", JSON.stringify(newLevel));
      localStorage.setItem("ftueCompleted", "true"),
        router.push({
          pathname: "/hub",
          query: { fromGame: "true" }

          // query: { newLevelAchieved: this.newLevelAchieved, newLevel: newLevel },
        });

      this.triggerFullScreen();
    });

    // this.library_button.setInteractive();
    // this.library_button.on("pointerup", () => {
    //   this.analytics.trackUIEvent("GameOverScene", "library_button");

    //   this.button_sfx.play();
    //   this.background_music.stop();
    //   this.current_track.stop();
    //   this.scoreTickSound.stop();
    //   this.scene.stop("GameOverScene");

    //   const updatedUserData = JSON.parse(localStorage.getItem("user_data"));
    //   const newLevel = updatedUserData.profile.player.level;

    //   this.scene.manager.scenes.forEach((scene) => {
    //     this.scene.stop(scene.scene.key);
    //   });
    //   this.game.events.emit("destroyGame");

    //   localStorage.setItem("newLevelAchieved", JSON.stringify(this.newLevelAchieved));
    //   localStorage.setItem("newLevel", JSON.stringify(newLevel));
    //   router.push({
    //     pathname: "/library",
    //     query: { fromGame: "true" }
    //     // query: { newLevelAchieved: this.newLevelAchieved, newLevel: newLevel },
    //   });
    //   this.triggerFullScreen();
    // });

    // Initialize rewarded ad placement early - disable button initially
    this.ad_button.disableInteractive();
    this.ad_button.setTint(0x888888);
    this.showRewardedAdFn = null;

    // Initialize ad placement to check availability
    if (window.adBreak) {
      console.log("Initializing rewarded ad placement");
      window.adBreak({
        type: 'reward',
        name: 'gameover_double_gems',
        beforeReward: (showAdFn) => {
          console.log("Rewarded ad available - enabling button");
          // Ad is available - store showAdFn and enable button
          this.showRewardedAdFn = showAdFn;
          this.ad_button.setInteractive();
          this.ad_button.clearTint();
        },
        beforeAd: () => {
          console.log("Preparing to show ad");

          // Disable pointer events on canvas so ad can be clicked
          const canvas = document.querySelector('canvas');
          if (canvas) {
            canvas.style.pointerEvents = 'none';
          }

          // Track when ad started for minimum view time check
          this.adStartTime = Date.now();
          // Pause before ad shows
          this.background_music.pause();
          if (this.current_track) {
            this.current_track.pause();
          }
          if (this.scoreTickSound) {
            this.scoreTickSound.pause();
          }
        },
        adViewed: () => {
          console.log("User watched ad to completion");
          this.analytics.trackUIEvent("GameOverScene", "ad_viewed_complete");
          // Don't grant reward here - let afterAd handle it
        },
        adDismissed: () => {
          console.log("User dismissed ad");
          this.analytics.trackUIEvent("GameOverScene", "ad_dismissed");
          // Don't handle reward/resume here - let afterAd handle everything
        },
        afterAd: () => {
          const adViewTime = this.adStartTime ? (Date.now() - this.adStartTime) / 1000 : 0;
          console.log(`Ad finished after ${adViewTime.toFixed(1)}s`);

          // Restore canvas pointer events
          const canvas = document.querySelector('canvas');
          if (canvas) {
            canvas.style.pointerEvents = 'auto';
          }

          // If viewed for 5+ seconds, grant reward
          if (adViewTime >= 5) {
            console.log("Minimum view time met - granting reward");
            this.analytics.trackUIEvent("GameOverScene", "ad_reward_granted");
            this.rewardGemsAfterAd(); // Handles gem doubling
          } else {
            console.log("Dismissed too early - no reward");
            // Resume music only (no timer in GameOverScene)
            this.background_music.resume();
            this.handleAdFailure();
          }

          // Reset time tracking
          this.adStartTime = null;
        },
        adBreakDone: (placementInfo) => {
          console.log("Ad break done", placementInfo);
          this.analytics.trackUIEvent(
            "GameOverScene",
            "ad_break_done",
            placementInfo?.breakStatus || "unknown"
          );
        },
      });
    } else {
      console.log("H5 Ad Placement API not available");
      this.analytics.trackUIEvent("GameOverScene", "h5_api_unavailable");
    }

    // Set up button click handler
    this.ad_button.on("pointerup", () => {
      if (this.showRewardedAdFn) {
        console.log("User clicked to watch ad");
        this.analytics.trackUIEvent("GameOverScene", "user_clicked_watch_ad");
        // Call the stored showAdFn from user interaction
        this.showRewardedAdFn();
        // Clear the function so it can only be called once
        this.showRewardedAdFn = null;
        this.ad_button.disableInteractive();
        this.ad_button.setTint(0x888888);
      }
    });

    this.buildScreen();
    this.animateScore();

    this.button_sfx = this.registry.get("button_sfx");
    this.background_music = this.registry.get("background_music");
    this.background_music.play();

    this.cameras.main.fadeIn(500);

    // this.adjustButtons();
  }

  async triggerFullScreen() {
    try {
      if (document.documentElement.requestFullscreen) {
        await document.documentElement.requestFullscreen();
      } else {
        console.warn("Fullscreen API is not supported");
      }
    } catch (err) {
      console.error("Error enabling full-screen mode:", err);
    }
  }
  // adjustButtons() {
  //   let updatedUserData = JSON.parse(localStorage.getItem("user_data"));

  //   if (updatedUserData.profile.player.total_discs < 30) {
  //     this.library_button.disableInteractive();
  //     this.library_button.setVisible(false);
  //     this.library_button_text.setVisible(false);

  //     if (this.isSongComplete || this.fullStarsCount > 3) {
  //       const retryButtonY = this.retry_button.y;
  //       const retrySongTextY = this.retry_song_text.y;
  //       const continueButtonY = this.continue_button.y + 3;
  //       const continueTextY = this.continue_text.y + 2;

  //       // Then set the new positions
  //       this.retry_button.setY(continueButtonY);
  //       this.retry_song_text.setY(continueTextY);

  //       this.continue_button.setY(retryButtonY);
  //       this.continue_text.setY(retrySongTextY);

  //       this.continue_button.setScale(0.5, 0.7);
  //       this.continue_text.setScale(this.continue_text.scale * 1.5);
  //       this.continue_button.setY(this.continue_button.y + 10);
  //       this.continue_text.setY(this.continue_text.y + 10);
  //     }

  //     if (this.fullStarsCount <= 3) {
  //       this.retry_button.setScale(0.5, 0.7);
  //       this.retry_song_text.setScale(this.retry_song_text.scale * 1.5);
  //       this.retry_button.setY(this.retry_button.y + 10);
  //       this.retry_song_text.setY(this.retry_song_text.y + 10);
  //     }
  //   }
  // }

  adjustThumbnailImage() {
    // Create circular mask for carousel
    const maskGraphics = this.add.graphics();
    maskGraphics.clear();
    maskGraphics.fillStyle(0xffffff);
    maskGraphics.beginPath();
    maskGraphics.arc(180, 238, 100, 0, Math.PI * 2);
    maskGraphics.closePath();
    maskGraphics.fill();

    // Set carousel texture first
    this.carousel.setTexture(this.track.thumbnail);

    // Calculate the scale to fit the image within the circular mask
    const maskRadius = 100; // radius of the circular mask
    const imageWidth = this.carousel.width;
    const imageHeight = this.carousel.height;
    const scale = Math.max((maskRadius * 2) / imageWidth, (maskRadius * 2) / imageHeight);

    // Apply the calculated scale and center the image
    this.carousel.setScale(scale);
    this.carousel.setPosition(180, 238);

    // Create and apply the mask
    const mask = new Phaser.Display.Masks.GeometryMask(this, maskGraphics);
    this.carousel.setMask(mask);

    // Hide the mask graphics
    maskGraphics.setVisible(false);

    // Store mask references for cleanup
    this.carouselMask = mask;
    this.maskGraphics = maskGraphics;
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
    // this.retry_button.setDepth(2).setScale(0);
    // this.continue_button.setDepth(2).setScale(0);

    // this.retry_button.setScale(0);

    this.tweens.add({
      targets: [this.artist_name, this.song_name],
      scale: { from: 0, to: 1, duration: 700, ease: "Bounce.easeOut" },

      // onComplete: () => {
      //   this.tweens.add({
      //     targets: [this.retry_button, this.continue_button],
      //     scale: {
      //       from: 0,
      //       to: 0.3333,
      //       duration: 700,
      //       ease: "Bounce.easeOut",
      //     },
      //   });
      // },
    });
  }

  setStars(score) {
    this.fullStarsCount = this.getStarsFromScore(score);
    this.gemsEarned = this.getGemsFromStars(this.fullStarsCount);
    this.gem_count_text.setText(this.gemsEarned);
    let starSound = this.sound.add("Star_Reward_Sfx");

    // Remove existing yellow bar and gems if they exist
    if (this.yellowBar) {
      this.yellowBar.destroy();
    }
    if (this.gemImages) {
      this.gemImages.forEach((gem) => gem.destroy());
    }

    // Create yellow bar
    this.yellowBar = this.add.graphics();
    this.gemImages = [];

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

            // Add gem reward for stars 2 and above (index 1+)
            if (index >= 1) {
              const gemOutline = this.add.image(star.x, 373, "gem_outline");
              gemOutline.setScale(0).setDepth(3);

              const totalGemsAtThisStar = this.getGemsFromStars(index + 1);
              const gemText = this.add.text(star.x + 12, 381, totalGemsAtThisStar.toString(), {
                fontFamily: "Carlito-Regular",
                fontSize: "10px",
                color: "#00D100",
                stroke: "#00D100",
              });
              gemText.setOrigin(0.5, 0.5).setDepth(3).setVisible(false);

              this.gemImages.push(gemOutline, gemText);

              // Animate gem outline appearance
              this.tweens.add({
                targets: gemOutline,
                delay: index * 200 + 300,
                scaleX: { from: 0, to: 0.25 },
                scaleY: { from: 0, to: 0.25 },
                duration: 800,
                ease: "Bounce.easeOut",
                onComplete: () => {
                  gemText.setVisible(true);

                  // After gem text appears, animate it moving to final_gem_count position
                  this.tweens.add({
                    targets: gemText,
                    delay: 800, // Wait a bit after appearing
                    x: 320, // final_gem_count x position
                    y: 365, // final_gem_count y position
                    alpha: 0, // Fade out as it moves
                    duration: 600,
                    ease: "Quad.easeInOut",
                    onComplete: () => {
                      // Animate the final_gem_count counter when gem text arrives
                      const currentFinalCount = parseInt(this.final_gem_count.text) || 0;
                      const newFinalCount = currentFinalCount + totalGemsAtThisStar;

                      this.tweens.addCounter({
                        from: currentFinalCount,
                        to: newFinalCount,
                        duration: 400,
                        ease: "Quad.easeOut",
                        onUpdate: (tween) => {
                          this.final_gem_count.setText(Math.round(tween.getValue()).toString());
                        },
                        onComplete: () => {
                          // Small bounce effect when counting completes
                          this.tweens.add({
                            targets: this.final_gem_count,
                            scaleX: 1.2,
                            scaleY: 1.2,
                            duration: 100,
                            ease: "Quad.easeOut",
                            yoyo: true,
                            onComplete: () => {
                              // Ensure scale is exactly 1 after animation
                              this.final_gem_count.setScale(1);
                            },
                          });
                        },
                      });

                      // Remove the moved gem text
                      gemText.destroy();
                    },
                  });
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

    if (score < 18000) {
      starsCount = 0;
    } else if (score >= 18000 && score < 36000) {
      starsCount = 1;
    } else if (score >= 36000 && score < 54000) {
      starsCount = 2;
    } else if (score >= 54000 && score < 72000) {
      starsCount = 3;
    } else if (score >= 72000 && score < 90000) {
      starsCount = 4;
    } else if (score >= 90000) {
      starsCount = 5;
    } else {
      starsCount = 0; // Handle unexpected cases
    }

    return starsCount;
  }

  getGemsFromStars(starsCount) {
    if (starsCount <= 1) return 0;
    return (starsCount - 1) * 5;
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

      // Award gems based on stars earned (5 gems per star after the first)
      if (this.gemsEarned > 0) {
        updatedUserData.profile.player.total_gems += this.gemsEarned;
      }

      // Emit the event with the flag indicating whether a new level has been achieved
      this.game.events.emit("updateUserEvent", { data: updatedUserData });
    }
  }


  handleAdFailure() {
    // Clear the stored ad function - user dismissed without reward
    this.showRewardedAdFn = null;
  }

  rewardGemsAfterAd() {
    const doubledGems = this.gemsEarned * 2;

    // Update UI immediately
    const currentFinalCount = parseInt(this.final_gem_count.text) || 0;
    const newFinalCount = currentFinalCount + doubledGems;

    this.tweens.addCounter({
      from: currentFinalCount,
      to: newFinalCount,
      duration: 1000,
      ease: "Quad.easeOut",
      onUpdate: (tween) => {
        this.final_gem_count.setText(Math.round(tween.getValue()).toString());
      },
      onComplete: () => {
        this.tweens.add({
          targets: this.final_gem_count,
          scaleX: 1.2,
          scaleY: 1.2,
          duration: 200,
          ease: "Quad.easeOut",
          yoyo: true,
          onComplete: () => {
            this.final_gem_count.setScale(1);
          },
        });
      },
    });

    // Delay localStorage access to allow iOS Safari to restore access after ad iframe
    this.time.delayedCall(300, () => {
      try {
        let user_data = JSON.parse(localStorage.getItem("user_data"));

        if (!user_data || !user_data.profile) {
          console.error("Unable to access user_data - reward failed");
          this.analytics.trackUIEvent("GameOverScene", "ad_reward_failed_no_userdata");
        } else {
          user_data.profile.player.total_gems += doubledGems;
          this.game.events.emit("updateUserEvent", { data: user_data });
          this.analytics.trackUIEvent("GameOverScene", "ad_reward_given");
        }
      } catch (error) {
        console.error("Error in rewardGemsAfterAd:", error);
        this.analytics.trackUIEvent("GameOverScene", "ad_reward_error");
      }
    });
  }

  destroy() {
    super.destroy();
  }

  /* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
