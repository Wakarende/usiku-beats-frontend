// You can write more code here

/* START OF COMPILED CODE */

class Level extends Phaser.Scene {

	constructor() {
		super("Level");

		/* START-USER-CTR-CODE */
    // Write your code here.
    /* END-USER-CTR-CODE */
	}

	/** @returns {void} */
	editorCreate() {

		// bG_1
		const bG_1 = this.add.image(180, 320, "BG_1");
		bG_1.scaleX = 0.3333;
		bG_1.scaleY = 0.3333;

		// vignette
		const vignette = this.add.image(180, 320, "Vignette");
		vignette.scaleX = 0.3333;
		vignette.scaleY = 0.3333;

		// pattern
		const pattern = this.add.image(180, 320, "Pattern");
		pattern.scaleX = 0.3333;
		pattern.scaleY = 0.3333;

		// gameplay_bg
		const gameplay_bg = this.add.image(180, 320, "plain_background");
		gameplay_bg.visible = false;

		// top_banner
		const top_banner = this.add.image(180, 175.5, "top_banner");
		top_banner.visible = false;

		// artist_text
		const artist_text = this.add.text(180, 44, "", {});
		artist_text.setOrigin(0.5, 0.5);
		artist_text.text = "artist";
		artist_text.setStyle({ "fontFamily": "Carlito-Bold", "fontSize": "14px" });

		// song_name_text
		const song_name_text = this.add.text(180, 27, "", {});
		song_name_text.setOrigin(0.5, 0.5);
		song_name_text.text = "song";
		song_name_text.setStyle({ "align": "center", "color": "#1ba6b1", "fontFamily": "Carlito-Bold", "fontSize": "15px", "stroke": "#1ba6b1" });

		// score_text
		const score_text = this.add.text(180, 80, "", {});
		score_text.setOrigin(0.5, 0.5);
		score_text.text = "000";
		score_text.setStyle({ "color": "#fcb320", "fontFamily": "Afolkalips", "fontSize": "65px", "stroke": "#fcb320" });

		// pause_btn
		const pause_btn = this.add.image(30, 30, "Pause 2");
		pause_btn.scaleX = 0.4;
		pause_btn.scaleY = 0.4;

		// multiplier_text
		const multiplier_text = this.add.text(180, 119.91874449363797, "", {});
		multiplier_text.setOrigin(0.5, 0.5);
		multiplier_text.text = "x 1";
		multiplier_text.setStyle({ "align": "center", "fontFamily": "Afolkalips", "fontSize": "25px" });

		// tap_zone_area
		const tap_zone_area = this.add.image(181, 525, "tap_zone_area");
		tap_zone_area.visible = false;

		// divider_1
		const divider_1 = this.add.image(121.5, 321, "Perfect_Zone_Divider 2");
		divider_1.scaleX = 0.3;
		divider_1.scaleY = 0.42;

		// divider_2
		const divider_2 = this.add.image(238, 320, "Perfect_Zone_Divider 2");
		divider_2.scaleX = 0.3;
		divider_2.scaleY = 0.42;

		// feedback_text
		const feedback_text = this.add.image(180, 303, "perfect_popup");
		feedback_text.scaleX = 0.7;
		feedback_text.scaleY = 0.7;
		feedback_text.visible = false;

		// overlay
		const overlay = this.add.image(180, 320, "overlay");
		overlay.visible = false;

		// song_complete_text
		const song_complete_text = this.add.layer();
		song_complete_text.visible = false;

		// song
		const song = this.add.text(180, 196, "", {});
		song.setOrigin(0.5, 0.5);
		song.text = "SONG";
		song.setStyle({ "align": "center", "color": "#fe500b", "fontFamily": "DINPro", "fontSize": "18px", "stroke": "#fe500b" });
		song_complete_text.add(song);

		// complete
		const complete = this.add.text(180, 231, "", {});
		complete.setOrigin(0.5, 0.5);
		complete.text = "COMPLETE";
		complete.setStyle({ "color": "#fe500b", "fontFamily": "Righteous-Regular", "fontSize": "50px", "stroke": "#fe500b" });
		song_complete_text.add(complete);

		// youve_earned
		const youve_earned = this.add.text(180, 304, "", {});
		youve_earned.setOrigin(0.5, 0.5);
		youve_earned.text = "You've Earned ";
		youve_earned.setStyle({ "color": "#381304ff", "fontFamily": "Righteous-Regular", "fontSize": "30px", "stroke": "#773d26ff" });
		song_complete_text.add(youve_earned);

		// disc_number_earned
		const disc_number_earned = this.add.text(180, 364.88365496112675, "", {});
		disc_number_earned.setOrigin(0.5, 0.5);
		disc_number_earned.text = "30";
		disc_number_earned.setStyle({ "color": "#381304ff", "fontFamily": "Righteous-Regular", "fontSize": "55px", "fontStyle": "bold", "stroke": "#773d26ff" });
		song_complete_text.add(disc_number_earned);

		// discs
		const discs = this.add.text(180, 418.009920694199, "", {});
		discs.setOrigin(0.5, 0.5);
		discs.text = "Discs";
		discs.setStyle({ "color": "#381304ff", "fontFamily": "Righteous-Regular", "fontSize": "30px", "stroke": "#773d26ff" });
		song_complete_text.add(discs);

		// beat_missed_text
		const beat_missed_text = this.add.layer();
		beat_missed_text.visible = false;

		// beat
		const beat = this.add.text(180, 177, "", {});
		beat.setOrigin(0.5, 0.5);
		beat.text = "BEAT";
		beat.setStyle({ "align": "center", "color": "#666363ff", "fontFamily": "DINPro", "fontSize": "18px", "stroke": "#666363ff" });
		beat_missed_text.add(beat);

		// missed
		const missed = this.add.text(180, 212, "", {});
		missed.setOrigin(0.5, 0.5);
		missed.text = "MISSED";
		missed.setStyle({ "color": "#666363ff", "fontFamily": "Righteous-Regular", "fontSize": "50px", "stroke": "#666363ff" });
		beat_missed_text.add(missed);

		// continue_button
		const continue_button = this.add.image(180, 397, "play_button");
		continue_button.scaleX = 0.8;
		continue_button.scaleY = 0.8;
		beat_missed_text.add(continue_button);

		// continue_text
		const continue_text = this.add.text(180, 397, "", {});
		continue_text.setOrigin(0.5, 0.5);
		continue_text.text = "CONTINUE";
		continue_text.setStyle({ "fontFamily": "DINPro", "fontSize": "22px" });
		beat_missed_text.add(continue_text);

		// quit_button
		const quit_button = this.add.image(180, 317, "play_button");
		quit_button.scaleX = 0.8;
		quit_button.scaleY = 0.8;
		beat_missed_text.add(quit_button);

		// quit_text
		const quit_text = this.add.text(180, 317, "", {});
		quit_text.setOrigin(0.5, 0.5);
		quit_text.text = "QUIT";
		quit_text.setStyle({ "fontFamily": "DINPro", "fontSize": "22px" });
		beat_missed_text.add(quit_text);

		// streak_popup
		const streak_popup = this.add.container(0, 0);
		streak_popup.visible = false;

		// streak_overlay
		const streak_overlay = this.add.image(180, 352, "streak_overlay");
		streak_popup.add(streak_overlay);

		// streak_text
		const streak_text = this.add.text(180, 353, "", {});
		streak_text.setOrigin(0.5, 0.5);
		streak_text.text = "10 STREAK";
		streak_text.setStyle({ "align": "center", "color": "#666363ff", "fontFamily": "DINPro", "fontSize": "15px", "stroke": "#666363ff" });
		streak_popup.add(streak_text);

		// sprite_1
		const sprite_1 = this.add.sprite(181, 522, "_MISSING");
		sprite_1.visible = false;

		// beats2
		const beats2 = this.add.image(6, 325, "tile_active");
		beats2.setOrigin(-0.02, 0);
		beats2.visible = false;

		// perfect_1
		this.add.image(62, 525, "Perfect_1");

		// perfect_2
		this.add.image(181, 525, "Perfect_2");

		// perfect_3
		this.add.image(300, 525, "Perfect_3");

		// colour_highlight
		const colour_highlight = this.add.image(66, 525, "Colour highlight");
		colour_highlight.scaleX = 0.1;
		colour_highlight.scaleY = 0.09;

		// colour_highlight_1
		const colour_highlight_1 = this.add.image(183, 525, "Colour highlight");
		colour_highlight_1.scaleX = 0.1;
		colour_highlight_1.scaleY = 0.09;
		colour_highlight_1.flipX = true;

		// colour_highlight_2
		const colour_highlight_2 = this.add.image(301, 525, "Colour highlight");
		colour_highlight_2.scaleX = 0.1;
		colour_highlight_2.scaleY = 0.09;
		colour_highlight_2.flipY = true;

		// lists
		const ui_layer = [multiplier_text, score_text, song_name_text, artist_text, top_banner];

		this.top_banner = top_banner;
		this.artist_text = artist_text;
		this.song_name_text = song_name_text;
		this.score_text = score_text;
		this.pause_btn = pause_btn;
		this.multiplier_text = multiplier_text;
		this.tap_zone_area = tap_zone_area;
		this.divider_1 = divider_1;
		this.divider_2 = divider_2;
		this.feedback_text = feedback_text;
		this.overlay = overlay;
		this.song_complete_text = song_complete_text;
		this.disc_number_earned = disc_number_earned;
		this.beat_missed_text = beat_missed_text;
		this.continue_button = continue_button;
		this.continue_text = continue_text;
		this.quit_button = quit_button;
		this.quit_text = quit_text;
		this.streak_popup = streak_popup;
		this.streak_text = streak_text;
		this.ui_layer = ui_layer;

		this.events.emit("scene-awake");
	}

