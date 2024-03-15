// You can write more code here

/* START OF COMPILED CODE */

class BufferScene extends Phaser.Scene {
  constructor() {
    super("BufferScene");

    /* START-USER-CTR-CODE */
    this.isInitialLoad = true; // set a flag for initial game load
    /* END-USER-CTR-CODE */
  }

  /** @returns {void} */
  editorCreate() {
    // bG
    this.add.image(180, 320, "BG");

    // orange_gradient
    this.add.image(180, 81, "new_orange_gradient");

    // banner_BG
    const banner_BG = this.add.image(180, 107, "Banner BG");
    banner_BG.visible = false;

    // header_image
    const header_image = this.add.image(78, 108, "carousel_3");
    header_image.scaleX = 0.35;
    header_image.scaleY = 0.35;
    header_image.visible = false;

    // header_play
    const header_play = this.add.image(228, 129, "Button");
    header_play.scaleX = 0.9138207471215014;
    header_play.scaleY = 0.964981396136101;
    header_play.visible = false;

    // header_title
    const header_title = this.add.text(138, 76, "", {});
    header_title.setOrigin(0, 0.5);
    header_title.visible = false;
    header_title.text = "Samidoh";
    header_title.setStyle({
      color: "#ffffffff",
      fontFamily: "DINPro-Bold",
      fontSize: "17px",
      stroke: "#ffffffff",
    });

    // header_desc
    const header_desc = this.add.text(138, 97, "", {});
    header_desc.setOrigin(0, 0.5);
    header_desc.visible = false;
    header_desc.text = "Play now: top song of the week";
    header_desc.setStyle({
      color: "#ffffffff",
      fontFamily: "DINPro",
      fontSize: "13px",
      maxLines: 2,
      stroke: "#ffffffff",
    });
    header_desc.setWordWrapWidth(header_desc.style.wordWrapWidth, true);

    // play_text
    const play_text = this.add.text(212, 126, "", {});
    play_text.setOrigin(0, 0.5);
    play_text.visible = false;
    play_text.text = "Play";
    play_text.setStyle({
      color: "#ffffffff",
      fontFamily: "DINPro",
      fontSize: "17px",
      stroke: "#ffffffff",
    });

    // song_name_text_3
    const song_name_text_3 = this.add.text(180, 56, "", {});
    song_name_text_3.setOrigin(0.5, 0.5);
    song_name_text_3.text = "Choose your track";
    song_name_text_3.setStyle({
      color: "#ffffffff",
      fontFamily: "Righteous-Regular",
      fontSize: "25px",
      stroke: "#ffffffff",
    });

    // rectangle_854
    const rectangle_854 = this.add.image(184, 475, "Rectangle_854");
    rectangle_854.scaleX = 1.091360146814878;
    rectangle_854.scaleY = 1.2629896979897348;

    // song_name_text_7
    const song_name_text_7 = this.add.text(178, 309, "", {});
    song_name_text_7.setOrigin(0.5, 0.5);
    song_name_text_7.text = "Most played in Kenya";
    song_name_text_7.setStyle({
      color: "#ffffffff",
      fontFamily: "Righteous-Regular",
      fontSize: "17px",
      stroke: "#ffffffff",
    });

    // list_image_1
    const list_image_1 = this.add.image(84, 371, "carousel_1");
    list_image_1.scaleX = 0.25;
    list_image_1.scaleY = 0.25;

    // list_song_title_1
    const list_song_title_1 = this.add.text(127, 361, "", {});
    list_song_title_1.setOrigin(0, 0.5);
    list_song_title_1.text = "Track Name";
    list_song_title_1.setStyle({
      color: "#808080",
      fontFamily: "DINPro-Bold",
      fontSize: "13px",
      stroke: "#ffffffff",
    });

    // list_artist_1
    const list_artist_1 = this.add.text(127, 378, "", {});
    list_artist_1.setOrigin(0, 0.5);
    list_artist_1.text = "LEMARTI";
    list_artist_1.setStyle({
      color: "#808080",
      fontFamily: "DINPro",
      fontSize: "11px",
      stroke: "#ffffffff",
    });

    // list_play_1
    const list_play_1 = this.add.image(300, 371, "play_button_embedded");
    list_play_1.scaleX = 0.6;
    list_play_1.scaleY = 0.7;
    list_play_1.visible = false;

    // list_artist_2
    const list_artist_2 = this.add.text(128, 445, "", {});
    list_artist_2.setOrigin(0, 0.5);
    list_artist_2.text = "LEMARTI";
    list_artist_2.setStyle({
      color: "#808080",
      fontFamily: "DINPro",
      fontSize: "11px",
      stroke: "#ffffffff",
    });

    // list_song_title_2
    const list_song_title_2 = this.add.text(128, 428, "", {});
    list_song_title_2.setOrigin(0, 0.5);
    list_song_title_2.text = "Track Name";
    list_song_title_2.setStyle({
      color: "#808080",
      fontFamily: "DINPro-Bold",
      fontSize: "13px",
      stroke: "#ffffffff",
    });

    // list_image_2
    const list_image_2 = this.add.image(85, 438, "carousel_1");
    list_image_2.scaleX = 0.25;
    list_image_2.scaleY = 0.25;

    // list_play_2
    const list_play_2 = this.add.image(300, 438, "play_button_embedded");
    list_play_2.scaleX = 0.6;
    list_play_2.scaleY = 0.7;
    list_play_2.visible = false;

    // list_artist_3
    const list_artist_3 = this.add.text(128, 514, "", {});
    list_artist_3.setOrigin(0, 0.5);
    list_artist_3.text = "LEMARTI";
    list_artist_3.setStyle({
      color: "#808080",
      fontFamily: "DINPro",
      fontSize: "11px",
      stroke: "#ffffffff",
    });

    // list_play_3
    const list_play_3 = this.add.image(300, 507, "play_button_embedded");
    list_play_3.scaleX = 0.6;
    list_play_3.scaleY = 0.7;
    list_play_3.visible = false;

    // list_image_3
    const list_image_3 = this.add.image(85, 507, "carousel_1");
    list_image_3.scaleX = 0.25;
    list_image_3.scaleY = 0.25;

    // list_song_title_3
    const list_song_title_3 = this.add.text(128, 497, "", {});
    list_song_title_3.setOrigin(0, 0.5);
    list_song_title_3.text = "Track Name";
    list_song_title_3.setStyle({
      color: "#808080",
      fontFamily: "DINPro-Bold",
      fontSize: "13px",
      stroke: "#ffffffff",
    });

    // uB_logomark
    const uB_logomark = this.add.image(45, 28, "UB logomark");
    uB_logomark.scaleX = 0.2;
    uB_logomark.scaleY = 0.2;

    // number1
    const number1 = this.add.text(39, 352, "", {});
    number1.setOrigin(0, 0.5);
    number1.text = "1";
    number1.setStyle({
      color: "#808080",
      fontFamily: "DINPro-Bold",
      fontSize: "13px",
      stroke: "#ffffffff",
    });

    // number2
    const number2 = this.add.text(39, 418, "", {});
    number2.setOrigin(0, 0.5);
    number2.text = "2";
    number2.setStyle({
      color: "#808080",
      fontFamily: "DINPro-Bold",
      fontSize: "13px",
      stroke: "#ffffffff",
    });

    // number3
    const number3 = this.add.text(39, 488, "", {});
    number3.setOrigin(0, 0.5);
    number3.text = "3";
    number3.setStyle({
      color: "#808080",
      fontFamily: "DINPro-Bold",
      fontSize: "13px",
      stroke: "#ffffffff",
    });

    // grey_border
    this.add.image(185, 404, "grey border");

    // grey_border_1
    this.add.image(185, 471, "grey border");

    // grey_border_2
    this.add.image(185, 541, "grey border");

    // grey_border_3
    const grey_border_3 = this.add.image(181, 290, "grey border");
    grey_border_3.scaleX = 1.1;

    // list_play_4
    const list_play_4 = this.add.image(300, 576, "play_button_embedded");
    list_play_4.scaleX = 0.6;
    list_play_4.scaleY = 0.7;
    list_play_4.visible = false;

    // list_image_4
    const list_image_4 = this.add.image(85, 576, "carousel_1");
    list_image_4.scaleX = 0.25;
    list_image_4.scaleY = 0.25;

    // list_song_title_4
    const list_song_title_4 = this.add.text(128, 566, "", {});
    list_song_title_4.setOrigin(0, 0.5);
    list_song_title_4.text = "Track Name";
    list_song_title_4.setStyle({
      color: "#808080",
      fontFamily: "DINPro-Bold",
      fontSize: "13px",
      stroke: "#ffffffff",
    });

    // list_artist_4
    const list_artist_4 = this.add.text(128, 583, "", {});
    list_artist_4.setOrigin(0, 0.5);
    list_artist_4.text = "LEMARTI";
    list_artist_4.setStyle({
      color: "#808080",
      fontFamily: "DINPro",
      fontSize: "11px",
      stroke: "#ffffffff",
    });

    // number4
    const number4 = this.add.text(39, 555.8659709936753, "", {});
    number4.setOrigin(0, 0.5);
    number4.text = "4";
    number4.setStyle({
      color: "#808080",
      fontFamily: "DINPro-Bold",
      fontSize: "13px",
      stroke: "#ffffffff",
    });

    // lists
    const mylist = [
      list_image_1,
      list_song_title_1,
      list_song_title_3,
      list_image_3,
      list_play_3,
      list_artist_3,
      list_play_2,
      list_image_2,
      list_song_title_2,
      list_artist_2,
      list_play_1,
      list_artist_1,
    ];

    this.header_image = header_image;
    this.header_play = header_play;
    this.header_title = header_title;
    this.header_desc = header_desc;
    this.play_text = play_text;
    this.song_name_text_3 = song_name_text_3;
    this.song_name_text_7 = song_name_text_7;
    this.list_image_1 = list_image_1;
    this.list_song_title_1 = list_song_title_1;
    this.list_artist_1 = list_artist_1;
    this.list_play_1 = list_play_1;
    this.list_artist_2 = list_artist_2;
    this.list_song_title_2 = list_song_title_2;
    this.list_image_2 = list_image_2;
    this.list_play_2 = list_play_2;
    this.list_artist_3 = list_artist_3;
    this.list_play_3 = list_play_3;
    this.list_image_3 = list_image_3;
    this.list_song_title_3 = list_song_title_3;
    this.list_play_4 = list_play_4;
    this.list_image_4 = list_image_4;
    this.list_song_title_4 = list_song_title_4;
    this.list_artist_4 = list_artist_4;
    this.mylist = mylist;

    this.events.emit("scene-awake");
  }

