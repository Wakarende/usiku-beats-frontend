// You can write more code here

/* START OF COMPILED CODE */

class Level extends Phaser.Scene {
  constructor() {
    super("Level");

    /* START-USER-CTR-CODE */
    /* END-USER-CTR-CODE */
  }

  /** @returns {void} */
  editorCreate() {
    // gameplay_bg
    this.add.image(180, 320, "plain_background");

    // top_banner
    const top_banner = this.add.image(180, 175.5, "top_banner");

    // artist_text
    const artist_text = this.add.text(180, 33, "", {});
    artist_text.setOrigin(0.5, 0.5);
    artist_text.text = "artist";
    artist_text.setStyle({
      color: "#666363ff",
      fontFamily: "Righteous-Regular",
      fontSize: "7.5px",
      stroke: "#666363ff",
    });

    // song_name_text
    const song_name_text = this.add.text(180, 45, "", {});
    song_name_text.setOrigin(0.5, 0.5);
    song_name_text.text = "song";
    song_name_text.setStyle({
      align: "center",
      color: "#666363ff",
      fontFamily: "Righteous-Regular",
      fontSize: "15px",
      stroke: "#666363ff",
    });

    // score_text
    const score_text = this.add.text(180, 82, "", {});
    score_text.setOrigin(0.5, 0.5);
    score_text.text = "000";
    score_text.setStyle({
      color: "#666363ff",
      fontFamily: "Righteous-Regular",
      fontSize: "55px",
      stroke: "#666363ff",
    });

    // pause_btn
    const pause_btn = this.add.image(39, 39, "pause");

    // multiplier_text
    const multiplier_text = this.add.text(180, 116.91874449363797, "", {});
    multiplier_text.setOrigin(0.5, 0.5);
    multiplier_text.text = "x1";
    multiplier_text.setStyle({
      align: "center",
      color: "#666363ff",
      fontFamily: "DINPro",
      fontSize: "15px",
      stroke: "#666363ff",
    });

    // tap_zone_area
    const tap_zone_area = this.add.image(181, 525, "tap_zone_area");

    // divider_1
    const divider_1 = this.add.image(121.5, 321, "divider_2");

    // divider_2
    const divider_2 = this.add.image(238, 320, "divider_2");

    // feedback_text
    const feedback_text = this.add.image(180, 303, "perfect_popup");
    feedback_text.scaleX = 0.7;
    feedback_text.scaleY = 0.7;
    feedback_text.visible = false;

    // overlay
    const overlay = this.add.image(180, 320, "overlay");

    // song_complete_text
    const song_complete_text = this.add.layer();
    song_complete_text.visible = false;

    // song
    const song = this.add.text(180, 252, "", {});
    song.setOrigin(0.5, 0.5);
    song.text = "SONG";
    song.setStyle({
      align: "center",
      color: "#fe500b",
      fontFamily: "DINPro",
      fontSize: "18px",
      stroke: "#fe500b",
    });
    song_complete_text.add(song);

    // complete
    const complete = this.add.text(180, 287, "", {});
    complete.setOrigin(0.5, 0.5);
    complete.text = "COMPLETE";
    complete.setStyle({
      color: "#fe500b",
      fontFamily: "Righteous-Regular",
      fontSize: "50px",
      stroke: "#fe500b",
    });
    song_complete_text.add(complete);

    // beat_missed_text
    const beat_missed_text = this.add.layer();
    beat_missed_text.visible = false;

    // beat
    const beat = this.add.text(180, 252, "", {});
    beat.setOrigin(0.5, 0.5);
    beat.text = "BEAT";
    beat.setStyle({
      align: "center",
      color: "#666363ff",
      fontFamily: "DINPro",
      fontSize: "18px",
      stroke: "#666363ff",
    });
    beat_missed_text.add(beat);

    // missed
    const missed = this.add.text(180, 287, "", {});
    missed.setOrigin(0.5, 0.5);
    missed.text = "MISSED";
    missed.setStyle({
      color: "#666363ff",
      fontFamily: "Righteous-Regular",
      fontSize: "50px",
      stroke: "#666363ff",
    });
    beat_missed_text.add(missed);

    // streak_popup
    const streak_popup = this.add.container(0, 0);
    streak_popup.visible = false;

    // streak_overlay
    const streak_overlay = this.add.image(180, 352, "streak_overlay");
    streak_popup.add(streak_overlay);

    // streak_text
    const streak_text = this.add.text(180, 353, "", {});
    streak_text.setOrigin(0.5, 0.5);
    streak_text.text = "10 STREAK";
    streak_text.setStyle({
      align: "center",
      color: "#666363ff",
      fontFamily: "DINPro",
      fontSize: "15px",
      stroke: "#666363ff",
    });
    streak_popup.add(streak_text);

    // sprite_1
    const sprite_1 = this.add.sprite(181, 522, "_MISSING");
    sprite_1.visible = false;

    // beats2
    const beats2 = this.add.image(6, 325, "tile_active");
    beats2.setOrigin(-0.02, 0);
    beats2.visible = false;

    // lists
    const ui_layer = [
      multiplier_text,
      pause_btn,
      score_text,
      song_name_text,
      artist_text,
      top_banner,
    ];

    this.top_banner = top_banner;
    this.artist_text = artist_text;
    this.song_name_text = song_name_text;
    this.score_text = score_text;
    this.pause_btn = pause_btn;
    this.multiplier_text = multiplier_text;
    this.tap_zone_area = tap_zone_area;
    this.divider_1 = divider_1;
    this.divider_2 = divider_2;
    this.feedback_text = feedback_text;
    this.overlay = overlay;
    this.song_complete_text = song_complete_text;
    this.beat_missed_text = beat_missed_text;
    this.streak_popup = streak_popup;
    this.streak_text = streak_text;
    this.ui_layer = ui_layer;

    this.events.emit("scene-awake");
  }