	/** @type {Phaser.GameObjects.Image} */
	top_banner;
	/** @type {Phaser.GameObjects.Text} */
	artist_text;
	/** @type {Phaser.GameObjects.Text} */
	song_name_text;
	/** @type {Phaser.GameObjects.Text} */
	score_text;
	/** @type {Phaser.GameObjects.Image} */
	pause_btn;
	/** @type {Phaser.GameObjects.Text} */
	multiplier_text;
	/** @type {Phaser.GameObjects.Image} */
	tap_zone_area;
	/** @type {Phaser.GameObjects.Image} */
	divider_1;
	/** @type {Phaser.GameObjects.Image} */
	divider_2;
	/** @type {Phaser.GameObjects.Image} */
	feedback_text;
	/** @type {Phaser.GameObjects.Image} */
	overlay;
	/** @type {Phaser.GameObjects.Layer} */
	song_complete_text;
	/** @type {Phaser.GameObjects.Text} */
	disc_number_earned;
	/** @type {Phaser.GameObjects.Layer} */
	beat_missed_text;
	/** @type {Phaser.GameObjects.Image} */
	continue_button;
	/** @type {Phaser.GameObjects.Text} */
	continue_text;
	/** @type {Phaser.GameObjects.Image} */
	quit_button;
	/** @type {Phaser.GameObjects.Text} */
	quit_text;
	/** @type {Phaser.GameObjects.Container} */
	streak_popup;
	/** @type {Phaser.GameObjects.Text} */
	streak_text;
	/** @type {Array<Phaser.GameObjects.Text|Phaser.GameObjects.Image>} */
	ui_layer;

