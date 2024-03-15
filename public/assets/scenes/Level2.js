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
	  const streak_popup = this.add.layer();
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
	/** @type {Phaser.GameObjects.Layer} */
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
	create() {
	  console.log("Level.js create()");
	  this.editorCreate();
  
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
	}
	update() {
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
			this.creatOneTile(path, duration);
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
  
		  this.scene.stop("Level");
		  this.scene.start("BufferScene", { track: this.track });
		}, 2000);
	  });
	}
  
	creatOneTile(path, duration) {
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
	  this.createTween(this.drum);
	}
  
	createTween(tile) {
	  let self = this;
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
  
	placeDrum(drum, tilePath, duration) {
	  let left = 0;
	  let middle = 120;
	  let right = 240;
  
	  // Place tile in path determined in midi
	  // "A#2" left,"G#2"-middle, "F#2"right
	  console.log(tilePath);
  
	  switch (tilePath) {
		case "A#3":
		  drum.setX(left);
		  break;
		case "G#3":
		  drum.setX(middle);
		  break;
		case "F#3":
		  drum.setX(right);
		  break;
  
		default:
		  drum.setX(right);
		  break;
	  }
	  // drum.setX(tilePath === "A#2" ? left : tilePath === "G#2" ? middle : right);
  
	  // drum.setX(tilePath === "A#3" ? left : tilePath === "G#3" ? middle : right); // F#3
  
	  if (duration > 0.75){
		drum.setTexture('beats2_long')
	  }
  
	  drum.on("pointerup", () => {
		this.tileClicked = false;
	  });
	  drum.on("pointerdown", () => {
		this.onClickInstrument(drum);
	  });
	}
  
	checkOverlap(drum) {
	  if (drum.y >= this.screenHeight) {
		drum.destroy();
  
		this.overlay.setVisible(true);
		this.beat_missed_text.setVisible(true).setDepth(6);
		setTimeout(() => {
		  this.overlay.setVisible(false);
		  this.beat_missed_text.setVisible(false);
		}, 500);
  
		this.gameOver();
	  }
	}
  
	onClickInstrument(tile) {
	  // this.increaseScore();
  
	  this.tileClicked = true;
	  let perfect_plus = false;
  
	  if (this.progress_bar >= 10) {
		this.streak_text.setText(`${10 * this.multiplier} STREAK`);
  
		this.progress_bar = 1;
		this.multiplier += 1;
  
		this.streak_popup.setVisible(true).setDepth(6);
		setTimeout(() => {
		  this.streak_popup.setVisible(false);
		}, 700);
  
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
		this.beat_missed_text.setVisible(true).setDepth(6);
		setTimeout(() => {
		  this.overlay.setVisible(false);
		  this.beat_missed_text.setVisible(false);
		}, 500);
  
		this.gameOver();
	  }
  
	  // console.log(this.score);
	  this.score_text.setText(`${Math.trunc(this.score)}`);
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
	  let pathOrange = 0xffa500;
	  let pathGreen = 0x90ee90;
	  let color = "";
  
	  str === "green" ? (color = pathGreen) : (color = pathOrange);
  
	  this.pathColor = this.add
		.rectangle(x, 0, this.screenWidth / 3, this.screenHeight, color)
		.setOrigin(0)
		.setAlpha(0.5);
	  setTimeout(() => {
		this.pathColor.destroy();
	  }, 200);
	}
  
	gameOver() {
	  // this.saveBestScore();
	  this.cameras.main.shake(1000);
  
	  setTimeout(() => {
		this.themeDrum.stop();
		this.mutedSound.stop();
		this.matchedMarkerTracker = [];
		clearInterval(this.globalInterval);
  
		this.track.current_score = this.score;
		this.track.midi = this.midi;
  
		this.scene.stop("Level");
		this.scene.start("GameOverScene", { track: this.track });
	  }, 900);
	}
  
	countDown() {
	  this.overlay.setDepth(5);
  
	  this.initialTime = 3;
	  this.get_ready_text = this.add
		.text(this.screenCenterX, this.screenCenterY - 50, "GET READY", {
		  fontFamily: "DINPro",
		  fontSize: "20px",
		  fill: "#fe500b",
		})
		.setOrigin(0.5, 1)
		.setDepth(5);
  
	  this.countDownText = this.add
		.text(this.screenCenterX, this.screenCenterY + 50, this.initialTime, {
		  fontFamily: "Righteous-Regular",
		  fontSize: "65px",
		  fill: "#fe500b",
		})
		.setOrigin(0.5, 0.5)
		.setDepth(6);
  
	  this.countDownText2 = this.add
		.text(this.screenCenterX, this.screenCenterY + 50, this.initialTime, {
		  fontFamily: "Righteous-Regular",
		  fontSize: "200px",
		  fill: "#f5b89c",
		})
		.setOrigin(0.5, 0.5)
		.setDepth(5);
  
	  const intervalId = setInterval(() => {
		/** Update the timer*/
		this.initialTime--;
		this.countDownText.setText(this.initialTime);
		this.countDownText2.setText(this.initialTime);
  
		if (this.initialTime <= 0) {
		  // this.countDownText.setText("");
		  // this.get_ready.setText("")
		  this.countDownText.destroy();
		  this.countDownText2.destroy();
		  this.get_ready_text.destroy();
		  this.overlay.setVisible(false);
		  this.createBgMusic();
		  this.createDrumGroup();
		  this.pause_btn.setInteractive().setVisible(true);
		  clearInterval(intervalId);
		}
	  }, 2000);
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
  