  /** @type {Phaser.GameObjects.Image} */
  top_banner;
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
  overlay;
  /** @type {Phaser.GameObjects.Layer} */
  song_complete_text;
  /** @type {Phaser.GameObjects.Layer} */
  beat_missed_text;
  /** @type {Phaser.GameObjects.Container} */
  streak_popup;
  /** @type {Phaser.GameObjects.Text} */
  streak_text;
  /** @type {Array<Phaser.GameObjects.Text|Phaser.GameObjects.Image>} */
  ui_layer;

  /* START-USER-CODE */

  // Write more your code here

  init(data) {
    this.midi = data.midi;
    this.track = data.track;
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
  }

  create() {
    console.log("Level.js create()");
    this.editorCreate();
    // background_music.stop()

    this.soundTracker = 0;

    this.column = null;
    this.drumColums = [];
    this.randomDrumCol = [];

    this.drumGroup = null;
    this.tileClicked = false;

    this.score = 0;

    this.tweenDuration = 2400;
    this.playSong = false;
    this.matchedMarkerTracker = [];
    this.tileTracker = [];

    this.maxSongScore = 100000;
    this.multiplier = 1;
    this.progress_bar = 1;
    this.frameTime = 0;

    /** Screen width, height, and Center x, y */
    this.artist = this.track.artist_name;
    this.songItem = this.track.song_name;
    this.screenWidth = this.cameras.main.width;
    this.screenHeight = this.cameras.main.height;
    this.screenCenterX = this.cameras.main.worldView.x + this.screenWidth / 2;
    this.screenCenterY = this.cameras.main.worldView.y + this.screenHeight / 2;

    this.soundMarkers = [];

    this.midi.tracks.forEach((track) => {
      /** Notes  array from midi*/
      const notes = track.notes;
      notes.forEach((note, idx) => {
        this.soundMarkers.push({
          name: `"marker_${idx}"`,
          start: note.time,
          path: note.name,
          duration: note.duration,
          config: { loop: false },
        });
      });
    });
    // console.log("markers", this.soundMarkers.length);

    this.beatScore = this.maxSongScore / this.soundMarkers.length;

    this.createTapZone();

    this.countDown();

    // this.sound.once("decodedall", () => {
    //   this._assetsLoaded = true;
    //   console.log("decoded sound", this._assetsLoaded);
    // });

    this.events.on("resume", () => {
      this.themeDrum.resume();
      this.mutedSound.resume();
    });

    this.song_name_text.setText(this.songItem);

    // this.top_banner.setDepth(1)
    this.artist_text.setText(this.artist.toUpperCase());

    this.pause_btn.on("pointerup", () => {
      this.mutedSound.pause();
      this.themeDrum.pause();
      this.scene.pause();
      this.scene.launch("Pause");
    });

    // this.tapZone2 = this.add
    // .image(this.tapZone.x, this.tapZone.y, "tap_zone_area")
    // .setOrigin(0.5)
    // .setDepth(1);

    this.ui_layer.forEach((asset) => {
      asset.setDepth(4);
    });
    this.divider_1.setDepth(2.5);
    this.divider_2.setDepth(2.5);

    this.path = this.add
      .rectangle(0, 0, this.screenWidth / 3, this.screenHeight, 0x90ee90)
      .setOrigin(0)
      .setAlpha(0.5)
      .setVisible(false);

    this.score_emitter = this.add
      .particles(this.score_text.x, this.score_text.y, "Play_active", {
        lifespan: 1000,
        speed: { min: 100, max: 150 },
        scale: { start: 0.5, end: 0 },
        // gravityY: 150,
        blendMode: "ADD",
        emitting: false,
      })
      .setDepth(10);

    this.multiplier_emitter = this.add
      .particles(
        this.multiplier_text.x,
        this.multiplier_text.y,
        "Play_active",
        {
          lifespan: 1000,
          speed: { min: 50, max: 100 },
          scale: { start: 0.5, end: 0 },
          // gravityY: 150,
          blendMode: "ADD",
          emitting: false,
        }
      )
      .setDepth(10);
  }
  update(time, delta) {
    this.frameTime += delta;
    if (this.frameTime > 16.5) {
      // console.log("here", this.frameTime);
      this.frameTime = 0;
      globalThis.gameTick++;
      // g.gameTick++;
      // Code that relies on a consistent 60hz update
      if (this.isSoundPlaying && this.drumGroup) {
        if (!this.isSoundPlaying) {
          return;
        }
        let seek = this.mutedSound?.seek;

        for (let i = 0; i < this.soundMarkers.length; i++) {
          let marker = this.soundMarkers[i];
          let start = marker.start;
          let end = marker.start + marker.duration;
          let path = marker.path;
          let duration = marker.duration;

          if (
            seek >= start &&
            seek < end &&
            !this.matchedMarkerTracker.includes(start)
          ) {
            this.matchedMarkerTracker.push(start);
            this.creatOneTile(path, duration, delta);
          }
        }
      }

      if (this.drumGroup) {
        if (!this.drumGroup.children) {
          return;
        }

        var children = this.drumGroup.getChildren();

        children.forEach((tile) => {
          // if (tile?.y >= this.tapZone?.y && !this.tileTracker.includes(tile)) {
          //   this.tileTracker.push(tile);
          // }
          // if (this.endZone) {
          this.checkOverlap(tile);
          // }
        });
      }
    }
  }