	/* START-USER-CODE */

  // Write your code here

  init(data) {
    this.midi = data.midi;
    this.track = data.track;
    if (this.sound.locked) {
      this.sound.unlock();
    }
    this.input.on("pointerdown", () => {
      this.sound.unlock();
      if (this.sound.locked) {
        this.sound.unlock();
      }
    });
  }
  preload() {
    this.load.scenePlugin({
      key: "rexgesturesplugin",
      url: "lib/rexgesturesplugin.min.js",
      sceneKey: "rexGestures",
    });
  }

  create() {
    console.log("Level.js create()");
    this.editorCreate();

    this.soundTracker = 0;

    this.column = null;
    this.drumColums = [];
    this.randomDrumCol = [];

    this.tileGroup = null;
    this.tileClicked = false;

    this.score = 0;
    this.scoreDisplay = 0;

    this.tileTarget = 0.82;

    this.playSong = false;
    this.matchedMarkerTracker = [];
    this.tileTracker = [];

    this.maxSongScore = 100000;
    this.multiplier = 1;
    this.progress_bar = 1;

    this.frameTime = 0;
    this.fps;

    this.artist = this.track.artist_name;
    this.songItem = this.track.song_name;
    this.screenWidth = this.cameras.main.width;
    this.screenHeight = this.cameras.main.height;
    this.screenCenterX = this.cameras.main.worldView.x + this.screenWidth / 2;
    this.screenCenterY = this.cameras.main.worldView.y + this.screenHeight / 2;

    this.soundMarkers = [];

    this.tileDuration = this.midi.tracks[0].notes[0].velocity * 5 || 1.4;

    this.midi.tracks.forEach((track) => {
      const notes = track.notes;

      notes.forEach((note, idx) => {
        if ((note.name == "F#3") | (note.name == "G#3") | (note.name == "A#3"))
          this.soundMarkers.push({
            name: `"marker_${idx}"`,
            velocity: note.velocity,
            start: note.time,
            path: note.name,
            duration: note.duration,
            config: { loop: false },
          });
      });
    });

    this.totalTiles = this.soundMarkers.length;
    this.streakThreshold = 10;
    this.baseScore =
      this.maxSongScore /
      ((this.streakThreshold * (this.streakThreshold + 1)) / 2 +
        (this.totalTiles - this.streakThreshold) * 5);
    this.currentMultiplier = 1;
    this.progress = 0;

    this.countDown();

    this.events.on("resume", () => {
      this.music.resume();
    });

    this.song_name_text.setText(this.songItem.toUpperCase());
    this.artist_text.setText(this.artist.toUpperCase());

    this.pause_btn.on("pointerup", () => {
      this.music.pause();
      this.scene.pause();
      this.scene.launch("Pause");
    });

    // this.tapZone = this.add
    //   .image(this.screenCenterX, this.screenHeight * this.tileTarget, "tapZone")
    //   .setOrigin(0.5);

    this.ui_layer.forEach((asset) => {
      asset.setDepth(4);
    });

    this.divider_1.setDepth(2.5);
    this.divider_2.setDepth(2.5);

    this.path = this.add
      .rectangle(0, 0, this.screenWidth / 3, this.screenHeight, 0x90ee90)
      .setOrigin(0.5, 0)
      .setAlpha(0.5)
      .setVisible(false);

    this.score_emitter = this.add
      .particles(this.score_text.x, this.score_text.y, "Play_active", {
        lifespan: 750,
        speed: { min: 100, max: 150 },
        scale: { start: 0.5, end: 0 },
        blendMode: "ADD",
        emitting: false,
      })
      .setDepth(10);

    this.multiplier_emitter = this.add
      .particles(this.multiplier_text.x, this.multiplier_text.y, "Play_active", {
        lifespan: 750,
        speed: { min: 50, max: 100 },
        scale: { start: 0.5, end: 0 },
        blendMode: "ADD",
        emitting: false,
      })
      .setDepth(10);

    this.tileEmitter = this.add.particles(0, 0, "particle_1", {
      speed: { min: 50, max: 200 },
      angle: { min: 0, max: 360 },
      scale: { start: 1, end: 0 },
      blendMode: "ADD",
      lifespan: 400,
      gravityY: 300,
      emitting: false,
    });

    // let rect = this.add
    //   .rectangle(
    //     this.screenCenterX,
    //     this.screenHeight * this.tileTarget,
    //     this.screenWidth,
    //     2,
    //     0x00f000,
    //     1
    //   )
    //   .setDepth(100);
    this.fps_text = this.add.text(this.screenWidth - 20, 20, "", {});

    this.fps_text.setOrigin(1, 0).setDepth(100);
    this.fps_text.text = "artist";
    this.fps_text.setStyle({
      color: "#666363ff",
      fontFamily: "Righteous-Regular",
      fontSize: "13px",
      stroke: "#666363ff",
    });

    this.addProgressBar();
    // this.initializeVisualizer();
  }

