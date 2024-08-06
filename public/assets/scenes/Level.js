
// You can write more code here

/* START OF COMPILED CODE */

class Level extends Phaser.Scene {

	constructor() {
		super("Level");

		/* START-USER-CTR-CODE */
		// Write your code here.
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
		artist_text.setStyle({ "color": "#666363ff", "fontFamily": "Righteous-Regular", "fontSize": "7.5px", "stroke": "#666363ff" });

		// song_name_text
		const song_name_text = this.add.text(180, 45, "", {});
		song_name_text.setOrigin(0.5, 0.5);
		song_name_text.text = "song";
		song_name_text.setStyle({ "align": "center", "color": "#666363ff", "fontFamily": "Righteous-Regular", "fontSize": "15px", "stroke": "#666363ff" });

		// score_text
		const score_text = this.add.text(180, 82, "", {});
		score_text.setOrigin(0.5, 0.5);
		score_text.text = "000";
		score_text.setStyle({ "color": "#666363ff", "fontFamily": "Righteous-Regular", "fontSize": "55px", "stroke": "#666363ff" });

		// pause_btn
		const pause_btn = this.add.image(39, 39, "pause");

		// multiplier_text
		const multiplier_text = this.add.text(180, 116.91874449363797, "", {});
		multiplier_text.setOrigin(0.5, 0.5);
		multiplier_text.text = "x1";
		multiplier_text.setStyle({ "align": "center", "color": "#666363ff", "fontFamily": "DINPro", "fontSize": "15px", "stroke": "#666363ff" });

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
		const song = this.add.text(180, 196, "", {});
		song.setOrigin(0.5, 0.5);
		song.text = "SONG";
		song.setStyle({ "align": "center", "color": "#fe500b", "fontFamily": "DINPro", "fontSize": "18px", "stroke": "#fe500b" });
		song_complete_text.add(song);

		// complete
		const complete = this.add.text(180, 231, "", {});
		complete.setOrigin(0.5, 0.5);
		complete.text = "COMPLETE";
		complete.setStyle({ "color": "#fe500b", "fontFamily": "Righteous-Regular", "fontSize": "50px", "stroke": "#fe500b" });
		song_complete_text.add(complete);

		// youve_earned
		const youve_earned = this.add.text(180, 304, "", {});
		youve_earned.setOrigin(0.5, 0.5);
		youve_earned.text = "You've Earned ";
		youve_earned.setStyle({ "color": "#381304ff", "fontFamily": "Righteous-Regular", "fontSize": "30px", "stroke": "#773d26ff" });
		song_complete_text.add(youve_earned);

		// disc_number_earned
		const disc_number_earned = this.add.text(180, 364.88365496112675, "", {});
		disc_number_earned.setOrigin(0.5, 0.5);
		disc_number_earned.text = "30";
		disc_number_earned.setStyle({ "color": "#381304ff", "fontFamily": "Righteous-Regular", "fontSize": "55px", "fontStyle": "bold", "stroke": "#773d26ff" });
		song_complete_text.add(disc_number_earned);

		// discs
		const discs = this.add.text(180, 418.009920694199, "", {});
		discs.setOrigin(0.5, 0.5);
		discs.text = "Discs";
		discs.setStyle({ "color": "#381304ff", "fontFamily": "Righteous-Regular", "fontSize": "30px", "stroke": "#773d26ff" });
		song_complete_text.add(discs);

		// beat_missed_text
		const beat_missed_text = this.add.layer();
		beat_missed_text.visible = false;

		// beat
		const beat = this.add.text(180, 177, "", {});
		beat.setOrigin(0.5, 0.5);
		beat.text = "BEAT";
		beat.setStyle({ "align": "center", "color": "#666363ff", "fontFamily": "DINPro", "fontSize": "18px", "stroke": "#666363ff" });
		beat_missed_text.add(beat);

		// missed
		const missed = this.add.text(180, 212, "", {});
		missed.setOrigin(0.5, 0.5);
		missed.text = "MISSED";
		missed.setStyle({ "color": "#666363ff", "fontFamily": "Righteous-Regular", "fontSize": "50px", "stroke": "#666363ff" });
		beat_missed_text.add(missed);

		// continue_button
		const continue_button = this.add.image(180, 397, "play_button");
		continue_button.scaleX = 0.8;
		continue_button.scaleY = 0.8;
		beat_missed_text.add(continue_button);

		// continue_text
		const continue_text = this.add.text(180, 397, "", {});
		continue_text.setOrigin(0.5, 0.5);
		continue_text.text = "CONTINUE";
		continue_text.setStyle({ "fontFamily": "DINPro", "fontSize": "22px" });
		beat_missed_text.add(continue_text);

		// quit_button
		const quit_button = this.add.image(180, 317, "play_button");
		quit_button.scaleX = 0.8;
		quit_button.scaleY = 0.8;
		beat_missed_text.add(quit_button);

		// quit_text
		const quit_text = this.add.text(180, 317, "", {});
		quit_text.setOrigin(0.5, 0.5);
		quit_text.text = "QUIT";
		quit_text.setStyle({ "fontFamily": "DINPro", "fontSize": "22px" });
		beat_missed_text.add(quit_text);

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
		streak_text.setStyle({ "align": "center", "color": "#666363ff", "fontFamily": "DINPro", "fontSize": "15px", "stroke": "#666363ff" });
		streak_popup.add(streak_text);

		// sprite_1
		const sprite_1 = this.add.sprite(181, 522, "_MISSING");
		sprite_1.visible = false;

		// beats2
		const beats2 = this.add.image(6, 325, "tile_active");
		beats2.setOrigin(-0.02, 0);
		beats2.visible = false;

		// lists
		const ui_layer = [multiplier_text, score_text, song_name_text, artist_text, top_banner];

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
		this.disc_number_earned = disc_number_earned;
		this.beat_missed_text = beat_missed_text;
		this.continue_button = continue_button;
		this.continue_text = continue_text;
		this.quit_button = quit_button;
		this.quit_text = quit_text;
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
	/** @type {Phaser.GameObjects.Text} */
	disc_number_earned;
	/** @type {Phaser.GameObjects.Layer} */
	beat_missed_text;
	/** @type {Phaser.GameObjects.Image} */
	continue_button;
	/** @type {Phaser.GameObjects.Text} */
	continue_text;
	/** @type {Phaser.GameObjects.Image} */
	quit_button;
	/** @type {Phaser.GameObjects.Text} */
	quit_text;
	/** @type {Phaser.GameObjects.Container} */
	streak_popup;
	/** @type {Phaser.GameObjects.Text} */
	streak_text;
	/** @type {Array<Phaser.GameObjects.Text|Phaser.GameObjects.Image>} */
	ui_layer;

	/* START-USER-CODE */

	// Write your code here

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
		// this.game.events.emit('customEvent', {"message":'custom event data'})
		console.log("Level.js create()");
		this.editorCreate();
		// background_music.stop()

		this.soundTracker = 0;

		this.column = null;
		this.drumColums = [];
		this.randomDrumCol = [];

		this.tileGroup = null;
		this.tileClicked = false;

		this.score = 0;
		this.scoreDisplay = 0;

		// this.tileDuration = 1.4;

		// This is used to multiply the screen height to get the position the drum tile is heading towards
		this.tileTarget = 0.82;

		this.playSong = false;
		this.matchedMarkerTracker = [];
		this.tileTracker = [];

		this.maxSongScore = 100000;
		this.multiplier = 1;
		this.progress_bar = 1;

		this.frameTime = 0;
		this.fps;

		/** Screen width, height, and Center x, y */
		this.artist = this.track.artist_name;
		this.songItem = this.track.song_name;
		this.screenWidth = this.cameras.main.width;
		this.screenHeight = this.cameras.main.height;
		this.screenCenterX = this.cameras.main.worldView.x + this.screenWidth / 2;
		this.screenCenterY = this.cameras.main.worldView.y + this.screenHeight / 2;

		this.soundMarkers = [];
		// this.children = [];
		// console.log('this.midi', this.midi);

		this.tileDuration = this.midi.tracks[0].notes[0].velocity * 5 || 1.4
		// console.log('TD', this.tileDuration)

		this.midi.tracks.forEach((track) => {
		  /** Drum trigger notes array from midi - filter out other notes just in case **/
		  // Currently set to octave 2 as the sg_test audio is using the different midi standard
		  const notes = track.notes;

		  notes.forEach((note, idx) => {
			if ((note.name == "F#3") | (note.name == "G#3") | (note.name == "A#3"))
			  this.soundMarkers.push({
				name: `"marker_${idx}"`,
				velocity: note.velocity,
				start: note.time,
				path: note.name,
				duration: note.duration, // not used currently
				config: { loop: false },
			  });
		  });
		});

		// console.log("markers", this.soundMarkers);

		this.beatScore = this.maxSongScore / this.soundMarkers.length;

		this.countDown();

		this.events.on("resume", () => {
		  this.music.resume();
		});

		this.song_name_text.setText(this.songItem);

		this.artist_text.setText(this.artist.toUpperCase());

		this.pause_btn.on("pointerup", () => {
		  this.music.pause();
		  this.scene.pause();
		  this.scene.launch("Pause");
		});

		this.tapZone = this.add
		  .image(this.screenCenterX, this.screenHeight * this.tileTarget, "tapZone")
		  .setOrigin(0.5);

		this.ui_layer.forEach((asset) => {
		  asset.setDepth(4);
		});

		this.divider_1.setDepth(2.5);
		this.divider_2.setDepth(2.5);

		this.path = this.add
		  .rectangle(0, 0, this.screenWidth / 3, this.screenHeight, 0x90ee90)
		  .setOrigin(0.5, 0)
		  .setAlpha(0.5)
		  .setVisible(false);

		this.score_emitter = this.add
		  .particles(this.score_text.x, this.score_text.y, "Play_active", {
			lifespan: 750,
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
			  lifespan: 750,
			  speed: { min: 50, max: 100 },
			  scale: { start: 0.5, end: 0 },
			  // gravityY: 150,
			  blendMode: "ADD",
			  emitting: false,
			}
		  )
		  .setDepth(10);

		// TODO debug line, please disable
		let rect = this.add
		  .rectangle(
			this.screenCenterX,
			this.screenHeight * this.tileTarget,
			this.screenWidth,
			2,
			0x00f000,
			1
		  )
		  .setDepth(100);
		this.fps_text = this.add.text(this.screenWidth - 20, 20, "", {});

		this.fps_text.setOrigin(1, 0).setDepth(100);
		this.fps_text.text = "artist";
		this.fps_text.setStyle({
		  color: "#666363ff",
		  fontFamily: "Righteous-Regular",
		  fontSize: "13px",
		  stroke: "#666363ff",
		});
	  }

