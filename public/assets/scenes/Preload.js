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
		const logos_background = this.add.image(180, 322, "branding_transition_background");
		logos_background.visible = false;

		// loading
		const loading = this.add.image(115, 593, "beat_meter_empty");
		loading.setOrigin(0, 0.5);

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
		const loading_txt = this.add.text(180, 570, "", {});
		loading_txt.setOrigin(0.5, 0.5);
		loading_txt.text = "LOADING";
		loading_txt.setStyle({ "fontFamily": "DINPro", "fontSize": "15px" });

		// beats_logo
		const beats_logo = this.add.image(173, 245, "beats_logo");
		beats_logo.scaleX = 0.4;
		beats_logo.scaleY = 0.4;
		beats_logo.visible = false;

		// play_button
		const play_button = this.add.image(180, 593, "play_button");
		play_button.scaleX = 0.8;
		play_button.scaleY = 0.8;
		play_button.visible = false;

		// play_text
		const play_text = this.add.text(180, 593, "", {});
		play_text.setOrigin(0.5, 0.5);
		play_text.visible = false;
		play_text.text = "LET'S GO!";
		play_text.setStyle({ "fontFamily": "DINPro", "fontSize": "22px" });

		// thumbnail_image
		const thumbnail_image = this.add.image(180, 203, "carousel_2");

		// text_1
		const text_1 = this.add.text(40, 362, "", {});
		text_1.text = "Song:";
		text_1.setStyle({ "fontFamily": "Righteous-Regular", "fontSize": "19px", "fontStyle": "bold" });

		// text
		const text = this.add.text(40, 402, "", {});
		text.text = "Artist:";
		text.setStyle({ "fontFamily": "Righteous-Regular", "fontSize": "19px", "fontStyle": "bold" });

		// text_2
		const text_2 = this.add.text(40, 442, "", {});
		text_2.text = "Country:";
		text_2.setStyle({ "fontFamily": "Righteous-Regular", "fontSize": "19px", "fontStyle": "bold" });

		// text_3
		const text_3 = this.add.text(40, 482, "", {});
		text_3.text = "My High Score:";
		text_3.setStyle({ "fontFamily": "Righteous-Regular", "fontSize": "19px", "fontStyle": "bold" });

		// song_name
		const song_name = this.add.text(201, 364, "", {});
		song_name.text = "Song:";
		song_name.setStyle({ "fontFamily": "DINPro", "fontSize": "18px", "maxLines":1});
		song_name.setWordWrapWidth(200);

		// artist_name
		const artist_name = this.add.text(201, 404, "", {});
		artist_name.text = "Song:";
		artist_name.setStyle({ "fontFamily": "DINPro", "fontSize": "18px", "maxLines":1});
		artist_name.setWordWrapWidth(200);

		// country
		const country = this.add.text(201, 444, "", {});
		country.text = "Song:";
		country.setStyle({ "fontFamily": "DINPro", "fontSize": "18px", "maxLines":1});
		country.setWordWrapWidth(200);

		// my_high_score
		const my_high_score = this.add.text(201, 484, "", {});
		my_high_score.text = "Song:";
		my_high_score.setStyle({ "fontFamily": "DINPro", "fontSize": "18px", "maxLines":1});
		my_high_score.setWordWrapWidth(200);

		// uB_logomark
		const uB_logomark = this.add.image(180, 33.449999999999996, "UB logomark");
		uB_logomark.scaleX = 0.3;
		uB_logomark.scaleY = 0.3;

		this.loading = loading;
		this.percentage = percentage;
		this.current_asset = current_asset;
		this.loading_txt = loading_txt;
		this.play_button = play_button;
		this.play_text = play_text;
		this.thumbnail_image = thumbnail_image;
		this.song_name = song_name;
		this.artist_name = artist_name;
		this.country = country;
		this.my_high_score = my_high_score;

		this.events.emit("scene-awake");
	}

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
	/** @type {Phaser.GameObjects.Image} */
	thumbnail_image;
	/** @type {Phaser.GameObjects.Text} */
	song_name;
	/** @type {Phaser.GameObjects.Text} */
	artist_name;
	/** @type {Phaser.GameObjects.Text} */
	country;
	/** @type {Phaser.GameObjects.Text} */
	my_high_score;

	/* START-USER-CODE */

  // Write your code here
  preload() {

	this.load.image(`${this.track.song_name}-thumbnail`, this.track.thumbnail_file);

	this.load.on(`filecomplete-image-${this.track.song_name}-thumbnail`, (p) => {
		console.log(p);
		// this.add.image(180, 322, `${this.track.song_name}-thumbnail`).setDepth(19);
		this.thumbnail_image.setTexture(`${this.track.song_name}-thumbnail`)

	});






	this.createGradient();
    this.editorCreate();

    this.loading.setOrigin(0, 0.5);
    this.loading.scaleX = 0;

	this.song_name.setText(this.track.song_name)
	this.artist_name.setText(this.track.artist_name)
	this.country.setText(this.track.country_name)

	let scores = JSON.parse(localStorage.getItem("scores") || "{}");
	let savedScore = scores[this.track.song_name] || 0;
	this.my_high_score.setText(Math.round(savedScore))



    this.load.on(Phaser.Loader.Events.PROGRESS, (p) => {
      // console.log(Math.round(p/1 * 100))
      this.percentage.setText("LOADING..." + Math.round((p / 1) * 100) + " %");
      this.loading.scaleX = p + 0.66;
    });

    this.load.audio(
      `${this.track.song_name}`,
      this.track.mp3_url
    );


    this.editorPreload();
  }

  init(data) {
    // background_music.play()
    // console.log(data);
    this.track = data.track;
    this.track.mp3_url = this.track.mp3_file;
    this.track.midi_url = this.track.midi_file;
    this.track.thumbnail =`${this.track.song_name}-thumbnail`


    // this.editorCreate();
    console.log('loadingTrack', this.track.song_name);
  }

  async create() {
    console.log("Preload.js create()");

    this.midi = await Midi.fromUrl(this.track.midi_url);


    this.loading_txt.setVisible(false)
    this.loading.setVisible(false)


    // this.scale.startFullscreen();
    // this.cameras.main.fadeOut(500); // the number is the duration in ms
    // this.cameras.main.once("camerafadeoutcomplete", () => {
    //   // background_music.stop()
    //   this.scene.start("Level", { track: this.track, midi: this.midi });
    // });




    this.play_button.setVisible(true);
    this.play_text.setVisible(true);

    this.play_button.setInteractive()
    this.play_button.on("pointerup", ()=>{
      this.scale.startFullscreen();
      this.cameras.main.fadeOut(500); // the number is the duration in ms

      this.cameras.main.once("camerafadeoutcomplete", () => {
        // background_music.stop()
        this.scene.start("Level", { track: this.track, midi: this.midi });
      });

    })


  }


  createGradient() {
    this.angle = 0;

    let canvas = document.createElement("canvas");
    canvas.width = this.game.config.width;
    canvas.height = this.game.config.height;

    let ctx = canvas.getContext("2d");

    let grd = ctx.createLinearGradient(
      0,
      0,
      this.game.config.width,
      this.game.config.height
    );
    grd.addColorStop(1, "#7b4397");
    grd.addColorStop(0, "#dc2430");

    ctx.fillStyle = grd;
    ctx.fillRect(0, 0, this.game.config.width, this.game.config.height);

    // Add canvas texture to Phaser
    this.textures.addCanvas("gradient", canvas);

    // Create a sprite with the gradient texture
    this.background = this.add
      .image(0, 0, "gradient")
      .setOrigin(0, 0)
      .setDepth(-1);
  }


  /* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
