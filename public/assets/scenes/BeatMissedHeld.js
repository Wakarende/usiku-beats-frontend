// You can write more code here

/* START OF COMPILED CODE */

class BeatMissedHeld extends Phaser.Scene {
  constructor() {
    super("BeatMissedHeld");

    /* START-USER-CTR-CODE */
    // Write your code here.
    /* END-USER-CTR-CODE */
  }

  /** @returns {void} */
  editorCreate() {
    // missed_a_beat_Tap
    const missed_a_beat_Tap = this.add.image(180, 320, "Missed a beat_Hold");
    missed_a_beat_Tap.scaleX = 0.3333;
    missed_a_beat_Tap.scaleY = 0.3333;

    // try_again_btn
    const try_again_btn = this.add.image(180, 572, "Try again");
    try_again_btn.scaleX = 0.3333;
    try_again_btn.scaleY = 0.3333;

    // text_1
    const text_1 = this.add.text(180, 143, "", {});
    text_1.setOrigin(0.5, 0.5);
    text_1.text = "HOLD these beats by tapping\nand holding until the tile ends.";
    text_1.setStyle({
      align: "center",
      color: "#faf05e",
      fontFamily: "Carlito-Regular",
      fontSize: "20px",
      stroke: "#faf05e",
    });

    // text_2
    const text_2 = this.add.text(180, 216, "", {});
    text_2.setOrigin(0.5, 0.5);
    text_2.text = "Release in the Perfect Zone\nfor top points!";
    text_2.setStyle({
      align: "center",
      color: "#faf05e",
      fontFamily: "Carlito-Regular",
      fontSize: "20px",
      stroke: "#faf05e",
    });

    this.try_again_btn = try_again_btn;

    this.events.emit("scene-awake");
  }

  /** @type {Phaser.GameObjects.Image} */
  try_again_btn;

  /* START-USER-CODE */

  // Write your code here
  init(data) {
    this.track = data.track;
  }

  create() {
    this.editorCreate();
    this.adjustViewport();
    this.cameras.main.shake(500, 0.0025);

    const scratch_sound = this.sound.add("scratch_sound", { volume: 0.7, loop: false });
    scratch_sound.play();

    this.button_sfx = this.registry.get("button_sfx");
    this.background_music = this.registry.get("background_music");
    this.background_music.play();

    this.analytics.trackCustomEvent("FTUE", "beat_missed_shown", "held");

    this.try_again_btn.setInteractive();
    this.try_again_btn.on("pointerup", () => {
      this.scene.stop();
      this.button_sfx.play();
      this.background_music.stop();

      this.analytics.trackCustomEvent("FTUE", "retry_clicked", "held");

      this.scene.stop("BeatMissedHeld");
      this.scene.start("Level", { track: this.track, midi: this.track.midi, isFTUE: true });
    });
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

  /* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
