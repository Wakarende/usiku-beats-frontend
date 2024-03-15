// You can write more code here

/* START OF COMPILED CODE */

class CategoriesScene extends Phaser.Scene {

	constructor() {
		super("CategoriesScene");

		/* START-USER-CTR-CODE */
    // Write your code here.
    /* END-USER-CTR-CODE */
	}

	/** @returns {void} */
	editorCreate() {

		// bG
		const bG = this.add.image(180, 320, "Collections BG");
		bG.scaleX = 0.53;
		bG.scaleY = 0.53;

		// header_title
		const header_title = this.add.text(180, 39, "", {});
		header_title.setOrigin(0.5, 0.5);
		header_title.text = "Kamba Songs";
		header_title.setStyle({ "color": "#ffffffff", "fontFamily": "DINPro-Bold", "fontSize": "25px", "stroke": "#ffffffff" });

		// play_button
		const play_button = this.add.image(180, 598, "play_button_inactive");

		// play_text
		const play_text = this.add.text(180, 598, "", {});
		play_text.setOrigin(0.5, 0.5);
		play_text.text = "Play";
		play_text.setStyle({ "color": "#ffffffff", "fontFamily": "DINPro", "fontSize": "22px", "stroke": "#ffffffff" });

		// rectangle_1
		const rectangle_1 = this.add.rectangle(180, 593.465160843466, 128, 128);
		rectangle_1.scaleX = 3.3922952444602155;
		rectangle_1.scaleY = 0.727106861820843;
		rectangle_1.visible = false;
		rectangle_1.isFilled = true;
		rectangle_1.fillColor = 8421504;
		rectangle_1.fillAlpha = 0.5;

		this.header_title = header_title;
		this.play_button = play_button;
		this.play_text = play_text;

		this.events.emit("scene-awake");
	}

	/** @type {Phaser.GameObjects.Text} */
	header_title;
	/** @type {Phaser.GameObjects.Image} */
	play_button;
	/** @type {Phaser.GameObjects.Text} */
	play_text;

	/* START-USER-CODE */

  // Write your code here

  preload() {
    this.load.scenePlugin({
      key: "rexuiplugin",
      url: "lib/rexuiplugin.min.js",
      sceneKey: "rexUI",
    });
    this.load.scenePlugin({
      key: "rexspinnerplugin",
      url: "lib/rexspinnerplugin.min.js",
      sceneKey: "rexSpinner",
    });
  }

  create() {
    this.editorCreate();

    this.tracks = [
      {
        artist_name: "2nd Junior Kotestes",
        song_name: "Ndo Yon",
      },
      {
        artist_name: "2nd Junior Kotestes",
        song_name: "Miten Tulwet",
      },
      {
        artist_name: "2nd Junior Kotestes",
        song_name: "Miten Tulwet",
      },
      {
        artist_name: "2nd Junior Kotestes",
        song_name: "Miten Tulwet",
      },
      {
        artist_name: "2nd Junior Kotestes",
        song_name: "Miten Tulwet",
      },
      {
        artist_name: "2nd Junior Kotestes",
        song_name: "Miten Tulwet",
      },
      {
        artist_name: "2nd Junior Kotestes",
        song_name: "Miten Tulwet",
      },
      {
        artist_name: "2nd Junior Kotestes",
        song_name: "Miten Tulwet",
      },
      {
        artist_name: "2nd Junior Kotestes",
        song_name: "Miten Tulwet",
      },
      {
        artist_name: "2nd Junior Kotestes",
        song_name: "Miten Tulwet",
      },
      {
        artist_name: "2nd Junior Kotestes",
        song_name: "Miten Tulwet",
      },
    ];

    this.initSongPanel();
	this.play_button.setDepth(5)
	this.play_text.setDepth(5)
  }

