// You can write more code here

/* START OF COMPILED CODE */

class Pause extends Phaser.Scene {
  constructor() {
    super("Pause");

    /* START-USER-CTR-CODE */

    /* END-USER-CTR-CODE */
  }

  /** @returns {void} */
  editorCreate() {
    // pause_BG
    const pause_BG = this.add.image(180, 320, "Pause_BG");
    pause_BG.scaleX = 0.3333;
    pause_BG.scaleY = 0.3333;

    // pause_text
    const pause_text = this.add.text(180, 177, "", {});
    pause_text.setOrigin(0.5, 0.5);
    pause_text.text = "Paused";
    pause_text.setStyle({
      color: "#ff6a00",
      fontFamily: "Afolkalips",
      fontSize: "65px",
      stroke: "#ff6a00",
    });

    // continue_btn
    const continue_btn = this.add.image(180, 527, "Continue");
    continue_btn.scaleX = 0.3333;
    continue_btn.scaleY = 0.3333;

    // quit_btn
    const quit_btn = this.add.image(180, 599, "Quit");
    quit_btn.scaleX = 0.3333;
    quit_btn.scaleY = 0.3333;

    this.continue_btn = continue_btn;
    this.quit_btn = quit_btn;

    this.events.emit("scene-awake");
  }

  /** @type {Phaser.GameObjects.Image} */
  continue_btn;
  /** @type {Phaser.GameObjects.Image} */
  quit_btn;

  /* START-USER-CODE */

  // Write your code here

  create() {
    this.editorCreate();
    this.adjustViewport();
    const router = this.registry.get("router");

    this.continue_btn.setInteractive();
    this.continue_btn.on("pointerup", () => {
      // start_sfx.play();
      this.scene.stop();
      this.scene.resume("Level");
    });

    this.quit_btn.setInteractive();
    this.quit_btn.on("pointerup", () => {
      const levelScene = this.scene.get("Level");
      levelScene.cleanUp(); // clean-up Level scene
      this.scene.stop("Level");
      // this.scene.start("BufferScene");
      router.push("/");
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