	  update(time, delta) {
		if (!this.tileGroup) {
		  // console.warn("Tile group not initialized");
		  return;
		}
		// Smoothed frame time + fps conversion for performance throttles
		this.frameTime = this.frameTime * 0.99 + delta * 0.01;
		this.fps = ((1 / this.frameTime) * 1000).toFixed(1);
		this.fps_text.text = this.fps;
		this.lowFpsMode = this.fps < 30 ? true : false;

		// Lerp score when needed
		if (Math.abs(this.scoreDisplay - this.score) > 1) {
		  if (this.lowFpsMode) {
			this.scoreDisplay = this.score;
		  } else {
			this.scoreDisplay = Phaser.Math.Linear(
			  this.scoreDisplay,
			  this.score,
			  0.1
			);
		  }
		  this.score_text.setText(`${Math.trunc(this.scoreDisplay)}`);
		}

		// Seek is the position in the track, tile position is locked to this
		let seek = this.music?.seek;

		if (seek >= 0) {
		  // create next "drum" far enough in advance to get to the target on the beat
		  // if (seek + this.tileDuration >= this.soundMarkers[0].start) {
		  //   // pop off next marker in the array and make a tile ready for lerping
		  //   var marker = this.soundMarkers.shift();
		  //   this.creatOneDrum(marker);
		  // }
		  if (
			this.soundMarkers.length > 0 &&
			seek + this.tileDuration >= this.soundMarkers[0].start
		  ) {
			var marker = this.soundMarkers.shift();
			this.creatOneDrum(marker);
		  }

		  this.tileGroup.getChildren().forEach((tile) => {
			if (tile.swiped || tile.held) return; // use return not continue in a foreach lambda



			// lerp tiles downwards from 0 towards the "percentage of screen height" target.
			// at 1 this will be bang on the target and will continue down past the target and off the screen as
			// the lerp goes over 1.

			tile.lerp = Math.max(
			  0,
			  (seek - tile.start + this.tileDuration) / this.tileDuration
			);

			tile.setY(
			  Phaser.Math.Linear(0, this.screenHeight * this.tileTarget, tile.lerp)
			);

			// The Math.max up there ^ is so we can debug tile creation timing. The tile creation and
			// it's position are completely uncoupled now

			tile.setAlpha(tile.lerp);

			if (tile.y > this.screenHeight * this.tileTarget) {
			  this.checkOverlap(tile);
			}
		  });
		}
	  }

