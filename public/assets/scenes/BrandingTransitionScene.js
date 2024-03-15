// You can write more code here

/* START OF COMPILED CODE */

class BrandingTransitionScene extends Phaser.Scene {

	constructor() {
		super("BrandingTransitionScene");

		/* START-USER-CTR-CODE */
    // Write your code here.
    /* END-USER-CTR-CODE */
	}

	/** @returns {void} */
	editorCreate() {

		// branding_transition_background
		this.add.image(180, 320, "branding_transition_background");

		// loading_txt
		const loading_txt = this.add.text(180, 84.21152150692235, "", {});
		loading_txt.setOrigin(0.5, 0.5);
		loading_txt.text = "LOADING SONG";
		loading_txt.setStyle({ "fontFamily": "DINPro", "fontSize": "12px" });

		// loading
		const loading = this.add.image(118, 105, "beat_meter_empty");
		loading.setOrigin(0, 0.5);

		this.loading = loading;

		this.events.emit("scene-awake");
	}

	/** @type {Phaser.GameObjects.Image} */
	loading;

	/* START-USER-CODE */

  // Write your code here
  preload() {
    this.editorCreate();
    this.loading.setOrigin(0, 0.5);
    this.loading.scaleX = 0;

    this.load.on(Phaser.Loader.Events.PROGRESS, (p) => {
      // console.log(Math.round(p/1 * 100))
      console.log(p);
      //   this.percentage.setText("LOADING..." + Math.round((p / 1) * 100) + " %");
      this.loading.scaleX = p + 0.66;
    });

    this.load.audio(
      `${this.track.song_name}`,
      this.track.mp3_url
    );

    this.load.on("filecomplete", (p) => {
      console.log("file", p);
    });

    // this.current_asset.setVisible(true)
    // this.load.on('addfile', p => {
    // 	this.current_asset.setText(p)
    // });

    // this.load.on('loaderror', p => {
    // 	console.log('preloadError - hardReloading', p)
    // 	location.reload()
    // });

    // this.load.on("complete", () => {
    //   console.log("complete");
    // });
  }

  init(data) {
    // background_music.play()
    // console.log(data);
    this.track = data.track;
    // this.editorCreate();
    console.log('loading', this.track.song_name);
  }

  async create() {
    console.log("BrandingTransition create()");
    // this.midi = await Midi.fromUrl(`assets/sounds/${this.track.song_name}.mid`);

    this.midi = await Midi.fromUrl(this.track.midi_url);

        // "this" is your current scene.
    this.cameras.main.fadeOut(500); // the number is the duration in ms

    this.cameras.main.once("camerafadeoutcomplete", () => {
      // background_music.stop()
      this.scene.start("Level", { track: this.track, midi: this.midi });
    });
  }

  /* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