  addProgressBar() {
    this.progressBar = this.add.rectangle(0, 0, 0, 5, 0xfe500b);
    this.progressBar.setOrigin(0, 0);
    this.progressBarBg = this.add.rectangle(0, 0, this.screenWidth, 5, 0x666363);
    this.progressBarBg.setOrigin(0, 0);
    this.progressBar.setDepth(50);
    this.progressBarBg.setDepth(40);
  }

  initializeVisualizer() {
    const gameWidth = this.sys.game.config.width;
    // const gameHeight = this.sys.game.config.height;

    // Determine positions
    const scoreY = this.score_text.y;
    const multiplierY = this.multiplier_text.y;
    const visualizerYPosition = (scoreY + multiplierY) / 2 - 20;

    // Calculate visualizer size based on text dimensions
    const textWidth = Math.max(this.score_text.width, this.multiplier_text.width);
    const textHeight =
      this.multiplier_text.y +
      this.multiplier_text.height / 2 -
      (this.score_text.y - this.score_text.height / 2);
    const padding = 20;
    // const visualizerSize = Math.max(textWidth, textHeight) + padding * 2;

    // Fixed visualizer
    const visualizerSize = 250; // Adjust size as needed

    // Calculate radius for the inner circle
    // const innerRadius = (textWidth / 2) / (visualizerSize / 2);
    // const radius = Phaser.Math.Clamp(innerRadius, 0, 1);
    const radius = 0.5;

    // Get the device pixel ratio
    const pixelRatio = window.devicePixelRatio || 1;
    // Ensure audio context is running
    if (this.sound.context.state === "suspended") {
      this.sound.context.resume();
    }

    // Create an offscreen canvas with adjusted dimensions
    const canvasWidth = visualizerSize * pixelRatio;
    const canvasHeight = visualizerSize * pixelRatio;

    // Create an offscreen canvas with square dimensions
    const offscreenCanvas = document.createElement("canvas");
    offscreenCanvas.width = canvasWidth;
    offscreenCanvas.height = canvasHeight;

    // Create the AudioMotion Analyzer instance with the offscreen canvas
    this.audioMotion = new AudioMotionAnalyzer(null, {
      canvas: offscreenCanvas,
      audioCtx: this.sound.context,
      useCanvas: true,
      mode: 1, // Polar (circular) mode
      radial: true,
      radialInvert: true,
      radialSpeed: true, //distribute frequencies evenly in radial mode
      lineMode: 2, //Extra smooth curves for fluid lines
      radius: radius, // Increase or Decrease size of visualizer
      responsive: false, // Disable responsive resizing
      width: visualizerSize, // Match canvas width
      height: visualizerSize, // Match canvas height
      pixelRatio: pixelRatio, // Set pixel ratio to 1
      showScaleY: false,
      showScaleX: false,
      showPeaks: false,
      showFPS: false,
      minDecibels: -100,
      maxDecibels: -40,
      gradient: "prism",
      linearAmplitude: false,
      linearBoost: 1.4, // Increase to make bars taller
      bgAlpha: 0, // Fully transparent background
      barSpace: 0.01,
      fillAlpha: 0,
      lineWidth: 1.5,
      reflexRatio: 0,
      reflexAlpha: 0,
      lumiBars: false,
      maxFreq: 16000,
      minFreq: 10,
      smoothing: 0.6,
      // Give visualizer transparent background
      overlay: true,
      showBgColor: false,
      channelLayout: "dual-vertical",
      frequencyScale: "bark",
      outlineBars: true,
      fftSize: 8192,
    });

    // Store references for later use
    this.visualizerCanvas = offscreenCanvas;
    // this.visualizerSize = visualizerSize;
    this.visualizerSize = 250; // Set to a size that should be clearly visible

    // Create a Phaser CanvasTexture with the same dimensions
    this.visualizerTexture = this.textures.createCanvas(
      "visualizerTexture",
      visualizerSize,
      visualizerSize
    );

    // Position the visualizer at the calculated Y position
    this.visualizerImage = this.add.image(gameWidth / 2, visualizerYPosition, "visualizerTexture");
    this.visualizerImage.setDisplaySize(visualizerSize, visualizerSize);
    this.visualizerImage.setOrigin(0.5, 0.5);
    this.visualizerImage.setDepth(4); // Set depth lower than text
    this.visualizerImage.setAlpha(1);

    // Update the onCanvasDraw function
    this.audioMotion.onCanvasDraw = () => {
      let visualizerTexture = this.visualizerTexture;
      visualizerTexture.context.clearRect(0, 0, visualizerTexture.width, visualizerTexture.height);
      visualizerTexture.context.globalCompositeOperation = "copy";
      visualizerTexture.context.drawImage(
        this.visualizerCanvas,
        0,
        0,
        this.visualizerCanvas.width,
        this.visualizerCanvas.height,
        0,
        0,
        visualizerTexture.width,
        visualizerTexture.height
      );
      visualizerTexture.context.globalCompositeOperation = "source-over";
      visualizerTexture.refresh();
    };
  }