  createBgMusic() {
    this.themeDrum = this.sound.add(`${this.songItem}`, { volume: 1 });
    this.mutedSound = this.sound.add(`${this.songItem}`, { volume: 0 });

    this.mutedSound.on("play", () => {
      /** Update isSoundPLaying state */
      this.isSoundPlaying = true;
    });
    this.mutedSound.play();

    // this.themeDrum.on("play", () => {
    //   // this.scene.pause();
    //   // this.themeDrum.stop();
    // });

    this.songDelay = (this.tweenDuration * this.tapZone?.y) / this.screenHeight;
    setTimeout(() => {
      this.themeDrum.play();
    }, this.songDelay);

    this.mutedSound.on("complete", () => {
      /** Stop the sound 1 that's ahead */
      this.isSoundPlaying = false;
      this.matchedMarkerTracker = [];
    });

    this.themeDrum.on("complete", () => {
      /** Stop the sound 2 */
      this.matchedMarkerTracker = [];

      this.overlay.setVisible(true);
      this.song_complete_text.setVisible(true).setDepth(6);
      setTimeout(() => {
        this.overlay.setVisible(false);
        this.song_complete_text.setVisible(false);

        this.themeDrum.stop();
        this.mutedSound.stop();
        this.matchedMarkerTracker = [];
        clearInterval(this.globalInterval);

        this.track.current_score = this.score;
        this.track.midi = this.midi;

        // Get current scores object from localStorage
        let scores = JSON.parse(localStorage.getItem("scores") || "{}");
        // Update the score for the current song
        scores[this.track.song_name] = this.score;
        // Save the updated scores object back to localStorage
        localStorage.setItem("scores", JSON.stringify(scores));

        this.cleanUp();
        this.scene.stop("Level");
        this.scene.start("GameOverScene", { track: this.track });
      }, 2000);
    });
  }