  /** @type {Phaser.GameObjects.Image} */
  header_image;
  /** @type {Phaser.GameObjects.Image} */
  header_play;
  /** @type {Phaser.GameObjects.Text} */
  header_title;
  /** @type {Phaser.GameObjects.Text} */
  header_desc;
  /** @type {Phaser.GameObjects.Text} */
  play_text;
  /** @type {Phaser.GameObjects.Text} */
  song_name_text_3;
  /** @type {Phaser.GameObjects.Text} */
  song_name_text_7;
  /** @type {Phaser.GameObjects.Image} */
  list_image_1;
  /** @type {Phaser.GameObjects.Text} */
  list_song_title_1;
  /** @type {Phaser.GameObjects.Text} */
  list_artist_1;
  /** @type {Phaser.GameObjects.Image} */
  list_play_1;
  /** @type {Phaser.GameObjects.Text} */
  list_artist_2;
  /** @type {Phaser.GameObjects.Text} */
  list_song_title_2;
  /** @type {Phaser.GameObjects.Image} */
  list_image_2;
  /** @type {Phaser.GameObjects.Image} */
  list_play_2;
  /** @type {Phaser.GameObjects.Text} */
  list_artist_3;
  /** @type {Phaser.GameObjects.Image} */
  list_play_3;
  /** @type {Phaser.GameObjects.Image} */
  list_image_3;
  /** @type {Phaser.GameObjects.Text} */
  list_song_title_3;
  /** @type {Phaser.GameObjects.Image} */
  list_play_4;
  /** @type {Phaser.GameObjects.Image} */
  list_image_4;
  /** @type {Phaser.GameObjects.Text} */
  list_song_title_4;
  /** @type {Phaser.GameObjects.Text} */
  list_artist_4;
  /** @type {Array<Phaser.GameObjects.Image|Phaser.GameObjects.Text>} */
  mylist;