  update(time, delta) {
    if (!this.tileGroup) {
      return;
    }
    this.frameTime = this.frameTime * 0.99 + delta * 0.01;
    this.fps = ((1 / this.frameTime) * 1000).toFixed(1);
    this.fps_text.text = this.fps;
    this.lowFpsMode = this.fps < 30 ? true : false;

    if (Math.abs(this.scoreDisplay - this.score) > 1) {
      this.scoreDisplay = Phaser.Math.Linear(this.scoreDisplay, this.score, 0.1);
      this.score_text.setText(`${Math.trunc(this.scoreDisplay)}`);
    }

    let seek = this.music?.seek;

    if (seek >= 0) {
      if (this.soundMarkers.length > 0 && seek + this.tileDuration >= this.soundMarkers[0].start) {
        var marker = this.soundMarkers.shift();
        this.creatOneDrum(marker);
      }

      this.tileGroup.getChildren().forEach((tile) => {
        if (tile.swiped || tile.held) return;

        tile.lerp = Math.max(0, (seek - tile.start + this.tileDuration) / this.tileDuration);

        tile.setY(Phaser.Math.Linear(0, this.screenHeight * this.tileTarget, tile.lerp));

        tile.setAlpha(tile.lerp);

        if (tile.y > this.screenHeight * this.tileTarget) {
          // this.checkOverlap(tile);
        }
      });
    }

    // Update progress bar
    if (this.music && this.music.isPlaying) {
      const progress = this.music.seek / this.music.duration;
      this.progressBar.width = this.screenWidth * progress;
    }
  }

  creatOneDrum(marker) {
    let tilePath = marker.path;
    let velocity = marker.velocity;
    let duration = marker.duration;

    let tile = this.tileGroup
      .create(0, 0, "beats2")
      .setOrigin(0.5, 0.5)
      .setInteractive()
      .setAlpha(0.2)
      .setDepth(4);

    tile.start = marker.start;
    tile.body.immovable = true;
    this.placeTile(tile, tilePath, velocity, duration);
  }

  placeTile(tile, tilePath, velocity, duration) {
    let left = (this.screenWidth / 6) * 1;
    let middle = (this.screenWidth / 6) * 3;
    let right = (this.screenWidth / 6) * 5;

    let swipeConfig = {
      velocityThreshold: 500,
    };

    let position;
    switch (tilePath) {
      case "A#3":
        position = "left";
        tile.setX(left);
        break;
      case "G#3":
        position = "middle";
        tile.setX(middle);
        break;
      case "F#3":
        position = "right";
        tile.setX(right);
        break;
      default:
        break;
    }

    tile.laneX = tile.x;

    tile.swiped = false;

    let swipe = this.rexGestures.add.swipe(tile, swipeConfig);

    switch (velocity) {
      case 0.23622047244094488:
        tile.setTexture("swipe_up");

        swipe.on("swipe", (swipe, gameObject, lastPointer) => {
          if (swipe.up) {
            this.handleSwipe(tile, swipe);
          }
        });
        break;

      case 0.3937007874015748:
        tile.setTexture("swipe_right");

        swipe.on("swipe", (swipe, gameObject, lastPointer) => {
          if (swipe.right) {
            this.handleSwipe(tile, swipe);
          }
        });
        break;
      case 0.7086614173228346:
        tile.setTexture("swipe_left");

        swipe.on("swipe", (swipe, gameObject, lastPointer) => {
          if (swipe.left) {
            this.handleSwipe(tile, swipe);
          }
        });
        break;
      case 0.5511811023622047:
        tile.setTexture("swipe_down");

        swipe.on("swipe", (swipe, gameObject, lastPointer) => {
          if (swipe.down) {
            this.handleSwipe(tile, swipe);
          }
        });
        break;

      case 0.7874015748031497:
        tile.setTexture("swipe_up_left");

        swipe.on("swipe", (swipe, gameObject, lastPointer) => {
          if (swipe.up) {
            this.handleSwipe(tile, swipe);
          }
        });
        break;
      case 0.31496062992125984:
        tile.setTexture("swipe_up_right");

        swipe.on("swipe", (swipe, gameObject, lastPointer) => {
          if (swipe.up) {
            this.handleSwipe(tile, swipe);
          }
        });
        break;
      case 0.6299212598425197:
        tile.setTexture("swipe_down_left");

        swipe.on("swipe", (swipe, gameObject, lastPointer) => {
          if (swipe.down) {
            this.handleSwipe(tile, swipe);
          }
        });
        break;
      case 0.47244094488188976:
        tile.setTexture("swipe_down_right");

        swipe.on("swipe", (swipe, gameObject, lastPointer) => {
          if (swipe.down) {
            this.handleSwipe(tile, swipe);
          }
        });
        break;
      case 0.007874015748031496:
        this.handleHeldTile(tile, duration);
        break;

      default:
        tile.on("pointerup", () => {
          this.tileClicked = false;
        });
        tile.on("pointerdown", () => {
          this.onClickInstrument(tile);
        });
        break;
    }
  }