  initSongPanel() {
    const createListItem = (track) => {
      const songText = track.song_name + "\n" + track.artist_name;

      // Thumbnail
      const icon = this.add.image(0, 0, "carousel_2").setScale(0.3);

      // Song and Artist Name
      const textLabel = this.add.text(0, 0, songText, {
        fontSize: "12px",
        wordWrap: { width: 200 },
      });

      //   // Play Button
      //   const playButton = this.rexUI.add
      //     .label({
      //       background: this.rexUI.add.roundRectangle(0, 0, 40, 40, 10, 0x5a5a5a),
      //       text: this.add.text(0, 0, "Play"),
      //       space: {
      //         left: 10,
      //         right: 10,
      //         top: 10,
      //         bottom: 10,
      //       },
      //     })
      //     .setInteractive()
      //     .on("pointerdown", () => {
      //       // Implement your play functionality here
      //       console.log("Playing:", track.song_name);
      //     });

      // Play Button (use the "Play_active" icon here)
      const playButton = this.add
        .image(0, 0, "Play_active")
        .setInteractive()
        .on("pointerdown", () => {
          // Implement your play functionality here
          console.log("Playing:", track.song_name);
        });

      // Spacer (an empty item to create space)
      const spacerWidth = 40; // Set the desired space width here
      const spacer = this.rexUI.add
        .roundRectangle(0, 0, spacerWidth, 0, 0, 0x000000)
        .setAlpha(0);

      // Combine them in a horizontal sizer
      return this.rexUI.add
        .sizer({
          orientation: "x",
          space: { item: 10 },
        })
        .add(icon) // Add thumbnail
        .add(textLabel) // Add song and artist name
        .add(spacer) // Add spacer between text and play button

        .add(playButton, 0, "right", 0, true); // Add play button to the far right and vertically centered
    };

    this.sizer = this.rexUI.add.sizer({
      orientation: "y",
      //   space: { left: 3, right: 3, top: 3, bottom: 3, item: 8, line: 8 },
      space: { left: 3, right: 3, top: 3, bottom: 3, item: 8, line: 8 },
    });

    this.tracks.forEach((item, index) => {
      //   let image = this.add
      //     .image(0, 0, "carousel_2")
      //     .setInteractive()
      //     .setDataEnabled()
      //     .setData("customData", { ...item })
      //     .setScale(0.5);

      //   this.sizer.add(image); // Add this image to the sizer

      let listItem = createListItem(item);
      this.sizer.add(listItem);
    });

    this.scrollablePanel = this.rexUI.add
      .scrollablePanel({
        x: 180,
        y: 340,
        height: 530,
        scrollMode: 0, // 0: vertical, 1: horizontal, 2: both

        panel: {
          child: this.sizer,

          mask: { padding: 1 },
        },

        // space: { left: 10, right: 10, top: 10, bottom: 10 },

        // expand: { horizontal: true, vertical: false }, // horizontal expand

        // align: { left: false, right: false, centerX: false, centerY: false, top: false, bottom: false },
      })
      .layout();

    // this.scrollablePanel.setChildrenInteractive().on("child.click", (child) => {
    //   let song = child.getData("customData");

    //   this.setHeader(song);
    //   this.sound.stopAll();
    //   this.sound.play(song.clip, { volume: 0.7, loop: false });
    // });

    // this.scrollablePanel.getElement("scroller").on("dragend", () => {
    //   let scrollPosition = this.scrollablePanel.childOY;
    //   let maxS = this.scrollablePanel.bottomChildOY;

    //   console.log(scrollPosition);
    //   console.log(maxS);

    //   if (scrollPosition < maxS) {
    //     console.log("End of scrollable panel reached!");
    //     console.log(this.isLoading);
    //     if (!this.isLoading) {
    //       this.spinner = this.rexSpinner.add.spinner({
    //         width: 70,
    //         height: 30,
    //         duration: 1500,
    //       });
    //       this.sizer.add(this.spinner);
    //       this.scrollablePanel.layout();
    //       this.isLoading = true;

    //       this.loadNextSongs(maxS);
    //     }
    //   }
    // });
  }

  /* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
