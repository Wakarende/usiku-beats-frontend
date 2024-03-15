// You can write more code here

/* START OF COMPILED CODE */

class EpisodeSelect extends Phaser.Scene {
  constructor() {
    super("EpisodeSelect");

    /* START-USER-CTR-CODE */
    // Write your code here.
    /* END-USER-CTR-CODE */
  }

  /** @returns {void} */
  editorCreate() {
    // hub_background
    this.add.image(180, 320, "hub_background");

    // play_button
    const play_button = this.add.image(180, 526, "play_button");

    // playtext
    const playtext = this.add.text(180, 526, "", {});
    playtext.setOrigin(0.5, 0.5);
    playtext.text = "Play";
    playtext.setStyle({ fontFamily: "DINPro", fontSize: "18px" });

    // star_empty
    const star_empty = this.add.image(120, 402, "star_empty");

    // star_empty_1
    const star_empty_1 = this.add.image(150, 402, "star_empty");

    // star_empty_2
    const star_empty_2 = this.add.image(180, 402, "star_empty");

    // star_empty_3
    const star_empty_3 = this.add.image(210, 402, "star_empty");

    // star_empty_4
    const star_empty_4 = this.add.image(240, 402, "star_empty");

    // artist_name
    const artist_name = this.add.text(180, 40, "", {});
    artist_name.setOrigin(0.5, 0.5);
    artist_name.text = "artist_name";
    artist_name.setStyle({ fontFamily: "Righteous-Regular", fontSize: "15px" });

    // song_name
    const song_name = this.add.text(180, 66.58502841719303, "", {});
    song_name.setOrigin(0.5, 0.5);
    song_name.text = "song_name";
    song_name.setStyle({ fontFamily: "Righteous-Regular", fontSize: "22px" });

    // maximum_score
    const maximum_score = this.add.text(180, 444, "", {});
    maximum_score.setOrigin(0.5, 0.5);
    maximum_score.text = "00000";
    maximum_score.setStyle({
      fontFamily: "Righteous-Regular",
      fontSize: "40px",
    });

    // lists
    const stars = [
      star_empty,
      star_empty_1,
      star_empty_2,
      star_empty_3,
      star_empty_4,
    ];

    this.play_button = play_button;
    this.artist_name = artist_name;
    this.song_name = song_name;
    this.maximum_score = maximum_score;
    this.stars = stars;

    this.events.emit("scene-awake");
  }