  /* START-USER-CODE */

  // Write your code here

  init(data) {
    this.screenWidth = this.cameras.main.width;
    this.screenHeight = this.cameras.main.height;

    this.prime = data.prime || 0;
    // this.song_list = data.song_list // from complete Screen?
  }

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
    console.log("BufferScene.create()");
    this.cameras.main.fadeIn(500);
    this.cameras.main.setRoundPixels(true);

    this.editorCreate();
    this.active_song = {};
    this.isLoading = false;
    this.s_index = 0;
    this.start = 0;
    this.limit = 3;

    this.song_list = this.cache.json.get("song-list");

    if (this.registry.has("tracks")) {
      // If we do, load this.tracks from the registry
      this.tracks = this.registry.get("tracks");
    } else {
      this.tracks = [];
      this.song_list.forEach((song) => {
        this.tracks.push({
          image_asset: song.thumbnail,
          artist_name: song.artist_name,
          song_name: song.song_name,
          maximum_score: 0,
          midi_url: song.midi_file ? song.midi_file : song.midi_url,
          mp3_url: song.mp3_file ? song.mp3_file : song.mp3_url,
          clip: song.clip,
        });
      });
    }

    this.start += this.tracks.length;

    // this.initSongPanel()

    let randomSong =
      this.tracks[Math.floor(Math.random() * this.tracks.length)];
    // this.setHeader(randomSong);
    this.displayListSongs();
    // this.createGradient();
    // this.headerAnimation();

