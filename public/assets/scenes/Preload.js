// You can write more code here

/* START OF COMPILED CODE */

class Preload extends Phaser.Scene {

	constructor() {
		super("Preload");

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
		const preloader_bottom_banner = this.add.image(180, 505.0135, "preloader_bottom_banner");
		preloader_bottom_banner.scaleX = 0.3333;
		preloader_bottom_banner.scaleY = 0.3333;

		// loading_thumbnail_text
		const loading_thumbnail_text = this.add.text(180, 229, "", {});
		loading_thumbnail_text.setOrigin(0.5, 0.5);
		loading_thumbnail_text.text = "LOADING COVER...";
		loading_thumbnail_text.setStyle({ "color": "#ff6a00", "fontFamily": "Carlito-Italic", "fontSize": "13px", "fontStyle": "bold", "stroke": "#ff6a00" });

		// preloader_Top_banner
		const preloader_Top_banner = this.add.image(180, 41.6625, "preloader_Top banner");
		preloader_Top_banner.scaleX = 0.3333;
		preloader_Top_banner.scaleY = 0.3333;

		// thumbnail_image
		const thumbnail_image = this.add.image(180, 229, "carousel_2");
		thumbnail_image.visible = false;

		// rectangle_1
		const rectangle_1 = this.add.rectangle(148, 73, 128, 128);
		rectangle_1.scaleX = 3.5006144584682515;
		rectangle_1.scaleY = 0.1;
		rectangle_1.angle = -1;
		rectangle_1.visible = false;
		rectangle_1.isFilled = true;
		rectangle_1.fillColor = 0;

		// bio_text
		const bio_text = this.add.text(180, 526, "", {});
		bio_text.setOrigin(0.5, 0.5);
		bio_text.text = "Bio Text";
		bio_text.setStyle({ "align": "center", "fontFamily": "Carlito-Regular", "fontSize": "12px", "maxLines":10});
		bio_text.setWordWrapWidth(350);

		// artist_name
		const artist_name = this.add.text(180, 11, "", {});
		artist_name.setOrigin(0.5, 0.5);
		artist_name.text = "artist_name";
		artist_name.setStyle({ "color": "#faf05e", "fontFamily": "Carlito-Regular", "fontSize": "14px", "stroke": "#faf05e" });

		// song_name
		const song_name = this.add.text(180, 34, "", {});
		song_name.setOrigin(0.5, 0.5);
		song_name.text = "song_name";
		song_name.setStyle({ "color": "#ff6a00", "fontFamily": "Afolkalips", "fontSize": "30px", "stroke": "#ff6a00" });

		// difficulty_text
		const difficulty_text = this.add.text(180, 60, "", {});
		difficulty_text.setOrigin(0.5, 0.5);
		difficulty_text.text = "MEDIUM DIFFICULTY";
		difficulty_text.setStyle({ "color": "#faf05e", "fontFamily": "Carlito-Regular", "fontSize": "12px", "stroke": "#faf05e" });

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
		const current_asset = this.add.text(180, 602, "", {});
		current_asset.setOrigin(0.5, 0.5);
		current_asset.visible = false;
		current_asset.text = "null";
		current_asset.setStyle({ "align": "center", "fontSize": "13px" });

		// loading_txt
		const loading_txt = this.add.text(180, 597, "", {});
		loading_txt.setOrigin(0.5, 0.5);
		loading_txt.text = "LOADING...";
		loading_txt.setStyle({ "color": "#ff6a00", "fontFamily": "Carlito-BoldItalic", "stroke": "#ff6a00" });

		// play_button
		const play_button = this.add.image(180, 593, "Button_blank");
		play_button.scaleX = 0.4;
		play_button.scaleY = 0.55;
		play_button.visible = false;

		// play_text
		const play_text = this.add.text(180, 593, "", {});
		play_text.setOrigin(0.5, 0.5);
		play_text.visible = false;
		play_text.text = "LET'S GO!";
		play_text.setStyle({ "fontFamily": "Carlito-Bold", "fontSize": "22px" });

		// highScoreText
		const highScoreText = this.add.text(180, 416, "", {});
		highScoreText.setOrigin(0.5, 0.5);
		highScoreText.text = "BEST SCORE";
		highScoreText.setStyle({ "color": "#faf05e", "fontFamily": "Carlito-Regular", "fontSize": "13px", "fontStyle": "bold", "stroke": "#faf05e" });

		// my_high_score
		const my_high_score = this.add.text(180, 452, "", {});
		my_high_score.setOrigin(0.5, 0.5);
		my_high_score.text = "Score";
		my_high_score.setStyle({ "color": "#ff6a00", "fontFamily": "Afolkalips", "fontSize": "65px", "maxLines":1,"stroke": "#ff6a00" });
		my_high_score.setWordWrapWidth(200);

		// rectangle
		const rectangle = this.add.rectangle(197, 387, 128, 128);
		rectangle.scaleX = 3.5006144584682515;
		rectangle.scaleY = 0.12;
		rectangle.angle = 2;
		rectangle.visible = false;
		rectangle.isFilled = true;
		rectangle.fillColor = 0;

		// star_empty
		const star_empty = this.add.image(104, 378, "preloader_Star_Inactive");
		star_empty.scaleX = 0.3333;
		star_empty.scaleY = 0.3333;

		// star_empty_1
		const star_empty_1 = this.add.image(142, 378, "preloader_Star_Inactive");
		star_empty_1.scaleX = 0.3333;
		star_empty_1.scaleY = 0.3333;

		// star_empty_2
		const star_empty_2 = this.add.image(180, 378, "preloader_Star_Inactive");
		star_empty_2.scaleX = 0.3333;
		star_empty_2.scaleY = 0.3333;

		// star_empty_3
		const star_empty_3 = this.add.image(218, 378, "preloader_Star_Inactive");
		star_empty_3.scaleX = 0.3333;
		star_empty_3.scaleY = 0.3333;

		// star_empty_4
		const star_empty_4 = this.add.image(256, 378, "preloader_Star_Inactive");
		star_empty_4.scaleX = 0.3333;
		star_empty_4.scaleY = 0.3333;

		// lists
		const stars = [star_empty, star_empty_1, star_empty_2, star_empty_3, star_empty_4];

		this.thumbnail_image = thumbnail_image;
		this.bio_text = bio_text;
		this.artist_name = artist_name;
		this.song_name = song_name;
		this.difficulty_text = difficulty_text;
		this.loading = loading;
		this.percentage = percentage;
		this.current_asset = current_asset;
		this.loading_txt = loading_txt;
		this.play_button = play_button;
		this.play_text = play_text;
		this.my_high_score = my_high_score;
		this.stars = stars;

		this.events.emit("scene-awake");
	}