  /** @type {Phaser.GameObjects.Image} */
  play_button;
  /** @type {Phaser.GameObjects.Text} */
  artist_name;
  /** @type {Phaser.GameObjects.Text} */
  song_name;
  /** @type {Phaser.GameObjects.Text} */
  maximum_score;
  /** @type {Phaser.GameObjects.Image[]} */
  stars;

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
      key: "rexgesturesplugin",
      url: "lib/rexgesturesplugin.min.js",
      sceneKey: "rexGestures",
    });

  }

  create() {
    this.editorCreate();


  
    this.song_list = this.cache.json.get('song-list')
    // this.song_clip = this.sound.add('Beat2', { volume: 0.7, loop: false });

    this.tracks = []
    this.song_list.forEach(song =>{
      this.tracks.push(
        {
          image_asset: song.thumbnail,
          artist_name: song.artist_name,
          song_name: song.song_name,
          maximum_score: 0,
          midi_url: song.midi_file? song.midi_file: song.midi_url,
          mp3_url: song.mp3_file? song.mp3_file: song.mp3_url,
          clip: song.clip

        }
      )
    })

    // this.tracks = [
    //   {
    //     image_asset: "samidoh_1",
    //     artist_name: "Samidoh",
    //     song_name: "bado nakupenda",
    //     maximum_score: 43392,
    //     // midi_url:
    //     //   "https://games-dev.usiku.games/usiku-beats/audios/Beat2/Beat2_Midi.mid",
    //     // mp3_url:
    //     //   "https://games-dev.usiku.games/usiku-beats/audios/Beat2/Beat2_Song.mp3",
    //   },
    //   {
    //     image_asset: "alex_kasau",
    //     artist_name: "Alex Kasau",
    //     song_name: "kindu",
    //     maximum_score: 0,
    //     // midi_url:
    //     //   "https://games-dev.usiku.games/usiku-beats/audios/Beat2/Beat2_Midi.mid",
    //     // mp3_url:
    //     //   "https://games-dev.usiku.games/usiku-beats/audios/Beat2/Beat2_Song.mp3",
    //   },
    //   {
    //     image_asset: "okello_max",
    //     artist_name: "Okello Max",
    //     song_name: "kinda piny",
    //     maximum_score: 80000,
    //     // midi_url:
    //     //   "https://games-dev.usiku.games/usiku-beats/audios/Beat2/Beat2_Midi.mid",
    //     // mp3_url:
    //     //   "https://games-dev.usiku.games/usiku-beats/audios/Beat2/Beat2_Song.mp3",
    //   },
    // ];

    //the selected theme
    // this.prime = 0;

    //speed of moving animation
    this.animationSpeed = 200;

    //predefined x positions for the 3 visible cards
    this.xleft = this.screenWidth / 2 - 67 - 75;
    this.xprime = this.screenWidth / 2;
    this.xright = this.screenWidth / 2 + 67 + 75;

    //initial setup; all items on the right side; anchor set to mid;
    this.tracks.forEach(function (track) {
      track.sprite = this.add.sprite(0, 0, track.image_asset);

      track.sprite.setOrigin(0.5, 0.5);
      track.sprite.x = this.screenWidth + 150;
      track.sprite.y = this.screenHeight / 2 - 80;

      // track.sprite.setInteractive();
      // track.sprite.on("pointerup", () => {
      //   this.artist_name.setText(track.artist_name);
      //   this.song_name.setText(track.song_name);
      //   this.maximum_score.setText(track.maximum_score);
      //   this.midi_url = track.midi_url;
      //   this.mp3_url = track.mp3_url;
      //   this.setStars(track.maximum_score);

      //   var clickedPos = this.tracks.indexOf(track);
      //   track.sprite.setDepth(2);
      //   // this.themes[clickedPos-1].setDepth(1)
      //   // this.themes[clickedPos+1].setDepth(1)
      //   let other_themes = this.tracks.filter((element, index) => {
      //     return element !== track;
      //   });

      //   other_themes.forEach((item) => {
      //     item.sprite.setDepth(1);
      //   });

      //   if (clickedPos > this.prime) {
      //     //move to left
      //     this.nextTheme();
      //   } else if (clickedPos < this.prime) {
      //     //move to right
      //     this.previousTheme();
      //   }
      // });
    }, this);

    //set initial state
    this.setToPosition(this.prime);

    this.play_button.setInteractive();
    this.play_button.on("pointerup", () => {
      // this.cameras.main.fadeOut(5000);
      this.sound.stopAll()
      start_sfx.play()
      this.scene.start("BrandingTransitionScene", {
        track: { ...this.tracks[this.prime], prime: this.prime },
      });
    });


    this.swipeInput = this.rexGestures.add
      .swipe({ velocityThreshold: 1000 })
      .on(
        "swipe",
        function (swipe, gameObject, lastPointer) {


          this.sound.stopAll()
          if (swipe.right && this.prime > 0){
            let track = this.tracks[this.prime-1]
            this.artist_name.setText(track.artist_name);
            this.song_name.setText(track.song_name);
            this.maximum_score.setText(track.maximum_score);
            this.midi_url = track.midi_url;
            this.mp3_url = track.mp3_url;
            this.setStars(track.maximum_score);

            this.sound.play(track.clip, { volume: 0.7, loop: false })
    
            var clickedPos = this.tracks.indexOf(track);
            track.sprite.setDepth(2);
            // this.themes[clickedPos-1].setDepth(1)
            // this.themes[clickedPos+1].setDepth(1)
            let other_themes = this.tracks.filter((element, index) => {
              return element !== track;
            });
    
            other_themes.forEach((item) => {
              item.sprite.setDepth(1);
            });

            this.previousTheme()

          }
          if (swipe.left && this.prime < this.tracks.length -1 ){
            console.log(this.prime);
            let track = this.tracks[this.prime+1]
            this.artist_name.setText(track.artist_name);
            this.song_name.setText(track.song_name);
            this.maximum_score.setText(track.maximum_score);
            this.midi_url = track.midi_url;
            this.mp3_url = track.mp3_url;
            this.setStars(track.maximum_score);

            this.sound.play(track.clip, { volume: 0.7, loop: false })
    
            var clickedPos = this.tracks.indexOf(track);
            track.sprite.setDepth(2);
            // this.themes[clickedPos-1].setDepth(1)
            // this.themes[clickedPos+1].setDepth(1)
            let other_themes = this.tracks.filter((element, index) => {
              return element !== track;
            });
    
            other_themes.forEach((item) => {
              item.sprite.setDepth(1);
            });

            this.nextTheme()


          }
        },
        this
      );
  }

  setStars(score) {
    this.stars.forEach((star) => {
      star.setTexture("star_empty");
    });
    if (score < 20000) {
      this.stars[0].setTexture("star_full");
    }
    if (score >= 20000 && score < 50000) {
      this.stars.slice(0, 2).forEach((star) => {
        star.setTexture("star_full");
      });
    }
    if (score >= 50000 && score < 80000) {
      this.stars.slice(0, 3).forEach((star) => {
        star.setTexture("star_full");
      });
    }
    if (score >= 80000 && score < 95000) {
      this.stars.slice(0, 4).forEach((star) => {
        star.setTexture("star_full");
      });
    }
    if (score > 95000) {
      this.stars.slice(0, 5).forEach((star) => {
        star.setTexture("star_full");
      });
    }
  }
  //initial position of this.themes on stage based on the selected theme
  setToPosition(prime) {
    let track = this.tracks[prime];
    track.sprite.setScale(1).setDepth(2);

    this.artist_name.setText(track.artist_name);
    this.song_name.setText(track.song_name);
    this.maximum_score.setText(track.maximum_score);
    this.midi_url = track.midi_url;
    this.mp3_url = track.mp3_url;
    this.setStars(track.maximum_score);

    this.tracks[prime].sprite.x = this.screenWidth / 2;

    this.sound.play(track.clip, { volume: 0.7, loop: false })

    //check if there is another theme available to display on the right side; if yes then position it
    if (prime < this.tracks.length - 1) {
      this.tracks[prime + 1].sprite.x = this.screenWidth / 2 + 67 + 75;
      this.tracks[prime + 1].sprite.setScale(0.7);
    }

    //check if there is another theme available to display on the left side; if yes then position it
    if (prime > 0) {
      this.tracks[prime - 1].sprite.x = this.screenWidth / 2 - 67 - 75;
      this.tracks[prime - 1].sprite.setScale(0.7, 0.7);
    }
  }

  //move to next theme
  nextTheme() {
    //move prime left

    this.tweens.add({
      targets: this.tracks[this.prime].sprite,
      scaleX: 0.7,
      scaleY: 0.7,
      ease: "Linear",
      duration: this.animationSpeed,
      yoyo: false,
      repeat: 0,
      callbackScope: this,
    });

    this.tweens.add({
      targets: this.tracks[this.prime].sprite,
      x: this.xleft,
      ease: "Linear",
      duration: this.animationSpeed,
      yoyo: false,
      repeat: 0,
      callbackScope: this,
    });



    //move right to prime
    if (this.prime < this.tracks.length - 1) {

      this.tweens.add({
        targets: this.tracks[this.prime + 1].sprite,
        scaleX: 1,
        scaleY: 1,
        ease: "Linear",
        duration: this.animationSpeed,
        yoyo: false,
        repeat: 0,
        callbackScope: this,
      });

      this.tweens.add({
        targets: this.tracks[this.prime + 1].sprite,
        x: this.xprime,
        ease: "Linear",
        duration: this.animationSpeed,
        yoyo: false,
        repeat: 0,
        callbackScope: this,
      });


    }

    //move new to right
    if (this.prime < this.tracks.length - 2) {
      this.tracks[this.prime + 2].sprite.x = this.screenWidth + 150;
      this.tracks[this.prime + 2].sprite.setScale(0.7, 0.7);

      this.tweens.add({
        targets: this.tracks[this.prime + 2].sprite,
        x: this.xright,
        ease: "Linear",
        duration: this.animationSpeed,
        yoyo: false,
        repeat: 0,
        callbackScope: this,
      });
    }

    //move left out
    if (this.prime > 0) {
      //this.themes[this.prime+1].x = -150;
      this.tracks[this.prime - 1].sprite.setScale(0.7, 0.7);

      this.tweens.add({
        targets: this.tracks[this.prime - 1].sprite,
        x: -150,
        ease: "Linear",
        duration: this.animationSpeed,
        yoyo: false,
        repeat: 0,
        callbackScope: this,
      });
    }
    this.prime = this.prime + 1;
  }

  //move to previous theme
  previousTheme() {
    //move prime left

    this.tweens.add({
      targets: this.tracks[this.prime].sprite,
      scaleX: 0.7,
      scaleY: 0.7,
      ease: "Linear",
      duration: this.animationSpeed,
      yoyo: false,
      repeat: 0,
      callbackScope: this,
    });

    this.tweens.add({
      targets: this.tracks[this.prime].sprite,
      x: this.xright,
      ease: "Linear",
      duration: this.animationSpeed,
      yoyo: false,
      repeat: 0,
      callbackScope: this,
    });


    //move left to prime
    if (this.prime > 0) {

      this.tweens.add({
        targets: this.tracks[this.prime - 1].sprite,
        scaleX: 1,
        scaleY: 1,
        ease: "Linear",
        duration: this.animationSpeed,
        yoyo: false,
        repeat: 0,
        callbackScope: this,
      });

      this.tweens.add({
        targets: this.tracks[this.prime - 1].sprite,
        x: this.xprime,
        ease: "Linear",
        duration: this.animationSpeed,
        yoyo: false,
        repeat: 0,
        callbackScope: this,
      });


    }
    //move new to left
    if (this.prime > 1) {
      this.tracks[this.prime - 2].sprite.x = -150;
      this.tracks[this.prime - 2].sprite.setScale(0.7, 0.7);
      this.tweens.add({
        targets: this.tracks[this.prime - 2].sprite,
        x: this.xleft,
        ease: "Linear",
        duration: this.animationSpeed,
        yoyo: false,
        repeat: 0,
        callbackScope: this,
      });
    }
    //move right out
    if (this.prime < this.tracks.length - 1) {
      //this.themes[prime+1].x = -150;
      this.tracks[this.prime + 1].sprite.setScale(0.7, 0.7);
      this.tweens.add({
        targets: this.tracks[this.prime + 1].sprite,
        x: this.screenWidth + 150,
        ease: "Linear",
        duration: this.animationSpeed,
        yoyo: false,
        repeat: 0,
        callbackScope: this,
      });
    }
    this.prime = this.prime - 1;
  }

  /* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
