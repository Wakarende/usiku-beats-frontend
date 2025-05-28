// You can write more code here

/* START OF COMPILED CODE */

class PreloadJ extends Phaser.Scene {

	constructor() {
		super("PreloadJ");

		/* START-USER-CTR-CODE */
    // Write your code here.
    /* END-USER-CTR-CODE */
	}

	/** @returns {void} */
	editorPreload() {

		this.load.pack("asset-pack", "assets/asset-pack.json");
	}

	/** @returns {void} */
	editorCreate() {

		// logos_background
		const logos_background = this.add.image(180, 320, "BG_1");
		logos_background.scaleX = 0.3333;
		logos_background.scaleY = 0.3333;

		// preloader_bottom_banner
		const preloader_bottom_banner = this.add.image(180, 506.0135, "preloader_bottom_banner");
		preloader_bottom_banner.scaleX = 0.3333;
		preloader_bottom_banner.scaleY = 0.3333;

		// loading_thumbnail_text
		const loading_thumbnail_text = this.add.text(180, 229, "", {});
		loading_thumbnail_text.setOrigin(0.5, 0.5);
		loading_thumbnail_text.text = "LOADING COVER...";
		loading_thumbnail_text.setStyle({ "color": "#ff6a00", "fontFamily": "Carlito-Italic", "fontSize": "13px", "fontStyle": "bold", "stroke": "#ff6a00" });

		// preloader_Top_banner
		const preloader_Top_banner = this.add.image(180, 40.6625, "preloader_Top banner");
		preloader_Top_banner.scaleX = 0.3333;
		preloader_Top_banner.scaleY = 0.3333;

		// thumbnail_image
		const thumbnail_image = this.add.image(180, 227, "carousel_2");
		thumbnail_image.visible = false;

		// rectangle_1
		const rectangle_1 = this.add.rectangle(148, 73, 128, 128);
		rectangle_1.scaleX = 3.5006144584682515;
		rectangle_1.scaleY = 0.1;
		rectangle_1.angle = -1;
		rectangle_1.isFilled = true;
		rectangle_1.fillColor = 0;

		// artist_name
		const artist_name = this.add.text(180, 22, "", {});
		artist_name.setOrigin(0.5, 0.5);
		artist_name.text = "artist_name";
		artist_name.setStyle({ "color": "#faf05e", "fontFamily": "Carlito-Regular", "fontSize": "14px", "stroke": "#faf05e" });

		// song_name
		const song_name = this.add.text(180, 45, "", {});
		song_name.setOrigin(0.5, 0.5);
		song_name.text = "song_name";
		song_name.setStyle({ "color": "#ff6a00", "fontFamily": "Afolkalips", "fontSize": "30px", "stroke": "#ff6a00" });

		// loading
		const loading = this.add.image(115, 593, "beat_meter_empty");
		loading.setOrigin(0, 0.5);
		loading.visible = false;

		// percentage
		const percentage = this.add.text(180, 552, "", {});
		percentage.setOrigin(0.5, 0.5);
		percentage.visible = false;
		percentage.text = "0%";
		percentage.setStyle({ "align": "center", "fontFamily": "DINPro-Medium", "fontSize": "15px" });

		// current_asset
		const current_asset = this.add.text(180, 601, "", {});
		current_asset.setOrigin(0.5, 0.5);
		current_asset.visible = false;
		current_asset.text = "null";
		current_asset.setStyle({ "align": "center", "fontSize": "13px" });

		// rectangle
		const rectangle = this.add.rectangle(197, 386, 128, 128);
		rectangle.scaleX = 3.5006144584682515;
		rectangle.scaleY = 0.12;
		rectangle.angle = 2;
		rectangle.visible = false;
		rectangle.isFilled = true;
		rectangle.fillColor = 0;

		// beats_2024_UI___Option_7_Load_song_BG
		const beats_2024_UI___Option_7_Load_song_BG = this.add.image(180, 320, "Beats 2024 UI - Option 7_Load song_BG");
		beats_2024_UI___Option_7_Load_song_BG.scaleX = 0.3333;
		beats_2024_UI___Option_7_Load_song_BG.scaleY = 0.3333;

		// loading_txt
		const loading_txt = this.add.text(180, 565, "", {});
		loading_txt.setOrigin(0.5, 0.5);
		loading_txt.text = "LOADING";
		loading_txt.setStyle({ "color": "#faf05e", "fontFamily": "Carlito-BoldItalic", "stroke": "#faf05e" });

		// play_button
		const play_button = this.add.image(180, 565, "Button_blank");
		play_button.scaleX = 0.5;
		play_button.scaleY = 0.65;
		play_button.visible = false;

		// play_text
		const play_text = this.add.text(180, 565, "", {});
		play_text.setOrigin(0.5, 0.5);
		play_text.visible = false;
		play_text.text = "LEARN TO PLAY";
		play_text.setStyle({ "fontFamily": "Carlito-Bold", "fontSize": "22px" });

		// bio_text
		const bio_text = this.add.text(180, 249, "", {});
		bio_text.setOrigin(0.5, 0.5);
		bio_text.text = "The rhythm game that\ncelebrates Africa's music!";
		bio_text.setStyle({ "align": "center", "fontFamily": "Carlito-Regular", "fontSize": "20px", "maxLines":10});
		bio_text.setLineSpacing(6);
		bio_text.setWordWrapWidth(350);

		// bio_text_1
		const bio_text_1 = this.add.text(180, 488, "", {});
		bio_text_1.setOrigin(0.5, 0.5);
		bio_text_1.text = "Tap, swipe and groove to the\nhottest sounds on the continent ";
		bio_text_1.setStyle({ "align": "center", "fontFamily": "Carlito-Regular", "fontSize": "20px", "maxLines":10});
		bio_text_1.setLineSpacing(6);
		bio_text_1.setWordWrapWidth(350);

		// lists
		const stars = [];

		this.thumbnail_image = thumbnail_image;
		this.artist_name = artist_name;
		this.song_name = song_name;
		this.loading = loading;
		this.percentage = percentage;
		this.current_asset = current_asset;
		this.loading_txt = loading_txt;
		this.play_button = play_button;
		this.play_text = play_text;
		this.bio_text = bio_text;
		this.bio_text_1 = bio_text_1;
		this.stars = stars;

		this.events.emit("scene-awake");
	}