	  creatOneDrum(marker) {
		let tilePath = marker.path;
		let velocity = marker.velocity;
		let duration = marker.duration;
		/** Create a tile / drum **/

		let tile = this.tileGroup
		  .create(0, 0, "beats2")
		  .setOrigin(0.5, 0.5)
		  .setInteractive()
		  .setAlpha(0.2)
		  .setDepth(4);

		tile.start = marker.start;
		tile.body.immovable = true;
		this.placeTile(tile, tilePath, velocity, duration);
	  }

	  placeTile(tile, tilePath, velocity, duration) {
		let left = (this.screenWidth / 6) * 1;
		let middle = (this.screenWidth / 6) * 3;
		let right = (this.screenWidth / 6) * 5;

		let swipeConfig = {
		  velocityThreshold: 500,
		};

		// Currently set to octave 2 as the sg_test audio is using the different midi standard
		let position;
		switch (tilePath) {
		  case "A#3":
			position = "left";
			tile.setX(left);
			break;
		  case "G#3":
			position = "middle";
			tile.setX(middle);
			break;
		  case "F#3":
			position = "right";
			tile.setX(right);
			break;
		  default:
			// Handle default case if necessary
			break;
		}

		tile.laneX = tile.x;

		tile.swiped = false;

		let swipe = this.rexGestures.add.swipe(tile, swipeConfig);

		// console.log('velocity', velocity);
		switch (velocity) {
		  case 0.23622047244094488:
			tile.setTexture("swipe_up");

			swipe.on("swipe", (swipe, gameObject, lastPointer) => {
			  if (swipe.up) {
				this.handleSwipe(tile, swipe);
			  }
			});
			// this.handleHeldTile(tile, duration);
			break;

		  case 0.3937007874015748:
			tile.setTexture("swipe_right");

			swipe.on("swipe", (swipe, gameObject, lastPointer) => {
			  if (swipe.right) {
				this.handleSwipe(tile, swipe);
			  }
			});
			// this.handleHeldTile(tile, duration);
			break;
		  case 0.7086614173228346:
			tile.setTexture("swipe_left");

			swipe.on("swipe", (swipe, gameObject, lastPointer) => {
			  if (swipe.left) {
				this.handleSwipe(tile, swipe);
			  }
			});
			// this.handleHeldTile(tile, duration);
			break;
		  case 0.5511811023622047:
			tile.setTexture("swipe_down");

			swipe.on("swipe", (swipe, gameObject, lastPointer) => {
			  if (swipe.down) {
				this.handleSwipe(tile, swipe);
			  }
			});
			// this.handleHeldTile(tile, duration);
			break;
		  case 0.007874015748031496:
			this.handleHeldTile(tile, duration);
			break;

		  default:
			tile.on("pointerup", () => {
			  this.tileClicked = false;
			});
			tile.on("pointerdown", () => {
			  this.onClickInstrument(tile);
			});
			break;

		  // default:
		  //   this.handleHeldTile(tile, duration);
		  //   break;
		}
	  }

