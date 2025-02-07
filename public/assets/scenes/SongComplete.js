// You can write more code here

/* START OF COMPILED CODE */

class SongComplete extends Phaser.Scene {
  constructor() {
    super("SongComplete");

    /* START-USER-CTR-CODE */
    // Write your code here.
    /* END-USER-CTR-CODE */
  }

  /** @returns {void} */
  editorCreate() {
    // bG
    const bG = this.add.image(180, 320, "BG_1");
    bG.scaleX = 0.3333;
    bG.scaleY = 0.3333;

    // bottom_banner
    const bottom_banner = this.add.image(180, 526.677978515625, "sc_banner");
    bottom_banner.scaleX = 0.3333;
    bottom_banner.scaleY = 0.3333;

    // artist_name
    const artist_name = this.add.text(180, 19, "", {});
    artist_name.setOrigin(0.5, 0.5);
    artist_name.text = "artist_name";
    artist_name.setStyle({ color: "#faf05e", fontFamily: "Carlito-Regular", stroke: "#faf05e" });

    // song_name
    const song_name = this.add.text(180, 42, "", {});
    song_name.setOrigin(0.5, 0.5);
    song_name.text = "song_name";
    song_name.setStyle({
      color: "#ff6a00",
      fontFamily: "Afolkalips",
      fontSize: "30px",
      stroke: "#ff6a00",
    });

    // difficulty_text
    const difficulty_text = this.add.text(180, 72.88130950927734, "", {});
    difficulty_text.setOrigin(0.5, 0.5);
    difficulty_text.text = "MEDIUM DIFFICULTY";
    difficulty_text.setStyle({
      color: "#faf05e",
      fontFamily: "Carlito-Regular",
      fontSize: "12px",
      stroke: "#faf05e",
    });

    // round_frame
    const round_frame = this.add.image(180, 202, "Round Frame");
    round_frame.scaleX = 0.3333;
    round_frame.scaleY = 0.3333;

    // carousel
    const carousel = this.add.image(180, 202, "carousel_2");
    carousel.scaleX = 0.6;
    carousel.scaleY = 0.6;

    // song_complete_txt
    const song_complete_txt = this.add.text(180, 348, "", {});
    song_complete_txt.setOrigin(0.5, 0.5);
    song_complete_txt.text = "Song Complete";
    song_complete_txt.setStyle({
      color: "#faf05e",
      fontFamily: "Afolkalips",
      fontSize: "60px",
      stroke: "#faf05e",
    });

    // youve_earned_txt
    const youve_earned_txt = this.add.text(142, 392, "", {});
    youve_earned_txt.setOrigin(0.5, 0.5);
    youve_earned_txt.text = "You've earned:";
    youve_earned_txt.setStyle({
      color: "#faf05e",
      fontFamily: "Carlito-Regular",
      fontSize: "20px",
    });

    // disc
    const disc = this.add.image(180, 551, "Disc");
    disc.scaleX = 0.4;
    disc.scaleY = 0.4;

    // earn_text
    const earn_text = this.add.text(180, 616, "", {});
    earn_text.setOrigin(0.5, 0.5);
    earn_text.text = "Each new song costs 30 discs";
    earn_text.setStyle({
      align: "center",
      color: "#faf05e",
      fontFamily: "Carlito-Regular",
      fontSize: "20px",
      stroke: "#faf05e",
    });
    earn_text.setWordWrapWidth(250);

    // discs_text
    const discs_text = this.add.text(240, 392, "", {});
    discs_text.setOrigin(0.5, 0.5);
    discs_text.text = "45 discs";
    discs_text.setStyle({ fontFamily: "Carlito-Regular", fontSize: "20px" });

    // you_now_have
    const you_now_have = this.add.text(180, 456.19818115234375, "", {});
    you_now_have.setOrigin(0.5, 0.5);
    you_now_have.text = "YOU NOW HAVE";
    you_now_have.setStyle({ align: "center", fontFamily: "Carlito-Bold", fontSize: "20px" });

    // disc_count_txt
    const disc_count_txt = this.add.text(151, 484, "", {});
    disc_count_txt.setOrigin(0.5, 0.5);
    disc_count_txt.text = "30";
    disc_count_txt.setStyle({ align: "center", fontFamily: "Carlito-Bold", fontSize: "20px" });

    // disc_text_2
    const disc_text_2 = this.add.text(200, 484, "", {});
    disc_text_2.setOrigin(0.5, 0.5);
    disc_text_2.text = "DISCS";
    disc_text_2.setStyle({ align: "center", fontFamily: "Carlito-Bold", fontSize: "20px" });

    this.bottom_banner = bottom_banner;
    this.artist_name = artist_name;
    this.song_name = song_name;
    this.difficulty_text = difficulty_text;
    this.round_frame = round_frame;
    this.carousel = carousel;
    this.song_complete_txt = song_complete_txt;
    this.youve_earned_txt = youve_earned_txt;
    this.disc = disc;
    this.earn_text = earn_text;
    this.discs_text = discs_text;
    this.you_now_have = you_now_have;
    this.disc_count_txt = disc_count_txt;
    this.disc_text_2 = disc_text_2;

    this.events.emit("scene-awake");
  }