    this.initSongPanel();
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

  generateStars(score) {
    const stars = [];
    const fullStarsCount = this.calculateFullStars(score);

    for (let i = 0; i < 5; i++) {
      let star = this.add
        .image(0, 0, i < fullStarsCount ? "star_full" : "star_empty")
        .setScale(0.6);
      stars.push(star);
    }

    return stars;
  }

  calculateFullStars(score) {
    if (score == 0) return 0;
    if (score < 20000) return 1;
    if (score < 50000) return 2;
    if (score < 80000) return 3;
    if (score < 95000) return 4;
    return 5;
  }

  initSongPanel() {
    // background_music.play();

    this.sizer = this.rexUI.add.sizer({
      orientation: "x",
      space: { left: 3, right: 3, top: 3, bottom: 3, item: 0, line: 8 },
    });

    this.tracks.forEach((item, index) => {
      let image = this.add
        .image(0, 0, item.image_asset)
        .setInteractive()
        .setDataEnabled()
        .setData("customData", { ...item, isPlayed: false }) // adding isPlayed flag
        .setScale(0.55)
        .setAlpha(0);

      let playButtonY = image.height * 0.5 - 85; // Adjusting the Y position to be slightly above the bottom of the image
      // Add play button on the image and hide it initially
      let playButton = this.add
        .image(0, playButtonY, "play_button_embedded")
        .setVisible(index === 0)
        .setInteractive()
        .setDepth(100)
        .setScale(1);

      if (index === 0) {
        image.getData("customData").isPlayed = true;
      }

      let scores = JSON.parse(localStorage.getItem("scores") || "{}");
      let savedScore = scores[item.song_name] || 0;

      // Inside the `tracks.forEach` loop, after creating trackText_artist:
      let starsGroup = this.generateStars(savedScore); // Assuming each item has a score property
      let starsContainer = this.add.container(
        0,
        image.height * 0.5 - 50,
        starsGroup
      ); // Adjust y position as necessary
      starsContainer.setDepth(100);
      starsContainer.setSize(image.width, 20); // Adjust the height as necessary

      // Adjust star positions to place them in a row
      let starWidth = starsGroup[0].width * starsGroup[0].scaleX + 0; // spacing between stars
      starsGroup.forEach((star, index) => {
        star.setX(index * starWidth - (5 * starWidth) / 2 + starWidth / 2); // This centers the stars.
      });

      let trackText_artist = this.add
        .text(0, image.height * 0.5 - 25, item.artist_name, {
          fontSize: "11px",
          fill: "#808080", // Change to desired color
          align: "center",
          fontFamily: "Righteous-Regular",
        })
        .setOrigin(0.5, 0)
        .setDepth(100);

      let trackText_song = this.add
        .text(0, image.height * 0.5 - 35, item.song_name, {
          fontSize: "11px",
          fill: "#808080", // Change to desired color
          align: "center",
          fontFamily: "Righteous-Regular",
        })
        .setOrigin(0.5, 0)
        .setDepth(100);

      // Create a container to group the image and the play button
      let container = this.add.container(0, 0, [
        image,
        playButton,
        trackText_song,
        trackText_artist,
        starsContainer,
      ]);

      let containerWidth = image.width * image.scaleX;
      // let containerHeight = image.height * image.scaleY;
      // containerHeight += trackText_song.height;
      container.setSize(containerWidth, 300);

      this.sizer.add(container); // Add the container to the sizer

      if (this.isInitialLoad && this.tracks.length == 4) {
        if (index < 3) {
          // Only apply the tween to the first 3 elements
          this.tweens.add({
            targets: image,
            scale: {
              from: 0,
              to: 0.55,
              duration: 700,
              ease: "Back.easeOut",
            },
            alpha: {
              from: 0,
              to: 1,
              duration: 700,
            },
            delay: index * 700, // Add this line
            onComplete: () => {
              this.sound.play("Pop_Sfx_4", { volume: 1, loop: false });
            },
          });
        } else {
          image.setAlpha(1); // Set the alpha of the other images to 1
        }
      } else {
        image.setAlpha(1); // Set the alpha of the other images to 1
      }
    });

    if (this.isInitialLoad) {
      this.isInitialLoad = false;
    }

    this.scrollablePanel = this.rexUI.add
      .scrollablePanel({
        x: 180,
        y: 160,
        width: 320,
        scrollMode: 1, // 0: vertical, 1: horizontal, 2: both

        panel: {
          child: this.sizer,

          mask: { padding: 1 },
        },
        scroller: {
          backDeceleration: false,
        },

        // space: { left: 10, right: 10, top: 10, bottom: 10 },

        // expand: { horizontal: true, vertical: false }, // horizontal expand

        // align: { left: false, right: false, centerX: false, centerY: false, top: false, bottom: false },
      })
      .layout();

    this.scrollablePanel
      .setChildrenInteractive()
      .on("child.click", (container) => {
        let image = container.getAt(0); // Assuming the image is the first item in the container
        let playButton = container.getAt(1);
        let song = image.getData("customData");

        // Get the isPlayed state of the clicked image before resetting
        let wasPlayed = song.isPlayed;

        // Hide all play buttons and set isPlayed to false for all images
        this.sizer.getAllVisibleChildren().forEach((childContainer) => {
          let img = childContainer.getAt(0);
          let playBtn = childContainer.getAt(1);
          playBtn.setVisible(false); // Hide play button
          img.getData("customData").isPlayed = false; // Reset isPlayed for all images
        });

        this.sound.stopAll();

        if (!wasPlayed) {
          // Mark the clicked image as played
          image.getData("customData").isPlayed = true;
          playButton.setVisible(true); // Show the play button
          this.setHeader(song);
          this.sound.play(song.clip, { volume: 0.7, loop: false });
        } else {
          // Navigate to the next screen
          console.log("Go to next screen");
          console.log("playing", song.song_name);
          // start_sfx.play();
          // this.scale.startFullscreen();
          this.scene.start("BrandingTransitionScene", {
            track: song,
          });
        }
      });

    this.scrollablePanel.getElement("scroller").on("dragend", () => {
      let scrollPosition = this.scrollablePanel.childOY;
      let maxS = this.scrollablePanel.bottomChildOY;

      console.log(scrollPosition);
      console.log(maxS);

      if (scrollPosition === maxS) {
        console.log("End of scrollable panel reached!");
        this.sound.play("Thumbnail_Screen Swipe_Sfx", {
          volume: 1,
          loop: false,
        });

        // console.log(this.isLoading);
        if (!this.isLoading) {
          this.spinner = this.rexSpinner.add.spinner({
            width: 70,
            height: 30,
            duration: 1500,
          });
          this.sizer.add(this.spinner);
          this.scrollablePanel.layout();
          this.isLoading = true;

          this.loadNextSongs(maxS);
        }
      }
    });
  }