	/** @type {Phaser.GameObjects.Image} */
	thumbnail_image;
	/** @type {Phaser.GameObjects.Text} */
	bio_text;
	/** @type {Phaser.GameObjects.Text} */
	artist_name;
	/** @type {Phaser.GameObjects.Text} */
	song_name;
	/** @type {Phaser.GameObjects.Text} */
	difficulty_text;
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
	my_high_score;
	/** @type {Phaser.GameObjects.Image[]} */
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

    this.loading.setOrigin(0, 0.5);
    this.loading.scaleX = 0;

    this.song_name.setText(this.track.song_name);
    this.artist_name.setText(this.track.artist_name.toUpperCase());
    this.bio_text.setText(this.track.artist.bio.toUpperCase());
    // console.log("this.track.artist.bio", this.track.artist.bio);

    let scores = JSON.parse(localStorage.getItem("scores") || "{}");
    let savedScore = scores[this.track.song_name] || 0;
    this.my_high_score.setText(Math.round(savedScore));

    if (savedScore > 0) {
      this.stars.forEach((star, index) => {
        if (index < this.getStarsFromScore(savedScore)) {
          star.setTexture("preloader_Star_Active");
        } else {
          star.setTexture("preloader_Star_Inactive");
        }
      });
    }

    this.load.on(Phaser.Loader.Events.PROGRESS, (p) => {
      // console.log(Math.round(p/1 * 100))
      this.percentage.setText("LOADING..." + Math.round((p / 1) * 100) + " %");
      this.loading.scaleX = p + 0.66;
    });

    this.load.audio(`${this.track.song_name}`, this.track.mp3_url);

    this.editorPreload();
  }

  init(data) {
    // background_music.play()
    console.log(data);
    this.track = data.track;
    this.track.mp3_url = this.track.mp3_file;
    this.track.midi_url = this.track.midi_file;
    // this.track.mp3_url = "./assets/sounds/davido.mp3";
    // this.track.midi_url = "./assets/sounds/davido.mid"
    this.track.thumbnail = `${this.track.song_name}-thumbnail`;

    // this.editorCreate();
  }
  async create() {
    console.log("Preload.js create()");

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

    this.play_button.setVisible(true);
    this.play_text.setVisible(true);

    this.play_button.setInteractive();
    this.play_button.on("pointerup", () => {
      let tutorialShown = localStorage.getItem("tutorialShown");
      let nextScene = "Level";
      if (!tutorialShown) {
        nextScene = "TutorialScene";
        localStorage.setItem("tutorialShown", true);
      }

      // this.scale.startFullscreen();
      this.cameras.main.fadeOut(500);
      this.cameras.main.once("camerafadeoutcomplete", () => {
        // background_music.stop()
        this.scene.start(nextScene, { track: this.track, midi: this.midi });
      });
    });
  }

  adjustThumbnailImage() {
    if (this.thumbnail_image) {
      // Define the desired dimensions
      const desiredWidth = 360;
      const desiredHeight = 310;

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