  /** @type {Phaser.GameObjects.Image} */
  bottom_banner;
  /** @type {Phaser.GameObjects.Text} */
  artist_name;
  /** @type {Phaser.GameObjects.Text} */
  song_name;
  /** @type {Phaser.GameObjects.Text} */
  difficulty_text;
  /** @type {Phaser.GameObjects.Image} */
  round_frame;
  /** @type {Phaser.GameObjects.Image} */
  carousel;
  /** @type {Phaser.GameObjects.Text} */
  song_complete_txt;
  /** @type {Phaser.GameObjects.Text} */
  youve_earned_txt;
  /** @type {Phaser.GameObjects.Image} */
  disc;
  /** @type {Phaser.GameObjects.Text} */
  earn_text;
  /** @type {Phaser.GameObjects.Text} */
  discs_text;
  /** @type {Phaser.GameObjects.Text} */
  you_now_have;
  /** @type {Phaser.GameObjects.Text} */
  disc_count_txt;
  /** @type {Phaser.GameObjects.Text} */
  disc_text_2;

  /* START-USER-CODE */

  // Write your code here
  init(data) {
    this.sceneData = data;
  }

  create() {
    this.editorCreate();
    this.adjustViewport();

    this.setupScene();
    this.startAutoTransitionTimer();
  }

  setupScene() {
    // Set text values from passed data
    this.artist_name.setText(this.sceneData.track.artist_name.toUpperCase());
    this.song_name.setText(this.sceneData.track.song_name);

    // Create and setup carousel mask
    const maskGraphics = this.add.graphics();
    maskGraphics.clear();
    maskGraphics.fillStyle(0xffffff);
    maskGraphics.beginPath();
    maskGraphics.arc(180, 202, 100, 0, Math.PI * 2);
    maskGraphics.closePath();
    maskGraphics.fill();

    // Set carousel image
    this.carousel.setTexture(this.sceneData.track.thumbnail);

    // Calculate and apply scale for carousel
    const maskRadius = 100;
    const imageWidth = this.carousel.width;
    const imageHeight = this.carousel.height;
    const scale = Math.max((maskRadius * 2) / imageWidth, (maskRadius * 2) / imageHeight);

    this.carousel.setScale(scale);
    this.carousel.setPosition(180, 202);

    // Apply mask
    const mask = new Phaser.Display.Masks.GeometryMask(this, maskGraphics);
    this.carousel.setMask(mask);
    maskGraphics.setVisible(false);

    // Store mask references
    this.carouselMask = mask;
    this.maskGraphics = maskGraphics;

    // Update disc counts
    this.disc_count_txt.setText(this.sceneData.currentDiscs + this.sceneData.earnedDiscs);

    // Add animations if desired
    this.setupParticleEffects();
    this.animateElements();
  }

  setupParticleEffects() {
    // Setup disc sparkles
    this.sparkleParticles = this.add.particles(0, 0, "disc_flare", {
      speed: { min: 50, max: 100 },
      scale: { start: 0.4, end: 0 },
      lifespan: 1000,
      frequency: 100,
      quantity: 1,
      blendMode: "ADD",
      emitZone: {
        type: "edge",
        source: new Phaser.Geom.Circle(0, 0, 40),
        quantity: 32,
      },
      alpha: { start: 0.6, end: 0 },
      tint: [0xffffff, 0xfff5a6, 0xffed70],
    });

    // Position sparkles at disc position
    this.sparkleParticles.setPosition(this.disc.x, this.disc.y);
    this.sparkleParticles.stop();
    this.sparkleParticles.setVisible(false);

    // Setup confetti burst
    this.confettiParticles = this.add.particles(180, 320, "disc_flare", {
      lifespan: 4000,
      speed: { min: 300, max: 600 },
      angle: { min: 0, max: 360 }, // Burst in all directions
      gravityY: 300,
      scale: { min: 0.4, max: 0.6 },
      quantity: 50, // Single larger burst
      rotate: { start: 0, end: 360, ease: "Back.easeOut" },
      tint: [0xfcb320, 0x5dfe7b, 0xfaf05e, 0xffff00, 0xfe3400, 0x00ffff],
      frequency: -1, // Emit only once
      alpha: { start: 1, end: 0 },
      emitting: false,
    });
  }