  creatOneTile(path, duration, delta) {
    let tilePath = path;
    /** Create a tile*/

    this.drum = this.drumGroup
      .create(0, 0, "beats2")
      .setOrigin(-0.02, 0)
      .setInteractive()
      .setAlpha(0.1)
      .setDepth(3);

    this.drum.body.immovable = true;
    this.placeDrum(this.drum, tilePath, duration);

    /** Tween the tile*/
    this.createTween(this.drum, delta);
  }

  createTween(tile, delta) {
    let self = this;

    console.log(delta);

    this.tweens.add({
      targets: tile,
      y: this.screenHeight,
      alpha: 6,
      offset: 0,
      duration: this.tweenDuration,
      ease: "Linear",
      onUpdate: function (tween, target, param) {
        // console.log("param", param);
        // console.log("target", target);
        // if (target.y >= 479 && target.y <= 482) {
        //   self.createContinue();
        // }
      },
      onStart: function (tween, target, param) {
        let timeout = setTimeout(() => {
          // self.createContinue();
        }, 2400);
      },
    });
  }

  createDrumGroup() {
    this.drumGroup = this.physics.add.staticGroup();
  }

  // placeDrum(drum, tilePath, duration) {
  //   let left = 0;
  //   let middle = 120;
  //   let right = 240;

  //   // Place tile in path determined in midi
  //   // "A#2" left,"G#2"-middle, "F#2"right
  //   console.log(tilePath);

  //   let swipeConfig = {
  //     velocityThreshold: 500,
  //   };

  //   switch (tilePath) {
  //     case "A#3":
  //       drum.setX(left);
  //       break;
  //     case "G#3":
  //       drum.setX(middle);
  //       break;
  //     case "F#3":
  //       drum.setX(right);

  //       // let swipe = this.rexGestures.add.swipe(drum, swipeConfig);
  //       // swipe.on("swipe", (swipe, gameObject, lastPointer) => {
  //       //   console.log("swiped", swipe);

  //       //   this.tweens.add({
  //       //     targets: drum,
  //       //     x: -drum.width, // assuming the sprite will move off screen to the left
  //       //     angle: 360, // assuming a full rotation
  //       //     ease: "Power1",
  //       //     duration: 2000, // this is in milliseconds, so it's 2 seconds
  //       //     repeat: 0, // repeat the animation 0 times, change this if you want it to repeat
  //       //     yoyo: false, // don't return the sprite back after the tween
  //       //     onComplete: function () {
  //       //       // this function will run after the tween completes
  //       //       drum.destroy(); // we remove the sprite after the tween completes
  //       //     },
  //       //   });
  //       // });

  //       break;

  //     default:
  //       // drum.setX(right);
  //       break;
  //   }
  //   let random = Phaser.Math.Between(1, 10);

  //   if (random === 10) {
  //     // Assign a random swipe texture
  //     const swipeTextures = [
  //       "swipe_up",
  //       // "swipe_down",
  //       "swipe_left",
  //       "swipe_right",
  //     ];
  //     const randomTexture = Phaser.Utils.Array.GetRandom(swipeTextures);
  //     drum.setTexture(randomTexture);

  //     // Create a swipe event for the drum
  //     let swipe = this.rexGestures.add.swipe(drum, swipeConfig);
  //     swipe.on("swipe", (swipe, gameObject, lastPointer) => {
  //       console.log("swiped", swipe);

  //       let movementDistance = 35; // the distance you want the drum to move

  //       let tweenConfig = {
  //         duration: 200, // duration of movement animation
  //         ease: "Power1", // easing function
  //         onComplete: () => {
  //           // Call the onClickInstrument function after the animation is finished
  //           this.onClickInstrument(drum);
  //         },
  //       };