  // displayListSongs() {
  //   let list_songs = this.tracks.slice(0, 4);

  //   list_songs.forEach((song, index) => {
  //     switch (index) {
  //       case 0:
  //         this.list_image_1.setTexture(song.image_asset);
  //         this.list_song_title_1.setText(song.song_name);
  //         this.list_artist_1.setText(song.artist_name);
  //         this.list_play_1.setInteractive();
  //         this.list_play_1.on("pointerup", () => {
  //           // this.setHeader(song);
  //           // this.sound.stopAll();
  //           // this.sound.play(song.clip, { volume: 0.7, loop: false });

  //           this.sound.stopAll();
  //           console.log("playing", song.song_name);
  //           start_sfx.play();
  //           this.scale.startFullscreen();

  //           this.scene.start("BrandingTransitionScene", {
  //             track: song,
  //           });
  //         });

  //         break;

  //       case 1:
  //         this.list_image_2.setTexture(song.image_asset);
  //         this.list_song_title_2.setText(song.song_name);
  //         this.list_artist_2.setText(song.artist_name);
  //         this.list_play_2.setInteractive();
  //         this.list_play_2.on("pointerup", () => {
  //           this.sound.stopAll();
  //           console.log("playing", song.song_name);
  //           start_sfx.play();
  //           this.scale.startFullscreen();

  //           this.scene.start("BrandingTransitionScene", {
  //             track: song,
  //           });
  //         });