	  // handleHeldTile(tile, duration) {
	  //   // tile.setScale(1, 2);
	  //   duration = 0.7999990000000025
	  //   // tile.setOrigin(0.5, 1);

	  //   let initialScaleY = this.heldTileScaleFactor * duration;

	  //   tile.setScale(1, initialScaleY);
	  //   let clicked = false;

	  //   tile.on("pointerdown", () => {
	  //     tile.held = true
	  //     this.tweens.add({
	  //       targets: tile,
	  //       scaleY: 1,
	  //       ease: "Linear", // Linear easing for smooth scaling
	  //       duration: duration * 1000, // Convert duration to milliseconds
	  //       onComplete: () => {
	  //         if (!clicked) {
	  //           clicked = true;
	  //           this.onClickInstrument(tile);
	  //         }
	  //       },
	  //     });
	  //   });

	  //   tile.on("pointerup", () => {
	  //     tile.held = false;
	  //     if (!clicked) {
	  //       clicked = true;
	  //       this.onClickInstrument(tile);
	  //     }
	  //   });
	  // }

	//   calculateHeldTileScaleFactor(duration, tileDuration) {
	//     let slope = 1.4167;
	//     let intercept = -1.3324;
	//     let normalizationFactor = slope * tileDuration + intercept;

	//     let heldTileScaleFactor = 1 + Math.log1p(duration) / Math.log1p(normalizationFactor);
	//     return heldTileScaleFactor;
	// }