  calculateHeldTileScaleFactor(duration, tileDuration) {
    let slope = 1.5;
    let intercept = -1.4;

    let normalizationFactor = slope * tileDuration + intercept;

    let heldTileScaleFactor = 1 + Math.log1p(duration) / Math.log1p(normalizationFactor);
    return heldTileScaleFactor;
  }

  handleHeldTile(tile, duration) {
    let heldTileScaleFactor = this.calculateHeldTileScaleFactor(duration, this.tileDuration);
    let initialHeight = heldTileScaleFactor * duration * tile.height;

    // Create nineslice tile
    let ninesliceTile = this.add.nineslice(
      tile.x,
      0, // x, y
      "beats2", // texture key
      null, // frame (null if not using a spritesheet)
      tile.width,
      initialHeight, // width, height
      20,
      20, // leftWidth, rightWidth (adjust as needed)
      20,
      20 // topHeight, bottomHeight (adjust as needed)
    );

    ninesliceTile.setOrigin(0.5, 1);
    ninesliceTile.start = tile.start;
    ninesliceTile.duration = duration;
    ninesliceTile.initialHeight = initialHeight;

    // Replace the original tile with the nineslice tile in the tileGroup
    this.tileGroup.remove(tile);
    this.tileGroup.add(ninesliceTile);
    tile.destroy();

    let clicked = false;
    let tween = null;

    ninesliceTile.setInteractive();
    ninesliceTile.on("pointerdown", () => {
      ninesliceTile.held = true;
      if (tween) {
        tween.stop();
      }
      tween = this.tweens.add({
        targets: ninesliceTile,
        height: ninesliceTile.height / heldTileScaleFactor,
        ease: "Linear",
        duration: duration * 1000,
        onComplete: () => {
          if (!clicked) {
            clicked = true;
            this.onClickInstrument(ninesliceTile, false, true);
          }
        },
      });
    });

    ninesliceTile.on("pointerup", () => {
      if (tween) {
        tween.stop();
      }
      if (!clicked) {
        clicked = true;
        this.onClickInstrument(ninesliceTile, false, true);
      }
    });

    // Add this to handle tile destruction
    ninesliceTile.on("destroy", () => {
      if (tween) {
        tween.stop();
      }
    });
  }

  checkOverlap(tile) {
    if (tile.y >= this.screenHeight) {
      tile.destroy();
      this.beatMissedDisplay();
    }
  }

  createTileGroup() {
    this.tileGroup = this.physics.add.staticGroup();
  }

  createMusic() {
    this.music = this.sound.add(`${this.songItem}`, { volume: 1 });

    this.music.on("play", () => {
      this.isSoundPlaying = true;
      if (this.audioMotion) {
        this.analyserNode = this.sound.context.createAnalyser();
        this.music.volumeNode.connect(this.analyserNode);
        this.audioMotion.connectInput(this.analyserNode);
      }
    });

    this.music.play({ delay: 0.5 });

    this.music.on("complete", () => {
      this.songComplete();
    });
  }

  songComplete() {
    this.music.pause();
    this.scene.pause();

    this.matchedMarkerTracker = [];

    this.overlay.setVisible(true);
    this.song_complete_text.setVisible(true).setDepth(6);

    setTimeout(() => {
      this.overlay.setVisible(false);
      this.song_complete_text.setVisible(false);

      let user_data = JSON.parse(localStorage.getItem("user_data"));
      console.log("here");
      user_data.profile.player.total_discs += 30;
      this.game.events.emit("updateUserEvent", { data: user_data });

      this.gameOver();
    }, 4000);
  }