  //       switch (drum.texture.key) {
  //         case "swipe_up":
  //           this.tweens.add({
  //             targets: drum,
  //             y: drum.y - movementDistance, // move drum upwards
  //             ...tweenConfig,
  //           });
  //           break;
  //         case "swipe_down":
  //           this.tweens.add({
  //             targets: drum,
  //             y: drum.y + movementDistance, // move drum downwards
  //             ...tweenConfig,
  //           });
  //           break;
  //         case "swipe_left":
  //           this.tweens.add({
  //             targets: drum,
  //             x: drum.x - movementDistance, // move drum to the left
  //             ...tweenConfig,
  //           });
  //           break;
  //         case "swipe_right":
  //           this.tweens.add({
  //             targets: drum,
  //             x: drum.x + movementDistance, // move drum to the right
  //             ...tweenConfig,
  //           });
  //           break;
  //       }

  //       // if(swipe.right) {
  //       //   this.tweens.add({
  //       //     targets: drum,
  //       //     x: drum.x + movementDistance, // move drum to the right
  //       //     duration: 200, // duration of movement animation
  //       //     ease: 'Power1', // easing function
  //       //   });
  //       // } else if(swipe.left) {
  //       //   this.tweens.add({
  //       //     targets: drum,
  //       //     x: drum.x - movementDistance, // move drum to the left
  //       //     duration: 200, // duration of movement animation
  //       //     ease: 'Power1', // easing function
  //       //   });
  //       // } else if(swipe.up) {
  //       //   this.tweens.add({
  //       //     targets: drum,
  //       //     y: drum.y - movementDistance, // move drum upwards
  //       //     duration: 200, // duration of movement animation
  //       //     ease: 'Power1', // easing function
  //       //   });
  //       // } else if(swipe.down) {
  //       //   this.tweens.add({
  //       //     targets: drum,
  //       //     y: drum.y + movementDistance, // move drum downwards
  //       //     duration: 200, // duration of movement animation
  //       //     ease: 'Power1', // easing function
  //       //   });
  //       // }
  //       // ...
  //       // this.onClickInstrument(drum);
  //     });
  //   } else {
  //     drum.on("pointerup", () => {
  //       this.tileClicked = false;
  //     });
  //     drum.on("pointerdown", () => {
  //       this.onClickInstrument(drum);
  //     });
  //   }

  //   // if (duration > 0.75){
  //   // drum.setTexture('beats2_long')
  //   // }
  // }

  placeDrum(drum, tilePath, duration) {
    let left = 0;
    let middle = 120;
    let right = 240;

    console.log(tilePath);

    let swipeConfig = {
      velocityThreshold: 500,
    };

    let position;
    switch (tilePath) {
      case "A#3":
        position = "left";
        drum.setX(left);
        break;
      case "G#3":
        position = "middle";
        drum.setX(middle);
        break;
      case "F#3":
        position = "right";
        drum.setX(right);
        break;
      default:
        // Handle default case if necessary
        break;
    }

    let random = Phaser.Math.Between(1, 10);
    if (random === 10) {
      // Assign a random swipe texture based on the lane
      const swipeTextures = this.getSwipeTextures(position);
      const randomTexture = Phaser.Utils.Array.GetRandom(swipeTextures);
      drum.setTexture(randomTexture);

      let swipe = this.rexGestures.add.swipe(drum, swipeConfig);
      swipe.on("swipe", (swipe, gameObject, lastPointer) => {
        this.handleSwipe(drum, swipe);
      });
    } else {
      drum.on("pointerup", () => {
        this.tileClicked = false;
      });
      drum.on("pointerdown", () => {
        this.onClickInstrument(drum);
      });
    }
  }

  getSwipeTextures(position) {
    if (position === "middle") {
      return ["swipe_left", "swipe_right"];
    } else {
      return ["swipe_up", "swipe_down"];
    }
  }