	calculateHeldTileScaleFactor(duration, tileDuration) {
	  // Use the calculated slope and intercept from the linear regression
	  let slope = 1.5;
	  let intercept = -1.4;

	  // Calculate normalization factor from the linear fit
	  let normalizationFactor = slope * tileDuration + intercept;

	  // Calculate the held tile scale factor using the logarithmic scaling
	  let heldTileScaleFactor = 1 + Math.log1p(duration) / Math.log1p(normalizationFactor);
	  return heldTileScaleFactor;
	}


	  handleHeldTile(tile, duration) {


		let heldTileScaleFactor = this.calculateHeldTileScaleFactor(duration, this.tileDuration);

		// let heldTileScaleFactor = 1 + Math.log1p(duration) / Math.log1p(0.65); 

		// console.log('heldTileScaleFactor', heldTileScaleFactor);
		let initialScaleY = heldTileScaleFactor * duration;

		tile.setScale(1, initialScaleY);

		let originalHeight = tile.height; // Use the original unscaled height
		let scaledHeight = tile.displayHeight; // This is the height after scaling
		let originalOriginY = tile.originY; // Original origin y before scaling

		// Calculate new originY based on scaled height to keep the visual origin the same
		let newOriginY = (originalOriginY * originalHeight) / scaledHeight;

		newOriginY = 1 - newOriginY
		// console.log('newOriginY', newOriginY);
		// Set the new origin
		tile.setOrigin(0.5, newOriginY);

		let initialHeight = tile.displayHeight; // Capture the scaled display height for adjustments
		let clicked = false;

		tile.on("pointerdown", () => {
			tile.held = true;


			// Animate the gameplay tile to scale back to normal size
			this.tweens.add({
				targets: tile,
				scaleY: 1, // Scale back to normal size
				ease: "Linear",
				duration: duration * 1000,
				// onUpdate: function (tween) {
				//     const scaleProgress = tween.getValue();
				//     tile.y -= (tile.displayHeight - initialHeight) / 2;
				//     initialHeight = tile.displayHeight; // Update initialHeight after adjustment
				// },
				onComplete: () => {
					if (!clicked) {
						clicked = true;
						this.onClickInstrument(tile, false, true);
					}
				},
			});
		});

		tile.on("pointerup", () => {
			if (!clicked) {
				clicked = true;
				this.onClickInstrument(tile, false, true);
			}
		});
	}




	  checkOverlap(tile) {
		if (tile.y >= this.screenHeight) {
		  tile.destroy();

		  // let children = this.drumGroup.getChildren();
		  // children.forEach((tile) => {
		  //   tile.destroy();
		  // });

		  this.beatMissedDisplay()
		//   this.songComplete()

		//   this.gameOver();
		}
	  }