	/** @type {Phaser.GameObjects.Image} */
	thumbnail_image;
	/** @type {Phaser.GameObjects.Text} */
	artist_name;
	/** @type {Phaser.GameObjects.Text} */
	song_name;
	/** @type {Phaser.GameObjects.Image} */
	loading;
	/** @type {Phaser.GameObjects.Text} */
	percentage;
	/** @type {Phaser.GameObjects.Text} */
	current_asset;
	/** @type {Phaser.GameObjects.Text} */
	loading_txt;
	/** @type {Phaser.GameObjects.Image} */
	play_button;
	/** @type {Phaser.GameObjects.Text} */
	play_text;
	/** @type {Phaser.GameObjects.Text} */
	bio_text;
	/** @type {Phaser.GameObjects.Text} */
	bio_text_1;
	/** @type {Array<any>} */
	stars;

	/* START-USER-CODE */

  // Write your code here
  preload() {
    this.load.image(`${this.track.song_name}-thumbnail`, this.track.thumbnail_file);

    this.load.on(`filecomplete-image-${this.track.song_name}-thumbnail`, (p) => {
      // this.add.image(180, 322, `${this.track.song_name}-thumbnail`).setDepth(19);
      this.thumbnail_image.setTexture(`${this.track.song_name}-thumbnail`);
      this.thumbnail_image.visible = true;
      this.adjustThumbnailImage();
    });

    this.createGradient();
    this.editorCreate();
    this.adjustViewport();
    // Start the dot animation and text pulsing
    // this.animateDots();
    this.pulseText();

    this.loading.setOrigin(0, 0.5);
    this.loading.scaleX = 0;

    this.song_name.setText(this.track.song_name);
    this.artist_name.setText(this.track.artist_name.toUpperCase());
    // this.bio_text.setText(this.track.artist.bio.toUpperCase());
    // console.log("this.track.artist.bio", this.track.artist.bio);

    this.load.audio(`${this.track.song_name}`, this.track.mp3_url);

    this.editorPreload();

    this.sprinkle_chime = this.registry.get("sprinkle_chime");
    this.button_sfx = this.registry.get("button_sfx");
    this.background_music = this.registry.get("background_music");
  }

