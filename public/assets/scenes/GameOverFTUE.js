// You can write more code here

/* START OF COMPILED CODE */

class GameOverFTUE extends Phaser.Scene {
  constructor() {
    super("GameOverFTUE");

    /* START-USER-CTR-CODE */
    // Write your code here.
    /* END-USER-CTR-CODE */
  }

  /** @returns {void} */
  editorCreate() {
    // fTUE_Game_summary
    const fTUE_Game_summary = this.add.image(180, 320, "FTUE_Game summary");
    fTUE_Game_summary.scaleX = 0.3333;
    fTUE_Game_summary.scaleY = 0.3333;

    // choose_song_button
    const choose_song_button = this.add.image(180, 541, "Choose song button");
    choose_song_button.scaleX = 0.3333;
    choose_song_button.scaleY = 0.3333;

    // text_1
    const text_1 = this.add.text(180, 421.93804067328125, "", {});
    text_1.setOrigin(0.5, 0.5);
    text_1.text =
      "You've learnt the basics... \nnow let's use your Discs \nto unlock your first song";
    text_1.setStyle({
      align: "center",
      color: "#faf05e",
      fontFamily: "Carlito-Regular",
      fontSize: "20px",
      stroke: "#faf05e",
    });

    this.choose_song_button = choose_song_button;

    this.events.emit("scene-awake");
  }

  /** @type {Phaser.GameObjects.Image} */
  choose_song_button;

  /* START-USER-CODE */

  // Write your code here

  init() {
    this.analytics = this.registry.get("analytics");
    this.logAnalytics = this.registry.get("logAnalytics");
    this.sessionId = this.registry.get("sessionId");
  }

  create() {
    this.analytics.trackFTUEStep("2 - SongComplete");
    if (this.logAnalytics && this.sessionId) {
      this.logAnalytics(this.sessionId, `game_over_ftue`);
      console.log(`game_over_ftue`);
    }

    this.editorCreate();
    this.adjustViewport();
    const router = this.registry.get("router");

    this.ftueCompleted = true;

    this.choose_song_button.setInteractive();
    this.choose_song_button.on("pointerup", () => {
      this.analytics.trackFTUEStep("2.1 - Choose Song");
      if (this.logAnalytics && this.sessionId) {
        this.logAnalytics(this.sessionId, `choose_song_click`);
        console.log(`choose_song_click`);
      }
      this.button_sfx.play();
      this.background_music.stop();
      this.scene.stop("GameOverSceneFTUE");

      this.scene.manager.scenes.forEach((scene) => {
        this.scene.stop(scene.scene.key);
      });
      this.game.events.emit("destroyGame");

      router.push({
        pathname: "/hub",
        query: { ftueGameplayCompleted: this.ftueCompleted, fromGame: "true"},
      });
    });

    this.button_sfx = this.registry.get("button_sfx");
    this.background_music = this.registry.get("background_music");
    this.background_music.play();

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

  /* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