  handleSwipe(drum, swipe) {
    console.log("swiped", swipe);

    // let movementDistance = 35;

    let movementDistance = 5;

    let tweenConfig = {
      duration: 200,
      ease: "Power1",
      onComplete: () => {
        this.onClickInstrument(drum);
      },
    };

    if (swipe.up) {
      this.tweens.add({
        targets: drum,
        y: drum.y - movementDistance,
        ...tweenConfig,
      });
    } else if (swipe.down) {
      this.tweens.add({
        targets: drum,
        y: drum.y + movementDistance,
        ...tweenConfig,
      });
    } else if (swipe.left) {
      this.tweens.add({
        targets: drum,
        x: drum.x - movementDistance,
        ...tweenConfig,
      });
    } else if (swipe.right) {
      this.tweens.add({
        targets: drum,
        x: drum.x + movementDistance,
        ...tweenConfig,
      });
    }
  }

  checkOverlap(drum) {
    if (drum.y >= this.screenHeight) {
      drum.destroy();

      let children = this.drumGroup.getChildren();
      children.forEach((tile) => {
        tile.destroy();
      });

      this.overlay.setVisible(true);
      this.beat_missed_text.setVisible(true).setDepth(6);
      setTimeout(() => {
        this.overlay.setVisible(false);
        this.beat_missed_text.setVisible(false);
      }, 500);

      this.gameOver();
    }
  }

  // Helper function to animate score increment
  animateScoreIncrement(oldScore, newScore) {
    const scoreChange = newScore - oldScore;
    const scoreIncrement = scoreChange / 60; // assume we want to animate over 60 frames (1 second at 60 FPS)
    let animatedScore = oldScore;

    // Start a loop that runs once per frame
    this.time.addEvent({
      delay: 1000 / 60, // Run at 60 FPS
      callback: () => {
        // Increment the animated score
        animatedScore += scoreIncrement;

        // If the animated score exceeds the new score, clamp it to the new score
        if (animatedScore > newScore) {
          animatedScore = newScore;
        }

        // Update the score text
        this.score_text.setText(`${Math.trunc(animatedScore)}`);

        // If the animated score equals the new score, stop the loop
        if (animatedScore >= newScore) {
          return false; // This will stop the event
        }
      },
      callbackScope: this,
      loop: true,
    });
  }

