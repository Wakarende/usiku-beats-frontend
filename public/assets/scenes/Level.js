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
    bG_1.alpha = 0.45;
    bG_1.alphaTopLeft = 0.45;
    bG_1.alphaTopRight = 0.45;
    bG_1.alphaBottomLeft = 0.45;
    bG_1.alphaBottomRight = 0.45;

    // vignette
    const vignette = this.add.image(180, 320, "Vignette");
    vignette.scaleX = 0.3333;
    vignette.scaleY = 0.3333;

    // pattern
    const pattern = this.add.image(180, 320, "Pattern");
    pattern.scaleX = 0.3333;
    pattern.scaleY = 0.3333;

    // artist_text
    const artist_text = this.add.text(180, 44, "", {});
    artist_text.setOrigin(0.5, 0.5);
    artist_text.text = "artist";
    artist_text.setStyle({ fontFamily: "Carlito-Bold", fontSize: "14px" });

    // song_name_text
    const song_name_text = this.add.text(180, 27, "", {});
    song_name_text.setOrigin(0.5, 0.5);
    song_name_text.text = "song";
    song_name_text.setStyle({
      align: "center",
      color: "#1ba6b1",
      fontFamily: "Carlito-Bold",
      fontSize: "15px",
      stroke: "#1ba6b1",
    });

    // score_text
    const score_text = this.add.text(180, 80, "", {});
    score_text.setOrigin(0.5, 0.5);
    score_text.text = "000";
    score_text.setStyle({
      color: "#fcb320",
      fontFamily: "Afolkalips",
      fontSize: "65px",
      stroke: "#fcb320",
    });

    // pause_btn
    const pause_btn = this.add.image(30, 30, "Pause 2");
    pause_btn.scaleX = 0.4;
    pause_btn.scaleY = 0.4;

    // multiplier_text
    const multiplier_text = this.add.text(180, 132.91874449363797, "", {});
    multiplier_text.setOrigin(0.5, 0.5);
    multiplier_text.text = "x 1";
    multiplier_text.setStyle({ align: "center", fontFamily: "Afolkalips", fontSize: "25px" });

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
    const feedback_text = this.add.image(180, 303, "perfect");
    feedback_text.scaleX = 0.7;
    feedback_text.scaleY = 0.7;
    feedback_text.visible = false;

    // bar
    const bar = this.add.image(180, 114, "Bar");
    bar.scaleX = 0.3333;
    bar.scaleY = 0.3333;
    bar.visible = false;

    // streak_popup
    const streak_popup = this.add.container(0, 0);
    streak_popup.visible = false;

    // streak_overlay
    const streak_overlay = this.add.image(180, 352, "streak_blur");
    streak_overlay.scaleX = 0.3333;
    streak_overlay.scaleY = 0.3333;
    streak_popup.add(streak_overlay);

    // streak_text
    const streak_text = this.add.text(180, 351, "", {});
    streak_text.setOrigin(0.5, 0.5);
    streak_text.text = "10 STREAK";
    streak_text.setStyle({
      align: "center",
      color: "#fcb320",
      fontFamily: "Afolkalips",
      fontSize: "32px",
    });
    streak_popup.add(streak_text);

    // perfect_1
    const perfect_1 = this.add.image(60, 525, "Perfect_1");
    perfect_1.alpha = 0.5;
    perfect_1.alphaTopLeft = 0.5;
    perfect_1.alphaTopRight = 0.5;
    perfect_1.alphaBottomLeft = 0.5;
    perfect_1.alphaBottomRight = 0.5;

    // perfect_2
    const perfect_2 = this.add.image(180, 525, "Perfect_2");
    perfect_2.alpha = 0.5;
    perfect_2.alphaTopLeft = 0.5;
    perfect_2.alphaTopRight = 0.5;
    perfect_2.alphaBottomLeft = 0.5;
    perfect_2.alphaBottomRight = 0.5;

    // perfect_3
    const perfect_3 = this.add.image(300, 525, "Perfect_3");
    perfect_3.alpha = 0.5;
    perfect_3.alphaTopLeft = 0.5;
    perfect_3.alphaTopRight = 0.5;
    perfect_3.alphaBottomLeft = 0.5;
    perfect_3.alphaBottomRight = 0.5;

    // colour_highlight
    const colour_highlight = this.add.image(61, 525, "Colour highlight");
    colour_highlight.scaleX = 0.1;
    colour_highlight.scaleY = 0.09;

    // colour_highlight_1
    const colour_highlight_1 = this.add.image(181, 525, "Colour highlight");
    colour_highlight_1.scaleX = 0.1;
    colour_highlight_1.scaleY = 0.09;
    colour_highlight_1.flipX = true;

    // colour_highlight_2
    const colour_highlight_2 = this.add.image(301, 525, "Colour highlight");
    colour_highlight_2.scaleX = 0.1;
    colour_highlight_2.scaleY = 0.09;
    colour_highlight_2.flipY = true;

    // song_complete_overlay
    const song_complete_overlay = this.add.layer();
    song_complete_overlay.visible = false;

    // bG
    const bG = this.add.image(180, 320, "BG_1");
    bG.scaleX = 0.3333;
    bG.scaleY = 0.3333;
    song_complete_overlay.add(bG);

    // bottom_banner
    const bottom_banner = this.add.image(180, 526.678, "sc_banner");
    bottom_banner.scaleX = 0.3333;
    bottom_banner.scaleY = 0.3333;
    song_complete_overlay.add(bottom_banner);

    // artist_name
    const artist_name = this.add.text(180, 19, "", {});
    artist_name.setOrigin(0.5, 0.5);
    artist_name.text = "artist_name";
    artist_name.setStyle({ color: "#faf05e", fontFamily: "Carlito-Regular", stroke: "#faf05e" });
    song_complete_overlay.add(artist_name);

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
    song_complete_overlay.add(song_name);

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
    song_complete_overlay.add(difficulty_text);

    // round_frame
    const round_frame = this.add.image(180, 202, "Round Frame");
    round_frame.scaleX = 0.3333;
    round_frame.scaleY = 0.3333;
    song_complete_overlay.add(round_frame);

    // carousel
    const carousel = this.add.image(180, 202, "carousel_2");
    carousel.scaleX = 0.6;
    carousel.scaleY = 0.6;
    song_complete_overlay.add(carousel);

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
    song_complete_overlay.add(song_complete_txt);

    // youve_earned_txt
    const youve_earned_txt = this.add.text(142, 392, "", {});
    youve_earned_txt.setOrigin(0.5, 0.5);
    youve_earned_txt.text = "You've earned:";
    youve_earned_txt.setStyle({
      color: "#faf05e",
      fontFamily: "Carlito-Regular",
      fontSize: "20px",
    });
    song_complete_overlay.add(youve_earned_txt);

    // disc
    const disc = this.add.image(180, 551, "Disc");
    disc.scaleX = 0.4;
    disc.scaleY = 0.4;
    song_complete_overlay.add(disc);

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
    song_complete_overlay.add(earn_text);

    // youve_earned_txt_1
    const youve_earned_txt_1 = this.add.text(240, 392, "", {});
    youve_earned_txt_1.setOrigin(0.5, 0.5);
    youve_earned_txt_1.text = "45 discs";
    youve_earned_txt_1.setStyle({ fontFamily: "Carlito-Regular", fontSize: "20px" });
    song_complete_overlay.add(youve_earned_txt_1);

    // youve_earned_txt_2
    const youve_earned_txt_2 = this.add.text(180, 456.1981865735109, "", {});
    youve_earned_txt_2.setOrigin(0.5, 0.5);
    youve_earned_txt_2.text = "YOU NOW HAVE";
    youve_earned_txt_2.setStyle({ align: "center", fontFamily: "Carlito-Bold", fontSize: "20px" });
    song_complete_overlay.add(youve_earned_txt_2);

    // disc_count_txt
    const disc_count_txt = this.add.text(150, 484, "", {});
    disc_count_txt.setOrigin(0.5, 0.5);
    disc_count_txt.text = "30";
    disc_count_txt.setStyle({ align: "center", fontFamily: "Carlito-Bold", fontSize: "20px" });
    song_complete_overlay.add(disc_count_txt);

    // disc_count_txt_1
    const disc_count_txt_1 = this.add.text(193, 484, "", {});
    disc_count_txt_1.setOrigin(0.5, 0.5);
    disc_count_txt_1.text = "DISCS";
    disc_count_txt_1.setStyle({ align: "center", fontFamily: "Carlito-Bold", fontSize: "20px" });
    song_complete_overlay.add(disc_count_txt_1);

    // lists
    const ui_layer = [
      multiplier_text,
      score_text,
      song_name_text,
      artist_text,
      perfect_3,
      perfect_2,
      perfect_1,
    ];

    this.vignette = vignette;
    this.pattern = pattern;
    this.artist_text = artist_text;
    this.song_name_text = song_name_text;
    this.score_text = score_text;
    this.pause_btn = pause_btn;
    this.multiplier_text = multiplier_text;
    this.tap_zone_area = tap_zone_area;
    this.divider_1 = divider_1;
    this.divider_2 = divider_2;
    this.feedback_text = feedback_text;
    this.bar = bar;
    this.streak_popup = streak_popup;
    this.streak_overlay = streak_overlay;
    this.streak_text = streak_text;
    this.song_complete_overlay = song_complete_overlay;
    this.artist_name = artist_name;
    this.song_name = song_name;
    this.difficulty_text = difficulty_text;
    this.carousel = carousel;
    this.earn_text = earn_text;
    this.disc_count_txt = disc_count_txt;
    this.ui_layer = ui_layer;

    this.events.emit("scene-awake");
  }

  /** @type {Phaser.GameObjects.Image} */
  vignette;
  /** @type {Phaser.GameObjects.Image} */
  pattern;
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
  bar;
  /** @type {Phaser.GameObjects.Container} */
  streak_popup;
  /** @type {Phaser.GameObjects.Image} */
  streak_overlay;
  /** @type {Phaser.GameObjects.Text} */
  streak_text;
  /** @type {Phaser.GameObjects.Layer} */
  song_complete_overlay;
  /** @type {Phaser.GameObjects.Text} */
  artist_name;
  /** @type {Phaser.GameObjects.Text} */
  song_name;
  /** @type {Phaser.GameObjects.Text} */
  difficulty_text;
  /** @type {Phaser.GameObjects.Image} */
  carousel;
  /** @type {Phaser.GameObjects.Text} */
  earn_text;
  /** @type {Phaser.GameObjects.Text} */
  disc_count_txt;
  /** @type {Array<Phaser.GameObjects.Text|Phaser.GameObjects.Image>} */
  ui_layer;

  /* START-USER-CODE */

  // Write your code here

  init(data) {
    this.midi = data.midi;
    this.track = data.track;
    this.isFTUE = data.isFTUE;
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

    // this.load.image("rythm_line", "/assets/sprites/playscene/rythm_line.png");
  }

  create() {
    console.log("Level.js create()");

    this.editorCreate();
    this.adjustViewport();
    // this.scale.setGameSize(360, 640);
    this.baseTileTextures = [
      "Tile 1",
      "Tile 2",
      "Tile 3",
      "Tile 4", // Add your aesthetic texture keys here
    ];

    // this.baseTileTextures = [
    //   "beats2", // Add your aesthetic texture keys here
    // ];

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
    this.screenWidth = 360; //this.cameras.main.width;
    this.screenHeight = 640;
    this.screenCenterX = this.cameras.main.worldView.x + this.screenWidth / 2;
    this.screenCenterY = this.cameras.main.worldView.y + this.screenHeight / 2;

    this.soundMarkers = [];
    this.lineMarkers = [];

    this.tileDuration = this.midi.tracks[0].notes[0].velocity * 5 || 1.4;
    this.lineDuration = this.tileDuration;

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

      this.detectWhiteLines(notes);
    });

    this.createLineGroup();

    this.initScoring();
    this.initStreakProgressBar(); // Add this line

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
    if (this.isFTUE) {
      this.pause_btn.setVisible(false);
      this.pause_btn.disableInteractive();
    }

    // this.tapZone = this.add
    //   .image(this.screenCenterX, this.screenHeight * this.tileTarget, "tapZone")
    //   .setOrigin(0.5);

    this.ui_layer.forEach((asset) => {
      asset.setDepth(3);
    });

    this.divider_1.setDepth(2.5);
    this.divider_2.setDepth(2.5);
    this.streak_popup.setDepth(3.9);

    this.path = this.add
      .rectangle(0, 0, this.screenWidth / 3, this.screenHeight, 0x90ee90)
      .setOrigin(0.5, 0)
      .setAlpha(0.5)
      .setDepth(0)
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

    this.tileEmitter = this.add
      .particles(0, 0, "particle_1", {
        speed: { min: 50, max: 250 },
        angle: { min: 0, max: 360 },
        scale: { start: 1.2, end: 0 },
        blendMode: "ADD",
        lifespan: 500,
        gravityY: 300,
        emitting: false,
      })
      .setDepth(10);

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
    this.fps_text.text = "";
    this.fps_text.setStyle({
      color: "#666363ff",
      fontFamily: "Righteous-Regular",
      fontSize: "13px",
      stroke: "#666363ff",
    });

    this.addProgressBar();
    // this.initializeVisualizer();
    this.vignette.setDepth(2);
    // this.pattern.setDepth(2);

    this.scene.get("BeatMissed").continueCount = 0;
  }

  detectWhiteLines(notes) {
    let hasC3 = false;
    this.lineMarkers = [];

    notes.forEach((note, idx) => {
      if (note.name === "C3" && note.velocity === 1.0) {
        this.lineMarkers.push({
          name: `lineMarker_${idx}`,
          start: note.time,
        });
        hasC3 = true;
      }
    });

    if (!hasC3) {
      console.warn("No C3 notes found! Skipping white line logic.");
    }
  }

  createLineGroup() {
    this.lineGroup = this.add.group();
  }
  spawnLine(marker) {
    if (!this.lineGroup) return;

    // let line = this.add.rectangle(
    //   this.screenCenterX,
    //   0, // Original starting position
    //   this.screenWidth,
    //   3,
    //   0x848484
    // );

    let line = this.add.image(this.screenCenterX, 0, "rythm_line");

    line.setDepth(2);
    line.setAlpha(0.5);
    line.start = marker.start;
    this.lineGroup.add(line);
  }

  updateWhiteLines(seek) {
    if (this.lineMarkers.length === 0 && this.lineGroup.getChildren().length === 0) return;

    if (!this.music.isPlaying) {
      console.log("music stopped, forcing remaining lines to finish");
      seek = this.music.duration + 1;
    }

    while (this.lineMarkers.length > 0 && seek + this.lineDuration >= this.lineMarkers[0].start) {
      let lineMarker = this.lineMarkers.shift();
      this.spawnLine(lineMarker);
    }

    if (this.lineGroup) {
      this.lineGroup.getChildren().forEach((line, index) => {
        let lineLerp = Math.max(0, (seek - line.start + this.lineDuration) / this.lineDuration);

        let startY = 0;
        let targetY = this.screenHeight * this.tileTarget;
        let bottomY = this.screenHeight;

        let adjustedY = Phaser.Math.Linear(startY, targetY, lineLerp);

        if (adjustedY >= targetY) {
          let progressPastTarget = (adjustedY - targetY) / (bottomY - targetY);
          adjustedY = Phaser.Math.Linear(targetY, bottomY, progressPastTarget);
        }

        line.setY(adjustedY);

        if (!this.music.isPlaying && line.y >= this.screenHeight) {
          console.log(`Destroying line ${index} at Y: ${line.y}`);
          line.destroy();
        }
      });
    }
  }

  initScoring() {
    this.totalTiles = this.soundMarkers.length;
    this.streakThreshold = 10;

    this.totalTiles = this.soundMarkers.length;

    // NEW SCORING CALCULATION
    // Calculate how many tiles will be hit at each multiplier level
    let tiles1X = Math.min(this.streakThreshold, this.totalTiles);
    let tiles2X =
      this.totalTiles > this.streakThreshold
        ? Math.min(this.streakThreshold, this.totalTiles - this.streakThreshold)
        : 0;
    let tiles3X =
      this.totalTiles > 2 * this.streakThreshold
        ? Math.min(this.streakThreshold, this.totalTiles - 2 * this.streakThreshold)
        : 0;
    let tiles4X =
      this.totalTiles > 3 * this.streakThreshold
        ? Math.min(this.streakThreshold, this.totalTiles - 3 * this.streakThreshold)
        : 0;
    let tiles5X =
      this.totalTiles > 4 * this.streakThreshold ? this.totalTiles - 4 * this.streakThreshold : 0;

    // Calculate total points worth if all tiles are hit perfectly
    let totalPointsWorth = tiles1X * 1 + tiles2X * 2 + tiles3X * 3 + tiles4X * 4 + tiles5X * 5;

    this.baseScore = this.maxSongScore / totalPointsWorth;
    this.currentMultiplier = 1;
    this.progress = 0;
  }

  initStreakProgressBar() {
    // Create container (background) for streak progress
    this.streak_progress_container = this.add.rectangle(
      180, // Same x position as multiplier_text (centered)
      114, // Just above multiplier_text position
      100, // Width
      4, // Height
      0x076366, // Dark gray background
      0.6 // Alpha
    );
    this.streak_progress_container.setOrigin(0.5, 0.5).setDepth(3);

    // Create the fill (orange part that grows)
    this.streak_progress_fill = this.add.rectangle(
      this.streak_progress_container.x - this.streak_progress_container.width / 2,
      this.streak_progress_container.y,
      0, // Initial width is 0
      this.streak_progress_container.height,
      0xfbf05e // Orange color
    );
    this.streak_progress_fill.setOrigin(0, 0.5).setDepth(3.1); // Slightly higher depth

    // Track active tween to prevent conflicts
    this.activeProgressTween = null;
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
  addProgressBar() {
    this.progressBar = this.add.rectangle(0, 640, 0, 5, 0xffa500);
    this.progressBar.setOrigin(0, 1);
    this.progressBarBg = this.add.rectangle(0, 640, this.screenWidth, 5, 0x000);
    this.progressBarBg.setOrigin(0, 1);
    this.progressBar.setDepth(50);
    this.progressBarBg.setDepth(40);
  }

  initializeVisualizer() {
    const visualizerWidth = this.screenWidth;
    const visualizerHeight = 180;

    const maxPixelRatio = 4;
    const pixelRatio = Math.min(window.devicePixelRatio || 1, maxPixelRatio);

    const canvasWidth = visualizerWidth * pixelRatio;
    const canvasHeight = visualizerHeight * pixelRatio;
    const offscreenCanvas = document.createElement("canvas");
    offscreenCanvas.width = canvasWidth;
    offscreenCanvas.height = canvasHeight;

    if (this.sound.context.state === "suspended") {
      this.sound.context.resume();
    }

    this.audioMotion = new AudioMotionAnalyzer(null, {
      canvas: offscreenCanvas,
      audioCtx: this.sound.context,
      connectSpeakers: false,
      mode: 1,
      radial: false,
      fftSize: 2048,
      smoothing: 0.8,
      showPeaks: false,
      showScaleX: false,
      showScaleY: false,
      showFPS: false,
      minDecibels: -85,
      maxDecibels: -25,
      frequencyScale: "log",
      // fillAlpha: 0.1,
      // lineWidth: 2,
      // weightingFilter: "C",
      barSpace: 0.5,
      bgAlpha: 0,
      loRes: false,
      width: visualizerWidth,
      height: visualizerHeight,
      pixelRatio: 4,
      responsive: false,
      overlay: true,
      channelLayout: "single",
    });

    //Custom visualizer color
    this.audioMotion.registerGradient("custom", {
      colorStops: [
        { pos: 0, color: "#f2d469", level: 0.3 },

        { pos: 1, color: "#4fa3af", level: 1.5 },
      ],
    });

    this.audioMotion.setOptions({
      gradient: "custom",
    });

    this.visualizerTexture = this.textures.createCanvas(
      "visualizerTexture",
      visualizerWidth,
      visualizerHeight
    );

    this.visualizerImage = this.add.image(this.screenCenterX, 50, "visualizerTexture");
    this.visualizerImage.setOrigin(0.5, 0.5);

    this.visualizerImage.setDisplaySize(visualizerWidth, visualizerHeight);

    this.visualizerImage.setAngle(180);

    this.visualizerImage.setDepth(2.5);
    this.visualizerImage.setAlpha(0.5);

    let lastVisualizerUpdate = 0;
    const visualizerUpdateInterval = 100;

    this.audioMotion.onCanvasDraw = () => {
      const now = performance.now();
      if (now - lastVisualizerUpdate >= visualizerUpdateInterval) {
        lastVisualizerUpdate = now;

        const ctx = this.visualizerTexture.context;

        ctx.clearRect(0, 0, visualizerWidth, visualizerHeight);

        ctx.drawImage(
          offscreenCanvas,
          0,
          0,
          canvasWidth,
          canvasHeight,
          0,
          0,
          visualizerWidth,
          visualizerHeight
        );
        this.visualizerTexture.refresh();
      }
    };
  }

  update(time, delta) {
    if (!this.tileGroup) {
      return;
    }
    this.frameTime = this.frameTime * 0.99 + delta * 0.01;
    this.fps = ((1 / this.frameTime) * 1000).toFixed(1);
    this.fps_text.text = this.fps;

    const lowFpsThreshold = 50;

    // if (this.fps < lowFpsThreshold && this.audioMotion && !this.lowFpsMode) {
    //   this.lowFpsMode = true;
    //   console.log("Disabling visualizer due to low FPS");
    //   this.audioMotion.disconnectInput();
    //   this.visualizerImage.setVisible(false);
    // } else if (this.fps >= lowFpsThreshold && this.audioMotion && this.lowFpsMode) {
    //   this.lowFpsMode = false;
    //   console.log("Re-enabling visualizer as FPS improved");
    //   this.audioMotion.connectInput(this.sound.context);
    //   this.visualizerImage.setVisible(true);
    // }

    if (Math.abs(this.scoreDisplay - this.score) > 1) {
      this.scoreDisplay = Phaser.Math.Linear(this.scoreDisplay, this.score, 0.1);
      this.score_text.setText(`${Math.trunc(this.scoreDisplay)}`);
    }

    let seek = this.music?.seek;

    this.updateWhiteLines(seek);

    if (seek >= 0) {
      if (this.soundMarkers.length > 0 && seek + this.tileDuration >= this.soundMarkers[0].start) {
        var marker = this.soundMarkers.shift();
        this.creatOneDrum(marker);
      }

      this.tileGroup.getChildren().forEach((tile) => {
        if (tile.swiped || tile.held) return;

        tile.lerp = Math.max(0, (seek - tile.start + this.tileDuration) / this.tileDuration);

        // Update both base and overlay positions
        tile.setY(Phaser.Math.Linear(0, this.screenHeight * this.tileTarget, tile.lerp));
        tile.setAlpha(tile.lerp);

        if (tile.overlayTile) {
          tile.overlayTile.setY(tile.y);
          tile.overlayTile.setAlpha(tile.lerp);
        }

        if (tile.y > this.screenHeight * this.tileTarget) {
          // Handle cleanup
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

    // Create base aesthetic tile with random texture
    let tile = this.tileGroup
      .create(0, 0, this.baseTileTextures[Math.floor(Math.random() * this.baseTileTextures.length)])
      .setOrigin(0.5, 0.5)
      .setInteractive()
      .setAlpha(0.2)
      .setDepth(4);

    // Create overlay swipe/default texture that moves with the base
    let overlayTile = this.add
      .image(0, 0, "beats2") // Will be changed in placeTile
      .setOrigin(0.5, 0.5)
      .setAlpha(0.2)
      .setDepth(4.1) // Slightly higher depth than base
      .setScale(0.3);
    // Link the overlay to the base tile for reference
    tile.overlayTile = overlayTile;

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

    // Position overlay at same x coordinate
    tile.overlayTile.setX(tile.x);

    tile.laneX = tile.x;
    tile.swiped = false;

    // Define swipe configurations
    const swipeDirections = {
      0.23622047244094488: {
        direction: "up",
        texture: "Right",
        angle: -90,
        validSwipes: ["up"],
      },
      0.3937007874015748: {
        direction: "right",
        texture: "Right",
        angle: 0,
        validSwipes: ["right"],
      },
      0.7086614173228346: {
        direction: "left",
        texture: "Right",
        angle: 180,
        validSwipes: ["left"],
      },
      0.5511811023622047: {
        direction: "down",
        texture: "Right",
        angle: 90,
        validSwipes: ["down"],
      },
      0.7874015748031497: {
        direction: "upleft",
        texture: "Right",
        angle: -135,
        validSwipes: ["up", "left"],
      },
      0.31496062992125984: {
        direction: "upright",
        texture: "Right",
        angle: -45,
        validSwipes: ["up", "right"],
      },
      0.6299212598425197: {
        direction: "downleft",
        texture: "Right",
        angle: 135,
        validSwipes: ["down", "left"],
      },
      0.47244094488188976: {
        direction: "downright",
        texture: "Right",
        angle: 45,
        validSwipes: ["down", "right"],
      },
    };

    const swipeDirection = swipeDirections[velocity];

    if (swipeDirection) {
      tile.tileType = "swipe";
      // Set the overlay texture and angle based on swipe direction
      tile.overlayTile.setTexture(swipeDirection.texture);
      tile.overlayTile.setAngle(swipeDirection.angle);

      let swipe = this.rexGestures.add.swipe(tile, swipeConfig);

      swipe.on("swipe", (swipe, gameObject, lastPointer) => {
        const isValidSwipe = swipeDirection.validSwipes.every(
          (direction) =>
            (direction === "up" && swipe.up) ||
            (direction === "down" && swipe.down) ||
            (direction === "left" && swipe.left) ||
            (direction === "right" && swipe.right)
        );

        if (isValidSwipe) {
          this.handleSwipe(tile, swipe);
        }
      });
    } else if (velocity === 0.007874015748031496) {
      // Set default overlay texture for held notes
      // tile.overlayTile.setTexture("Hold");
      tile.tileType = "held";
      this.handleHeldTile(tile, duration);
    } else {
      tile.tileType = "tap";
      // Set default overlay texture for regular notes
      tile.overlayTile.setTexture("Spot_icon");

      tile.on("pointerup", () => {
        this.tileClicked = false;
      });

      tile.on("pointerdown", () => {
        this.onClickInstrument(tile);
      });
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

    // Create base nineslice tile with larger top/bottom areas (increased from 20 to 40)
    let ninesliceTile = this.add.nineslice(
      tile.x,
      0, // x, y
      "new_held",
      null,
      tile.width,
      initialHeight,
      20,
      20,
      50,
      50
    );

    ninesliceTile.setOrigin(0.5, 1);

    // Set properties
    ninesliceTile.start = tile.start;
    ninesliceTile.duration = duration;
    ninesliceTile.initialHeight = initialHeight;
    ninesliceTile.setDepth(4);
    ninesliceTile.tileType = "held";
    // Replace the original tile with the nineslice tile in the tileGroup
    this.tileGroup.remove(tile);
    this.tileGroup.add(ninesliceTile);

    // Clean up original tile
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

    // Handle cleanup
    ninesliceTile.on("destroy", () => {
      if (tween) {
        tween.stop();
      }
    });
  }

  // Modify checkOverlap to track failed tile type
  checkOverlap(tile) {
    if (tile.y >= this.screenHeight) {
      const failedTileType = tile.tileType || "tap"; // Default to tap if type not set
      this.beatMissedDisplay(failedTileType);
      tile.overlayTile && tile.overlayTile.destroy();
      tile.destroy();
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

  // songComplete() {
  //   this.music.pause();
  //   this.scene.pause();

  //   this.matchedMarkerTracker = [];

  //   const user_data = JSON.parse(localStorage.getItem("user_data"));
  //   const disc_count = user_data.profile.player.total_discs;
  //   this.disc_count_txt.setText(disc_count + 45);

  //   this.artist_name.setText(this.track.artist_name.toUpperCase());

  //   this.song_name.setText(this.track.song_name);

  //   // Create circular mask for carousel
  //   const maskGraphics = this.add.graphics();
  //   maskGraphics.clear();
  //   maskGraphics.fillStyle(0xffffff);
  //   maskGraphics.beginPath();
  //   maskGraphics.arc(180, 202, 100, 0, Math.PI * 2);
  //   maskGraphics.closePath();
  //   maskGraphics.fill();

  //   // Set carousel texture first
  //   this.carousel.setTexture(this.track.thumbnail);

  //   // Calculate the scale to fit the image within the circular mask
  //   const maskRadius = 100; // radius of the circular mask
  //   const imageWidth = this.carousel.width;
  //   const imageHeight = this.carousel.height;
  //   const scale = Math.max(
  //     (maskRadius * 2) / imageWidth,
  //     (maskRadius * 2) / imageHeight
  //   );

  //   // Apply the calculated scale and center the image
  //   this.carousel.setScale(scale);
  //   this.carousel.setPosition(180, 202);

  //   // Create and apply the mask
  //   const mask = new Phaser.Display.Masks.GeometryMask(this, maskGraphics);
  //   this.carousel.setMask(mask);

  //   // Hide the mask graphics
  //   maskGraphics.setVisible(false);

  //   // Store mask references for cleanup
  //   this.carouselMask = mask;
  //   this.maskGraphics = maskGraphics;

  //   this.song_complete_overlay.setVisible(true).setDepth(100);

  //   setTimeout(() => {
  //     this.song_complete_overlay.setVisible(false);
  //     let user_data = JSON.parse(localStorage.getItem("user_data"));
  //     user_data.profile.player.total_discs += 45;
  //     this.game.events.emit("updateUserEvent", { data: user_data });

  //     this.gameOver();
  //   }, 5000);
  // }

  // In Level.js, modify the songComplete method:
  songComplete() {
    this.music.pause();
    this.scene.pause();

    const sceneData = {
      track: this.track,
      score: this.score,
      currentDiscs: JSON.parse(localStorage.getItem("user_data")).profile.player.total_discs,
      earnedDiscs: 45,
      isFTUE: this.isFTUE,
    };

    // Launch SongComplete scene
    this.scene.launch("SongComplete", sceneData);
  }

  handleSwipe(tile, swipe) {
    tile.swiped = true;
    tile.tileType = "swipe";

    this.onClickInstrument(tile, true);

    let movementDistance = 25;

    let tweenConfig = {
      duration: 150,
      ease: "Power1",
      onComplete: () => {
        tile.overlayTile && tile.overlayTile.destroy();
        tile.destroy();
      },
    };

    // Create a new arrow sprite for the swipe effect
    let arrowSprite = this.add
      .image(tile.x, tile.y, "Right")
      .setScale(0.3) // Match the scale used in placeTile
      .setDepth(tile.depth + 1);

    // Hide the original overlay tile
    tile.overlayTile.setVisible(false);

    // if (swipe.up && swipe.right) {
    //   // Up-right diagonal swipe
    //   arrowSprite.angle -= 45;
    //   this.tweens.add({
    //     targets: arrowSprite,
    //     x: tile.x + (movementDistance * Math.sqrt(2)) / 2,
    //     y: tile.y - (movementDistance * Math.sqrt(2)) / 2,
    //     alpha: 0,
    //     ...tweenConfig,
    //   });
    // } else if (swipe.up && swipe.left) {
    //   // Up-left diagonal swipe
    //   arrowSprite.angle -= 135;
    //   this.tweens.add({
    //     targets: arrowSprite,
    //     x: tile.x - (movementDistance * Math.sqrt(2)) / 2,
    //     y: tile.y - (movementDistance * Math.sqrt(2)) / 2,
    //     alpha: 0,
    //     ...tweenConfig,
    //   });
    // } else if (swipe.down && swipe.right) {
    //   // Down-right diagonal swipe
    //   arrowSprite.angle += 45;
    //   this.tweens.add({
    //     targets: arrowSprite,
    //     x: tile.x + (movementDistance * Math.sqrt(2)) / 2,
    //     y: tile.y + (movementDistance * Math.sqrt(2)) / 2,
    //     alpha: 0,
    //     ...tweenConfig,
    //   });
    // } else if (swipe.down && swipe.left) {
    //   // Down-left diagonal swipe
    //   arrowSprite.angle += 135;
    //   this.tweens.add({
    //     targets: arrowSprite,
    //     x: tile.x - (movementDistance * Math.sqrt(2)) / 2,
    //     y: tile.y + (movementDistance * Math.sqrt(2)) / 2,
    //     alpha: 0,
    //     ...tweenConfig,
    //   });
    // } else
    if (swipe.up) {
      arrowSprite.angle -= 90;
      this.tweens.add({
        targets: arrowSprite,
        y: tile.y - movementDistance * 2,
        alpha: 0,
        ...tweenConfig,
      });
    } else if (swipe.down) {
      arrowSprite.angle += 90;
      this.tweens.add({
        targets: arrowSprite,
        y: tile.y + movementDistance * 4,
        alpha: 0,
        ...tweenConfig,
      });
    } else if (swipe.left) {
      arrowSprite.angle -= 180;
      this.tweens.add({
        targets: arrowSprite,
        x: tile.x - movementDistance,
        alpha: 0,
        ...tweenConfig,
      });
    } else if (swipe.right) {
      this.tweens.add({
        targets: arrowSprite,
        x: tile.x + movementDistance,
        alpha: 0,
        ...tweenConfig,
      });
    }

    // Fade out the base tile
    this.tweens.add({
      targets: tile,
      alpha: 0,
      duration: 150,
      ease: "Power1",
    });
  }

  resetStreak() {
    if (this.currentMultiplier >= 2) {
      this.streak_text.setText("STREAK LOST");
      this.streak_text.setColor("#fe3400");
      this.streak_overlay.setTexture("streak_blur_red");
      this.streak_popup.setVisible(true);
      setTimeout(() => {
        this.streak_popup.setVisible(false);
      }, 700);
    }
    this.currentMultiplier = 1;
    this.progress = 0;

    // Reset progress bar
    if (this.streak_progress_fill) {
      // Stop any active tween
      if (this.activeProgressTween) {
        this.tweens.remove(this.activeProgressTween);
      }

      // Animate to zero width
      this.activeProgressTween = this.tweens.add({
        targets: this.streak_progress_fill,
        width: 0,
        duration: 300, // Slightly longer for reset animation
        ease: "Power2",
      });
    }
  }

  streakDisplay() {
    // this.multiplier_emitter.explode(this.lowFpsMode ? 10 : 20);

    this.streak_popup.x = -180;
    this.streak_popup.setVisible(true);
    this.streak_text.setColor("#fcb320");
    this.streak_overlay.setTexture("streak_blur");
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

  // Update beatMissedDisplay to handle tile type
  beatMissedDisplay(tileType = "tap") {
    this.music.pause();
    this.scene.pause();

    let children = this.tileGroup.getChildren();
    let tilesToRemove = children.slice(0, 3);
    tilesToRemove.forEach((tile) => {
      tile.overlayTile && tile.overlayTile.destroy();
      tile.destroy();
    });

    console.log("tileType", tileType);

    // Pass the tile type to the BeatMissed scene

    // this.scene.launch("BeatMissed", { failedTileType: tileType });

    if (this.isFTUE) {
      this.ftueFail(tileType);
    } else {
      this.scene.bringToTop("BeatMissed");
      this.scene.launch("BeatMissed");
    }
  }

  onClickInstrument(tile, swiped = false, held = false) {
    let accuracy = Math.abs(tile.lerp - 1);

    if (held) {
      // accuracy -= 0.04;
      accuracy -= 0.02 + 0.02 * Math.log10(1 + tile.duration || 0);
    }

    // if (navigator.vibrate) {
    //   navigator.vibrate(100);
    // }

    this.tileClicked = true;
    let perfect_plus = false;
    let tile_score = 0;
    // console.log(accuracy);

    switch (true) {
      case accuracy < 0.1:
        perfect_plus = true;
        tile_score = this.baseScore * this.currentMultiplier;
        this.score += tile_score;
        this.progress += 1;
        this.feebackText("perfect+");
        this.highlightPath(tile.x, "green");
        break;
      case accuracy < 0.15:
      case accuracy >= 0.15 && accuracy <= 0.2:
        tile_score = this.baseScore * this.currentMultiplier;
        this.score += tile_score * 0.7;
        this.progress += 1;
        this.feebackText("perfect");
        this.highlightPath(tile.x, "green");
        break;
      case accuracy < 0.38:
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

      // Reset progress bar when reaching threshold
      if (this.streak_progress_fill) {
        if (this.activeProgressTween) {
          this.tweens.remove(this.activeProgressTween);
        }

        // If we just reached max multiplier (5), keep the bar full instead of resetting
        if (this.currentMultiplier >= 5) {
          this.activeProgressTween = this.tweens.add({
            targets: this.streak_progress_fill,
            width: this.streak_progress_container.width, // Full width
            duration: 300,
            ease: "Power2",
          });
        } else {
          // Normal reset behavior
          this.activeProgressTween = this.tweens.add({
            targets: this.streak_progress_fill,
            width: 0,
            duration: 300,
            ease: "Power2",
          });
        }
      }

      if (this.currentMultiplier > 5) {
        this.currentMultiplier = 5;
      }
    }

    // Update streak progress bar
    if (this.streak_progress_fill && this.streak_progress_container) {
      // Stop any active tween to prevent conflicts
      if (this.activeProgressTween) {
        this.tweens.remove(this.activeProgressTween);
      }
      // If at max multiplier, always keep the bar full
      if (this.currentMultiplier >= 5) {
        this.activeProgressTween = this.tweens.add({
          targets: this.streak_progress_fill,
          width: this.streak_progress_container.width, // Full width
          duration: 200,
          ease: "Power1",
        });
      } else {
        // Normal progress tracking for multipliers 1-4
        const progressRatio = this.progress / this.streakThreshold;
        const targetWidth = this.streak_progress_container.width * progressRatio;

        this.activeProgressTween = this.tweens.add({
          targets: this.streak_progress_fill,
          width: targetWidth,
          duration: 200,
          ease: "Power1",
        });
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
          tile.overlayTile && tile.overlayTile.destroy();
          tile.destroy();
        },
      });
    }

    if (!swiped && !held) {
      this.tileActiveFlash(tile, accuracy < 0.02);
      this.tileEmitter.setPosition(tile.x, tile.y);
      this.tileEmitter.explode(10);
    }
  }

  tileActiveFlash(tile, perfect_plus) {
    var tile_active = this.add.image(tile.x, 0, "tile_active").setDepth(10);
    console.log("here");

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
      this.path.setFillStyle(0x5dfe7b, 0.52).x = x;
    } else {
      this.path.setFillStyle(0xfed85d, 0.52).x = x;
    }

    // Reset alpha and make visible
    this.path.setAlpha(1).setVisible(true);

    // Create a tween to fade out
    this.tweens.add({
      targets: this.path,
      alpha: 0,
      duration: 200,
      onComplete: () => {
        this.path.setVisible(false);
      },
    });
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

    if (this.carouselMask) {
      this.carouselMask.destroy();
    }
    if (this.maskGraphics) {
      this.maskGraphics.destroy();
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

  ftueFail(tileType) {
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

    if (tileType == "tap") {
      this.scene.start("BeatMissedTap", { track: this.track });
    }
    if (tileType == "swipe") {
      this.scene.start("BeatMissedSwipe", { track: this.track });
    }
    if (tileType == "held") {
      this.scene.start("BeatMissedHeld", { track: this.track });
    }
  }

  ftueGameOver() {
    this.music.stop();
    this.matchedMarkerTracker = [];
    clearInterval(this.globalInterval);

    this.track.current_score = this.score;
    this.track.midi = this.midi;

    this.cleanUp();
    this.scene.stop("Level");
    this.scene.start("GameOverFTUE", { track: this.track });
  }

  countDown() {
    let countdown_sfx = this.sound.add("countdown_sfx", {
      volume: 0.7,
      loop: false,
    });

    // this.ui_layer.forEach((child) => {
    //   child.setAlpha(0);
    //   child.setScale(0);
    // });

    // this.overlay.setDepth(5);

    this.initialTime = 3;
    this.get_ready_text = this.add
      .text(this.screenCenterX, this.screenCenterY - 50, "GET READY", {
        fontFamily: "Afolkalips",
        fontSize: "50px",
        fill: "#fcb320",
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
        fontFamily: "Afolkalips",
        fontSize: "75px",
        fill: "#fcb320",
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
        this.sound.play("countdown_sfx", { volume: 1, loop: false });
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
        // this.tweens.add({
        //   targets: this.overlay,
        //   alpha: 0,
        //   ease: "Linear",
        //   duration: 250,
        //   onComplete: () => {
        //     this.overlay.setVisible(false);
        //     this.overlay.setAlpha(1);
        //   },
        // });

        this.createMusic();
        this.createTileGroup();
        this.pause_btn.setInteractive().setDepth(50);
        clearInterval(intervalId);

        // this.ui_layer.forEach((child) => {
        //   this.tweens.add({
        //     targets: child,
        //     alpha: { from: 0, to: 1 },
        //     scaleX: { from: 0, to: 1 },
        //     scaleY: { from: 0, to: 1 },
        //     ease: "Power1",
        //     duration: 250,
        //   });
        // });
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