  handleSwipe(tile, swipe) {
    tile.swiped = true;
    this.onClickInstrument(tile, true);

    let movementDistance = 25;

    let tweenConfig = {
      duration: 150,
      ease: "Power1",
      onComplete: () => {
        tile.destroy();
      },
    };

    tile.setTexture("arrow");

    if (swipe.up && swipe.right) {
      // Up-right diagonal swipe
      tile.angle -= 45;
      this.tweens.add({
        targets: tile,
        x: tile.x + (movementDistance * Math.sqrt(2)) / 2,
        y: tile.y - (movementDistance * Math.sqrt(2)) / 2,
        ...tweenConfig,
      });
    } else if (swipe.up && swipe.left) {
      // Up-left diagonal swipe
      tile.angle -= 135;
      this.tweens.add({
        targets: tile,
        x: tile.x - (movementDistance * Math.sqrt(2)) / 2,
        y: tile.y - (movementDistance * Math.sqrt(2)) / 2,
        ...tweenConfig,
      });
    } else if (swipe.down && swipe.right) {
      // Down-right diagonal swipe
      tile.angle += 45;
      this.tweens.add({
        targets: tile,
        x: tile.x + (movementDistance * Math.sqrt(2)) / 2,
        y: tile.y + (movementDistance * Math.sqrt(2)) / 2,
        ...tweenConfig,
      });
    } else if (swipe.down && swipe.left) {
      // Down-left diagonal swipe
      tile.angle += 135;
      this.tweens.add({
        targets: tile,
        x: tile.x - (movementDistance * Math.sqrt(2)) / 2,
        y: tile.y + (movementDistance * Math.sqrt(2)) / 2,
        ...tweenConfig,
      });
    } else if (swipe.up) {
      tile.angle -= 90;
      this.tweens.add({
        targets: tile,
        y: tile.y - movementDistance * 2,
        ...tweenConfig,
      });
    } else if (swipe.down) {
      tile.angle += 90;
      this.tweens.add({
        targets: tile,
        y: tile.y + movementDistance * 4,
        ...tweenConfig,
      });
    } else if (swipe.left) {
      tile.angle -= 180;
      this.tweens.add({
        targets: tile,
        x: tile.x - movementDistance,
        ...tweenConfig,
      });
    } else if (swipe.right) {
      this.tweens.add({
        targets: tile,
        x: tile.x + movementDistance,
        ...tweenConfig,
      });
    }
  }

  resetStreak() {
    if (this.currentMultiplier >= 2) {
      this.streak_text.setText("STREAK LOST");
      this.streak_popup.setVisible(true).setDepth(6);
      setTimeout(() => {
        this.streak_popup.setVisible(false);
      }, 700);
    }
    this.currentMultiplier = 1;
    this.progress = 0;
  }

  streakDisplay() {
    this.multiplier_emitter.explode(this.lowFpsMode ? 10 : 20);

    this.streak_popup.x = -180;
    this.streak_popup.setVisible(true).setDepth(6);
    this.tweens.killTweensOf(this.streak_popup);
    var tweenIn = this.tweens.add({
      targets: this.streak_popup,
      x: 0,
      ease: "Power1",
      duration: 500,
      onComplete: () => {
        setTimeout(() => {
          var tweenOut = this.tweens.add({
            targets: this.streak_popup,
            x: 360,
            ease: "Power1",
            duration: 500,
            onComplete: () => {
              this.streak_popup.setVisible(false);
              this.streak_popup.x = -this.streak_popup.width;
            },
          });
        }, 700);
      },
    });
  }

  beatMissedDisplay() {
    this.music.pause();
    this.scene.pause();

    let children = this.tileGroup.getChildren();
    let tilesToRemove = children.slice(0, 3);
    tilesToRemove.forEach((tile) => tile.destroy());

    this.scene.bringToTop("BeatMissed");
    this.scene.launch("BeatMissed");
  }

  onClickInstrument(tile, swiped = false, held = false) {
    let accuracy = Math.abs(tile.lerp - 1);

    if (held) {
      accuracy -= 0.04;
    }

    if (navigator.vibrate) {
      navigator.vibrate(100);
    }

    this.tileClicked = true;
    let perfect_plus = false;
    let tile_score = 0;

    switch (true) {
      case accuracy < 0.02:
        perfect_plus = true;
        tile_score = this.baseScore * this.currentMultiplier;
        this.score += tile_score;
        this.progress += 1;
        this.feebackText("perfect+");
        this.highlightPath(tile.x, "green");
        break;
      case accuracy < 0.06:
      case accuracy >= 0.1 && accuracy <= 0.17:
        tile_score = this.baseScore * this.currentMultiplier;
        this.score += tile_score * 0.7;
        this.progress += 1;
        this.feebackText("perfect");
        this.highlightPath(tile.x, "green");
        break;
      case accuracy < 0.1:
        this.resetStreak();
        tile_score = this.baseScore * this.currentMultiplier;
        this.score += tile_score * 0.4;
        this.progress = 0;
        this.currentMultiplier = 1;
        this.feebackText("great");
        this.highlightPath(tile.x, "green");
        break;
      default:
        this.resetStreak();
        this.highlightPath(tile.x, "red");
        if (tile.lerp < 1) {
          this.feebackText("too-early");
        } else {
          console.log("missed");
        }
        this.progress = 0;
        this.currentMultiplier = 1;
        this.highlightPath(tile.x, "red");
    }

    if (this.progress >= this.streakThreshold) {
      this.streak_text.setText(`${this.streakThreshold * this.currentMultiplier} STREAK`);
      this.streakDisplay();
      this.progress = 0;
      this.currentMultiplier += 1;

      if (this.currentMultiplier > 5) {
        this.currentMultiplier = 5;
      }
    }

    this.multiplier_text.setText(`X ${this.currentMultiplier}`);

    if (!swiped || !held) {
      this.tweens.add({
        targets: tile,
        scaleX: 1.1,
        scaleY: 1.1,
        duration: 75,
        ease: "Power1",
        onComplete: () => {
          tile.destroy();
        },
      });
    }

    if (!swiped && !held) {
      this.tileEmitter.setPosition(tile.x, tile.y);
      this.tileEmitter.explode(10);
    }
  }