	  createTileGroup() {
		this.tileGroup = this.physics.add.staticGroup();
	  }

	  createMusic() {
		this.music = this.sound.add(`${this.songItem}`, { volume: 1 });

		this.music.play({ delay: 0.5 });

		this.music.on("play", () => {
		  this.isSoundPlaying = true;
		});

		this.music.on("complete", () => {
			this.songComplete();

		});
	  }

	  songComplete(){

		// TEMP
		this.music.pause();
		this.scene.pause();

		/** Stop the sound 2 */
		this.matchedMarkerTracker = [];

		this.overlay.setVisible(true);
		this.song_complete_text.setVisible(true).setDepth(6);

		setTimeout(() => {
			this.overlay.setVisible(false);
			this.song_complete_text.setVisible(false);

			let user_data = JSON.parse(localStorage.getItem("user_data"));
			console.log('here');
			user_data.profile.player.total_discs += 30;
			this.game.events.emit("updateUserEvent", {data: user_data});

			this.gameOver();
		}, 4000);

	  }

	  getSwipeTextures(position) {
		if (position === "middle") {
		  return ["swipe_left", "swipe_right"];
		} else {
		  return ["swipe_up", "swipe_down"];
		}
	  }

	  handleSwipe(tile, swipe) {
		// console.log("swiped", swipe);

		tile.swiped = true;

		// run the clicked function now, not after the tween to make it feel more responsive
		this.onClickInstrument(tile, true);

		let movementDistance = 25;

		// if (navigator.vibrate) {
		//   // Vibration pattern: vibrate for 200ms
		//   navigator.vibrate(100);
		// }

		let tweenConfig = {
		  duration: 150,
		  ease: "Power1",
		  onComplete: () => {
			tile.destroy();
		  },
		};

		tile.setTexture('arrow')
		if (swipe.up) {

		  tile.angle -=90

		  this.tweens.add({
			targets: tile,
			y: tile.y - movementDistance * 2,
			...tweenConfig,
		  });
		} else if (swipe.down) {
		  tile.angle +=90
		  this.tweens.add({
			targets: tile,
			y: tile.y + movementDistance * 4,
			...tweenConfig,
		  });
		} else if (swipe.left) {
		  tile.angle -=180
		  this.tweens.add({
			targets: tile,
			x: tile.x - movementDistance,
			...tweenConfig,
		  });
		} else if (swipe.right) {
		  this.tweens.add({
			targets: tile,
			x: tile.x + movementDistance,
			...tweenConfig,
		  });
		}
	  }

	  resetStreak() {
		// console.log("Reset Streak")
		if (this.multiplier >= 2) {
		  this.streak_text.setText("STREAK LOST");
		  this.streak_popup.setVisible(true).setDepth(6);
		  setTimeout(() => {
			this.streak_popup.setVisible(false);
		  }, 700);
		}
	  }

	  streakDisplay() {
		// setTimeout(() => {
		//   this.streak_popup.setVisible(false);
		// }, 700);

		this.multiplier_emitter.explode(this.lowFpsMode ? 10 : 20);

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
	  }

	  beatMissedDisplay() {
		// this.overlay.setVisible(true);
		// this.beat_missed_text.setVisible(true).setDepth(6);

		// this.continue_button.setInteractive()
		// this.continue_button.on('pointerup', ()=>{
		// 	console.log('c');
		// 	this.beat_missed_text.setVisible(false).setDepth(-1)
		// 	this.scene.resume("Level");

		// })
		// this.quit_button.setInteractive()
		// this.quit_button.on('pointerup', ()=>{
		// 	this.gameOver()
		// })

		// this.cameras.main.shake(2000, 0.015);
		this.music.pause();
		this.scene.pause();

		// Delete the last 2 tiles
		let children = this.tileGroup.getChildren();
		let tilesToRemove = children.slice(0,3);
		tilesToRemove.forEach(tile => tile.destroy());

		this.scene.bringToTop("BeatMissed")
		this.scene.launch("BeatMissed");

	  }

