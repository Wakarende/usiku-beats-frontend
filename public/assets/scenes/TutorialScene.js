// You can write more code here

/* START OF COMPILED CODE */

class TutorialScene extends Phaser.Scene {
  constructor() {
    super("TutorialScene");

    /* START-USER-CTR-CODE */
    // Write your code here.
    /* END-USER-CTR-CODE */
  }

  /** @returns {void} */
  editorCreate() {
    // tutorial_BG
    const tutorial_BG = this.add.image(180, 320, "Tutorial_BG");
    tutorial_BG.scaleX = 0.3333;
    tutorial_BG.scaleY = 0.3333;

    // pause_text
    const pause_text = this.add.text(180, 43, "", {});
    pause_text.setOrigin(0.5, 0.5);
    pause_text.text = "How to Play";
    pause_text.setStyle({
      color: "#ff6a00",
      fontFamily: "Afolkalips",
      fontSize: "58px",
      stroke: "#ff6a00",
    });

    // artist_name
    const artist_name = this.add.text(180, 97, "", {});
    artist_name.setOrigin(0.5, 0.5);
    artist_name.text = "Tap in time to the music ... \nand don't miss a beat";
    artist_name.setStyle({
      align: "center",
      color: "#faf05e",
      fontFamily: "Carlito-Regular",
      fontSize: "20px",
      stroke: "#faf05e",
    });

    // artist_name_1
    const artist_name_1 = this.add.text(148, 176, "", {});
    artist_name_1.angle = -4;
    artist_name_1.setOrigin(0.5, 0.5);
    artist_name_1.text = "Tiles drop down\nfrom the top of\nyour screen ";
    artist_name_1.setStyle({
      align: "center",
      color: "#fcb320",
      fontFamily: "Carlito-Regular",
      fontSize: "18px",
      stroke: "#fcb320",
    });

    // artist_name_2
    const artist_name_2 = this.add.text(138, 257, "", {});
    artist_name_2.angle = -4;
    artist_name_2.setOrigin(0.5, 0.5);
    artist_name_2.text = "Tap, swipe or hold \ntiles when they\nreach this tap zone";
    artist_name_2.setStyle({
      align: "center",
      color: "#fcb320",
      fontFamily: "Carlito-Regular",
      fontSize: "18px",
      stroke: "#fcb320",
    });

    // start_button
    const start_button = this.add.image(180, 596, "start button copy");
    start_button.scaleX = 0.3333;
    start_button.scaleY = 0.3333;

    this.artist_name = artist_name;
    this.artist_name_1 = artist_name_1;
    this.artist_name_2 = artist_name_2;
    this.start_button = start_button;

    this.events.emit("scene-awake");
  }

  /** @type {Phaser.GameObjects.Text} */
  artist_name;
  /** @type {Phaser.GameObjects.Text} */
  artist_name_1;
  /** @type {Phaser.GameObjects.Text} */
  artist_name_2;
  /** @type {Phaser.GameObjects.Image} */
  start_button;

  /* START-USER-CODE */

  // Write your code here

  init(data) {
    this.midi = data.midi;
    this.track = data.track;
    this.isFTUE = data.isFTUE;
  }

  create() {
    this.editorCreate();
    this.adjustViewport();

    this.button_sfx = this.registry.get("button_sfx");
    this.background_music = this.registry.get("background_music");
    this.background_music.play();

    this.start_button.setInteractive();
    this.start_button.on("pointerup", () => {
      this.cameras.main.fadeOut(500);
      this.cameras.main.once("camerafadeoutcomplete", () => {
        this.button_sfx.play();
        this.background_music.stop();
        this.scene.start("Level", { track: this.track, midi: this.midi, isFTUE: this.isFTUE });
      });
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