  //         break;

  //       case 2:
  //         this.list_image_3.setTexture(song.image_asset);
  //         this.list_song_title_3.setText(song.song_name);
  //         this.list_artist_3.setText(song.artist_name);
  //         this.list_play_3.setInteractive();
  //         this.list_play_3.on("pointerup", () => {
  //           this.sound.stopAll();
  //           console.log("playing", song.song_name);
  //           start_sfx.play();
  //           this.scale.startFullscreen();

  //           this.scene.start("BrandingTransitionScene", {
  //             track: song,
  //           });
  //         });

  //         break;

  //       case 3:
  //         this.list_image_4.setTexture(song.image_asset);
  //         this.list_song_title_4.setText(song.song_name);
  //         this.list_artist_4.setText(song.artist_name);
  //         this.list_play_4.setInteractive();
  //         this.list_play_4.on("pointerup", () => {
  //           this.sound.stopAll();
  //           console.log("playing", song.song_name);
  //           start_sfx.play();
  //           this.scale.startFullscreen();

  //           this.scene.start("BrandingTransitionScene", {
  //             track: song,
  //           });
  //         });

  //         break;

  //       default:
  //         break;
  //     }
  //   });
  // }

  displayListSongs() {
    let list_songs = this.tracks.slice(0, 4);

    list_songs.forEach((song, index) => {
      this.setSongDetails(index, song);
    });
  }

  setSongDetails(index, song) {
    const songTitleElement = this[`list_song_title_${index + 1}`];
    const artistElement = this[`list_artist_${index + 1}`];
    const playElement = this[`list_play_${index + 1}`];
    const imageElement = this[`list_image_${index + 1}`];

    imageElement.setTexture(song.image_asset);
    songTitleElement.setText(song.song_name);
    artistElement.setText(song.artist_name);

    this.setupInteraction(songTitleElement, artistElement, playElement, song);
  }

  resetListItems() {
    for (let i = 1; i <= 4; i++) {
      this[`list_song_title_${i}`].setColor("#808080"); // replace #FFFFFF with the original color
      this[`list_artist_${i}`].setColor("#808080"); // replace #FFFFFF with the original color
      this[`list_play_${i}`].setVisible(false);
    }
  }

  setupInteraction(songTitleElement, artistElement, playElement, song) {
    const clickHandler = () => {
      this.resetListItems(); // Reset all items first

      // Then set the new colors and states for the clicked item
      songTitleElement.setColor("#fe500b");
      artistElement.setColor("#fe500b");

      this.sound.stopAll();
      this.sound.play(song.clip, { volume: 0.7, loop: false });

      playElement.setVisible(true).setInteractive();
      playElement.on("pointerup", () => {
        this.sound.stopAll();
        console.log("playing", song.song_name);
        // start_sfx.play();
        // this.scale.startFullscreen();

        this.scene.start("BrandingTransitionScene", {
          track: song,
        });
      });
    };

    songTitleElement.setInteractive();
    artistElement.setInteractive();

    songTitleElement.on("pointerup", clickHandler);
    artistElement.on("pointerup", clickHandler);
  }

  headerAnimation() {
    this.header_play.setScale(0);
    this.play_text.setScale(0);
    this.header_image.setScale(0);

    // background_music.play();

    this.tweens.add({
      targets: [this.header_title, this.header_desc],
      scale: { from: 0, to: 1, duration: 700, ease: "Back.easeOut" },

      onComplete: () => {
        this.sound.play("Pop_Sfx_1", { volume: 1, loop: false });
        this.tweens.add({
          targets: [this.header_image],
          scale: {
            from: 0,
            to: 0.35,
            duration: 700,
            ease: "Back.easeOut",
          },
          onComplete: () => {
            this.sound.play("Pop_Sfx_2", { volume: 1, loop: false });
            this.tweens.add({
              targets: [this.header_play, this.play_text],
              scale: {
                from: 0,
                to: 1,
                duration: 700,
                ease: "Back.easeOut",
              },
              onComplete: () => {
                this.sound.play("Pop_Sfx_3", { volume: 1, loop: false });
                this.initSongPanel();
              },
            });

            this.play_emitter = this.add
              .particles(
                this.header_play.x,
                this.header_play.y,
                "Play_active",
                {
                  lifespan: 500,
                  speed: { min: 100, max: 150 },
                  scale: { start: 0.3, end: 0 },
                  // gravityY: 150,
                  blendMode: "ADD",
                  active: true,
                }
              )
              .setDepth(1.5);
          },
        });
      },
    });
  }