  animateElements() {
    this.confettiParticles.explode(500); // Emit 500 particles at once

    const animationSequence = [
      {
        element: this.artist_name,
        startY: -50,
        duration: 300,
      },
      {
        element: this.song_name,
        startY: -30,
        duration: 300,
        delay: 75,
      },
      {
        element: this.difficulty_text,
        startY: 30,
        duration: 300,
        delay: 150,
      },
      {
        element: this.round_frame,
        duration: 350,
        delay: 225,
        fromScaleX: 0.1,
        fromScaleY: 0.1,
        scaleX: 0.3333,
        scaleY: 0.3333,
      },
      {
        element: this.carousel,
        scaleX: this.carousel.scaleX,
        scaleY: this.carousel.scaleY,
        duration: 350,
        delay: 225,
        fromScaleX: 0.1,
        fromScaleY: 0.1,
      },
      {
        element: this.song_complete_txt,
        duration: 300,
        delay: 300,
        fromScaleX: 0.5,
        fromScaleY: 0.5,
        scaleX: 1,
        scaleY: 1,
      },
      {
        element: this.youve_earned_txt,
        startX: -100,
        duration: 300,
        delay: 375,
      },
      {
        element: this.discs_text,
        startX: 100,
        duration: 300,
        delay: 450,
      },
      {
        element: this.bottom_banner,
        startY: 700,
        duration: 300,
        delay: 525,
        scaleX: 0.3333,
        scaleY: 0.3333,
      },
      {
        element: this.disc,
        duration: 300,
        delay: 525,
        fromScaleX: 0.1,
        fromScaleY: 0.1,
        scaleX: 0.4,
        scaleY: 0.4,
        onComplete: () => {
          // Start particle effect after disc appears
          this.sparkleParticles.setVisible(true);
          this.sparkleParticles.start();
        },
      },
      {
        element: this.you_now_have,
        startY: 50,
        duration: 300,
        delay: 600,
      },
      {
        element: this.disc_count_txt,
        duration: 300,
        delay: 675,
        fromScaleX: 0.5,
        fromScaleY: 0.5,
        scaleX: 1,
        scaleY: 1,
      },
      {
        element: this.disc_text_2,
        duration: 300,
        delay: 750,
        fromScaleX: 0.5,
        fromScaleY: 0.5,
        scaleX: 1,
        scaleY: 1,
      },
      {
        element: this.earn_text,
        startY: 700,
        duration: 300,
        delay: 825,
      },
    ];

    animationSequence.forEach(
      ({
        element,
        startY,
        startX,
        scaleX,
        scaleY,
        fromScaleX,
        fromScaleY,
        duration,
        delay,
        onComplete,
      }) => {
        const originalY = element.y;
        const originalX = element.x;

        element.setAlpha(0);

        if (startY !== undefined) {
          element.setY(startY);
        }
        if (startX !== undefined) {
          element.setX(startX);
        }
        if (fromScaleX !== undefined && fromScaleY !== undefined) {
          element.setScale(fromScaleX, fromScaleY);
        }

        const tweenConfig = {
          targets: element,
          alpha: 1,
          duration: duration,
          delay: delay,
          ease: "Back.out",
          onComplete: onComplete,
        };

        if (startY !== undefined) {
          tweenConfig.y = originalY;
        }
        if (startX !== undefined) {
          tweenConfig.x = originalX;
        }
        if (scaleX !== undefined && scaleY !== undefined) {
          tweenConfig.scaleX = scaleX;
          tweenConfig.scaleY = scaleY;
        }

        this.tweens.add(tweenConfig);
      }
    );
  }

  // In SongComplete.js, update the startAutoTransitionTimer method:
  startAutoTransitionTimer() {
    this.time.delayedCall(5000, () => {
      // Update user data first
      let user_data = JSON.parse(localStorage.getItem("user_data"));
      user_data.profile.player.total_discs += this.sceneData.earnedDiscs;
      this.game.events.emit("updateUserEvent", { data: user_data });

      // Remove mask before stopping scene
      if (this.carousel && this.carousel.mask) {
        this.carousel.clearMask();
      }
      if (this.carouselMask) {
        this.carouselMask.destroy();
      }
      if (this.maskGraphics) {
        this.maskGraphics.destroy();
      }

      // Get reference to level scene before stopping current scene
      const levelScene = this.scene.get("Level");

      // Stop current scene
      this.scene.stop();

      if (this.sceneData.isFTUE) {
        levelScene.ftueGameOver();
      } else {
        levelScene.gameOver();
      }
    });
  }

  cleanup() {
    if (this.carouselMask) {
      this.carouselMask.destroy();
    }
    if (this.maskGraphics) {
      this.maskGraphics.destroy();
    }
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

      //   this.adjustTextProperties(scale);
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

  /* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