  tileActiveFlash(tile, perfect_plus) {
    var tile_active = this.add.image(tile.x, 0, "tile_active").setDepth(3);

    if (perfect_plus) {
      tile_active.setY(this.screenHeight * this.tileTarget);
    } else {
      tile_active.setY(tile.y);
    }

    this.tweens.add({
      targets: tile_active,
      alpha: 0,
      duration: perfect_plus ? 1000 : 250,
      ease: "Power1",
      onComplete: () => {
        tile_active.destroy();
      },
    });
  }

  feebackText(str) {
    this.tweens.killTweensOf(this.feedback_text);

    this.feedback_text.setVisible(true).setDepth(4);

    switch (str) {
      case "too-early":
        this.feedback_text.setTexture("too_early").setScale(0.3);
        break;
      case "perfect+":
        this.feedback_text.setTexture("perfect+").setScale(0.3);
        break;
      case "perfect":
        this.feedback_text.setTexture("perfect").setScale(0.3);
        break;
      case "great":
        this.feedback_text.setTexture("great").setScale(0.3);
        break;

      default:
        break;
    }

    this.tweens.add({
      targets: this.feedback_text,
      scaleX: 0.5,
      scaleY: 0.5,
      ease: "Linear",
      duration: 300,
      yoyo: false,
      repeat: 0,
      callbackScope: this,
      onComplete: function () {
        this.feedback_text.setVisible(false).setScale(0.3);
      },
    });
  }

  highlightPath(x, str) {
    if (str === "green") {
      this.path.setFillStyle(0x90ee90).x = x;
    } else {
      this.path.setFillStyle(0xffa500).x = x;
    }

    this.path.setVisible(true);
    setTimeout(() => {
      this.path.setVisible(false);
    }, 200);
  }

  cleanUp() {
    this.children.removeAll();
    this.time.removeAllEvents();
    this.tweens.killAll();
    this.sound.stopAll();

    if (this.audioMotion) {
      if (this.analyzerNode) {
        this.audioMotion.disconnectInput(this.analyserNode);
      }
      this.audioMotion.destroy();
      this.visualizerTexture.destroy();
    }

    if (this.music) {
      this.music.stop();
      this.music = null;
    }
    this.scene.stop("Level");
  }

  gameOver() {
    this.music.stop();
    this.matchedMarkerTracker = [];
    clearInterval(this.globalInterval);

    this.track.current_score = this.score;
    this.track.midi = this.midi;

    let scores = JSON.parse(localStorage.getItem("scores") || "{}");
    scores[this.track.song_name] = this.score;
    localStorage.setItem("scores", JSON.stringify(scores));

    this.cleanUp();
    this.scene.stop("Level");
    this.scene.start("GameOverScene", { track: this.track });
  }

  countDown() {
    let countdown_sfx = this.sound.add("countdown_sfx", {
      volume: 0.7,
      loop: false,
    });

    this.ui_layer.forEach((child) => {
      child.setAlpha(0);
      child.setScale(0);
    });

    this.overlay.setDepth(5);

    this.initialTime = 3;
    this.get_ready_text = this.add
      .text(this.screenCenterX, this.screenCenterY - 50, "GET READY", {
        fontFamily: "DINPro",
        fontSize: "20px",
        fill: "#fe500b",
      })
      .setOrigin(0.5, 1)
      .setDepth(5)
      .setScale(0)
      .setAlpha(0);

    this.tweens.add({
      targets: this.get_ready_text,
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
      duration: 250,
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
        duration: 250,
        yoyo: true,
        ease: "Power2",
      });

      if (this.initialTime <= 0) {
        this.countDownText.destroy();
        this.get_ready_text.destroy();
        this.tweens.add({
          targets: this.overlay,
          alpha: 0,
          ease: "Linear",
          duration: 250,
          onComplete: () => {
            this.overlay.setVisible(false);
            this.overlay.setAlpha(1);
          },
        });

        this.createMusic();
        this.createTileGroup();
        this.pause_btn.setInteractive().setDepth(50);
        clearInterval(intervalId);

        this.ui_layer.forEach((child) => {
          this.tweens.add({
            targets: child,
            alpha: { from: 0, to: 1 },
            scaleX: { from: 0, to: 1 },
            scaleY: { from: 0, to: 1 },
            ease: "Power1",
            duration: 250,
          });
        });
      }
    }, 1000);
  }

  pad(num, size) {
    num = num.toString();
    while (num.length < size) num = "0" + num;
    return num;
  }

  shuffle(array) {
    var currentIndex = array.length,
      temporaryValue,
      randomIndex;
    while (0 !== currentIndex) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
    return array;
  }

  /* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