  setHeader(song) {
    this.header_image.setTexture(song.image_asset);
    this.header_title.setText(song.song_name);
    this.header_desc.setText(song.artist_name);
    this.header_play.setInteractive();
    this.active_song = song;

    this.header_play.setDepth(2);
    this.play_text.setDepth(2);

    this.header_play.on("pointerup", () => {
      this.sound.stopAll();
      console.log("playing", song.song_name);
      // start_sfx.play();
      // this.scale.startFullscreen();

      this.scene.start("BrandingTransitionScene", {
        track: this.active_song,
      });
    });
  }

  loadNextSongs(childoy) {
    this.load.json(
      `next-songs-${this.s_index}`,
      `https://api.usiku.games/song-list/?start=${this.start}&limit=${this.limit}`
    );

    console.log(this.s_index);
    console.log(this.start);
    this.load.on(`filecomplete-json-next-songs-${this.s_index}`, (filename) => {
      // if (filename == "song-list"){
      this.next_song_list = this.cache.json.get(`next-songs-${this.s_index}`);

      // Check if the next_song_list is empty
      if (this.next_song_list.length === 0) {
        console.log("No more songs to load!");
        // Here you can handle the situation when there are no more songs to load.
        // For example, you might want to disable infinite scrolling.
        this.isLoading = false;
        this.spinner.destroy();
        return; // Return early to avoid processing the empty list
      }
      // Check if the next_song_list is empty
      console.log("next-songs", this.next_song_list);
      this.next_song_list.forEach((song) => {
        if (song.thumbnail_file) {
          this.load.image(
            `${song.song_name}-thumbnail-${this.s_index}`,
            song.thumbnail_file
          );
        } else {
          this.load.image(
            `${song.song_name}-thumbnail-${this.s_index}`,
            song.thumbnail_url
          );
        }
        // this.load.audio()
        this.load.on(
          `filecomplete-image-${song.song_name}-thumbnail-${this.s_index}`,
          (p) => {
            console.log(p);
            song.thumbnail = p;
          }
        );

        if (song.mp3_clip_file) {
          this.load.audio(
            `${song.song_name}-clip-${this.s_index}`,
            song.mp3_clip_file
          );
        } else {
          this.load.audio(
            `${song.song_name}-clip-${this.s_index}`,
            song.mp3_clip_url
          );
        }
        // this.load.audio()
        this.load.on(
          `filecomplete-audio-${song.song_name}-clip-${this.s_index}`,
          (p) => {
            console.log(p);
            song.clip = p;
          }
        );
      });
      // }
      // console.log('file', filename)
    });

    this.load.on("complete", () => {
      this.spinner.destroy();

      if (!this.isLoading) {
        return; // Return early to avoid processing the empty list
      }

      this.next_tracks = [];
      this.next_song_list.forEach((song) => {
        this.next_tracks.push({
          image_asset: song.thumbnail,
          artist_name: song.artist_name,
          song_name: song.song_name,
          maximum_score: 0,
          midi_url: song.midi_file ? song.midi_file : song.midi_url,
          mp3_url: song.mp3_file ? song.mp3_file : song.mp3_url,
          clip: song.clip,
        });
      });

      this.tracks = [...this.tracks, ...this.next_tracks];
      this.tracks = this.tracks.filter(
        (track, index, self) =>
          index ===
          self.findIndex(
            (t) =>
              t.song_name === track.song_name &&
              t.artist_name === track.artist_name
          )
      );
      
      this.registry.set("tracks", this.tracks);
      // this.start += this.tracks.length;
      this.start += this.limit;
      this.s_index += 1;

      this.sizer = this.rexUI.add.sizer({
        orientation: "x",
        space: { left: 3, right: 3, top: 3, bottom: 3, item: 8, line: 8 },
      });

      // Add all the tracks to the sizer
      this.tracks.forEach((item) => {
        let image = this.add
          .image(0, 0, item.image_asset)
          .setInteractive()
          .setDataEnabled()
          .setData("customData", { ...item, isPlayed: false })
          .setScale(0.55);

        let playButtonY = image.height * 0.5 - 85; // Adjusting the Y position to be slightly above the bottom of the image
        // Add play button on the image and hide it initially
        let playButton = this.add
          .image(0, playButtonY, "play_button_embedded")
          .setVisible(false)
          .setInteractive()
          .setDepth(100)
          .setScale(1);

        let scores = JSON.parse(localStorage.getItem("scores") || "{}");
        let savedScore = scores[item.song_name] || 0;

        // Inside the `tracks.forEach` loop, after creating trackText_artist:
        let starsGroup = this.generateStars(savedScore); // Assuming each item has a score property
        let starsContainer = this.add.container(
          0,
          image.height * 0.5 - 50,
          starsGroup
        ); // Adjust y position as necessary
        starsContainer.setDepth(100);
        starsContainer.setSize(image.width, 20); // Adjust the height as necessary

        // Adjust star positions to place them in a row
        let starWidth = starsGroup[0].width * starsGroup[0].scaleX + 0; // spacing between stars
        starsGroup.forEach((star, index) => {
          star.setX(index * starWidth - (5 * starWidth) / 2 + starWidth / 2); // This centers the stars.
        });

        let trackText_artist = this.add
          .text(0, image.height * 0.5 - 25, item.artist_name, {
            fontSize: "11px",
            fill: "#808080", // Change to desired color
            align: "center",
            fontFamily: "Righteous-Regular",
          })
          .setOrigin(0.5, 0)
          .setDepth(100);

        let trackText_song = this.add
          .text(0, image.height * 0.5 - 35, item.song_name, {
            fontSize: "11px",
            fill: "#808080", // Change to desired color
            align: "center",
            fontFamily: "Righteous-Regular",
          })
          .setOrigin(0.5, 0)
          .setDepth(100);

        // Create a container to group the image and the play button
        let container = this.add.container(0, 0, [
          image,
          playButton,
          trackText_artist,
          trackText_song,
          starsContainer,
        ]);

        let containerWidth = image.width * image.scaleX;
        container.setSize(containerWidth, 300);

        this.sizer.add(container); // Add the container to the sizer
      });

      if (this.scrollablePanel) this.scrollablePanel.destroy();

      // Create a new scrollablePanel with the new sizer
      this.scrollablePanel = this.rexUI.add
        .scrollablePanel({
          x: 180,
          y: 160,
          width: 320,
          scrollMode: 1, // 0: vertical, 1: horizontal, 2: both

          panel: {
            child: this.sizer,
            mask: { padding: 1 },
          },
          scroller: {
            backDeceleration: false,
          },
        })
        .layout();

      console.log(childoy);
      this.scrollablePanel.childOY = childoy - 100 * this.s_index * 4;

      console.log("childOY", this.scrollablePanel.bottomChildOY);

      this.scrollablePanel.getElement("scroller").on("dragend", () => {
        let scrollPosition = this.scrollablePanel.childOY;
        let maxS = this.scrollablePanel.bottomChildOY;
        console.log(scrollPosition);
        console.log(maxS);
        if (scrollPosition === maxS) {
          console.log("End of scrollable panel reached!");
          this.sound.play("Thumbnail_Screen Swipe_Sfx", {
            volume: 1,
            loop: false,
          });
          if (!this.isLoading) {
            this.spinner = this.rexSpinner.add.spinner({
              width: 70,
              height: 30,
              duration: 1500,
            });
            this.sizer.add(this.spinner);
            this.scrollablePanel.layout();
            this.isLoading = true;

            this.loadNextSongs(maxS);
          }
        }
      });

      this.isLoading = false;

      this.scrollablePanel
        .setChildrenInteractive()
        .on("child.click", (container) => {
          let image = container.getAt(0); // Assuming the image is the first item in the container
          let playButton = container.getAt(1);
          let song = image.getData("customData");

          // Get the isPlayed state of the clicked image before resetting
          let wasPlayed = song.isPlayed;

          // Hide all play buttons and set isPlayed to false for all images
          this.sizer.getAllVisibleChildren().forEach((childContainer) => {
            let img = childContainer.getAt(0);
            let playBtn = childContainer.getAt(1);
            playBtn.setVisible(false); // Hide play button
            img.getData("customData").isPlayed = false; // Reset isPlayed for all images
          });

          this.sound.stopAll();

          if (!wasPlayed) {
            // Mark the clicked image as played
            image.getData("customData").isPlayed = true;
            playButton.setVisible(true); // Show the play button
            this.setHeader(song);
            this.sound.play(song.clip, { volume: 0.7, loop: false });
          } else {
            // Navigate to the next screen
            console.log("Go to next screen");
            console.log("playing", song.song_name);
            // start_sfx.play();
            // this.scale.startFullscreen();
            this.scene.start("BrandingTransitionScene", {
              track: song,
            });
          }
        });
    });

    this.load.start();
  }

  /* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