  onClickInstrument(tile) {
    // this.increaseScore();

    if (navigator.vibrate) {
      // Vibration pattern: vibrate for 200ms
      navigator.vibrate(100);
  }

    this.tileClicked = true;
    let perfect_plus = false;

    if (this.progress_bar >= 10) {
      this.streak_text.setText(`${10 * this.multiplier} STREAK`);

      this.progress_bar = 1;
      this.multiplier += 1;
      this.multiplier_emitter.explode(20);

      // this.streak_popup.setVisible(true).setDepth(6);
      // setTimeout(() => {
      //   this.streak_popup.setVisible(false);
      // }, 700);

      // initial position outside of screen to the left
      this.streak_popup.x = -180;
      // make it visible
      this.streak_popup.setVisible(true).setDepth(6);
      this.tweens.killTweensOf(this.streak_popup);
      // create a tween to slide the streak_popup from the left to the middle of the screen
      var tweenIn = this.tweens.add({
        targets: this.streak_popup,
        x: 0, // middle of the screen
        ease: "Power1",
        duration: 500, // adjust as needed
        onComplete: () => {
          // delay before sliding off to the right
          setTimeout(() => {
            var tweenOut = this.tweens.add({
              targets: this.streak_popup,
              x: 360, // off the screen to the right
              ease: "Power1",
              duration: 500, // adjust as needed
              onComplete: () => {
                // make it invisible
                this.streak_popup.setVisible(false);
                // reset its position
                this.streak_popup.x = -this.streak_popup.width;
              },
            });
          }, 700); // visible for 700 ms
        },
      });

      if (this.multiplier >= 5) {
        this.multiplier = 5;
      }
    }

    const resetStreak = () => {
      if (this.multiplier >= 2) {
        this.streak_text.setText("STREAK LOST");
        this.streak_popup.setVisible(true).setDepth(6);
        setTimeout(() => {
          this.streak_popup.setVisible(false);
        }, 700);
      }
    };

    let tile_score;
    let y_tile = tile.y;
    let oldScore = this.score;
    // console.log(tile.y);
    if (y_tile < 325) {
      // console.log("too early");

      resetStreak();
      this.feebackText("too-early");
      this.highlightPath(tile.x, "red");
    } else if (y_tile >= 440 && y_tile <= 470) {
      // console.log("perfect +");
      perfect_plus = true;

      this.feebackText("perfect+");
      this.highlightPath(tile.x, "green");

      tile_score = (this.beatScore / 5) * this.multiplier;
      this.score += tile_score;
      this.progress_bar += 1;
    } else if (y_tile >= 415 && y_tile <= 490) {
      // console.log("perfect");

      this.feebackText("perfect");
      this.highlightPath(tile.x, "green");

      tile_score = (this.beatScore / 5) * this.multiplier;
      this.score += tile_score * 0.7;
      this.progress_bar += 1;
    } else if (y_tile >= 325 && y_tile <= 585) {
      // console.log("great");

      resetStreak();
      this.feebackText("great");
      this.highlightPath(tile.x, "green");

      tile_score = (this.beatScore / 5) * this.multiplier;

      this.score += tile_score * 0.4;
      this.progress_bar = 1;
      this.multiplier = 1;
    } else if (y_tile > 585) {
      // console.log("missed");
      resetStreak();
      this.overlay.setVisible(true);
      // Initial settings: invisible and minimum scale
      this.beat_missed_text.setScale(0);
      this.beat_missed_text.setAlpha(0);
      this.beat_missed_text.setVisible(true).setDepth(6);

      // Fade in and scale up
      this.tweens.add({
        targets: this.beat_missed_text,
        alpha: { from: 0, to: 1 }, // Fade in
        scale: { from: 0, to: 1 }, // Scale up
        ease: "Power1", // Use 'Power1' easing function (change as needed)
        duration: 500, // Duration of the animation
      });

      // After a delay, fade out and scale down
      setTimeout(() => {
        this.tweens.add({
          targets: this.beat_missed_text,
          alpha: { from: 1, to: 0 }, // Fade out
          scale: { from: 1, to: 0 }, // Scale down
          ease: "Power1", // Use 'Power1' easing function (change as needed)
          duration: 500, // Duration of the animation
          onComplete: () => {
            // Callback to execute once the animation is complete
            this.beat_missed_text.setVisible(false);
            this.overlay.setVisible(false);
          },
        });
      }, 500);

      this.gameOver();
    }

    // console.log(this.score);
    // this.score_text.setText(`${Math.trunc(this.score)}`);

    this.score_emitter.explode(50);

    this.animateScoreIncrement(oldScore, this.score);

    this.multiplier_text.setText(`x${this.multiplier}`);

    var tile_active;
    perfect_plus
      ? (tile_active = this.add
          .image(
            tile.x,
            this.tap_zone_area.y - this.tap_zone_area.height / 2,
            "tile_active"
          )
          .setOrigin(-0.02, 0)
          .setDepth(5))
      : (tile_active = this.add
          .image(tile.x, tile.y, "tile_active")
          .setOrigin(-0.02, 0)
          .setDepth(5));

    setTimeout(() => {
      tile_active.destroy();
      perfect_plus = false;
    }, 500);
    // tile active setvisible

    tile.destroy();
  }

  createTapZone() {
    this.tapZone = this.physics.add
      .image(0, this.screenHeight * 0.75, "tapZone")
      .setOrigin(0)
      .setDepth(2);
    this.tapZone.width = this.screenWidth;
    this.tapZone.body.collideWorldBounds = true;
    this.tapZone.body.setVelocityX(0);
    this.tapZone.body.immovable = true;
    this.tapZone.body.allowGravity = false;
    this.tapZone.setBodySize(this.tapZone.width, this.tap_zone_area.height);
  }