	  onClickInstrument(tile, swiped = false, held = false) {
		let accuracy = Math.abs(tile.lerp - 1);

		// console.log(accuracy, held);
		if (held){
		  accuracy = accuracy - 0.04 //manufactured number TODO
		}



		if (navigator.vibrate) {
		  // Vibration pattern: vibrate for 200ms
		  navigator.vibrate(100);
		}

		this.tileClicked = true;
		let perfect_plus = false;
		var tile_score;

		// If a score is going to be awarded pop the particles, saves repeating it in the swtich
		if (accuracy <= 0.055) {
		  this.score_emitter.explode(this.lowFpsMode ? 20 : 50);
		}

		// Base reaction to click on how accurate the timing was. 0 = best
		switch (true) {
		  case accuracy < 0.02:
			// console.log("perfect_plus");
			perfect_plus = true;
			tile_score = (this.beatScore / 5) * this.multiplier;
			this.score += tile_score;
			this.progress_bar += 1;
			this.feebackText("perfect+");
			this.highlightPath(tile.x, "green");
			break;
		  case accuracy < 0.06:
		  case accuracy >= 0.1 && accuracy <= 0.17:
			// console.log("perfect");
			tile_score = (this.beatScore / 5) * this.multiplier;
			this.score += tile_score * 0.7;
			this.progress_bar += 1;
			this.feebackText("perfect");
			this.highlightPath(tile.x, "green");
			break;
		  case accuracy < 0.1:
			// console.log("great");
			this.resetStreak();
			tile_score = (this.beatScore / 5) * this.multiplier;
			this.score += tile_score * 0.4;
			this.progress_bar = 1;
			this.multiplier = 1;
			this.feebackText("great");
			this.highlightPath(tile.x, "green");
			break;
		  default:
			this.resetStreak();
			this.highlightPath(tile.x, "red");
			if (tile.lerp < 1) {
			  this.feebackText("too-early");
			} else {
			  console.log("missed");
			  // this.beatMissedDisplay();
			}
			this.resetStreak();
			this.highlightPath(tile.x, "red");
		}

		if (this.progress_bar >= 10) {
		  this.streak_text.setText(`${10 * this.multiplier} STREAK`);

		  this.streakDisplay();

		  this.progress_bar = 1;
		  this.multiplier += 1;

		  if (this.multiplier >= 5) {
			this.multiplier = 5;
		  }
		}

		this.multiplier_text.setText(`x${this.multiplier}`);

		// show white background ghost of tile when tapped

		// this.tileActiveFlash(tile, perfect_plus);

		// add in scale up for juice but only if it's not already been swiped
		if (!swiped || !held) {
		  this.tweens.add({
			targets: tile,
			scaleX: 1.1,
			scaleY: 1.1,
			duration: 75,
			ease: "Power1",
			onComplete: () => {
			  tile.destroy();
			},
		  });
		}
	  }

	  tileActiveFlash(tile, perfect_plus) {
		var tile_active = this.add.image(tile.x, 0, "tile_active").setDepth(3);

		if (perfect_plus) {
		  tile_active.setY(this.screenHeight * this.tileTarget);
		} else {
		  tile_active.setY(tile.y);
		}

		this.tweens.add({
		  targets: tile_active,
		  alpha: 0,
		  duration: perfect_plus ? 1000 : 250,
		  ease: "Power1",
		  onComplete: () => {
			tile_active.destroy();
		  },
		});
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
		// this.cameras.main.shake(1000, 0.015);

		this.music.stop();
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

		// this.overlay.setVisible(true);
		// this.beat_missed_text.setVisible(true).setDepth(6);
		// setTimeout(() => {
		//   this.overlay.setVisible(false);
		//   this.beat_missed_text.setVisible(false);

		//   this.cleanUp();
		//   this.scene.stop("Level");
		//   this.scene.start("GameOverScene", { track: this.track });
		// }, 500);
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

			this.createMusic();
			this.createTileGroup();
			this.pause_btn.setInteractive().setDepth(50);
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