  init(data) {
    this.track = data.track;
    this.track.mp3_url = this.track.mp3_file;
    this.track.midi_url = this.track.midi_file;
    // this.track.mp3_url = "./assets/sounds/SoundScape/Score_Counter_Sfx.mp3";
    // this.track.midi_url = "./assets/sounds/davido.mid"
    this.track.thumbnail = `${this.track.song_name}-thumbnail`;
    this.analytics = this.registry.get("analytics");
    // this.editorCreate();
  }
  async create() {
    console.log("Preload-J.js create()");

    this.midi = await Midi.fromUrl(this.track.midi_url);
    // this.midi = await Midi.fromUrl(`assets/sounds/test.mid`);
    this.loading_txt.setVisible(false);
    this.loading.setVisible(false);

    // this.scale.startFullscreen();
    // this.cameras.main.fadeOut(500); // the number is the duration in ms
    // this.cameras.main.once("camerafadeoutcomplete", () => {
    //   // background_music.stop()
    //   this.scene.start("Level", { track: this.track, midi: this.midi });
    // });

    // Show button and text with pulse animation
    this.play_button.setVisible(true);
    this.play_text.setVisible(true);

    // Add pulse animation to button
    this.tweens.add({
      targets: this.play_button,
      scaleX: { from: 0.35, to: 0.45 },
      scaleY: { from: 0.5, to: 0.6 },
      duration: 1000,
      yoyo: true,
      repeat: -1,
      ease: "Sine.easeInOut",
    });

    // Add pulse animation to text (keeping it simpler to maintain readability)
    this.tweens.add({
      targets: this.play_text,
      scale: { from: 0.4, to: 0.5 },
      duration: 1000,
      yoyo: true,
      repeat: -1,
      ease: "Sine.easeInOut",
    });

    // Create particle effect
    const particles = this.add.particles(180, 593, "button_blank_particle", {
      scale: { start: 1, end: 0 },
      speed: { min: 50, max: 250 },
      angle: { min: 0, max: 360 },
      lifespan: 1000,
      gravityY: 300,
      frequency: -1, // Only emit when explicitly triggered
      blendMode: "ADD",
    });

    // Emit particles once when button appears
    this.sprinkle_chime.play();
    particles.explode(20);

    // Fade out and destroy particles after animation
    this.tweens.add({
      targets: particles,
      alpha: 0,
      duration: 1000,
      onComplete: () => particles.destroy(),
    });

    this.play_button.setInteractive();
    this.play_button.on("pointerup", () => {
      this.analytics.trackFTUEStep("1 - Start");
      let tutorialShown = localStorage.getItem("tutorialShown");
      let nextScene = "Level";

      let ftueCompleted = localStorage.getItem("ftueCompleted");
      let isFTUE = false;
      if (!ftueCompleted || ftueCompleted != "true") {
        isFTUE = true;
      }

      if (!tutorialShown || isFTUE) {
        nextScene = "TutorialScene";
        localStorage.setItem("tutorialShown", true);
      }

      if (this.dotsTimer) {
        this.dotsTimer.remove();
      }
      this.tweens.killTweensOf(this.loading_txt);

      this.scale.startFullscreen();
      this.cameras.main.fadeOut(500);
      this.cameras.main.once("camerafadeoutcomplete", () => {
        this.button_sfx.play();
        this.background_music.stop();
        this.scene.start(nextScene, { track: this.track, midi: this.midi, isFTUE: isFTUE });
      });
    });
  }

  animateDots() {
    const dots = ["", ".", "..", "..."];
    let dotIndex = 0;

    this.dotsTimer = this.time.addEvent({
      delay: 500,
      callback: () => {
        this.loading_txt.setText("LOADING" + dots[dotIndex]);
        dotIndex = (dotIndex + 1) % dots.length;
      },
      loop: true,
    });
  }
  pulseText() {
    this.tweens.add({
      targets: this.loading_txt,
      scale: { from: 0.4, to: 0.6 },
      duration: 700,
      yoyo: true,
      repeat: -1,
      ease: "Sine.easeInOut",
    });
  }

  adjustThumbnailImage() {
    if (this.thumbnail_image) {
      // Define the desired dimensions - REDUCED SIZE
      const desiredWidth = 280; // Reduced from 360
      const desiredHeight = 240; // Reduced from 310

      // Get the original image dimensions
      const originalWidth = this.thumbnail_image.width;
      const originalHeight = this.thumbnail_image.height;

      // Calculate scale to fill the desired area while maintaining aspect ratio
      const scaleX = desiredWidth / originalWidth;
      const scaleY = desiredHeight / originalHeight;
      const scale = Math.max(scaleX, scaleY);

      // Set the new size
      this.thumbnail_image.setScale(scale);

      // Create a mask to crop the image
      const graphics = this.make.graphics();
      graphics.fillStyle(0xffffff);
      graphics.fillRect(0, 0, desiredWidth, desiredHeight);
      const mask = new Phaser.Display.Masks.GeometryMask(this, graphics);

      // Apply the mask to the image
      this.thumbnail_image.setMask(mask);

      // Center the image and mask
      this.thumbnail_image.setPosition(180, 229);
      graphics.setPosition(180 - desiredWidth / 2, 229 - desiredHeight / 2);

      // Adjust the origin to ensure proper centering
      this.thumbnail_image.setOrigin(0.5);
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

  getStarsFromScore(score) {
    let starsCount;

    if (score <= 0) {
      starsCount = 0;
    } else if (score < 5000) {
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
      starsCount = 0; // Handle unexpected cases
    }

    return starsCount;
  }

  createGradient() {
    this.angle = 0;

    let canvas = document.createElement("canvas");
    canvas.width = this.game.config.width;
    canvas.height = this.game.config.height;

    let ctx = canvas.getContext("2d");

    let grd = ctx.createLinearGradient(0, 0, this.game.config.width, this.game.config.height);
    grd.addColorStop(1, "#000");
    grd.addColorStop(0, "#000");

    ctx.fillStyle = grd;
    ctx.fillRect(0, 0, this.game.config.width, this.game.config.height);

    // Add canvas texture to Phaser
    this.textures.addCanvas("gradient", canvas);

    // Create a sprite with the gradient texture
    this.background = this.add.image(0, 0, "gradient").setOrigin(0, 0).setDepth(-1);
  }

  /* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