  feebackText(str) {
    this.tweens.killTweensOf(this.feedback_text);

    this.feedback_text.setVisible(true).setDepth(4);

    switch (str) {
      case "too-early":
        // console.log("too early popup");
        this.feedback_text.setTexture("too_early_popup");
        break;
      case "perfect+":
        this.feedback_text.setTexture("perfect+_popup");
        break;

      case "perfect":
        this.feedback_text.setTexture("perfect_popup");
        break;

      case "great":
        this.feedback_text.setTexture("great_popup");
        break;

      default:
        break;
    }

    this.tweens.add({
      targets: this.feedback_text,
      scaleX: 1,
      scaleY: 1,
      ease: "Linear",
      duration: 300,
      yoyo: false,
      repeat: 0,
      callbackScope: this,
      onComplete: function () {
        this.feedback_text.setVisible(false).setScale(0.7);

        // Fade out
        // this.tweens.add({
        //   targets: this.feedback_text,
        //   alpha: { from: 1, to: 0 }, // Fade out
        //   ease: "Power1",
        //   duration: 200,
        //   onComplete: function () {
        //     // Make sure the fade-out is complete before setting the text to invisible
        //     if (this.feedback_text.alpha === 0) {
        //     }
        //   },
        //   callbackScope: this,
        // });
      },
    });
  }

  highlightPath(x, str) {
    if (str === "green") {
      this.path.setFillStyle(0x90ee90).x = x;
    } else {
      this.path.setFillStyle(0xffa500).x = x;
    }

    this.path.setVisible(true);
    setTimeout(() => {
      this.path.setVisible(false);
    }, 200);
  }

  cleanUp() {
    this.children.removeAll();
    this.time.removeAllEvents();
    this.tweens.killAll();
    this.sound.stopAll();
  }

  gameOver() {
    // this.saveBestScore();
    this.cameras.main.shake(1000, 0.015);

    setTimeout(() => {
      this.themeDrum.stop();
      this.mutedSound.stop();
      this.matchedMarkerTracker = [];
      clearInterval(this.globalInterval);

      this.track.current_score = this.score;
      this.track.midi = this.midi;

      // Get current scores object from localStorage
      let scores = JSON.parse(localStorage.getItem("scores") || "{}");
      // Update the score for the current song
      scores[this.track.song_name] = this.score;
      // Save the updated scores object back to localStorage
      localStorage.setItem("scores", JSON.stringify(scores));

      this.cleanUp();
      this.scene.stop("Level");
      this.scene.start("GameOverScene", { track: this.track });
    }, 900);
  }

  countDown() {
    let countdown_sfx = this.sound.add("countdown_sfx", {
      volume: 0.7,
      loop: false,
    });

    this.ui_layer.forEach((child) => {
      child.setAlpha(0);
      child.setScale(0);
    });

    this.overlay.setDepth(5);

    this.initialTime = 3;
    this.get_ready_text = this.add
      .text(this.screenCenterX, this.screenCenterY - 50, "GET READY", {
        fontFamily: "DINPro",
        fontSize: "20px",
        fill: "#fe500b",
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
        fontFamily: "Righteous-Regular",
        fontSize: "65px",
        fill: "#fe500b",
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
      duration: 250, // Reduced duration for faster animation
      yoyo: true,
      ease: "Power2",
    });

    countdown_sfx.play();

    const intervalId = setInterval(() => {
      this.initialTime--;
      this.countDownText.setText(this.initialTime);

      if (this.initialTime === 0) {
        this.sound.play("Last Countdown Beep_Sfx", { volume: 1, loop: false });
      } else {
        countdown_sfx.play();
      }

      this.tweens.add({
        targets: [this.countDownText],
        scaleX: 2,
        scaleY: 2,
        alpha: 0.1,
        duration: 250, // Reduced duration for faster animation
        yoyo: true,
        ease: "Power2",
      });

      if (this.initialTime <= 0) {
        this.countDownText.destroy();
        this.get_ready_text.destroy();
        this.tweens.add({
          targets: this.overlay,
          alpha: 0,
          ease: "Linear",
          duration: 250, // Reduced duration for faster fade out
          onComplete: () => {
            this.overlay.setVisible(false);
            this.overlay.setAlpha(1);
          },
        });

        this.createBgMusic();
        this.createDrumGroup();
        this.pause_btn.setInteractive();
        clearInterval(intervalId);

        this.ui_layer.forEach((child) => {
          this.tweens.add({
            targets: child,
            alpha: { from: 0, to: 1 },
            scaleX: { from: 0, to: 1 },
            scaleY: { from: 0, to: 1 },
            ease: "Power1",
            duration: 250, // Reduced duration for faster animation
          });
        });
      }
    }, 1000); // Reduced interval for faster countdown
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
